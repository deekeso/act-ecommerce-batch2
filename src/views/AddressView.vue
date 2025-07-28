<template>
  <main class="container">
    <section class="order-summary">
      <div class="delivery">
        <h1>Delivery Options</h1>
        <el-radio-group v-model="deliveryOptions" size="large" class="delivery-option">
          <el-radio-button :value="150">
            <el-icon><Van /></el-icon>
            Express
          </el-radio-button>
          <el-radio-button :value="100" class="delivery-option">
            <el-icon><Box /></el-icon>
            Standard Delivery
          </el-radio-button>
        </el-radio-group>
        <div class="delivery-description">
          <p class="xs" v-if="deliveryOptions === 150">
            Your package will be prioritized and delivered within 1 or 2 business days, ensuring you receive your items as
            quickly as possible. Perfect for urgent orders or last-minute needs.
          </p>
          <p class="xs" v-else-if="deliveryOptions === 100">
            Our Standard Delivery offers reliable and cost-effective shipping. Orders are typically delivered within 3 to 5
            business days.
          </p>
        </div>
      </div>
      <div class="payment">
        <h1 class="">Select Payment Method</h1>
        <el-radio-group v-model="paymentOptions" size="large">
          <el-radio-button value="cash">Cash On Delivery</el-radio-button>
          <el-tooltip content="Not available" placement="top" effect="light">
            <el-radio-button value="master-card" disabled>Master Card</el-radio-button>
          </el-tooltip>
          <el-tooltip content="Not available" placement="top" effect="light">
            <el-radio-button value="gcash" disabled>GCash</el-radio-button>
          </el-tooltip>
          <el-tooltip content="Not available" placement="top" effect="light">
            <el-radio-button value="maya" disabled>Pay Maya</el-radio-button>
          </el-tooltip>
        </el-radio-group>
        <div class="masterCardForm" v-if="paymentOptions === 'master-card'" style="margin-top: 20px">
          <el-form @submit.prevent="">
            <h3>Payment Information</h3>
            <p>Fill up the details to complete the payment</p>
            <el-form-item label="Card Number" label-position="top">
              <el-input type="text" placeholder="Enter your card number" clearable autocomplete="off" />
            </el-form-item>
            <el-form-item label="Expiry Date" label-position="top">
              <el-input placeholder="MM/YY" clearable autocomplete="off" />
            </el-form-item>
            <el-form-item label="CVV" label-position="top">
              <el-input placeholder="123" clearable autocomplete="off" />
            </el-form-item>
            <el-form-item label="Card Holder" label-position="top">
              <el-input placeholder="Card Holder Name" clearable autocomplete="off" />
            </el-form-item>
            <el-button color="black" native-type="submit"> Save </el-button>
          </el-form>
        </div>
      </div>
      <div class="billing-address">
        <div class="billing-header">
          <h1>Shipping Address</h1>
          <el-button
            v-if="addressStore.getAllAddress.length === 0"
            class="top-right"
            color="black"
            style="padding: 20px"
            @click="isModalOpen = true"
          >
            <el-icon size="20px">
              <MapLocation />
            </el-icon>
            <span>Add Address</span>
          </el-button>
        </div>
        <el-dialog v-model="isModalOpen">
          <address-form @on-save="handleSubmit" />
        </el-dialog>
        <div v-if="addressStore.getAllAddress.length >= 1">
          <address-card
            v-for="billing in addressStore.getAllAddress"
            :key="billing.id"
            :id="billing.id"
            :email="billing.email"
            :address="billing.address"
            :contact="billing.contact"
          />
        </div>
      </div>
    </section>
    <section class="order-summary">
      <div class="order">
        <div class="left">
          <h1>Review Cart</h1>
          <div class="order-card" v-for="item in cartStore.getAllSelectedCartItems" :key="item.id">
            <el-image :src="item.image" fit="cover" style="width: 100px; height: 100px; border-radius: 12px" :lazy="true" />
            <div class="order-card-body">
              <p>{{ item.label }}</p>
              <p>Quantity: {{ item.quantity }}x</p>
            </div>
          </div>
        </div>
        <div class="right">
          <h1>Order Summary</h1>
          <p>Shipping Fee: {{ formatPrice(deliveryOptions) }}</p>
          <p>SubTotal: {{ formatPrice(cartStore.getSelectedTotalPrice) }}</p>
          <h1>Total: {{ formatPrice(cartStore.getSelectedTotalPrice + deliveryOptions) }}</h1>
          <el-button color="black" style="padding: 20px">Check out</el-button>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AddressForm, AddressCard } from '@/components'
import type { AddressRuleForm } from '@/types'
import { useAddress } from '@/stores/address'
import { useCart } from '@/stores/carts'
import { useUtils } from '@/composables/useUtils'

const cartStore = useCart()
const addressStore = useAddress()
const { formatPrice } = useUtils()
const paymentOptions = ref('cash')
const deliveryOptions = ref(100)
const isModalOpen = ref(false)
const showCard = ref(false)

function handleSubmit(formData: AddressRuleForm) {
  addressStore.handleAddBillingAddress(formData)
  isModalOpen.value = false
  showCard.value = true
}
</script>

<style scoped>
.right {
  border: 1px solid #c5c5c5;
  border-radius: 12px;
  padding: 20px;
}

.order {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

.order h1 {
  margin-bottom: 4px;
}
.order-card {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.billing-header {
  display: flex;
  justify-content: space-between;
}

.delivery h1 {
  margin-bottom: 12px;
}
.delivery-description {
  padding-top: 20px;
}

.billing-address,
.delivery,
.payment,
.order {
  margin-bottom: 20px;
  border: 1px #c5c5c5 solid;
  border-radius: 12px;
  padding: 20px;
}

.order-summary {
  height: 100%;
}
.container {
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
  margin: 4rem 34rem;
  gap: 12px;
  width: 1440px;
}
.flex {
  display: flex;
  gap: 8px;
  width: 100%;
  overflow-y: scroll;
  margin-bottom: 2rem;
}

.el-radio-button__inner {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-radio-button span {
  display: flex;
  align-items: center;
  gap: 12px;
}

.el-radio-button {
  --el-radio-button-checked-bg-color: var(--primary-black);
  --el-radio-button-checked-text-color: var(--el-color-white);
  --el-radio-button-checked-border-color: var(--primary-black);
  --el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
}
</style>
