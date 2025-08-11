<script lang="ts" setup>
import { shippingDetailsRules } from '@/composables/ruleFormShipping'
import { useUserStore } from '@/stores/UserStore'
import { ElMessage, type FormInstance } from 'element-plus'
import { computed, reactive, ref, watch, watchEffect } from 'vue'

const props = defineProps<{
  visible: boolean
}>()

const form = reactive({
  firstName: '',
  lastName: '',
  phone: '',
  street: '',
  city: '',
  country: '',
  postalCode: '',
})

const formRef = ref<FormInstance>()
const emit = defineEmits(['update:visible'])
const userStore = useUserStore()
const dialogVisible = ref(props.visible)
const isFormValid = ref(false)
const formRules = computed(() => shippingDetailsRules(form))

//needed watch to make the dialog appear
watch(
  () => props.visible,
  (v) => (dialogVisible.value = v),
)
watch(dialogVisible, (v) => emit('update:visible', v))

const submit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()

    userStore.updateProfile({
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      address: {
        street: form.street,
        city: form.city,
        postalCode: form.postalCode,
        country: form.country,
      },
    })
    ElMessage.success('Credentials Added!')
    dialogVisible.value = false
  } catch {
    ElMessage.error('Something went wrong!')
  }
}

watchEffect(() => {
  const user = userStore.currentUser
  if (!user) return
  form.firstName = user.firstName || ''
  form.lastName = user.lastName || ''
  form.phone = user.phone || ''
  form.street = user.address?.street || ''
  form.city = user.address?.city || ''
  form.country = user.address?.country || ''
  form.postalCode = user.address?.postalCode || ''
})

watchEffect(() => {
  isFormValid.value = Object.values(form).every((v) => String(v).trim() !== '')
})
</script>

<template>
  <section id="edit">
    <el-dialog
      v-model="dialogVisible"
      width="700px"
      align-center
      class="modern-dialog"
      destroy-on-close
    >
      <div class="form-container">
        <h2 class="form-title">EDIT YOUR PROFILE</h2>
        <el-form
          @submit.prevent="submit"
          class="modern-form two-column-form"
          :rules="formRules"
          :model="form"
          ref="formRef"
        >
          <div class="form-left">
            <el-form-item class="form-field" prop="firstName">
              <label class="field-label">First Name</label>
              <el-input
                v-model="form.firstName"
                placeholder="Enter your first name"
                class="modern-input"
                clearable
              />
            </el-form-item>

            <el-form-item class="form-field" prop="lastName">
              <label class="field-label">Last Name</label>
              <el-input
                v-model="form.lastName"
                placeholder="Enter your last name"
                class="modern-input"
                clearable
              />
            </el-form-item>

            <el-form-item class="form-field" prop="phone">
              <label class="field-label">Phone Number</label>
              <el-input
                v-model="form.phone"
                placeholder="ex. 09123456789"
                class="modern-input"
                maxlength="11"
                clearable
              />
            </el-form-item>
          </div>

          <div class="form-right">
            <el-form-item class="form-field" prop="street">
              <label class="field-label">Street</label>
              <el-input
                v-model="form.street"
                placeholder="Enter your street"
                class="modern-input"
                clearable
              />
            </el-form-item>

            <el-form-item class="form-field" prop="city">
              <label class="field-label">City</label>
              <el-input
                v-model="form.city"
                placeholder="Enter your city"
                class="modern-input"
                clearable
              />
            </el-form-item>

            <el-form-item class="form-field" prop="country">
              <label class="field-label">Country</label>
              <el-input
                v-model="form.country"
                placeholder="Enter your country"
                class="modern-input"
                clearable
              />
            </el-form-item>

            <el-form-item class="form-field" prop="postalCode">
              <label class="field-label">Postal Code</label>
              <el-input
                v-model="form.postalCode"
                placeholder="ex. 1234"
                class="modern-input"
                maxlength="4"
                clearable
              />
            </el-form-item>
          </div>

          <el-button
            :disabled="!isFormValid"
            type="primary"
            class="submit-button"
            size="large"
            native-type="submit"
            >Submit</el-button
          >
        </el-form>
      </div>
    </el-dialog>
  </section>
</template>

<style lang="css" scoped>
.two-column-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  align-items: start;
  flex-wrap: wrap;
}

.form-left,
.form-right {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.submit-button {
  grid-column: span 2;
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
  padding: 32px 24px 24px;
}

.form-title {
  font-size: 22px;
  font-weight: 600;
  color: #000;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
  text-align: center;
}

.modern-form {
  width: 100%;
}

.form-field {
  margin-bottom: 16px;
}

.modern-input .el-input__wrapper {
  border-radius: 8px;
  border: 1.5px solid #e5e5e5;
  padding: 10px 14px;
  font-size: 14px;
  transition: all 0.2s ease;
  box-shadow: none;
}

.modern-input .el-input__wrapper:hover {
  border-color: #000;
}

.modern-input .el-input__wrapper.is-focus {
  border-color: #000;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.05);
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

.field-label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #000;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
}

.submit-button {
  width: 100%;
  height: 44px;
  border-radius: 8px;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  transition: all 0.2s ease;
  margin-top: 16px;
}

.submit-button:hover:not(.is-disabled) {
  background-color: #00beee;
  transform: translateY(-1px);
}

.submit-button:active:not(.is-disabled) {
  transform: translateY(0);
}

.submit-button.is-disabled {
  background-color: #f5f5f5;
  color: #999;
  cursor: not-allowed;
}

@media (max-width: 480px) {
  .form-container {
    padding: 24px 16px 16px;
  }

  .form-title {
    font-size: 18px;
    margin-bottom: 16px;
  }

  .submit-button {
    height: 42px;
    font-size: 13px;
  }

  .two-column-form {
    grid-template-columns: 1fr;
  }

  .submit-button {
    grid-column: span 1;
  }
}
</style>
