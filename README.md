# Django Store

Full-stack sample e-commerce project: Django backend + React (Vite) frontend.

This repository implements a small store with products, collections, cart, orders, customers, and reviews. It demonstrates a production-like structure using Django REST Framework on the backend and a Vite + React frontend with Stripe integration for payments (test mode).

---

## Table of Contents

- Project overview
- Technologies
- Architecture
- Backend (Django)
  - Key models
  - API routes
  - Authentication & permissions
  - Important serializers / behavior
- Frontend (React + Vite)
  - Key pages & components
  - API client
  - Stripe integration (test mode)
- Local development
  - Prerequisites
  - Backend setup
  - Frontend setup
- Testing & debugging tips
- Next steps / TODO
- License

---

## Project overview

The project contains two main parts:

- `storefront/` — Django project with a `store` app powering the REST API.
- `frontend/` — React app built with Vite that consumes the API.

The app supports:

- Product listing with filtering and sorting
- Collections
- Shopping cart (persistent via backend Cart model referenced by UUID in localStorage)
- Checkout flow (Stripe Elements used on the frontend, backend creates orders and converts cart into orders)
- Orders and order history
- Customer profile endpoints

---

## Technologies

Backend:
- Python 3.11+ (development used `py` on Windows)
- Django 5.x
- Django REST Framework (DRF)
- djangorestframework-simplejwt (JWT authentication)
- django-filter

Frontend:
- Node.js, npm
- React (Vite)
- Tailwind CSS
- @stripe/stripe-js and @stripe/react-stripe-js (Stripe Elements)
- react-hot-toast

---

## Architecture

- Backend provides RESTful endpoints using DRF ViewSets and routers.
- Frontend stores cart UUID in `localStorage` and keeps cart state in React Context (`CartContext`).
- Orders are created on the backend via a serializer that moves CartItems into OrderItems and deletes the Cart (atomic transaction).
- Frontend clears local cart state after order creation (the backend deletes the cart).

---

## Backend – Key models

Found in `storefront/store/models.py`:
- `Product` — store product metadata and pricing
- `Collection` — product grouping
- `Customer` — extended user info
- `Cart` / `CartItem` — persistent cart referenced by UUID
- `Order` / `OrderItem` — placed orders
- `Review` — product reviews

Important behavior:
- Creating an order (`CreateOrderSerializer`) converts `CartItem`s into `OrderItem`s and deletes the `Cart` inside a DB transaction.

---

## Backend – API routes

Routes are registered in `storefront/store/urls.py` using DRF routers and nested routers. Main endpoints:

- Authentication (DRF Simple JWT / djoser style endpoints)
  - `POST /auth/jwt/create/` — login (returns access/refresh tokens)
  - `POST /auth/jwt/refresh/` — refresh access token
  - `GET/PUT /auth/users/me/` — current user
  - `POST /auth/users/` — register

- Store endpoints (base: `/store/`)
  - `GET/POST /store/products/` — list/create products (admin create)
  - `GET/PUT/PATCH/DELETE /store/products/<id>/` — product detail
  - `GET /store/products/<id>/reviews/` — product reviews

  - `GET /store/collections/` — collections
  - `GET/PUT/DELETE /store/collections/<id>/` — collection detail

  - `POST /store/cart/` — create new cart (returns UUID)
  - `GET /store/cart/<cart_id>/` — get cart and items
  - `DELETE /store/cart/<cart_id>/` — delete cart

  - `POST /store/cart/<cart_id>/items/` — add item to cart
  - `PATCH /store/cart/<cart_id>/items/<item_id>/` — update quantity
  - `DELETE /store/cart/<cart_id>/items/<item_id>/` — remove item

  - `GET /store/orders/` — list orders (authenticated users see their orders)
  - `POST /store/orders/` — create order (body: `{ cart_id: <uuid> }`)
  - `GET /store/orders/<id>/` — order detail
  - Admin-only: `PATCH /store/orders/<id>/` or `DELETE /store/orders/<id>/`

  - `GET /store/customers/` — admin-only list
  - `GET/PUT /store/customers/me/` — manage current customer (authenticated)

Notes:
- Orders endpoint supports ordering (e.g., `?ordering=-placed_at`) via DRF's OrderingFilter.
- `Cart` endpoints are nested with `cart/<cart_pk>/items/` for item operations.

