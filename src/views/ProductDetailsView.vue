<template>
  <div class="product-details-view">
    <div class="product-details">
      <div v-if="loading" class="loading-container">
        <el-row :gutter="60">
          <el-col :xs="24" :sm="12">
            <el-skeleton variant="text" style="width: 40%" animated />
            <el-skeleton variant="image" style="width: 100%; height: 100%" animated />
          </el-col>
          <el-col :xs="24" :sm="12">
            <el-skeleton variant="h1" style="width: 60%" animated />
            <el-skeleton variant="text" style="width: 40%" animated />
            <el-skeleton variant="text" style="width: 20%" animated />
            <el-skeleton variant="text" style="width: 40%" animated />
            <el-skeleton variant="text" style="width: 80%" animated />
            <el-skeleton variant="button" style="width: 40%" animated />
            <el-skeleton variant="button" style="width: 40%" animated />
          </el-col>
        </el-row>
      </div>

      <div v-else-if="!product" class="not-found">
        <el-result
          title="Product Not Found"
          sub-title="The product you are looking for does not exist"
        >
          <template #icon>
            <el-image src="https://giphy.com/embed/JrH3p5ZyUHEV6iyvR4" />
          </template>
          <template #extra>
            <router-link to="/products">
              <el-button type="primary" round>Browse Products</el-button>
            </router-link>
          </template>
        </el-result>
      </div>

      <div v-else class="product-container">
        <div class="product-breadcrumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/products' }">Products</el-breadcrumb-item>
                <el-breadcrumb-item
                  :to="{ name: 'category', params: { category: product.category } }"
                >
                  {{ formatCategory(product.category) }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{ product.name }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>

        <el-row :gutter="40" class="product-details-card">
          <el-col :xs="24" :sm="12">
            <div class="product-image-section">
              <el-image
                :src="product.image"
                :fit="'cover'"
                alt="product.name"
                class="product-image"
              />
            </div>
          </el-col>

          <el-col :xs="24" :sm="12">
            <h1 class="product-name">{{ product.name }}</h1>

            <div class="product-price">{{ formatPrice(product.price) }}</div>

            <div class="product-category">
              <el-tag effect="plain" type="info" size="small" round>{{
                formatCategory(product.category)
              }}</el-tag>
            </div>

            <div class="product-actions">
              <el-input-number v-model="quantity" :min="1" :max="10" />
              <el-button
                color="var(--chocolate)"
                size="large"
                @click="addToCart"
                :loading="addingToCart"
                :icon="ShoppingCart"
              >
                Add to Cart
              </el-button>
            </div>

            <el-divider />

            <div class="product-description">
              <h3>Description</h3>
              <p>{{ product.description }}</p>
            </div>

            <el-divider />

            <div class="product-delivery">
              <h3>Delivery Information</h3>
              <ul>
                <li>
                  <el-icon><Van /></el-icon>
                  <span>Stays fresh even after transit</span>
                </li>
                <li>
                  <el-icon><Timer /></el-icon>
                  <span>Crafted right before shipping</span>
                </li>
                <li>
                  <el-icon><Box /></el-icon>
                  <span>Safely sealed in food grade packaging</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

    <div v-if="product" class="related-products">
      <h2>Related Products</h2>
      <el-row :gutter="20">
        <el-col
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          :xs="24"
          :sm="12"
          :md="8"
          :lg="6"
        >
          <ProductCard :product="relatedProduct" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ShoppingCart, Van, Timer, Box } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { useFormatting } from '@/composables/useFormatting'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const { formatPrice, formatCategory } = useFormatting()
const loading = ref(true)
const quantity = ref(1)
const addingToCart = ref(false)

// Get product ID from route params
const productId = computed(() => {
  const id = route.params.id
  return typeof id === 'string' ? parseInt(id, 10) : null
})

// Get product details
const product = computed(() => {
  if (productId.value === null) return null
  return productStore.getProductById(productId.value)
})

// Get related products (same category, excluding current product)
const relatedProducts = computed(() => {
  if (!product.value) return []

  return productStore.products
    .filter((p) => p.category === product.value?.category && p.id !== product.value?.id)
    .slice(0, 4)
})

// Add product to cart
const addToCart = () => {
  if (!product.value) return

  addingToCart.value = true

  // Simulate a small delay for better UX
  setTimeout(() => {
    // Add product to cart multiple times based on quantity
    for (let i = 0; i < quantity.value; i++) {
      cartStore.addToCart(product.value!)
    }

    addingToCart.value = false

    ElMessage.success(`${quantity.value} ${quantity.value > 1 ? 'items' : 'item'} added to cart!`)

    // Reset quantity
    quantity.value = 1
  }, 500)
}

// Load product data
onMounted(() => {
  // Simulate loading delay
  setTimeout(() => {
    loading.value = false
  }, 800)
  console.log(product.value)
})
</script>

<style scoped>
.product-details-view {
  margin: 50px;
}

.product-breadcrumb {
  margin-bottom: 24px;
}

.product-image {
  width: 100%;
  border-radius: 12px;
}

.product-name {
  font-family: var(--font-header);
  font-weight: normal;
  color: var(--teal);
  margin: 12px 0 0px;
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--brown);
}

.product-category {
  margin: 12px 0 36px;
}

.product-actions {
  display: flex;
  gap: 24px;
}

.product-description {
  font-size: small;
  color: var(--chocolate);
}

.product-description h3 {
  margin-bottom: 10px;
  font-family: var(--font-header);
  font-weight: normal;
  color: var(--darkchocolate);
}

.product-delivery {
  font-size: small;
  color: var(--chocolate);
}

.product-delivery h3 {
  margin-bottom: 10px;
  font-family: var(--font-header);
  font-weight: normal;
  color: var(--darkchocolate);
}

.product-delivery ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.product-delivery li {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  color: var(--chocolate);
}

.product-delivery li .el-icon {
  margin-right: 10px;
  color: var(--brown);
}

.related-products {
  margin-top: 36px;
}

.related-products h2 {
  margin-bottom: 10px;
  font-family: var(--font-header);
}
</style>
