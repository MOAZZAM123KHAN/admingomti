// import axios from 'axios';

// const API = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Add token to requests
// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('adminToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Handle responses
// API.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('adminToken');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default API;

import axios from 'axios';

// Vite uses import.meta.env instead of process.env
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;
