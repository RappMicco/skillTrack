import { createAsyncThunk } from "@reduxjs/toolkit";
import { login } from "./authService.js";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      return await login(credentials);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
