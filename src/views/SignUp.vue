<template>
  <div class="container">
    <register-form title="Sign up" btn-label="Sign up" mode="signup" @on-submit="handleSubmit" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { AuthForm as RegisterForm } from '@/components'
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

function handleSubmit(formData: User) {
  authStore.handleSignUp(formData)

  if (authStore.isAuthenticated) {
    router.push('/profile')
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

@media (max-width: 400px) {
  .container {
    height: auto;
    padding: 20px;
  }
}
</style>
