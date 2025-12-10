<template>
  <div class="grid_big">
    <SmallReceipt v-for="station in filtered" :key="station.id" :proj="station" :hidden="false" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import SmallReceipt from '@/components/RecipeSmall.vue'
import { fetchDataByTag } from '@/lib/dynamoService'
import type { Recipe } from '@/types/recipe'

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

const dbData = ref<Recipe[]>([])

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

const fetchAndSetData = async (tag?: string, orderBy?: string, maxCount?: number) => {
  const result = await fetchDataByTag(tag)
  if (result.success) {
    let resultData = result.data as Recipe[]

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

    dbData.value = resultData
  } else {
    alert('Error Fetching Data: ' + result.message)
  }
}

const filtered = computed(() =>
  dbData.value.filter((item) => recipeMatchesFilter(props.filter, item)),
)

watch(
  () => [props.tag, props.orderBy, props.maxCount],
  () => {
    fetchAndSetData(props.tag, props.orderBy, props.maxCount)
  },
)

onMounted(() => {
  fetchAndSetData(props.tag, props.orderBy, props.maxCount)
})
</script>

<style></style>
