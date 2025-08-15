import { loadStripe } from '@stripe/stripe-js';

// Stripe Test Mode Configuration
// Get your test publishable key from: https://dashboard.stripe.com/test/apikeys
// Make sure you're in TEST mode and use the key that starts with 'pk_test_'
const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;

if (!STRIPE_PUBLISHABLE_KEY) {
  console.error('Stripe publishable key is missing. Please set VITE_STRIPE_PUBLISHABLE_KEY in your .env file');
}

// Initialize Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

export default stripePromise;

// Official Stripe Test Cards for Testing
export const TEST_CARDS = {
  success: {
    number: '4242424242424242',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
  },
  declined: {
    number: '4000000000000002',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
  },
  insufficient_funds: {
    number: '4000000000009995',
    exp_month: 12,
    exp_year: 2025,
    cvc: '123',
  },
};
