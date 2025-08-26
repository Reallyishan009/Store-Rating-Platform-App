import api from '../utils/api';

const getStores = async (params = {}, token) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/stores?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getStoresForUser = async (params = {}, token) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/stores/user?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getStoreById = async (id, token) => {
  const response = await api.get(`/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const createStore = async (storeData, token) => {
  const response = await api.post('/stores', storeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const updateStore = async (id, storeData, token) => {
  const response = await api.put(`/stores/${id}`, storeData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const deleteStore = async (id, token) => {
  const response = await api.delete(`/stores/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const storeService = {
  getStores,
  getStoresForUser,
  getStoreById,
  createStore,
  updateStore,
  deleteStore,
};

export default storeService;