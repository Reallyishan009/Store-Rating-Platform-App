import React, { useState } from 'react';

const RatingStars = ({ rating, onRatingChange, readonly = false, size = 'medium', showLabel = true }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  const handleStarClick = (starRating) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleMouseEnter = (starRating) => {
    if (!readonly) {
      setHoverRating(starRating);
    }
  };

  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };

  const getStarColor = (star) => {
    const currentRating = hoverRating || rating;
    if (star <= currentRating) {
      if (currentRating >= 4.5) return 'text-yellow-400';
      if (currentRating >= 3.5) return 'text-yellow-400';
      if (currentRating >= 2.5) return 'text-orange-400';
      return 'text-red-400';
    }
    return readonly ? 'text-gray-300' : 'text-gray-300 hover:text-yellow-300';
  };

  const getRatingText = () => {
    const currentRating = rating || 0;
    if (currentRating >= 4.5) return 'Excellent';
    if (currentRating >= 3.5) return 'Good';
    if (currentRating >= 2.5) return 'Average';
    if (currentRating >= 1.5) return 'Poor';
    if (currentRating > 0) return 'Very Poor';
    return 'No Rating';
  };

  return (
    <div className="flex items-center space-x-2">
      <div 
        className="flex items-center space-x-1"
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            disabled={readonly}
            className={`${sizeClasses[size]} ${
              readonly 
                ? 'cursor-default' 
                : 'cursor-pointer hover:scale-125 active:scale-110'
            } transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 rounded`}
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
          >
            <svg
              className={`w-full h-full ${getStarColor(star)} transition-colors duration-200 drop-shadow-sm`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
      
      {showLabel && (
        <div className="flex items-center space-x-2">
          {rating > 0 && (
            <span className="text-sm font-medium text-gray-700">
              {rating.toFixed(1)}
            </span>
          )}
          {!readonly && hoverRating > 0 && (
            <span className="text-sm text-gray-600 animate-fade-in">
              {getRatingText()}
            </span>
          )}
          {readonly && rating > 0 && (
            <span className="text-xs text-gray-500">
              {getRatingText()}
            </span>
          )}
        </div>
      )}
      
      {!readonly && (
        <div className="text-xs text-gray-400 ml-2">
          {hoverRating > 0 ? `Click to rate ${hoverRating} star${hoverRating !== 1 ? 's' : ''}` : 'Click to rate'}
        </div>
      )}
    </div>
  );
};

export default RatingStars;