<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" @submit.prevent="submitForm(ruleFormRef)" label-position="top">
    <el-form-item label="First Name" prop="firstname">
      <el-input v-model="ruleForm.firstname" placeholder="Enter your first name" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item label="Last Name" prop="lastname">
      <el-input v-model="ruleForm.lastname" placeholder="Enter your last name" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item label="Contact Number" prop="contact">
      <el-input v-model="ruleForm.contact" placeholder="+63" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model="ruleForm.email" placeholder="Enter your email" clearable autocomplete="off" />
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input
        v-model="ruleForm.address"
        type="textarea"
        :rows="4"
        resize="none"
        placeholder="Enter your full address"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button color="black" size="large" native-type="submit">Save Address</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { AddressRuleForm } from '@/types'
import { ElMessage } from 'element-plus'
import { useValidators } from '@/composables/useValidators'
import { useUtils } from '@/composables/useUtils'

interface FormProps {
  firstname?: string
  lastname?: string
  email?: string
}

const { contactValidator, emailValidator, nameValidator, addressValidator } = useValidators()
const { capitalizeEachWord } = useUtils()
const ruleFormRef = ref<FormInstance>()
const props = defineProps<FormProps>()
const emit = defineEmits(['on-save'])

const ruleForm = reactive<AddressRuleForm>({
  firstname: props.firstname ?? '',
  lastname: props.lastname ?? '',
  email: props.email ?? '',
})

const rules = reactive<FormRules<AddressRuleForm>>({
  firstname: [{ required: true, validator: nameValidator, trigger: 'blur' }],
  lastname: [{ required: true, validator: nameValidator, trigger: 'blur' }],
  email: [{ required: true, validator: emailValidator, trigger: 'blur' }],
  contact: [{ required: true, validator: contactValidator, trigger: 'blur' }],
  address: [{ required: true, validator: addressValidator, trigger: 'blur' }],
})

const toUpperCaseFormData = () => {
  return {
    ...ruleForm,
    firstname: capitalizeEachWord(ruleForm.firstname ?? ''),
    lastname: capitalizeEachWord(ruleForm.lastname ?? ''),
    address: capitalizeEachWord(ruleForm.address ?? ''),
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      emit('on-save', toUpperCaseFormData())
      console.log(toUpperCaseFormData())
      ElMessage.success('Success')
      formEl.resetFields()
    } else {
      ElMessage.error('Something went wrong')
    }
  })
}
</script>

<style scoped>
.el-input {
  height: 50px;
}
.el-button {
  margin-top: 4px;
}
</style>
