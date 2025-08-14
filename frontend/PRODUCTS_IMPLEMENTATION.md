# Products API Implementation

## Overview
The ProductsPage component implements comprehensive product listing functionality with the following features:

## 🔗 API Endpoint
- **URL**: `http://127.0.0.1:8000/store/products/`
- **Method**: GET
- **Environment Variable**: `VITE_API_BASE_URL=http://127.0.0.1:8000`

## 🎯 Features Implemented

### 1. Product Fetching
- Custom hook `useProducts` for data fetching
- Automatic retry and error handling
- Loading states with skeleton UI
- Pagination support

### 2. Search & Filtering
- Real-time search with debouncing (500ms)
- URL-based parameters for bookmarkable searches
- Sort by: Name, Price, Date
- Advanced filters: Price range, availability, collection

### 3. Product Display
- Responsive grid layout (1-4 columns based on screen size)
- Product cards with image placeholders
- Price, stock status, and collection info
- Add to cart and favorite functionality

### 4. User Interactions
- Add to cart with toast notifications
- Like/unlike products (local state)
- Pagination controls
- Search parameter persistence in URL

## 🏗️ Architecture & Best Practices

### Custom Hooks
```jsx
// hooks/useProducts.js - Centralized product data management
const { products, loading, error, pagination, refetch } = useProducts();
```

### Component Structure
```
ProductsPage/
├── ProductFilters - Search, sort, and filter controls
├── ProductGrid - Responsive product layout
└── ProductCard - Individual product display
```

### State Management
- URL search parameters for persistence
- React hooks for local state
- Context API for cart integration
- Error boundaries for graceful failures

### Performance Optimizations
- `useCallback` to prevent unnecessary re-renders
- Debounced search to reduce API calls
- Skeleton loading for better UX
- Lazy loading ready (component structure)

## 🔧 API Integration Details

### Request Parameters
```javascript
{
  search: 'product name',     // Search term
  ordering: 'unit_price',     // Sort field
  page: 1,                    // Pagination
  collection: 2,              // Filter by collection
  min_price: 10,              // Price range
  max_price: 100
}
```

### Response Format
```javascript
{
  count: 25,                  // Total products
  next: "url_to_next_page",   // Pagination
  previous: null,
  results: [
    {
      id: 1,
      title: "Product Name",
      description: "Product description",
      unit_price: "29.99",
      inventory: 10,
      collection: 2,
      last_update: "2025-08-13T..."
    }
  ]
}
```

### Error Handling
- Network errors with retry option
- 404/500 server errors
- CORS configuration in Django
- Toast notifications for user feedback

## 🎨 UI/UX Features

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Touch-friendly interactions

### Loading States
- Skeleton cards during initial load
- Button loading states
- Pagination loading

### Error States
- Network error recovery
- Empty state messaging
- Graceful degradation

## 📱 Mobile Optimization
- Touch-friendly buttons
- Optimized grid layouts
- Swipe-friendly cards
- Accessible tap targets

## 🔍 SEO & Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- URL-based state for bookmarking

## 🚀 Future Enhancements
- Virtual scrolling for large lists
- Image lazy loading
- Advanced filtering UI
- Product comparison
- Wishlist persistence
- Social sharing

## 🧪 Testing Ready
- Component isolation
- Mockable API calls
- Error scenario testing
- Performance monitoring hooks
