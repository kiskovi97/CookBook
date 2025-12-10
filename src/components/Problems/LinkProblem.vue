<template>
  <div>
    <input v-model="link" type="text" placeholder="Enter link here" />
    <button @click="onClick">Add Link</button>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/recipe'
import { ref } from 'vue'

const props = defineProps<{
  recipe: Recipe
}>()

const link = ref('')

const onClick = () => {
  const recipe = props.recipe
  if (!recipe) {
    return
  }
  if (link.value) {
    if (!recipe.sources) {
      recipe.sources = []
    }
    recipe.sources.push({ name: 'Added Link', link: link.value })
    alert('Link added!')
  }
}
</script>

<style scoped></style>
