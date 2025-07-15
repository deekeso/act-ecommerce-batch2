<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Top banner -->
      <div class="banner">
        <el-button disabled link size="small"> FEEDBACK </el-button>
        <el-button disabled link size="small"> CUSTOMER CARE </el-button>

        <el-dropdown placement="bottom" size="small" v-if="userStore.isLoggedIn" trigger="click">
          <el-button link> MY ACCOUNT </el-button>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="router.push('/profile')">My Profile</el-dropdown-item>
              <el-dropdown-item @click="router.push('/orders')">My Orders</el-dropdown-item>
              <el-dropdown-item divided @click="userStore.logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <el-button v-else @click="showLoginModal = true" link size="small"> LOGIN </el-button>
      </div>

      <!-- Menu -->
      <div class="menu">
        <div class="logo">
          <router-link to="/">
            <img src="@/assets/logo.svg" alt="Digidelights" class="logo-img" />
          </router-link>
        </div>

        <div class="search-bar">
          <el-form @submit.prevent="handleSearch()" size="large">
            <el-autocomplete
              v-model="searchQuery"
              :fetch-suggestions="querySearch"
              :trigger-on-focus="false"
              clearable
              class="searchBar"
              popper-class="searchSuggestions"
              placeholder="Search for your favorites"
              @select="handleSelect"
            >
              <template #default="{ item }">
                <div class="autocomplete-item">
                  <el-image :src="item.image" :fit="cover" alt="item.name" class="product-img" />
                  <span>{{ item.name }}</span>
                </div>
              </template>
            </el-autocomplete>
            <el-button :icon="Search" native-type="submit" size="large" />
            <template #append></template>
          </el-form>
        </div>

        <div class="header-cart">
          <router-link to="/cart" class="cart-link">
            <el-badge
              :value="cartStore.itemCount"
              :hidden="cartStore.itemCount === 0"
              class="cart-badge"
            >
              <el-button :icon="ShoppingCart" size="large" />
            </el-badge>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Login Modal -->
    <LoginModal
      v-model:visible="showLoginModal"
      @switch-to-register="switchToRegister"
      @switch-to-forgot-password="switchToForgotPassword"
      @login-success="handleLoginSuccess"
    />

    <!-- Register Modal -->
    <RegisterModal
      v-model:visible="showRegisterModal"
      @switch-to-login="switchToLogin"
      @register-success="handleRegisterSuccess"
    />

    <!-- Forgot Password Modal -->
    <ForgotPasswordModal
      v-model:visible="showForgotPasswordModal"
      @switch-to-login="switchToLogin"
    />
  </header>
</template>

<script lang="ts"></script>

<style scoped>
.app-header {
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 15px;
  display: flex;
  align-items: center;
}

.banner {
  display: flex;
  justify-content: flex-end;
  background-color: var(--chocolate);
  padding: 0.5rem 3rem;
  gap: 0.5rem;
}

.banner :deep(.el-button) {
  color: white;
}

.menu {
  display: flex;
  margin: 0 auto;
  padding: 15px;
  align-items: center;
}

.logo {
  margin-left: 20px;
}

.logo-img {
  height: 70px;
}

.search-bar {
  flex: 1;
  max-width: 600px;
  margin: 0 20px;
}

.search-bar :deep(.el-autocomplete) {
  --el-input-focus-border-color: var(--mint);
  --el-input-active-border-color: var(--mint);
}

.search-bar :deep(.el-button) {
  background-color: var(--chocolate);
  color: white;
  --el-button-focus-border-color: var(--chocolate);
  --el-button-active-border-color: var(--brown);
}

.searchSuggestions {
  background-color: var(--teal);
}

.autocomplete-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
}

.product-img {
  width: 50px;
  height: 50px;
}

.header-cart {
  margin-left: 20px;
}

.header-cart :deep(.el-button) {
  --el-button-bg-color: transparent;
  color: var(--chocolate);
}

.cart-badge:deep(.el-badge__content) {
  background-color: var(--teal);
}
</style>
