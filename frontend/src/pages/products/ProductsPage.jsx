import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useProducts from '../../hooks/useProducts';
import ProductGrid from '../../components/products/ProductGrid';
import { useCart } from '../../context/CartContext';

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('ordering') || '');
  const [likedProducts, setLikedProducts] = useState([]);

  const { addToCart } = useCart();

  const { products, loading, error, pagination, fetchProducts } = useProducts();

  const handleSearchChange = useCallback((value) => {
    setSearchTerm(value);
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('search', value);
    } else {
      newParams.delete('search');
    }
    setSearchParams(newParams);

    const params = { search: value };
    if (sortBy) params.ordering = sortBy;
    fetchProducts(params);
  }, [searchParams, setSearchParams, sortBy, fetchProducts]);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set('ordering', value);
    } else {
      newParams.delete('ordering');
    }
    setSearchParams(newParams);
    
    const params = { ordering: value };
    if (searchTerm) params.search = searchTerm;
    fetchProducts(params);
  }, [searchParams, setSearchParams, searchTerm, fetchProducts]);

  const handleAddToCart = useCallback(async (product) => {
    try {
      await addToCart(product.id, 1);
      toast.success(`${product.title} added to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart');
    }
  }, [addToCart]);

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

  const handlePageChange = useCallback((url) => {
    const urlObj = new URL(url);
    const page = urlObj.searchParams.get('page');
    const params = { page };
    if (searchTerm) params.search = searchTerm;
    if (sortBy) params.ordering = sortBy;
    fetchProducts(params);
  }, [fetchProducts, searchTerm, sortBy]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
        <p className="text-gray-600">
          Discover our amazing collection of products
        </p>
        {pagination.count > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Showing {products.length} of {pagination.count} products
          </p>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="input-field max-w-md mr-4"
        />
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="input-field max-w-xs"
        >
          <option value="">Default</option>
          <option value="title">Name (A-Z)</option>
          <option value="-title">Name (Z-A)</option>
          <option value="unit_price">Price (Low to High)</option>
          <option value="-unit_price">Price (High to Low)</option>
        </select>
      </div>

      {/* Products Grid */}
      <ProductGrid
        products={products}
        loading={loading}
        error={error}
        onAddToCart={handleAddToCart}
        onToggleLike={handleToggleLike}
        likedProducts={likedProducts}
      />

      {/* Pagination */}
      {pagination.count > products.length && (
        <div className="mt-8 flex justify-center items-center gap-4">
          {pagination.previous && (
            <button
              onClick={() => handlePageChange(pagination.previous)}
              className="btn-secondary"
            >
              Previous
            </button>
          )}
          
          <span className="text-sm text-gray-600">
            Page {Math.ceil((pagination.count - (pagination.next ? products.length : 0)) / products.length)} 
          </span>
          
          {pagination.next && (
            <button
              onClick={() => handlePageChange(pagination.next)}
              className="btn-secondary"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
