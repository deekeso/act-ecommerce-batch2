import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
import type { User } from '@/types'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCart } from '@/stores/carts'

export const useAuth = defineStore('auth', {
  state: () => ({
    users: JSON.parse(localStorage.getItem('users') || '[]') as User[],
    user: JSON.parse(localStorage.getItem('user') || 'null') as User | null,
    token: localStorage.getItem('token') ?? null,
  }),

  getters: {
    getCurrentUser: (state) => state.user,
    isAuthenticated: (state) => state.token && state.user,
    isGuest: (state) => !state.token,
  },
  actions: {
    updatePassword(password: string) {
      if (!this.user) {
        ElMessage.error('No authenticated user')
        return
      }

      const existingUserIndex = this.users.findIndex((user: User) => user.email === this.user?.email)

      if (existingUserIndex !== -1) {
        this.users[existingUserIndex].password = password
        this.user.password = password

        this.saveUsersOnLocalStorage()
        this.saveCurrentUserOnLocalStorage()

        ElMessage.success('Password updated successfully')
      } else {
        ElMessage.error('Failed to update password. User not found.')
      }
    },

    forgotPassword(userInput: { email: string }) {
      const existingUserIndex = this.users.findIndex((u) => u.email === userInput.email)

      if (existingUserIndex === -1) {
        ElMessage.error('Email not found')
        return
      }

      ElMessageBox.prompt('Enter your new password', 'Reset Password', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        inputType: 'password',
        inputPattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
        inputErrorMessage: 'Password must be at least 8 characters long',
      })
        .then(({ value }) => {
          this.users[existingUserIndex].password = value

          // If the current user is the one being updated
          if (this.user?.email === userInput.email) {
            this.user.password = value
            this.saveCurrentUserOnLocalStorage()
          }

          this.saveUsersOnLocalStorage()
          ElMessage.success('Password updated successfully')
        })
        .catch(() => {
          ElMessage.info('Password reset cancelled')
        })
    },

    setProfile(formData: Partial<User>) {
      if (!this.user) {
        ElMessage.error('No authenticated user')
        return
      }

      // Update user object
      this.user.firstname = formData.firstname ?? this.user.firstname
      this.user.lastname = formData.lastname ?? this.user.lastname
      // this.user.email = formData.email ?? this.user.email
      this.user.contact = formData.contact ?? this.user.contact
      this.user.address = formData.address ?? this.user.address

      // Update the user in the users list
      const index = this.users.findIndex((user) => user.id === this.user?.id)
      if (index !== -1) {
        this.users[index] = {
          ...this.users[index],
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          // email: this.user.email,
          contact: this.user.contact,
          address: this.user.address,
        }
      }

      // Save changes
      this.saveCurrentUserOnLocalStorage()
      this.saveUsersOnLocalStorage()
      ElMessage.success('Profile updated successfully')
    },

    handleLogin(credentials: User) {
      const cartStore = useCart()
      const user = this.checkExistingUser(credentials)
      if (!user || user.password !== credentials.password) {
        ElMessage.error('Invalid email or password')
      } else {
        this.user = user
        this.token = uuidv4()
        ElMessage.success('Successfully logged in')
        this.saveCurrentUserOnLocalStorage()
        localStorage.setItem('token', this.token)
        cartStore.initializeCart()
      }
    },

    handleSignUp(credentials: User) {
      const user = this.checkExistingUser(credentials)
      if (user) {
        ElMessage.error('email already exists')
      } else {
        const newUser = { ...credentials, id: uuidv4() }
        this.users.push(newUser)
        this.user = newUser
        this.token = uuidv4()
        this.saveUsersOnLocalStorage()
        this.saveCurrentUserOnLocalStorage()
        this.saveTokenOnLocalStorage()
        ElMessage.success('Account created successfully')
      }
    },

    handleLogout() {
      if (!this.token) {
        return
      }

      this.user = null
      this.token = null
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      ElMessage.success('Logged out')
    },

    checkExistingUser(credentials: User) {
      return this.users.find((user) => user.email === credentials.email)
    },

    saveCurrentUserOnLocalStorage() {
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    saveUsersOnLocalStorage() {
      localStorage.setItem('users', JSON.stringify(this.users))
    },

    saveTokenOnLocalStorage() {
      localStorage.setItem('token', JSON.stringify(this.token))
    },

    loadAuthFromStorage() {
      this.user = JSON.parse(localStorage.getItem('user') || 'null')
      this.token = localStorage.getItem('token') ?? null
    },
  },
})
