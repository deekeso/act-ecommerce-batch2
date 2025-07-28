<template>
  <div class="masterCardForm" style="margin-top: 20px">
    <el-form @submit.prevent="">
      <h3>Payment Information</h3>
      <p>Fill up the details to complete the payment</p>
      <el-form-item label="Card Number" label-position="top">
        <el-input type="text" placeholder="Enter your card number" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="Expiry Date" label-position="top">
        <el-input placeholder="MM/YY" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="CVV" label-position="top">
        <el-input placeholder="123" clearable autocomplete="off" />
      </el-form-item>
      <el-form-item label="Card Holder" label-position="top">
        <el-input placeholder="Card Holder Name" clearable autocomplete="off" />
      </el-form-item>
      <el-button color="black" native-type="submit"> Save </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup></script>

<style></style>
