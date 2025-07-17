<template>
  <div class="cart-view">
    <h3 class="cart-view-title">Shopping Cart</h3>

    <div v-if="cartStore.cartItems.length === 0" class="empty-cart">
      <el-empty description="Your cart is empty">
        <router-link to="/products">
          <el-button type="primary">Continue Shopping</el-button>
        </router-link>
      </el-empty>
    </div>

    <div v-else class="cart-container">
      <el-row :gutter="20">
        <el-col :span="18">
          <el-row :span="24">
            <el-col :span="4">
              <h4 class="cart-view-header">Product Details</h4>
            </el-col>

            <el-col :span="8"></el-col>

            <el-col :span="4">
              <h4 class="cart-view-header">Quantity</h4>
            </el-col>

            <el-col :span="4">
              <h4 class="cart-view-header">Subtotal</h4>
            </el-col>

            <el-col :span="4"></el-col>
          </el-row>

          <el-row :gutter="10">
            <CartItem v-for="item in cartStore.cartItems" :key="item.product.id" :item="item" />
          </el-row>
        </el-col>

        <el-col :span="6" class="cart-summary">
          <h4 class="cart-view-header">Order Summary</h4>
          <el-row :gutter="20">
            <el-col :span="12">
              <p class="cart-view-details">Items ({{ quantity }})</p>
            </el-col>
            <el-col :span="12">
              <p class="cart-view-details">₱{{ order.subtotal }}</p>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <p class="cart-view-details">Shipping Fee</p>
            </el-col>
            <el-col :span="12">
              <p class="cart-view-details">₱{{ shippingFee }}</p>
            </el-col>
          </el-row>

          <el-divider />

          <el-row :gutter="20">
            <el-col :span="12">
              <h4 class="cart-view-total">Total</h4>
            </el-col>
            <el-col :span="12">
              <h4 class="cart-view-total">₱{{ ordertotal }}</h4>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="12">
              <router-link to="/products">
                <el-button>Continue Shopping</el-button>
              </router-link>
            </el-col>

            <el-col :span="12">
              <router-link to="/checkout">
                <el-button :disabled="!userStore.isLoggedIn" class="checkout-btn">
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

<script lang="ts">
export default {}
</script>

<style scoped>
.cart-view {
  max-width: 1200px;
  margin: 0 auto;
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
}

.cart-view-details {
  color: grey;
}

.cart-view-total {
  font-weight: 600;
}

.checkout-btn {
  color: var(--teal);
}

.login-notice {
  margin-top: 20px;
}
</style>
