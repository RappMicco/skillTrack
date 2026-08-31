import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSkillList,
  createSkillEntry,
  updateSkillEntry,
  getProficiencyList,
  createProficiencyEntry,
  updateProficiencyEntry,
  getTrainingProviderList,
  createTrainingProviderEntry,
  updateTrainingProviderEntry,
  getCompetencyList,
  createCompetencyEntry,
  updateCompetencyEntry,
  getSkillMatrixAssignmentList,
  createSkillMatrixAssignmentEntry,
  updateSkillMatrixAssignmentEntry,
  getEmployeeList,
  registerEmployeeEntry,
  updateEmployeeEntry,
  getSkillCompetencyList,
  createSkillCompetencyEntry,
  updateSkillCompetencyEntry,
  getStatusTraining,
  createAssignTraining,
} from "./maintenanceService.js";

const rejectWith = (thunkAPI, error) =>
  thunkAPI.rejectWithValue(
    error.response?.data?.errors?.[0]?.message ||
      error.response?.data?.message ||
      error.message,
  );

// Skills
export const fetchSkills = createAsyncThunk(
  "maintenance/fetchSkills",
  async (_, thunkAPI) => {
    try {
      return await getSkillList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const createSkill = createAsyncThunk(
  "maintenance/createSkill",
  async (payload, thunkAPI) => {
    try {
      return await createSkillEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateSkill = createAsyncThunk(
  "maintenance/updateSkill",
  async (payload, thunkAPI) => {
    try {
      return await updateSkillEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

// Skill Proficiency
export const fetchProficiencies = createAsyncThunk(
  "maintenance/fetchProficiencies",
  async (_, thunkAPI) => {
    try {
      return await getProficiencyList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const createProficiency = createAsyncThunk(
  "maintenance/createProficiency",
  async (payload, thunkAPI) => {
    try {
      return await createProficiencyEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateProficiency = createAsyncThunk(
  "maintenance/updateProficiency",
  async (payload, thunkAPI) => {
    try {
      return await updateProficiencyEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

// Training Providers
export const fetchTrainingProviders = createAsyncThunk(
  "maintenance/fetchTrainingProviders",
  async (_, thunkAPI) => {
    try {
      return await getTrainingProviderList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const createTrainingProvider = createAsyncThunk(
  "maintenance/createTrainingProvider",
  async (payload, thunkAPI) => {
    try {
      return await createTrainingProviderEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateTrainingProvider = createAsyncThunk(
  "maintenance/updateTrainingProvider",
  async (payload, thunkAPI) => {
    try {
      return await updateTrainingProviderEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

// Competencies
export const fetchCompetencies = createAsyncThunk(
  "maintenance/fetchCompetencies",
  async (_, thunkAPI) => {
    try {
      return await getCompetencyList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const createCompetency = createAsyncThunk(
  "maintenance/createCompetency",
  async (payload, thunkAPI) => {
    try {
      return await createCompetencyEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateCompetency = createAsyncThunk(
  "maintenance/updateCompetency",
  async (payload, thunkAPI) => {
    try {
      return await updateCompetencyEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

// Skill Matrix (Employee Skills)
export const fetchSkillMatrixAssignments = createAsyncThunk(
  "maintenance/fetchSkillMatrixAssignments",
  async (_, thunkAPI) => {
    try {
      return await getSkillMatrixAssignmentList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const createSkillMatrixAssignment = createAsyncThunk(
  "maintenance/createSkillMatrixAssignment",
  async (payload, thunkAPI) => {
    try {
      return await createSkillMatrixAssignmentEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateSkillMatrixAssignment = createAsyncThunk(
  "maintenance/updateSkillMatrixAssignment",
  async (payload, thunkAPI) => {
    try {
      return await updateSkillMatrixAssignmentEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

// Employees
export const fetchEmployeeList = createAsyncThunk(
  "maintenance/fetchEmployeeList",
  async (_, thunkAPI) => {
    try {
      return await getEmployeeList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const registerEmployee = createAsyncThunk(
  "maintenance/registerEmployee",
  async (payload, thunkAPI) => {
    try {
      return await registerEmployeeEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateEmployee = createAsyncThunk(
  "maintenance/updateEmployee",
  async (payload, thunkAPI) => {
    try {
      return await updateEmployeeEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

// Skill Competency
export const fetchSkillCompetencies = createAsyncThunk(
  "maintenance/fetchSkillCompetencies",
  async (_, thunkAPI) => {
    try {
      return await getSkillCompetencyList();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const createSkillCompetency = createAsyncThunk(
  "maintenance/createSkillCompetency",
  async (payload, thunkAPI) => {
    try {
      return await createSkillCompetencyEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);

export const updateSkillCompetency = createAsyncThunk(
  "maintenance/updateSkillCompetency",
  async (payload, thunkAPI) => {
    try {
      return await updateSkillCompetencyEntry(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);
// assign training
export const fetchStatusTraining = createAsyncThunk(
  "maintenance/statusTraining",
  async (_, thunkAPI) => {
    try {
      return await getStatusTraining();
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);
export const assignTraining = createAsyncThunk(
  "maintenance/createAssignTraining",
  async (payload, thunkAPI) => {
    try {
      return await createAssignTraining(payload);
    } catch (error) {
      return rejectWith(thunkAPI, error);
    }
  },
);
