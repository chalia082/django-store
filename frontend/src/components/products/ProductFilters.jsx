import React from 'react';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

const ProductFilters = ({ 
  searchTerm, 
  onSearchChange, 
  sortBy, 
  onSortChange,
  onFilterToggle,
  showFilters = false 
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-sm font-medium text-gray-700">
              Sort by:
            </label>
            <select
              id="sort"
              className="input-field min-w-[120px]"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
            >
              <option value="">Default</option>
              <option value="title">Name (A-Z)</option>
              <option value="-title">Name (Z-A)</option>
              <option value="unit_price">Price (Low to High)</option>
              <option value="-unit_price">Price (High to Low)</option>
              <option value="-last_update">Newest</option>
              <option value="last_update">Oldest</option>
            </select>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={onFilterToggle}
            className={`btn-secondary flex items-center gap-2 ${
              showFilters ? 'bg-primary-100 text-primary-700' : ''
            }`}
          >
            <AdjustmentsHorizontalIcon className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price Range
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="input-field w-20"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  className="input-field w-20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select className="input-field">
                <option value="">All</option>
                <option value="in_stock">In Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection
              </label>
              <select className="input-field">
                <option value="">All Collections</option>
                {/* Collections will be populated dynamically */}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;
