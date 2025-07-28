<template>
  <section class="container">
    <el-carousel height="450px" trigger="click" class="carousel" indicator-position="outside">
      <el-carousel-item class="carousel-item" v-for="(banner, index) in bannerImages" :key="index">
        <div class="banner-background" :style="{ backgroundImage: `url(${banner.source})` }">
          <div class="text-overlay">
            <h1>{{ banner.heading }}</h1>
            <p>{{ banner.subheading }}</p>
            <el-button @click="() => router.push('/products')">Shop Now! &rarr;</el-button>
            <!-- <el-button>{{ image.cta }} &rarr;</el-button> -->
            <p></p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </section>
</template>

<script lang="ts" setup>
import { bannerImages } from '@/models'
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<style lang="css" scoped>
.container {
  padding: 0;
}

.carousel {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  overflow: hidden;
  border-radius: 8px;
}

.banner-background {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 8px;
}

.text-overlay {
  position: absolute;
  bottom: 30px;
  left: 100px;
  color: white;
  width: 1000px;
  text-align: start;
}

h1 {
  font-size: 3rem;
  margin: 0.5rem 0;
  line-height: 1.1;
}

p {
  font-size: 2rem;
  margin: 0;
  line-height: 1.4;
}

/* CTA button styles */
:deep(.el-button) {
  padding: 20px; /* Dark background for button */
  background-color: #000;
  border: 1px solid #303030; /* Default border color */
  color: #fff;
  border-radius: 8px;
  transition: all 0.3s ease; /* Smooth transition for border and background */
}

.carousel-item:nth-child(1) :deep(.el-button) {
  color: var(--primary-gold); /* Orange border for the second button */
}

.carousel-item:nth-child(1) :deep(.el-button:hover) {
  background-color: #f1c40f; /* Gold background on hover */
  color: #000;
}

.carousel-item:nth-child(2) :deep(.el-button) {
  color: var(--primary-peach);
}

.carousel-item:nth-child(2) :deep(.el-button:hover) {
  background-color: var(--primary-peach); /* Orange background on hover */
  color: #000;
}

.carousel-item:nth-child(3) :deep(.el-button) {
  color: var(--primary-sky);
}

.carousel-item:nth-child(3) :deep(.el-button:hover) {
  background-color: var(--primary-sky);
  color: #000;
}

.carousel-item:nth-child(4) :deep(.el-button) {
  color: var(--primary-wash-violet);
}

.carousel-item:nth-child(4) :deep(.el-button:hover) {
  background-color: var(--primary-wash-violet);
  color: #000;
}

.carousel-item:nth-child(5) :deep(.el-button) {
  color: white;
}

.carousel-item:nth-child(5) :deep(.el-button:hover) {
  background-color: white;
  color: #000;
}

.carousel-item:nth-child(1) h1 {
  color: var(--primary-gold);
}

.carousel-item:nth-child(2) h1 {
  color: var(--primary-peach);
}

.carousel-item:nth-child(3) h1 {
  color: var(--primary-sky);
}

.carousel-item:nth-child(4) h1 {
  color: var(--primary-wash-violet);
}

/* mobile */
@media (max-width: 768px) {
  .container {
    padding: 0; 
  }

  .text-overlay {
    left: 20px;
    right: 20px;
    bottom: 20px;
    width: auto;
    text-align: start;
  }

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1rem;
  }

  :deep(.el-button) {
    padding: 10px 16px;
    font-size: 0.875rem;
  }
}

/* tablet */
@media (min-width: 768px) and (max-width: 1024px) {
  .text-overlay {
    left: 50px;
    width: auto;
  }

  h1 {
    font-size: 2.5rem;
  }

  p {
    font-size: 1.25rem;
  }
}
</style>
