<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { useRoute } from 'vue-router'
import type { Wine } from '@/types/recipe'
import WineEdit from '@/components/WineEdit.vue'
import { useWineStore } from '@/stores/useWineStore'
import { computed } from 'vue'

const route = useRoute()
const { getWineById } = useWineStore()
const data = computed<Wine | undefined>(() => {
  if (!route.params.id) return undefined
  return getWineById(route.params.id.toString())
})
</script>

<template>
  <Navbar search />
  <div class="page"><WineEdit v-if="data" :data="data" /></div>
</template>
