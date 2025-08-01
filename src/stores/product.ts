import { defineStore } from 'pinia'
import type { Product } from './cart'
import prod_1 from '@/images/wwcb.jpg'
import prod_2 from '@/images/sapc.jpg'
import prod_3 from '@/images/tyc.webp'
import prod_4 from '@/images/dccb.webp'

export const useProductStore = defineStore('products', {
  state: () => ({
    // Mock product data
    products: [
      {
        id: 1,
        name: 'Whimsical Wildflower Cookie Box',
        price: 600,
        image: prod_1,
        description:
          'Embrace the enchanting beauty of Spring with the Whimsical Wildflower Cookie Box. Filled with an irresistible assortment of freshly baked cookies, this delightful box brings together nature’s charm and decadent flavors for a treat that’s as beautiful as it is delicious. Included inside are 18 bite-sized cookies, 12 brownie bites, and 2 frosted flower cookies. Whether gifting to a loved one or indulging yourself, it’s the perfect way to celebrate the season with a touch of whimsy.',
        category: 'cookies-and-brownies',
      },
      {
        id: 2,
        name: 'Sunshine and Petals Cookie Crate',
        price: 750,
        image: prod_2,
        description:
          'A perfect Spring day is best enjoyed under clear skies, surrounded by beautiful flowers, and complemented by the irresistible indulgence of our cookies. Inside this sunny crate are 9 original cookies, 12 brownie bites, and 2 frosted flower cookies.',
        category: 'cookies-and-brownies',
      },
      {
        id: 3,
        name: 'Thinking of You Cookie Crate',
        price: 575,
        image: prod_3,
        description:
          'Brighten someone’s day with our Thinking of You Cookie Crate – a delicious, thoughtful way to show how much you care! Each charming crate is filled with a delightful assortment of our handcrafted cookies, baked fresh and bursting with comforting flavors. Inside are 24 bite-sized cookies, 12 brownie bites, and 2 natural frosted cookies. ',
        category: 'cookies-and-brownies',
      },
      {
        id: 4,
        name: 'Daisy Chain Cookie and Brownie Box',
        price: 500,
        image: prod_4,
        description:
          'Keep it sweet and simple with this summery cookie box that includes 18 bite-sized cookies, 12 brownie bites, and 2 natural frosted cookies, finished with a hand-tied bow.',
        category: 'cookies-and-brownies',
      },
      {
        id: 5,
        name: 'Coffee Maker',
        price: 3499,
        image: '/images/coffeemaker.jpg',
        description: 'Brew perfect coffee every morning with this programmable coffee maker.',
        category: 'strawberries',
      },
      {
        id: 6,
        name: 'Fitness Tracker',
        price: 1999,
        image: '/images/fitnesstracker.jpg',
        description:
          'Monitor your daily activity and health metrics with this comfortable wearable.',
        category: 'strawberries',
      },
      {
        id: 7,
        name: 'Bluetooth Speaker',
        price: 1499,
        image: '/images/speaker.jpg',
        description: 'Portable speaker with amazing sound quality and long battery life.',
        category: 'sweet-treats',
      },
      {
        id: 8,
        name: 'Air Fryer',
        price: 4299,
        image: '/images/airfryer.jpg',
        description: 'Cook healthy meals quickly with little to no oil.',
        category: 'sweet-treats',
      },
    ] as Product[],
  }),

  getters: {
    // Get all available categories
    categories(): string[] {
      const categorySet = new Set<string>()
      this.products.forEach((product) => categorySet.add(product.category))
      return Array.from(categorySet)
    },
  },

  actions: {
    // Filter products by category
    getProductsByCategory(category: string): Product[] {
      if (category === 'all') {
        return this.products
      }
      return this.products.filter((product) => product.category === category)
    },

    // Get a single product by ID
    getProductById(id: number): Product | undefined {
      return this.products.find((product) => product.id === id)
    },
  },
})
