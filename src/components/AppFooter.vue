<template>
  <footer class="app-footer">
    <div class="footer-container">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <el-row>
            <div class="logo">
              <img src="@/assets/logo.svg" alt="Digidelights" class="logo-img" />
            </div>
          </el-row>
          <el-row :gutter="10" style="margin-left: 15px">
            <el-button :icon="Location" circle color="var(--chocolate)" />
            <el-button :icon="Message" circle color="var(--chocolate)" />
            <el-button :icon="Phone" circle color="var(--chocolate)" />
          </el-row>
        </el-col>

        <el-col :xs="24" :sm="12" :md="6">
          <h4>Customer Service</h4>
          <el-row>
            <el-link disabled>Help Center</el-link>
          </el-row>
          <el-row>
            <el-link disabled>Shipping & Delivery</el-link>
          </el-row>
          <el-row>
            <el-link disabled>Returns & Refunds</el-link>
          </el-row>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <h4>Learn More</h4>
          <el-row>
            <el-link disabled>About Us</el-link>
          </el-row>
          <el-row>
            <el-link disabled>Privacy Policy</el-link>
          </el-row>
          <el-row>
            <el-link disabled>Terms & Conditions</el-link>
          </el-row>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <h4>Our Products</h4>
          <el-row>
            <el-link href="/products" :underline="false" class="footer-link">All Products</el-link>
          </el-row>
          <el-row>
            <el-link disabled>Nutritional Information</el-link>
          </el-row>
          <el-row>
            <el-link disabled>Allergen Information</el-link>
          </el-row>
        </el-col>
      </el-row>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Digidelights</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Phone, Message, Location } from '@element-plus/icons-vue'
</script>

<style scoped>
.app-footer {
  background-color: var(--offwhite);
  padding: 40px 0 20px;
}

.logo-img {
  height: 70px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

.footer-container h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-family: var(--font-header);
  font-weight: normal;
  color: var(--teal);
}

.footer-link {
  color: var(--gray);
}

.footer-link:hover {
  color: var(--mint);
}

.footer-bottom {
  margin: 0 auto;
  padding: 20px 15px 0;
  text-align: center;
}

.footer-bottom p {
  color: var(--gray);
  font-size: small;
}
</style>
