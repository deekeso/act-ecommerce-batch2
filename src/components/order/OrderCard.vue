<template>
   
    <div class="order-card">
        <el-image 
            :src="props.image" 
            fit="cover" 
            :lazy="true" 
            style="width: 100px; height: 100px; border-radius: 12px" 
        />
        <div class="order-card-body">
            <p>{{ props.label }}</p>
            <p> 
                <span style="margin-right: 4px;">Unit Price:</span> 
                <span class="price-tag">{{ formatPrice(props.price ?? 0) }}</span>
            </p>
            <p>Quantity: {{ props.quantity }}x</p>
            <p class="bold-text">Total Price: {{ formatPrice(totalPrice) }}</p>
        </div>
    </div>
    
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useUtils } from '@/composables/useUtils'

interface OrderCardProps{
    image?: string
    label?: string
    price?: number
    quantity?: number
}

const { formatPrice } = useUtils()
const props = defineProps<OrderCardProps>()
const totalPrice = computed(() => (props.quantity ?? 0) * (props.price ?? 0))
</script>

<style scoped>
.bold-text{
    font-weight: bold;
}
.order-card {
  display: flex;
  margin-bottom: 20px;
  padding: 20px;
}

.order-card-body {
  padding: 8px;
}


.order-list {
  position: relative;
  overflow-y: scroll;
}
</style>