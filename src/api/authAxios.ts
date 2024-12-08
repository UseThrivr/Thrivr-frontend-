// src/api/authAxios.ts
import axios from 'axios';
import { getToken, removeToken } from './tokenService';

const authAxios = axios.create({
  baseURL: 'https://thrivr.onrender.com/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token to requests
authAxios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle unauthorized errors
authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired, remove it and redirect to login
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default authAxios;