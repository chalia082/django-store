import React from 'react';
import { Link } from 'react-router-dom';

const OrderSummary = ({ items, subtotal, shipping, tax, total }) => {
  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
      
      {/* Items */}
      <div className="space-y-3 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex-1">
              <Link
                to={`/products/${item.product.id}`}
                className="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors"
              >
                {item.product.title}
              </Link>
              <p className="text-xs text-gray-600">
                Qty: {item.quantity}
              </p>
            </div>
            <div className="text-sm font-medium text-gray-900">
              ${(item.quantity * item.product.unit_price).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      
      <hr className="my-4" />
      
      {/* Pricing breakdown */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className="text-gray-900">
            {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Tax</span>
          <span className="text-gray-900">${tax.toFixed(2)}</span>
        </div>
        
        <hr className="my-2" />
        
        <div className="flex justify-between text-lg font-semibold">
          <span className="text-gray-900">Total</span>
          <span className="text-gray-900">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
