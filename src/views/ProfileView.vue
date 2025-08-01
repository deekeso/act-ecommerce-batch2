<template>
  <div class="profile-view">
    <h1 class="profile-header">My Profile</h1>

    <el-row
      v-if="userStore.user || userStore.isLoggedIn"
      class="profile-actions"
      justify="space-between"
    >
      <el-col :span="22">
        <h4>Account</h4>
      </el-col>

      <el-col :span="2">
        <el-button @click="startEditing" v-if="!isEditing" type="primary" round :icon="Edit">
          Edit
        </el-button>
      </el-col>
    </el-row>

    <el-row v-if="userStore.user" class="profile-info">
      <div v-if="!isEditing" class="profile-info-display">
        <el-form :model="profileForm" label-position="top">
          <el-form-item label="Full Name">
            <el-input v-model="userStore.user.name" readonly />
          </el-form-item>

          <el-form-item label="Email">
            <el-input v-model="userStore.user.email" disabled />
          </el-form-item>

          <el-divider />

          <h4>Address</h4>

          <div class="info-value">{{ formattedAddress || 'Formatting address...' }}</div>
        </el-form>
      </div>

      <!-- Editing -->
      <div v-else class="profile-edit-form">
        <el-form :model="profileForm" label-position="top">
          <el-form-item label="Full Name">
            <el-input v-model="profileForm.name" placeholder="Enter your full name" />
          </el-form-item>

          <el-form-item label="Email">
            <el-input v-model="profileForm.email" disabled />
          </el-form-item>

          <el-divider />

          <h4>Address</h4>

          <el-form-item label="Region">
            <el-select v-model="profileForm.address.region" placeholder="Select Region">
              <el-option
                v-for="region in regionsList"
                :key="region.region_code"
                :label="region.region_name"
                :value="region.region_code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Province">
            <el-select
              v-model="profileForm.address.province"
              placeholder="Select Province"
              :disabled="!profileForm.address.region"
            >
              <el-option
                v-for="province in provincesList"
                :key="province.province_code"
                :label="province.province_name"
                :value="province.province_code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="City/Municipality">
            <el-select
              v-model="profileForm.address.city"
              placeholder="Select City/Municipality"
              :disabled="!profileForm.address.province"
            >
              <el-option
                v-for="city in citiesList"
                :key="city.city_code"
                :label="city.city_name"
                :value="city.city_code"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="Barangay">
            <el-select
              v-model="profileForm.address.barangay"
              placeholder="Select Barangay"
              :disabled="!profileForm.address.city"
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
            <el-input v-model="profileForm.address.street" />
          </el-form-item>

          <el-divider />

          <div class="form-actions">
            <el-button round @click="cancelEditing">Cancel</el-button>
            <el-button round type="primary" @click="saveProfile" :loading="isSaving">
              Save Changes
            </el-button>
          </div>
        </el-form>
      </div>
    </el-row>

    <el-empty
      v-if="!userStore.user || !userStore.isLoggedIn"
      description="Please login to view your profile"
    >
    </el-empty>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'
import { useAddress } from '@/composables/useAddress'
import { getFullAddressString } from '@/utils/address'

const userStore = useUserStore()
const { addressForm, regionsList, provincesList, citiesList, barangaysList, setAddress } =
  useAddress()

// State for profile editing
const isEditing = ref(false)
const isSaving = ref(false)

// Form data
const profileForm = reactive({
  name: '',
  email: '',
  address: addressForm,
})

// Formatted address display
const formattedAddress = ref('')

watch(
  () => userStore.user?.address,
  async (newAddress) => {
    if (newAddress) {
      formattedAddress.value = await getFullAddressString(newAddress)
    }
  },
  { immediate: true, deep: true },
)

// Start editing profile
const startEditing = () => {
  if (userStore.user) {
    // Initialize form with current user data
    profileForm.name = userStore.user.name
    profileForm.email = userStore.user.email

    setAddress(userStore.user.address)

    isEditing.value = true
  }
}

// Cancel editing
const cancelEditing = () => {
  isEditing.value = false
}

// Save profile changes
const saveProfile = async () => {
  if (!profileForm.name.trim()) {
    ElMessage.error('Name is required')
    return
  }

  isSaving.value = true

  try {
    // In a real app, this would make an API call to update the user profile
    // For demo purposes, just update the user in the store
    if (userStore.user) {
      userStore.user.name = profileForm.name
      userStore.user.address = { ...profileForm.address }

      // Save to localStorage
      localStorage.setItem('user', JSON.stringify(userStore.user))

      ElMessage.success('Profile updated successfully')
      isEditing.value = false
    }
  } catch (error) {
    ElMessage.error('Failed to update profile')
    console.error(error)
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.profile-view {
  padding: 50px;
}

.profile-view h4 {
  color: var(--chocolate);
}

.profile-header {
  font-family: var(--font-header);
  margin-bottom: 10px;
}

.info-value {
  font-size: 0.875rem;
  color: var(--gray);
}

.profile-info-display {
  width: 100%;
}

.profile-edit-form {
  width: 100%;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
}
</style>
