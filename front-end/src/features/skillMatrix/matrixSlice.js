import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillMatrixSummary } from "./matrixThunk.js";

const initialState = {
  success: false,
  matrix: {},
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
      });
  },
});

export default matrixSlice.reducer;
