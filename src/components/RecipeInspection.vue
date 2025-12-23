<template>
  <div class="recipeCard" v-if="problems && problems.length > 0">
    <img :src="imageLink" alt="coverImage" width="80" height="80" />
    <div>{{ recipe.title }}</div>
    <div>
      <template v-for="problem in problems" :key="problem.id">
        <ImageProblem v-if="problem.problem == ProblemType.Image" :recipe="recipe" />
        <DetailsProblem v-if="problem.problem == ProblemType.Details" :recipe="recipe" />
        <TagProblem v-if="problem.problem == ProblemType.Tag" :recipe="recipe" />
        <LinkProblem v-if="problem.problem == ProblemType.Link" :recipe="recipe" />
        <ImageServerProblem v-if="problem.problem == ProblemType.ImageUpload" :recipe="recipe" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Recipe } from '@/types/recipe'
import { computed, onMounted, ref } from 'vue'
import { fetchInspectionData, ProblemType, type RecipeRef } from '@/lib/recipe-inspection.ts'
import TagProblem from '@/components/Problems/TagProblem.vue'
import DetailsProblem from '@/components/Problems/DetailsProblem.vue'
import ImageProblem from '@/components/Problems/ImageProblem.vue'
import LinkProblem from '@/components/Problems/LinkProblem.vue'
import ImageServerProblem from '@/components/Problems/ImageServerProblem.vue'

const props = defineProps<{
  recipe: Recipe
}>()

const imageLink = computed(
  () =>
    props.recipe?.image?.replace(
      '/CookBook/static/media',
      'https://kiskovi97.github.io/CookBook/images',
    ) ?? '',
)

const problems = ref<RecipeRef[]>([])

onMounted(async () => {
  problems.value = await fetchInspectionData(props.recipe)
})
</script>

<style scoped></style>
