<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import WineList from '@/components/WineList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { fetchWineData } from '@/lib/dynamoService'
import type { Wine } from '@/types/recipe'
import { ref } from 'vue'
import { onMounted } from 'vue'

const filter = ref('')
const orderBy = ref('name')
onMounted(() => {
  const urlParams = new URLSearchParams(window.location.search)
  const searchParam = urlParams.get('search')
  if (searchParam) {
    filter.value = decodeURIComponent(searchParam)
  }
})

const wines = ref<Wine[]>([])

onMounted(async () => {
  const data = await fetchWineData()
  if (data.success && data.data) wines.value = data.data
})
</script>

<template>
  <Navbar />
  <div class="page">
    <SearchBar v-model:filter="filter" v-model:orderBy="orderBy" />
    <WineList :data="wines" :orderBy="orderBy" :filter="filter" tag="main" />
  </div>
</template>
