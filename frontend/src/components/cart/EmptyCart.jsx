import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="text-center py-16">
      {/* Empty Cart Icon */}
      <div className="mx-auto w-24 h-24 text-gray-300 mb-6">
        <svg fill="currentColor" viewBox="0 0 24 24" className="w-full h-full">
          <path d="M7 4V2C7 1.45 7.45 1 8 1H16C16.55 1 17 1.45 17 2V4H20C20.55 4 21 4.45 21 5S20.55 6 20 6H19V19C19 20.1 18.1 21 17 21H7C5.9 21 5 20.1 5 19V6H4C3.45 6 3 5.55 3 5S3.45 4 4 4H7ZM9 3V4H15V3H9ZM7 6V19H17V6H7Z"/>
          <path d="M9 8V17H11V8H9ZM13 8V17H15V8H13Z"/>
        </svg>
      </div>

      {/* Empty State Content */}
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Your cart is empty
      </h2>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Looks like you haven't added any items to your cart yet. 
        Start shopping to find amazing products!
      </p>

      {/* Action Buttons */}
      <div className="space-y-4 max-w-sm mx-auto">
        <Link
          to="/products"
          className="w-full btn-primary text-center block"
        >
          Start Shopping
        </Link>
        
        <Link
          to="/"
          className="w-full btn-secondary text-center block"
        >
          Go to Homepage
        </Link>
      </div>

      {/* Popular Categories or Suggestions */}
      <div className="mt-12">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Popular Categories
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/products?category=electronics"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Electronics
          </Link>
          <Link
            to="/products?category=clothing"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Clothing
          </Link>
          <Link
            to="/products?category=home"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Home & Garden
          </Link>
          <Link
            to="/products?category=books"
            className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-600 transition-colors"
          >
            Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
