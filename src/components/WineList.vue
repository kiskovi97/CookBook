<template>
  <div class="grid_big">
    <SmallWine v-for="data in orderedList" :key="data.id" :data="data" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import SmallWine from './SmallWine.vue'
import type { Wine } from '@/types/recipe'

interface DishListProps {
  data: Wine[]
  orderBy?: string
  maxCount?: number
  filter?: string
}

const props = defineProps<DishListProps>()

const normalizeText = (text: string): string => {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s]/gi, ' ')
    .toLowerCase()
}

const recipeMatchesFilter = (filter: string | undefined, wine: Wine): boolean => {
  if (!filter) return true

  const words = normalizeText(filter).split(/\s+/).filter(Boolean)

  const searchableFields: string[] = [wine.title]

  const combinedText = normalizeText(searchableFields.join(' '))

  return words.every((word) => combinedText.includes(word))
}

const sortData = (data: Wine[], orderBy?: string, maxCount?: number, filter?: string): Wine[] => {
  let resultData = data
  if (orderBy === 'date') {
    resultData = [...resultData].sort(
      (first, second) =>
        new Date(first.CreationDate).getTime() - new Date(second.CreationDate).getTime(),
    )
  } else if (orderBy === 'date-desc') {
    resultData = [...resultData].sort(
      (first, second) =>
        new Date(second.CreationDate).getTime() - new Date(first.CreationDate).getTime(),
    )
  } else {
    resultData = [...resultData].sort((first, second) => first.title.localeCompare(second.title))
  }

  if (maxCount) {
    resultData = resultData.slice(0, maxCount)
  }
  return resultData.filter((item) => recipeMatchesFilter(filter, item))
}

const orderedList = computed(() =>
  sortData(props.data, props.orderBy, props.maxCount, props.filter),
)
</script>

<style></style>
