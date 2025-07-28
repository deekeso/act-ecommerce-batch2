<template>
  <div class="billing-header">
    <h1>Shipping Address</h1>
    <el-button
      v-if="addressStore.getAllAddress.length === 0"
      class="top-right"
      color="black"
      style="padding: 20px"
      @click="isModalOpen = true"
    >
      <el-icon size="20px">
        <MapLocation />
      </el-icon>
      <span>Add Address</span>
    </el-button>
  </div>
  <el-dialog v-model="isModalOpen">
    <address-form @on-save="handleSubmit" />
  </el-dialog>
  <div v-if="addressStore.getAllAddress.length >= 1">
    <address-card
      v-for="billing in addressStore.getAllAddress"
      :key="billing.id"
      :id="billing.id"
      :email="billing.email"
      :address="billing.address"
      :contact="billing.contact"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { AddressForm, AddressCard } from '@/components'
import type { AddressRuleForm } from '@/types'
import { useAddress } from '@/stores/address'

const addressStore = useAddress()
const isModalOpen = ref(false)
function handleSubmit(formData: AddressRuleForm) {
  addressStore.handleAddBillingAddress(formData)
  isModalOpen.value = false
}
</script>

<style></style>
