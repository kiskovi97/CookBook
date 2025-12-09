<template>
  <div v-if="!hidden">
    <motion.div
    :initial="{ opacity: 0, y: 20 }"
    :whileInView="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.6 }"
    :viewport="{ once: true }"
    >
    <RouterLink class="receipt" :to="'/recepie/' + proj.id" >
      <div class="image" >
        <img :src="imageLink" v-if="imageLink" alt="" class="background" width="256" height="256" />
      </div>
      <div class="description" >
        <div class="title">{{ proj.title }}</div>
        <div class="details">{{ proj.details }}</div>
      </div>
    </RouterLink>
  </motion.div>
</div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { motion } from 'motion-v';
import type { Recipe } from '@/types/recipe';
import { computed } from 'vue';

const props = defineProps<{
  proj: Recipe;
  hidden: boolean;
}>();

const imageLink = computed(() => props.proj?.image?.replace("/CookBook/static/media", "https://kiskovi97.github.io/CookBook/images") ?? "");
</script>

<style scoped>
  .receipt {
    margin: 0 auto;
    position: relative;
    display: flex;
    flex-direction: column;
    width: 15em;
    overflow: hidden;
    filter: drop-shadow(0px 5px 5px rgba(34, 34, 34, 0.11));
    text-decoration: none;
    color: var(--darkestColor);
}

.receipt:hover {
    cursor: pointer;
    filter: drop-shadow(0px 0px 10px #ffffff);
}

.receipt .image {
    width: 15em;
    height: 12em;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    overflow: hidden;
    filter: drop-shadow(0px 5px 10px rgba(99, 2, 2, 0.199));
}

.receipt > div > img.background {
    width: 15em;
    height: 12em;
    object-fit: cover;
    filter: none ;
}

.receipt .title {
    font-weight: 700;
    margin-bottom: 0.5em;
}

.receipt .description {
    padding: 1em;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-evenly;
}

.receipt .description .details {
    font-size: small;
    line-height: 20px;
    max-height: 4rem;
    overflow: hidden;
    text-overflow: ellipsis;
}

@media only screen and (max-width: 80em) {

    .receipt {
        font-size: 0.9em;
    }

    .receipt .details {
        font-size: 0;
        padding: 0;
        margin: 0;
    }
}



@media only screen and (max-width: 60em) {

    .receipt {
        display: grid;
        grid-template-columns: 8rem 1fr;
        width: 100%;
    }

    .receipt .image {
        width: 8em;
        height: 8em;
        border-top-left-radius: 1em;
        border-bottom-left-radius: 1em;
        border-top-right-radius: 1em;
        border-bottom-right-radius: 1em;
        overflow: hidden;
        filter: drop-shadow(0px 5px 10px rgba(99, 2, 2, 0.199));
    }

    .receipt .description{
        padding: 0;
    }

    .receipt .description .details {
        font-size: 0.7rem;
        max-width: 15rem;
        line-height: 0.8rem;
    }

    .receipt .title {
        font-size: 0.9rem;
        line-height: 1rem;
    }

    .receipt > div > img.background {
        width: 8em;
        height: 8em;
        object-fit: cover;
        filter: none ;
    }
}
</style>
