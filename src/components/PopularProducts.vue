<template>
  <div class="popular-items">
    <product-card
      v-for="product in popularProducts"
      :key="product.id"
      :id="product.id"
      :name="product.name"
      :price="product.price"
      :image="product.image"
      :description="product.description"
      :link="product.link"
      :value="product.value"
      :label="product.label"
    />
  </div>
</template>

<script lang="ts" setup>
import { popularProducts } from '@/models'
import { ProductCard } from '@/components'
</script>

<style scoped>
.popular-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 products per row by default */
  gap: 20px; /* Spacing between items */
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .popular-items {
    grid-template-columns: repeat(3, 1fr); /* 3 products per row on tablets */
  }
}

@media (max-width: 768px) {
  .popular-items {
    grid-template-columns: repeat(2, 1fr); /* 2 products per row on mobile */
  }
}

@media (max-width: 480px) {
  .popular-items {
    grid-template-columns: 1fr; /* 1 product per row on very small screens */
  }
}
</style>
