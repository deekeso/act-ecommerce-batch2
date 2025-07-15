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
          <el-row :gutter="10">
            <el-button :icon="Phone" circle />
            <el-button :icon="Message" circle />
            <el-button :icon="Location" circle />
          </el-row>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <h4>Customer Service</h4>
          <el-link disabled>Help Center</el-link>
          <el-link disabled>Shipping & Delivery</el-link>
          <el-link disabled>Returns & Refunds</el-link>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <h4>Learn More</h4>
          <el-link disabled>About Us</el-link>
          <el-link disabled>Privacy Policy</el-link>
          <el-link disabled>Terms & Conditions</el-link>
        </el-col>

        <el-col :xs="24" :sm="12" :md="8" :lg="6">
          <h4>Our Products</h4>
          <el-link disabled>All Products</el-link>
          <el-link disabled>Nutritional Information</el-link>
          <el-link disabled>Allergen Information</el-link>
        </el-col>
      </el-row>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ new Date().getFullYear() }} Digidelights</p>
    </div>
  </footer>
</template>

<script lang="ts"></script>

<style lang="">
.app-footer {
  background-color: white;
  padding: 40px 0 20px;
  margin-top: 40px;
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
  margin-bottom: 15px;
  font-family: var(--font-header);
}

.footer-bottom {
  background-color: var(--chocolate);
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px 15px 0;
  text-align: center;
}

.footer-bottom p {
  color: white;
}
</style>
