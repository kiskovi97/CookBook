import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { RecipeMainType } from '@/types/recipe'

export const useSearchStore = defineStore(
  'search',
  () => {
    const filter = ref('')
    const orderBy = ref('name')
    const mainTypeSelection = ref<RecipeMainType | undefined>(undefined)

    return {
      filter,
      orderBy,
      mainTypeSelection,
    }
  },
  { persist: true },
)
