import api from '../utils/api';

const submitRating = async (ratingData, token) => {
  const response = await api.post('/ratings', ratingData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getUserRatingForStore = async (storeId, token) => {
  const response = await api.get(`/ratings/store/${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getStoreRatings = async (storeId, params = {}, token) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/ratings/store/${storeId}/all?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getAllRatings = async (params = {}, token) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/ratings?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const deleteRating = async (ratingId, token) => {
  const response = await api.delete(`/ratings/${ratingId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const ratingService = {
  submitRating,
  getUserRatingForStore,
  getStoreRatings,
  getAllRatings,
  deleteRating,
};

export default ratingService;