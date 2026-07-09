<template>
  <Navbar search />
  <div v-if="!user">Please log in to upload a recipe.</div>
  <div class="page" v-else>
    <ExtractRecipeButton @clickedAndChanged="(recipe) => (data = recipe)" />
    <AddNewRecipeButton @clickedAndChanged="(recipe) => (data = recipe)" />
    <RecipeEdit v-if="data" :recipe="data" :createNew="true" />
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/NavBar.vue'
import type { Recipe } from '@/types/recipe'
import { ref } from 'vue'
import { useCurrentUser } from 'vuefire'
import ExtractRecipeButton from '@/components/ExtractRecipeButton.vue'
import AddNewRecipeButton from '@/components/AddNewRecipeButton.vue'
import RecipeEdit from '@/components/RecipeEdit.vue'

const data = ref<Recipe | null>(null)

const user = useCurrentUser()
</script>

<style scoped>
@import url('@/styles/Input.css');
</style>
