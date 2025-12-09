<script setup lang="ts">
  import Navbar from '@/components/NavBar.vue'
  import MeComponent from '@/components/MeComponent.vue'
  import DishList from '@/components/RecepieList.vue';
</script>

<template>
  <Navbar search/>
  <div class="page">
    <MeComponent />
    <DishList tag="" filter="" :maxCount="7" orderBy="date-desc" />
  </div>
</template>
