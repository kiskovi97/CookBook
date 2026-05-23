<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores/useRecipeStore'
import type { Recipe } from '@/types/recipe'
import RecipeBig from '@/components/RecipeBig.vue'
import { useHead } from '@vueuse/head'

const route = useRoute()
const { getRecipeById } = useRecipeStore()
const recipe = computed<Recipe | undefined>(() => {
  if (!route.params.id) return undefined
  return getRecipeById(route.params.id.toString())
})

useHead(() => {
  if (!recipe.value) return { title: 'Recipe not found' }

  return {
    title: recipe.value.title,
    meta: [
      { name: 'description', content: recipe.value.details },

      // Open Graph (for Facebook, Discord, etc.)
      { property: 'og:title', content: recipe.value.title },
      { property: 'og:description', content: recipe.value.details },
      { property: 'og:image', content: recipe.value.image },

      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: recipe.value.title },
      { name: 'twitter:description', content: recipe.value.details },
      { name: 'twitter:image', content: recipe.value.image },
    ],
  }
})
</script>

<template>
  <Navbar search />
  <div class="page">
    <RecipeBig v-if="recipe" :proj="recipe" />
  </div>
</template>
