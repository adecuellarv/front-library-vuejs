<template>
  <v-col cols="auto" class="div-add-cat">
    <v-btn class="text-none text-subtitle-1" color="#5865f2" size="small" variant="flat" @click="handleShowModal(true)">
      Agregar Categoria <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-col>

  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="cat in categories" :key="cat.categoryId">
      <v-expansion-panel-title @click="handleGetBooks(cat.categoryId)">
        <h3>{{ cat.categoryName }}</h3>

      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-btn class="text-none text-subtitle-1" color="#5865f2" size="small" variant="flat">
          Agregar libro <v-icon dark>mdi-plus</v-icon>
        </v-btn>
        <v-expansion-panel-content>
          <v-data-table :headers="headers" :items="items">
            <template v-slot:[`item.image`]="{ item }">
              <v-img :src="item.bookImage" max-width="100" />
            </template>
            <template v-slot:[`item.download`]="{ item }">
              <v-btn :href="item.bookPdf" target="_blank" color="primary">
                Ver
              </v-btn>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon dark @click="onButtonClick(item.bookId)">mdi-pencil</v-icon>
              <v-icon dark @click="handleDeleteBook(item.bookId, cat.categoryId)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
        <div class="div-delete">
          <v-btn class="text-none text-subtitle-1" color="red" size="small" variant="flat"
            @click="handleDeleteCategory(cat.categoryId)">
            Eliminar esta categoria <v-icon dark>mdi-delete</v-icon>
          </v-btn>
        </div>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
  <template>
    <v-container>
      <CategoryModal v-model:modelValue="modalVisible" @form-submitted="handleFormSubmitted" />
    </v-container>
  </template>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { ca } from 'vuetify/locale';
const apiBaseUrl = 'http://localhost:25365/api/';

const categories = ref([]);

const items = ref([]);

const headers = ref([
  { title: 'Libro', value: 'bookName', key: 'title', },
  { title: 'Imagen', value: 'bookImage', key: 'image', },
  { title: 'Url', value: 'bookPdf', key: 'download', },
  { title: 'Acciones', value: 'actions', key: 'actions', },
]);

const modalVisible = ref(false);

const handleShowModal = (value) => {
  modalVisible.value = true;
}

const handleFormSubmitted = () => {
  fetchCategories();
}

const handleDeleteCategory = async (id) => {
  try {
    await axios.delete(`${apiBaseUrl}category/${id}`);
    await fetchCategories();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}

const handleGetBooks = async (id) => {
  try {
    const response = await axios.get(`${apiBaseUrl}book/${id}`);
    items.value = response?.data;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}

const handleDeleteBook = async (item, cat) => {
  try {
    await axios.delete(`${apiBaseUrl}book/${item}`);
    await handleGetBooks(cat);
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}category/`);
    categories.value = response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
};

onMounted(() => {
  fetchCategories()
});


</script>
<style scoped>
.div-add-cat {
  text-align: right;
  padding: 16px;
  margin-bottom: 20px;
}

.div-delete {
  text-align: right;
  padding: 20px;
}
</style>