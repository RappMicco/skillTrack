import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTrainingSummary } from "./statusService.js";

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
