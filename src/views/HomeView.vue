<template>
  <main class="home">
    <section class="hero-section">
      <el-carousel trigger="click" height="530px">
        <el-carousel-item v-for="(banner, index) in banners" :key="index">
          <div @click="navigateTo(banner.link)" class="banner-container">
            <el-image :src="banner.image" fit="cover" class="banner-image" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </section>

    <section class="categories-section">
      <div class="section-header">
        <h2>Shop by Category</h2>
      </div>

      <div class="categories-container">
        <el-row :gutter="20" :align="'middle'" justify="center">
          <el-col
            v-for="category in categories"
            :key="category.name"
            :xs="24"
            :sm="12"
            :lg="6"
            @click="navigateToCategory(category.id)"
          >
            <el-card class="category-card" shadow="never">
              <el-image
                :src="category.image"
                :fit="'cover'"
                alt="category.name"
                class="category-image"
              />
              <h3>{{ category.name }}</h3>
            </el-card>
          </el-col>
        </el-row>

        <el-row justify="center">
          <el-col :span="8">
            <router-link to="/products">
              <el-button class="shop-all-btn" size="large" round color="var(--chocolate)"
                >SHOP ALL CATEGORIES</el-button
              >
            </router-link>
          </el-col>
        </el-row>
      </div>
    </section>

    <el-divider />

    <section class="featured-products">
      <div class="section-header">
        <h2>Just For You</h2>
      </div>

      <div class="fp-container">
        <el-row :gutter="20">
          <el-col
            v-for="product in featuredProducts"
            :key="product.id"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
          >
            <ProductCard :product="product" />
          </el-col>
        </el-row>

        <el-row justify="center">
          <el-col :span="8">
            <router-link to="/products">
              <el-button class="view-all-btn" size="large" round type="primary"
                >VIEW ALL PRODUCTS</el-button
              >
            </router-link>
          </el-col>
        </el-row>
      </div>
    </section>

    <section class="product-gallery">
      <el-row>
        <el-col :span="3" v-for="(img, index) in galleryOne" :key="index">
          <el-image :src="img.link" :fit="'cover'" class="gallery-image" />
        </el-col>
      </el-row>

      <el-row justify="center" class="gallery-text">
        <el-col>
          <h2>New Products Coming Soon!</h2>
          <p>Stay tuned on our social media pages for more details.</p>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="3" v-for="(img, index) in galleryTwo" :key="index">
          <el-image :src="img.link" :fit="'cover'" class="gallery-image" />
        </el-col>
      </el-row>
    </section>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '@/components/ProductCard.vue'
import { useProductStore } from '@/stores/product'

const router = useRouter()
const productStore = useProductStore()

// Featured products (first 4 products)
const featuredProducts = computed(() => {
  return productStore.products.slice(0, 4)
})

// Mock banner data
const banners = ref([
  {
    image: '1.png',
    link: '/category/cookies-and-brownies',
  },
  {
    image: '2.png',
    link: '/category/cookies-and-brownies',
  },
  {
    image: '4.png',
    link: '/category/strawberries',
  },
])

const galleryOne = ref([
  { link: 'gallery-5.jpg' },
  { link: 'gallery-6.jpg' },
  { link: 'gallery-7.jpg' },
  { link: 'gallery-8.jpg' },
  { link: 'gallery-1.jpg' },
  { link: 'gallery-2.jpg' },
  { link: 'gallery-3.jpg' },
  { link: 'gallery-4.jpg' },
])

const galleryTwo = ref([
  { link: 'gallery-1.jpg' },
  { link: 'gallery-2.jpg' },
  { link: 'gallery-3.jpg' },
  { link: 'gallery-4.jpg' },
  { link: 'gallery-5.jpg' },
  { link: 'gallery-6.jpg' },
  { link: 'gallery-7.jpg' },
  { link: 'gallery-8.jpg' },
])

// Categories with icons
const categories = ref([
  {
    id: 'cookies-and-brownies',
    name: 'Cookies and Brownies',
    image: 'co.png',
  },
  { id: 'coffee-cakes', name: 'Coffee Cakes', image: 'cof.png' },
  {
    id: 'strawberries',
    name: 'Chocolate Strawberries',
    image: 'stb.png',
  },
  { id: 'sweet-treats', name: 'Sweets and Other Treats', image: 'swt.png' },
])

const navigateTo = (path: string) => {
  router.push(path)
}

const navigateToCategory = (category: string) => {
  router.push(`/category/${category}`)
}
</script>

<style scoped>
.categories-section {
  padding: 30px 50px;
}

.featured-products {
  padding: 20px 50px;
}

.section-header h2 {
  font-family: var(--font-header);
  margin-bottom: 20px;
}

.category-card {
  align-content: center;
  flex: 1;
  text-align: center;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  background-color: var(--offwhite);
  min-height: 100%;
  border: none;
  margin-bottom: 20px;
}

.category-card :deep(.el-card__body) {
  padding-top: 10px;
}

.category-card h3 {
  color: var(--chocolate);
}

.category-card:hover {
  transform: translateY(-5px);
  background-color: var(--mint);
}

.category-image {
  height: 150px;
}

.shop-all-btn {
  width: 100%;
  font-weight: bold;
  margin: 30px 0px 0px;
}

.view-all-btn {
  width: 100%;
  font-weight: bold;
  margin: 20px 0px;
}

.gallery-image {
  width: 100%;
}

.gallery-text {
  text-align: center;
  margin: 30px;
}

.gallery-text h2 {
  font-family: var(--font-header);
}

.gallery-text p {
  color: var(--teal);
}
</style>
