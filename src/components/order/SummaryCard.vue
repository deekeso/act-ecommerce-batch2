<template>
  <el-card class="order-summary" shadow="never">
    <h1>Order Summary</h1>
    <p class="flex-text">
      Shipping Fee: <span>{{ formatPrice(props.deliveryOptions) }}</span>
    </p>
    <p class="flex-text">
      SubTotal: 
      <span>{{ formatPrice(subtotal) }}</span>
    </p>
    <h1 class="flex-text">
      Total: 
      <span>{{ formatPrice(total) }}</span>
    </h1>
    <el-button 
      class="btn-submit" 
      color="white" 
      style="padding: 20px" 
      @click="onCheckOut"
    >
      Check out
    </el-button>
  </el-card>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useUtils } from "@/composables/useUtils";
import { useCart } from "@/stores/carts";

interface OrderCardProp {
  deliveryOptions: number;
}

const props = defineProps<OrderCardProp>();
const emit = defineEmits(["on-checkout"]);

const { formatPrice } = useUtils();
const cartStore = useCart();

const buyNowItem = computed(() => cartStore.getBuyNowItems);
const isBuyNowMode = computed(() => buyNowItem.value !== null && Object.keys(buyNowItem.value).length > 0);

const buyNowPrice = computed(() =>
  buyNowItem.value ? buyNowItem.value.price * buyNowItem.value.quantity : 0
);

const subtotal = computed(() =>
  isBuyNowMode.value ? buyNowPrice.value : cartStore.getSelectedTotalPrice
);

const total = computed(() => subtotal.value + props.deliveryOptions);

function onCheckOut() {
  emit("on-checkout");
}
</script>

<style scoped>
:deep(.el-card){
   width: 100%;
}
.flex-text {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.el-button {
  width: 100%;
}

.order-summary {
  background-color: #121212;
  padding: 20px;
  border-radius: 20px;
  color: white;
 
}
</style>
