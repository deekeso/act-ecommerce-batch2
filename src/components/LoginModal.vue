<template>
  <div class="app-login">
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      @close="handleClose"
      title="Login"
    >
      <div class="login-form">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input
              v-model="loginForm.email"
              placeholder="Enter your email"
              :prefix-icon="Message"
              type="email"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="loginForm.password"
              placeholder="Enter your password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button
              native-type="submit"
              @click="handleLogin"
              :loading="isLoading"
              type="primary"
              round
              class="submit-button"
            >
              LOGIN
            </el-button>
          </el-form-item>

          <div class="forgot-password">
            <a href="#" @click.prevent="switchToForgotPassword">Forgot password?</a>
          </div>

          <div class="form-footer">
            <p>
              Don't have an account? <a href="#" @click.prevent="switchToRegister">Register now</a>
            </p>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits([
  'update:visible',
  'switch-to-register',
  'switch-to-forgot-password',
  'login-success',
])

const userStore = useUserStore()
const isLoading = ref(false)

const loginForm = ref({
  email: '',
  password: '',
})

const dialogVisible = ref(props.visible)

// Watch for changes in visible prop
// These functions are now handled directly in the watch functions

// Watch for changes in props.visible
watch(
  () => props.visible,
  (newVal) => {
    dialogVisible.value = newVal
  },
)

// Watch for changes in dialogVisible
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

const handleLogin = async () => {
  if (!loginForm.value.email || !loginForm.value.password) {
    ElMessage.error('Please enter both email and password')
    return
  }

  // Validate email format
  const emailPattern =
    /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/
  if (!emailPattern.test(loginForm.value.email)) {
    ElMessage.error('Please enter a valid email address')
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = await userStore.login(loginForm.value.email, loginForm.value.password)

    if (success) {
      ElMessage.success('Login successful!')
      emit('login-success')
      handleClose()
    } else {
      ElMessage.error('Invalid phone number or password')
    }
  } catch (error) {
    ElMessage.error('An error occurred during login')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const switchToRegister = () => {
  emit('switch-to-register')
}

const switchToForgotPassword = () => {
  emit('switch-to-forgot-password')
}

const handleClose = () => {
  loginForm.value.email = ''
  loginForm.value.password = ''
  dialogVisible.value = false
}
</script>

<style scoped>
.login-form {
  padding: 10px;
}

.forgot-password {
  text-align: right;
  margin-top: 1rem;
  font-size: 0.875rem;
}

a {
  color: var(--teal);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--mint);
  text-decoration: underline;
}

.form-footer {
  text-align: center;
  font-size: 0.875rem;
}

.submit-button {
  width: 100%;
}
</style>
