import React, { useState } from 'react';
import { 
  HeartIcon, 
  ShoppingCartIcon, 
  StarIcon,
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-hot-toast';

const ProductInfo = ({ 
  product, 
  onAddToCart, 
  onToggleLike, 
  isLiked = false,
  loading = false 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  if (!product) {
    return null;
  }

  const {
    title,
    description,
    unit_price,
    inventory,
    collection,
    last_update
  } = product;

  const isInStock = inventory > 0;
  const stockStatus = inventory > 10 ? 'In Stock' : inventory > 0 ? `Only ${inventory} left` : 'Out of Stock';
  const stockColor = inventory > 10 ? 'text-green-600' : inventory > 0 ? 'text-orange-600' : 'text-red-600';

  // Mock data for demonstration
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = ['Black', 'White', 'Blue', 'Red', 'Green'];
  const rating = 4.5;
  const reviewCount = 128;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= inventory) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity, { size: selectedSize, color: selectedColor });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Product link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Product Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={`h-5 w-5 ${
                  index < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {rating} ({reviewCount} reviews)
            </span>
          </div>
        </div>
      </div>

      {/* Price and Stock */}
      <div className="border-t border-b border-gray-200 py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-3xl font-bold text-gray-900">${unit_price}</div>
          <div className={`text-sm font-medium ${stockColor}`}>
            {stockStatus}
          </div>
        </div>
        {collection && (
          <p className="text-sm text-gray-600">Collection ID: {collection}</p>
        )}
      </div>

      {/* Product Description */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
        <div className="grid grid-cols-5 gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                selectedSize === size
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-3">Color</h3>
        <div className="flex space-x-2">
          {colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor === color
                  ? 'border-primary-500 ring-2 ring-primary-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{
                backgroundColor: color.toLowerCase() === 'black' ? '#000' :
                                color.toLowerCase() === 'white' ? '#fff' :
                                color.toLowerCase() === 'blue' ? '#3b82f6' :
                                color.toLowerCase() === 'red' ? '#ef4444' :
                                color.toLowerCase() === 'green' ? '#10b981' : '#gray'
              }}
              title={color}
            />
          ))}
        </div>
        {selectedColor && (
          <p className="text-sm text-gray-600 mt-1">Selected: {selectedColor}</p>
        )}
      </div>

      {/* Quantity and Add to Cart */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <span className="text-lg font-medium w-12 text-center">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= inventory}
              className="w-8 h-8 rounded-md border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={handleAddToCart}
            disabled={!isInStock || loading}
            className={`flex-1 flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md transition-colors ${
              isInStock && !loading
                ? 'text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
                : 'text-gray-400 bg-gray-100 cursor-not-allowed'
            }`}
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            {loading ? 'Adding...' : isInStock ? 'Add to Cart' : 'Out of Stock'}
          </button>

          <button
            onClick={() => onToggleLike && onToggleLike(product)}
            className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isLiked ? (
              <HeartSolidIcon className="h-5 w-5 text-red-500" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>

          <button
            onClick={handleShare}
            className="px-4 py-3 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
            aria-label="Share product"
          >
            <ShareIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <TruckIcon className="h-5 w-5 mr-2" />
            Free shipping on orders over $50
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <ShieldCheckIcon className="h-5 w-5 mr-2" />
            30-day return policy
          </div>
          {last_update && (
            <div className="text-xs text-gray-500">
              Last updated: {new Date(last_update).toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
