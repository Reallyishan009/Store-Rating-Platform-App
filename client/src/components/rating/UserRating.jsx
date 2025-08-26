import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitRating, getUserRatingForStore, reset } from '../../redux/slices/ratingSlice';
import RatingStars from './RatingStars';
import LoadingSpinner from '../LoadingSpinner';
import ErrorMessage from '../ErrorMessage';
import SuccessMessage from '../SuccessMessage';

const UserRating = ({ storeId, onRatingSubmitted }) => {
  const dispatch = useDispatch();
  const { userRating, isLoading, isError, isSuccess, message } = useSelector((state) => state.ratings);
  const [currentRating, setCurrentRating] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (storeId) {
      dispatch(getUserRatingForStore(storeId));
    }
  }, [dispatch, storeId]);

  useEffect(() => {
    if (userRating) {
      setCurrentRating(userRating.rating);
      setHasSubmitted(true);
    }
  }, [userRating]);

  useEffect(() => {
    if (isSuccess && message) {
      setTimeout(() => {
        dispatch(reset());
        if (onRatingSubmitted) {
          onRatingSubmitted();
        }
      }, 2000);
    }

    if (isError) {
      setTimeout(() => dispatch(reset()), 3000);
    }
  }, [isSuccess, isError, message, dispatch, onRatingSubmitted]);

  const handleRatingChange = (rating) => {
    setCurrentRating(rating);
  };

  const handleSubmit = () => {
    if (currentRating > 0) {
      dispatch(submitRating({ storeId, rating: currentRating }));
      setHasSubmitted(true);
    }
  };

  const handleEdit = () => {
    setHasSubmitted(false);
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h4 className="text-lg font-medium text-gray-900 mb-3">
        {hasSubmitted ? 'Your Rating' : 'Rate this Store'}
      </h4>

      {isError && <ErrorMessage message={message} />}
      {isSuccess && <SuccessMessage message={message} />}

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <RatingStars
            rating={currentRating}
            onRatingChange={handleRatingChange}
            readonly={hasSubmitted && !isLoading}
            size="large"
          />
        </div>

        {!hasSubmitted && (
          <div className="flex space-x-3">
            <button
              onClick={handleSubmit}
              disabled={currentRating === 0 || isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <LoadingSpinner size="small" text="" /> : 'Submit Rating'}
            </button>
          </div>
        )}

        {hasSubmitted && !isLoading && (
          <div className="flex space-x-3">
            <button
              onClick={handleEdit}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
            >
              Modify Rating
            </button>
          </div>
        )}

        {currentRating > 0 && !hasSubmitted && (
          <p className="text-sm text-gray-600">
            Click "Submit Rating" to save your {currentRating}-star rating
          </p>
        )}
      </div>
    </div>
  );
};

export default UserRating;