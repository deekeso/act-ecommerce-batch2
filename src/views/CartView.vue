<template>
  <div class="cart-view">
    <h2 class="cart-view-title">Shopping Cart</h2>

    <div v-if="cartStore.cartItems.length === 0" class="empty-cart">
      <el-empty description="Your cart is empty">
        <router-link to="/products">
          <el-button class="action-btn" round type="primary">Continue Shopping</el-button>
        </router-link>
      </el-empty>
    </div>

    <div v-else class="cart-container">
      <el-row :gutter="20">
        <el-col :span="16">
          <el-row>
            <el-col :span="4">
              <h4 class="cart-view-header">Product Details</h4>
            </el-col>

            <el-col :span="10">
              <h4 class="cart-view-header"></h4>
            </el-col>

            <el-col :span="4">
              <h4 class="cart-view-header-center">Quantity</h4>
            </el-col>

            <el-col :span="4">
              <h4 class="cart-view-header-center">Subtotal</h4>
            </el-col>

            <el-col :span="2"> </el-col>
          </el-row>

          <el-row v-for="item in cartStore.cartItems" :key="item.product.id" class="cart-item-row">
            <CartItem :item="item" />
          </el-row>
        </el-col>

        <el-col :span="8" class="cart-summary">
          <h4 class="cart-view-header">Order Summary</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <p class="cart-view-details">Items ({{ cartStore.itemCount }})</p>
            </el-col>
            <el-col :span="12">
              <p class="cart-view-details">{{ formatPrice(cartStore.subtotalPrice) }}</p>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <p class="cart-view-details">Shipping Fee</p>
            </el-col>
            <el-col :span="12">
              <p class="cart-view-details">{{ formatPrice(shippingFee) }}</p>
            </el-col>
          </el-row>

          <el-divider />

          <el-row :gutter="20">
            <el-col :span="12">
              <h4 class="cart-view-total">Total</h4>
            </el-col>
            <el-col :span="12">
              <h4 class="cart-view-total">{{ formatPrice(totalAmount) }}</h4>
            </el-col>
          </el-row>

          <el-row :gutter="10">
            <el-col :span="12">
              <router-link to="/products">
                <el-button>Continue Shopping</el-button>
              </router-link>
            </el-col>

            <el-col :span="12">
              <router-link to="/checkout">
                <el-button :disabled="!userStore.isLoggedIn" class="checkout-btn" type="primary">
                  Proceed to Checkout
                </el-button>
              </router-link>
            </el-col>
          </el-row>

          <el-row v-if="!userStore.isLoggedIn" class="login-notice">
            <el-alert title="Please log in to checkout" type="info" :closable="false" show-icon />
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CartItem from '@/components/CartItem.vue'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/user'
import { useFormatting } from '../composables/useFormatting'

const cartStore = useCartStore()
const userStore = useUserStore()
const { formatPrice } = useFormatting()

const shippingFee = computed(() => {
  if (userStore.isLoggedIn && userStore.user?.address) {
    return cartStore.shippingFee(userStore.user.address)
  }
  return 0 // default value if user is not logged in
})

const totalAmount = computed(() => {
  if (userStore.isLoggedIn && userStore.user?.address) {
    return cartStore.totalWithShipping(userStore.user.address)
  }
  return cartStore.subtotalPrice // Show only subtotal if not logged in
})
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 24px;
  padding: 15px;
}

.cart-view-title {
  margin-bottom: 30px;
  font-family: var(--font-header);
}

.empty-cart {
  padding: 60px 0;
  text-align: center;
}

.cart-container {
  gap: 10px;
}

.cart-view-header {
  font-family: var(--font-header);
  font-weight: normal;
  margin-bottom: 12px;
}

.cart-view-header-center {
  font-family: var(--font-header);
  font-weight: normal;
  margin-bottom: 12px;
  text-align: center;
}

.cart-item-row {
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: center;
}

.cart-item-row:last-child {
  border-bottom: none;
}

.cart-view-details {
  color: var(--chocolate);
}

.cart-view-total {
  font-weight: 600;
}

.cart-summary :deep(.el-button) {
  width: 100%;
  margin: 24px 0 12px;
}

.login-notice {
  margin-top: 12px;
}
</style>
