import { createSlice } from "@reduxjs/toolkit";
import { loginUser, getCurrentUser, logoutUser } from "./authThunk.js";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
  success: false,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      //LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.message = action.payload.message;
        state.success = action.payload.success;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.user = null;
        state.isAuthenticated = false;
        state.message = null;
        state.success = false;
      })

      //GET CURRENT USER
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.isAuthenticated = true;
        state.success = true;
      })

      .addCase(getCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
      })

      //LOGOUT
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.success = false;
        state.token = null;
        state.message = null;
      });
  },
});

export default authSlice.reducer;
