<template>
  <profile-layout>
    <el-card class="history" shadow="never">
      <h1 class="sticky-heading">Purchase History</h1>
      <el-collapse
        v-if="orderStore.getOrdersForCurrentUser.length > 0"
        v-model="activeName"
        v-for="(order, index) in orderStore.getOrdersForCurrentUser"
        :key="order.id"
        expand-icon-position="left"
      >
        <el-collapse-item :name="index + 1">
          <template #title>
            <div class="accordion-title">
              <h3 class="line-clamp">Order Id #{{ order.id }}</h3>
              <el-tag v-if="order.status === 'pending'">{{ order.status }}</el-tag>
              <el-tag v-if="order.status === 'delivered'" type="success">
                {{ order.status }}
              </el-tag>
            </div>
          </template>
          <el-card shadow="never">
            <p>Order Date: {{ formattedDate(order.createdAt) }}</p>
            <p>Order Status: {{ order.status }}</p>
            <p>Total Amount {{ formatPrice(order.totalPrice) }}</p>

            <el-button color="black" @click="viewOrderDetails(order.id)"> View Details </el-button>
          </el-card>
        </el-collapse-item>
      </el-collapse>
      <el-empty v-if="orderStore.getOrdersForCurrentUser.length <= 0" description="Purchase history is Empty">
        <el-button color="black" @click="() => router.push('/products')">Shop Now!</el-button>
      </el-empty>
    </el-card>
  </profile-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrder } from '@/stores/orders'
import { useRouter } from 'vue-router'
import { useUtils } from '@/composables/useUtils'
import ProfileLayout from '@/layouts/ProfileLayout.vue'

const orderStore = useOrder()
const activeName = ref(1)
const router = useRouter()
const { formatPrice } = useUtils()
const formattedDate = computed(() => (date: string) => new Date(date).toLocaleDateString('en-US'))

function viewOrderDetails(id: string) {
  router.push(`/order/${id}`)
}
</script>

<style scoped>
.history {
  height: 500px;
  overflow-y: scroll;
}
.sticky-heading {
  position: sticky;
  background-color: white;
  top: 0;
}

.accordion-title {
  display: flex;
  justify-content: space-between;
}
:deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
}
</style>
