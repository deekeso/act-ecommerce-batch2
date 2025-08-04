<template>
  <div class="popular-items">
    <product-card
      v-for="product in products"
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
import { ref, onMounted, watch } from 'vue'
import { ProductCard } from '@/components'
import { useUtils } from '@/composables/useUtils'
import type { Products } from '@/types'
import { useRoute } from 'vue-router'

const products = ref<Products[]>([])
const route = useRoute()
const { getRandomProducts } = useUtils()

const regenerateProducts = () => {
  products.value = getRandomProducts(8)
}

onMounted(regenerateProducts)

watch(() => route.fullPath, regenerateProducts)
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
