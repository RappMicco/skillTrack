import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, getMe, logOutUser } from "./authService.js";

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

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      return await getMe();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await logOutUser();
    } catch (error) {
      return thunkAPI.rejectWithValue(error?.message || "Logout failed!");
    }
  },
);
