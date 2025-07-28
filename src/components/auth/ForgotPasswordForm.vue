<!-- ForgotPasswordForm.vue -->
<template>
  <el-card shadow="never">
     
     <el-form 
      :model="form" 
      :rules="rules" ref="formRef" 
      label-position="top" 
      @submit.prevent="handleSubmit"
    >
      <h2 style="margin-bottom: 20px;">Forgot Password</h2>
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" placeholder="Enter your email" type="email" clearable />
      </el-form-item>
      <div class="flex">
         <el-button color="black" native-type="submit" block>Send Reset Link</el-button>
         <el-button @click=" () => router.push('/login')">Cancel</el-button>
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
.el-form{
  width: 500px;
}
.submit-btn {
  margin-top: 10px;
}

.flex{
  display: flex;
  width: 100%;
}

a{
  color: #121212;
  text-decoration: none;
}
</style>
