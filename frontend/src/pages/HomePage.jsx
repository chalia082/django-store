import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI, collectionsAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, collectionsResponse] = await Promise.all([
          productsAPI.getProducts({ limit: 8 }),
          collectionsAPI.getCollections(),
        ]);
        
        setFeaturedProducts(productsResponse.results || productsResponse);
        setCollections(collectionsResponse.results || collectionsResponse);
      } catch (error) {
        console.error('Error fetching homepage data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to Storefront
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Discover amazing products at unbeatable prices. Shop with confidence
              and enjoy fast, reliable delivery.
            </p>
            <Link
              to="/products"
              className="inline-block bg-white text-primary-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {collections.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.slice(0, 6).map((collection) => (
                <Link
                  key={collection.id}
                  to={`/products?collection=${collection.id}`}
                  className="group relative bg-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center h-48">
                    <h3 className="text-2xl font-semibold text-primary-800">
                      {collection.title}
                    </h3>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600">
                      {collection.products_count} {collection.products_count === 1 ? 'product' : 'products'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="card p-4">
                  <Link to={`/products/${product.id}`} className="block">
                    <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg mb-4 flex items-center justify-center h-48">
                      <span className="text-gray-500">No Image</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 truncate">{product.title}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-primary-600 font-bold text-lg">
                        ${product.unit_price}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {product.inventory} in stock
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/products"
                className="btn-primary inline-block"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your orders delivered quickly and safely to your doorstep.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">We ensure all products meet our high quality standards.</p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75c0-5.385-4.365-9.75-9.75-9.75z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Our customer support team is always here to help you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
