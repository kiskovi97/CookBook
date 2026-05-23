<template>
  <Navbar search />
  <div :style="{ maxWidth: '50em', margin: '2em auto', padding: '2em' }">
    <h1>Recipe Inspection:</h1>
    <ul>
      <RecipeInspection v-for="(recipe, idx) in recipes" :key="idx" :recipe="recipe" />
    </ul>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import RecipeInspection from '@/components/RecipeInspection.vue'
import { useRecipeStore } from '@/stores/useRecipeStore'

const { recipes } = useRecipeStore()
</script>
