import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import storeReducer from './slices/storeSlice';
import { ratingReducer } from './slices/ratingSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    stores: storeReducer,
    ratings: ratingReducer,
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});