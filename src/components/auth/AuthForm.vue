<template>
  <el-card shadow="never">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" @submit.prevent="submitForm(ruleFormRef)">
      <h1 class="heading">{{ title }}</h1>
      <el-form-item label="Email" prop="email" label-position="top">
        <el-input v-model="ruleForm.email" placeholder="Enter your email" clearable prefix-icon="User" size="large" />
      </el-form-item>
      <el-form-item label="Password" prop="password" label-position="top">
        <el-input
          v-model="ruleForm.password"
          type="password"
          show-password
          placeholder="Enter your password"
          clearable
          prefix-icon="Lock"
          size="large"
        />
      </el-form-item>
      <el-form-item v-if="mode === 'signup'" label="Confirm Password" prop="confirmPassword" label-position="top">
        <el-input
          v-model="ruleForm.confirmPassword"
          type="password"
          show-password
          placeholder="Confirm your password"
          clearable
          prefix-icon="Lock"
          size="large"
        />
      </el-form-item>
      <div class="justify-end">
        <router-link v-if="mode === 'login'" to="/forgot-password">Forgot Password?</router-link>
      </div>
      <el-button color="black" native-type="submit" size="large">
        {{ btnLabel }}
      </el-button>
      <div v-if="mode === 'login'" class="justify-center" style="margin-top: 20px">
        <span> Don't have an Account? &nbsp;</span>
        <router-link to="/sign-up">Sign up</router-link>
      </div>
      <div v-if="mode === 'signup'" class="justify-center" style="margin-top: 20px">
        <span>Already have an account? &nbsp;</span>
        <router-link to="/login"> Login</router-link>
      </div>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive, defineEmits } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { RouterLink } from 'vue-router'
import { useValidators } from '@/composables/useValidators'

interface RuleForm {
  email?: string
  password?: string
  confirmPassword?: string
}

interface AuthFormProps {
  title?: string
  btnLabel?: string
  mode?: 'login' | 'signup'
}

const { emailValidator, normalValidator, validateStrongPassword, matchPassword } = useValidators()
const { btnLabel = 'LOGIN', title = 'Login', mode = 'login' } = defineProps<AuthFormProps>()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({})
const emit = defineEmits(['on-submit'])

const rules = reactive<FormRules<RuleForm>>({
  email: [{ validator: emailValidator, trigger: 'blur' }],
  password: [{ validator: mode === 'login' ? normalValidator('password') : validateStrongPassword, trigger: 'blur' }],
  confirmPassword: [{ validator: matchPassword(() => ruleForm.password ?? ''), trigger: 'blur' }],
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm)
      emit('on-submit', { ...ruleForm })
    } else {
      ElMessage.error('Invalid username or password')
    }
  })
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.heading {
  margin-bottom: 12px;
}
.el-form {
  min-width: 500px;
  box-sizing: border-box;
}

.el-button {
  width: 100%;
  margin-top: 20px;
}

.justify-center {
  display: flex;
  justify-content: center;
}

.justify-center span {
  color: #575757;
}

.justify-end {
  display: flex;
  justify-content: end;
}

@media (max-width: 600px) {
  .el-form {
    padding: 12px;
    width: 100%;
    min-width: 0;
  }

  .el-card {
    margin-top: 4rem;
  }
}
</style>
