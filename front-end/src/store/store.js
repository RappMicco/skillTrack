import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import trainingReducer from "../features/statusSummary/statusSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    training: trainingReducer,
  },
});
