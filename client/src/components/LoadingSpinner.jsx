import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...', color = 'blue' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };

  const colorClasses = {
    blue: 'border-blue-600',
    white: 'border-white',
    gray: 'border-gray-600',
    green: 'border-green-600',
    red: 'border-red-600'
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`${sizeClasses[size]} border-4 border-gray-200 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`} />
      {text && (
        <span className="text-sm text-gray-600 animate-pulse">{text}</span>
      )}
    </div>
  );
};

export default LoadingSpinner;