---

## Backend – Authentication & Permissions

- Authentication: JSON Web Tokens (JWT) via Simple JWT (djoser/django-rest-framework-simplejwt)
  - Access token kept in `localStorage` on frontend.
  - `api.js` attaches `Authorization: JWT <token>` to requests.
  - Axios response interceptor attempts token refresh on 401 using refresh token stored in `localStorage`.

- Permissions:
  - Product and collection creation/update/delete require admin (custom `IsAdminOrReadOnly`).
  - Customer `me` endpoint requires authentication.
  - Orders: `GET/POST` require authentication. `PATCH/DELETE` require admin.

---

## Frontend – Project structure

Key folders in `frontend/src`:
- `components/` — reusable UI (products, cart, checkout, orders)
- `context/` — React Contexts (AuthContext, CartContext)
- `pages/` — route pages (Products, Product detail, Cart, Checkout, Orders)
- `services/api.js` — Axios instance + typed API helpers
- `config/stripe.js` — Stripe initialization (test mode keys)

Important files:
- `CartContext.jsx` — manages cart state, persisting cart id in `localStorage`, calls backend to sync items.
- `CheckoutPage.jsx` / `CheckoutForm.jsx` — Stripe Elements checkout flow. On successful payment, frontend posts `{ cart_id }` to create order; backend deletes cart.
- `OrdersPage.jsx` / `OrderDetailPage.jsx` — list and detail user orders.

---

## Frontend – API client

`frontend/src/services/api.js` exports API helpers grouped by domain: `authAPI`, `productsAPI`, `collectionsAPI`, `cartAPI`, `ordersAPI`, `customersAPI`.

Example usage:
```js
import { ordersAPI } from './services/api';
const orders = await ordersAPI.getOrders({ ordering: '-placed_at' });
```

Axios attaches JWT from `localStorage` and handles token refresh automatically.

---

## Stripe Integration

- Frontend uses `@stripe/react-stripe-js` and `@stripe/stripe-js` with Stripe Elements.
- Stripe is configured in `frontend/src/config/stripe.js`. Use your Stripe **test** publishable key in `.env`:
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```
- Checkout form (`CheckoutForm.jsx`) creates a payment method with Stripe Elements, then the frontend calls backend order creation. Payments are simulated in test mode (no real charges).

---

## Local Development

Prerequisites:
- Python 3.11+ and virtualenv
- Node.js (16+) and npm
- SQLite (included)

Backend setup (Windows example):

```bash
# from repo root
cd storefront
# Create virtualenv, activate it (example using venv)
python -m venv .venv
# PowerShell: .\.venv\Scripts\Activate.ps1
# cmd: .venv\Scripts\activate.bat
# Or use `py` on Windows if configured
pip install -r requirements.txt

# Apply migrations
py manage.py migrate

# Create superuser
py manage.py createsuperuser

# Run server
py manage.py runserver
```

Frontend setup:

```bash
cd frontend
npm install
# create .env with VITE_API_BASE_URL (e.g. http://127.0.0.1:8000) and VITE_STRIPE_PUBLISHABLE_KEY
npm run dev
```

Default frontend dev server: `http://localhost:5173/` (may choose another port if in use).

---

## Testing & Debugging Tips

- If cart state looks stale after ordering, that's usually due to the backend deleting the cart; frontend should clear `localStorage` and re-create a new cart (CartContext handles this).
- Use devtools network tab to inspect API requests and JWT headers.
- Django server logs show incoming requests and can help debug ordering, cart creation, and deletions.

---

## Important Implementation Notes

- Orders are created from a `cart_id` (UUID). The `CreateOrderSerializer` moves cart items into order items and deletes the cart inside a DB transaction.
- Frontend must not double-delete the cart via API after order creation. Instead it should clear local state and create a fresh cart.
- The backend `OrderViewSet` supports ordering via DRF `OrderingFilter` and defaults to `-placed_at` (newest first).

---

## Next steps / TODO

- Add backend tests for order creation edge cases (concurrent cart deletion, insufficient inventory).
- Add end-to-end tests for checkout flow (Stripe + order creation).
- Improve error handling and UI feedback for failed payments.

---

## License

This project is provided for educational/demo purposes.

---

If you'd like, I can also generate a lightweight Postman collection or OpenAPI spec extracted from the DRF views to make integration easier.
