import axios from 'axios';
import { API_ENDPOINTS } from '../types/api.js';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${api.defaults.baseURL}${API_ENDPOINTS.AUTH.REFRESH}`,
            { refresh: refreshToken }
          );
          
          const { access } = response.data;
          localStorage.setItem('access_token', access);
          
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (credentials) => {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },
  
  register: async (userData) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    return response.data;
  },
  
  getCurrentUser: async () => {
    const response = await api.get(API_ENDPOINTS.AUTH.USER_ME);
    return response.data;
  },
  
  refreshToken: async (refreshToken) => {
    const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, {
      refresh: refreshToken,
    });
    return response.data;
  },
};

// Products API
export const productsAPI = {
  getProducts: async (params = {}) => {
    const response = await api.get(API_ENDPOINTS.STORE.PRODUCTS, { params });
    return response.data;
  },
  
  getProduct: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.PRODUCTS}${id}/`);
    return response.data;
  },
  
  createProduct: async (productData) => {
    const response = await api.post(API_ENDPOINTS.STORE.PRODUCTS, productData);
    return response.data;
  },
  
  updateProduct: async (id, productData) => {
    const response = await api.patch(`${API_ENDPOINTS.STORE.PRODUCTS}${id}/`, productData);
    return response.data;
  },
  
  deleteProduct: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.STORE.PRODUCTS}${id}/`);
    return response.data;
  },
  
  getProductReviews: async (productId) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.PRODUCTS}${productId}/reviews/`);
    return response.data;
  },
  
  createProductReview: async (productId, reviewData) => {
    const response = await api.post(`${API_ENDPOINTS.STORE.PRODUCTS}${productId}/reviews/`, reviewData);
    return response.data;
  },
};

// Collections API
export const collectionsAPI = {
  getCollections: async () => {
    const response = await api.get(API_ENDPOINTS.STORE.COLLECTIONS);
    return response.data;
  },
  
  getCollection: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.COLLECTIONS}${id}/`);
    return response.data;
  },
  
  createCollection: async (collectionData) => {
    const response = await api.post(API_ENDPOINTS.STORE.COLLECTIONS, collectionData);
    return response.data;
  },
  
  updateCollection: async (id, collectionData) => {
    const response = await api.patch(`${API_ENDPOINTS.STORE.COLLECTIONS}${id}/`, collectionData);
    return response.data;
  },
  
  deleteCollection: async (id) => {
    const response = await api.delete(`${API_ENDPOINTS.STORE.COLLECTIONS}${id}/`);
    return response.data;
  },
};

// Cart API
export const cartAPI = {
  getCart: async (cartId) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.CART}${cartId}/`);
    return response.data;
  },
  
  createCart: async () => {
    const response = await api.post(API_ENDPOINTS.STORE.CART);
    return response.data;
  },
  
  deleteCart: async (cartId) => {
    const response = await api.delete(`${API_ENDPOINTS.STORE.CART}${cartId}/`);
    return response.data;
  },
  
  getCartItems: async (cartId) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.CART}${cartId}/items/`);
    return response.data;
  },
  
  addCartItem: async (cartId, itemData) => {
    const response = await api.post(`${API_ENDPOINTS.STORE.CART}${cartId}/items/`, itemData);
    return response.data;
  },
  
  updateCartItem: async (cartId, itemId, itemData) => {
    const response = await api.patch(`${API_ENDPOINTS.STORE.CART}${cartId}/items/${itemId}/`, itemData);
    return response.data;
  },
  
  deleteCartItem: async (cartId, itemId) => {
    const response = await api.delete(`${API_ENDPOINTS.STORE.CART}${cartId}/items/${itemId}/`);
    return response.data;
  },
};

// Orders API
export const ordersAPI = {
  getOrders: async () => {
    const response = await api.get(API_ENDPOINTS.STORE.ORDERS);
    return response.data;
  },
  
  getOrder: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.ORDERS}${id}/`);
    return response.data;
  },
  
  createOrder: async (orderData) => {
    const response = await api.post(API_ENDPOINTS.STORE.ORDERS, orderData);
    return response.data;
  },
  
  updateOrder: async (id, orderData) => {
    const response = await api.patch(`${API_ENDPOINTS.STORE.ORDERS}${id}/`, orderData);
    return response.data;
  },
};

// Customers API
export const customersAPI = {
  getCustomers: async () => {
    const response = await api.get(API_ENDPOINTS.STORE.CUSTOMERS);
    return response.data;
  },
  
  getCustomer: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.CUSTOMERS}${id}/`);
    return response.data;
  },
  
  getCurrentCustomer: async () => {
    const response = await api.get(`${API_ENDPOINTS.STORE.CUSTOMERS}me/`);
    return response.data;
  },
  
  updateCurrentCustomer: async (customerData) => {
    const response = await api.put(`${API_ENDPOINTS.STORE.CUSTOMERS}me/`, customerData);
    return response.data;
  },
  
  getCustomerHistory: async (id) => {
    const response = await api.get(`${API_ENDPOINTS.STORE.CUSTOMERS}${id}/history/`);
    return response.data;
  },
};

export default api;
