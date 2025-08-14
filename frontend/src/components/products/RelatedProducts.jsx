import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../../services/api';

const RelatedProducts = ({ currentProduct, className = '' }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (!currentProduct) return;

      try {
        setLoading(true);
        // Fetch products from the same collection
        const response = await productsAPI.getProducts({
          collection: currentProduct.collection,
          limit: 4
        });
        
        // Filter out the current product
        const filtered = (response.results || response).filter(
          product => product.id !== currentProduct.id
        ).slice(0, 3);
        
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching related products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  if (loading) {
    return (
      <div className={className}>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="card overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Related Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 overflow-hidden">
              <div className="w-full h-48 bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-sm">No Image</span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
                {product.title}
              </h4>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900">
                  ${product.unit_price}
                </span>
                <span className={`text-xs ${
                  product.inventory > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
