import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { toast } from 'react-hot-toast';

const CheckoutForm = ({ amount, onPaymentSuccess, onPaymentError, isProcessing, setIsProcessing }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    // Create payment method
    const { error: paymentError } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (paymentError) {
      setError(paymentError.message);
      setIsProcessing(false);
      onPaymentError(paymentError.message);
      return;
    }

    // Simulating payment processing
    try {
      // Simulated API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock payment success (in real implementation, we'd be sending paymentMethod.id to the backend)
      // Simulating successful payment processing
      onPaymentSuccess();
      toast.success('Payment successful!');
    } catch (error) {
      console.error('Payment processing error:', error);
      const errorMessage = 'Payment failed. Please try again.';
      setError(errorMessage);
      onPaymentError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
        fontFamily: 'Inter, sans-serif',
        fontSmoothing: 'antialiased',
      },
      invalid: {
        color: '#9e2146',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-white p-4 border border-gray-300 rounded-lg">
        <label htmlFor="card-element" className="block text-sm font-medium text-gray-700 mb-2">
          Card Details
        </label>
        <div className="p-3 border border-gray-300 rounded-md bg-white">
          <CardElement 
            id="card-element"
            options={cardElementOptions}
          />
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed text-white'
            : 'bg-primary-600 hover:bg-primary-700 text-white'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Processing...
          </div>
        ) : (
          `Pay $${amount.toFixed(2)}`
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
