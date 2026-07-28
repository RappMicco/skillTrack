import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import trainingReducer from "../features/statusSummary/statusSlice.js";
import insightReducer from "../features/insights/insightSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    training: trainingReducer,
    insights: insightReducer,
  },
});
