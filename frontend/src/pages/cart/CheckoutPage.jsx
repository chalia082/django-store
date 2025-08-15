import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ordersAPI } from '../../services/api';
import CheckoutForm from '../../components/checkout/CheckoutForm';
import OrderSummary from '../../components/checkout/OrderSummary';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import stripePromise, { TEST_CARDS } from '../../config/stripe';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { items, totalPrice, clearCartLocally } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);

  // Calculate pricing
  const subtotal = totalPrice;
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      toast.error('Please login to checkout');
      navigate('/login');
      return;
    }

    // Redirect if cart is empty
    if (!items || items.length === 0) {
      toast.error('Your cart is empty');
      navigate('/cart');
      return;
    }
  }, [isAuthenticated, items, navigate]);

  const handlePaymentSuccess = async () => {
    try {
      // Create order in the backend
      const orderData = {
        cart_id: localStorage.getItem('cart_id'),
      };

      console.log('Creating order with data:', orderData);
      const order = await ordersAPI.createOrder(orderData);
      console.log('Order created successfully:', order);
      
      // The backend automatically deletes the cart after creating the order
      // So we need to clear the cart state locally and create a new cart
      await clearCartLocally();
      
      toast.success('Order placed successfully!');
      
      // Redirect to order confirmation or orders page
      navigate(`/orders/${order.id}`, { 
        state: { 
          message: 'Your order has been placed successfully!',
          orderId: order.id 
        }
      });
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error.response?.data?.detail || 'Failed to create order. Please contact support.';
      toast.error(errorMessage);
    }
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast.error(error);
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-64">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Checkout</h1>
          <p className="text-gray-600 mb-6">Your cart is empty.</p>
          <Link
            to="/products"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          to="/cart"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-4"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        <p className="text-gray-600 mt-1">Complete your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Payment Section */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={user?.first_name || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={user?.last_name || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                />
              </div>
            </div>
          </div>

          {/* Test Card Details Helper */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-blue-900">Test Card Details</h3>
              <button
                onClick={() => setShowCardDetails(!showCardDetails)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {showCardDetails ? 'Hide' : 'Show'}
              </button>
            </div>
            {showCardDetails && (
              <div className="text-xs text-blue-800 space-y-2">
                <div>
                  <strong>Successful Payment:</strong>
                  <br />
                  Card: {TEST_CARDS.success.number}
                  <br />
                  Exp: {TEST_CARDS.success.exp_month}/{TEST_CARDS.success.exp_year}, CVC: {TEST_CARDS.success.cvc}
                </div>
                <div>
                  <strong>Declined Payment:</strong>
                  <br />
                  Card: {TEST_CARDS.declined.number}
                </div>
              </div>
            )}
          </div>

          {/* Payment Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h2>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                amount={total}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
                isProcessing={isProcessing}
                setIsProcessing={setIsProcessing}
              />
            </Elements>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:sticky lg:top-8">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
          
          {/* Security Notice */}
          <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center text-sm text-gray-600">
              <svg
                className="h-5 w-5 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Your payment information is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
