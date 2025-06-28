import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axios";

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/employers/login",
        credentials
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const silentRefresh = createAsyncThunk(
  "user/silentRefresh",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosInstance.post("/employers/refresh-token");

      if (!response.data.token) {
        throw new Error("No token received from refresh");
      }

      // Update both token and user in localStorage
      localStorage.setItem("token", response.data.token);

      // If user data is included in refresh response, update it
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return {
        token: response.data.token,
        user: response.data.user || JSON.parse(localStorage.getItem("user")),
      };
    } catch (error) {
      // Clear all auth data on failure
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearUser());
      return rejectWithValue(
        error.response?.data?.message || "Session expired. Please login again."
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      await axiosInstance.post("/employers/logout");
      
      // Clear all client-side auth data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearUser());
      
      return true;
    } catch (error) {
      // Even if API fails, ensure client-side cleanup
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      dispatch(clearUser());
      
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(silentRefresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(silentRefresh.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = {
          ...state.currentUser,
          token: action.payload.token,
        };
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(silentRefresh.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.loading = false;
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
