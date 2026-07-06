import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  message: null,
  success: false,
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
        state.error = action.payload;
        state.isAuthenticated = false;
        state.message = null;
        state.success = false;
      });

    //LOGOUT
  },
});

export default authSlice.reducer;
