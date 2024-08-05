<template>
  <v-col cols="auto" class="div-add-cat">
    <v-btn class="text-none text-subtitle-1" color="#5865f2" size="small" variant="flat" @click="showModal(true)">
      Agregar Categoria <v-icon dark>mdi-plus</v-icon>
    </v-btn>
  </v-col>

  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="cat in categories" :key="cat.categoryId">
      <v-expansion-panel-title>
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
              <v-icon dark @click="onButtonClick(item.bookId)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-expansion-panel-content>
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



const categories = ref([
  {
    "categoryId": 1,
    "categoryGuid": "73279921-434d-4f03-8d39-289b15d350fe",
    "categoryName": "Syfy",
    "books": null
  },
  {
    "categoryId": 2,
    "categoryGuid": "9d7e55c5-b39d-4fb9-959a-08c5c3474911",
    "categoryName": "Comedia",
    "books": null
  }
]);

const items = ref([
  {
    "bookId": 4,
    "bookName": "Interestelar",
    "bookDescription": "Esta es una descripción del libro",
    "bookImage": "https://i0.wp.com/ensedeciencia.com/wp-content/uploads/2023/05/Copia-de-EdeCiencia-Mexw-C-P-2023-05-02T210102.389.jpg?resize=800%2C451&ssl=1",
    "bookPdf": "C:\\Users\\Usuario\\Documents\\projects\\files-exam\\catalogo_red_de_herrajes.pdf",
    "category": 1
  },
  {
    "bookId": 5,
    "bookName": "Star Wars",
    "bookDescription": "Esta es una descripción del libro",
    "bookImage": "https://i.blogs.es/1da08b/1366_2000-9-/1366_2000.jpeg",
    "bookPdf": "C:\\Users\\Usuario\\Documents\\projects\\files-exam\\catalogo_red_de_herrajes.pdf",
    "category": 1
  }
]);

const headers = ref([
  { title: 'Libro', value: 'bookName', key: 'title', },
  { title: 'Imagen', value: 'bookImage', key: 'image', },
  { title: 'Url', value: 'bookPdf', key: 'download', },
  { title: 'Acciones', value: 'actions', key: 'actions', },
]);

const modalVisible = ref(false);

const showModal = (value) => {
  modalVisible.value = true;
}

const handleFormSubmitted = () => {
  
}

const onButtonClick = (item) => {
  console.log('click on ' + item)
}

const fetchCategories = async () => {
  try {
    //const response = await axios.get('https://api.example.com/categories');
    //categories.value = response.data;
  } catch (error) {
    //console.error('Error fetching categories:', error);
  }
};

onMounted(() => {
  fetchCategories();
});

</script>
<style scoped>
.div-add-cat {
  text-align: right;
  padding: 16px;
  margin-bottom: 20px;
}
</style>