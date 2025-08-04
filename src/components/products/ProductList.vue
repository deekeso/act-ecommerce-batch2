<template>
  <div class="product-section">
    <div class="search-bar-form">
      <search-bar />
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Home Page</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/products' }">Products</el-breadcrumb-item>
    </el-breadcrumb>

    <h1 class="heading">Just For You</h1>
    <div class="product-list">
      <template v-if="products.length">
        <product-card
          v-for="product in products.slice(0, loadMore)"
          :key="product.id"
          :id="product.id"
          :price="product.price"
          :image="product.image"
          :description="product.description"
          :link="product.link"
          :value="product.value"
          :label="product.label"
        />
      </template>
      <el-empty v-else description="No products found" />
    </div>
    <div class="load-more-container">
      <el-button v-if="loadMore < products.length" @click="loadMore += 8">LOAD MORE</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProductCard, SearchBar } from '@/components'
import { useProducts } from '@/stores/products'
import { reactive, ref } from 'vue'
import type { Products } from '@/types'
import { ElButton, ElEmpty } from 'element-plus'

const loadMore = ref(12)

const productStore = useProducts()

const products = reactive<Products[] | []>(productStore.products)
</script>

<style scoped>
.el-breadcrumb {
  margin: 2rem 0 1rem 0;
}

.product-section {
  padding: 1rem;
  max-width: 1440px;
  margin: 0 auto;
  box-sizing: border-box;
}

.heading {
  font-size: 24px;
  box-sizing: border-box;
}

/* Grid container for product cards */
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
  box-sizing: border-box;
}

/* Center the load more button */
.load-more-container {
  text-align: center;
  margin: 2rem 0;
}

.el-button {
  text-decoration: none;
  color: black;
  border: 1px black solid;
  padding: 20px;
  border-radius: 4px;
}

.el-button:hover {
  background-color: black;
  color: white;
}

/* .el-button {
  background-color: var(--primary-black);
  color: white;
} */

.search-bar-form {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 750px) {
  .search-bar-form {
    display: none;
  }
}
</style>
