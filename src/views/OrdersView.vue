<template>
  <div class="orders-view">
    <h1 class="orders-header">My Orders</h1>

    <div v-if="userStore.isLoggedIn">
      <div v-if="orders.length > 0">
        <el-collapse accordion>
          <el-collapse-item v-for="order in orders" :key="order.id" :name="order.id">
            <template #title="{ isActive }">
              <el-row class="order-header" :align="'bottom'">
                <el-col :span="4">
                  <div :class="['title-wrapper', { 'is-active': isActive }]">
                    Order #{{ order.id.substring(0, 8) }}
                  </div>
                </el-col>
                <el-col :span="6">
                  <div :class="['order-date', { 'is-active': isActive }]">
                    {{ formatDate(order.date) }}
                  </div>
                </el-col>
                <el-col :span="6" :offset="6">
                  <div :class="['order-amount', { 'is-active': isActive }]">
                    {{ formatPrice(order.totalAmount) }}
                  </div>
                </el-col>
              </el-row>
            </template>

            <div class="order-details">
              <h3>Order Items</h3>
              <el-table :data="order.items" stripe>
                <el-table-column label="Product" show-overflow-tooltip width="600">
                  <template #default="scope">
                    <div class="product-info">
                      <el-image
                        :fit="'cover'"
                        :src="scope.row.image"
                        :alt="scope.row.name"
                        class="product-image"
                      />
                      <span>{{ scope.row.name }}</span>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column prop="price" label="Price" :align="'center'" width="200">
                  <template #default="scope"> {{ formatPrice(scope.row.price) }} </template>
                </el-table-column>

                <el-table-column prop="quantity" label="Quantity" :align="'center'" width="150" />

                <el-table-column label="Subtotal" :align="'right'">
                  <template #default="scope">
                    <strong>
                      {{ formatPrice(scope.row.price * scope.row.quantity) }}
                    </strong>
                  </template>
                </el-table-column>
              </el-table>

              <div class="order-summary">
                <h3>Order Summary</h3>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <p class="summary-details">Items ({{ calculateTotalItems(order) }})</p>
                  </el-col>
                  <el-col :span="12">
                    <p class="summary-details-right">{{ formatPrice(calculateSubtotal(order)) }}</p>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="12">
                    <p class="summary-details">Shipping Fee</p>
                  </el-col>
                  <el-col :span="12">
                    <p class="summary-details-right">
                      {{ formatPrice(calculateShippingFee(order.shippingAddress.region)) }}
                    </p>
                  </el-col>
                </el-row>

                <el-divider />

                <el-row :gutter="20">
                  <el-col :span="12">
                    <h4 class="summary-details-total">Total</h4>
                  </el-col>
                  <el-col :span="12">
                    <h4 class="summary-details-total-right">
                      {{ formatPrice(order.totalAmount) }}
                    </h4>
                  </el-col>
                </el-row>
              </div>

              <el-divider />

              <div class="shipping-info">
                <h3>Shipping Information</h3>

                <el-row :gutter="20">
                  <el-col :span="4">
                    <div class="info-label">Payment Method</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="info-value">{{ formatPaymentMethod(order.paymentMethod) }}</div>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="4">
                    <div class="info-label">Shipping Address</div>
                  </el-col>
                  <el-col :span="20">
                    <div class="info-value">
                      {{ formattedAddresses[order.id] || 'Formatting address...' }}
                    </div>
                  </el-col>
                </el-row>
              </div>

              <el-divider />

              <div class="shipping-timeline">
                <h3>Shipping Status</h3>
                <el-timeline>
                  <el-timeline-item
                    v-for="(status, index) in getOrderStatuses(order.id)"
                    :key="index"
                    :type="status.completed ? 'success' : 'info'"
                    :timestamp="status.completed ? status.time : ''"
                  >
                    <div class="timeline-content" :class="{ active: status.completed }">
                      {{ status.text }}
                    </div>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <el-empty v-else description="You haven't placed any orders yet">
        <router-link to="/products">
          <el-button round type="primary">Start Shopping</el-button>
        </router-link>
      </el-empty>
    </div>

    <el-alert
      v-else
      title="Please log in to view your orders"
      type="info"
      :closable="false"
      show-icon
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, reactive, onBeforeUnmount, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useFormatting } from '@/composables/useFormatting'
import type { Order } from '@/stores/user'
import { getFullAddressString } from '@/utils/address'

// Define shipping status interface
interface ShippingStatus {
  text: string
  completed: boolean
  time: string
}

const router = useRouter()
const userStore = useUserStore()
const { formatPrice, formatPaymentMethod, calculateShippingFee } = useFormatting()

