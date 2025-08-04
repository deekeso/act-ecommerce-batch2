<template>
  <the-action-links></the-action-links>
  <header class="header">
    <nav class="navbar">
      <router-link to="/">
        <h1 class="brand-name">Shop+</h1>
      </router-link>
      <div class="search-bar-form">
        <search-bar />
      </div>
      <div class="flex-links">
        <el-dropdown v-if="authStore.token" trigger="click">
          <span class="link" role="button">
            <el-icon :size="20"><User /></el-icon>
            My Account
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/profile')">Profile</el-dropdown-item>
              <el-dropdown-item @click="router.push('/account-security')">Manage Account</el-dropdown-item>
              <el-dropdown-item @click="router.push('/order')">Purchase History</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <router-link to="/cart" class="link" role="button">
          <el-icon :size="20"><ShoppingCart /></el-icon>
          <span>Cart</span>
          <span v-if="cartStore.getCartItems.length > 0" class="">
            {{ authStore.token != null ? `(${cartStore.getCartItems.length})` : '' }}
          </span>
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import TheActionLinks from './ActionLinks.vue'
import { SearchBar } from '@/components'
import { ElIcon, ElMessageBox } from 'element-plus'
import { ShoppingCart, User } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useCart } from '@/stores/carts'

const cartStore = useCart()
const router = useRouter()
const authStore = useAuth()

function handleLogout() {
  ElMessageBox.confirm('Do you really want to logout?', 'Warning', { type: 'warning' })
    .then(() => {
      authStore.handleLogout()
      cartStore.clearBuyNow()
      router.push('/')
    })
    .catch(() => {
      return
    })
}
</script>

<style scoped>
.flex-links {
  display: flex;
  align-content: center;
  gap: 12px;
}

.cart-item-counter {
  /* position: absolute;
  top: 2px;
  right: 4px; */
  font-size: x-small;
  background-color: #000;
  color: white;
  padding: 2px 7px;
  border-radius: 50%;
}

.flex-links a {
  padding: 10px;
}

/* fixed header position */
.header {
  display: flex;
  justify-content: center;
  width: 100%;
  border-bottom: 1px #e4e4e4 solid;
}

/* navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 1440px;
}

.navbar a {
  text-decoration: none;
  color: #000;
}

/* links */
.link {
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  position: relative;
}

.search-bar-form {
  width: 500px;
}

@media (max-width: 853px) {
  .search-bar-form {
    width: 400px;
  }
}

@media (max-width: 768px) {
  .search-bar-form {
    display: none;
  }
}
</style>
