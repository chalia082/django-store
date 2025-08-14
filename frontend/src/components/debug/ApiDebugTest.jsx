import React, { useEffect } from 'react';
import { productsAPI } from '../../services/api';

const ApiDebugTest = () => {
  useEffect(() => {
    const testAPI = async () => {
      console.log('=== API Debug Test ===');
      console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);
      console.log('Products endpoint:', '/store/products/');
      
      try {
        console.log('Making API call...');
        const response = await productsAPI.getProducts();
        console.log('API Response:', response);
        console.log('Products count:', response?.results?.length || response?.length);
      } catch (error) {
        console.error('API Error:', error);
        console.error('Error details:', {
          message: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config
        });
      }
    };

    testAPI();
  }, []);

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
      <h3 className="font-bold text-yellow-800">API Debug Test</h3>
      <p className="text-yellow-700">Check browser console for API debug information</p>
    </div>
  );
};

export default ApiDebugTest;
