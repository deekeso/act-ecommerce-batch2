import { defineStore } from 'pinia'
import type { BillingAddress } from '@/types'
import { v4 as uuidv4 } from 'uuid'
import { useUtils } from '@/composables/useUtils'
import { ElMessageBox } from 'element-plus'
import { useAuth } from './auth'

export const useAddress = defineStore('address', {
  state: () => ({
    billingAddresses: JSON.parse(localStorage.getItem('addresses') || '[]') as BillingAddress[],
    selectedAddress: {} as BillingAddress,
  }),

  getters: {
    getAllAddress: (state) => {
      const auth = useAuth()
      const user = auth.getCurrentUser
      if (!user?.id) return []
      return state.billingAddresses.filter((addr) => addr.userId === user.id)
    },
    getSelectedAddress: (state) => state.selectedAddress,
  },

  actions: {
    // handleSelectedAddress(id: string) {
    //   this.selectedAddress = this.billingAddresses.filter((address) => address.id === id)
    // },

    handleAddBillingAddress(address: Omit<BillingAddress, 'id' | 'userId'>) {
      const { toastMessage } = useUtils()
      const auth = useAuth()
      const user = auth.getCurrentUser
      if (!user?.id) return

      const newAddress: BillingAddress = {
        id: uuidv4(),
        userId: user.id,
        ...address,
      }

      this.billingAddresses.push(newAddress)
      this.saveAddressOnLocalStorage()
      toastMessage('Success', 'Address added', 'success')
    },

    handleUpdateBillingAddress(updatedAddress: BillingAddress) {
      const { toastMessage } = useUtils()
      const index = this.billingAddresses.findIndex((address) => address.id === updatedAddress.id)

      if (index !== -1) {
        this.billingAddresses[index] = updatedAddress
        this.saveAddressOnLocalStorage()
        toastMessage('Success', 'Address updated', 'success')
      } else {
        toastMessage('Error', 'Address not found', 'error')
      }
    },

    handleRemoveBillingAddress(addressId: string) {
      const { toastMessage } = useUtils()

      ElMessageBox.confirm('Do you wish to delete this address?', 'Warning', {
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
      })
        .then(() => {
          this.billingAddresses = this.billingAddresses.filter((address) => address.id !== addressId)
          this.saveAddressOnLocalStorage()
          toastMessage('Success', 'Address removed', 'success')
        })
        .catch(() => {
          toastMessage('Info', 'Action cancelled', 'info')
        })
    },

    saveAddressOnLocalStorage() {
      localStorage.setItem('addresses', JSON.stringify(this.billingAddresses))
    },
  },
})
