//Centraliza la autenticación

import axios from "axios";

// Crea la instancia de axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/"
});

// Interceptor de request para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor de response para manejar errores 401
api.interceptors.response.use(
  (response) => response, // Éxito
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      localStorage.clear();
      sessionStorage.clear();
      alert('Sesión expirada. Redirigiendo al login.');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api