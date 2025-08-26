import api from '../utils/api';

const register = async (userData) => {
  const response = await api.post('/auth/register', userData);
  
  if (response.data.success) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

const login = async (userData) => {
  const response = await api.post('/auth/login', userData);
  
  if (response.data.success) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const updatePassword = async (passwordData, token) => {
  const response = await api.put('/auth/password', passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getMe = async (token) => {
  const response = await api.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  updatePassword,
  getMe,
};

export default authService;