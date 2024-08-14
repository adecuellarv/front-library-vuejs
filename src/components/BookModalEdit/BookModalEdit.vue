<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Editar libro</span>
      </v-card-title>
      <v-card-subtitle>
        <v-form v-model="valid" ref="form" @submit.prevent="submitForm">
          <v-text-field v-model="bookName" label="Nombre del Libro" required
            :rules="[rules.required, rules.bookNameMinLength, rules.bookNameMaxLength]"></v-text-field>

          <v-textarea v-model="bookDescription" label="Descripción del Libro" required
            :rules="[rules.required, rules.bookDescriptionMinLength, rules.bookDescriptionMaxLength]"></v-textarea>


          <v-file-input label="Cargar Imagen del Libro" @change="handleFileUpload('image', $event)"
            accept="image/*" :rules="[rules.required, rules.imageUploaded, rules.maxFileSize(10)]"></v-file-input>

          <v-file-input label="Cargar PDF del Libro" @change="handleFileUpload('pdf', $event)"
            accept=".pdf" :rules="[rules.required, rules.pdfUploaded, rules.maxFileSize(20)]" ></v-file-input>

          <v-text-field v-model="CategoryId" type="hidden"></v-text-field>

          <div class="div-send">
            <v-btn type="submit" color="primary" size="large">Enviar</v-btn>
          </div>
        </v-form>
      </v-card-subtitle>
      <v-card-actions>

      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { ref, onMounted, watch } from 'vue';
import axios from '../../axios';
export default {
  props: ['objprops', 'successAddBook'],
  setup(props) {

    const bookName = ref('');
    const bookDescription = ref('');
    const bookImageFile = ref(null);
    const bookPdfFile = ref(null);
    const categoryId = ref(null);
    const valid = ref(false);
    const id = ref(false);

    const rules = {
      required: v => !!v || 'Este campo es obligatorio',
      bookNameMinLength: v => v.length >= 3 || 'Debe tener al menos 3 caracteres',
      bookNameMaxLength: v => v.length <= 20 || 'No puede exceder 20 caracteres',
      bookDescriptionMinLength: v => v.length >= 3 || 'Debe tener al menos 3 caracteres',
      bookDescriptionMaxLength: v => v.length <= 50 || 'No puede exceder 50 caracteres',
      maxFileSize: maxMB => v => {
        if (!v || v.length === 0) return true;
        const file = v[0]; 
        if (!(file instanceof File)) return true;
        const fileSizeMB = file.size / (1024 * 1024);
        return fileSizeMB <= maxMB || `El archivo no puede exceder ${maxMB} MB`;
      },
    };

    watch(() => props.objprops, (newVal) => {
      if (newVal) {
        bookName.value = newVal.bookName || '';
        bookDescription.value = newVal.bookDescription || '';
        categoryId.value = newVal.categoryId || '';
        id.value = newVal.bookId || '';
      }
    }, { immediate: true });

    const handleFileUpload = (type, event) => {
      const file = event.target.files[0];
      if (type === 'image') {
        bookImageFile.value = file;
      } else if (type === 'pdf') {
        bookPdfFile.value = file;
      }
    };

    const submitForm = async () => {
      if (valid.value) {
        const formData = new FormData();
        formData.append('BookName', bookName.value);
        formData.append('BookDescription', bookDescription.value);
        formData.append('BookImage', 'test');
        formData.append('BookPdf', 'test');
        formData.append('CategoryId', categoryId.value);
        console.log('#id.value', id.value, categoryId.value)

        if (bookImageFile.value) {
          formData.append('BookImageFile', bookImageFile.value);
        }
        if (bookPdfFile.value) {
          formData.append('BookPdfFile', bookPdfFile.value);
        }

        try {
          const response = await axios.put(`book/${id.value}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          props.successAddBook(categoryId.value)
          console.log('Libro enviado:', response.data);
        } catch (error) {
          console.error('Error al enviar el libro:', error);
        }
      }
    };

    return {
      bookName,
      bookDescription,
      bookImageFile,
      bookPdfFile,
      valid,
      rules,
      handleFileUpload,
      submitForm,
    };
  },
};
</script>
<style scoped>
.div-send {
  text-align: right;
}
</style>
