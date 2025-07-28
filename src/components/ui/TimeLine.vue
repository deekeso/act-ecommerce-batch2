<template>
  <el-timeline style="max-width: 600px">
    <el-timeline-item
      v-for="(step, index) in timelineSteps"
      :key="index"
      :timestamp="step.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ step.label }}</h4>
        <p>Status: {{ step.label }}</p>
        <p v-if="step.note">{{ step.note }}</p>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { dayjs } from 'element-plus'
import { useOrder } from '@/stores/orders'

interface TimeLineProps {
  status?: 'pending' | 'shipped' | 'delivered' | 'cancelled'
  orderId?: string
}

const props = defineProps<TimeLineProps>()
const orderStore = useOrder()

const shippingFlow = ref<{label: string, note:string, timestamp?: string}[]>([])

const activities = [
  { label: 'Order Placed', note: 'Your order has been placed and is being processed.' },
  { label: 'Order Confirmed', note: 'Seller has confirmed your order.' },
  { label: 'Packed', note: 'Items are packed and ready for shipment.' },
  { label: 'Left Warehouse', note: 'Package has left the main warehouse.' },
  { label: 'In Transit', note: 'Package is en route to local distribution center.' },
  { label: 'Arrived at Sorting Center', note: 'Package arrived at your local facility.' },
  { label: 'Out for Delivery', note: 'Courier is delivering your package.' },
  { label: 'Delivered', note: 'The package has been delivered to the destination.' },
]

// Create timeline steps with timestamps for a delivered order
const deliveredSteps = computed(() => {
  return activities.map((activity, i) => ({
    ...activity,
    timestamp: dayjs().subtract(activities.length - i, 'minute').format('YYYY-MM-DD HH:mm:ss')
  }))
})

// simulate a timeline
function setShippingFlow() {
  let index = 0
 
  const interval = setInterval(() => {
    if (index >= activities.length) {
      clearInterval(interval)
      return
    }

    shippingFlow.value.push({
      ...activities[index],
      timestamp: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    })

    // Automatically mark as delivered when finished
    if (activities[index].label === 'Delivered') {
      orderStore.updateOrderStatus(props.orderId ?? '', 'delivered')
    }
    index++
  }, 1000) // set interval to 1sec for testing
}


watch(() => props.status, (newStatus) => {
  if (newStatus === 'pending') {
    setShippingFlow()
  }
}, { immediate: true })

const timelineSteps = computed(() => {
  return props.status === 'delivered' ? deliveredSteps.value : shippingFlow.value
})


</script>
