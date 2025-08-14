import React, { useState, useEffect } from 'react';

const DirectAPITest = () => {
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testDirectFetch = async () => {
    setLoading(true);
    try {
      console.log('🧪 Testing direct fetch to API...');
      const response = await fetch('http://127.0.0.1:8000/store/products/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Origin': window.location.origin
        }
      });
      
      console.log('🧪 Response status:', response.status);
      console.log('🧪 Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('🧪 Response data:', data);
      setTestResult({ success: true, data: data.results?.slice(0, 3) || data.slice(0, 3) });
    } catch (error) {
      console.error('🧪 Direct fetch error:', error);
      setTestResult({ success: false, error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    testDirectFetch();
  }, []);

  return (
    <div className="p-4 bg-green-100 border border-green-400 rounded mb-4">
      <h3 className="font-bold text-green-800">Direct API Test</h3>
      {loading && <p className="text-green-700">Testing API connection...</p>}
      {testResult?.success && (
        <div>
          <p className="text-green-700">✅ API Working! First 3 products:</p>
          <pre className="text-xs bg-green-50 p-2 rounded mt-2 overflow-auto">
            {JSON.stringify(testResult.data, null, 2)}
          </pre>
        </div>
      )}
      {testResult?.success === false && (
        <p className="text-red-700">❌ API Error: {testResult.error}</p>
      )}
    </div>
  );
};

export default DirectAPITest;
