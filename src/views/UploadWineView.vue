<template>
  <Navbar search />
  <div v-if="!user">Please log in to upload a recipe.</div>
  <div class="page" v-else>
    <button @click="createNew" class="button">CREATE NEW</button>
    <button @click="upload" :disabled="!data" class="button">UPLOAD AS NEW</button>
    <WineEdit v-if="data" :data="data" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import type { Wine } from '@/types/recipe'
import { ref } from 'vue'
import { uploadNewWineData } from '@/lib/dynamoService'
import { useCurrentUser } from 'vuefire'
import WineEdit from '@/components/WineEdit.vue'

const data = ref<Wine | null>(null)

const user = useCurrentUser()

const createNew = () => {
  data.value = {
    id: '_',
    CreationDate: new Date().toISOString(),
  } as Wine
}

const upload = async () => {
  if (!data.value) {
    alert('Data is missing')
    return
  }

  await uploadNewWineData(data.value)

  alert('Wine uploaded successfully!')
  data.value = null
}
</script>

<style scoped>
@import url('@/styles/Input.css');
</style>
