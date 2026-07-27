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
});
