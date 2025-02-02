import axios from 'axios';

const api = axios.create({
  baseURL: 'http://45.138.158.137:92/api/',
});

api.interceptors.request.use((config) => {
  const data = JSON.parse(localStorage.getItem('data') || '{}');
  if (data) {
    config.headers.Authorization = `Bearer ${data}`;
  }
  return config;
});

export default api;
