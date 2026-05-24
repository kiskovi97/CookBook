<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RecepieEdit from '@/components/RecipeEdit.vue'
import { useRecipeStore } from '@/stores/useRecipeStore'

const route = useRoute()

const { getRecipeById } = useRecipeStore()
const recipe = computed(() => {
  if (!route.params.id) return undefined
  return getRecipeById(route.params.id.toString())
})
</script>

<template>
  <Navbar search />
  <div class="page">
    <RecepieEdit v-if="recipe" :recipe="recipe" />
  </div>
</template>
