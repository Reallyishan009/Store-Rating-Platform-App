import api from '../utils/api';

const getUsers = async (params = {}, token) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/users?${queryString}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const createUser = async (userData, token) => {
  const response = await api.post('/users', userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getUserById = async (id, token) => {
  const response = await api.get(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const updateUser = async (id, userData, token) => {
  const response = await api.put(`/users/${id}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const deleteUser = async (id, token) => {
  const response = await api.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getDashboardStats = async (token) => {
  const response = await api.get('/dashboard/admin', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const getStoreOwnerDashboard = async (token) => {
  // Check if we're in demo mode
  if (token && token.startsWith('demo-token')) {
    // Return mock store owner data
    return {
      success: true,
      data: {
        store: {
          id: 'demo-store-123',
          name: 'Demo Store Electronics',
          email: 'demo@store.com',
          address: '123 Demo Street, Demo City, DC 12345',
          averageRating: 4.3,
          totalRatings: 47,
          ownerId: 'demo-store-owner-123'
        },
        ratings: [
          {
            id: 'rating-1',
            rating: 5,
            userId: 'user-1',
            user: {
              id: 'user-1',
              name: 'Alice Johnson',
              email: 'alice@example.com'
            },
            createdAt: '2024-02-20T10:00:00Z'
          },
          {
            id: 'rating-2',
            rating: 4,
            userId: 'user-2',
            user: {
              id: 'user-2',
              name: 'Bob Smith',
              email: 'bob@example.com'
            },
            createdAt: '2024-02-19T15:30:00Z'
          },
          {
            id: 'rating-3',
            rating: 5,
            userId: 'user-3',
            user: {
              id: 'user-3',
              name: 'Carol Davis',
              email: 'carol@example.com'
            },
            createdAt: '2024-02-18T09:15:00Z'
          },
          {
            id: 'rating-4',
            rating: 3,
            userId: 'user-4',
            user: {
              id: 'user-4',
              name: 'David Wilson',
              email: 'david@example.com'
            },
            createdAt: '2024-02-17T14:45:00Z'
          },
          {
            id: 'rating-5',
            rating: 4,
            userId: 'user-5',
            user: {
              id: 'user-5',
              name: 'Eva Brown',
              email: 'eva@example.com'
            },
            createdAt: '2024-02-16T11:20:00Z'
          }
        ]
      }
    };
  }

  const response = await api.get('/dashboard/store-owner', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};

const userService = {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  getDashboardStats,
  getStoreOwnerDashboard,
};

export default userService;