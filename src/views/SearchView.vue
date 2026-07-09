<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import RecipeList from '@/components/RecipeList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { useSearchStore } from '@/stores/useSearchStore'
import type { RecipeMainType } from '@/types/recipe'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const { filter, orderBy, mainTypeSelection } = storeToRefs(useSearchStore())

onMounted(() => {
  const urlParams = new URLSearchParams(globalThis.location.search)
  const searchParam = urlParams.get('search')
  if (searchParam) {
    filter.value = decodeURIComponent(searchParam)
  }
  const mainTypeParam = urlParams.get('mainType')
  if (mainTypeParam) {
    mainTypeSelection.value = mainTypeParam as RecipeMainType
  }
})
</script>

<template>
  <Navbar />
  <div class="page">
    <SearchBar
      v-model:filter="filter"
      v-model:orderBy="orderBy"
      v-model:mainTypeSelection="mainTypeSelection"
    />
    <RecipeList :orderBy="orderBy" :filter="filter" :tag="mainTypeSelection" />
  </div>
</template>
