import axios from 'axios';

const apiBaseUrl = import.meta.env.VITE_BASE_URL;

const axiosInstance = axios.create({
  baseURL: apiBaseUrl,
});

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      console.error('Error del servidor:', error.response.data);
      alert(`Error: ${error.response.data.message || 'Error desconocido'}`);
    } else if (error.request) {
      console.error('No se recibió respuesta:', error.request);
      alert('Error: No se recibió respuesta del servidor.');
    } else {
      console.error('Error al configurar la solicitud:', error.message);
      alert(`Error: ${error.message}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
