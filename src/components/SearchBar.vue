<template>
  <div class="filters">
    <div>
      <input type="text" id="search" name="search" placeholder="Search..." v-model="localFilter" />
    </div>
    <div class="sorting">
      Order By
      <select name="orderBy" id="orderBy" v-model="orderBy">
        <option value="name">Name</option>
        <option value="date">Oldest</option>
        <option value="date-desc">Newest</option>
      </select>
    </div>
    <div class="sorting">
      <select name="mainTypeSelection" id="mainTypeSelection" v-model="mainTypeSelection">
        <option v-for="type in recipeMainTypes" :key="type" :value="type">
          {{ type }}
        </option>
        <option :value="undefined">All Types</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { type RecipeMainType, recipeMainTypes } from '@/types/recipe'

const filter = defineModel('filter')
const orderBy = defineModel('orderBy', { default: 'name' })

const mainTypeSelection = defineModel<RecipeMainType | undefined>('mainTypeSelection', {
  default: undefined,
})

const localFilter = ref(filter.value)

let debounceTimer: number | undefined
watch(localFilter, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = globalThis.setTimeout(() => {
    filter.value = val
  }, 250)
})

// keep localFilter in sync if externally changed
watch(filter, (val) => {
  if (val !== localFilter.value) localFilter.value = val
})
</script>

<style scoped>
.filters {
  position: relative;
  padding: 1em;
  justify-content: center;
}

.filters input {
  display: block;
  width: 100%;
  box-sizing: border-box;
}

.filters button {
  margin-right: 1em;
  border: 0;
  border-radius: 1em;
  padding: 1em;
  cursor: pointer;
  font-weight: 500;
  filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.315));
}

.filters button:hover {
  background-color: var(--lightColor);
}

.filters button.selected {
  background-color: var(--lightdarkColor);
  color: white;
}

.sorting {
  justify-content: center;
}
</style>
