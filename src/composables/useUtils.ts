import { ElNotification } from 'element-plus'
import type { Variant } from '@/types'
import { products } from '@/models'

export const useUtils = () => {
  /**
   * Format numbers into ex: '₱100.00'
   * @param {number} amount:number
   * @returns {any}
   */
  const formatPrice = (amount: number): string => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2,
    }).format(amount)
  }

  /**
   * Display a toast message at the bottom right
   * @param {string} title:string
   * @param {string} message:string
   * @param {string } type: 'info' | 'warning' | 'success' | 'error'
   * @param {string } duration:number | miliseconds ex: 1000
   */
  const toastMessage = (title: string, message: string, type: Variant, duration = 0o500) => {
    ElNotification({
      title: title,
      message: message,
      type: type,
      duration: duration,
      position: 'bottom-right',
    })
  }

  /**
   * Truncate text
   * @param {string} text:string
   * @param {number} length:number
   * @returns {string}
   */
  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return
    return text.slice(0, length) + ' . . .'
  }

  /**
   * Capitalize the first letter of the string
   * @param {any} value:string
   * @returns {string}
   */
  const capitalizeFirstWord = (value: string): string => {
    if (!value) return ''
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
  }

  /**
   *  Capitalize each word of the string
   * @param {any} value:string
   * @returns {any}
   */
  const capitalizeEachWord = (value: string): string => {
    if (!value) return ''
    return value
      .split(' ')
      .map((word) =>
        word
          .split('-')
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
          .join('-'),
      )
      .join(' ')
  }

  /**
   * Randomly selects a given number of products from the full product list.
   * @param count Number of random products to return.
   * @returns An array of randomly selected product objects.
   */
  const getRandomProducts = (count: number) => {
    const shuffled = [...products].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }

  const isEmptyObject = (obj: object) => obj && Object.keys(obj).length === 0 && obj.constructor === Object

  return {
    formatPrice,
    toastMessage,
    truncateText,
    capitalizeFirstWord,
    capitalizeEachWord,
    getRandomProducts,
    isEmptyObject,
  }
}
