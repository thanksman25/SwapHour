import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Otomatis sisipkan Authorization header dari localStorage
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('swaphour_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response error global
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('swaphour_token');
      localStorage.removeItem('swaphour_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
