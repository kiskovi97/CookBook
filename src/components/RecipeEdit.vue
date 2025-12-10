<template>
  <div class="receipt">
    <RecipeInspection :recipe="recipe" />
    <AddDishButton @clickedAndChanged="(recipe) => handleExtract(recipe)" />
    <UpdateImageButton @clickedAndChanged="(image, url) => handleUpdateImage(image, url)" />
    <div class="description">
      <div>
        <input
          class="text"
          type="text"
          name="title"
          placeholder="Paste recipe URL here"
          v-model="recipe.title"
        />
        <textarea
          class="textarea"
          name="details"
          placeholder="Paste recipe URL here"
          v-model="recipe.details"
        />
        <div class="tags">
          <h3>Tags</h3>
          <InputList name="tags" v-model="recipe.tags" />
        </div>
      </div>
      <div>
        <img
          :src="imageLink ?? ''"
          :alt="recipe.title"
          class="background"
          width="256"
          height="256"
        />
        <textarea
          class="textarea"
          name="image"
          placeholder="Paste image URL here"
          v-model="recipe.image"
        />
      </div>
    </div>
    <div class="description">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <EditableIngredients v-model="recipe.ingredients" />
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <div>
          <InputList name="instructions" v-model="recipe.instructions" />
        </div>
      </motion.div>
    </div>
    <div class="description">
      <div>
        <button class="button" @click="upload">Upload</button>
      </div>
      <div>
        <button class="button" @click="deleteRecipe">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import type { Recipe } from '@/types/recipe'
import { computed, ref } from 'vue'
import { uploadData, deleteDataById } from '@/lib/dynamoService'
import { useRouter } from 'vue-router'
import InputList from '@/components/InputList.vue'
import EditableIngredients from '@/components/EditableIngredients.vue'
import RecipeInspection from '@/components/RecipeInspection.vue'
import AddDishButton from '@/components/ExtractRecipeButton.vue'
import UpdateImageButton from '@/components/UpdateImageButton.vue'

const props = defineProps<{
  recipe: Recipe
}>()

const recipe = ref<Recipe>(props.recipe)
const router = useRouter()

const upload = async () => {
  console.log('Uploading recipe:', recipe.value)
  await uploadData(recipe.value)
  alert('Uploaded')
  router.push('/recipe/' + recipe.value.id)
}

const deleteRecipe = async () => {
  if (confirm('Are you sure you want to delete this recipe?')) {
    // Implement delete logic here
    await deleteDataById(recipe.value.id)
    alert('Recipe deleted')
    router.push('/')
  }
}

const handleExtract = (e: Recipe) => {
  recipe.value.title = e.title
  recipe.value.image = e.image
  recipe.value.ingredients = e.ingredients
  recipe.value.instructions = e.instructions
}

const handleUpdateImage = (e: string, url: string) => {
  console.log('image was updated to: ', e)
  recipe.value.image = e
  if (!recipe.value.sources) recipe.value.sources = []
  recipe.value.sources?.push({ link: url, name: 'Link' })
}

const imageLink = computed(
  () =>
    recipe.value?.image?.replace(
      '/CookBook/static/media',
      'https://kiskovi97.github.io/CookBook/images',
    ) ?? '',
)
</script>

<style scoped>
@import url('@/styles/Input.css');
.tag {
  padding: 1em;
}

.receipt {
  padding: 0;
  padding-top: 0;
  max-width: 80em;
  margin: 0 auto;
  padding-bottom: 20em;
}

.edit_icon {
  position: absolute;
  top: 2rem;
  right: 2rem;
}

.receipt .main {
  border-radius: 1em;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 2em;
  min-height: 15em;
  filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.11));
}

.image img {
  height: 24em;
  width: 24em;
  object-fit: cover;
  border-radius: 2em;
  filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.226));
  position: absolute;
  left: 0;
  bottom: -8em;
}

.image {
  position: relative;
  margin: 0 auto;
  width: 24em;
  height: 100%;
  z-index: 3;
}

.title {
  padding-bottom: 0em;
  font-weight: 700;
  text-align: start;
}

.receipt .details {
  width: 30em;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.receipt .tag a {
  color: white;
  text-decoration: none;
}

.receipt .link a {
  color: var(--darkestColor);
  margin-left: 1em;
}

.receipt .description {
  display: grid;
  column-gap: 2em;
  grid-template-columns: 1fr 1fr;
  padding-left: 1em;
  padding-right: 1em;
  max-width: 100%;
}

.description li,
.description ol {
  margin-bottom: 0.5em;
}

.receipt .description > div {
  background-color: white;
  border-radius: 1em;
  padding: 2em;
  margin-top: 2em;
  height: max-content;
  filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.11));
  box-shadow: inset -1px -1px 10px rgba(88, 19, 19, 0.185);
  overflow: auto; /* Add this line to prevent overflow */
  max-width: 100%; /* Ensure children stay inside parent */
  box-sizing: border-box;
}

.receipt .description > div:nth-child(even) {
  position: relative;
  top: 7em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  padding: 0rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: inline;
  background-color: var(--mainColor);
  color: white;
  border-radius: 0.5rem;
}

@media only screen and (max-width: 70em) {
  .image img {
    height: 20em;
    width: fit-content;
    max-width: 20em;
  }

  .image {
    width: 20em;
  }
}

@media only screen and (max-width: 60em) {
  .receipt .description {
    display: unset;
  }

  .receipt .description > div:nth-child(even) {
    top: 0em;
  }

  .receipt .main {
    height: fit-content;
    min-height: 15em;
    grid-template-columns: 1fr;
  }

  .image {
    position: relative;
    height: 15em;
  }

  .image img {
    position: relative;
    bottom: -1em;
    height: 18em;
    max-width: 20em;
  }

  .receipt .description > div {
    margin-left: 1em;
    margin-right: 1em;
  }
}
@media only screen and (max-width: 50em) {
  .receipt {
    min-height: unset;
  }

  .receipt .main {
    height: unset;
    min-height: 0;
  }

  .receipt .title {
    padding: 0;
  }

  .receipt .description > div {
    padding: 2em;
  }

  .receipt .details {
    width: unset;
    margin: 0 auto;
    height: min-content;
  }
}
</style>
