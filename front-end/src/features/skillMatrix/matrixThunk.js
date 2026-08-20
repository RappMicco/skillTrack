import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSkillMatrixSummary, getCompetencyData } from "./matrixService.js";

export const fetchSkillMatrixSummary = createAsyncThunk(
  "matrix/fetchSkillMatrixSummary",
  async (_, thunkAPI) => {
    try {
      const response = await getSkillMatrixSummary();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchCompetencyData = createAsyncThunk(
  "matrix/fetchCompetencyData",
  async (_, thunkAPI) => {
    try {
      const response = await getCompetencyData();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);