// Redirect to login if not logged in and initialize order statuses
onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
  } else {
    // Initialize shipping statuses for all orders
    orders.value.forEach((order) => {
      initializeOrderStatus(order.id)
    })
  }
})

// Clean up timers when component is unmounted
onBeforeUnmount(() => {
  // Clear all timers
  Object.values(orderTimers.value).forEach((timerId) => {
    clearTimeout(timerId)
  })
})

// Get orders from user store
const orders = computed(() => {
  return userStore.getOrders() || []
})

// State for formatted addresses
const formattedAddresses = reactive<Record<string, string>>({})

// Watch for changes in orders and format their addresses
watch(
  orders,
  (newOrders) => {
    if (newOrders) {
      newOrders.forEach(async (order) => {
        if (order.shippingAddress && !formattedAddresses[order.id]) {
          formattedAddresses[order.id] = await getFullAddressString(order.shippingAddress)
        }
      })
    }
  },
  { immediate: true, deep: true },
)

// Calculate subtotal
const calculateSubtotal = (order: Order) => {
  return order.items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Calculate total number of items in an order
const calculateTotalItems = (order: Order) => {
  return order.items.reduce((total, item) => total + item.quantity, 0)
}

// Shipping statuses for each order
const orderStatuses = reactive<Record<string, ShippingStatus[]>>({})

// Timers for each order
const orderTimers = ref<Record<string, number>>({})

// Initialize shipping statuses for an order
const initializeOrderStatus = (orderId: string) => {
  if (!orderStatuses[orderId]) {
    orderStatuses[orderId] = [
      { text: 'Order is placed', completed: true, time: formatTime() },
      { text: 'Order shipped and picked up by courier', completed: false, time: '' },
      { text: 'Order is out for delivery', completed: false, time: '' },
      { text: 'Parcel has been delivered', completed: false, time: '' },
    ]

    // Start the timer for this order
    startOrderStatusTimer(orderId)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Format current time
const formatTime = () => {
  const now = new Date()
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now)
}

// Start timer to update order status every 5 seconds
const startOrderStatusTimer = (orderId: string) => {
  // Find the next incomplete status
  const nextIncompleteIndex = orderStatuses[orderId].findIndex((status) => !status.completed)

  if (nextIncompleteIndex > 0 && nextIncompleteIndex < orderStatuses[orderId].length) {
    // Set a timer to update the next status after 5 seconds
    orderTimers.value[orderId] = window.setTimeout(() => {
      orderStatuses[orderId][nextIncompleteIndex].completed = true
      orderStatuses[orderId][nextIncompleteIndex].time = formatTime()

      // Continue to the next status
      startOrderStatusTimer(orderId)
    }, 5000) // 5 seconds
  }
}

// Get shipping statuses for an order
const getOrderStatuses = (orderId: string) => {
  // Initialize if not already done
  if (!orderStatuses[orderId]) {
    initializeOrderStatus(orderId)
  }
  return orderStatuses[orderId]
}
</script>

<style scoped>
.orders-view {
  padding: 50px;
}

.orders-header {
  margin-bottom: 12px;
  font-family: var(--font-header);
}

.order-header {
  color: var(--chocolate);
  padding-left: 6px;
}

.title-wrapper {
  font-family: var(--font-header);
  font-size: large;
}

.is-active {
  color: var(--teal) !important;
}

.order-date {
  font-size: small;
  color: var(--gray);
}

.order-amount {
  font-size: medium;
  font-weight: bold;
  text-align: right;
}

.product-image {
  width: 60px;
  border-radius: 6px;
  padding: 5px;
}

.order-details {
  padding: 10px;
}

.order-details h3 {
  margin-bottom: 4px;
  color: var(--chocolate);
}

.product-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.order-summary {
  margin: 24px 0;
}

.summary-details {
  color: var(--gray);
}

.summary-details-right {
  text-align: right;
  padding-right: 12px;
  font-weight: bold;
}

.summary-details-total {
  font-size: medium;
  color: var(--chocolate);
}

.summary-details-total-right {
  font-size: medium;
  color: var(--chocolate);
  text-align: right;
  padding-right: 12px;
  font-weight: bold;
}

.shipping-info {
  color: var(--gray);
}

.info-value {
  color: var(--darkchocolate);
  text-align: right;
}

.shipping-timeline h3 {
  margin-bottom: 12px;
}

.shipping-timeline :deep(.el-timeline) {
  margin-left: 12px;
}

.timeline-content {
  color: var(--gray);
}

.timeline-content.active {
  font-weight: 600;
  color: var(--darkchocolate);
}
</style>
