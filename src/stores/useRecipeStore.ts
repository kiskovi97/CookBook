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
import {v4 as uuidv4} from 'uuid';

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
    const loading = ref(false)
    const nextKey = ref<Record<string, AttributeValue> | undefined>(undefined)
    const initialized = ref(false)
    const allRecipesLoaded = ref(false)
    const PAGE_SIZE = 25

    const recipesById = computed(() => new Map(recipes.value.map((recipe) => [recipe.id, recipe])))
    const recipesByTag = computed(() => {
      const grouped: Record<string, InternalRecipe[]> = {}
      for (const recipe of recipes.value) {
        if (!recipe.tags) continue
        for (const tag of recipe.tags) {
          grouped[tag] ??= []
          grouped[tag].push(recipe)
        }
      }
      return grouped
    })

    const fetchMoreRecipes = async () => {
      if (loading.value) return
      loading.value = true
      const response = await fetchRecipePage(PAGE_SIZE, nextKey.value)
      const data = response.data || []
      nextKey.value = response.nextKey

      for (const recipe of data) {
        const internalRecipe = convertRecipe(recipe)
        if (!recipesById.value.has(internalRecipe.id)) {
          recipes.value.push(internalRecipe)
        }
      }

      if (!nextKey.value) {
        allRecipesLoaded.value = true
      }

      loading.value = false
    }

    const initializeRecipes = async () => {
      if (initialized.value) return
      initialized.value = true

      recipes.value.forEach(recipe =>
      {
          if (!recipe.id)
            recipe.id = uuidv4()
      })

      if (recipes.value.length > 0 && allRecipesLoaded.value) return

      if (recipes.value.length === 0) {
        await fetchMoreRecipes()
      }

      if (nextKey.value) {
        await fetchRemainingRecipes()
      }
    }

    const fetchRemainingRecipes = async () => {
      while (nextKey.value) {
        await fetchMoreRecipes()
      }
    }

    const getRecipeById = (id: string): Recipe | undefined => {
      return recipesById.value.get(id)
    }

    const convertRecipe = (recipe: Recipe): InternalRecipe => {
      const creationTs = new Date(recipe.CreationDate).getTime()
      const searchText = normalizeText(recipe.title)
      if (!recipe.id)
        recipe.id = uuidv4();

      return {
        ...recipe,
        __creationTs: creationTs,
        __searchText: searchText,
      }
    }

    const updateRecipe = async (updatedRecipe: Recipe) => {
      if (!updatedRecipe.id)
        updatedRecipe.id = uuidv4();
      const internalRecipe = convertRecipe(updatedRecipe)
      const index = recipes.value.findIndex((recipe) => recipe.id === internalRecipe.id)
      if (index >= 0) {
        recipes.value[index] = internalRecipe
      } else {
        recipes.value.push(internalRecipe)
      }

      await uploadRecipeData(updatedRecipe)
    }

    const addRecipe = async (newRecipe: Recipe) => {
      if (!newRecipe.id)
        newRecipe.id = uuidv4();
      recipes.value.push(convertRecipe(newRecipe))
      await uploadNewRecipeData(newRecipe)
    }

    const deleteRecipe = async (id: string) => {
      const index = recipes.value.findIndex((recipe) => recipe.id === id)
      if (index === -1) return

      recipes.value.splice(index, 1)
      await deleteRecipeDataById(id)
    }

    onMounted(async () => {
      await initializeRecipes()
      if (nextKey.value) {
        void fetchRemainingRecipes()
      }
    })

    return {
      recipes,
      recipesByTag,
      getRecipeById,
      updateRecipe,
      addRecipe,
      deleteRecipe,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      pick: ['recipes'],
    },
  },
)
