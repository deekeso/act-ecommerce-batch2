<template>
  <div class="order-list" :class="currentItem.length <= 3 ? 'few-items' : 'many-items'">
    <div class="order-card" v-for="item in currentItem" :key="item?.id">
      <el-image :src="item?.image" fit="cover" :lazy="true" style="width: 100px; height: 100px; border-radius: 12px" />
      <div class="order-card-body">
        <p>{{ item?.label }}</p>
        <p>
          Price: <span class="price-tag">{{ formatPrice(item?.price ?? 0) }}</span>
        </p>
        <p>Quantity: {{ item?.quantity }}x</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '@/stores/carts'
import { useUtils } from '@/composables/useUtils'
import { computed } from 'vue'

const cartStore = useCart()
const { formatPrice } = useUtils()

const buyNowItem = computed(() => cartStore.getBuyNowItems)
const isBuyNowMode = computed(() => buyNowItem.value !== null && Object.keys(buyNowItem.value).length > 0)

// Decide what to render based on Buy Now mode
const currentItem = computed(() => (isBuyNowMode.value ? [buyNowItem.value] : cartStore.getAllSelectedCartItems))
</script>

<style scoped>
.order-card {
  display: flex;
  margin-bottom: 20px;
}

.order-card-body {
  padding: 20px;
}

.order-list {
  position: relative;
}

.order-list.few-items {
  height: 100%;
}

.order-list.many-items {
  height: 620px;
  overflow-y: scroll;
}
</style>
