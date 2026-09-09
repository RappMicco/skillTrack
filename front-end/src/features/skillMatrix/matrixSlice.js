import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSkillMatrixSummary,
  fetchCompetencyData,
  fetchEmployees,
  fetchSkillProficiencyLevels,
  fetchSkillMatrixCells,
  createSkillMatrix,
  updateSkillMatrix,
  fetchPublicSkillSummary,
  fetchPublicTrainingSummary,
  fetchPublicLearningCourses,
} from "./matrixThunk.js";

const initialState = {
  success: false,
  matrix: {},
  competency: [],
  employees: [],
  proficiencyLevels: [],
  cells: [],
  publicSummary: {},
  publicTrainingSummary: {},
  learningCourses: {},
  loading: false,
  saving: false,
  error: null,
};

const matrixSlice = createSlice({
  name: "matrix",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillMatrixSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkillMatrixSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.matrix = action.payload?.data || {};
      })
      .addCase(fetchSkillMatrixSummary.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // competency
      .addCase(fetchCompetencyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCompetencyData.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const competency = action.payload?.data || [];

        competency.sort((a, b) =>
          a.competencyName.localeCompare(b.competencyName),
        );
        competency.forEach((item) => {
          item.skills.sort((a, b) => a.skillName.localeCompare(b.skillName));
        });

        state.competency = competency;
      })

      .addCase(fetchCompetencyData.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      })

      // employees
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.employees = action.payload?.data || [];
      })

      // proficiency levels
      .addCase(fetchSkillProficiencyLevels.fulfilled, (state, action) => {
        const levels = action.payload?.data || [];
        levels.sort((a, b) => a.sequence - b.sequence);
        state.proficiencyLevels = levels;
      })

      // skill matrix cells
      .addCase(fetchSkillMatrixCells.fulfilled, (state, action) => {
        state.cells = action.payload?.data || [];
      })

      // create/update skill matrix entry
      .addCase(createSkillMatrix.pending, (state) => {
        state.saving = true;
      })
      .addCase(createSkillMatrix.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(createSkillMatrix.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      .addCase(updateSkillMatrix.pending, (state) => {
        state.saving = true;
      })
      .addCase(updateSkillMatrix.fulfilled, (state) => {
        state.saving = false;
      })
      .addCase(updateSkillMatrix.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      })
      // PUBLIC SUMMARY
      .addCase(fetchPublicSkillSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicSkillSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.publicSummary = action.payload?.data || {};
      })
      .addCase(fetchPublicSkillSummary.rejected, (state) => {
        state.loading = false;
      })

      //TRAINING PUBLIC SUMMARY
      .addCase(fetchPublicTrainingSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicTrainingSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.publicTrainingSummary = action.payload?.summary || {};
      })
      .addCase(fetchPublicTrainingSummary.rejected, (state) => {
        state.loading = false;
      })

      // LEARNING COURSES
      .addCase(fetchPublicLearningCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPublicLearningCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.learningCourses = action.payload?.data || {};
      })
      .addCase(fetchPublicLearningCourses.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default matrixSlice.reducer;
