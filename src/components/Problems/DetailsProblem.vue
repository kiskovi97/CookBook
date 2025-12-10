<template>
  <div>
    <RouterLink :to="'/recipe/' + recipe.id + '/edit'">Missing Details </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/recipe'

defineProps<{
  recipe: Recipe
}>()
</script>

<style scoped></style>
