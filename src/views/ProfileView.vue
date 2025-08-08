<template>
  <profile-layout>
    <template #default>
      <section v-if="visible">
        <profile-form
          :firstname="currentUser?.firstname ?? ''"
          :lastname="currentUser?.lastname ?? ''"
          :email="currentUser?.email ?? ''"
          :contact="currentUser?.contact ?? ''"
          :address="currentUser?.address ?? ''"
          :cancel-button-active="true"
          :submit-button-active="true"
          @on-submit="handleProfileSubmit"
          @on-cancel="handleCancel"
        >
          <template #header>
            <h1 style="margin-bottom: 20px">Update Information</h1>
          </template>
        </profile-form>
      </section>

      <section v-else>
        <el-card shadow="never">
          <template #header>
            <h1>Personal Information</h1>
            <el-button color="black" size="large" @click="visible = true">
              <el-icon><Edit /></el-icon>
              <span class="lg"> Edit Profile </span>
            </el-button>
          </template>
          <div class="flex">
            <div class="profile-label">
              <h4>First Name</h4>
              <p>{{ currentUser?.firstname }}</p>
            </div>
            <div class="profile-label">
              <h4>Last Name</h4>
              <p>{{ currentUser?.lastname }}</p>
            </div>
          </div>
          <div class="flex">
            <div class="profile-label">
              <h4>Email</h4>
              <p>{{ currentUser?.email }}</p>
            </div>
            <div class="profile-label">
              <h4>Contact</h4>
              <p>{{ currentUser?.contact }}</p>
            </div>
          </div>
          <div class="flex">
            <div class="profile-label">
              <h4>Address</h4>
              <p>{{ currentUser?.address }}</p>
            </div>
          </div>
        </el-card>
      </section>
    </template>
  </profile-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '@/stores/auth'
import ProfileLayout from '@/layouts/ProfileLayout.vue'
import { ProfileForm } from '@/components'
import type { User } from '@/types'

const authStore = useAuth()
const visible = ref(authStore.user?.firstname ? false : true)
const currentUser = ref(authStore.user)

function handleProfileSubmit(formData: Partial<User>) {
  authStore.setProfile(formData)
  visible.value = false
}

function handleCancel() {
  visible.value = false
}
</script>

<style scoped>
.flex {
  display: flex;
  width: 100%;
  gap: 12px;
  margin-bottom: 2rem;
}

.profile-label {
  width: 50%;
}

:deep(.el-card__header) {
  display: flex;
  justify-content: space-between;
}

.el-input {
  height: 50px;
}

@media (max-width: 768px) {
  .flex {
    flex-direction: column;
  }
  .lg {
    display: none;
  }
}
</style>
