<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import WineList from '@/components/WineList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { ref, onMounted } from 'vue'
import { useWineStore } from '@/stores/useWineStore'

const filter = ref('')
const orderBy = ref('name')
onMounted(() => {
  const urlParams = new URLSearchParams(globalThis.location.search)
  const searchParam = urlParams.get('search')
  if (searchParam) {
    filter.value = decodeURIComponent(searchParam)
  }
})

const { wines } = useWineStore()
</script>

<template>
  <Navbar />
  <div class="page">
    <SearchBar v-model:filter="filter" v-model:orderBy="orderBy" />
    <WineList :data="wines" :orderBy="orderBy" :filter="filter" tag="main" />
  </div>
</template>
