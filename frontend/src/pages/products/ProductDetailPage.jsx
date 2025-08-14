import React, { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeftIcon, HomeIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-hot-toast';
import useProduct from '../../hooks/useProduct';
import { useCart } from '../../context/CartContext';
import ProductImageGallery from '../../components/products/ProductImageGallery';
import ProductInfo from '../../components/products/ProductInfo';
import RelatedProducts from '../../components/products/RelatedProducts';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const ProductDetailPage = () => {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const { addToCart } = useCart();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [likedProducts, setLikedProducts] = useState([]);

  // Handle add to cart
  const handleAddToCart = useCallback(async (product, quantity = 1, options = {}) => {
    setIsAddingToCart(true);
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
      setIsAddingToCart(false);
    }
  }, [addToCart]);

  // Handle toggle like/favorite
  const handleToggleLike = useCallback((product) => {
    setLikedProducts(prev => {
      const isLiked = prev.includes(product.id);
      if (isLiked) {
        toast.success(`Removed ${product.title} from favorites`);
        return prev.filter(id => id !== product.id);
      } else {
        toast.success(`Added ${product.title} to favorites`);
        return [...prev, product.id];
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link 
              to="/products" 
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link 
              to="/products" 
              className="btn btn-primary inline-flex items-center space-x-2"
            >
              <ChevronLeftIcon className="w-4 h-4" />
              <span>Back to Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <Link 
              to="/" 
              className="text-gray-500 hover:text-gray-700 flex items-center space-x-1"
            >
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </Link>
            <span className="text-gray-300">/</span>
            <Link 
              to="/products" 
              className="text-gray-500 hover:text-gray-700"
            >
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium line-clamp-1">
              {product.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link 
            to="/products" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>

        {/* Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <ProductImageGallery product={product} />
          </div>

          {/* Product Information */}
          <div>
            <ProductInfo 
              product={product} 
              onAddToCart={handleAddToCart}
              onToggleLike={handleToggleLike}
              isLiked={likedProducts.includes(product.id)}
              loading={isAddingToCart}
            />
          </div>
        </div>

        {/* Product Description */}
        {product.description && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Product Description
            </h2>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        )}

        {/* Specifications */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Specifications
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Product ID</span>
                <span className="text-gray-900 font-medium">#{product.id}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Collection</span>
                <span className="text-gray-900 font-medium">
                  {product.collection?.title || 'Uncategorized'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Price</span>
                <span className="text-gray-900 font-bold text-lg">
                  ${product.unit_price}
                </span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Availability</span>
                <span className={`font-medium ${
                  product.inventory > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Inventory</span>
                <span className="text-gray-900 font-medium">
                  {product.inventory} units
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Last Updated</span>
                <span className="text-gray-900 font-medium">
                  {new Date(product.last_update).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts 
          currentProduct={product}
          className="bg-white rounded-lg shadow-sm p-6"
        />
      </div>
    </div>
  );
};

export default ProductDetailPage;
