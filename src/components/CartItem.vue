<template>
  <div class="cart-item">
    <el-row :gutter="20">
      <el-col class="cart-item-image" :span="4">
        <el-image :src="item.product.image" :fit="cover" alt="item.product.name" class="image" />
      </el-col>

      <el-col class="cart-item-details" :span="8">
        <h4 class="cart-item-name">{{ item.product.name }}</h4>
        <p class="cart-item-price">₱{{ item.product.price }}</p>
      </el-col>

      <el-col class="cart-item-quantity" :span="4">
        <el-input-number
          v-model="quantity"
          :min="1"
          :max="10"
          size="small"
          @change="updateQuantity"
        />
      </el-col>

      <el-col class="cart-item-subtotal" :span="4">
        ₱{{ item.product.price * item.quantity }}
      </el-col>

      <el-col class="cart-item-actions" :span="4">
        <el-button
          type="danger"
          :icon="Delete"
          circle
          size="small"
          @click="showDeleteConfirmation = true"
        />
      </el-col>
    </el-row>
  </div>

  <!-- Delete Confirmation Modal -->
  <ConfirmationModal
    v-model:show="showDeleteConfirmation"
    title="Remove Item"
    message="Are you sure you want to remove this item from your cart?"
    confirm-button-text="Remove"
    @confirm="removeItem"
  />
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.cart-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid var(--lightgrey);
}

.cart-item-image {
  width: 80px;
  height: 80px;
  margin-right: 15px;
  background-color: var(--offwhite);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-item-details {
  flex: 1;
}

.cart-item-name {
  margin: 0 0 5px;
  font-size: 16px;
  font-family: var(--font-header);
}

.cart-item-price {
  margin: 0;
  color: var(--teal);
}

.cart-item-quantity {
  width: 120px;
  margin: 0 20px;
}

.cart-item-subtotal {
  width: 100px;
  font-weight: 600;
  text-align: right;
  margin-right: 20px;
}

.cart-item-actions {
  align-items: center;
}
</style>
