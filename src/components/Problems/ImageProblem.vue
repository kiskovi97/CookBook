<template>
  <div>
    <div v-if="isLoading">Fixing image...</div>
    <div v-else-if="isFixed">Image fixed!</div>
    <button @click="fixImage" v-else-if="hasAutoFix">Missing or broken image</button>
    <div v-else>Image missing but no automatic fix available</div>
  </div>
</template>

<script setup lang="ts">
import { uploadData } from '@/lib/dynamoService'
import { extractImage } from '@/lib/fetchRecipe'
import { copyImageToServer } from '@/lib/image-service'
import type { Recipe } from '@/types/recipe'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const isLoading = ref(false)
const isFixed = ref(false)

const hasAutoFix = computed(() => {
  return props.recipe && props.recipe.sources && props.recipe.sources.length > 0
})

const router = useRouter()

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

  const newImage = await extractImage(firstLink.link || '')

  if (!newImage) {
    return
  }

  console.log('Found image:', newImage)
  alert('Found image, opening in new tab. Please copy the image URL and update the recipe.')
  recipe.image = await copyImageToServer(newImage)
  await uploadData(recipe)

  isLoading.value = false
  isFixed.value = true
  if (confirm('Want to go to the recipe page to edit?')) {
    router.push('/dbdish/' + recipe.id) // Navigate after upload
  }
}
</script>

<style scoped></style>
