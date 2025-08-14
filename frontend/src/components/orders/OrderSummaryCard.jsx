import React from 'react';
import { Link } from 'react-router-dom';
import { PAYMENT_STATUS_CHOICES } from '../../types/api';

const OrderSummaryCard = ({ order, calculateOrderTotal, formatDate }) => {
  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'P':
        return 'bg-yellow-100 text-yellow-800';
      case 'C':
        return 'bg-green-100 text-green-800';
      case 'F':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-4 lg:mb-0">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{order.id}
              </h3>
              <p className="text-sm text-gray-600">
                Placed on {formatDate(order.placed_at)}
              </p>
            </div>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(
                order.payment_status
              )}`}
            >
              {PAYMENT_STATUS_CHOICES[order.payment_status]}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                ${calculateOrderTotal(order.items).toFixed(2)}
              </p>
            </div>
            <Link
              to={`/orders/${order.id}`}
              className="inline-flex items-center px-4 py-2 bg-primary-600 text-white text-sm rounded-lg hover:bg-primary-700 transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Order items summary */}
        {order.items.length > 0 ? (
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700">Items ({order.items.length})</p>
              {order.items.length > 2 && (
                <Link
                  to={`/orders/${order.id}`}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  View all items
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {order.items.slice(0, 2).map((item) => (
                <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {item.product.title}
                    </p>
                    <p className="text-sm text-gray-600">
                      Qty: {item.quantity} × ${item.unit_price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${(item.quantity * item.unit_price).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            {order.items.length > 2 && (
              <p className="text-sm text-gray-600 mt-2">
                and {order.items.length - 2} more items...
              </p>
            )}
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-600 italic">No items in this order</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummaryCard;