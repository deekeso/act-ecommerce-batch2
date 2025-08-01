<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="Forgot Password"
      width="50%"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <div class="forgot-password-form">
        <!-- Step 1: Enter email -->
        <el-form
          v-if="currentStep === 1"
          :model="formData"
          ref="emailForm"
          :rules="emailRules"
          label-position="top"
        >
          <el-form-item prop="email">
            <el-input
              v-model="formData.email"
              placeholder="Enter your email"
              :prefix-icon="Message"
              :disabled="isChecking"
              type="email"
            />
          </el-form-item>

          <!-- Continue button -->
          <el-form-item>
            <el-button
              native-type="submit"
              @click="checkEmail"
              type="primary"
              round
              class="submit-button"
              :loading="isChecking"
              :disabled="!formData.email || isChecking"
            >
              CONTINUE
            </el-button>
          </el-form-item>
        </el-form>

        <!-- Step 2: Enter New Password -->
        <el-form
          v-if="currentStep === 2"
          :model="formData"
          ref="passwordForm"
          :rules="passwordRules"
        >
          <!-- New Password -->
          <el-form-item prop="newPassword">
            <el-input
              v-model="formData.newPassword"
              placeholder="Enter new password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <!-- Confirm password -->
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="formData.confirmPassword"
              placeholder="Repeat new password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <!-- Reset Password Button -->
          <el-form-item>
            <el-button
              @click="handleResetPassword"
              class="submit-button"
              type="primary"
              round
              size="large"
              :loading="isLoading"
              :disabled="!isFormValid"
            >
              RESET PASSWORD
            </el-button>
          </el-form-item>

          <div class="back-link">
            <a href="#" @click.prevent="currentStep = 1">Back to email entry</a>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import type { FormItemRule, FormInstance } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'switch-to-login'])

const userStore = useUserStore()
const isLoading = ref(false)
const isChecking = ref(false)
const dialogVisible = ref(props.visible)
const currentStep = ref(1) // 1: Email entry, 2: Password reset

// Form refs for validation
const emailForm = ref<FormInstance | null>(null)
const passwordForm = ref<FormInstance | null>(null)

// Form data
const formData = reactive({
  email: '',
  newPassword: '',
  confirmPassword: '',
})

// Error and success messages
const errorMessage = ref('')
const successMessage = ref('')

// Form validation rules
const emailRules = {
  email: [
    { required: true, message: 'Please enter your email', trigger: 'blur' },
    { type: 'email', message: 'Please enter a valid email address', trigger: 'blur' },
  ],
}

const passwordRules = {
  newPassword: [
    { required: true, message: 'Please enter your new password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: 'Please confirm your password', trigger: 'blur' },
    {
      validator: (rule: FormItemRule, value: string, callback: (error?: Error) => void) => {
        if (value !== formData.newPassword) {
          callback(new Error('Passwords do not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}

// Computed properties
const passwordsMatch = computed(() => {
  return !formData.confirmPassword || formData.newPassword === formData.confirmPassword
})

const isFormValid = computed(() => {
  return formData.newPassword && formData.confirmPassword && passwordsMatch.value
})

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

// Step 1: Check if email exists
const checkEmail = async () => {
  if (!emailForm.value) return

  await emailForm.value.validate(async (valid) => {
    if (valid) {
      errorMessage.value = ''
      isChecking.value = true

      try {
        // Simulate API call with delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // For this site, assume all emails exist
        currentStep.value = 2
        isChecking.value = false
      } catch (error) {
        errorMessage.value = 'An error occurred while checking email'
        ElMessage.error(errorMessage.value)
        isChecking.value = false
        console.error('Email check error:', error)
      }
    }
  })
}

// Step 2: Reset password
const handleResetPassword = async () => {
  if (!passwordForm.value) return

  await passwordForm.value.validate(async (valid) => {
    if (valid) {
      errorMessage.value = ''
      successMessage.value = ''
      isLoading.value = true

      try {
        // Reset password using the user store
        const success = await userStore.resetPassword(formData.email, formData.newPassword)

        if (success) {
          successMessage.value = 'Password reset successfully'
          ElMessage.success(successMessage.value)

          // Close the dialog after 2 seconds
          setTimeout(() => {
            handleClose()
            emit('switch-to-login')
          }, 2000)
        } else {
          errorMessage.value = 'Failed to reset password'
          ElMessage.error(errorMessage.value)
        }
      } catch (error) {
        errorMessage.value = 'An error occurred while resetting password'
        ElMessage.error(errorMessage.value)
        console.error('Reset password error:', error)
      } finally {
        isLoading.value = false
      }
    }
  })
}

// Close the dialog
const handleClose = () => {
  resetForm()
  dialogVisible.value = false
}

// Reset form to initial state
const resetForm = () => {
  currentStep.value = 1
  formData.email = ''
  formData.newPassword = ''
  formData.confirmPassword = ''
  errorMessage.value = ''
  successMessage.value = ''
}
</script>

<style scoped>
.forgot-password-form {
  padding: 10px;
}

.submit-button {
  width: 100%;
}

.back-link {
  text-align: right;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.back-link a {
  color: var(--teal);
  text-decoration: none;
  transition: color 0.2s;
}

.back-link a:hover {
  color: var(--mint);
  text-decoration: underline;
}
</style>
