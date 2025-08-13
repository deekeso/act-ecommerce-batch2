<template>
  <div class="grid">
    <div class="left-col">
      <div class="flex-between" v-if="cartStore.getCartItems.length > 0">
        <el-checkbox
          v-model="isSelectedAll"
          label="Select All"
          size="large"
          @change="() => cartStore.handleAllSelectItem(isSelectedAll)"
        />
        <el-button :icon="Delete" type="danger" @click="cartStore.handleRemoveAllItem()"> Delete All </el-button>
      </div>

      <el-empty v-if="cartStore.getCartItems.length === 0" description="Your cart is empty">
        <el-button color="black" @click="() => router.push('/products')">Shop Now!</el-button>
      </el-empty>

      <cart-card
        v-for="item in cartStore.getCartItems"
        :key="item.id"
        :id="item.id"
        :label="item.label"
        :value="item.value"
        :quantity="item.quantity"
        :price="item.price"
        :image="item.image"
        :description="item.description"
        :link="item.link"
        :selected-item="item.selectedItem"
        @update:selectedItem="(val) => handleSelectionChange(item.id, val)"
      />
    </div>

    <div class="checkout-form">
      <el-card shadow="never">
        <template #header>
          <h3 class="">Order Summary</h3>
        </template>
        <p class="flex-text">
          Shipping Fee: <span>{{ shippingFee }}</span>
        </p>
        <p class="flex-text">
          SubTotal: <span>{{ subTotal }}</span>
        </p>
        <p class="total-amount flex-text">
          Total Price:
          <span>
            {{ total }}
          </span>
        </p>
        <el-button size="large" class="checkout-button" @click="handleCheckout()"> Proceed to Checkout &rarr;</el-button>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { CartCard } from '@/components'
import { useCart } from '@/stores/carts'
import { useUtils } from '@/composables/useUtils'
import { Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useAuthGuard } from '@/composables/useAuthGuard'

const total = computed(() =>
  formatPrice(cartStore.getAllSelectedCartItems.length > 0 ? cartStore.getSelectedTotalPrice + 100 : 0),
)
const shippingFee = computed(() => (cartStore.getAllSelectedCartItems.length > 0 ? formatPrice(100) : formatPrice(0)))
const subTotal = computed(() => formatPrice(cartStore.getSelectedTotalPrice))
const { requireAuth } = useAuthGuard()
const router = useRouter()
const cartStore = useCart()
const { formatPrice } = useUtils()
const isSelectedAll = ref(cartStore.getSelectItems ?? false)

function handleSelectionChange(itemId: string, selected: boolean) {
  cartStore.handleSelectedItem(itemId, selected)
  isSelectedAll.value = cartStore.getSelectItems
}

function handleCheckout() {
  if (cartStore.getCartItems.length === 0) {
    ElMessage.error('Your cart is empty')
    return
  }

  if (cartStore.getSelectedItemLegnth === 0) {
    ElMessage.error('No selected items')
    return
  }

  router.push('/checkout')
}

onMounted(() => {
  cartStore.initializeCart()
  requireAuth()
})
</script>

<style scoped>
.flex-text {
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
}
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
  padding: 20px;
  margin: 0 auto;
  max-width: 1400px;
}

.left-col {
  overflow-y: auto;
  padding-right: 10px;
  max-height: 1000px;
}

.el-checkbox {
  --el-checkbox-checked-text-color: var(--primary-black);
}

.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  padding: 8px 18px;
  margin-bottom: 20px;
  background-color: #fff;
  position: sticky;
  top: 0;
  z-index: 10;
}

.el-button.checkout-button {
  --el-button-outline-color: white;
  --el-button-text-color: #ffffff9f;
  --el-button-hover-text-color: white;
  --el-button-hover-bg-color: var(--primary-black);
  --el-button-focus-border-color: var(--primary-black);
  --el-button-active-border-color: #666666;
  --el-button-hover-border-color: #000;
}

.checkout-form h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}

.total-amount {
  font-weight: bold;
  margin-bottom: 20px;
}

.checkout-button {
  width: 100%;
  background-color: #000;
}

/* Target the large checkbox inner box */
:deep(.el-checkbox.el-checkbox--large .el-checkbox__inner) {
  height: 24px;
  width: 24px;
  border: 2px solid var(--primary-black);
  background-color: white;
  transition: all 0.3s ease;
  position: relative;
  --el-checkbox-checked-text-color: #000;
}

/* Checked state styles */
:deep(.el-checkbox.el-checkbox--large.is-checked .el-checkbox__inner) {
  background-color: var(--primary-black);
  border-color: var(--primary-black);
}

/* Change the check icon color */
:deep(.el-checkbox.el-checkbox--large.is-checked .el-checkbox__inner::after) {
  border-color: white;
  position: absolute;
  left: 7px;
  top: 2px;
  width: 4px;
  height: 12px;
  box-sizing: content-box;
  border-width: 0 3px 3px 0;
}

@media (max-width: 1024px) {
  .grid {
    grid-template-columns: 1fr;
    padding: 16px;
  }

  .left-col {
    max-height: unset;
    padding-right: 0;
  }
}
</style>
