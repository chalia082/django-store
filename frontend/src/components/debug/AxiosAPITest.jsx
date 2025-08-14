import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';

const AxiosAPITest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAxiosAPI = async () => {
    setLoading(true);
    try {
      console.log('🔧 Testing axios-based API call...');
      const response = await productsAPI.getProducts();
      console.log('🔧 Axios response:', response);
      setTestResult({ success: true, data: response.results?.slice(0, 2) || response.slice(0, 2) });
    } catch (error) {
      console.error('🔧 Axios API error:', error);
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testAxiosAPI();
  }, []);

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded mb-4">
      <h3 className="font-bold text-yellow-800">Axios API Test</h3>
      {loading && <p className="text-yellow-700">Testing axios API...</p>}
      {testResult?.success && (
        <div>
          <p className="text-yellow-700">✅ Axios Working! First 2 products:</p>
          <pre className="text-xs bg-yellow-50 p-2 rounded mt-2 overflow-auto">
            {JSON.stringify(testResult.data, null, 2)}
          </pre>
        </div>
      )}
      {testResult?.success === false && (
        <p className="text-red-700">❌ Axios Error: {testResult.error}</p>
      )}
    </div>
  );
};

export default AxiosAPITest;
