import React, { useState } from 'react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/CartContext';

const AddToCartButton = ({ 
  product, 
  quantity = 1, 
  disabled = false, 
  className = '',
  showText = true,
  size = 'md' 
}) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (disabled || !product || product.inventory <= 0) return;

    setIsAdding(true);
    try {
      const result = await addToCart(product.id, quantity);
      if (result.success) {
        toast.success(`${product.title} added to cart!`);
      } else {
        toast.error(result.error || 'Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsAdding(false);
    }
  };

  const isOutOfStock = !product || product.inventory <= 0;
  const isDisabled = disabled || isAdding || isOutOfStock;

  // Size variants
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center border border-transparent font-medium rounded-md transition-colors
        ${sizeClasses[size]}
        ${isDisabled
          ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
          : 'text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
        }
        ${className}
      `}
      title={isOutOfStock ? 'Out of stock' : isAdding ? 'Adding to cart...' : 'Add to cart'}
    >
      <ShoppingCartIcon className={`${iconSizes[size]} ${showText ? 'mr-2' : ''}`} />
      {showText && (
        <span>
          {isAdding ? 'Adding...' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </span>
      )}
    </button>
  );
};

export default AddToCartButton;
