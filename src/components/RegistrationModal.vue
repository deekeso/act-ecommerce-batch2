<template>
  <div class="app-registration">
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      @close="handleClose"
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
                <el-select
                  @change="handleRegionChange"
                  v-model="registrationForm.address.region"
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

              <el-form-item label="Province" prop="province">
                <el-select
                  @change="handleProvinceChange"
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
                  @change="handleCityChange"
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
            </el-form>
          </div>

          <el-button @click="handleRegister" :loading="isLoading" class="submit-button">
            REGISTER
          </el-button>

          <div class="form-footer">
            <p>Already have an account? <a href="#" @click.prevent="switchToLogin">Login</a></p>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default {}
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
