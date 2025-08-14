import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';
import EmptyCart from '../../components/cart/EmptyCart';

const CartPage = () => {
  const { 
    items, 
    totalQuantity, 
    totalPrice, 
    isLoading, 
    error, 
    clearCart 
  } = useCart();
  
  const [isClearingCart, setIsClearingCart] = useState(false);

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to remove all items from your cart?')) {
      setIsClearingCart(true);
      try {
        const result = await clearCart();
        if (result.success) {
          toast.success('Cart cleared successfully');
        } else {
          toast.error(result.error || 'Failed to clear cart');
        }
      } catch {
        toast.error('Failed to clear cart');
      } finally {
        setIsClearingCart(false);
      }
    }
  };

  // Loading state
  if (isLoading && items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center py-6 border-b">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
                  <div className="ml-6 flex-1">
                    <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-200 rounded-lg h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <EmptyCart />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Shopping Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
        </h1>
        
        {/* Clear Cart Button - Desktop */}
        <button
          onClick={handleClearCart}
          disabled={isClearingCart || isLoading}
          className="hidden md:block text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
        >
          {isClearingCart ? 'Clearing...' : 'Clear Cart'}
        </button>
      </div>

      {/* Cart Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-0">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          {/* Mobile Clear Cart Button */}
          <div className="mt-4 md:hidden">
            <button
              onClick={handleClearCart}
              disabled={isClearingCart || isLoading}
              className="w-full text-red-600 hover:text-red-800 py-2 text-sm transition-colors disabled:opacity-50"
            >
              {isClearingCart ? 'Clearing Cart...' : 'Clear Cart'}
            </button>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <CartSummary
              totalQuantity={totalQuantity}
              totalPrice={totalPrice}
              onClearCart={handleClearCart}
              isLoading={isLoading || isClearingCart}
              showClearButton={false} // We handle clear cart separately
            />
          </div>
        </div>
      </div>

      {/* Recently Viewed or Recommendations Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          You might also like
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600 text-center py-8">
            Product recommendations coming soon...
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
