<template>
  <div class="container">
    <ul class="action-link">
      <li>SAVE MORE ON SHOP+</li>
      <!-- <li></li> -->
      <!-- <router-link v-if="authStore.token" to="/profile">PROFILE</router-link> -->
      <router-link v-if="!authStore.token" to="/login">LOGIN</router-link>
      <router-link v-if="!authStore.token" to="/sign-up">SIGNUP</router-link>
      <!-- <li v-if="authStore.token" @click="onLogout">LOGOUT</li> -->
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '@/stores/auth'
import { RouterLink } from 'vue-router'
const authStore = useAuth()
// const router = useRouter()

// function onLogout() {
//   authStore.handleLogout()
//   router.push('/')
// }
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  background-color: #000000;
  color: white;
}
.action-link {
  display: flex;
  padding: 4px;
  justify-content: end;
  width: 1440px;
}

.action-link > * {
  margin-left: 20px;
}

.action-link li,
a {
  text-decoration: none;
  list-style-type: none;
  font-size: 12px;
  cursor: pointer;
  color: white;
}
</style>
