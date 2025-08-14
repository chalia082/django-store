import React from 'react';
import { Link } from 'react-router-dom';

const OrderItem = ({ item }) => {
  const total = item.quantity * item.unit_price;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <Link
          to={`/products/${item.product.id}`}
          className="text-lg font-medium text-gray-900 hover:text-primary-600 transition-colors"
        >
          {item.product.title}
        </Link>
        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-600">
          <span>Quantity: {item.quantity}</span>
          <span>•</span>
          <span>Unit Price: ${item.unit_price.toFixed(2)}</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          ${total.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          ${item.unit_price.toFixed(2)} each
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
