<template>
  <main class="container">
    <product-list />
  </main>
</template>

<script lang="ts" setup>
import { ProductList } from '@/components'
import { onMounted } from 'vue'
import { products } from '@/models'

onMounted(() => {
  if (!JSON.parse(localStorage.getItem('products') || `[]`).length) {
    localStorage.setItem('products', JSON.stringify(products))
  }
})
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
