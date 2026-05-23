import { fetchWineData } from '@/lib/dynamoService'
import type { Wine } from '@/types/recipe'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useWineStore = defineStore('wines', () => {
  const wines = ref<Wine[]>([])
  const winesById = ref<Record<string, Wine>>({})

  const getWineById = (id: string): Wine | undefined => {
    return winesById.value[id]
  }

  onMounted(async () => {
    const response = await fetchWineData()
    wines.value = response.success && response.data ? response.data : []
    winesById.value = {}
    for (const wine of wines.value) {
      winesById.value[wine.id] = wine
    }
  })

  return { wines, getWineById }
})
