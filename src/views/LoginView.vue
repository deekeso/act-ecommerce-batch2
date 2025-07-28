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
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuth()
const { requireGuest } = useAuthGuard()

onMounted(() => {
  requireGuest()
})

function handleLogin(formData: User) {
  authStore.handleLogin(formData)

  if (authStore.isAuthenticated) {
    router.push('/')
  }
}
</script>

<style scoped>
.container {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
