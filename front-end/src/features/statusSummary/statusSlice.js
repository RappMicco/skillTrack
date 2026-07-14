import { createSlice } from "@reduxjs/toolkit";
import { fetchTrainingSummary, fetchRecentTrainings } from "./statusThunk.js";

const initialState = {
  success: false,
  summary: {
    completed: 0,
    upcoming: 0,
    ongoing: 0,
    pending: 0,
  },
  recentTrainings: [],
  loading: false,
  error: null,
};

const trainingSlice = createSlice({
  name: "training",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTrainingSummary.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTrainingSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.summary = action.payload.summary;
      })

      .addCase(fetchTrainingSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //recent training
      .addCase(fetchRecentTrainings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecentTrainings.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
        state.recentTrainings = action.payload.summary;
      })

      .addCase(fetchRecentTrainings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default trainingSlice.reducer;
