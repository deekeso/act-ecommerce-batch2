<template>
  <el-carousel height="450px" trigger="click" class="carousel" indicator-position="outside">
    <el-carousel-item class="carousel-item" v-for="(image, index) in bannerImages" :key="index">
      <div class="banner-background" :style="{ backgroundImage: `url(${image.source})` }">
        <div class="text-overlay">
          <h1>{{ image.heading }}</h1>
          <p>{{ image.subheading }}</p>
        </div>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts" setup>
import { bannerImages } from '@/models'
</script>

<style lang="css" scoped>
.carousel {
  width: 100%;
  max-width: 1440px;
  margin: 2px auto;
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
  font-size: 4rem;
  margin: 0.5rem 0;
}

p {
  font-size: 2rem;
  margin: 0;
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
  .text-overlay {
    width: 500px;
  }
  h1 {
    font-size: 2rem;
  }
}
/* tablets */
@media (min-width: 768px) {
  .text-overlay {
    width: 900px;
  }

  h1 {
    font-size: 3rem;
  }
}
</style>
