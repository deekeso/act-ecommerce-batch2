<template>
  <div class="app-prod-card">
    <el-card @click="viewProductDetails" class="product-card" shadow="never">
      <div class="product-image">
        <el-image :src="product.image" :fit="'cover'" alt="product.name" class="image" />
      </div>

      <div class="product-content">
        <h3 class="product-name">{{ product.name }}</h3>

        <div class="product-price">{{ formatPrice(product.price) }}</div>

        <div class="product-description">{{ truncateDescription(product.description) }}</div>

        <div class="product-actions" @click.stop>
          <el-button
            @click="addToCart"
            :loading="loading"
            :icon="ShoppingCart"
            color="var(--chocolate)"
          >
            Add to Cart
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cart'
import { useFormatting } from '@/composables/useFormatting'
import type { Product } from '@/stores/cart'
import { ElMessage } from 'element-plus'
import { ShoppingCart } from '@element-plus/icons-vue'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()
const { formatPrice } = useFormatting()
const loading = ref(false)

// Navigate to product detail page
const viewProductDetails = () => {
  router.push({
    name: 'product-detail',
    params: { id: props.product.id },
  })
}

const addToCart = () => {
  loading.value = true
  // Simulate a small delay for better UX
  setTimeout(() => {
    cartStore.addToCart(props.product)
    loading.value = false
    ElMessage.success(`${props.product.name} added to cart!`)
  }, 300)
}

const truncateDescription = (description: string) => {
  return description.length > 60 ? description.substring(0, 60) + '...' : description
}
</script>

<style scoped>
.app-prod-card {
  margin-bottom: 20px;
}

.product-card {
  margin-bottom: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  border: none;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card:deep(.el-card__body) {
  padding-top: 0;
}

.product-image {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-bottom: 15px;
}

.image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-content {
  padding: 0px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-family: var(--font-header);
  font-weight: normal;
  color: var(--teal);
  height: 60px;
  overflow: hidden;
}

.product-price {
  font-weight: 700;
  color: var(--brown);
  margin-bottom: 8px;
}

.product-description {
  font-size: 14px;
  color: var(--gray);
  margin-bottom: 12px;
  flex-grow: 1;
}

.product-actions {
  margin-top: auto;
}

.product-actions:deep(.el-button) {
}
</style>
