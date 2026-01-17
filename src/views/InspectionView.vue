<template>
  <Navbar search />
  <div :style="{ maxWidth: '50em', margin: '2em auto', padding: '2em' }">
    <h1>Recipe Inspection:</h1>
    <ul>
      <RecipeInspection v-for="(recipe, idx) in recepies" :key="idx" :recipe="recipe" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import type { Recipe } from '@/types/recipe'
import { onMounted, ref } from 'vue'
import RecipeInspection from '@/components/RecipeInspection.vue'
import { fetchRecepieData } from '@/lib/dynamoService'

const recepies = ref<Recipe[]>([])

onMounted(async () => {
  const data = await fetchRecepieData()
  if (data.success && data.data) recepies.value = data.data
})
</script>
