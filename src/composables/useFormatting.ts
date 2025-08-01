export function useFormatting() {
  /**
   * Formats a number into a currency string (e.g., ₱1,234.56).
   * @param price The number to format.
   * @returns The formatted price string.
   */
  const formatPrice = (price: number): string => {
    return `₱${price.toLocaleString('en-PH', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`
  }

  /**
   * Formats a category string for display
   * @param category The category string.
   * @returns The formatted category string.
   */
  const formatCategory = (category: string): string => {
    if (!category) return 'Uncategorized'
    return category
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  /**
   * Formats a payment method code into a full display string.
   * @param method The payment method code (e.g., 'cod').
   * @returns The full payment method string.
   */
  const formatPaymentMethod = (method: string): string => {
    if (method === 'cod') return 'Cash On Delivery'
    if (method === 'card') return 'Card Payment'
    if (method === 'ewallet') return 'E-Wallet Payment'
    return method
  }

  /**
   * Calculates the shipping fee based on the region code.
   * @param regionCode The code of the shipping region.
   * @returns The shipping fee.
   */
  const calculateShippingFee = (regionCode: string): number => {
    if (!regionCode) return 50 // Default fee if no region is selected
    if (regionCode === '13') {
      // NCR
      return 50
    }
    if (['01', '02', '03', '4A', '4B', '05'].includes(regionCode)) {
      // Luzon
      return 100
    }
    if (['06', '07', '08'].includes(regionCode)) {
      // Visayas
      return 150
    }
    if (['09', '10', '11', '12', '14', '15', '16'].includes(regionCode)) {
      // Mindanao
      return 200
    }
    return 50 // Default fee
  }

  return {
    formatPrice,
    formatCategory,
    formatPaymentMethod,
    calculateShippingFee,
  }
}
