<template>
  <div class="checkout-view">
    <div class="page-header">
      <h2>Checkout</h2>
    </div>

    <div v-if="!userStore.isLoggedIn" class="login-required">
      <el-result title="Login Required" sub-title="Please log in to proceed with checkout">
        <template #icon>
          <el-image src="https://giphy.com/embed/JrH3p5ZyUHEV6iyvR4" />
        </template>
      </el-result>
    </div>

    <!-- Step 4: Confirmation -->
    <div v-if="currentStep === 3" class="checkout-step">
      <el-result
        title="Order Placed Successfully!"
        sub-title="Your order has been placed and will be processed soon"
      >
        <template #icon>
          <el-image src="https://giphy.com/embed/D2hncA3u88gmeCFeoh" />
        </template>

        <template #extra>
          <div class="order-confirmation">
            <p><strong>Order Number:</strong> {{ orderNumber }}</p>
            <p><strong>Date:</strong> {{ orderDate }}</p>
          </div>
          <router-link to="/">
            <el-button type="primary" round>Continue Shopping</el-button>
          </router-link>
        </template>
      </el-result>
    </div>

    <div v-else-if="cartStore.cartItems.length === 0" class="empty-cart">
      <el-empty description="Your cart is empty">
        <router-link to="/products">
          <el-button type="primary" round>Continue Shopping</el-button>
        </router-link>
      </el-empty>
    </div>

    <div v-else class="checkout-container">
      <el-row :gutter="20">
        <el-col :sm="24" :md="18">
          <div class="checkout-form">
            <el-steps :active="currentStep" finish-status="success" simple>
              <el-step title="Review" />
              <el-step title="Shipping" />
              <el-step title="Payment" />
              <el-step title="Confirmation" />
            </el-steps>

            <!-- Step 1: Review Items -->
            <div v-if="currentStep === 0" class="checkout-step">
              <el-card shadow="never">
                <template #header>
                  <div class="card-header">
                    <h2>Review Your Order</h2>
                  </div>
                </template>

                <div class="order-items">
                  <el-row
                    :gutter="20"
                    v-for="item in cartStore.cartItems"
                    :key="item.product.id"
                    class="order-item"
                  >
                    <el-col :span="4" class="order-item-details">
                      <el-image
                        :src="item.product.image"
                        :fit="'cover'"
                        alt="item.product.name"
                        class="product-img"
                      />
                    </el-col>

                    <el-col :span="14">
                      <div class="order-item-details">
                        <h2>{{ item.product.name }}</h2>
                        <p class="order-item-price">
                          {{ formatPrice(item.product.price) }} x {{ item.quantity }}
                        </p>
                      </div>
                    </el-col>

                    <el-col :span="6">
                      <div class="order-item-total">
                        {{ formatPrice(item.product.price * item.quantity) }}
                      </div>
                    </el-col>
                  </el-row>
                </div>

                <template #footer>
                  <div class="step-actions">
                    <router-link to="/cart">
                      <el-button round>Back to Cart</el-button>
                    </router-link>
                    <el-button round type="primary" @click="nextStep">Continue</el-button>
                  </div>
                </template>
              </el-card>
            </div>

            <!-- Step 2: Shipping -->
            <div v-if="currentStep === 1" class="checkout-step">
              <el-card shadow="never">
                <template #header>
                  <div class="card-header">
                    <h2>Shipping Information</h2>
                  </div>
                </template>

                <el-form :model="shippingForm" label-position="top">
                  <el-form-item label="Full Name">
                    <el-input v-model="shippingForm.name" placeholder="Enter your full name" />
                  </el-form-item>

                  <el-divider />

                  <div class="address-selector">
                    <el-form label-position="top">
                      <el-form-item label="Region" prop="region">
                        <el-select v-model="shippingForm.region" placeholder="Select Region">
                          <el-option
                            v-for="region in regionsList"
                            :key="region.region_code"
                            :label="region.region_name"
                            :value="region.region_code"
                          ></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="Province" prop="province">
                        <el-select
                          v-model="shippingForm.province"
                          placeholder="Select Province"
                          :disabled="!shippingForm.region"
                        >
                          <el-option
                            v-for="province in provincesList"
                            :key="province.province_code"
                            :label="province.province_name"
                            :value="province.province_code"
                          ></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="City/Municipality" prop="city">
                        <el-select
                          v-model="shippingForm.city"
                          placeholder="Select City/Municipality"
                          :disabled="!shippingForm.province"
                        >
                          <el-option
                            v-for="city in citiesList"
                            :key="city.city_code"
                            :label="city.city_name"
                            :value="city.city_code"
                          ></el-option>
                        </el-select>
                      </el-form-item>

                      <el-form-item label="Barangay" prop="barangay">
                        <el-select
                          v-model="shippingForm.barangay"
                          placeholder="Select Barangay"
                          :disabled="!shippingForm.city"
                        >
                          <el-option
                            v-for="barangay in barangaysList"
                            :key="barangay.brgy_code"
                            :label="barangay.brgy_name"
                            :value="barangay.brgy_code"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-form>

                    <el-form-item label="Street Address">
                      <el-input
                        v-model="shippingForm.street"
                        type="textarea"
                        placeholder="Enter your complete street address"
                        :rows="2"
                      />
                    </el-form-item>

                    <el-form-item label="Delivery Instructions (Optional)">
                      <el-input
                        v-model="shippingForm.instructions"
                        type="textarea"
                        placeholder="Any special instructions for delivery"
                        :rows="2"
                      />
                    </el-form-item>
                  </div>
                </el-form>

                <template #footer>
                  <div class="step-actions">
                    <el-button round @click="prevStep">Back</el-button>
                    <el-button
                      round
                      type="primary"
                      @click="nextStep"
                      :disabled="!isShippingFormValid"
                    >
                      Continue
                    </el-button>
                  </div>
                </template>
              </el-card>
            </div>

            <!-- Step 3: Payment -->
            <div v-if="currentStep === 2" class="checkout-step">
              <el-card shadow="never">
                <template #header>
                  <div class="card-header">
                    <h2>Payment Method</h2>
                  </div>
                </template>

                <div class="payment-methods">
                  <el-radio-group v-model="paymentMethod">
                    <div class="payment-option">
                      <el-radio label="cod">
                        <div class="payment-option-content">
                          <div class="payment-details">
                            <ul>
                              <li>
                                <el-icon><Money /></el-icon>
                                <span>Cash on Delivery</span>
                              </li>
                            </ul>
                            <p>Pay when you receive your order</p>
                          </div>
                        </div>
                      </el-radio>
                    </div>

                    <div class="payment-option">
                      <el-radio label="card">
                        <div class="payment-option-content">
                          <div class="payment-details">
                            <ul>
                              <li>
                                <el-icon><CreditCard /></el-icon>

                                <span>Credit/Debit Card</span>
                              </li>
                            </ul>
                            <p>Pay securely with your card</p>
                          </div>
                        </div>
                      </el-radio>
                    </div>

                    <div class="payment-option">
                      <el-radio label="ewallet">
                        <div class="payment-option-content">
                          <div class="payment-details">
                            <ul>
                              <li>
                                <el-icon><Wallet /></el-icon>

                                <span>E-Wallet</span>
                              </li>
                            </ul>
                            <p>GCash, Maya, etc.</p>
                          </div>
                        </div>
                      </el-radio>
                    </div>
                  </el-radio-group>
                </div>

                <template #footer>
                  <div class="step-actions">
                    <el-button round @click="prevStep">Back</el-button>
                    <el-button
                      round
                      type="primary"
                      @click="placeOrder"
                      :loading="isProcessing"
                      :disabled="!paymentMethod"
                    >
                      Place Order
                    </el-button>
                  </div>
                </template>
              </el-card>
            </div>
          </div>
        </el-col>

        <el-col :sm="24" :md="6">
          <div class="order-summary">
            <el-card shadow="never">
              <template #header>
                <div class="card-header">
                  <h4>Order Summary</h4>
                </div>
              </template>

              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="summary-details">Items ({{ cartStore.itemCount }})</p>
                </el-col>
                <el-col :span="12">
                  <p class="summary-details">{{ formatPrice(cartStore.subtotalPrice) }}</p>
                </el-col>
              </el-row>

              <el-row :gutter="20">
                <el-col :span="12">
                  <p class="summary-details">Shipping Fee</p>
                </el-col>
                <el-col :span="12">
                  <p class="summary-details">{{ formatPrice(shippingFee) }}</p>
                </el-col>
              </el-row>

              <el-divider />

              <el-row :gutter="20">
                <el-col :span="12">
                  <h4 class="summary-details-total">Total</h4>
                </el-col>
                <el-col :span="12">
                  <h4 class="summary-details-total">
                    {{ formatPrice(cartStore.subtotalPrice + shippingFee) }}
                  </h4>
                </el-col>
              </el-row>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Money, CreditCard, Wallet } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '@/stores/cart'
