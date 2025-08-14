# Django E-commerce Backend API Documentation

## Overview
This document provides a comprehensive overview of the Django e-commerce backend API endpoints and their corresponding React frontend implementations.

## Django Backend Analysis

### Models Overview

#### Core Models
- **Product**: Main product entity with title, description, price, inventory
- **Collection**: Product categories/collections
- **Customer**: Extended user model with membership levels
- **Order**: Customer orders with payment status
- **OrderItem**: Individual items within an order
- **Cart**: Shopping cart entity (UUID-based)
- **CartItem**: Items within a shopping cart
- **Review**: Product reviews
- **Promotions**: Discount promotions
- **Address**: Customer addresses

### API Endpoints

#### Authentication (Djoser + JWT)
- `POST /auth/jwt/create/` - Login (get access/refresh tokens)
- `POST /auth/jwt/refresh/` - Refresh access token
- `POST /auth/jwt/verify/` - Verify token
- `POST /auth/users/` - Register new user
- `GET /auth/users/me/` - Get current user profile

#### Products
- `GET /store/products/` - List all products (with filtering, search, ordering)
- `GET /store/products/{id}/` - Get specific product
- `POST /store/products/` - Create product (admin only)
- `PATCH /store/products/{id}/` - Update product (admin only)
- `DELETE /store/products/{id}/` - Delete product (admin only)

#### Product Reviews
- `GET /store/products/{id}/reviews/` - Get product reviews
- `POST /store/products/{id}/reviews/` - Create product review

#### Collections
- `GET /store/collections/` - List all collections
- `GET /store/collections/{id}/` - Get specific collection
- `POST /store/collections/` - Create collection (admin only)
- `PATCH /store/collections/{id}/` - Update collection (admin only)
- `DELETE /store/collections/{id}/` - Delete collection (admin only)

#### Cart Management
- `POST /store/cart/` - Create new cart
- `GET /store/cart/{id}/` - Get cart details
- `DELETE /store/cart/{id}/` - Delete cart
- `GET /store/cart/{id}/items/` - Get cart items
- `POST /store/cart/{id}/items/` - Add item to cart
- `PATCH /store/cart/{id}/items/{item_id}/` - Update cart item
- `DELETE /store/cart/{id}/items/{item_id}/` - Remove cart item

#### Orders
- `GET /store/orders/` - List orders (user sees own, admin sees all)
- `GET /store/orders/{id}/` - Get specific order
- `POST /store/orders/` - Create order from cart
- `PATCH /store/orders/{id}/` - Update order (admin only)

#### Customers
- `GET /store/customers/` - List customers (admin only)
- `GET /store/customers/{id}/` - Get customer details (admin only)
- `GET /store/customers/me/` - Get current customer profile
- `PUT /store/customers/me/` - Update current customer profile
- `GET /store/customers/{id}/history/` - Get customer order history

### Permissions System

#### User Roles
1. **Anonymous Users**: Can view products, collections
2. **Authenticated Users**: Can manage cart, place orders, view own data
3. **Staff/Admin Users**: Full CRUD access to all resources

#### Custom Permissions
- `IsAdminOrReadOnly`: Admin can modify, others can only read
- `ViewCustomerHistoryPermission`: Special permission for viewing customer history
- `FullDjangoModelPermissions`: Enhanced Django model permissions

### Data Structure Examples

#### Product Response
```json
{
  "id": 1,
  "title": "Sample Product",
  "slug": "sample-product",
  "description": "Product description",
  "unit_price": "29.99",
  "inventory": 100,
  "last_update": "2025-01-01T12:00:00Z",
  "collection": 1,
  "promotions": []
}
```

#### Cart Response
```json
{
  "id": "uuid-string",
  "created_at": "2025-01-01T12:00:00Z",
  "items": [
    {
      "id": 1,
      "product": {...},
      "quantity": 2,
      "total_price": "59.98"
    }
  ]
}
```

#### Order Response
```json
{
  "id": 1,
  "placed_at": "2025-01-01T12:00:00Z",
  "payment_status": "P",
  "customer": 1,
  "items": [
    {
      "id": 1,
      "product": 1,
      "quantity": 2,
      "unit_price": "29.99"
    }
  ]
}
```

## React Frontend Implementation

### Project Structure
```
src/
├── components/
│   ├── common/          # Shared components (Header, Footer, etc.)
│   ├── auth/           # Authentication components
│   ├── products/       # Product-related components
│   ├── cart/           # Cart components
│   ├── orders/         # Order components
│   └── admin/          # Admin components
├── pages/              # Page components
├── context/            # React Context providers
├── services/           # API service functions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── types/              # Type definitions
```

### State Management Strategy

#### Contexts Used
1. **AuthContext**: User authentication state
2. **CartContext**: Shopping cart state
3. Additional contexts can be added for products, orders, etc.

#### Key Features
- JWT token management with automatic refresh
- Persistent cart state (localStorage)
- Role-based route protection
- Loading states and error handling

### Component Hierarchy

#### Route Protection
- `ProtectedRoute`: Requires authentication
- `AdminRoute`: Requires admin privileges

#### Reusable Components
- `LoadingSpinner`: Loading indicator
- `Header`: Navigation with user menu
- `Footer`: Site footer
- Form components with validation

### API Integration

#### Service Layer
- Centralized API calls in `services/api.js`
- Automatic token attachment
- Error handling and token refresh
- Separate modules for different resources

#### Error Handling
- Network error handling
- Authentication error handling
- Form validation errors
- User feedback messages

### Responsive Design

#### Mobile-First Approach
- Tailwind CSS utility classes
- Responsive grid layouts
- Mobile-friendly navigation
- Touch-friendly interfaces

#### Accessibility Features
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## Development Workflow

### Setup Instructions
1. Install dependencies: `npm install`
2. Configure environment variables
3. Start development server: `npm run dev`
4. Ensure Django backend is running on port 8000

### Environment Configuration
- `VITE_API_BASE_URL`: Django backend URL
- Additional configuration as needed

### Testing Strategy
- Component testing with React Testing Library
- API integration testing
- E2E testing with Cypress (recommended)

## Deployment Considerations

### Frontend Deployment
- Build production bundle: `npm run build`
- Deploy to static hosting (Netlify, Vercel, etc.)
- Configure environment variables

### Backend Integration
- CORS configuration for production
- Authentication token security
- API rate limiting
- Error monitoring

## Future Enhancements

### Planned Features
1. **Search & Filtering**: Advanced product search
2. **Payment Integration**: Stripe/PayPal integration
3. **Real-time Updates**: WebSocket for cart/order updates
4. **Image Management**: Product image upload and display
5. **Analytics**: User behavior tracking
6. **Multi-language**: Internationalization support

### Performance Optimizations
- Code splitting and lazy loading
- Image optimization
- Caching strategies
- Bundle size optimization

## API Rate Limiting & Caching

### Caching Strategy
- Browser caching for static assets
- API response caching where appropriate
- Optimistic updates for better UX

### Performance Monitoring
- API response time monitoring
- Frontend performance metrics
- Error tracking and reporting
