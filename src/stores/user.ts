import { defineStore } from 'pinia'

export interface UserAddress {
  name?: string
  street: string
  instructions?: string
  region: string // This will now store region_code
  province: string // This will now store province_code
  city: string // This will now store city_code
  barangay: string // This will now store brgy_code
}

export interface Order {
  id: string
  items: Array<{
    id: number
    name: string
    price: number
    quantity: number
    image: string
    description: string
    category: string
  }>
  subtotal: number
  shippingFee: number
  totalAmount: number
  shippingAddress: UserAddress
  paymentMethod: string
  date: string
}

export interface User {
  email: string
  name: string
  address: UserAddress
  password?: string
  orders?: Order[]
}

interface UserState {
  user: User | null
  isRegistering: boolean
  registrationStep: number
  tempUserData: Partial<User>
  showLoginModal: boolean
}

export const useUserStore = defineStore('user', {
  state: (): UserState => {
    // Initialize state
    const state: UserState = {
      user: null,
      isRegistering: false,
      registrationStep: 1, // 1: Email, 2: Name and Address
      tempUserData: {},
      showLoginModal: false,
    }

    // Load user data from localStorage on initialization
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      state.user = JSON.parse(storedUser)
    }

    return state
  },

  getters: {
    isLoggedIn(): boolean {
      return !!this.user
    },
  },

  actions: {
    openLoginModal() {
      this.showLoginModal = true
    },

    closeLoginModal() {
      this.showLoginModal = false
    },

    // Save user data to localStorage
    saveUser() {
      if (this.user) {
        // Save current user session
        localStorage.setItem('user', JSON.stringify(this.user))

        // Update user in the users array
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const userIndex = users.findIndex((u: User) => u.email === this.user?.email)

        if (userIndex !== -1) {
          // Update existing user
          users[userIndex] = this.user
        } else {
          // Add new user if not found
          users.push(this.user)
        }

        localStorage.setItem('users', JSON.stringify(users))
      }
    },

    // Start registration process
    startRegistration() {
      this.isRegistering = true
      this.registrationStep = 1
      this.tempUserData = {}
    },

    // Set email and move to next step
    setEmail(email: string) {
      this.tempUserData.email = email
      this.registrationStep = 2
    },

    // Complete registration with name and address
    completeRegistration(name: string, address: UserAddress) {
      if (this.tempUserData.email) {
        const newUser: User = {
          email: this.tempUserData.email,
          name,
          address,
        }
        this.user = newUser
        this.isRegistering = false
        this.registrationStep = 0
        this.saveUser()
      }
    },

    // Register a new user
    async register(userData: Omit<User, 'orders'>, password: string) {
      // In a real app, this would send data to a backend
      // For demo purposes, just store it locally

      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = users.find((u: User) => u.email === userData.email)

      if (existingUser) {
        return false // User already exists
      }

      // Create new user with password and empty orders
      const newUser = {
        ...userData,
        password,
        orders: [],
      }

      // Add to users array
      users.push(newUser)
      localStorage.setItem('users', JSON.stringify(users))

      // Set as current user
      this.user = newUser
      this.saveUser()

      return true
    },

    // Log in with email and password
    async login(email: string, password: string) {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')

      // Find user with matching email and password
      const user = users.find((u: User) => u.email === email && u.password === password)

      if (!user) {
        return false // Authentication failed
      }

      // Set as current user
      this.user = user
      this.saveUser()
      return true
    },

    // Log out
    logout() {
      // In a real app, this would clear session tokens, etc.
      // For now, just clear the user from localStorage
      localStorage.removeItem('user')
      this.user = null

      // Clear the cart when logging out
      localStorage.removeItem('cart')
    },

    // Add an order to the user's order history
    addOrder(order: Order) {
      if (this.user) {
        if (!this.user.orders) {
          this.user.orders = []
        }
        this.user.orders.push(order)
        this.saveUser() // Ensure user data is saved after adding an order
      }
    },

    // Create an order from the cart
    createOrderFromCart(
      cartItems: any[],
      shippingAddress: UserAddress,
      paymentMethod: string,
      subtotal: number,
      shippingFee: number,
    ): Order | null {
      if (!this.user) {
        return null
      }

      const newOrder: Order = {
        id: new Date().getTime().toString(),
        date: new Date().toISOString(),
        items: cartItems.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
          description: item.product.description,
          category: item.product.category,
        })),
        shippingAddress,
        paymentMethod,
        subtotal,
        shippingFee,
        totalAmount: subtotal + shippingFee,
      }

      this.addOrder(newOrder)

      return newOrder
    },

    // Get all orders for the current user
    getOrders() {
      return this.user?.orders || []
    },

    // Reset password function
    async resetPassword(email: string, newPassword: string): Promise<boolean> {
      // In a real app, this would make an API call to reset the password
      // For demo purposes, we'll just update the password in the local storage

      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const userIndex = users.findIndex((u: User) => u.email === email)

      if (userIndex === -1) {
        return false // User not found
      }

      // Update the password in the users array
      users[userIndex].password = newPassword
      localStorage.setItem('users', JSON.stringify(users))

      // If this is the current logged-in user, update the store
      if (this.user?.email === email) {
        this.user.password = newPassword
        this.saveUser()
      }

      return true
    },
  },
})
