<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Homepage</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/products' }">Products</el-breadcrumb-item>
      <el-breadcrumb-item>{{ product?.name }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="product-details">
      <div class="product-image">
        <el-image :src="product?.image" fit="fill" :lazy="false" />
      </div>
      <div class="product-description">
        <h1>{{ product?.name }}</h1>
        <p>{{ product?.description }}</p>
        <p class="price-tag">{{ formattedPrice }}</p>
        <p>Return & Warranty: 7 Days Free Return · Warranty not available</p>
        <div class="quantity">
          <p>Quantity:</p>
          <div class="control">
            <el-button color="black" size="default" @click="quantity--" :disabled="quantity === 1">
              <span>-</span>
            </el-button>
            <el-input v-model="quantity" :readonly="true" />
            <el-button color="black" size="default" @click="quantity++">
              <span>+</span>
            </el-button>
          </div>
        </div>
        <div class="control">
          <el-button class="btn" color="black">Buy Now</el-button>
          <el-button class="btn" color="black">Add to cart</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useProducts } from '@/stores/products'
import { ref, onMounted, watch, computed } from 'vue'
import type { Products } from '@/types'
import { useUtils } from '@/composables/useUtils'

const { formatPrice } = useUtils()

const route = useRoute()
const productStore = useProducts()
const product = ref<Products | null>(null)
const quantity = ref(1)

const loadProduct = (id: string) => {
  product.value = productStore.getProductById(id) ?? null
}

// formatted price
const formattedPrice = computed(() => formatPrice(product.value?.price ?? 0))

onMounted(() => {
  loadProduct(route.params.id as string)
})

watch(
  () => route.params.id,
  (newId) => {
    loadProduct(newId as string)
    quantity.value = 1
  },
)
</script>

<style scoped>
.container {
  max-width: 1440px;
  width: 100%;
  padding: 0 1rem;
  margin: 3rem auto;
}

.product-details {
  margin-top: 24px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.product-image {
  flex: 1;
  display: flex;
}

:deep(.el-image) {
  width: 100%;
}
:deep(.el-image__inner) {
  width: 100%;
  height: 500px;
  border-radius: 16px;
  object-fit: contain;
}

.product-description {
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

:deep(.el-input) {
  width: 50px;
}

:deep(.el-input__inner) {
  text-align: center;
}

.price-tag {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-orange);
}

:deep(.el-button.btn) {
  width: 300px;
  height: 50px;
}

@media (max-width: 768px) {
  :deep(.el-image__inner) {
    width: 500px;
    height: auto;
  }
}

/* Tablet and up (>=768px) */
@media (min-width: 768px) {
  .product-details {
    flex-direction: row;
  }

  .product-image {
    flex: 1;
    justify-content: flex-start;
  }

  .product-description {
    flex: 1;
  }

  :deep(.el-image__inner) {
    width: 100%;
    height: auto;
  }
}

/* Desktop (>=1024px) */
@media (min-width: 1024px) {
  .product-description {
    padding-left: 2rem;
  }
}
</style>
