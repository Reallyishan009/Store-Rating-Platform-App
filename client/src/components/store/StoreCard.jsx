import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RatingStars from '../rating/RatingStars';

const StoreCard = ({ store, showUserRating = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleViewDetails = () => {
    navigate(`/stores/${store.id}`);
  };

  const userRating = store.ratings && store.ratings.length > 0 ? store.ratings[0].rating : null;

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'text-green-600 bg-green-50';
    if (rating >= 3.5) return 'text-yellow-600 bg-yellow-50';
    if (rating >= 2.5) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div 
      className="store-card group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Header */}
      <div className="relative flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {store.name}
          </h3>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              🏪 Store
            </span>
          </div>
        </div>
        
        {/* Rating Badge */}
        <div className="text-right">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getRatingColor(store.averageRating || 0)}`}>
            <span className="mr-1">⭐</span>
            {store.averageRating ? store.averageRating.toFixed(1) : '0.0'}
          </div>
          <p className="text-xs text-gray-500 mt-1">
            {store.totalRatings || 0} review{store.totalRatings !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Store Details */}
      <div className="relative space-y-3 mb-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-5 h-5 text-gray-400 mt-0.5">
            📧
          </div>
          <div>
            <p className="text-sm text-gray-600">{store.email}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-5 h-5 text-gray-400 mt-0.5">
            📍
          </div>
          <div>
            <p className="text-sm text-gray-600 line-clamp-2">{store.address}</p>
          </div>
        </div>
      </div>

      {/* User Rating Section */}
      {showUserRating && (
        <div className="relative mb-6">
          {userRating ? (
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-900 mb-1">Your Rating</p>
                  <RatingStars rating={userRating} readonly size="small" />
                </div>
                <div className="text-2xl">✅</div>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Not Rated Yet</p>
                  <p className="text-xs text-gray-500">Click to rate this store</p>
                </div>
                <div className="text-2xl">⭐</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="relative flex items-center justify-between">
        <button
          onClick={handleViewDetails}
          className="btn-gradient flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm shadow-lg hover:shadow-xl"
        >
          <span>View Details</span>
          <span className="transform group-hover:translate-x-1 transition-transform">→</span>
        </button>
        
        <div className="flex items-center space-x-2">
          {store.averageRating > 0 && (
            <RatingStars rating={store.averageRating || 0} readonly size="small" />
          )}
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className={`absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 transition-opacity duration-300 ${isHovered ? 'opacity-20' : 'opacity-0'}`} style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }} />
    </div>
  );
};

export default StoreCard;