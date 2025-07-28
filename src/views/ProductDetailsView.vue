<template>
  <div class="container">
    <div class="search-bar-form">
      <search-bar />
    </div>

    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">Homepage</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/products' }">Products</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: `/category/${product?.category}` }">{{ product?.category }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ product?.label }}</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="product-details">
      <div class="product-image">
        <el-image class="product-image-el" :src="product?.image" fit="fill" :lazy="false" />
      </div>

      <div class="product-description">
        <h1>{{ product?.label }}</h1>
        <p>{{ product?.description }}</p>
        <p class="price-tag">{{ formattedPrice }}</p>
        <p>Return & Warranty: 7 Days Free Return · Warranty not available</p>

        <div class="quantity">
          <p>Quantity:</p>
          <el-input-number v-model="quantity" :min="1" :max="100" />
        </div>

        <div class="control">
          <el-button class="btn product-btn" color="black" @click="handleBuyItem">Buy Now</el-button>
          <el-button class="btn product-btn" color="black" @click="handleAddToCart">Add to cart</el-button>
        </div>
      </div>
    </div>

    <div class="mt">
      <h1>Recommended Item</h1>
      <popular-products />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@/stores/auth'
import { PopularProducts, SearchBar } from '@/components'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '@/stores/products'
import { ref, onMounted, watch, computed } from 'vue'
import type { Products } from '@/types'
import { useUtils } from '@/composables/useUtils'
import { useCart } from '@/stores/carts'
import { ElMessage } from 'element-plus'

const authStore = useAuth()
const cartStore = useCart()
const { formatPrice } = useUtils()
const route = useRoute()
const router = useRouter()
const productStore = useProducts()
const product = ref<Products | null>(null)
const quantity = ref(1)

const loadProduct = (id: string) => {
  product.value = productStore.getProductById(id) ?? null
}

const formattedPrice = computed(() => formatPrice(product.value?.price ?? 0))

function handleBuyItem() {
  if (!product.value) {
    ElMessage.error('Something went wrong!')
    return
  }

  if (!authStore.token) {
    router.push('/login')
  } else {
    cartStore.setBuyNow({
      ...product.value,
      quantity: quantity.value <= 0 ? (quantity.value = 1) : quantity.value,
      selectedItem: true,
    })
    router.push('/checkout')
  }
}

function handleAddToCart() {
  if (!product.value) {
    ElMessage.error('Something went wrong!')
    return
  }

  if (!authStore.token) {
    router.push('/login')
  } else {
    cartStore.handleAddToCart({ ...product.value, quantity: quantity.value <= 0 ? (quantity.value = 1) : quantity.value })
    quantity.value = 1
  }
}

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
.search-bar-form {
  width: 100%;
  margin-bottom: 20px;
}

.mt {
  margin-top: 32px;
}

.container {
  width: 100%;
  max-width: 1440px;
  margin: 3rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
}

.product-details {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 24px;
  width: 100%;
}

.product-image {
  width: 100%;
}

.product-image-el {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

.product-description {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 1rem 0;
}

.quantity {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.price-tag {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-orange);
}

.control {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.product-btn {
  width: 100%;
  height: 50px;
  margin-left: 0;
}

/* Tablet and up */
@media (min-width: 768px) {
  .product-image-el {
    object-fit: contain;
  }
  .product-details {
    grid-template-columns: 1fr 1fr;
  }

  .product-description {
    padding-left: 2rem;
  }

  .container {
    padding: 0 2rem;
  }

  .control {
    flex-direction: row;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 20;
  }
}

/* Hide search bar on wider screens */
@media (min-width: 750px) {
  .search-bar-form {
    display: none;
  }
}
</style>
