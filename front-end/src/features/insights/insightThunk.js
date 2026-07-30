import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSkillInsightRequest } from "./insightService.js";

export const fetchSkillInsights = createAsyncThunk(
  "insights/fetchSkillInsights",
  async (_, thunkAPI) => {
    try {
      const response = await fetchSkillInsightRequest();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || error.message,
      );
    }
  },
);
