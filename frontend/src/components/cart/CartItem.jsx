import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setIsUpdating(true);
    try {
      const result = await updateCartItem(item.id, newQuantity);
      if (result.success) {
        toast.success('Quantity updated');
      } else {
        toast.error(result.error || 'Failed to update quantity');
      }
    } catch {
      toast.error('Failed to update quantity');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      const result = await removeFromCart(item.id);
      if (result.success) {
        toast.success('Item removed from cart');
      } else {
        toast.error(result.error || 'Failed to remove item');
      }
    } catch {
      toast.error('Failed to remove item');
    }
  };

  const subtotal = item.quantity * item.product.unit_price;

  return (
    <div className="flex items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-24 h-24 bg-gray-200 rounded-lg overflow-hidden">
        {item.product.image ? (
          <img 
            src={item.product.image} 
            alt={item.product.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="ml-6 flex-1">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              <Link 
                to={`/products/${item.product.id}`}
                className="hover:text-blue-600 transition-colors"
              >
                {item.product.title}
              </Link>
            </h3>
            {item.product.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {item.product.description}
              </p>
            )}
            <p className="text-lg font-semibold text-gray-900 mt-2">
              ${item.product.unit_price.toFixed(2)}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-colors ml-4"
            title="Remove from cart"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* Quantity Controls and Subtotal */}
        <div className="flex items-center justify-between mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Qty:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={item.quantity <= 1 || isUpdating}
                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                -
              </button>
              <span className="px-4 py-1 border-x border-gray-300 min-w-[3rem] text-center">
                {isUpdating ? '...' : item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isUpdating}
                className="px-3 py-1 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Subtotal */}
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-900">
              ${subtotal.toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
