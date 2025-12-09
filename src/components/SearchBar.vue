<script setup lang="ts">
const filter = defineModel("filter");
const orderBy = defineModel("orderBy", { default: 'name' });
</script>

<template>
  <div class="filters">
    <div>
      <input type="text" id="search" name='search' placeholder="Search..." v-model="filter" >
    </div>
    <div class="sorting">
      Order By
      <select name="orderBy" id="orderBy" v-model="orderBy">
        <option value="name">Name</option>
        <option value="date">Oldest</option>
        <option value="date-desc">Newest</option>
      </select>
    </div>
  </div>
</template>
