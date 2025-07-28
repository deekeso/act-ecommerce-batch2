<template>
  <div class="container">
    <h1>NOT FOUND</h1>
    <router-link to="/">GO BACK HOME &rarr;</router-link>
  </div>
</template>

<script lang="ts" setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 80vh;
}

a {
  color: black;
}

h1 {
  font-size: 7rem;
}
</style>
