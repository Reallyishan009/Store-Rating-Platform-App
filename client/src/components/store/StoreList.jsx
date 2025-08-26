import React, { useState } from 'react';
import StoreCard from './StoreCard';
import LoadingSpinner from '../LoadingSpinner';

const StoreList = ({ stores, isLoading, showUserRating = false, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading stores..." />;
  }

  return (
    <div className="space-y-6">
      {onSearch && (
        <div className="mb-8">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Discover Amazing Stores
            </h2>
            <p className="text-gray-600">Find and rate your favorite local businesses</p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-icons text-gray-400 text-xl">search</span>
              </div>
              <input
                type="text"
                placeholder="Search stores by name or address..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 hover:border-gray-300 bg-white shadow-sm"
                style={{ fontFamily: 'Roboto, sans-serif' }}
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    onSearch('');
                  }}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <span className="material-icons text-gray-400 hover:text-gray-600 text-xl">clear</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {stores && stores.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              showUserRating={showUserRating}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="material-icons text-gray-400 text-4xl">store</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {searchTerm ? 'No stores match your search' : 'No stores available'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms or browse all available stores.' 
                : 'There are no stores available at the moment. Check back later!'}
            </p>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  onSearch('');
                }}
                className="btn btn-outline flex items-center space-x-2 mx-auto"
              >
                <span className="material-icons text-lg">clear</span>
                <span>Clear Search</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default StoreList;