import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ratingService from "../../services/ratingService";

const initialState = {
  ratings: [],
  userRating: null,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Submit or update rating
export const submitRating = createAsyncThunk(
  "ratings/submit",
  async (ratingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ratingService.submitRating(ratingData, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user's rating for a store
export const getUserRatingForStore = createAsyncThunk(
  "ratings/getUserRating",
  async (storeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ratingService.getUserRatingForStore(storeId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all ratings for a store (Store Owner/Admin)
export const getStoreRatings = createAsyncThunk(
  "ratings/getStoreRatings",
  async ({ storeId, params }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ratingService.getStoreRatings(storeId, params, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all ratings (Admin only)
export const getAllRatings = createAsyncThunk(
  "ratings/getAll",
  async (params, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ratingService.getAllRatings(params, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete rating
export const deleteRating = createAsyncThunk(
  "ratings/delete",
  async (ratingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ratingService.deleteRating(ratingId, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const ratingSlice = createSlice({
  name: "ratings",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    clearUserRating: (state) => {
      state.userRating = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(submitRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(submitRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getUserRatingForStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserRatingForStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userRating = action.payload.data;
      })
      .addCase(getUserRatingForStore.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getStoreRatings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStoreRatings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ratings = action.payload.data;
      })
      .addCase(getStoreRatings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAllRatings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRatings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ratings = action.payload.data;
      })
      .addCase(getAllRatings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ratings = state.ratings.filter(
          (rating) => rating.id !== action.meta.arg
        );
      })
      .addCase(deleteRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, clearUserRating } = ratingSlice.actions;
export const ratingReducer = ratingSlice.reducer;
export default ratingSlice.reducer;
