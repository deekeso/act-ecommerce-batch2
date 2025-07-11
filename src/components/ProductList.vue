<template>
  <el-row :gutter="20" style="padding: 2rem 34.5rem">
    <el-col :span="24">
      <h1 class="heading">Just For You</h1>
    </el-col>
    <el-col
      :span="6"
      v-for="product in products.slice(0, loadMore)"
      :key="product.id"
      style="margin-bottom: 1rem"
    >
      <product-card
        :id="product.id"
        :name="product.name"
        :price="product.price"
        :image="product.image"
        :description="product.description"
        :link="product.link"
        :value="product.value"
        :label="product.label"
      />
      <el-empty v-if="!products.length" description="No products found" />
    </el-col>
    <el-col :span="24" align="center">
      <el-button @click="loadMore += 8">LOAD MORE</el-button>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ProductCard } from '@/components'
import { useProducts } from '@/stores/products'
import { reactive, ref } from 'vue'
import type { Products } from '@/types'
import { ElButton, ElEmpty } from 'element-plus'

const loadMore = ref(12)

const productStore = useProducts()

const products = reactive<Products[] | []>(productStore.products)
</script>

<style scoped>
.heading {
  font-size: 24px;
  margin-bottom: 4px;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  width: 1440px;
  margin-top: 4rem;
}

.el-button {
  background-color: var(--primary-black);
  color: white;
}
</style>
