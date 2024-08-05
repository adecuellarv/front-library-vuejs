import { ref, onMounted } from 'vue';
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
      "bookImage": "C:\\Users\\Usuario\\Documents\\projects\\files-exam\\1.jpg",
      "bookPdf": "C:\\Users\\Usuario\\Documents\\projects\\files-exam\\catalogo_red_de_herrajes.pdf",
      "category": 1
    },
    {
      "bookId": 5,
      "bookName": "Star Wars",
      "bookDescription": "Esta es una descripción del libro",
      "bookImage": "C:\\Users\\Usuario\\Documents\\projects\\files-exam\\1.jpg",
      "bookPdf": "C:\\Users\\Usuario\\Documents\\projects\\files-exam\\catalogo_red_de_herrajes.pdf",
      "category": 1
    }
  ]);

  const headers = ref([
    { title: 'Libro', value: 'bookName', key: 'title', },
    { title: 'Imagen', value: 'bookImage', key: 'image', },
    { title: 'Url', value: 'bookPdf', key: 'download', },
    //{ title: 'Actions', value: 'actions', key: 'actions', sortable: false },
  ]);

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
    headers
  };
}
