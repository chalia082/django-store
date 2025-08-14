import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const ProductImageGallery = ({ product, className = '' }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  // Since we don't have real images from the API, we'll create placeholder images
  const placeholderImages = [
    `https://picsum.photos/600/600?sig=${product?.id || 1}`,
    `https://picsum.photos/600/600?sig=${(product?.id || 1) + 1}`,
    `https://picsum.photos/600/600?sig=${(product?.id || 1) + 2}`,
    `https://picsum.photos/600/600?sig=${(product?.id || 1) + 3}`,
  ];

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === placeholderImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? placeholderImages.length - 1 : prev - 1
    );
  };

  return (
    <div className={`${className}`}>
      {/* Main Image */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
        <img
          src={placeholderImages[selectedImageIndex]}
          alt={product?.title || 'Product image'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23f3f4f6"/><text x="300" y="300" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="24" fill="%23666">No Image</text></svg>`;
          }}
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
          aria-label="Previous image"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600" />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all"
          aria-label="Next image"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600" />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          {selectedImageIndex + 1} / {placeholderImages.length}
        </div>
      </div>

      {/* Thumbnail Images */}
      <div className="grid grid-cols-4 gap-2">
        {placeholderImages.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all ${
              selectedImageIndex === index
                ? 'border-primary-500 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`${product?.title} view ${index + 1}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150"><rect width="150" height="150" fill="%23f3f4f6"/><text x="75" y="75" text-anchor="middle" dy="0.3em" font-family="Arial" font-size="12" fill="%23666">No Image</text></svg>`;
              }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageGallery;
