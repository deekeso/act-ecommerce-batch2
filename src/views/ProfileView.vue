<template>
  <div class="profile-view">
    <h3 class="profile-header">My Profile</h3>

    <el-row v-if="userStore.user" class="profile-actions" justify="space-between">
      <el-col :span="6">
        <h4>Account</h4>
      </el-col>

      <el-col :span="6">
        <el-button @click="startEditing" v-if="!isEditing" class="action-btn" :icon="Edit">
          Edit
        </el-button>
      </el-col>
    </el-row>

    <el-row v-if="userStore.user" class="profile-info">
      <div v-if="!isEditing" class="profile-info-display">
        <el-form :model="profileForm" label-position="top">
          <el-form-item label="Full Name">
            <el-input v-model="profileForm.name" readonly />
          </el-form-item>

          <el-form-item label="Email">
            <el-input v-model="profileForm.email" disabled />
          </el-form-item>

          <el-divider />

          <h4>Address</h4>

          <el-form-item label="Region">
            <el-input v-model="profileForm.address.region" readonly />
          </el-form-item>

          <el-form-item label="Province">
            <el-input v-model="profileForm.address.province" readonly />
          </el-form-item>

          <el-form-item label="City/Municipality">
            <el-input v-model="profileForm.address.city" readonly />
          </el-form-item>

          <el-form-item label="Barangay">
            <el-input v-model="profileForm.address.barangay" readonly />
          </el-form-item>

          <el-form-item label="Street Address">
            <el-input v-model="profileForm.address.street" readonly />
          </el-form-item>
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
            <el-select
              @change="handleRegionChange"
              v-model="profileForm.address.region"
              placeholder="Select Region"
            >
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
              @change="handleProvinceChange"
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
              @change="handleCityChange"
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
            <el-button @click="cancelEditing">Cancel</el-button>
            <el-button class="action-btn" @click="saveProfile" :loading="isSaving"
              >Save Changes</el-button
            >
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
<script lang="ts">
export default {}
</script>
<style scoped></style>
