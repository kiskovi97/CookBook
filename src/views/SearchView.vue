<script setup lang="ts">
  import Navbar from '@/components/NavBar.vue'
  import RecepieList from '@/components/RecepieList.vue';
  import SearchBar from '@/components/SearchBar.vue';
  import { ref } from 'vue';
  import { onMounted } from 'vue';

  const filter  = ref('');
  const orderBy = ref('name');
  onMounted(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
      filter.value = decodeURIComponent(searchParam);
    }
  });
</script>

<template>
  <Navbar />
  <div class="page">
    <SearchBar v-model:filter="filter" v-model:orderBy="orderBy" />
    <RecepieList :orderBy="orderBy" :filter="filter" />
  </div>
</template>
