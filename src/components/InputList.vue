<template>
  <div class="section">
    <li v-for="(value, index) in temp" :key="index" class="section">
      <textarea
        class="textarea"
        rows="8"
        cols="80"
        v-model="temp[index]"
        @blur="onBlur(index)"
      ></textarea>
      <img :src="deleteIcon" alt="remove" class="icon" @click="removeInstruction(index)" />
    </li>
    <li class="section">
      <button class="button" @click="addInstruction">Add New</button>
    </li>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import deleteIcon from '@/logos/bin.png'

const model = defineModel<string[]>()

const temp = ref<string[]>(model.value ? [...model.value] : [])

watch(
  () => model.value,
  (v) => {
    temp.value = v ? [...v] : []
  },
  { deep: true },
)

const removeInstruction = (index: number) => {
  if (model.value === undefined) return
  if (index < 0 || index >= model.value.length) return

  model.value.splice(index, 1)
  temp.value.splice(index, 1)
}

const addInstruction = () => {
  if (model.value === undefined) {
    model.value = []
  }
  model.value.push('')
  temp.value.push('')
}

const onBlur = (index: number) => {
  if (model.value === undefined) {
    model.value = []
  }

  if (model.value !== undefined && temp.value[index] !== undefined) {
    model.value[index] = temp.value[index]
  }
}
</script>

<style scoped>
@import url('@/styles/Input.css');
</style>
