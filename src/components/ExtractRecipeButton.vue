<template>
  <div class="section">
    <textarea placeholder="Paste recipe URL here" v-model="url" class="textarea" />
    <button @click="handleExtractAndUpload" :disabled="isLoading || !url.trim()" class="button">
      {{ isLoading ? 'Extracting...' : 'Extract Recipe' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { extractRecipe } from '@/lib/fetchRecipe'
import { copyImageToServer } from '@/lib/image-service'
import type { Recipe } from '@/types/recipe'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'clickedAndChanged', recipe: Recipe): void
}>()

const url = ref('')
const isLoading = ref(false)

const handleExtractAndUpload = async () => {
  isLoading.value = true
  try {
    console.log('Extracting recipe from URL:', url.value)
    const recipe = await extractRecipe(url.value)

    if (!recipe) {
      alert('No image found or recipe is invalid.')
      isLoading.value = false
      return
    }
    if (recipe.image) recipe.image = await copyImageToServer(recipe.image)

    emit('clickedAndChanged', recipe)
    alert('Recipe processed!')
    url.value = ''
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to extract recipe.')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
@import url('@/styles/Input.css');
</style>
