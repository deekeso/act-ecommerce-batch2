<template>
  <main class="container">
    <forgot-password @on-submit="handlePasswordReset" />
  </main>
</template>

<script setup lang="ts">
import { ForgotPasswordForm as ForgotPassword } from '@/components'
import { useAuth } from '@/stores/auth'

const auth = useAuth()

function handlePasswordReset(email: string) {
  auth.forgotPassword({ email })
}
</script>

<style scoped>
/* In parent layout */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  box-sizing: border-box;
  min-height: 75vh; /* optional */
}

@media (max-width: 400px) {
  .container {
    height: auto;
    padding: 20px;
  }
}
</style>
