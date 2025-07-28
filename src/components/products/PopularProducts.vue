<template>
  <div class="popular-items">
    <product-card
      v-for="product in popularProducts"
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
</template>

<script lang="ts" setup>
import { popularProducts } from '@/models'
import { ProductCard } from '@/components'
</script>

<style scoped>
.popular-items {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  max-width: 1440px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .popular-items {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .popular-items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .popular-items {
    grid-template-columns: 1fr;
  }
}
</style>
