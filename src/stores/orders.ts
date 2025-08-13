import { defineStore } from 'pinia'
import type { BillingAddress, Carts, Order, Status } from '@/types'
import { useAuth } from './auth'
import { v4 as uuidv4 } from 'uuid'
import { ElMessage } from 'element-plus'
import { useUtils } from '@/composables/useUtils'

export const useOrder = defineStore('order', {
  state: () => ({
    orders: JSON.parse(localStorage.getItem('orders') || '{}') as Record<string, Order[]>,
  }),

  getters: {
    getOrdersForCurrentUser(state) {
      const auth = useAuth()
      const user = auth.getCurrentUser
      return user?.id ? state.orders[user.id] || [] : []
    },

    getOrderById: (state) => {
      return (orderId: string): Order | undefined => {
        for (const userId in state.orders) {
          const found = state.orders[userId].find((order) => order.id === orderId)
          if (found) return found
        }
        return undefined
      }
    },
  },
  actions: {
    placeOrder(cartItems: Carts[], address: BillingAddress, orderSummary: { totalPrice: number; shippingFee: number }) {
      const auth = useAuth()
      const user = auth.getCurrentUser
      if (!user?.id) return

      const newOrder: Order = {
        id: uuidv4(),
        userId: user.id,
        userProfile: {
          firstname: user.firstname,
          lastname: user.lastname,
          contact: user.contact,
          email: user.email,
        },
        address,
        items: cartItems,
        createdAt: new Date().toISOString(),
        status: 'pending',
        shippingFee: orderSummary.shippingFee,
        totalPrice: orderSummary.totalPrice,
      }

      if (!this.orders[user.id]) {
        this.orders[user.id] = []
      }

      this.orders[user.id].unshift(newOrder)
      this.saveOrdersToLocalStorage()
    },

    updateOrderStatus(orderId: string, newStatus: Status) {
      const auth = useAuth()
      const user = auth.getCurrentUser
      const { toastMessage } = useUtils()
      console.log(`user: ${user?.id} order: ${orderId}`)
      if (!user?.id || !orderId) {
        ElMessage.error('Failed to update order status')
        return
      }

      const userOrders = this.orders[user.id]

      if (!userOrders || userOrders.length === 0) {
        ElMessage.warning('No orders found for this user')
        return
      }

      const order = userOrders.find((order) => order.id === orderId)

      if (!order) {
        ElMessage.error('Order not found')
        return
      }

      order.status = newStatus
      this.saveOrdersToLocalStorage()
      toastMessage(`Order Status`, `Your parcel has been delivered`, 'success', 5000)
    },

    doesCurrentUserOwnOrder(orderId: string): boolean {
      const auth = useAuth()
      const user = auth.getCurrentUser
      if (!user?.id) return false

      const userOrders = this.orders[user.id] || []
      return userOrders.some((order) => order.id === orderId)
    },

    saveOrdersToLocalStorage() {
      localStorage.setItem('orders', JSON.stringify(this.orders))
    },
  },
})
