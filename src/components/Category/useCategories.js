import { ref, onMounted } from 'vue';
import CategoryModal from '../CategoryModal/CategoryModal.vue'
//import axios from 'axios';

export default function useCategories() {
  
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
    //{ title: 'Actions', value: 'actions', key: 'actions', sortable: false },
  ]);

  const modalVisible = ref(false);

  const onButtonClick = (item) => {
    console.log('click on ' + item)
  }

  const showModal = (value) => {
    modalVisible.value = true;
  }

  const handleFormSubmitted = () => {
    console.log('#her')
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

  return {
    categories,
    items,
    headers,
    onButtonClick,
    CategoryModal,
    modalVisible,
    showModal,
    handleFormSubmitted
  };
}
