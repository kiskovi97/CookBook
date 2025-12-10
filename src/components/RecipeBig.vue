<template>
  <div class="receipt">
    <div class="main">
      <div class="details">
        <h1 class="title">{{ proj.title }}</h1>
        <div class="tags">
          <div v-for="tag in proj.tags" :key="tag" class="tag">
            <RouterLink :to="'/search?filter=' + tag">{{ tag }}</RouterLink>
          </div>
        </div>
        <div>{{ proj.details }}</div>
        <div v-if="proj.sources && proj.sources.length > 0">Források:</div>
        <div v-for="source in proj.sources" :key="source.link">
          <a :href="source.link" target="_blank" rel="noreferrer">{{ source.name }}</a>
        </div>
      </div>
      <div class="image">
        <img :src="imageLink ?? ''" :alt="proj.title" class="background" width="526" height="526" />
      </div>
      <div class="edit_icon" v-if="user">
        <RouterLink :to="`/recipe/${proj.id}/edit`">
          <img :src="edit_icon" alt="Edit" class="minilogo" width="32" height="32" />
        </RouterLink>
      </div>
    </div>
    <div class="description">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <div v-for="station in proj.ingredients" :key="station.title">
          <h3>{{ station.title }}</h3>
          <div>
            <li v-for="(element, index) in station.list" :key="index">{{ element }}</li>
          </div>
        </div>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <div>
          <li v-for="(station, index) in proj.instructions" :key="index">{{ station }}</li>
        </div>
      </motion.div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v'
import type { Recipe } from '@/types/recipe'
import { computed } from 'vue'
import { useCurrentUser } from 'vuefire'
import edit_icon from '@/logos/edit-icon.png'

const props = defineProps<{
  proj: Recipe
}>()

const user = useCurrentUser()

const imageLink = computed(
  () =>
    props.proj?.image?.replace(
      '/CookBook/static/media',
      'https://kiskovi97.github.io/CookBook/images',
    ) ?? '',
)
</script>

<style scoped>
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
