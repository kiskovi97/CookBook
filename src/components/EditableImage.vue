<template>
  <div>
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Preview"
      style="max-width: 300px; margin-top: 1rem"
      loading="lazy"
      :width="width"
      :height="height"
    />
    <input type="file" accept="image/*" @change="onFileChange" :disabled="uploading" />

    <p v-if="uploading">Uploading...</p>
    <p v-if="error" style="color: red">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { uploadImageToServer } from '@/lib/image-service'
import { ref } from 'vue'

const imageUrl = defineModel<string | undefined>('imageUrl', { type: String, required: true })
defineProps<{
  width?: number
  height?: number
}>()

const uploading = ref(false)
const error = ref<string | null>(null)

async function uploadImage(file: File) {
  uploading.value = true
  error.value = null

  try {
    const publicUrl = await uploadImageToServer(file)
    imageUrl.value = publicUrl
  } catch (e: unknown) {
    error.value = (e as Error).message
  } finally {
    uploading.value = false
  }
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement | null
  const file = input?.files?.[0]
  if (!file) return

  // basic client-side validation
  if (!file.type.startsWith('image/')) {
    error.value = 'Only images allowed'
    return
  }

  uploadImage(file)
}
</script>
