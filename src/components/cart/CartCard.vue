<template>
  <div class="cart-card">
    <div class="card-left">
      <el-checkbox v-model="localSelected" size="large" class="custom-checkbox" />
      <router-link :to="props.link">
        <el-image :src="props.image" fit="cover" :lazy="true" class="item-image" />
      </router-link>
    </div>
    <div class="card-right">
      <router-link :to="props.link" class="item-title line-clamp">{{ props.label }}</router-link>
      <p class="item-desc line-clamp">{{ props.description }}</p>
      <p class="price-tag">{{ totalPrice }}</p>
      <el-input-number v-model="quantity" :min="1" :max="100" />
      <el-button class="top-right" type="danger" @click="handleRemove">
        <el-icon>
          <Delete />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineEmits } from 'vue'
import type { Carts } from '@/types'
import { useUtils } from '@/composables/useUtils'
import { ElMessageBox, ElMessage } from 'element-plus'
import { useCart } from '@/stores/carts'
import { RouterLink } from 'vue-router'

const { formatPrice } = useUtils()
const props = defineProps<Carts>()
const emit = defineEmits(['update:selectedItem'])
const localSelected = ref(props.selectedItem)
const quantity = ref(props.quantity)
const totalPrice = computed(() => formatPrice((props.price ?? 0) * quantity.value))
const { handleRemoveCartItem, handleSetQuantity } = useCart()

function handleRemove() {
  ElMessageBox.confirm(`Do you wish to remove this ${props.label} from the cart?`, 'Warning', {
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    type: 'warning',
  })
    .then(() => {
      handleRemoveCartItem(props.id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Action canceled',
      })
    })
}

// check if the quantity is over the stock
watch(quantity, (newQuantity) => {
  if (newQuantity >= 100) {
    ElMessageBox.confirm('You have exceeded the maximum number of  currently available in stock.', 'Warning', {
      confirmButtonClass: 'error',
      confirmButtonText: 'Continue',
      type: 'error',
    })
  }
})

watch(quantity, (newQuantity) => {
  if (newQuantity <= 0 || !newQuantity) {
    ElMessageBox.confirm(`Are you sure you want to remove ${props.label} from the cart?`, 'warning', {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      type: 'warning',
    })
      .then(() => {
        handleRemoveCartItem(props.id)
      })
      .catch(() => {
        ElMessage.info('Action canceled')
        handleSetQuantity(props.id, 1)
        quantity.value = 1
      })
  } else {
    handleSetQuantity(props.id, Number(newQuantity))
  }
})

// watch the checkbox if its status change
watch(localSelected, (val: boolean) => {
  emit('update:selectedItem', val)
})

watch(
  () => props.selectedItem,
  (val) => {
    localSelected.value = val
  },
)
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.el-card {
  --el-card-padding: 0px;
  display: flex;
}

.top-right {
  position: absolute;
  top: 0px;
  right: 0px;
}
.cart-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ebebeb;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 20px;
  background-color: #fff;
  transition: box-shadow 0.2s;
}

/* Target the large checkbox inner box */
:deep(.el-checkbox.el-checkbox--large .el-checkbox__inner) {
  height: 24px;
  width: 24px;
  border: 2px solid var(--primary-black);
  background-color: white;
  transition: all 0.3s ease;
  position: relative;
}

/* Checked state styles */
:deep(.el-checkbox.el-checkbox--large.is-checked .el-checkbox__inner) {
  background-color: var(--primary-gold);
  border-color: var(--primary-black);
  /* You can add box-shadow or something else here */
}

/* Change the check icon color */
:deep(.el-checkbox.el-checkbox--large.is-checked .el-checkbox__inner::after) {
  border-color: #000;
  position: absolute;
  left: 8px; /* tweak to center */
  top: 3px; /* tweak to center */
  width: 4px; /* bigger width */
  height: 12px; /* bigger height */
  box-sizing: content-box;
  border-width: 0 3px 3px 0; /* this creates the check shape */
}

.cart-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card-left {
  display: flex;
  align-items: center;
  gap: 18px;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
}

.card-right {
  flex: 1;
  padding-left: 20px;
  position: relative;
}

.item-title {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 6px 0;
}

.item-desc {
  font-size: 14px;
  color: #888;
  margin: 0 0 8px 0;
}

.price-tag {
  font-size: 16px;
  font-weight: bold;
  color: var(--primary-orange);
}
</style>
