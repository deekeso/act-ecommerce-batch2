<template>
  <Header />
  <router-view></router-view>
  <Footer />
</template>

<script lang="ts" setup>
import { BaseHeader as Header, BaseFooter as Footer } from '@/components'
import { RouterView } from 'vue-router'
</script>
