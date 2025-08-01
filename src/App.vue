<template>
  <div class="app">
    <AppHeader />

    <main class="main-content">
      <div class="main-container">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </main>
    <AppFooter />

    <!-- Modals -->
    <LoginModal
      :visible="userStore.showLoginModal"
      @update:visible="handleLoginModalClose"
      @switch-to-register="switchToRegister"
    />
    <RegisterModal :visible="userStore.isRegistering" @update:visible="handleRegisterModalClose" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import LoginModal from '@/components/LoginModal.vue'
import RegisterModal from '@/components/RegistrationModal.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

const handleLoginModalClose = (value: boolean) => {
  if (!value) {
    userStore.closeLoginModal()
  }
}

const handleRegisterModalClose = (value: boolean) => {
  if (!value) {
    userStore.isRegistering = false
  }
}

const switchToRegister = () => {
  userStore.closeLoginModal()
  userStore.startRegistration()
}
</script>

<style>
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.main-container {
  background-color: white;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  flex: 1;
}

/* Transition effects */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
