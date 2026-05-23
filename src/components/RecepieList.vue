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

const { getRecipesByTag } = useRecipeStore()

const recipes = computed(() => getRecipesByTag(props.tag ?? ''))
const orderedRecipes = computed(() => {
  let resultData = [...recipes.value]

  if (props.orderBy === 'date') {
    resultData.sort(
      (first, second) =>
        new Date(first.CreationDate).getTime() - new Date(second.CreationDate).getTime(),
    )
  } else if (props.orderBy === 'date-desc') {
    resultData.sort(
      (first, second) =>
        new Date(second.CreationDate).getTime() - new Date(first.CreationDate).getTime(),
    )
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
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s]/gi, ' ')
    .toLowerCase()
}

const recipeMatchesFilter = (filter: string | undefined, recipe: Recipe): boolean => {
  if (!filter) return true

  const words = normalizeText(filter).split(/\s+/).filter(Boolean)

  const searchableFields: string[] = [
    recipe.title,
    recipe.details ?? '',
    ...(recipe.tags ?? []),
    ...(recipe.sources?.map((section) => section.link ?? '') ?? []),
    ...(recipe.instructions ?? []),
    ...(recipe.ingredients?.flatMap((section) => section.list ?? []) ?? []),
  ]

  const combinedText = normalizeText(searchableFields.join(' '))

  return words.every((word) => combinedText.includes(word))
}

const filtered = computed(() =>
  orderedRecipes.value.filter((item) => recipeMatchesFilter(props.filter, item)),
)
</script>
