<template>
    <main class="container">
        <forgot-password @on-submit="handlePasswordReset"/>
    </main>
</template>

<script setup lang="ts">
import { ForgotPasswordForm  as ForgotPassword } from '@/components';
import { useAuth } from '@/stores/auth'
import { ElMessage } from 'element-plus'

const auth = useAuth()

function handlePasswordReset(email: string) {
  auth.forgotPassword({ email })
}
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 70vh;
}
</style>