import { useUserStore, type UserAddress } from '@/stores/user'
import { useFormatting } from '@/composables/useFormatting'
import { useAddress } from '@/composables/useAddress'

const cartStore = useCartStore()
const userStore = useUserStore()
const { formatPrice, calculateShippingFee } = useFormatting()
const {
  addressForm: shippingForm,
  regionsList,
  provincesList,
  citiesList,
  barangaysList,
  setAddress,
} = useAddress()

// Checkout steps
const currentStep = ref(0)
const isProcessing = ref(false)

// Order details
const orderNumber = ref('')
const orderDate = ref('')

// Shipping and payment
const shippingFee = computed(() => {
  return calculateShippingFee(shippingForm.value.region)
})

const paymentMethod = ref('cod')

// Validate shipping form
const isShippingFormValid = computed(() => {
  return (
    shippingForm.value.name &&
    shippingForm.value.region &&
    shippingForm.value.province &&
    shippingForm.value.city &&
    shippingForm.value.barangay &&
    shippingForm.value.street
  )
})

// Navigation between steps
const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

// Place order and move to confirmation
const placeOrder = async () => {
  if (!isShippingFormValid.value) {
    ElMessage.error('Please complete shipping information')
    return
  }

  isProcessing.value = true

  try {
    // The shippingForm now directly matches the simplified UserAddress interface
    const finalShippingAddress: UserAddress = {
      ...shippingForm.value,
    }

    const order = await cartStore.checkout(finalShippingAddress, paymentMethod.value)

    if (order) {
      orderNumber.value = order.id
      orderDate.value = new Date(order.date).toLocaleDateString()
      nextStep() // Move to confirmation step
      cartStore.clearCart() // Clear cart after navigating
      ElMessage.success('Order placed successfully!')
    } else {
      ElMessage.error('Failed to place order. Please try again.')
    }
  } catch (error) {
    ElMessage.error((error as Error).message || 'An unexpected error occurred.')
  } finally {
    isProcessing.value = false
  }
}

