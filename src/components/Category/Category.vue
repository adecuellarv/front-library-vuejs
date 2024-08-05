<template>
  <v-expansion-panels v-for="item in categories" :key="item.categoryId">
    <v-expansion-panel :title="item.categoryName">
      <v-expansion-panel-text>
        <v-data-table :headers="headers" :items="items"></v-data-table>


      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import useCategories from './useCategories';

const { categories } = useCategories();
const { headers } = useCategories();
const { items } = useCategories();
</script>