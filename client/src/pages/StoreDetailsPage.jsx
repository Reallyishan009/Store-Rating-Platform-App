import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStoreById, reset } from '../redux/slices/storeSlice';
import Layout from '../components/Layout';
import RatingStars from '../components/rating/RatingStars';
import UserRating from '../components/rating/UserRating';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const StoreDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { store, isLoading, isError, message } = useSelector((state) => state.stores);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      dispatch(getStoreById(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  const handleRatingSubmitted = () => {
    // Refresh store data to get updated rating
    dispatch(getStoreById(id));
  };

  if (isLoading) {
    return (
      <Layout title="Store Details">
        <LoadingSpinner text="Loading store details..." />
      </Layout>
    );
  }

  if (isError) {
    return (
      <Layout title="Store Details">
        <ErrorMessage message={message} />
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          Back to Dashboard
        </button>
      </Layout>
    );
  }

  if (!store) {
    return (
      <Layout title="Store Details">
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Store not found</h3>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Dashboard
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Store Details">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Store Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
              <div className="flex items-center space-x-4">
                <RatingStars rating={store.averageRating || 0} readonly size="large" />
                <span className="text-gray-600">
                  ({store.totalRatings || 0} rating{store.totalRatings !== 1 ? 's' : ''})
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Information</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {store.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Address:</span> {store.address}
                </p>
              </div>
            </div>

            {store.owner && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Store Owner</h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <span className="font-medium">Name:</span> {store.owner.name}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Email:</span> {store.owner.email}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* User Rating Section - Only for normal users */}
        {user?.role === 'user' && (
          <UserRating storeId={store.id} onRatingSubmitted={handleRatingSubmitted} />
        )}

        {/* Recent Ratings */}
        {store.ratings && store.ratings.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Ratings</h3>
            <div className="space-y-4">
              {store.ratings.slice(0, 5).map((rating) => (
                <div key={rating.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-gray-900">{rating.user?.name}</p>
                    <p className="text-sm text-gray-500">
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

export default StoreDetailsPage;