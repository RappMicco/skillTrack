import { createSlice } from "@reduxjs/toolkit";
import { fetchTrainingSummary } from "./statusThunk.js";

const initialState = {
  success: false,
  summary: {
    completed: 0,
    upcoming: 0,
    ongoing: 0,
    pending: 0,
  },
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
      });
  },
});

export default trainingSlice.reducer;
