# Django E-commerce Store - React Frontend

A complete React frontend application built with Vite for the Django e-commerce backend. This application provides a modern, responsive user interface for an online store with full shopping cart functionality, user authentication, and admin management.

## ��� Features

### Core Functionality
- **Product Browsing**: View products with filtering, search, and categorization
- **Shopping Cart**: Add/remove items, update quantities, persistent cart state
- **User Authentication**: JWT-based login/registration with automatic token refresh
- **Order Management**: Place orders, view order history, track order status
- **User Profiles**: Manage personal information and preferences
- **Admin Panel**: Comprehensive admin interface for managing products, orders, and customers

### Technical Features
- **Responsive Design**: Mobile-first approach using Tailwind CSS
- **State Management**: React Context API for global state
- **API Integration**: Comprehensive axios-based API service layer
- **Route Protection**: Role-based access control
- **Error Handling**: Comprehensive error handling and user feedback
- **Performance**: Code splitting and optimized bundle size
- **Accessibility**: WCAG 2.1 AA compliance

## ���️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Icons**: Heroicons
- **State Management**: React Context API

## ��� Prerequisites

- Node.js (v20.11.0 or compatible)
- npm or yarn
- Running Django backend (see backend documentation)

## ��� Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:8000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`

## ���️ Project Structure

```
src/
├── components/
│   ├── common/          # Shared components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── AdminRoute.jsx
│   ├── auth/           # Authentication components
│   ├── products/       # Product-related components
│   ├── cart/           # Shopping cart components
│   ├── orders/         # Order management components
│   ├── customers/      # Customer/profile components
│   └── admin/          # Admin panel components
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── auth/
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── customers/
│   └── admin/
├── context/            # React Context providers
│   ├── AuthContext.jsx
│   └── CartContext.jsx
├── services/           # API service functions
│   └── api.js
├── types/              # Type definitions
│   └── api.js
├── utils/              # Utility functions
└── hooks/              # Custom React hooks
```

## ��� API Integration

The frontend integrates with the Django backend through a comprehensive API service layer:

### Authentication
- JWT token-based authentication
- Automatic token refresh
- Secure token storage

### Endpoints Covered
- **Products**: CRUD operations, search, filtering
- **Collections**: Category management
- **Cart**: Shopping cart management
- **Orders**: Order placement and tracking
- **Customers**: Profile management
- **Reviews**: Product reviews

### Error Handling
- Network error recovery
- Authentication error handling
- Form validation
- User-friendly error messages

## ��� UI/UX Features

### Responsive Design
- Mobile-first approach
- Responsive navigation
- Touch-friendly interfaces
- Optimized for all screen sizes

### User Experience
- Loading states for all operations
- Optimistic UI updates
- Smooth transitions and animations
- Intuitive navigation

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility

## ��� Security Features

- **Authentication**: Secure JWT token handling
- **Route Protection**: Role-based access control
- **Data Validation**: Client-side form validation
- **XSS Protection**: Sanitized user inputs

## ��� Routes

### Public Routes
- `/` - Homepage
- `/products` - Product listing
- `/products/:id` - Product detail
- `/cart` - Shopping cart
- `/login` - User login
- `/register` - User registration

### Protected Routes (Authenticated Users)
- `/checkout` - Checkout process
- `/orders` - Order history
- `/orders/:id` - Order details
- `/profile` - User profile

### Admin Routes (Staff Users)
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/customers` - Customer management

## ���️ State Management

### AuthContext
- User authentication state
- Login/logout functionality
- Token management
- User role handling

### CartContext
- Shopping cart state
- Add/remove items
- Quantity updates
- Persistent storage

## ��� Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Organization
- Component-based architecture
- Separation of concerns
- Reusable components
- Custom hooks for logic reuse

## �� Build and Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFront, CloudFlare
- **Traditional Hosting**: Apache, Nginx

### Environment Configuration
Configure production environment variables:
- `VITE_API_BASE_URL`: Production API URL
- Additional configuration as needed

## ��� Testing

### Testing Strategy
- Component unit tests
- Integration tests for API calls
- E2E tests for user workflows

### Recommended Tools
- Jest + React Testing Library
- Cypress for E2E testing
- MSW for API mocking

## ��� Performance

### Optimizations
- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization
- Caching strategies

### Monitoring
- Core Web Vitals tracking
- Performance monitoring
- Error tracking

## ��� Documentation

- [API Documentation](./API_DOCUMENTATION.md)
- [Component Documentation](./docs/components.md)
- [Deployment Guide](./docs/deployment.md)

## ��� Troubleshooting

### Common Issues

1. **Development server won't start**
   - Check Node.js version compatibility
   - Clear node_modules and reinstall
   - Check for port conflicts

2. **API connection issues**
   - Verify backend is running
   - Check CORS configuration
   - Validate environment variables

3. **Authentication problems**
   - Clear browser storage
   - Check token expiration
   - Verify API endpoints

## ��� Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## ��� License

This project is licensed under the MIT License - see the LICENSE file for details.

## ��� Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API documentation

## ��� Future Enhancements

### Planned Features
- [ ] Advanced search and filtering
- [ ] Payment integration (Stripe/PayPal)
- [ ] Real-time notifications
- [ ] Product image management
- [ ] Wishlist functionality
- [ ] Product comparison
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Progressive Web App (PWA)
- [ ] Social authentication

### Performance Improvements
- [ ] Implement service workers
- [ ] Add offline support
- [ ] Optimize images with WebP
- [ ] Implement virtual scrolling for large lists
- [ ] Add GraphQL for efficient data fetching

---

## ��� Backend Integration

This frontend is designed to work with the Django e-commerce backend. Make sure to:

1. Start the Django development server on port 8000
2. Configure CORS settings in Django
3. Ensure all API endpoints are accessible
4. Set up proper authentication (Djoser + JWT)

For backend setup instructions, refer to the Django project documentation.
