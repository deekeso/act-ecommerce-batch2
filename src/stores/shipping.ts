import { defineStore } from 'pinia'
import type { UserAddress } from './user'

export interface PaymentMethod {
  id: string
  name: string
  type: 'cod' | 'card' | 'ewallet'
  icon?: string
}

export interface ShippingFee {
  regions: string[]
  fee: number
}

export const useShippingStore = defineStore('shipping', {
  state: () => ({
    paymentMethods: [
      {
        id: 'cod',
        name: 'Cash on Delivery',
        type: 'cod',
        icon: 'money',
      },
      {
        id: 'visa',
        name: 'Visa',
        type: 'card',
        icon: 'credit-card',
      },
      {
        id: 'mastercard',
        name: 'Mastercard',
        type: 'card',
        icon: 'credit-card',
      },
      {
        id: 'gcash',
        name: 'GCash',
        type: 'ewallet',
        icon: 'wallet',
      },
      {
        id: 'paymaya',
        name: 'PayMaya',
        type: 'ewallet',
        icon: 'wallet',
      },
    ] as PaymentMethod[],

    shippingFees: [
      {
        regions: ['03', '04', '13'], // Central Luzon, CALABARZON, NCR
        fee: 50,
      },
      {
        regions: ['01', '02', '05', '14'], // Ilocos, Cagayan, Bicol, CAR
        fee: 75,
      },
      {
        // Default fee for all other regions
        regions: [],
        fee: 100,
      },
    ] as ShippingFee[],
  }),

  getters: {
    getPaymentMethodsByType: (state) => {
      return (type: string) => {
        return state.paymentMethods.filter((method) => method.type === type)
      }
    },

    getAllPaymentMethods: (state) => {
      return state.paymentMethods
    },

    calculateShippingFee: (state) => {
      return (address: UserAddress): number => {
        if (!address || !address.region) {
          return state.shippingFees[2].fee // Default to highest fee if no address
        }

        const regionCode = address.region

        // Find the matching shipping fee tier for the region
        const feeTier = state.shippingFees.find((tier) => tier.regions.includes(regionCode))

        if (feeTier) {
          return feeTier.fee
        }

        // If no specific tier is found, use the default fee
        const defaultFeeTier = state.shippingFees.find((tier) => tier.regions.length === 0)
        return defaultFeeTier ? defaultFeeTier.fee : 100
      }
    },
  },
})
