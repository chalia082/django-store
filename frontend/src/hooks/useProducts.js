import { useState, useEffect, useCallback, useRef } from 'react';
import { productsAPI } from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Start with true since we fetch immediately
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
  });

  const mounted = useRef(true);

  // Reset mounted to true on every render (handles StrictMode remounting)
  useEffect(() => {
    mounted.current = true;
  });

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productsAPI.getProducts(params);
      
      if (mounted.current) {
        const products = response.results || response;
        setProducts(products);
        setPagination({
          count: response.count || 0,
          next: response.next || null,
          previous: response.previous || null,
        });
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      if (mounted.current) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch products');
      }
    } finally {
      if (mounted.current) {
        setLoading(false);
      }
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Cleanup only on actual unmount
  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);

  const refetch = useCallback((params) => {
    return fetchProducts(params);
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    refetch,
  };
};

export default useProducts;
