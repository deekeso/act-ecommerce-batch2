<template>
  <main class="category-wrapper">
    <div class="search-bar-form">
      <search-bar />
    </div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Homepage</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/products' }">Products</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/category/${category}` }">{{ category }}</el-breadcrumb-item>
    </el-breadcrumb>

    <h1>Products in "{{ category }}"</h1>
    <div v-if="filteredProducts.length > 0" class="product-card">
      <product-card
        v-for="product in filteredProducts.slice(0, 50)"
        :key="product.id"
        :id="product.id"
        :price="product.price"
        :image="product.image"
        :description="product.description"
        :link="product.link"
        :value="product.value"
        :label="product.label"
      />
    </div>

    <el-empty description="No products found in this category." v-else></el-empty>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '@/stores/products' // Adjust path if needed
import type { Products } from '@/types'
import { ProductCard, SearchBar } from '@/components'

const route = useRoute()
const category = ref(route.params.name as string)

const productStore = useProducts()
const filteredProducts = ref<Products[]>([])

function loadProductsByCategory() {
  filteredProducts.value = productStore.products.filter(
    (product) => product.category?.toLowerCase() === category.value.toLowerCase(),
  )
  console.log(filteredProducts.value)
}

// If route param changes dynamically
watch(
  () => route.params.name,
  (newVal) => {
    category.value = newVal as string
    loadProductsByCategory()
  },
)

onMounted(() => {
  loadProductsByCategory()
})
</script>

<style scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}

.category-wrapper {
  max-width: 1400px;
  margin: 2rem auto;
  height: 100%;
  min-height: 80vh;
}

.product-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.search-bar-form {
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 750px) {
  .search-bar-form {
    display: none;
  }
}

@media (max-width: 1024px) {
  .product-card {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .product-card {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 1400px) {
  .category-wrapper {
    padding: 0px;
  }
}

@media (min-width: 400px) {
  .category-wrapper {
    padding: 20px;
  }
}
</style>
