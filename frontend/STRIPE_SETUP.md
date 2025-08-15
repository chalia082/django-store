# Stripe Test Mode Setup

## Quick Setup (5 minutes)

### 1. Get Your Stripe Test Key
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)
2. Make sure you're in **"Test mode"** (toggle in the left sidebar)
3. Copy your **"Publishable key"** (starts with `pk_test_`)

### 2. Configure Your Environment
1. Open `frontend/.env`
2. Replace `pk_test_YOUR_ACTUAL_TEST_KEY_HERE` with your actual test key:

```bash
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

### 3. Test the Checkout
Use these official Stripe test cards:

- **Success**: `4242424242424242`
- **Declined**: `4000000000000002`  
- **Insufficient Funds**: `4000000000009995`

Use any future expiry date (e.g., 12/25) and any 3-digit CVC (e.g., 123).

### 4. Start the Servers
```bash
# Backend
cd storefront && python manage.py runserver

# Frontend  
cd frontend && npm run dev
```

That's it! Your Stripe integration is ready for testing.

## Important Notes
- Never use live keys (`pk_live_`) in development
- Test keys are safe to expose in frontend code
- All payments are simulated - no real money is processed
