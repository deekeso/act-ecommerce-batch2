<template>
  <div class="not-found">
    <el-result
      title="Uh-Oh!"
      sub-title="The page you are looking for is not found. How about a treat?"
    >
      <template #icon>
        <el-image src="https://giphy.com/embed/JrH3p5ZyUHEV6iyvR4" />
      </template>
      <template #extra>
        <router-link to="/products">
          <el-button round type="primary">Browse Products</el-button>
        </router-link>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.not-found {
  margin: 50px;
}
</style>
