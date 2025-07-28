<template>
  <div class="search-wrapper">
     <div class="search-bar-form">
      <search-bar />
    </div>
    <h2>Search Results for "{{ searchItem }}"</h2>
   
    <div v-if="searchResult?.length" class="search-grid">
      <product-card
        v-for="item in searchResult"
        :key="item.id"
        :id="item.id"
        :price="item.price"
        :image="item.image"
        :description="item.description"
        :link="item.link"
        :value="item.value"
        :label="item.label"
      >
        {{ item.label }}
      </product-card>
    </div>

    <el-empty v-else description="No products found." />
  </div>
</template>



<script setup lang="ts">
import { ref, watch, onMounted } from "vue"
import { useRoute } from 'vue-router'
import { useProducts } from "@/stores/products"
import type { Products } from "@/types"
import { ProductCard, SearchBar } from "@/components"

const route = useRoute()
const store = useProducts()
const searchItem = ref<string>(route.params.item as string || "")
const searchResult = ref<Products[] | null>([])

// Load results based on current search text
const loadSearchItem = () => {  
  searchResult.value = store.getSearchItem(searchItem.value)
  console.log("search item", searchItem.value)
}

// Watch for route changes and reload search
watch(
  () => route.params.item,
  (newSearch) => {
    searchItem.value = newSearch as string
    loadSearchItem()
  }
)

// Initial load on mount
onMounted(() => {
  loadSearchItem()
  console.log(searchResult.value)
})
</script>


<style scoped>
.search-wrapper {
   max-width: 1400px;
   margin: 2rem auto;
   height: 100%;
   min-height: 80vh;
}

.search-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.search-bar-form{
  width: 100%;
  margin-bottom: 20px;
}

@media (min-width: 750px) {
  .search-bar-form{
    display: none;
  }
}


@media (max-width: 1024px) {
  .search-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .search-grid {
    grid-template-columns: 1fr;
  }
}

@media(min-width: 1400px){
  .search-wrapper{
    padding: 0px;
  }
}

@media(min-width: 300px){
  .search-wrapper{
    padding: 20px;
  }
}

</style>