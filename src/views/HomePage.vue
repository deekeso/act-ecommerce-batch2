<template>
  <section id="banner" class="container">
    <base-banner />
  </section>

  <section id="category" class="container">
    <h1>Categories</h1>
    <base-pill v-for="(category, index) in categories" :key="index" :name="category.name" />
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
import { BaseBanner, BasePill, PopularProducts } from '@/components'
import { categories } from '@/models'
import { RouterLink } from 'vue-router'
</script>

<style scoped>
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
  margin-bottom: 2rem;
}
</style>
