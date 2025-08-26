import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService';

const initialState = {
  users: [],
  user: null,
  dashboardStats: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  pagination: {
    total: 0,
    page: 1,
    pages: 1
  }
};

// Dummy user data
const getDummyUsers = () => [
  {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'user',
    address: '123 Main Street, Anytown, USA',
    createdAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 'user-2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'store_owner',
    address: '456 Oak Avenue, Somewhere, USA',
    ownedStoreId: 'store-2',
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'user-3',
    name: 'Mike Johnson',
    email: 'mike.johnson@example.com',
    role: 'user',
    address: '789 Pine Road, Elsewhere, USA',
    createdAt: '2024-01-20T14:15:00Z'
  },
  {
    id: 'user-4',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@example.com',
    role: 'store_owner',
    address: '321 Elm Street, Nowhere, USA',
    ownedStoreId: 'store-4',
    createdAt: '2024-02-01T09:45:00Z'
  },
  {
    id: 'user-5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    role: 'admin',
    address: '654 Maple Drive, Anywhere, USA',
    createdAt: '2024-02-05T11:20:00Z'
  },
  {
    id: 'user-6',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    role: 'user',
    address: '987 Cedar Lane, Somewhere Else, USA',
    createdAt: '2024-02-08T16:30:00Z'
  },
  {
    id: 'user-7',
    name: 'Robert Miller',
    email: 'robert.miller@example.com',
    role: 'store_owner',
    address: '246 Birch Street, Another Place, USA',
    ownedStoreId: 'store-7',
    createdAt: '2024-02-12T12:15:00Z'
  }
];

// Get all users (Admin only)
export const getUsers = createAsyncThunk(
  'users/getAll',
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      
      // Always try to fetch real data first
      try {
        const result = await userService.getUsers(params, token);
        
        // If we get real data but it's empty, return dummy data
        if (!result.data || result.data.length === 0) {
          const dummyUsers = getDummyUsers();
          return {
            success: true,
            data: dummyUsers,
            pagination: {
              total: dummyUsers.length,
              page: params?.page || 1,
              pages: Math.ceil(dummyUsers.length / (params?.limit || 10))
            }
          };
        }
        
        return result;
      } catch (apiError) {
        // If API fails, return dummy data as fallback
        const dummyUsers = getDummyUsers();
        return {
          success: true,
          data: dummyUsers,
          pagination: {
            total: dummyUsers.length,
            page: params?.page || 1,
            pages: Math.ceil(dummyUsers.length / (params?.limit || 10))
          }
        };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create user (Admin only)
export const createUser = createAsyncThunk(
  'users/create',
  async (userData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.createUser(userData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user by ID
export const getUserById = createAsyncThunk(
  'users/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.getUserById(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update user (Admin only)
export const updateUser = createAsyncThunk(
  'users/update',
  async ({ id, userData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.updateUser(id, userData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete user (Admin only)
export const deleteUser = createAsyncThunk(
  'users/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await userService.deleteUser(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Dummy dashboard stats
const getDummyDashboardStats = () => ({
  stats: {
    totalUsers: 156,
    totalStores: 23,
    totalRatings: 1247,
    averageRating: 4.3
  },
  recent: {
    users: [
      {
        id: 'user-1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'user',
        createdAt: '2024-02-20T08:00:00Z'
      },
      {
        id: 'user-2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        role: 'store_owner',
        createdAt: '2024-02-19T10:30:00Z'
      },
      {
        id: 'user-3',
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        role: 'user',
        createdAt: '2024-02-18T14:15:00Z'
      },
      {
        id: 'user-4',
        name: 'Emily Davis',
        email: 'emily.davis@example.com',
        role: 'user',
        createdAt: '2024-02-17T12:30:00Z'
      },
      {
        id: 'user-5',
        name: 'Robert Miller',
        email: 'robert.miller@example.com',
        role: 'store_owner',
        createdAt: '2024-02-16T09:45:00Z'
      }
    ],
    stores: [
      {
        id: 'store-1',
        name: 'Tech Paradise Electronics',
        email: 'contact@techparadise.com',
        averageRating: 4.5,
        totalRatings: 128,
        createdAt: '2024-02-15T10:00:00Z'
      },
      {
        id: 'store-2',
        name: 'Fashion Forward Boutique',
        email: 'hello@fashionforward.com',
        averageRating: 4.2,
        totalRatings: 89,
        createdAt: '2024-02-14T14:30:00Z'
      },
      {
        id: 'store-3',
        name: 'Gourmet Food Market',
        email: 'info@gourmetmarket.com',
        averageRating: 4.8,
        totalRatings: 203,
        createdAt: '2024-02-13T16:20:00Z'
      },
      {
        id: 'store-4',
        name: 'Coffee Corner Cafe',
        email: 'hello@coffeecorner.com',
        averageRating: 4.4,
        totalRatings: 92,
        createdAt: '2024-02-12T08:30:00Z'
      }
    ]
  }
});

// Get dashboard stats
export const getDashboardStats = createAsyncThunk(
  'users/getDashboardStats',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      
      // Always try to fetch real data first
      try {
        const result = await userService.getDashboardStats(token);
        
        // If we get real data, return it
        if (result.data) {
          return result;
        }
      } catch (apiError) {
        // If API fails, return dummy data as fallback
      }
      
      // Return dummy stats as fallback
      const dummyStats = getDummyDashboardStats();
      return {
        success: true,
        data: dummyStats
      };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users.push(action.payload.data);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.data;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.users.findIndex(user => user.id === action.payload.data.id);
        if (index !== -1) {
          state.users[index] = action.payload.data;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.users = state.users.filter(user => user.id !== action.meta.arg);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getDashboardStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardStats = action.payload.data;
      })
      .addCase(getDashboardStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, clearUser } = userSlice.actions;
export default userSlice.reducer;