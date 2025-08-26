import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStoresForUser, reset } from '../../redux/slices/storeSlice';
import Layout from '../../components/Layout';
import StoreList from '../../components/store/StoreList';
import PasswordUpdateForm from '../../components/forms/PasswordUpdateForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const DashboardUser = () => {
  const dispatch = useDispatch();
  const { stores, isLoading, isError, message, pagination } = useSelector((state) => state.stores);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 12,
    search: ''
  });

  useEffect(() => {
    dispatch(getStoresForUser(searchParams));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, searchParams]);

  const handleSearch = (searchTerm) => {
    setSearchParams(prev => ({
      ...prev,
      search: searchTerm,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setSearchParams(prev => ({
      ...prev,
      page: newPage
    }));
  };

  return (
    <Layout title="User Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center py-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Welcome to Your Dashboard
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Discover amazing stores and share your experiences with our community
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn btn-outline flex items-center space-x-2"
              >
                <span className="material-icons text-lg">lock</span>
                <span>Update Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Password Update Form */}
        {showPasswordForm && (
          <PasswordUpdateForm onClose={() => setShowPasswordForm(false)} />
        )}

        {/* Error Message */}
        {isError && <ErrorMessage message={message} />}

        {/* Store List */}
        <StoreList
          stores={stores}
          isLoading={isLoading}
          showUserRating={true}
          onSearch={handleSearch}
        />

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            <span className="px-3 py-2 text-sm text-gray-700">
              Page {pagination.page} of {pagination.pages}
            </span>
            
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {/* Stats */}
        {stores && stores.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Your Activity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stores.filter(store => store.ratings && store.ratings.length > 0).length}
                </div>
                <div className="text-sm text-gray-600">Stores Rated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {stores.length}
                </div>
                <div className="text-sm text-gray-600">Total Stores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {stores.filter(store => store.ratings && store.ratings.length === 0).length}
                </div>
                <div className="text-sm text-gray-600">Not Rated Yet</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardUser;