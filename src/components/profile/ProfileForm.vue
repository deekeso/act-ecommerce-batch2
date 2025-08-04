<template>
  <el-card shadow="never">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      @submit.prevent="submitForm(ruleFormRef)"
      label-position="top"
    >
      <slot name="header"></slot>
      <div class="form-control">
        <el-form-item label="First Name" prop="firstname">
          <el-input v-model="ruleForm.firstname" placeholder="Enter your first name" clearable autocomplete="off" />
        </el-form-item>
        <el-form-item label="Last Name" prop="lastname">
          <el-input v-model="ruleForm.lastname" placeholder="Enter your last name" clearable autocomplete="off" />
        </el-form-item>
      </div>

      <el-form-item label="Contact Number" prop="contact">
        <el-input v-model="ruleForm.contact" placeholder="+63" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="Enter your email"
          clearable
          autocomplete="off"
          :readonly="props.email ? true : false"
        />
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
        <el-button v-if="submitButtonActive" color="black" size="large" native-type="submit">
          {{ props.submitButtonText ? props.submitButtonText : 'Save Changes' }}
        </el-button>
        <el-button v-if="props.firstname && props.cancelButtonActive" size="large" @click="emit('on-cancel')">
          {{ props.cancelButtonText ? props.cancelButtonText : 'Cancel' }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { useValidators } from '@/composables/useValidators'
import { useUtils } from '@/composables/useUtils'

interface RuleForm {
  firstname?: string
  lastname?: string
  email?: string
  address?: string
  contact?: string
}

interface FormProps extends RuleForm {
  submitButtonText?: string
  cancelButtonText?: string
  submitButtonActive?: boolean
  cancelButtonActive?: boolean
}

const props = defineProps<FormProps>()
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  firstname: props.firstname ?? '',
  lastname: props.lastname ?? '',
  email: props.email ?? '',
  address: props.address ?? '',
  contact: props.contact ?? '',
})

const { capitalizeEachWord } = useUtils()
const { contactValidator, emailValidator, nameValidator, addressValidator } = useValidators()
const emit = defineEmits(['on-submit', 'on-cancel'])

const rules = reactive<FormRules<RuleForm>>({
  firstname: [{ validator: nameValidator, trigger: 'blur' }],
  lastname: [{ validator: nameValidator, trigger: 'blur' }],
  email: [{ required: true, validator: emailValidator, trigger: 'blur' }],
  contact: [{ required: true, validator: contactValidator, trigger: 'blur' }],
  address: [{ required: true, validator: addressValidator, trigger: 'blur' }],
})

const formattedFormValue = () => {
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
      emit('on-submit', formattedFormValue())
    } else {
      console.log('failed to submit form data')
    }
  })
}
</script>

<style scoped>
.el-card {
  height: 100%;
  min-height: 692px;
}
.el-input {
  height: 50px;
  width: 100%;
}

.form-control {
  display: flex;
  width: 100%;
  gap: 12px;
}

.form-control {
  display: flex;
  width: 100%;
  gap: 12px;
}

.form-control .el-form-item {
  flex: 1;
}

@media (max-width: 600px) {
  .form-control {
    flex-direction: column;
  }
}
</style>
