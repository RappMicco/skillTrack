import { createSlice } from "@reduxjs/toolkit";
import { fetchSkillInsights } from "./insightThunk.js";

const initialState = {
  insights: [],
  summary: {
    strongestSkill: null,
    weakestSkill: null,
    knowledgeRiskCount: 0,
    improvementSkillCount: 0,
    totalInsight: 0,
  },
  loading: false,
  error: null,
};

const insightSlice = createSlice({
  name: "insights",
  initialState,
  reducers: {
    clearInsightError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkillInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSkillInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload?.data?.insights || [];
        state.summary = action.payload?.data?.summary || initialState.summary;
      })

      .addCase(fetchSkillInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearInsightError } = insightSlice.actions;

export default insightSlice.reducer;
