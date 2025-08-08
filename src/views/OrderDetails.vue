<template>
  <profile-layout>
    <div class="order-page-wrapper">
      <h2 class="line-clamp">Order Id #{{ orderDetails?.id }}</h2>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="Order Summary" name="1">
          <div style="padding: 20px">
            <h3>Delivery Information</h3>
            <p>Order Id: {{ orderDetails?.id }}</p>
            <p>
              <span>Fullname: </span>
              {{ orderDetails?.address?.firstname }}
              {{ orderDetails?.address?.lastname }}
            </p>
            <p>Email: {{ orderDetails?.address?.email }}</p>
            <p>Contact No. {{ orderDetails?.address?.contact }}</p>
            <p>Address: {{ orderDetails?.address?.address }}</p>
            <h3>Transaction Fee</h3>
            <p class="flex-text">
              Shipping Fee
              <span>{{ formatPrice(orderDetails?.shippingFee ?? 0) }}</span>
            </p>
            <!-- <p class="flex-text">
            VAT
            <span>{{ formatPrice(0) }}</span>
          </p> -->
            <p class="flex-text">
              Sub Total
              <span>{{ formatPrice(orderDetails?.totalPrice ?? 0) }}</span>
            </p>
            <p class="flex-text">
              Total Amount
              <span>{{ formatPrice((orderDetails?.totalPrice ?? 0) + (orderDetails?.shippingFee ?? 0)) }}</span>
            </p>
            <h3>Delivery Options</h3>
            <p>
              {{ orderDetails?.shippingFee === 100 ? 'Standard ' : 'Express ' }}
              Delivery
            </p>
            <h3>Payment Method</h3>
            <p>Cash on Delivery</p>
          </div>
        </el-collapse-item>
        <el-collapse-item :title="`${orderTitle} Ordered`" name="2">
          <div class="order-card-wrapper" v-for="order in orderDetails?.items" :key="order.id">
            <el-image :src="order.image" fit="cover" :lazy="true" />
            <div class="order-card-body">
              <p>{{ order.label }}</p>
              <p>{{ order.quantity }} X {{ formatPrice(order.price) }}</p>
              <p>{{ formatPrice(order.quantity * order.price) }}</p>
            </div>
          </div>
        </el-collapse-item>

        <el-collapse-item title="Tracking Information" name="3">
          <div style="padding: 0 20px">
            <time-line :order-id="orderDetails?.id" :status="orderDetails?.status" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </profile-layout>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrder } from '@/stores/orders'
import type { Order } from '@/types'
import { ElMessage } from 'element-plus'
import { useUtils } from '@/composables/useUtils'
import { TimeLine } from '@/components'
import ProfileLayout from '@/layouts/ProfileLayout.vue'

const activeNames = ref(['1'])
const orderStore = useOrder()
const route = useRoute()
const router = useRouter()
const orderDetails = ref<Partial<Order>>()
const orderTitle = computed(() => ((orderDetails.value?.items?.length ?? 0) > 1 ? 'Items' : 'Item'))
const { formatPrice } = useUtils()

function loadOrderDetails(id: string) {
  orderDetails.value = orderStore.getOrderById(id)
}

onMounted(() => {
  const orderId = route.params.id as string
  const isOwner = orderStore.doesCurrentUserOwnOrder(orderId)

  if (isOwner) {
    loadOrderDetails(orderId)
  } else {
    router.push('/')
    ElMessage.error('Unauthorized Action!')
  }
})

watch(
  () => route.params.id,
  (newId) => {
    const isOwner = orderStore.doesCurrentUserOwnOrder(newId as string)
    if (isOwner) {
      loadOrderDetails(newId as string)
    } else {
      ElMessage.error('Unauthorized Action!')
    }
  },
)
</script>

<style scoped>
.order-page-wrapper {
  margin: 0 auto;
}

:deep(.el-collapse-item__title) {
  font-weight: bold;
  font-size: 18px;
  padding: 20px;
}

p {
  margin: 0.3rem 0;
}

.el-collapse {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}
.order-card-wrapper {
  display: flex;
  gap: 12px;
  margin: 12px;
}

.el-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  border: 1px solid #e0e0e0;
}

.el-card {
  margin-top: 1.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
}

.flex-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-weight: 500;
}

/* Tablet (<= 1024px) */
@media (max-width: 1024px) {
  .grid-wrapper {
    grid-template-columns: 100px 1fr;
    grid-template-rows: auto auto;
    row-gap: 0.5rem;
  }

  .grid-wrapper p:nth-child(2),
  .grid-wrapper p:nth-child(3),
  .grid-wrapper p:nth-child(4) {
    grid-column: 2 / span 1;
  }
}

/* Mobile (<= 600px) */
@media (max-width: 600px) {
  .grid-wrapper {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .el-image {
    width: 100px;
    min-width: 100px;
    height: auto;
    max-height: 200px;
  }

  .flex-text {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
}
</style>
