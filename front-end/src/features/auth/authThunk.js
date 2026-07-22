import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, getMe, logOutUser } from "./authService.js";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const response = await login(credentials);
      console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message,
      );
    }
  },
);

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await getMe();
      return response;
    } catch (error) {
      console.log(error.response.data.message);
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message,
      );
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
