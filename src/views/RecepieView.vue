<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchRecepieDataById } from '@/lib/dynamoService'
import type { Recipe } from '@/types/recipe'
import RecepieBig from '@/components/RecipeBig.vue'
import { useHead } from '@vueuse/head'

const route = useRoute()
const recipe = ref<Recipe | undefined>(undefined)

onMounted(async () => {
  if (!route.params.id) return

  recipe.value = (await fetchRecepieDataById(route.params.id.toString())).data

  if (!recipe.value) return

  useHead({
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
  })
})
</script>

<template>
  <Navbar search />
  <div class="page">
    <RecepieBig v-if="recipe" :proj="recipe" />
  </div>
</template>
