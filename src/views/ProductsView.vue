<template>
  <div class="products-view-container">
    <div>
      <el-image style="width: 100%;" :src="test" :fit="'cover'" />
    </div>
    <div class="product-page">
    <div class="page-header">
      <h1>Our Products</h1>
    </div>

    <div class="filter-section">
      <el-row :align="'middle'">
        <el-col :sm="24" :md="2">
          <p>Filter by:</p>
        </el-col>

        <el-col :sm="24" :md="6">
          <el-select
            v-model="selectedCategory"
            @change="handleCategoryChange"
            placeholder="All Categories"
            fit-input-width
          >
            <el-option label="All Categories" value="all" />
            <el-option
              v-for="category in productStore.categories"
              :key="category"
              :value="category"
              :label="formatCategory(category)"
            />
          </el-select>
        </el-col>

        <el-col :sm="24" :md="8"> </el-col>
        <el-col :sm="24" :md="2">
          <p>Sort by:</p>
        </el-col>
        <el-col :sm="24" :md="6">
          <el-select v-model="sortOption" placeholder="Sort by" @change="applyFilters">
            <el-option label="Price: Low to High" value="price-asc" />
            <el-option label="Price: High to Low" value="price-desc" />
            <el-option label="Name: A to Z" value="name-asc" />
            <el-option label="Name: Z to A" value="name-desc" />
          </el-select>
        </el-col>
      </el-row>
    </div>

    <div class="products-grid">
      <div v-if="loading" class="loading-container">
        <el-skeleton :rows="5" animated />
        <el-skeleton :rows="5" animated />
        <el-skeleton :rows="5" animated />
      </div>

      <template v-else>
        <div v-if="filteredProducts.length === 0" class="no-products">
          <el-empty description="No products found" />
        </div>

        <el-row :gutter="20">
          <el-col
            v-for="product in filteredProducts"
            :key="product.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <ProductCard :product="product" />
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'
import { useFormatting } from '@/composables/useFormatting'
import type { Product } from '@/stores/cart'
import test from '@/images/3.png'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const { formatCategory } = useFormatting()
const loading = ref(true)
const selectedCategory = ref('all')
const sortOption = ref('price-asc')
const searchQuery = ref('')

// Initialize filters from route params if available
onMounted(() => {
  const category = route.params.category as string
  if (category) {
    selectedCategory.value = category
  }

  // Get search query from URL if available
  if (route.query.search) {
    searchQuery.value = route.query.search as string
  }

  // Simulate loading
  setTimeout(() => {
    loading.value = false
  }, 800)
})

// Apply filters and sorting to products
const filteredProducts = computed(() => {
  let result: Product[] = []

  // Filter by category
  if (selectedCategory.value === 'all') {
    result = [...productStore.products]
  } else {
    result = productStore.getProductsByCategory(selectedCategory.value)
  }

  // Filter by search query if present
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    )
  }

  // Apply sorting
  switch (sortOption.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'name-desc':
      result.sort((a, b) => b.name.localeCompare(a.name))
      break
  }

  return result
})

// Watch for route changes to update the category filter
watch(
  () => route.params.category,
  (newCategory) => {
    selectedCategory.value = (newCategory as string) || 'all'
  },
)

// Update URL when category changes
const handleCategoryChange = () => {
  if (selectedCategory.value === 'all') {
    router.push({ name: 'products' })
  } else {
    router.push({ name: 'category', params: { category: selectedCategory.value } })
  }
}

// Apply filters (for UI events)
const applyFilters = () => {
  // This function is just a placeholder for filter change events
  // The actual filtering is done in the computed property
}
</script>

<style scoped>
.product-page {
  padding: 30px 50px 50px;
}

.page-header {
  font-family: var(--font-header);
}

.filter-section {
  margin: 12px 0 24px;
}

.filter-section p {
  margin-left: 6px;
  color: var(--gray);
}

.products-grid {
  margin: 12px;
}
</style>
