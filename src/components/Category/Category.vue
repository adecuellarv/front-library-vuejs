<template>
  <v-col cols="auto" class="div-add-cat">
    <v-btn class="text-none text-subtitle-1" color="#5865f2" size="x-large" variant="flat"
      @click="handleShowModal(true)">
      Agregar Categoria <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-col>

  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="cat in categories" :key="cat.categoryId" class="expansion-custom">
      <v-expansion-panel-title @click="handleGetBooks(cat.categoryId)">
        <h1>{{ cat.categoryName }}</h1>

      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <div class="div-add-book">
          <v-btn class="text-none text-subtitle-1" color="#5865f2" size="large" variant="flat"
            @click="handleShowModalAddBook(cat.categoryId)">
            Agregar libro <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </div>
        <v-expansion-panel-content>
          <v-data-table :headers="headers" :items="items" class="table-custom-styles">
            <template v-slot:[`item.title`]="{ item }">
              <h2>{{ item.bookName }}</h2>
            </template>
            <template v-slot:[`item.image`]="{ item }">
              <v-img :src="item.bookImage" max-width="100" />
            </template>
            <template v-slot:[`item.download`]="{ item }">
              <v-btn :href="item.bookPdf" target="_blank" color="primary">
                Ver
              </v-btn>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-icon dark @click="handleEditBook(item)">mdi-pencil</v-icon>
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
  <template>
    <v-container>
      <BookModal v-model="modalAddBookVisible" :catid="catid" :success-add-book="successAddBook"
        @form-submitted="handleFormSubmittedAddBook" />
    </v-container>
  </template>
  <template>
    <v-container>
      <BookModalEdit v-model="modalEditBookVisible" :objprops="objprops" :success-add-book="successAddBook"
        @form-submitted="handleFormSubmittedEditBook" />
    </v-container>
  </template>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from '../../axios';

const categories = ref([]);

//const items = ref([]);
const items = ref([]);

const headers = ref([
  { title: 'Libro', value: 'bookName', key: 'title', },
  { title: 'Imagen', value: 'bookImage', key: 'image', },
  { title: 'Url', value: 'bookPdf', key: 'download', },
  { title: 'Acciones', value: 'actions', key: 'actions', },
]);

const modalVisible = ref(false);
const modalAddBookVisible = ref(false);
const modalEditBookVisible = ref(false);
const catid = ref("");
const bookid = ref("");
const objprops = ref({});

const handleShowModal = (value) => {
  modalVisible.value = true;
}

const handleShowModalAddBook = (idcatparent) => {
  modalAddBookVisible.value = true;
}

const handleFormSubmitted = () => {
  fetchCategories();
}

const handleFormSubmittedAddBook = () => {
  //fetchCategories();
}

const handleFormSubmittedEditBook = () => {

}

const successAddBook = (id) => {
  modalAddBookVisible.value = false;
  modalEditBookVisible.value = false;
  handleGetBooks(id);
}

const handleDeleteCategory = async (id) => {
  try {
    await axios.delete(`category/${id}`);
    await fetchCategories();
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}

const handleGetBooks = async (id) => {
  catid.value = id;
  try {
    const response = await axios.get(`book/${id}`);
    items.value = response?.data;
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}

const handleDeleteBook = async (item, cat) => {
  try {
    await axios.delete(`book/${item}`);
    await handleGetBooks(cat);
  } catch (error) {
    console.error('Error al enviar el formulario:', error);
  }
}

const handleEditBook = (item) => { 
  objprops.value = { ...item };
  //bookid.value = id;
  modalEditBookVisible.value = true
}

const fetchCategories = async () => {
  try {
    const response = await axios.get(`category/`);
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

.expansion-custom {
  padding: 20px;
  background: #eee;
}

.table-custom-styles {
  box-shadow: 10px 10px 17px -10px rgba(0, 0, 0, 0.75);
  border: 1px solid #dbdada;
  border-radius: 10px;
}
.div-add-book{
  text-align: right;
  margin-bottom: 20px;
}
</style>