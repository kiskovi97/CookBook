<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchDataById } from '@/lib/dynamoService'
import type { Recipe } from '@/types/recipe'
import RecepieEdit from '@/components/RecipeEdit.vue'

const route = useRoute()
const recipe = ref<Recipe | undefined>(undefined)

onMounted(async () => {
  if (!route.params.id) return

  recipe.value = (await fetchDataById(route.params.id.toString())).data
})
</script>

<template>
  <Navbar search />
  <div class="page">
    <RecepieEdit v-if="recipe" :recipe="recipe" />
  </div>
</template>
