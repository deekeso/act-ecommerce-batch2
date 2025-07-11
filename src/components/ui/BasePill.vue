<template>
  <div class="pill">
    <div class="pill-box">{{ category.name }}</div>
  </div>
</template>

<script lang="ts" setup>
interface PillProps {
  name: string
  subcategory?: string
}

const category = defineProps<PillProps>()
</script>

<style scoped>
.pill {
  display: flex;
  justify-content: center;
}

.pill-box {
  padding: 10px 20px;
  background-color: #000;
  color: white;
  border-radius: 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

/* Hover effect */
.pill-box:hover {
  background-color: #ffcc00;
  color: #000;
  transform: scale(1.05);
}
</style>
