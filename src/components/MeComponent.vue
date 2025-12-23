<script setup lang="ts">
import { motion } from 'motion-v'
import { computed } from 'vue'
import insta from '@/logos/instagram.svg'
import github from '@/logos/github.svg'

const isEnglish = computed(() => navigator.language.startsWith('en'))
const isHungarian = computed(() => navigator.language.startsWith('hu'))
</script>

<template>
  <div class="grid Me">
    <div class="titleBlock">
      <div class="frontTitle">
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          :viewport="{ once: true }"
        >
          <div class="title" v-if="isEnglish">Husband Material</div>
          <div class="title" v-if="isHungarian">Legényfogó</div>
        </motion.div>
        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          :viewport="{ once: true }"
        >
          <a href="https://www.instagram.com/evilexcuse/" class="minilogo">
            <img :src="insta" alt="" width="24" height="24" />
          </a>
          <a href="https://github.com/kiskovi97" class="minilogo">
            <img :src="github" alt="" width="24" height="24" />
          </a>
        </motion.div>
      </div>
    </div>
    <div class="description">
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <h1 v-if="isHungarian">"Most már férjhez mehetsz"</h1>
        <h1 v-if="isEnglish">"You can get married now"</h1>
      </motion.div>
      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
      >
        <div v-if="isHungarian">
          Van egy olyan mondás miszerint, ha egy étel igazán jól sikerül, akkor azt szokás mondani
          "most már férjhez mehetsz". Mivel mi is megkaptuk ezt már egy párszor, úgy gondoltuk
          megosztjuk veletek azokat a recepteket, amelyekkel ti is hasonló sikert érhettek el.
        </div>
        <div v-if="isEnglish">
          When you cook a really good meal in Hungary, than you often get the compliment: "You can
          get married now". We got this a couple of times, so we thaught we should share the recipes
          that earned this compliment. Please enjoy and feel free to contact us how your experiences
          went.
        </div>
        <div class="names">Gergő & Mark</div>
      </motion.div>
    </div>
  </div>
</template>

<style scoped>
.Me {
  border-radius: 1em;
}

.person {
  height: 30em;
  width: 30em;
  object-fit: scale-down;
  bottom: -3em;
  left: 10em;
  z-index: 0;
  position: absolute;
}

.person img {
  height: 30em;
  width: 30em;
  object-fit: scale-down;
}

.frontTitle {
  position: relative;
  z-index: 1;
}

.title {
  font-size: 7em;
  font-weight: bold;
  line-height: 1em;
  margin-bottom: 0.5em;
}

.titleBlock {
  height: 20em;
  width: 30em;
}

div.description {
  max-width: 30em;
}

div.description .names {
  padding: 1em;
  padding-right: 0;
  text-align: right;
}

@media only screen and (max-width: 90em) {
  .title {
    font-size: 8em;
  }

  .Me div.description {
    height: 0;
    font-size: 0;
  }
}

@media only screen and (max-width: 60em) {
  .person {
    height: 0;
    width: 0;
    object-fit: scale-down;
    bottom: -3em;
    left: 10em;
    z-index: 0;
    position: absolute;
  }

  .person img {
    height: 0;
    width: 0;
  }

  .title {
    font-size: 3em;
    text-align: center;
  }
  .titleBlock {
    width: unset;
    height: unset;
  }

  .logos {
    width: max-content;
    margin: auto;
  }
}
</style>
