import { defineStore } from 'pinia'
import type { Products } from '@/types'
export const useProducts = defineStore('products', {
  state: () => ({
    products: JSON.parse(localStorage.getItem('products') || '[]') as Products[],
  }),

  getters: {},

  actions: {
    getProductById(id: string) {
      return this.products.find((product) => product.id === id)
    },
    saveOnLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products))
    },
  },
})
