import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSkillMatrixSummary,
  getCompetencyData,
  getEmployees,
  getSkillProficiencyLevels,
  getSkillMatrixCells,
  createSkillMatrixEntry,
  updateSkillMatrixEntry,
  getPublicSkillMatrixSummary,
  getPublicTrainingSummary,
  getPublicLearningCourses,
} from "./matrixService.js";

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

export const fetchEmployees = createAsyncThunk(
  "matrix/fetchEmployees",
  async (_, thunkAPI) => {
    try {
      const response = await getEmployees();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchSkillProficiencyLevels = createAsyncThunk(
  "matrix/fetchSkillProficiencyLevels",
  async (_, thunkAPI) => {
    try {
      const response = await getSkillProficiencyLevels();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchSkillMatrixCells = createAsyncThunk(
  "matrix/fetchSkillMatrixCells",
  async (_, thunkAPI) => {
    try {
      const response = await getSkillMatrixCells();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const createSkillMatrix = createAsyncThunk(
  "matrix/createSkillMatrix",
  async (payload, thunkAPI) => {
    try {
      const response = await createSkillMatrixEntry(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message,
      );
    }
  },
);

export const updateSkillMatrix = createAsyncThunk(
  "matrix/updateSkillMatrix",
  async (payload, thunkAPI) => {
    try {
      const response = await updateSkillMatrixEntry(payload);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors?.[0]?.message ||
          error.response?.data?.message,
      );
    }
  },
);

export const fetchPublicSkillSummary = createAsyncThunk(
  "matrix/fetchPublicSkillSummary",
  async (_, thunkAPI) => {
    try {
      const response = await getPublicSkillMatrixSummary();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchPublicTrainingSummary = createAsyncThunk(
  "matrix/fetchPublicTrainingSummary",
  async (_, thunkAPI) => {
    try {
      const response = await getPublicTrainingSummary();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const fetchPublicLearningCourses = createAsyncThunk(
  "matrix/fetchPublicLearningCourses",
  async (_, thunkAPI) => {
    try {
      const response = await getPublicLearningCourses();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);
