<template>
  <header class="app-header">
    <!-- Top banner -->
    <div class="banner">
      <el-button disabled link size="small"> FEEDBACK </el-button>
      <el-button disabled link size="small"> CUSTOMER CARE </el-button>

      <el-dropdown placement="bottom" size="small" v-if="userStore.isLoggedIn" trigger="click">
        <el-button link size="small"> MY ACCOUNT </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="router.push('/profile')">My Profile</el-dropdown-item>
            <el-dropdown-item @click="router.push('/orders')">My Orders</el-dropdown-item>
            <el-dropdown-item divided @click="showLogoutConfirmation = true"
              >Logout</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button v-else @click="showLoginModal = true" link size="small"> LOGIN </el-button>
    </div>

    <div class="header-container">
      <!-- Menu -->
      <el-row :gutter="10" :align="'middle'" :justify="'space-between'">
        <el-col :span="6">
          <div class="logo">
            <router-link to="/">
              <img src="@/assets/logo.svg" alt="Digidelights" class="logo-img" />
            </router-link>
          </div>
        </el-col>

        <el-col :span="16">
          <div class="search-bar">
            <el-form @submit.prevent="handleSearch()" size="large">
              <el-autocomplete
                v-model="searchQuery"
                :fetch-suggestions="querySearch"
                :trigger-on-focus="false"
                clearable
                class="searchBar"
                popper-class="searchSuggestions"
                placeholder="Search for your favorites"
                @select="handleSelect"
              >
                <template #default="slotProps">
                  <div v-if="slotProps && slotProps.item" class="autocomplete-item">
                    <el-image
                      :src="slotProps.item.image"
                      :fit="'cover'"
                      alt="product-img"
                      class="product-img"
                    />
                    <span>{{ slotProps.item.label }}</span>
                  </div>
                </template>
              </el-autocomplete>
              <el-button
                :icon="Search"
                native-type="submit"
                size="large"
                color="var(--chocolate)"
              />
            </el-form>
          </div>
        </el-col>

        <el-col :span="2">
          <div class="header-cart">
            <router-link to="/cart" class="cart-link">
              <el-badge
                :value="cartStore.itemCount"
                :hidden="cartStore.itemCount === 0"
                class="cart-badge"
              >
                <el-button :icon="ShoppingCart" size="large" />
              </el-badge>
            </router-link>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- Login Modal -->
    <LoginModal
      v-model:visible="showLoginModal"
      @switch-to-register="switchToRegister"
      @switch-to-forgot-password="switchToForgotPassword"
      @login-success="handleLoginSuccess"
    />

    <!-- Register Modal -->
    <RegisterModal
      v-model:visible="showRegisterModal"
      @switch-to-login="switchToLogin"
      @register-success="handleRegisterSuccess"
    />

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal
      v-model:visible="showForgotPasswordModal"
      @switch-to-login="switchToLogin"
    />

    <!-- Logout Confirmation Modal -->
    <ConfirmationModal
      v-model:show="showLogoutConfirmation"
      title="Confirm Logout"
      message="Are you sure you want to logout?"
      confirm-button-text="Logout"
      @confirm="handleLogout"
    />
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useProductStore } from '@/stores/product'
import { ElMessage } from 'element-plus'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import LoginModal from './LoginModal.vue'
import RegisterModal from './RegistrationModal.vue'
import ForgotPasswordModal from './ForgotPasswordModal.vue'
import ConfirmationModal from './ConfirmationModal.vue'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
const productStore = useProductStore()
const searchQuery = ref('')

// Modal visibility states
const showLoginModal = ref(false)
const showRegisterModal = ref(false)
const showForgotPasswordModal = ref(false)
const showLogoutConfirmation = ref(false)

// Search functionality
const querySearch = (query: string, cb: (results: any[]) => void) => {
  if (query.length === 0) {
    cb([])
    return
  }

  const queryLower = query.toLowerCase()
  const results = productStore.products
    .filter((product) => {
      return (
        product.name.toLowerCase().includes(queryLower) ||
        product.description.toLowerCase().includes(queryLower) ||
        product.category.toLowerCase().includes(queryLower)
      )
    })
    .map((product) => ({
      value: product.name,
      label: product.name,
      image: product.image,
      id: product.id,
    }))
    .slice(0, 4) // Limit to 4 results for better UX

  cb(results)
}

const handleSelect = (item: { id: number }) => {
  router.push(`/product/${item.id}`)
}

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/products',
      query: { search: searchQuery.value },
    })
  }
}

// Switch between login and register modals
const switchToRegister = () => {
  showLoginModal.value = false
  showForgotPasswordModal.value = false
  showRegisterModal.value = true
}

const switchToForgotPassword = () => {
  showLoginModal.value = false
  showRegisterModal.value = false
  showForgotPasswordModal.value = true
}

const switchToLogin = () => {
  showRegisterModal.value = false
  showForgotPasswordModal.value = false
  showLoginModal.value = true
}

// Handle successful login/register
const handleLoginSuccess = () => {
  ElMessage.success(`Welcome back, ${userStore.user?.name || 'User'}!`)
  showLoginModal.value = false
}

const handleRegisterSuccess = () => {
  ElMessage.success('Registration successful! Welcome to Digidelights')
  showRegisterModal.value = false
}

// Handle logout confirmation
const handleLogout = () => {
  userStore.logout()
  ElMessage.success('You have been logged out')
  router.push('/')
}
</script>

<style scoped>
.app-header {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
}

.banner {
  display: flex;
  justify-content: flex-end;
  background-color: var(--chocolate);
  padding: 0.5rem 3rem;
  gap: 0.5rem;
}

.banner :deep(.el-button) {
  color: white;
  --el-button-hover-color: var(--brown);
  --el-button-active-color: var(--brown);
}

.logo {
  margin-right: 20px;
}

.logo-img {
  height: 80px;
}

.search-bar {
  margin-left: 20px;
  flex: 1;
}

.search-bar form {
  display: flex;
  align-items: center;
}

/* .search-bar :deep(.el-input) {
  --el-input-focus-border-color: var(--mint);
  --el-input-active-border-color: var(--mint);
} */

/* .search-bar :deep(.el-button) {
  background-color: var(--chocolate);
  color: white;
  --el-button-focus-border-color: var(--chocolate);
  --el-button-hover-bg-color: var(--brown);
  --el-button-active-border-color: var(--brown);
} */

.searchSuggestions {
  background-color: var(--teal);
}

.autocomplete-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
}

.product-img {
  width: 50px;
  height: 50px;
}

.header-cart {
  margin-left: 20px;
}

.header-cart :deep(.el-button) {
  --el-button-bg-color: transparent;
  color: var(--chocolate);
}

.cart-badge:deep(.el-badge__content) {
  background-color: var(--teal);
}
</style>
