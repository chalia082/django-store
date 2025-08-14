import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';

const SimpleProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Simple fetch: Starting...');
        setLoading(true);
        const response = await productsAPI.getProducts();
        console.log('Simple fetch: Response:', response);
        setProducts(response.results || response);
        setError(null);
      } catch (err) {
        console.error('Simple fetch: Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  console.log('Simple render:', { productsCount: products.length, loading, error });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="text-center">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Products ({products.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card p-4">
            <h3 className="font-semibold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">${product.unit_price}</span>
              <span className="text-sm text-gray-500">Stock: {product.inventory}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleProductsPage;
