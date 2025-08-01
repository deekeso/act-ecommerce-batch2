import { defineStore } from 'pinia'
import type { UserAddress } from './user'
import { useShippingStore } from './shipping'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
}

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  cartItems: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: (): CartState => ({
    cartItems: [],
  }),

  getters: {
    subtotalPrice(): number {
      return this.cartItems.reduce((total: number, item: CartItem) => {
        return total + item.product.price * item.quantity
      }, 0)
    },

    shippingFee(): (address: UserAddress) => number {
      return (address: UserAddress) => {
        const shippingStore = useShippingStore()
        return shippingStore.calculateShippingFee(address)
      }
    },

    totalWithShipping(): (address: UserAddress) => number {
      return (address: UserAddress) => {
        return this.subtotalPrice + this.shippingFee(address)
      }
    },

    itemCount(): number {
      return this.cartItems.reduce((count: number, item: CartItem) => count + item.quantity, 0)
    },
  },

  actions: {
    // Save cart to localStorage whenever it changes
    saveCart() {
      localStorage.setItem('cart', JSON.stringify(this.cartItems))
    },

    // Add product to cart
    addToCart(product: Product) {
      const existingItem = this.cartItems.find((item: CartItem) => item.product.id === product.id)

      if (existingItem) {
        existingItem.quantity++
      } else {
        this.cartItems.push({ product, quantity: 1 })
      }

      this.saveCart()
    },

    // Remove product from cart
    removeFromCart(productId: number) {
      const index = this.cartItems.findIndex((item: CartItem) => item.product.id === productId)
      if (index !== -1) {
        this.cartItems.splice(index, 1)
        this.saveCart()
      }
    },

    // Update quantity of a product in cart
    updateQuantity(productId: number, quantity: number) {
      const item = this.cartItems.find((item: CartItem) => item.product.id === productId)
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          this.removeFromCart(productId)
        } else {
          this.saveCart()
        }
      }
    },

    // Clear the entire cart
    clearCart() {
      this.cartItems = []
      this.saveCart()
    },

    // Checkout and create an order
    async checkout(shippingAddress: UserAddress, paymentMethod: string) {
      // Import here to avoid circular dependency
      const { useUserStore } = await import('./user')
      const userStore = useUserStore()

      if (!userStore.isLoggedIn) {
        throw new Error('User must be logged in to checkout')
      }

      // Calculate shipping fee and total
      const shippingFee = this.shippingFee(shippingAddress)

      // Create order from cart items
      const order = userStore.createOrderFromCart(
        this.cartItems,
        shippingAddress,
        paymentMethod,
        this.subtotalPrice,
        shippingFee,
      )

      return order
    },
  },
})
