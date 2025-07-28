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
        <router-link to="/profile" class="link" v-if="authStore.token">
          <el-icon :size="20"><User /></el-icon>
          <!-- <p>Profile</p> -->
        </router-link>
        <router-link to="/cart" class="link" role="button">
          <el-icon :size="20"><ShoppingCart /></el-icon>
          <!-- <p>Cart</p> -->
        </router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import TheActionLinks from './ActionLinks.vue'
import { SearchBar } from '@/components'
import { ElIcon } from 'element-plus'
import { ShoppingCart, User } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
import { useAuth } from '@/stores/auth'

const authStore = useAuth()
</script>

<style scoped>
.flex-links {
  display: flex;
  align-content: center;
  gap: 12px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.search-bar-form {
  width: 500px;
}

@media (max-width: 750px) {
  .search-bar-form {
    display: none;
  }
}
</style>
