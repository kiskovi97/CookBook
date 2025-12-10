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
    const image = await extractRecipe(url.value)

    if (!image) {
      alert('No image found or image is invalid.')
      isLoading.value = false
      return
    }

    emit('clickedAndChanged', image)
    alert('Image processed!')
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
