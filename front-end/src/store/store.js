import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import trainingReducer from "../features/statusSummary/statusSlice.js";
import insightReducer from "../features/insights/insightSlice.js";
import statusTableReducer from "../features/statusTable/statusTableSlice.js";
import matrixSummaryReducer from "../features/skillMatrix/matrixSlice.js";
import maintenanceReducer from "../features/maintenance/maintenanceSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    training: trainingReducer,
    insights: insightReducer,
    statusData: statusTableReducer,
    skillMatrix: matrixSummaryReducer,
    maintenance: maintenanceReducer,
  },
});
