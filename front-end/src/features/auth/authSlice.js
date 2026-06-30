import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
  },
});

export const { loginUser } = authSlice.actions;
export default authSlice.reducer;
