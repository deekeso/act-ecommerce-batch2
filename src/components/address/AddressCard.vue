<template>
  <el-card shadow="never">
    <p class="xs">
      <el-icon>
        <MapLocation />
      </el-icon>
      {{ props.address }}
    </p>
    <p class="xs">
      <el-icon>
        <Message />
      </el-icon>
      {{ props.email }}
    </p>
    <p class="xs">
      <el-icon>
        <Phone />
      </el-icon>
      {{ props.contact }}
    </p>
    <div class="top-right">
      <el-dropdown>
        <el-icon class="rotate90">
          <MoreFilled />
        </el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :tabindex="-1">
              <el-icon><Edit /></el-icon>
              <span>Edit</span>
            </el-dropdown-item>
            <el-dropdown-item :tabindex="-1" @click="handleRemoveBillingAddress(props.id ?? '')">
              <el-icon><Delete /></el-icon>
              <span>Delte</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { BillingAddress } from '@/types'
import { Edit, Delete, MapLocation, Message, Phone, MoreFilled } from '@element-plus/icons-vue'
import { useAddress } from '@/stores/address'

const props = defineProps<BillingAddress>()

const { handleRemoveBillingAddress } = useAddress()
</script>

<style scoped>
.el-card {
  margin-top: 20px;
  width: 100%;
  padding: 0px;
  position: relative;
  border-radius: 12px;
}

.el-icon.rotate90 {
  transform: rotate(90deg);
}

.top-right {
  position: absolute;
  top: 8px;
  right: 4px;
}

p.xs {
  display: flex;
  align-items: center;
  gap: 8px;
}

.el-dropdown-link {
  cursor: pointer;
  color: var(--primary-black);
  display: flex;
  align-items: center;
}
</style>
