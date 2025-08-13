<template>
  <div class="container">
    <div class="account-settings">
      <aside class="sidebar">
        <h1>Account Settings</h1>
        <router-link to="/profile" exact-active-class="active">My Profile</router-link>
        <router-link to="/account-security" exact-active-class="active">Manage Account</router-link>
        <router-link to="/order" exact-active-class="active">Purchase History</router-link>
        <el-button type="danger" @click="onLogOut">Logout</el-button>
      </aside>

      <main class="content">
        <slot name="default" />
      </main>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '@/stores/auth'
import { ElMessageBox } from 'element-plus'
import { useCart } from '@/stores/carts'

const router = useRouter()
const authStore = useAuth()
const cartStore = useCart()

function onLogOut() {
  ElMessageBox.confirm('Are you sure you want to logout?', 'Warning', { confirmButtonText: 'YES', type: 'warning' })
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
.el-button {
  padding: 25px 20px;
  display: flex;
  justify-content: start;
  text-align: start;
  font-weight: 500;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 24px;
  box-sizing: border-box;
}

.account-settings {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
}

.sidebar {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05); */
}

.sidebar a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 16px;
  border-radius: 6px;
  transition: background 0.2s ease;
}

.sidebar a.active,
.sidebar a:hover {
  background-color: #eef2f8;
  color: #1f2937;
}

.content {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .container {
    height: 100%;
  }
  .account-settings {
    grid-template-columns: 1fr;
  }

  .sidebar {
    flex-direction: row;
    align-items: center;
    overflow-x: auto;
  }

  .sidebar a {
    white-space: nowrap;
  }
}

@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
</style>
