<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="Forgot Password"
      width="50%"
      :close-on-click-modal="false"
      @close="handleClose"
    >
      <div class="forgot-password-form">
        <!-- Step 1: Enter email -->
        <el-form
          v-if="currentStep === 1"
          :model="formData"
          ref="emailForm"
          :rules="emailRules"
          label-position="top"
        >
          <el-form-item prop="email">
            <el-input
              v-model="formData.email"
              placeholder="Enter your email"
              :prefix-icon="Message"
              :disabled="isChecking"
              type="email"
            />
          </el-form-item>

          <!-- Continue button -->
          <el-form-item>
            <el-button
              native-type="submit"
              @click="checkEmail"
              class="submit-button"
              :loading="isChecking"
              :disabled="!formData.email || isChecking"
            >
              CONTINUE
            </el-button>
          </el-form-item>
        </el-form>

        <!-- Step 2: Enter New Password -->
        <el-form
          v-if="currentStep === 2"
          :model="formData"
          ref="passwordForm"
          :rules="passwordRules"
        >
          <!-- New Password -->
          <el-form-item prop="newPassword">
            <el-input
              v-model="formData.newPassword"
              placeholder="Enter new password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <!-- Confirm password -->
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="formData.confirmPassword"
              placeholder="Repeat new password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <!-- Reset Password Button -->
          <el-form-item>
            <el-button
              type="primary"
              @click="handleResetPassword"
              class="submit-button"
              size="large"
              :loading="isLoading"
              :disabled="!isFormValid"
            >
              RESET PASSWORD
            </el-button>
          </el-form-item>

          <div class="back-link">
            <a href="#" @click.prevent="currentStep = 1">Back to email entry</a>
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
.forgot-password-form {
  padding: 10px;
}

.submit-button {
  width: 100%;
}

.back-link {
  text-align: right;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.back-link a {
  color: var(--teal);
  text-decoration: none;
  transition: color 0.2s;
}

.back-link a:hover {
  color: var(--mint);
  text-decoration: underline;
}
</style>
