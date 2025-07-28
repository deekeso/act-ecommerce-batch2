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
      <router-link to="/cart" class="cart" role="button">
        <el-icon :size="30"><ShoppingCart /></el-icon>
        <p>Cart</p>
      </router-link>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import TheActionLinks from './ActionLinks.vue'
import { SearchBar } from '@/components'
import { ElIcon } from 'element-plus'
import { ShoppingCart } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
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

/* cart */
.cart {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.search-bar-form{
  width: 500px;
}

@media (max-width: 750px) {
  .search-bar-form {
    display: none;
  }
}
</style>
