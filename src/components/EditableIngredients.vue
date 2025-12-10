<template>
  <div class="section" v-if="tempList && tempList.length > 0">
    <div v-for="(value, index) in tempList" :key="index">
      <div class="header">
        <img :src="deleteIcon" alt="remove" class="icon" @click="removeInstruction(index)" />
        <input
          class="text"
          type="text"
          :name="index.toString()"
          v-model="value.title"
          @blur="onBlur(index)"
        />
      </div>
      <InputList v-model="value.list" @blur="onBlur(index)" />
    </div>
    <button class="button" @click="addInstruction">Add</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputList from '@/components/InputList.vue'
import type { IngredientGroup } from '@/types/recipe'
import deleteIcon from '@/logos/bin.png'

const model = defineModel<IngredientGroup[]>()
const tempList = ref<IngredientGroup[]>(model.value ? [...model.value] : [])
watch(
  () => model.value,
  (v) => {
    tempList.value = v ? [...v] : []
  },
  { deep: true },
)

const removeInstruction = (index: number) => {
  if (model.value === undefined) return
  if (index < 0 || index >= model.value.length) return

  model.value.splice(index, 1)
  tempList.value.splice(index, 1)
}

const addInstruction = () => {
  if (model.value === undefined) {
    model.value = []
  }
  model.value.push({ title: 'Ingredients', list: [''] })
  tempList.value.push({ title: 'Ingredients', list: [''] })
}

const onBlur = (index: number) => {
  if (model.value === undefined) {
    model.value = []
  }

  if (model.value !== undefined && tempList.value[index] !== undefined) {
    model.value[index] = tempList.value[index]
  }
}
</script>

<style scoped>
@import url('@/styles/Input.css');
</style>
