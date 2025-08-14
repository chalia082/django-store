import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

const ProductCard = ({ product, onAddToCart, onToggleLike, isLiked = false }) => {
  const {
    id,
    title,
    description,
    unit_price,
    inventory,
    collection
  } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleLike) {
      onToggleLike(product);
    }
  };

  const isInStock = inventory > 0;
  const productUrl = `/products/${id}`;

  return (
    <div className="card overflow-hidden group">
      <Link to={productUrl} className="block">
        {/* Product Image Placeholder */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
          <div className="w-full h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2">
              {title}
            </h3>
            <button
              onClick={handleToggleLike}
              className="flex-shrink-0 p-1 text-gray-400 hover:text-red-500 transition-colors"
              aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isLiked ? (
                <HeartSolidIcon className="h-5 w-5 text-red-500" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {description && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
          )}

          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-gray-900">
              ${unit_price}
            </span>
            <span className={`text-sm ${isInStock ? 'text-green-600' : 'text-red-600'}`}>
              {isInStock ? `${inventory} in stock` : 'Out of stock'}
            </span>
          </div>

          {collection && (
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-3">
              Collection ID: {collection}
            </span>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!isInStock}
            className={`w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
              isInStock
                ? 'text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                : 'text-gray-400 bg-gray-100 cursor-not-allowed'
            }`}
          >
            <ShoppingCartIcon className="h-4 w-4 mr-2" />
            {isInStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
