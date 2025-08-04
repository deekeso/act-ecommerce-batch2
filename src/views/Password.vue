<template>
  <profile-layout>
    <el-card shadow="never">
      <template #header>
        <h1 style="font-weight: bold">Update Password</h1>
      </template>

      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent="onSubmit">
        <el-form-item label="New Password" prop="password">
          <el-input v-model="form.password" type="password" placeholder="Enter new password" show-password />
        </el-form-item>

        <el-form-item label="Confirm Password" prop="confirmPassword" style="margin-top: 20px">
          <el-input v-model="form.confirmPassword" type="password" placeholder="Confirm new password" show-password />
        </el-form-item>

        <el-form-item>
          <el-button color="black" native-type="submit" block style="margin-top: 20px"> Update Password </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </profile-layout>
</template>

<script setup lang="ts">
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useAuth } from '@/stores/auth'
import { useValidators } from '@/composables/useValidators'

const formRef = ref<FormInstance>()
const auth = useAuth()
const { matchPassword, validateStrongPassword } = useValidators()

const form = reactive({
  password: '',
  confirmPassword: '',
})

const rules: FormRules = {
  password: [{ validator: validateStrongPassword, trigger: 'blur' }],
  confirmPassword: [{ validator: matchPassword(() => form.password), trigger: 'blur' }],
}

function onSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      auth.updatePassword(form.password)
      form.password = ''
      form.confirmPassword = ''
    }
  })
}
</script>

<style scoped>
h1 {
  font-size: 25px;
  font-weight: 600;
}

.el-input {
  height: 50px;
}

.el-button {
  height: 50px;
}
</style>
