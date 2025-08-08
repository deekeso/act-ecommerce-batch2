<template>
  <main class="container">
    <product-list />
  </main>
</template>

<script lang="ts" setup>
import { ProductList } from '@/components'
import { onMounted, onBeforeMount } from 'vue'
// import { products } from '@/models'
import { useProducts } from '@/stores/products'

const productStore = useProducts()

onBeforeMount(() => {
  productStore.initializeProducts()
})

onMounted(() => {
  productStore.loadProducts()
})
</script>

<style scoped>
.container {
  width: 100%;
}
</style>
