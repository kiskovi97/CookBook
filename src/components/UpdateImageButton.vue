<template>
  <div class="section">
    <textarea placeholder="Paste recipe URL here" v-model="url" class="textarea" />
    <button @click="handleExtractAndUpload" :disabled="isLoading || !url.trim()" class="button">
      {{ isLoading ? 'Extracting...' : 'Extract Image' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { extractImage } from '@/lib/fetchRecipe'
import { copyImageToServer } from '@/lib/image-service'
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'clickedAndChanged', image: string, url: string): void
}>()

const url = ref('')
const isLoading = ref(false)

const handleExtractAndUpload = async () => {
  isLoading.value = true
  try {
    console.log('Extracting recipe from URL:', url.value)
    const image = await extractImage(url.value)

    if (!image) {
      alert('No image found or image is invalid.')
      isLoading.value = false
      return
    }

    const uploadedImage = await copyImageToServer(image)

    emit('clickedAndChanged', uploadedImage, url.value)
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
