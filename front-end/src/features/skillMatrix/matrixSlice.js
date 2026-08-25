import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillMatrixSummary, fetchCompetencyData } from "./matrixThunk.js";

const initialState = {
  success: false,
  matrix: {},
  competency: [],
  loading: false,
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
      });
  },
});

export default matrixSlice.reducer;
