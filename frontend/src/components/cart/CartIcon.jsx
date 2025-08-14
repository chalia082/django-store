import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartIcon = ({ className = '' }) => {
  const { totalQuantity } = useCart();

  return (
    <Link
      to="/cart"
      className={`relative inline-flex items-center p-2 text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      title="View Cart"
    >
      {/* Cart Icon */}
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9m-9 0h9" 
        />
      </svg>

      {/* Cart Count Badge */}
      {totalQuantity > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
          {totalQuantity > 99 ? '99+' : totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
