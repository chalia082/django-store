// API Response Types based on Django backend analysis

// Product Types
export const ProductTypes = {
  Product: {
    id: 'number',
    title: 'string',
    slug: 'string',
    description: 'string',
    unit_price: 'number',
    inventory: 'number',
    last_update: 'string',
    collection: 'number',
    promotions: 'array'
  },
  
  Collection: {
    id: 'number',
    title: 'string',
    featured_product: 'number',
    products_count: 'number'
  },

  // Customer Types
  Customer: {
    id: 'number',
    phone: 'string',
    birth_date: 'string',
    membership: 'string', // 'B', 'S', 'G'
    user: 'number',
    first_name: 'string',
    last_name: 'string'
  },

  // Order Types
  Order: {
    id: 'number',
    placed_at: 'string',
    payment_status: 'string', // 'P', 'C', 'F'
    customer: 'number',
    items: 'array'
  },

  OrderItem: {
    id: 'number',
    product: 'number',
    quantity: 'number',
    unit_price: 'number'
  },

  // Cart Types
  Cart: {
    id: 'string', // UUID
    created_at: 'string',
    items: 'array'
  },

  CartItem: {
    id: 'number',
    product: 'object',
    quantity: 'number',
    total_price: 'number'
  },

  // Review Types
  Review: {
    id: 'number',
    product: 'number',
    name: 'string',
    description: 'string'
  },

  // User Types
  User: {
    id: 'number',
    username: 'string',
    email: 'string',
    first_name: 'string',
    last_name: 'string',
    is_staff: 'boolean'
  }
};

// API Endpoint Constants
export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    LOGIN: '/auth/jwt/create/',
    REFRESH: '/auth/jwt/refresh/',
    VERIFY: '/auth/jwt/verify/',
    REGISTER: '/auth/users/',
    USER_ME: '/auth/users/me/',
  },
  
  // Store endpoints
  STORE: {
    PRODUCTS: '/store/products/',
    COLLECTIONS: '/store/collections/',
    CART: '/store/cart/',
    ORDERS: '/store/orders/',
    CUSTOMERS: '/store/customers/',
  }
};

// Membership choices
export const MEMBERSHIP_CHOICES = {
  B: 'Bronze',
  S: 'Silver',
  G: 'Gold'
};

// Payment status choices
export const PAYMENT_STATUS_CHOICES = {
  P: 'Pending',
  C: 'Complete',
  F: 'Failed'
};
