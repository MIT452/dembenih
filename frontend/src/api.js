import axios from 'axios';

const VITE_API_URL = import.meta.env.VITE_API_URL || 'https://dembenih.onrender.com';
const base = VITE_API_URL.endsWith('/') ? VITE_API_URL.slice(0, -1) : VITE_API_URL;
const api = axios.create({
  baseURL: `${base}/api`,
  withCredentials: true,
});

export default api;
