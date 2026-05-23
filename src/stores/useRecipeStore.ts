import { onMounted, ref } from 'vue'
import { defineStore } from 'pinia'
import type { Recipe } from '@/types/recipe'
import { fetchRecipeData } from '@/lib/dynamoService'

export const useRecipeStore = defineStore('recipes', () => {
  const recipes = ref<Recipe[]>([])
  const recipesById = ref<Record<string, Recipe>>({})
  const recipesByTag = ref<Record<string, Recipe[]>>({})

  const fetchRecipes = async () => {
    const response = await fetchRecipeData()
    recipes.value = response.success && response.data ? response.data : []
    recipesById.value = {}
    for (const recipe of recipes.value) {
      recipesById.value[recipe.id] = recipe
      for (const tag of recipe.tags || []) {
        if (!recipesByTag.value[tag]) {
          recipesByTag.value[tag] = []
        }
        recipesByTag.value[tag].push(recipe)
      }
    }
  }

  const getRecipeById = (id: string): Recipe | undefined => {
    return recipesById.value[id]
  }

  const getRecipesByTag = (tag: string): Recipe[] => {
    if (!tag) return recipes.value
    return recipesByTag.value[tag] || []
  }

  onMounted(() => {
    fetchRecipes()
  })

  return { recipes, fetchRecipes, getRecipeById, getRecipesByTag }
})
