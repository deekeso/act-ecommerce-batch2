<template>
  <main class="container">
    <section class="shipping-section">
      <section id="delivery-options">
        <el-card shadow="never">
          <h1>Delivery Options</h1>
          <el-radio-group v-model="deliveryOptions" size="large">
            <el-radio-button :value="150">
              <el-icon><Van /></el-icon>
              Express
            </el-radio-button>
            <el-radio-button :value="100">
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
        </el-card>
      </section>
      <section id="payment">
        <el-card shadow="never">
          <h1>Select Payment Method</h1>
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
        </el-card>
      </section>
      <section id="address">
        <profile-form
          :firstname="currentUser?.firstname"
          :lastname="currentUser?.lastname"
          :contact="currentUser?.contact"
          :email="currentUser?.email"
          :address="currentUser?.address"
          @on-submit="onProfileUpdate"
          :submit-button-text="'Confirm Address'"
          :cancel-button-active="false"
          :submit-button-active="true"
        >
          <template #header>
            <h1 style="margin-bottom: 20px">Shipping Address</h1>
          </template>
        </profile-form>
      </section>
    </section>
    <section id="review-section">
      <el-card shadow="never">
        <h1 style="position: sticky">Review Your Cart</h1>
        <review-card />
        <summary-card 
          :delivery-options="deliveryOptions" 
          @on-checkout="handleCheckOut"
        />
      </el-card> 
    </section>
  </main>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { ProfileForm, SummaryCard, ReviewCard } from '@/components'
import { useCart } from '@/stores/carts'
import { useRouter } from 'vue-router'
import { useOrder } from '@/stores/orders'
import { ElMessage } from 'element-plus'
import { useAuth } from '@/stores/auth'
import type { AddressRuleForm } from "@/types"

const authStore = useAuth()
const cartStore = useCart()
const orderStore = useOrder()
const paymentOptions = ref('cash')
const deliveryOptions = ref(100)
const router = useRouter()
const currentUser = ref(authStore.user)
const billingAddress = ref<AddressRuleForm>({})
// handle changes on profile
function onProfileUpdate(formData: AddressRuleForm) {
  ElMessage.success('Address is confirmed')
  billingAddress.value = { ...formData }
}

function handleCheckOut() {
  const { firstname, lastname, contact, address } = billingAddress.value;
  if (!firstname || !lastname || !contact || !address) {
    ElMessage.error('Please complete the shipping address');
    return;
  }
   
  const orderSummary = { 
    totalPrice : cartStore.getSelectedTotalPrice, 
    shippingFee: deliveryOptions.value 
  }

  console.log( billingAddress.value.address )
  orderStore.placeOrder(cartStore.getAllSelectedCartItems, billingAddress.value, orderSummary)
  cartStore.removeCartItems();
  router.push('/order')
  
  
}



onMounted(() => {
  // fetch the user selected items from the cart
  cartStore.initializeCart()

  // set the default address
  billingAddress.value = {...authStore.user, address: authStore.user?.address || ''}

  if (cartStore.getAllSelectedCartItems.length <= 0) {
    ElMessage.error('Unauthorized Action')
    router.push('/')
  }
  

})
</script>

<style scoped>
.flex-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.btn-submit {
  width: 100%;
}

.container {
  --grid-cols: 2;
  display: grid;
  grid-template-columns: repeat(var(--grid-cols), 1fr);
  gap: 12px;
  margin: 20px 20px;
}
#delivery-options,
#payment,
#address {
  margin-bottom: 20px;
}

.address {
  margin-bottom: 0px;
}


.review-section {
  border: 1px solid #acacac;
  padding: 20px;
  border-radius: 20px;
  box-sizing: content-box;
  position: relative;
}




.el-radio-button {
  --el-radio-button-checked-bg-color: var(--primary-black);
  --el-radio-button-checked-text-color: var(--el-color-white);
  --el-radio-button-checked-border-color: var(--primary-black);
  --el-radio-button-disabled-checked-fill: var(--el-border-color-extra-light);
}

@media (min-width: 1440px) {
  .container {
    margin: 4rem 15rem;
  }
}

@media (max-width: 1000px) {
  .container {
    --grid-cols: 1;
  }
}
</style>