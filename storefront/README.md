# Django Store Backend

This is a Django-based backend project for an e-commerce/storefront application. The project is modularized into several apps, each handling a specific domain of the store.

## Features

### Modular Apps

- **core**: Contains core models, admin configuration, and custom logic.
- **store**: Handles products, collections, carts, orders, and related business logic.
- **likes**: Manages the "like" functionality for products or other entities.
- **tags**: Supports tagging for products or other models.
- **playground**: Used for testing, prototyping, or demo endpoints.

### API Endpoints & Views

- RESTful endpoints for products, collections, carts, orders, and customers.
- Filtering, pagination, and custom permissions for API endpoints (see `filters.py`, `pagination.py`, `permissions.py` in the `store` app).
- Like/unlike endpoints for user interaction.
- Tagging endpoints for categorizing products.
- Playground endpoints for testing and demonstration.

### Admin Permissions

- Custom admin interfaces for managing products, collections, orders, customers, tags, and likes.
- Admins can add, edit, and delete all major entities.
- Permissions are enforced via custom permission classes and Django’s built-in admin system.

### Data & Dummy Content

- The `seed.sql` file contains dummy data for products, collections, customers, orders, and other entities, making it easy to populate the database for development and testing.
- Data types include products, collections, customers, orders, tags, and user interactions (likes).

### Additional Features

- Signals for handling side effects (e.g., post-save actions) in the `core/signals` and `store/signals` directories.
- Serializers for API data validation and transformation.
- Unit tests for core functionality in each app.
- Template support for basic HTML rendering (see `playground/templates/hello.html`).

## Getting Started

1. Clone the repository.
2. Install dependencies.
3. Run migrations:  
   `python manage.py migrate`
4. (Optional) Load dummy data:  
   `python manage.py dbshell < seed.sql`
5. Start the development server:  
   `python manage.py runserver`

## Project Structure

- `core/` - Core logic and shared models
- `store/` - Main e-commerce logic (products, orders, etc.)
- `likes/` - Like functionality
- `tags/` - Tagging system
- `playground/` - Demo and test endpoints
- `storefront/` - Project settings and configuration

---
