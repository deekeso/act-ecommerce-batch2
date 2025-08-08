<template>
  <section id="banner" class="container">
    <div class="search-bar-form">
      <search-bar />
    </div>
    <base-banner />
  </section>

  <section id="category" class="container">
    <h1>Categories</h1>
    <div class="category-list">
      <base-pill v-for="(category, index) in categories" :key="index" :name="category.name" />
    </div>
  </section>

  <section id="popular-products" class="container">
    <h2>Popular Products</h2>

    <popular-products />
  </section>
  <div class="center">
    <router-link to="/products">View All Products</router-link>
  </div>
</template>

<script lang="ts" setup>
import { BaseBanner, BasePill, PopularProducts, SearchBar } from '@/components'
import { categories } from '@/models'
import { RouterLink } from 'vue-router'
import { onMounted } from 'vue'
import { useProducts } from '@/stores/products'

const productStore = useProducts()

onMounted(() => {
  productStore.initializeProducts()
})
</script>

<style scoped>
.search-bar-form {
  width: 100%;
  padding: 0 20px;
  margin: 20px 0;
  box-sizing: border-box;
}

#banner {
  padding: 0px;
}

.container {
  padding: 20px;
}

.center {
  width: 100%;
  display: flex;
  justify-content: center;
}

a {
  text-decoration: none;
  color: black;
  border: 1px black solid;
  padding: 8px;
  border-radius: 4px;
}

a:hover {
  background-color: black;
  color: white;
}

#category,
#popular-products {
  max-width: 1440px;
  margin: 0 auto;
}

#category {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  margin: 4px auto;
}

h1 {
  width: 100%;
  font-size: 2rem;
  margin-bottom: 1rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.category-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
}

/* Optional: style the scrollbar */
.category-list::-webkit-scrollbar {
  height: 6px;
}

.category-list::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border-radius: 4px;
}

.category-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

@media (max-width: 768px) {
  .category-list {
    flex-wrap: nowrap;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    padding-bottom: 8px;
  }

  .category-list > * {
    flex: 0 0 auto;
  }
}

@media (min-width: 750px) {
  .search-bar-form {
    display: none;
  }
}
</style>
