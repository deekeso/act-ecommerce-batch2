import { defineStore } from 'pinia'
import type { Carts, CartStorage } from '@/types'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useUtils } from '@/composables/useUtils'
import { useAuth } from './auth'
// import { useOrder } from './orders'
// import { useAddress } from './address'

export const useCart = defineStore('cart', {
  state: () => ({
    cart: [] as Carts[],
    buyNowItem: {} as Carts | null,
  }),

  getters: {
    getCartItems: (state) => state.cart,
    getTotalCartItems: (state) => state.cart.reduce((totalItems, item) => (totalItems += item.quantity), 0),
    getTotalPrice: (state) => state.cart.reduce((total, item) => total + item.quantity * item.price, 0),
    getSelectedTotalPrice: (state) =>
      state.cart.filter((item) => item.selectedItem).reduce((total, item) => total + item.quantity * item.price, 0),
    getSelectItems: (state) => state.cart.length > 0 && state.cart.every((item) => item.selectedItem),
    getAllSelectedCartItems: (state) => state.cart.filter((item) => item.selectedItem === true),
    getBuyNowItems: (state) => state.buyNowItem,
    getSelectedItemLength: (state) => state.cart.filter((item) => item.selectedItem === true).length,
  },

  actions: {
    setBuyNow(cartItem: Carts) {
      if (cartItem.quantity <= 0) {
        ElMessage.error('Invalid Quantity')
        return
      }
      const tempItem = cartItem
      localStorage.setItem('buyNowItem', JSON.stringify(tempItem))
    },

    clearBuyNow() {
      localStorage.removeItem('buyNowItem')
    },

    initializeCart() {
      const auth = useAuth()
      const user = auth.getCurrentUser
      const cartMap: CartStorage = JSON.parse(localStorage.getItem('cart') || '{}')
      this.cart = user?.id && cartMap[user.id] ? cartMap[user.id] : []

      this.buyNowItem = JSON.parse(localStorage.getItem('buyNowItem') || `{}`) as Carts
    },

    saveCartItemsOnLocalStorage() {
      const auth = useAuth()
      const user = auth.getCurrentUser
      if (!user?.id) return
      const cartMap: CartStorage = JSON.parse(localStorage.getItem('cart') || '{}')
      cartMap[user.id] = this.cart
      localStorage.setItem('cart', JSON.stringify(cartMap))
    },

    clearCartOnLogout() {
      this.cart = []
    },

    removeCartItems() {
      this.cart = this.cart.filter((item) => !item.selectedItem)
      this.saveCartItemsOnLocalStorage()
    },

    handleAllSelectItem(value: boolean) {
      this.cart = this.cart.map((item) => ({ ...item, selectedItem: value }))
      this.saveCartItemsOnLocalStorage()
    },

    handleSelectedItem(itemId: string, isSelected = false) {
      const index = this.cart.findIndex((item) => item.id === itemId)
      if (index !== -1) {
        this.cart[index].selectedItem = isSelected
      }
      this.saveCartItemsOnLocalStorage()
    },

    handleRemoveAllItem() {
      ElMessageBox.confirm('Are you sure you want to remove all the items in the cart?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.cart = []
          this.saveCartItemsOnLocalStorage()
          ElMessage.success('Successfully removed all items')
        })
        .catch(() => {
          ElMessage.info('Action cancelled')
        })
    },

    handleAddToCart(cartItem: Carts) {
      if (cartItem.quantity <= 0) {
        ElMessage.error('Invalid Quantity')
        return
      }

      const { toastMessage } = useUtils()
      const index = this.cart.findIndex((item) => item.id === cartItem.id)

      if (index !== -1) {
        this.cart[index].quantity += cartItem.quantity
      } else {
        this.cart.push(cartItem)
      }

      this.saveCartItemsOnLocalStorage()
      toastMessage('Success', `${cartItem.label} has been added to the cart`, 'success')
    },

    handleRemoveCartItem(itemId: string) {
      const { toastMessage } = useUtils()
      this.cart = this.cart.filter((item) => item.id !== itemId)
      this.saveCartItemsOnLocalStorage()
      toastMessage('Success', 'Item removed from cart', 'success')
    },

    handleSetQuantity(id: string, newQuantity: number) {
      if (newQuantity < 0) {
        ElMessage.error('Invalid Quantity')
      }
      const index = this.cart.findIndex((item) => item.id === id)
      if (index !== -1) {
        this.cart[index].quantity = newQuantity
        this.saveCartItemsOnLocalStorage()
      }
    },
  },
})
