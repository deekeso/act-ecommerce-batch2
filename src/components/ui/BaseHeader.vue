<template>
  <the-action-links></the-action-links>
  <header class="header">
    <nav class="navbar">
      <router-link to="/">
        <h1 class="brand-name">Shop Plus</h1>
      </router-link>
      <el-form style="display: flex" @submit.prevent="handleSearch()">
        <el-autocomplete
          v-model="state"
          :fetch-suggestions="querySearch"
          :trigger-on-focus="false"
          clearable
          class="inline-input w-50"
          placeholder="Search in Shop Chops"
          @select="handleSelect"
          popper-class="custom-autocomplete"
        >
          <template #default="{ item }">
            <div class="autocomplete-item">
              <img :src="item.image" alt="product" class="product-img" />
              <span>{{ item.name }}</span>
            </div>
          </template>
        </el-autocomplete>
        <el-button :icon="Search" native-type="submit" />
      </el-form>
      <div class="cart" @click="handleCart()" role="button">
        <el-icon :size="30"><ShoppingCart /></el-icon>
        <p>Cart</p>
      </div>
    </nav>
  </header>
</template>

<script lang="ts" setup>
import TheActionLinks from './ActionLinks.vue'
import { ElAutocomplete, ElButton, ElIcon, ElMessage } from 'element-plus'
import { Search, ShoppingCart } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { products as productItems } from '@/models'
import type { Products } from '@/types'
import { useRouter, RouterLink } from 'vue-router'

import type { AutocompleteFetchSuggestionsCallback } from 'element-plus'

const state = ref('')
const router = useRouter()

const products = ref<Products[]>(productItems)

const querySearch = (queryString: string, cb: AutocompleteFetchSuggestionsCallback) => {
  const results = queryString ? products.value.filter(createFilter(queryString)) : products.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString: string) => {
  return (product: Products) => {
    return product.name.toLowerCase().includes(queryString.toLowerCase())
  }
}

const handleSelect = (item: Record<string, any>) => {
  if (item.link) {
    router.push(item.link)
  }
}

const handleSearch = () => {
  ElMessage.success('searching')
}

const handleCart = () => {
  console.log('cart')
}
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

:deep(.el-input) {
  width: 500px;
  height: 50px;
  --el-input-focus-border-color: var(--primary-black);
  --el-input-border-color: #000;
}

.el-button {
  height: 50px;
  background-color: var(--primary-black);
  color: white;
  --el-button-focus-border-color: var(--primary-black);
  --el-button-active-border-color: #666666;
}

/* show image on search input */
.autocomplete-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
}

.product-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
