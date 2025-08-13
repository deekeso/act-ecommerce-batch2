<template>
  <main class="container">
    <login-form mode="login" @on-submit="handleLogin" />
  </main>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { AuthForm as LoginForm } from '@/components'
import { useAuth } from '@/stores/auth'
import { useAuthGuard } from '@/composables/useAuthGuard'
import type { User } from '@/types'
import { useRouter, useRoute } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuth()
const { requireGuest } = useAuthGuard()

onMounted(() => {
  requireGuest()
})

function handleLogin(formData: User) {
  authStore.handleLogin(formData)
  const redirectPath = (route.query.redirect as string) || '/'
  if (authStore.isAuthenticated) {
    router.push(redirectPath)
  }
}
</script>

<style scoped>
.container {
  box-sizing: content-box;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 400px) {
  .container {
    height: auto;
    padding: 20px;
  }
}
</style>
