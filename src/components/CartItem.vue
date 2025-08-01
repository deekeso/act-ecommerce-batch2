<template>
  <el-col class="cart-item-image" :span="4">
    <el-image :src="item.product.image" :fit="'cover'" alt="item.product.name" class="image" />
  </el-col>

  <el-col class="cart-item-details" :span="10">
    <h4 class="cart-item-name">{{ item.product.name }}</h4>
    <p class="cart-item-price">{{ formatPrice(item.product.price) }}</p>
  </el-col>

  <el-col class="cart-item-quantity" :span="4">
    <el-input-number v-model="quantity" :min="1" :max="10" size="small" @change="updateQuantity" />
  </el-col>

  <el-col class="cart-item-subtotal" :span="4">
    {{ formatPrice(item.product.price * item.quantity) }}
  </el-col>

  <el-col class="cart-item-actions" :span="2">
    <el-button
      type="danger"
      :icon="Delete"
      circle
      size="small"
      @click="showDeleteConfirmation = true"
    />
  </el-col>

  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    v-model:show="showDeleteConfirmation"
    title="Remove Item"
    message="Are you sure you want to remove this item from your cart?"
    confirm-button-text="Remove"
    @confirm="removeItem"
  />
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Delete } from '@element-plus/icons-vue'
import { useCartStore } from '@/stores/cart'
import type { CartItem } from '@/stores/cart'
import { useFormatting } from '../composables/useFormatting'
import ConfirmationModal from './ConfirmationModal.vue'

const props = defineProps<{
  item: CartItem
}>()

const cartStore = useCartStore()
const { formatPrice } = useFormatting()
const quantity = ref(props.item.quantity)
const showDeleteConfirmation = ref(false)

// Watch for external changes to quantity
watch(
  () => props.item.quantity,
  (newQuantity) => {
    quantity.value = newQuantity
  },
)

const updateQuantity = (value: number) => {
  cartStore.updateQuantity(props.item.product.id, value)
}

const removeItem = () => {
  cartStore.removeFromCart(props.item.product.id)
}
</script>

<style scoped>
.cart-item-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  width: 80px;
  height: 80px;
  border-radius: 10px;
}

.cart-item-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.cart-item-name {
  margin: 0 0 5px;
  font-family: var(--font-header);
  font-weight: normal;
  color: var(--teal);
}

.cart-item-price {
  margin: 0;
  color: var(--brown);
  font-weight: bold;
}

.cart-item-quantity {
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item-subtotal {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--chocolate);
}

.cart-item-actions {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
