import axios from 'axios';

// API Configuration - Change this URL when deploying to production
// Local development: http://localhost:5000/api
// Production: https://your-backend-url.com/api
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with base URL and headers
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
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

// ============================================
// API CONNECTION: Authentication Endpoints
// Backend: /auth/login, /auth/register, /auth/me
// ============================================
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  register: async (email: string, password: string, name?: string) => {
    const response = await api.post('/auth/register', { email, password, name });
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

// ============================================
// API CONNECTION: Services Management Endpoints
// Backend: /admin/services
// ============================================
export const servicesAPI = {
  getServices: async (params = {}) => {
    const response = await api.get('/admin/services', { params });
    return response.data;
  },
  getService: async (id: string) => {
    const response = await api.get(`/admin/services/${id}`);
    return response.data;
  },
  createService: async (data: unknown) => {
    const response = await api.post('/admin/services', data);
    return response.data;
  },
  updateService: async (id: string, data: unknown) => {
    const response = await api.put(`/admin/services/${id}`, data);
    return response.data;
  },
  deleteService: async (id: string) => {
    const response = await api.delete(`/admin/services/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: Users Management Endpoints
// Backend: /admin/users
// ============================================
export const usersAPI = {
  getUsers: async (params = {}) => {
    const response = await api.get('/admin/users', { params });
    return response.data;
  },
  getUser: async (id: string) => {
    const response = await api.get(`/admin/users/${id}`);
    return response.data;
  },
  createUser: async (data: unknown) => {
    const response = await api.post('/admin/users', data);
    return response.data;
  },
  updateUser: async (id: string, data: unknown) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },
  deleteUser: async (id: string) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: Blog Posts Management Endpoints
// Backend: /admin/posts
// ============================================
export const blogAPI = {
  getPosts: async (params = {}) => {
    const response = await api.get('/admin/posts', { params });
    return response.data;
  },
  getPost: async (id: string) => {
    const response = await api.get(`/admin/posts/${id}`);
    return response.data;
  },
  createPost: async (data: unknown) => {
    const response = await api.post('/admin/posts', data);
    return response.data;
  },
  updatePost: async (id: string, data: unknown) => {
    const response = await api.put(`/admin/posts/${id}`, data);
    return response.data;
  },
  deletePost: async (id: string) => {
    const response = await api.delete(`/admin/posts/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: Contact Form Endpoints
// Backend: /contact
// ============================================
export const contactAPI = {
  submitContact: async (data: { name: string; email: string; message: string }) => {
    const response = await api.post('/contact', data);
    return response.data;
  },
  getContacts: async (params = {}) => {
    const response = await api.get('/contact', { params });
    return response.data;
  },
  deleteContact: async (id: string) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: Slider Updates Management Endpoints
// Backend: /slider-updates
// ============================================
export const sliderUpdatesAPI = {
  getSliderUpdates: async (params = {}) => {
    const response = await api.get('/slider-updates/admin/all', { params });
    return response.data;
  },
  getSliderUpdate: async (id: string) => {
    const response = await api.get(`/slider-updates/${id}`);
    return response.data;
  },
  createSliderUpdate: async (data: unknown) => {
    const response = await api.post('/slider-updates', data);
    return response.data;
  },
  updateSliderUpdate: async (id: string, data: unknown) => {
    const response = await api.put(`/slider-updates/${id}`, data);
    return response.data;
  },
  deleteSliderUpdate: async (id: string) => {
    const response = await api.delete(`/slider-updates/${id}`);
    return response.data;
  },
  toggleSliderUpdate: async (id: string) => {
    const response = await api.patch(`/slider-updates/${id}/toggle`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: Projects Management Endpoints
// Backend: /admin/projects
// ============================================
export const projectsAPI = {
  getProjects: async (params = {}) => {
    const response = await api.get('/admin/projects', { params });
    return response.data;
  },
  getProject: async (id: string) => {
    const response = await api.get(`/admin/projects/${id}`);
    return response.data;
  },
  createProject: async (data: unknown) => {
    const response = await api.post('/admin/projects', data);
    return response.data;
  },
  updateProject: async (id: string, data: unknown) => {
    const response = await api.put(`/admin/projects/${id}`, data);
    return response.data;
  },
  deleteProject: async (id: string) => {
    const response = await api.delete(`/admin/projects/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: 3D Print Orders
// Backend: /print-orders
// ============================================
export const printOrdersAPI = {
  submitOrder: async (data: unknown) => {
    const response = await api.post('/print-orders', data);
    return response.data;
  },
  getOrders: async () => {
    const response = await api.get('/print-orders');
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/print-orders/${id}/status`, { status });
    return response.data;
  },
  deleteOrder: async (id: string) => {
    const response = await api.delete(`/print-orders/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: PCB Orders
// Backend: /pcb-orders
// ============================================
export const pcbOrdersAPI = {
  submitOrder: async (data: unknown) => {
    const response = await api.post('/pcb-orders', data);
    return response.data;
  },
  getOrders: async () => {
    const response = await api.get('/pcb-orders');
    return response.data;
  },
  updateStatus: async (id: string, status: string) => {
    const response = await api.patch(`/pcb-orders/${id}/status`, { status });
    return response.data;
  },
  deleteOrder: async (id: string) => {
    const response = await api.delete(`/pcb-orders/${id}`);
    return response.data;
  },
};

// ============================================
// API CONNECTION: Custom Product Requests
// Backend: /custom-requests
// ============================================
export const customRequestsAPI = {
  submitRequest: async (data: unknown) => {
    const response = await api.post('/custom-requests', data);
    return response.data;
  },
  getRequests: async () => {
    const response = await api.get('/custom-requests');
    return response.data;
  },
  updateStatus: async (id: string, status: string, adminNotes?: string) => {
    const response = await api.patch(`/custom-requests/${id}/status`, { status, adminNotes });
    return response.data;
  },
  deleteRequest: async (id: string) => {
    const response = await api.delete(`/custom-requests/${id}`);
    return response.data;
  },
};

export default api;

