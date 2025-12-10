<template>
  <div class="section">
    <button @click="handleClick" class="button">Add new Recipe</button>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/recipe'

const emit = defineEmits<{
  (e: 'clickedAndChanged', recipe: Recipe): void
}>()

const handleClick = () => {
  const newRecipe: Recipe = {
    id: '',
    CreationDate: new Date().toISOString(),
    CreationDatePK: 'dish',
    title: 'New Recipe',
    ingredients: [{ title: 'Ingredients', list: [] }],
    instructions: [],
    image: '',
    tags: [],
    details: '',
    sources: [],
  }
  emit('clickedAndChanged', newRecipe)
}
</script>

<style scoped>
@import url('@/styles/Input.css');
</style>
