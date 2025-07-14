<template>
  <header>
    <div class="banner">
      <div class="flex-spacer"></div>

      <el-dropdown placement="bottom" v-if="userStore.isLoggedIn" trigger="click">
        <el-button> MY ACCOUNT </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>My Profile</el-dropdown-item>
            <el-dropdown-item>My Orders</el-dropdown-item>
            <el-dropdown-item divided @click="userStore.logout">Logout</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <el-button v-else @click="showLoginModal = true" class="bannerLink"> LOGIN </el-button>
    </div>

    <div class="menu">
      <div class="logo">
        <router-link to="/">
          <img src="../assets/logo.svg" alt="Digidelights" />
        </router-link>
      </div>

      <el-autocomplete
        native-type="submit"
        v-model="state"
        :fetch-suggestions="querySearch"
        :trigger-on-focus="false"
        clearable
        class="searchBar"
        popper-class="searchSuggestions"
        placeholder="Search for your favorites"
        @select="handleSelect"
      >
        <template #suffix>
          <el-icon @click="handleSearch">
            <Search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <div class="value">{{ item.value }}</div>
          <span class="link">{{ item.link }}</span>
        </template>
      </el-autocomplete>
    </div>
  </header>
</template>

<script lang="ts"></script>

<style scoped>
.flex-spacer {
  flex-grow: 1;
}
</style>
