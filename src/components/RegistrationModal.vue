<template>
  <div class="app-registration">
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      @close="handleClose"
      title="Register"
    >
      <div class="register-form">
        <h3>Account</h3>

        <el-form :model="registrationForm" label-position="top">
          <el-form-item label="Full Name">
            <el-input
              v-model="registrationForm.name"
              placeholder="Enter your full name"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item label="Email">
            <el-input
              v-model="registrationForm.email"
              placeholder="Enter your email"
              :prefix-icon="Message"
              type="email"
            />
          </el-form-item>

          <el-form-item label="Password">
            <el-input
              v-model="registrationForm.password"
              placeholder="Create a password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <el-divider />

          <h3>Address</h3>

          <div class="address-selector">
            <el-form label-position="top">
              <el-form-item label="Region" prop="region">
                <el-select v-model="registrationForm.address.region" placeholder="Select Region">
                  <el-option
                    v-for="region in regionsList"
                    :key="region.region_code"
                    :label="region.region_name"
                    :value="region.region_code"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Province" prop="province">
                <el-select
                  v-model="registrationForm.address.province"
                  placeholder="Select Province"
                  :disabled="!registrationForm.address.region"
                >
                  <el-option
                    v-for="province in provincesList"
                    :key="province.province_code"
                    :label="province.province_name"
                    :value="province.province_code"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="City/Municipality" prop="city">
                <el-select
                  v-model="registrationForm.address.city"
                  placeholder="Select City/Municipality"
                  :disabled="!registrationForm.address.province"
                >
                  <el-option
                    v-for="city in citiesList"
                    :key="city.city_code"
                    :label="city.city_name"
                    :value="city.city_code"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Barangay" prop="barangay">
                <el-select
                  v-model="registrationForm.address.barangay"
                  placeholder="Select Barangay"
                  :disabled="!registrationForm.address.city"
                >
                  <el-option
                    v-for="barangay in barangaysList"
                    :key="barangay.brgy_code"
                    :label="barangay.brgy_name"
                    :value="barangay.brgy_code"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="Street Address">
                <el-input
                  v-model="registrationForm.address.street"
                  placeholder="House/Unit Number, Building, Street Name"
                  type="textarea"
                  :rows="2"
                />
              </el-form-item>

              <el-form-item>
                <el-button
                  type="primary"
                  round
                  @click="handleRegister"
                  :loading="isLoading"
                  class="submit-button"
                >
                  REGISTER
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="form-footer">
            <p>Already have an account? <a href="#" @click.prevent="switchToLogin">Login</a></p>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Message, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useAddress } from '../composables/useAddress'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:visible', 'switch-to-login', 'register-success'])

const userStore = useUserStore()
const { addressForm, regionsList, provincesList, citiesList, barangaysList, resetAddress } =
  useAddress()
const isLoading = ref(false)
const dialogVisible = ref(props.visible)

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

// Registration form
const registrationForm = reactive({
  name: '',
  email: '',
  password: '',

  address: addressForm,
})

const handleRegister = async () => {
  // Validate form
  if (!registrationForm.name || !registrationForm.email || !registrationForm.password) {
    ElMessage.error('Please fill in all required fields')
    return
  }

  // Validate email format
  const emailPattern =
    /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/
  if (!emailPattern.test(registrationForm.email)) {
    ElMessage.error('Please enter a valid email address')
    return
  }

  if (
    !registrationForm.address.region ||
    !registrationForm.address.province ||
    !registrationForm.address.city ||
    !registrationForm.address.barangay ||
    !registrationForm.address.street
  ) {
    ElMessage.error('Please complete your address information')
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create user object with display names
    const user = {
      name: registrationForm.name,
      email: registrationForm.email,

      address: {
        region: registrationForm.address.region,
        province: registrationForm.address.province,
        city: registrationForm.address.city,
        barangay: registrationForm.address.barangay,
        street: registrationForm.address.street,
      },
    }

    // Register user
    await userStore.register(user, registrationForm.password)

    ElMessage.success('Registration successful!')
    emit('register-success')
    handleClose()
  } catch (error) {
    ElMessage.error('An error occurred during registration')
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

const switchToLogin = () => {
  emit('switch-to-login')
}

const handleClose = () => {
  // Reset form
  registrationForm.name = ''
  registrationForm.email = ''
  registrationForm.password = ''

  resetAddress()

  dialogVisible.value = false
}
</script>

<style scoped>
.register-form {
  padding: 10px;
}

.h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 20px;
  font-family: var(--font-header);
}

.form-footer {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.form-footer a {
  color: var(--teal);
  text-decoration: none;
  transition: color 0.2s;
}

.form-footer a:hover {
  color: var(--mint);
  text-decoration: underline;
}

.submit-button {
  width: 100%;
}
</style>
