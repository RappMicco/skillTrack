import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUpcomingData } from "./statusTableService.js";

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
