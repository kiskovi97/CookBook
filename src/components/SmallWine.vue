<template>
  <div v-if="!hidden">
    <motion.div
      :initial="{ opacity: 0, y: 20 }"
      :whileInView="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.6 }"
      :viewport="{ once: true }"
    >
      <RouterLink class="wine" :to="'/wine/' + data.id + '/edit'">
        <div class="image">
          <img
            :src="imageLink"
            v-if="imageLink"
            alt=""
            class="background"
            width="256"
            height="256"
          />
        </div>
        <div class="description">
          <div class="title">{{ data.title }}</div>
          <div class="details">{{ data.details }}</div>
          <div class="tags">
            <div v-for="tag in data.tags" :key="tag" class="tag">
              {{ tag }}
            </div>
          </div>
        </div>
      </RouterLink>
    </motion.div>
  </div>
</template>

<script setup lang="ts">
import { motion } from 'motion-v'
import type { Wine } from '@/types/recipe'
import { computed } from 'vue'

const props = defineProps<{
  data: Wine
  hidden: boolean
}>()

const imageLink = computed(
  () =>
    props.data?.image?.replace(
      '/CookBook/static/media',
      'https://kiskovi97.github.io/CookBook/images',
    ) ?? '',
)
</script>

<style scoped>
.wine {
  margin: 0 auto;
  position: relative;
  display: grid;
  grid-template-columns: 4em 1fr;
  width: 20em;
  overflow: hidden;
  filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.11));
  text-decoration: none;
  color: var(--darkestColor);
}

.wine:hover {
  cursor: pointer;
  filter: drop-shadow(0px 0px 10px #ffffff);
}

.wine .image {
  width: 100%;
  height: 100%;
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
  overflow: hidden;
  filter: drop-shadow(0px 5px 10px rgba(99, 2, 2, 0.199));
}

.wine > div > img.background {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: none;
}

.wine .title {
  font-weight: 700;
  margin-bottom: 0.5em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  font-size: small;
  width: 100%;
  gap: 0.2rem;
}

.tag {
  padding: 0rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  display: inline;
  background-color: var(--mainColor);
  color: white;
  border-radius: 0.5rem;
}

.wine .description {
  padding: 1em;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-evenly;
}

.wine .description .details {
  font-size: small;
  line-height: 20px;
  max-height: 4rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media only screen and (max-width: 80em) {
  .wine {
    font-size: 0.9em;
  }

  .wine .details {
    font-size: 0;
    padding: 0;
    margin: 0;
  }
}

@media only screen and (max-width: 60em) {
  .wine {
    display: grid;
    grid-template-columns: 8rem 1fr;
    width: 100%;
  }

  .wine .image {
    width: 8em;
    height: 8em;
    border-top-left-radius: 1em;
    border-bottom-left-radius: 1em;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em;
    overflow: hidden;
    filter: drop-shadow(0px 5px 10px rgba(99, 2, 2, 0.199));
  }

  .wine .description {
    padding: 0;
  }

  .wine .description .details {
    font-size: 0.7rem;
    max-width: 15rem;
    line-height: 0.8rem;
  }

  .wine .title {
    font-size: 0.9rem;
    line-height: 1rem;
  }

  .wine > div > img.background {
    width: 8em;
    height: 8em;
    object-fit: cover;
    filter: none;
  }
}
</style>
