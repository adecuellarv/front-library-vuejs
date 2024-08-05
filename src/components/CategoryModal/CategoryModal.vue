<template>
  <v-dialog v-model="internalDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Agregar Categoría</span>
      </v-card-title>
      <v-card-subtitle>
        <v-form ref="form" v-model="valid">
          <v-text-field
            v-model="category.name"
            label="Nombre de la categoría"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-form>
      </v-card-subtitle>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="submitForm">Enviar</v-btn>
        <v-btn text @click="close">Cerrar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from 'axios';
import { fetchCategories } from '../Category/Category'
const apiBaseUrl = 'http://localhost:25365/api/';
export default {
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue', 'form-submitted'],
  data() {
    return {
      valid: false,
      internalDialog: this.modelValue,
      category: {
        name: ''
      },
      rules: {
        required: value => !!value || 'Requerido.'
      }
    };
  },
  watch: {
    modelValue(val) {
      this.internalDialog = val;
    },
    internalDialog(val) {
      this.$emit('update:modelValue', val);
    }
  },
  methods: {
    close() {
      this.internalDialog = false;
    },
    async submitForm() {
      if (this.$refs.form.validate()) {
        try {
          const values = {
            CategoryName: this.category.name
          }
          await axios.post(`${apiBaseUrl}category/`, values);
          await fetchCategories();
          this.close();
          this.$emit('form-submitted');
        } catch (error) {
          console.error('Error al enviar el formulario:', error);
        }
      }
    }
  }
};
</script>
