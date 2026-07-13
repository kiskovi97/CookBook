import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from '@/types/recipe'
import {
  deleteRecipeDataById,
  fetchRecipePage,
  uploadNewRecipeData,
  uploadRecipeData,
} from '@/lib/dynamoService'
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
    const recipes = computed(() => [...recipesById.value.values()])
    const recipesById = ref<Map<string, InternalRecipe>>(new Map())
    const recipesByTag = ref<Record<string, InternalRecipe[]>>({})
    const loading = ref(false)
    const nextKey = ref<Record<string, AttributeValue> | undefined>(undefined)
    const PAGE_SIZE = 50

    const reset = () => {
      recipesById.value = new Map()
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
        recipesById.value.set(internalRecipe.id, internalRecipe)
        if (internalRecipe.tags) {
          for (const tag of internalRecipe.tags) {
            recipesByTag.value[tag] ??= []
            recipesByTag.value[tag].push(internalRecipe)
          }
        }
      }

      loading.value = false
    }

    const getRecipeById = (id: string): Recipe | undefined => {
      return recipesById.value.get(id)
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

    const updateRecipe = async (updatedRecipe: Recipe) => {
      recipesById.value.set(updatedRecipe.id, convertRecipe(updatedRecipe))

      if (updatedRecipe.tags) {
        for (const tag of updatedRecipe.tags) {
          const array = recipesByTag.value[tag] || []
          recipesByTag.value[tag] = array.filter((recipe) => recipe.id !== updatedRecipe.id)
          recipesByTag.value[tag].push(convertRecipe(updatedRecipe))
        }
      }

      await uploadRecipeData(updatedRecipe)
    }

    const addRecipe = async (newRecipe: Recipe) => {
      recipesById.value.set(newRecipe.id, convertRecipe(newRecipe))

      if (newRecipe.tags) {
        for (const tag of newRecipe.tags) {
          recipesByTag.value[tag] ??= []
          recipesByTag.value[tag].push(convertRecipe(newRecipe))
        }
      }

      await uploadNewRecipeData(newRecipe)
    }

    const deleteRecipe = async (id: string) => {
      const recipeToDelete = recipesById.value.get(id)
      if (!recipeToDelete) return

      recipesById.value.delete(id)

      if (recipeToDelete.tags) {
        for (const tag of recipeToDelete.tags) {
          const array = recipesByTag.value[tag] || []
          recipesByTag.value[tag] = array.filter((recipe) => recipe.id !== id)
        }
      }

      await deleteRecipeDataById(id)
    }

    onMounted(async () => {
      reset()
      do {
        await fetchMoreRecipes()
      } while (nextKey.value)
    })

    return {
      recipes,
      recipesByTag,
      fetchMoreRecipes,
      reset,
      getRecipeById,
      updateRecipe,
      addRecipe,
      deleteRecipe,
    }
  },
  { persist: false },
)
