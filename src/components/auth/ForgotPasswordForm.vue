<template>
  <el-card shadow="never" class="form-card">
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top" @submit.prevent="handleSubmit">
      <h2 class="form-title">Forgot Password</h2>

      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Enter your email" type="email" clearable />
      </el-form-item>

      <div class="button-group">
        <el-button color="black" native-type="submit" class="submit-btn" auto-insert-space size="large" block>
          Send Reset Link
        </el-button>
        <el-button @click="() => router.push('/login')" class="cancel-btn" size="large" block> Cancel </el-button>
      </div>
    </el-form>
  </el-card>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['on-submit'])

const formRef = ref<FormInstance>()
const form = reactive({ email: '' })

const rules: FormRules = {
  email: [
    { required: true, message: 'Email is required', trigger: 'blur' },
    { type: 'email', message: 'Enter a valid email', trigger: ['blur', 'change'] },
  ],
}

function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) emit('on-submit', form.email)
  })
}
</script>

<style scoped>
.form-card {
  width: 100%;
  max-width: 500px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.el-button {
  margin-left: 0px !important;
}

@media (min-width: 480px) {
  .button-group {
    flex-direction: row;
  }

  .button-group .el-button {
    flex: 1;
  }
}
</style>
