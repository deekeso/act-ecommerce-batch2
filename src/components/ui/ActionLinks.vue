<template>
  <div class="container">
    <ul class="action-link">
      <li>FEEDBACK</li>
      <li>SAVE MORE ON APP</li>
      <li>SELL ON SHOP-PLUS</li>
      <li>CUSTOMER CARE</li>
      <li>TRACK MY ORDER</li>
    </ul>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  background-color: #000000;
  color: white;
}
.action-link {
  display: flex;
  padding: 4px;
  justify-content: end;
  width: 1440px;
}

.action-link > * {
  margin-left: 20px;
}

.action-link li {
  text-decoration: none;
  list-style-type: none;
  font-size: 12px;
}
</style>
