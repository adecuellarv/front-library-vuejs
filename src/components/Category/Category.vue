<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="cat in categories" :key="cat.categoryId">
      <v-expansion-panel-title>
        <div class="custom-header-pexpasion">
          {{ cat.categoryName }}
        </div>
      </v-expansion-panel-title>
      <v-expansion-panel-content>
        <v-data-table :headers="headers" :items="items">
          <template v-slot:[`item.image`]="{ item }">
            <v-img :src="item.bookImage" max-width="100" />
          </template>
          <template v-slot:[`item.download`]="{ item }">
            <v-btn :href="item.bookPdf" target="_blank" color="primary">
              Descargar
            </v-btn>
          </template>
        </v-data-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script setup>
import useCategories from './useCategories';

const { categories } = useCategories();
const { headers } = useCategories();
const { items } = useCategories();
</script>
<style scoped>
.custom-header-pexpasion {
  background-color: #ff5722;
  color: #fff;
  font-size: 18px;
  padding: 16px;
}
</style>