// Pre-fill user data if available
onMounted(() => {
  if (userStore.user?.address) {
    // Use a timeout to ensure the watchers in useAddress have time to populate the lists
    setTimeout(() => {
      setAddress(userStore.user!.address!)
      shippingForm.value.name = userStore.user!.name
    }, 100)
  } else if (userStore.user) {
    shippingForm.value.name = userStore.user.name
  }
})
</script>

<style scoped>
.checkout-view {
  max-width: 1200px;
  padding: 50px;
}

.page-header {
  font-family: var(--font-header);
  margin-bottom: 12px;
}

.checkout-step {
  margin-top: 24px;
}

.checkout-form {
  font-size: small;
}

.card-header h2 {
  font-weight: normal;
  font-family: var(--font-header);
}

.card-header h4 {
  font-weight: normal;
  font-family: var(--font-header);
}

.summary-details {
  color: var(--chocolate);
}

.summary-details-total {
  font-weight: 600;
}

.order-items {
  padding: 10px;
}

.product-img {
  width: 100%;
  border-radius: 12px;
}

.order-item-details h2 {
  font-weight: normal;
  font-family: var(--font-header);
  color: var(--teal);
}

.order-item-price {
  font-size: medium;
  color: var(--brown);
}

.order-item-total {
  font-size: medium;
  font-weight: 600;
  color: var(--chocolate);
  text-align: right;
}

.step-actions {
  display: flex;
  justify-content: space-between;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.payment-option {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 20px;
  width: 100%;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  margin: 10px;
}

.payment-option-content {
  padding: 10px;
}

.payment-details ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.payment-details li {
  display: flex;
  align-items: center;
  font-weight: 600;
}

.payment-details li .el-icon {
  margin-right: 10px;
}

.payment-details p {
  color: var(--gray);
  font-size: smaller;
}

.order-confirmation {
  margin-bottom: 24px;
}

.order-confirmation p {
  font-size: small;
  color: var(--gray);
}
</style>
