<template>
  <div class="app-login">
    <el-dialog
      v-model="dialogVisible"
      :close-on-click-modal="false"
      width="50%"
      @close="handleClose"
    >
      <div class="login-form">
        <el-form :model="loginForm">
          <el-form-item>
            <el-input
              v-model="loginForm.email"
              placeholder="Enter your email"
              :prefix-icon="Message"
              type="email"
            />
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="loginForm.password"
              placeholder="Enter your password"
              :prefix-icon="Lock"
              type="password"
              show-password
            />
          </el-form-item>

          <el-form-item>
            <el-button
              native-type="submit"
              @click="handleLogin"
              :loading="isLoading"
              class="submit-button"
            >
              LOGIN
            </el-button>
          </el-form-item>

          <div class="forgot-password">
            <a href="#" @click.prevent="switchToForgotPassword">Forgot password?</a>
          </div>

          <div class="form-footer">
            <p>
              Don't have an account? <a href="#" @click.prevent="switchToRegister">Register now</a>
            </p>
          </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Message, Lock } from '@element-plus/icons-vue'

export default {}
</script>

<style scoped>
.login-form {
  padding: 10px;
}

.forgot-password {
  text-align: right;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.a {
  color: var(--teal);
  text-decoration: none;
  transition: color 0.2s;
}

.a:hover {
  color: var(--mint);
  text-decoration: underline;
}

.form-footer {
  text-align: center;
  margin-top: 1rem;
  font-size: 0.875rem;
}

.submit-button {
  width: 100%;
  color: var(--teal);
}
</style>
