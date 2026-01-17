<template>
  <div>
    <div v-if="isLoading">Fixing image...</div>
    <div v-else-if="isFixed">Image fixed!</div>
    <button @click="fixImage" v-else-if="hasAutoFix">Upload Image</button>
    <div v-else>Missing Image</div>
  </div>
</template>

<script setup lang="ts">
import { uploadRecepieData } from '@/lib/dynamoService'
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
  try {
    const recipe = props.recipe
    if (!recipe || !recipe.image) {
      return
    }

    isLoading.value = true

    const imageUrl = recipe.image.replace(
      '/CookBook/static/media',
      'https://kiskovi97.github.io/CookBook/images',
    )

    recipe.image = await copyImageToServer(imageUrl)
    await uploadRecepieData(recipe)

    isLoading.value = false
    isFixed.value = true
  } catch (e) {
    alert('Failed to fix image: ' + (e as Error).message)
  }
}
</script>

<style scoped></style>
