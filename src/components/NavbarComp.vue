<script lang="ts" setup>
import { useUserStore } from '@/stores/UserStore'
import { useProductStore } from '@/stores/ProductStore'
import type { Product } from '@/types/Product'
import { ShoppingCart } from '@element-plus/icons-vue'
import { onMounted, ref } from 'vue'
import AuthDialog from './AuthDialog.vue'
import { useUiStore } from '@/stores/UiStore'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import MenuDrawer from './MenuDrawer.vue'

const userStore = useUserStore()
const productStore = useProductStore()
const uiStore = useUiStore()
const searchText = ref('')
const router = useRouter()
const showLogin = ref(false)
const showRegister = ref(false)
const isMobile = ref(window.innerWidth <= 768)
const showDrawer = ref(false)

const querySearchAsync = (queryString: string, callback: (results: Product[]) => void) => {
  if (!queryString || queryString.trim().length < 1) {
    callback([])
    return
  }

  const results = productStore.products.filter((product) =>
    product.name.toLowerCase().includes(queryString.toLowerCase()),
  )
  callback(results)
}

const handleSelect = (item: { name: string }) => {
  router.push(`/product/${encodeURIComponent(item.name)}`)
}

const logout = () => {
  ElMessageBox.confirm('Are you sure you want to logout?', 'Confirm Logout', {
    confirmButtonText: 'Yes, log out',
    cancelButtonText: 'No',
    type: 'warning',
  })
    .then(() => {
      ElMessage.success('Logout successful')
      userStore.logout()
      router.push('/')
    })
    .catch(() => {})
}

onMounted(() => {
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }

  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
})
</script>

<template>
  <section id="navbar">
    <el-header class="navbar">
      <div class="navbar-container">
        <router-link v-if="!isMobile" to="/" class="dashboard-link">
          <div class="logo">
            <h1>DIGISHOP</h1>
          </div>
        </router-link>

        <el-icon v-if="isMobile" class="back-btn" @click="router.back()"><DArrowLeft /></el-icon>

        <el-autocomplete
          v-model="searchText"
          :fetch-suggestions="querySearchAsync"
          :trigger-on-focus="false"
          :debounce="300"
          placeholder="Search for a product..."
          @select="handleSelect"
          value-key="name"
          class="search-bar"
          prefix-icon="Search"
          clearable
        />

        <div class="nav-links" v-if="!isMobile">
          <router-link to="/product" class="product-link">
            <h3>PRODUCTS</h3>
          </router-link>

          <span v-if="!userStore.currentUser" class="product-link" @click="showLogin = true">
            <h3>LOGIN</h3>
          </span>
          <span v-if="!userStore.currentUser" class="product-link" @click="showRegister = true">
            <h3>REGISTER</h3>
          </span>
          <AuthDialog v-model:visible="showLogin" mode="login" />
          <AuthDialog v-model:visible="showRegister" mode="register" />
          <AuthDialog
            v-model:visible="uiStore.loginDialogVisible"
            :mode="uiStore.loginDialogMode"
          />

          <router-link v-if="userStore.currentUser" to="/profile" class="product-link">
            <h3>PROFILE</h3>
          </router-link>
          <span v-if="userStore.currentUser" class="product-link" @click="logout">
            <h3>LOGOUT</h3>
          </span>

          <router-link to="/cart" class="cart-icon">
            <el-badge :value="userStore.currentUser?.cartItems?.length">
              <el-icon class="cart" size="large"><ShoppingCart /></el-icon>
            </el-badge>
          </router-link>
        </div>
        <el-icon class="icon-menu" v-if="isMobile" @click="showDrawer = true"><Tools /></el-icon>
        <MenuDrawer v-model:visible="showDrawer" />
      </div>
    </el-header>
  </section>
</template>

<style lang="css" scoped>
:deep(.el-drawer) {
  border-left: 1px solid black;
}

:deep(.el-drawer__body) {
  padding: 0;
}

.navbar {
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  height: 72px;
  padding: 0 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar-container {
  width: 100%;
  max-width: 1280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

/* LOGO */
.logo h1 {
  margin: 0;
  font-size: 30px;
  font-weight: bold;
  color: #222;
  letter-spacing: -0.5px;
}

/* SEARCH */
.search-bar {
  flex-grow: 1;
  max-width: 600px;
  margin: 0 24px;
}

.search-bar :deep(.el-input__wrapper) {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.search-bar :deep(.el-input__wrapper:hover) {
  border-color: #409eff;
  box-shadow: 0 0 0 1px rgba(64, 158, 255, 0.2);
}

.search-bar :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 20px;
}

.product-link,
.dashboard-link {
  text-decoration: none;
  color: inherit;
  position: relative;
  font-weight: 500;
  transition: all 0.2s ease;
  padding: 8px 12px;
  border-radius: 6px;
}

.product-link:hover,
.dashboard-link:hover {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.06);
  transform: translateY(-2px);
}

.product-link::after,
.dashboard-link::after {
  content: '';
  position: absolute;
  left: 12px;
  bottom: 6px;
  width: calc(100% - 24px);
  height: 2px;
  background-color: #409eff;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.product-link:hover::after,
.dashboard-link:hover::after {
  transform: scaleX(1);
}

.product-link h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
}

.cart-icon {
  display: inline-flex;
  align-items: center;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 10px;
  border-radius: 8px;
  text-decoration: none;
}

.cart {
  font-size: 50px;
}

.cart-icon:hover {
  color: #409eff;
  background-color: rgba(64, 158, 255, 0.06);
  transform: translateY(-1px);
}

.cart-icon::after {
  content: '';
  position: absolute;
  left: 12px;
  bottom: 6px;
  width: calc(100% - 23px);
  height: 2px;
  background-color: #409eff;
  transform: scale(0);
  transform-origin: left;
  transition: all 0.3s ease;
}

.cart-icon:hover::after {
  transform: scaleX(1);
}

.icon-menu {
  cursor: pointer;
  transition: all 0.2s ease-out;
  border-radius: 10px;
  font-size: 23px;
}

.icon-menu:hover {
  background-color: black;
  color: white;
  transform: rotate(180deg);
}

.back-btn {
  font-size: 25px;

  transition: all 0.3s ease;
}

.back-btn:hover {
  transform: scale(1.2);
  border-radius: 20px;
  background-color: black;
  border-color: white;
  color: white;
  padding-right: 5px;
}
</style>
