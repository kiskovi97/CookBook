<template>
  <div class="section">
    <div>
      <label>
        This is URL parsing
        <textarea
          placeholder="Paste recipe URL here"
          v-model="url"
          class="textarea"
          id="parse_url"
        />
      </label>
      <button @click="handleExtractAndUpload" :disabled="isLoading || !url.trim()" class="button">
        {{ isLoading ? 'Extracting...' : 'Extract Recipe' }}
      </button>
    </div>
    <div>
      <label>
        This is Text parsing
        <textarea
          placeholder="Paste recipe Text here"
          v-model="text"
          class="textarea"
          id="parse_text"
        />
      </label>
      <button
        @click="handleExtractTextAndUpload"
        :disabled="isLoading || !text.trim()"
        class="button"
      >
        {{ isLoading ? 'Extracting...' : 'Extract Recipe' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { extractRecipe, extractRecipeFromText } from '@/lib/fetchRecipe'
import { copyImageToServer } from '@/lib/image-service'
import type { Recipe } from '@/types/recipe'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'clickedAndChanged', recipe: Recipe): void
}>()

const url = ref('')
const text = ref('')
const isLoading = ref(false)
const handleExtractTextAndUpload = async () => {
  isLoading.value = true
  try {
    console.log('Extracting recipe from Text:', text.value)
    const recipe = await extractRecipeFromText(text.value)

    if (recipe.type === 'error') {
      alert(recipe.data.message)
      isLoading.value = false
      return
    }
    if (recipe.data.image) recipe.data.image = await copyImageToServer(recipe.data.image)

    emit('clickedAndChanged', recipe.data)
    alert('Recipe processed!')
    url.value = ''
  } catch (error) {
    console.error('Error:', error)
    alert('Failed to extract recipe.')
  } finally {
    isLoading.value = false
  }
}

const handleExtractAndUpload = async () => {
  isLoading.value = true
  try {
    console.log('Extracting recipe from URL:', url.value)
    const recipe = await extractRecipe(url.value)

    if (recipe.type === 'error') {
      alert(recipe.data.message)
      isLoading.value = false
      return
    }
    if (recipe.data.image) recipe.data.image = await copyImageToServer(recipe.data.image)

    emit('clickedAndChanged', recipe.data)
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
