import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTrainingSummary,
  getRecenTrainingSummary,
} from "./statusService.js";

export const fetchTrainingSummary = createAsyncThunk(
  "training/fetchTrainingSummary",
  async (_, thunkAPI) => {
    try {
      return await getTrainingSummary();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchRecentTrainings = createAsyncThunk(
  "training/fetchRecentTrainings",
  async (_, thunkAPI) => {
    try {
      const response = await getRecenTrainingSummary();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
