<template>
  <div>
    <div v-if="isLoading">Fixing image...</div>
    <div v-else-if="isFixed">Image fixed!</div>
    <button @click="fixImage" v-else-if="hasAutoFix">Missing or broken image</button>
    <div v-else>Image missing but no automatic fix available</div>
  </div>
</template>

<script setup lang="ts">
import { uploadRecepieData } from '@/lib/dynamoService'
import { extractImage } from '@/lib/fetchRecipe'
import { copyImageToServer } from '@/lib/image-service'
import type { Recipe } from '@/types/recipe'
import { computed, ref } from 'vue'

const isLoading = ref(false)
const isFixed = ref(false)

const hasAutoFix = computed(() => {
  return props.recipe && props.recipe.sources && props.recipe.sources.length > 0
})

const props = defineProps<{
  recipe: Recipe
}>()

const fixImage = async () => {
  const recipe = props.recipe
  if (!recipe || !recipe.sources || recipe.sources.length === 0) {
    return
  }
  const firstLink = recipe.sources[0]
  if (!firstLink || !firstLink.link) {
    return
  }

  isLoading.value = true

  try {
    const newImage = await extractImage(firstLink.link || '')

    if (!newImage) {
      throw new Error('Could not extract image from the provided link.')
    }
    alert('Found image, opening in new tab. Please copy the image URL and update the recipe.')

    recipe.image = await copyImageToServer(newImage)

    await uploadRecepieData(recipe)
    isFixed.value = true
  } catch (e: Error | unknown) {
    alert('Failed to fix image: ' + (e as Error).message)
  }

  isLoading.value = false
}
</script>

<style scoped></style>
