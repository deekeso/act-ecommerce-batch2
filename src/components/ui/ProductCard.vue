<template>
  <el-card shadow="hover">
    <div class="img-control">
      <router-link :to="props.link">
        <img :src="props.image" :alt="props.image" />
      </router-link>
    </div>
    <router-link :to="props.link">
      <h1>{{ props.name }}</h1>
      <p>{{ props.description }}</p>
      <p class="price">{{ formattedPrice }}</p>
    </router-link>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { Products } from '@/types'
import { RouterLink } from 'vue-router'
import { useUtils } from '@/composables/useUtils'
const props = defineProps<Products>()

const { formatPrice } = useUtils()
const formattedPrice = computed(() => formatPrice(props.price))
</script>

<style scoped>
h1 {
  font-size: 16px;
}

img {
  width: 100%;
  height: 200px;
}
a {
  text-decoration: none;
  color: black;
}

.img-control {
  position: relative;
}

a:visited {
  color: black;
}

:deep(.el-input) {
  width: 50px;
}

:deep(.el-input__inner) {
  text-align: center;
}

.button-group {
  display: flex;
  position: absolute;
  bottom: 7px;
  right: 0px;
}

.price {
  color: var(--primary-orange);
  font-weight: bold;
}
</style>
