import React from 'react';
import useSort from '../../hooks/useSort';
import RatingStars from '../rating/RatingStars';
import LoadingSpinner from '../LoadingSpinner';

const RatingTable = ({ ratings, isLoading, showStore = true, showUser = true }) => {
  const { sortedData, handleSort, getSortIcon } = useSort(ratings, 'createdAt', 'DESC');

  if (isLoading) {
    return <LoadingSpinner text="Loading ratings..." />;
  }

  return (
    <div className="space-y-4">
      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {showUser && (
                <th
                  onClick={() => handleSort('user.name')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  User {getSortIcon('user.name')}
                </th>
              )}
              {showStore && (
                <th
                  onClick={() => handleSort('store.name')}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                >
                  Store {getSortIcon('store.name')}
                </th>
              )}
              <th
                onClick={() => handleSort('rating')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Rating {getSortIcon('rating')}
              </th>
              <th
                onClick={() => handleSort('createdAt')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                Date {getSortIcon('createdAt')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData && sortedData.length > 0 ? (
              sortedData.map((rating) => (
                <tr key={rating.id} className="hover:bg-gray-50">
                  {showUser && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {rating.user?.name || 'Unknown User'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {rating.user?.email || 'No email'}
                        </div>
                      </div>
                    </td>
                  )}
                  {showStore && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {rating.store?.name || 'Unknown Store'}
                        </div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {rating.store?.address || 'No address'}
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap">
                    <RatingStars rating={rating.rating} readonly size="small" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(rating.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td 
                  colSpan={[showUser, showStore, true, true].filter(Boolean).length} 
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No ratings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      {sortedData && sortedData.length > 0 && (
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = sortedData.filter(rating => rating.rating === star).length;
              const percentage = sortedData.length > 0 ? (count / sortedData.length) * 100 : 0;
              
              return (
                <div key={star} className="bg-white rounded-md p-3">
                  <div className="text-lg font-semibold text-gray-900">{star} ⭐</div>
                  <div className="text-sm text-gray-600">{count} ratings</div>
                  <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingTable;