<template>
  <el-card shadow="hover">
    <div class="img-control">
      <router-link :to="props.link">
        <el-image :src="props.image" :alt="props.image" fit="cover" :lazy="true" />
      </router-link>
      <el-button class="cart-icon" color="black" :icon="ShoppingCart" @click="onAddToCart" />
    </div>
    <div class="card-body">
      <router-link :to="props.link">
        <h1>{{ props.label }}</h1>
        <p>{{ props.description }}</p>
        <p class="price">{{ formatPrice(props.price) }}</p>
      </router-link>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { Products } from '@/types'
import { RouterLink, useRouter } from 'vue-router'
import { useUtils } from '@/composables/useUtils'
import { ShoppingCart } from '@element-plus/icons-vue'
import { useCart } from '@/stores/carts'
import { useAuth } from '@/stores/auth'

const router = useRouter()
const authStore = useAuth()
const { handleAddToCart } = useCart()
const props = defineProps<Products>()
const { formatPrice } = useUtils()

function onAddToCart() {
  if (!authStore.token) {
    router.push('/login')
  } else {
    handleAddToCart({ ...props, quantity: 1 })
  }
}
</script>

<style scoped>
h1 {
  font-size: 16px;
}

.el-image {
  width: 100%;
  height: 200px;
}

.el-card {
  --el-card-padding: 0px;
}
.card-body {
  padding: 20px;
}

a {
  text-decoration: none;
  color: black;
}

.el-button.cart-icon {
  position: absolute;
  top: 4px;
  right: 4px;
  font-size: 24px;
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
