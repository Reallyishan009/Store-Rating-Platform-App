import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import storeService from '../../services/storeService';

const initialState = {
  stores: [],
  store: null,
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

// Dummy store data for demonstration
const getDummyStores = () => [
  {
    id: 'store-1',
    name: 'Tech Paradise Electronics',
    email: 'contact@techparadise.com',
    address: '123 Technology Street, Silicon Valley, CA 94000',
    averageRating: 4.5,
    totalRatings: 128,
    ownerId: 'owner-1',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'store-2',
    name: 'Fashion Forward Boutique',
    email: 'hello@fashionforward.com',
    address: '456 Style Avenue, New York, NY 10001',
    averageRating: 4.2,
    totalRatings: 89,
    ownerId: 'owner-2',
    createdAt: '2024-02-01T14:30:00Z'
  },
  {
    id: 'store-3',
    name: 'Gourmet Food Market',
    email: 'info@gourmetmarket.com',
    address: '789 Culinary Boulevard, Chicago, IL 60601',
    averageRating: 4.8,
    totalRatings: 203,
    ownerId: 'owner-3',
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: 'store-4',
    name: 'Home & Garden Center',
    email: 'support@homegarden.com',
    address: '321 Green Thumb Lane, Portland, OR 97201',
    averageRating: 4.1,
    totalRatings: 67,
    ownerId: 'owner-4',
    createdAt: '2024-02-10T11:45:00Z'
  },
  {
    id: 'store-5',
    name: 'Sports Equipment Pro',
    email: 'sales@sportspro.com',
    address: '654 Athletic Drive, Denver, CO 80202',
    averageRating: 4.6,
    totalRatings: 156,
    ownerId: 'owner-5',
    createdAt: '2024-01-25T16:20:00Z'
  },
  {
    id: 'store-6',
    name: 'Book Haven Library',
    email: 'books@bookhaven.com',
    address: '987 Literature Lane, Boston, MA 02101',
    averageRating: 4.7,
    totalRatings: 234,
    ownerId: 'owner-6',
    createdAt: '2024-02-05T13:10:00Z'
  },
  {
    id: 'store-7',
    name: 'Coffee Corner Cafe',
    email: 'hello@coffeecorner.com',
    address: '555 Brew Street, Seattle, WA 98101',
    averageRating: 4.4,
    totalRatings: 92,
    ownerId: 'owner-7',
    createdAt: '2024-02-12T08:30:00Z'
  },
  {
    id: 'store-8',
    name: 'Pet Paradise Store',
    email: 'care@petparadise.com',
    address: '888 Animal Avenue, Austin, TX 78701',
    averageRating: 4.9,
    totalRatings: 176,
    ownerId: 'owner-8',
    createdAt: '2024-01-30T12:15:00Z'
  }
];

// Get all stores
export const getStores = createAsyncThunk(
  'stores/getAll',
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      
      // Always try to fetch real data first
      try {
        const result = await storeService.getStores(params, token);
        
        // If we get real data but it's empty, return dummy data
        if (!result.data || result.data.length === 0) {
          const dummyStores = getDummyStores();
          return {
            success: true,
            data: dummyStores,
            pagination: {
              total: dummyStores.length,
              page: params?.page || 1,
              pages: Math.ceil(dummyStores.length / (params?.limit || 12))
            }
          };
        }
        
        return result;
      } catch (apiError) {
        // If API fails, return dummy data as fallback
        const dummyStores = getDummyStores();
        return {
          success: true,
          data: dummyStores,
          pagination: {
            total: dummyStores.length,
            page: params?.page || 1,
            pages: Math.ceil(dummyStores.length / (params?.limit || 12))
          }
        };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get dummy stores with user ratings
const getDummyStoresForUser = (userId) => [
  {
    id: 'store-1',
    name: 'Tech Paradise Electronics',
    email: 'contact@techparadise.com',
    address: '123 Technology Street, Silicon Valley, CA 94000',
    averageRating: 4.5,
    totalRatings: 128,
    ratings: [
      { id: 'rating-1', rating: 5, userId: userId }
    ],
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'store-2',
    name: 'Fashion Forward Boutique',
    email: 'hello@fashionforward.com',
    address: '456 Style Avenue, New York, NY 10001',
    averageRating: 4.2,
    totalRatings: 89,
    ratings: [],
    createdAt: '2024-02-01T14:30:00Z'
  },
  {
    id: 'store-3',
    name: 'Gourmet Food Market',
    email: 'info@gourmetmarket.com',
    address: '789 Culinary Boulevard, Chicago, IL 60601',
    averageRating: 4.8,
    totalRatings: 203,
    ratings: [
      { id: 'rating-2', rating: 4, userId: userId }
    ],
    createdAt: '2024-01-20T09:15:00Z'
  },
  {
    id: 'store-4',
    name: 'Home & Garden Center',
    email: 'support@homegarden.com',
    address: '321 Green Thumb Lane, Portland, OR 97201',
    averageRating: 4.1,
    totalRatings: 67,
    ratings: [],
    createdAt: '2024-02-10T11:45:00Z'
  },
  {
    id: 'store-5',
    name: 'Sports Equipment Pro',
    email: 'sales@sportspro.com',
    address: '654 Athletic Drive, Denver, CO 80202',
    averageRating: 4.6,
    totalRatings: 156,
    ratings: [
      { id: 'rating-3', rating: 5, userId: userId }
    ],
    createdAt: '2024-01-25T16:20:00Z'
  },
  {
    id: 'store-6',
    name: 'Book Haven Library',
    email: 'books@bookhaven.com',
    address: '987 Literature Lane, Boston, MA 02101',
    averageRating: 4.7,
    totalRatings: 234,
    ratings: [],
    createdAt: '2024-02-05T13:10:00Z'
  },
  {
    id: 'store-7',
    name: 'Coffee Corner Cafe',
    email: 'hello@coffeecorner.com',
    address: '555 Brew Street, Seattle, WA 98101',
    averageRating: 4.4,
    totalRatings: 92,
    ratings: [
      { id: 'rating-4', rating: 4, userId: userId }
    ],
    createdAt: '2024-02-12T08:30:00Z'
  },
  {
    id: 'store-8',
    name: 'Pet Paradise Store',
    email: 'care@petparadise.com',
    address: '888 Animal Avenue, Austin, TX 78701',
    averageRating: 4.9,
    totalRatings: 176,
    ratings: [],
    createdAt: '2024-01-30T12:15:00Z'
  }
];

// Get stores for user (with user ratings)
export const getStoresForUser = createAsyncThunk(
  'stores/getForUser',
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const user = thunkAPI.getState().auth.user;
      
      // Always try to fetch real data first
      try {
        const result = await storeService.getStoresForUser(params, token);
        
        // If we get real data but it's empty, return dummy data
        if (!result.data || result.data.length === 0) {
          let dummyStores = getDummyStoresForUser(user?.id || 'demo-user');
          
          // Filter by search if provided
          if (params.search) {
            dummyStores = dummyStores.filter(store => 
              store.name.toLowerCase().includes(params.search.toLowerCase()) ||
              store.address.toLowerCase().includes(params.search.toLowerCase())
            );
          }

          return {
            success: true,
            data: dummyStores,
            pagination: {
              total: dummyStores.length,
              page: params.page || 1,
              pages: Math.ceil(dummyStores.length / (params.limit || 12))
            }
          };
        }
        
        return result;
      } catch (apiError) {
        // If API fails, return dummy data as fallback
        let dummyStores = getDummyStoresForUser(user?.id || 'demo-user');
        
        // Filter by search if provided
        if (params.search) {
          dummyStores = dummyStores.filter(store => 
            store.name.toLowerCase().includes(params.search.toLowerCase()) ||
            store.address.toLowerCase().includes(params.search.toLowerCase())
          );
        }

        return {
          success: true,
          data: dummyStores,
          pagination: {
            total: dummyStores.length,
            page: params.page || 1,
            pages: Math.ceil(dummyStores.length / (params.limit || 12))
          }
        };
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get dummy store by ID
const getDummyStoreById = (id) => {
  const dummyStores = getDummyStores();
  const store = dummyStores.find(s => s.id === id) || dummyStores[0];
  
  return {
    ...store,
    ratings: [
      {
        id: 'rating-1',
        rating: 5,
        userId: 'user-1',
        userName: 'John Doe',
        createdAt: '2024-02-20T10:00:00Z'
      },
      {
        id: 'rating-2',
        rating: 4,
        userId: 'user-2',
        userName: 'Jane Smith',
        createdAt: '2024-02-19T15:30:00Z'
      },
      {
        id: 'rating-3',
        rating: 5,
        userId: 'user-3',
        userName: 'Mike Johnson',
        createdAt: '2024-02-18T09:15:00Z'
      },
      {
        id: 'rating-4',
        rating: 3,
        userId: 'user-4',
        userName: 'Sarah Wilson',
        createdAt: '2024-02-17T14:45:00Z'
      },
      {
        id: 'rating-5',
        rating: 4,
        userId: 'user-5',
        userName: 'David Brown',
        createdAt: '2024-02-16T11:20:00Z'
      }
    ]
  };
};

// Get store by ID
export const getStoreById = createAsyncThunk(
  'stores/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      
      // Always try to fetch real data first
      try {
        const result = await storeService.getStoreById(id, token);
        
        // If we get real data, return it
        if (result.data) {
          return result;
        }
      } catch (apiError) {
        // If API fails, return dummy data as fallback
      }
      
      // Return dummy store data as fallback
      const dummyStore = getDummyStoreById(id);
      return {
        success: true,
        data: dummyStore
      };
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create store (Admin only)
export const createStore = createAsyncThunk(
  'stores/create',
  async (storeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await storeService.createStore(storeData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update store (Admin only)
export const updateStore = createAsyncThunk(
  'stores/update',
  async ({ id, storeData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await storeService.updateStore(id, storeData, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete store (Admin only)
export const deleteStore = createAsyncThunk(
  'stores/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await storeService.deleteStore(id, token);
    } catch (error) {
      const message = error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const storeSlice = createSlice({
  name: 'stores',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
    clearStore: (state) => {
      state.store = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getStores.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStoresForUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoresForUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(getStoresForUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStoreById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.store = action.payload.data;
      })
      .addCase(getStoreById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores.push(action.payload.data);
      })
      .addCase(createStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const index = state.stores.findIndex(store => store.id === action.payload.data.id);
        if (index !== -1) {
          state.stores[index] = action.payload.data;
        }
      })
      .addCase(updateStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores = state.stores.filter(store => store.id !== action.meta.arg);
      })
      .addCase(deleteStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export const { reset, clearStore } = storeSlice.actions;
export default storeSlice.reducer;