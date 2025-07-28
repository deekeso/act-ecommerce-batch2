<template>
  <div class="pill">
    <router-link :to="`/category/${props.name}`" class="pill-box">{{ props.name }}</router-link>
  </div>
</template>

<script lang="ts" setup>
interface PillProps {
  name: string
  subcategory?: string
}

const props = defineProps<PillProps>()
</script>

<style scoped>
.pill a{
  text-decoration: none;
}
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
