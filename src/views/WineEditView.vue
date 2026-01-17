<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchWineDataById } from '@/lib/dynamoService'
import type { Wine } from '@/types/recipe'
import WineEdit from '@/components/WineEdit.vue'

const route = useRoute()
const data = ref<Wine | undefined>(undefined)

onMounted(async () => {
  if (!route.params.id) return

  data.value = (await fetchWineDataById(route.params.id.toString())).data
})
</script>

<template>
  <Navbar search />
  <div class="page"><WineEdit v-if="data" :data="data" /></div>
</template>
