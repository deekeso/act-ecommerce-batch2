<template>
  <el-form class="form" @submit.prevent="handleSearch">
    <el-autocomplete
      v-model="searchInput"
      :fetch-suggestions="querySearch"
      :trigger-on-focus="false"
      clearable
      class="inline-input w-50"
      placeholder="Search"
      @select="handleSelect"
      popper-class="custom-autocomplete"
    >
      <template #default="{ item }">
        <div class="autocomplete-item">
          <img :src="item.image" alt="product" class="product-img" />
          <span>{{ item.label }}</span>
        </div>
      </template>
    </el-autocomplete>
    <el-button :icon="Search" native-type="submit" />
  </el-form>
</template>

<script lang="ts" setup>
import { ElAutocomplete, ElButton } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import type { AutocompleteFetchSuggestionsCallback } from 'element-plus'
import { ref } from 'vue'
import { products as productItems } from '@/models'
import type { Products } from '@/types'
import { useRouter } from 'vue-router'

const searchInput = ref('')
const router = useRouter()

const products = ref<Products[]>(productItems)

const querySearch = (queryString: string, cb: AutocompleteFetchSuggestionsCallback) => {
  const results = queryString ? products.value.filter(createFilter(queryString)) : products.value
  // call callback function to return suggestions
  cb(results)
}

const createFilter = (queryString: string) => {
  return (product: Products) => {
    return product.label.toLowerCase().includes(queryString.toLowerCase())
  }
}

const handleSelect = (item: Record<string, any>) => {
  if (item.link) {
    router.push(item.link)
  }
}

const handleSearch = () => {
  if (!searchInput.value) {
    return
  }
  router.push(`/search/${searchInput.value}`)
}
</script>

<style scoped>
:deep(.el-input) {
  height: 50px;
  --el-input-focus-border-color: var(--primary-black);
  --el-input-border-color: #000;
}

/* show image on search input */
.autocomplete-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 5px 10px;
}

.product-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 4px;
}
.el-button {
  height: 50px;
  background-color: var(--primary-black);
  color: white;
  --el-button-hover-bg-color: var(--primary-black);
  --el-button-focus-border-color: var(--primary-black);
  --el-button-active-border-color: #666666;
}
.form {
  display: flex;
  justify-content: start;
}
</style>
