import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from '@/types/recipe'
import { fetchRecipePage } from '@/lib/dynamoService'
import type { AttributeValue } from '@aws-sdk/client-dynamodb'

const normalizeText = (text: string): string =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z\s]/gi, ' ')
    .toLowerCase()

type InternalRecipe = Recipe & { __creationTs: number; __searchText: string }

export const useRecipeStore = defineStore(
  'recipes',
  () => {
    const recipes = ref<InternalRecipe[]>([])
    const recipesById = ref<Record<string, InternalRecipe>>({})
    const recipesByTag = ref<Record<string, InternalRecipe[]>>({})
    const loading = ref(false)
    const nextKey = ref<Record<string, AttributeValue> | undefined>(undefined)
    const PAGE_SIZE = 25

    const reset = () => {
      recipes.value = []
      recipesById.value = {}
      recipesByTag.value = {}
      nextKey.value = undefined
    }

    const fetchMoreRecipes = async () => {
      if (loading.value) return
      loading.value = true
      const response = await fetchRecipePage(PAGE_SIZE, nextKey.value)
      const data = response.data || []
      nextKey.value = response.nextKey

      for (const recipe of data) {
        const internalRecipe = convertRecipe(recipe)
        recipesById.value[internalRecipe.id] = internalRecipe
        if (internalRecipe.tags) {
          for (const tag of internalRecipe.tags) {
            recipesByTag.value[tag] ??= []
            recipesByTag.value[tag].push(internalRecipe)
          }
        }
      }
      recipes.value.push(...data.map(convertRecipe))

      loading.value = false
    }

    const getRecipeById = (id: string): Recipe | undefined => {
      return recipesById.value[id]
    }

    const convertRecipe = (recipe: Recipe): InternalRecipe => {
      const creationTs = new Date(recipe.CreationDate).getTime()
      const searchText = normalizeText(recipe.title)

      const internalRecipe: InternalRecipe = {
        ...recipe,
        __creationTs: creationTs,
        __searchText: searchText,
      }

      return internalRecipe
    }

    onMounted(async () => {
      reset()
      do {
        await fetchMoreRecipes()
      } while (nextKey.value)
    })

    return { recipes, recipesByTag, fetchMoreRecipes, reset, getRecipeById }
  },
  { persist: false },
)
