<template>
  <div class="grid_big">
    <SmallReceipt v-for="station in filtered" :key="station.id" :proj="station" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SmallReceipt from '@/components/RecipeSmall.vue'
import type { Recipe } from '@/types/recipe'
import { useRecipeStore } from '@/stores/useRecipeStore'
import { storeToRefs } from 'pinia'

interface DishListProps {
  tag?: string
  maxCount?: number
  filter?: string
  orderBy?: string
}

const props = withDefaults(defineProps<DishListProps>(), {
  tag: undefined,
  maxCount: undefined,
  filter: undefined,
  orderBy: undefined,
})

const { recipesByTag, recipes } = storeToRefs(useRecipeStore())

type InternalRecipe = Recipe & { __searchText?: string; __creationTs?: number }

const orderedRecipes = computed(() => {
  let resultData = [...(props.tag ? (recipesByTag.value[props.tag ?? ''] ?? []) : recipes.value)]

  if (props.orderBy === 'date') {
    resultData.sort((first, second) => {
      const a =
        (first as unknown as InternalRecipe).__creationTs ?? new Date(first.CreationDate).getTime()
      const b =
        (second as unknown as InternalRecipe).__creationTs ??
        new Date(second.CreationDate).getTime()
      return a - b
    })
  } else if (props.orderBy === 'date-desc') {
    resultData.sort((first, second) => {
      const a =
        (first as unknown as InternalRecipe).__creationTs ?? new Date(first.CreationDate).getTime()
      const b =
        (second as unknown as InternalRecipe).__creationTs ??
        new Date(second.CreationDate).getTime()
      return b - a
    })
  } else {
    resultData.sort((first, second) => first.title.localeCompare(second.title))
  }

  if (props.maxCount) {
    resultData = resultData.slice(0, props.maxCount)
  }

  return resultData
})

const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[^\w\s]/g, ' ')
    .toLowerCase()
}

const recipeMatchesFilter = (filter: string | undefined, recipe: Recipe): boolean => {
  if (!filter) return true

  const words = normalizeText(filter).split(/\s+/).filter(Boolean)

  // use precomputed __searchText when available
  const combinedText =
    (recipe as unknown as InternalRecipe).__searchText ??
    normalizeText([recipe.title, recipe.details ?? '', ...(recipe.tags ?? [])].join(' '))

  return words.every((word) => combinedText.includes(word))
}

const filtered = computed(() =>
  orderedRecipes.value.filter((item) => recipeMatchesFilter(props.filter, item)),
)
</script>
