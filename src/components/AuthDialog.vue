<script setup lang="ts">
import { reactive, computed, ref, watch, nextTick } from 'vue'
import { ElMessage, type FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/UserStore'
import { useUiStore } from '@/stores/UiStore'
import { userFormRules } from '@/composables/ruleForm'
import ForgetPwDialog from './ForgetPwDialog.vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  visible: boolean
  mode: 'login' | 'register'
}>()

const form = reactive({
  email: '',
  password: '',
  confirmPassword: '',
})

const emit = defineEmits(['update:visible', 'success'])
const router = useRouter()
const formRef = ref<FormInstance | null>(null)
const userStore = useUserStore()
const uiStore = useUiStore()
const currentMode = ref(props.mode)
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit('update:visible', val),
})

const formRules = computed(() => userFormRules(form, currentMode.value))

const validForm = computed(() =>
  currentMode.value === 'register'
    ? form.email && form.password.length >= 6 && form.password === form.confirmPassword
    : form.email && form.password,
)
const showForgetPassword = ref(false)

watch(dialogVisible, (v) => {
  if (v) currentMode.value = props.mode
  emit('update:visible', v)
})

//for swapping modes
watch(
  () => props.mode,
  async (v) => {
    currentMode.value = v

    form.email = ''
    form.password = ''
    form.confirmPassword = ''

    await nextTick()
    formRef.value?.clearValidate()
  },
)

//clear on swap
watch(currentMode, async () => {
  form.email = ''
  form.password = ''
  form.confirmPassword = ''

  await nextTick()
  formRef.value?.clearValidate()
})

//clear on exit dialog
watch(
  () => props.visible,
  async (v) => {
    if (!v) {
      form.email = ''
      form.password = ''
      form.confirmPassword = ''

      await nextTick()
      formRef.value?.clearValidate()
    }
  },
)

const submit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    if (currentMode.value === 'register') {
      if (userStore.users.some((u) => u.email === form.email))
        throw new Error('Email already registered')
      userStore.register({
        id: Date.now(),
        email: form.email,
        password: form.password,
        address: {},
      })
      ElMessage.success('Registered!')
    } else {
      userStore.login(form.email, form.password)
      ElMessage.success('Logged in!')
    }

    uiStore.hideLoginDialog()

    emit('success')
    emit('update:visible', false)

    const intendedRoute = sessionStorage.getItem('intendedRoute')
    if (intendedRoute) {
      sessionStorage.removeItem('intendedRoute')
      await router.push(intendedRoute)
    } else {
      await router.push('/') // fallback
    }
    router.push('/')
  } catch (err: unknown) {
    if (err instanceof Error) {
      const msg = err instanceof Error ? err.message : 'Something went wrong!'
      ElMessage.error(msg)
    }
  }
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="currentMode === 'login' ? 'Login' : 'Register'"
    width="580px"
    align-center
    class="modern-dialog"
  >
    <div class="form-container">
      <div class="form-header">
        <h2 class="form-title">
          {{ currentMode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT' }}
        </h2>
        <p class="form-subtitle">
          {{ currentMode === 'login' ? 'Sign in to your account' : 'Join us today' }}
        </p>
      </div>

      <el-form
        @submit.prevent="submit"
        class="modern-form"
        :rules="formRules"
        :model="form"
        ref="formRef"
        :key="currentMode"
      >
        <el-form-item prop="email" class="form-field">
          <label class="field-label">Email address</label>
          <el-input
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
            class="modern-input"
            clearable
          />
        </el-form-item>

        <el-form-item prop="password" class="form-field">
          <label class="field-label">Password</label>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="Enter your password"
            class="modern-input"
            show-password
          />
        </el-form-item>
        <p
          v-if="currentMode === 'login'"
          class="forgot-password-link"
          @click="showForgetPassword = true"
        >
          Forgot password?
        </p>

        <el-form-item prop="confirmPassword" v-if="currentMode === 'register'" class="form-field">
          <label class="field-label">Confirm password</label>
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="Confirm your password"
            class="modern-input"
            show-password
          />
        </el-form-item>

        <el-button
          type="primary"
          :disabled="!validForm"
          class="submit-button"
          size="large"
          native-type="submit"
        >
          {{ currentMode === 'login' ? 'Sign in' : 'Create account' }}
        </el-button>
      </el-form>

      <el-button
        type="primary"
        @click="currentMode = currentMode === 'login' ? 'register' : 'login'"
        class="switch-btn"
        size="large"
      >
        {{ currentMode === 'login' ? 'No Account? Sign up' : 'Have an account? Log in' }}
      </el-button>
      <ForgetPwDialog v-model:visible="showForgetPassword" />
    </div>
  </el-dialog>
</template>

<style>
:deep(.el-button) {
  margin-left: 0 !important;
}

.modern-dialog .el-dialog {
  border-radius: 16px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid #f0f0f0;
}

.modern-dialog .el-dialog__header {
  display: none;
}

.modern-dialog .el-dialog__body {
  padding: 0;
}

.form-container {
  padding: 48px 32px 32px;
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #000;
  margin: 0 0 8px 0;
  letter-spacing: -0.02em;
}

.form-subtitle {
  font-size: 14px;
  color: #666;
  margin: 0;
  font-weight: 400;
}

.modern-form {
  width: 100%;
}

.form-field {
  margin-bottom: 24px;
}

.form-field:last-of-type {
  margin-bottom: 32px;
}

.field-label {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: #000;
  margin-top: 20px;
  letter-spacing: -0.01em;
}

.modern-input .el-input__wrapper {
  border-radius: 8px;
  border: 1.5px solid #e5e5e5;
  padding: 12px 16px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: none;
}

.modern-input .el-input__wrapper:hover {
  border-color: #000;
}

.modern-input .el-input__wrapper.is-focus {
  border-color: #000;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.05);
}

.modern-input .el-input__inner {
  font-size: 14px;
  color: #000;
  font-weight: 400;
}

.modern-input .el-input__inner::placeholder {
  color: #999;
  font-weight: 400;
}

.submit-button {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  margin-top: 20px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
}

.submit-button.is-disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

.modern-form .el-form-item {
  margin-bottom: 10px;
}

.modern-form .el-form-item__content {
  line-height: normal;
}

.switch-btn {
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
  margin-top: 10px;
}

.forgot-password-link {
  margin-top: 20px;
  font-size: 13px;
  color: #409eff;
  width: 110px;
  cursor: pointer;
  text-align: left;
  transition: color 0.2s ease;
}
.forgot-password-link:hover {
  color: #66b1ff;
}

@media (max-width: 480px) {
  .modern-dialog .el-dialog {
    width: 100% !important;
    margin: 0 auto;
  }
  .form-container {
    padding: 32px 24px 24px;
  }

  .form-title {
    font-size: 20px;
  }
}
</style>
