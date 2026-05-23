import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  logout: async () => {
    // In a real app, you might want to call a logout endpoint
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  },
};

// Services API
export const servicesAPI = {
  getServices: async (params = {}) => {
    const response = await api.get('/admin/services', { params });
    return response.data;
  },
  getService: async (id: string) => {
    const response = await api.get(`/admin/services/${id}`);
    return response.data;
  },
  createService: async (data: any) => {
    const response = await api.post('/admin/services', data);
    return response.data;
  },
  updateService: async (id: string, data: any) => {
    const response = await api.put(`/admin/services/${id}`, data);
    return response.data;
  },
  deleteService: async (id: string) => {
    const response = await api.delete(`/admin/services/${id}`);
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
  getUser: async (id: string) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },
  createUser: async (data: any) => {
    const response = await api.post('/admin/users', data);
    return response.data;
  },
  updateUser: async (id: string, data: any) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};

// Blog Posts API
export const blogAPI = {
  getPosts: async (params = {}) => {
    const response = await api.get('/admin/posts', { params });
    return response.data;
  },
  getPost: async (id: string) => {
    const response = await api.get(`/admin/posts/${id}`);
    return response.data;
  },
  createPost: async (data: any) => {
    const response = await api.post('/admin/posts', data);
    return response.data;
  },
  updatePost: async (id: string, data: any) => {
    const response = await api.put(`/admin/posts/${id}`, data);
    return response.data;
  },
  deletePost: async (id: string) => {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  },
};

export default api;
