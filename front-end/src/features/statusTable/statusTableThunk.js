import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getUpcomingData,
  getPendingData,
  getOngoingData,
} from "./statusTableService.js";

export const fetchUpcomingData = createAsyncThunk(
  "statusData/fetchUpcomingData",
  async (_, thunkAPI) => {
    try {
      const response = await getUpcomingData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchPendingData = createAsyncThunk(
  "statusData/fetchPendingData",
  async (_, thunkAPI) => {
    try {
      const response = await getPendingData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchOngoingData = createAsyncThunk(
  "statusData/fetchOngoingData",
  async (_, thunkAPI) => {
    try {
      const response = await getOngoingData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
