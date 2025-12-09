<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'
import { fetchDataById } from '@/lib/dynamoService';
import type { Recipe } from '@/types/recipe';
import RecepieBig from '@/components/RecepieBig.vue';

const route = useRoute()
const recepie = ref<Recipe | undefined>(undefined);

onMounted(async () => {
  if (!route.params.id) return;

  recepie.value = (await fetchDataById(route.params.id.toString())).data
})
</script>

<template>
  <Navbar search/>
  <div class="page">
    <RecepieBig v-if="recepie" :proj="recepie"/>
  </div>
</template>
