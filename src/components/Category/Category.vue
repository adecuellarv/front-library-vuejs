<template>
  <v-expansion-panels
  v-for="item in categories"
  :key="item.categoryId"
  >
    <v-expansion-panel
      :title="item.categoryName"
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima"
    >
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
  import { ref, onMounted } from 'vue';
  import useCategories from './useCategories';

  const { categories } = useCategories();
</script>