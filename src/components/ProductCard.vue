<template>
  <div class="app-prod-card">
    <el-card :body-style="{ padding: '0px' }" class="product-card">
      <div class="product-image">
        <el-image :src="product.image" :fit="cover" alt="product.name" class="image" />
      </div>

      <div class="product-content">
        <h3 class="product-name">{{ product.name }}</h3>

        <div class="product-price">₱{{ product.price }}</div>

        <div class="product-description">{{ truncateDescription(product.description) }}</div>

        <div class="product-actions" @click.stop>
          <el-button @click="addToCart" :loading="loading" :icon="ShoppingCart">
            Add to Cart
          </el-button>
        </div>
      </div>
      <div class="view-details-overlay"></div>
    </el-card>
  </div>
</template>

<script lang="ts"></script>

<style scoped>
.app-prod-card {
  margin-bottom: 20px;
}

.product-card {
  margin-bottom: 20px;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.product-content {
  padding: 14px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 16px;
  margin: 0 0 8px;
  font-weight: 600;
  color: #333;
  height: 40px;
  overflow: hidden;
}

.product-price {
  font-size: 18px;
  font-weight: 700;
  color: #ff4d4f;
  margin-bottom: 8px;
}

.product-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  flex-grow: 1;
}

.product-actions {
  margin-top: auto;
}
</style>
