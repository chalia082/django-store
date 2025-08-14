import React from 'react';
import { Link } from 'react-router-dom';

const CartSummary = ({ 
  totalQuantity, 
  totalPrice, 
  onClearCart, 
  isLoading,
  showClearButton = true 
}) => {
  const tax = totalPrice * 0.1; // 10% tax
  const shipping = totalPrice > 50 ? 0 : 9.99; // Free shipping over $50
  const finalTotal = totalPrice + tax + shipping;

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3">
        {/* Subtotal */}
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({totalQuantity} items)</span>
          <span className="font-medium">${totalPrice.toFixed(2)}</span>
        </div>

        {/* Tax */}
        <div className="flex justify-between">
          <span className="text-gray-600">Tax (10%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        {/* Shipping */}
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shipping === 0 ? (
              <span className="text-green-600">Free</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {/* Free shipping notice */}
        {totalPrice < 50 && totalPrice > 0 && (
          <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
            💡 Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
          </div>
        )}

        {/* Divider */}
        <hr className="border-gray-300" />

        {/* Total */}
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${finalTotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-3">
        {/* Checkout Button */}
        <Link
          to="/checkout"
          className={`w-full btn-primary text-center block ${
            totalQuantity === 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''
          }`}
        >
          Proceed to Checkout
        </Link>

        {/* Continue Shopping */}
        <Link
          to="/products"
          className="w-full btn-secondary text-center block"
        >
          Continue Shopping
        </Link>

        {/* Clear Cart */}
        {showClearButton && totalQuantity > 0 && (
          <button
            onClick={onClearCart}
            disabled={isLoading}
            className="w-full text-red-600 hover:text-red-800 py-2 text-sm transition-colors disabled:opacity-50"
          >
            Clear Cart
          </button>
        )}
      </div>

      {/* Security Notice */}
      <div className="mt-6 flex items-center text-sm text-gray-500">
        <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Secure checkout powered by SSL
      </div>
    </div>
  );
};

export default CartSummary;
