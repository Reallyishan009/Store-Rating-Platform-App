import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userService from '../../services/userService';
import Layout from '../../components/Layout';
import RatingTable from '../../components/tables/RatingTable';
import RatingStars from '../../components/rating/RatingStars';
import PasswordUpdateForm from '../../components/forms/PasswordUpdateForm';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const DashboardStoreOwner = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [storeData, setStoreData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setIsLoading(true);
        
        // Check if we're in demo mode
        if (token && token.startsWith('demo-token')) {
          // Return mock store data for demo
          const mockStoreData = {
            store: {
              id: 'demo-store-123',
              name: 'Demo Electronics Store',
              email: 'demo@electronics.com',
              address: '123 Demo Street, Demo City, DC 12345',
              averageRating: 4.3,
              totalRatings: 47,
              ownerId: 'demo-store-owner-123'
            },
            ratings: [
              {
                id: 'rating-1',
                rating: 5,
                user: { name: 'Alice Johnson', email: 'alice@example.com' },
                createdAt: '2024-02-20T10:00:00Z'
              },
              {
                id: 'rating-2',
                rating: 4,
                user: { name: 'Bob Smith', email: 'bob@example.com' },
                createdAt: '2024-02-19T15:30:00Z'
              },
              {
                id: 'rating-3',
                rating: 5,
                user: { name: 'Carol Davis', email: 'carol@example.com' },
                createdAt: '2024-02-18T09:15:00Z'
              },
              {
                id: 'rating-4',
                rating: 3,
                user: { name: 'David Wilson', email: 'david@example.com' },
                createdAt: '2024-02-17T14:45:00Z'
              },
              {
                id: 'rating-5',
                rating: 4,
                user: { name: 'Eva Brown', email: 'eva@example.com' },
                createdAt: '2024-02-16T11:20:00Z'
              }
            ]
          };
          
          setStoreData(mockStoreData);
        } else {
          const response = await userService.getStoreOwnerDashboard(token);
          setStoreData(response.data);
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load store data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStoreData();
  }, [token]);

  if (isLoading) {
    return (
      <Layout title="Store Owner Dashboard">
        <LoadingSpinner text="Loading your store data..." />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Store Owner Dashboard">
        <ErrorMessage message={error} />
      </Layout>
    );
  }

  if (!storeData || !storeData.store) {
    return (
      <Layout title="Store Owner Dashboard">
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏪</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No store assigned</h3>
          <p className="text-gray-500">
            You don't have a store assigned to your account yet. Please contact an administrator.
          </p>
        </div>
      </Layout>
    );
  }

  const { store, ratings } = storeData;

  return (
    <Layout title="Store Owner Dashboard">
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="text-center py-8 mb-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Store Owner Dashboard
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Manage your store, track customer feedback, and grow your business with insights
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowPasswordForm(!showPasswordForm)}
                className="btn btn-outline flex items-center space-x-2"
              >
                <span className="material-icons text-lg">store</span>
                <span>Update Password</span>
              </button>
            </div>
          </div>
        </div>

        {/* Password Update Form */}
        {showPasswordForm && (
          <PasswordUpdateForm onClose={() => setShowPasswordForm(false)} />
        )}

        {/* Store Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Store</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{store.name}</h4>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Store ID:</span> {store.id}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Total Ratings:</span> {store.totalRatings}
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">Average Rating</h4>
              <div className="flex items-center space-x-4">
                <RatingStars rating={store.averageRating || 0} readonly size="large" />
                <span className="text-2xl font-bold text-gray-900">
                  {store.averageRating || 0}/5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = ratings.filter(rating => rating.rating === star).length;
            const percentage = store.totalRatings > 0 ? (count / store.totalRatings) * 100 : 0;
            
            return (
              <div key={star} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{star} Star</span>
                  <span className="text-sm text-gray-500">{count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{percentage.toFixed(1)}%</div>
              </div>
            );
          })}
        </div>

        {/* Customer Ratings */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Ratings</h3>
          {ratings && ratings.length > 0 ? (
            <RatingTable ratings={ratings} showStore={false} />
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-400 text-4xl mb-4">⭐</div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">No ratings yet</h4>
              <p className="text-gray-500">
                Your store hasn't received any ratings from customers yet.
              </p>
            </div>
          )}
        </div>

        {/* Recent Activity Summary */}
        {ratings && ratings.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {ratings.slice(0, 5).map((rating) => (
                <div key={rating.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{rating.user.name}</p>
                    <p className="text-sm text-gray-500">{rating.user.email}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <RatingStars rating={rating.rating} readonly size="small" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DashboardStoreOwner;