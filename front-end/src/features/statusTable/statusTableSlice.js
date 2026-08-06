import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPendingData,
  fetchUpcomingData,
  fetchOngoingData,
} from "./statusTableThunk.js";

const initialState = {
  success: false,
  upcomingData: [],
  pendingData: [],
  ongoingData: [],
  completedData: [],
  loading: false,
  error: null,
};

const statusTableSlice = createSlice({
  name: "statusData",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUpcomingData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUpcomingData.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingData = action.payload?.data;
        state.success = action.payload?.success;
      })

      .addCase(fetchUpcomingData.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      })

      //pending data
      .addCase(fetchPendingData.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchPendingData.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingData = action.payload?.data;
        state.success = action.payload?.success;
      })

      .addCase(fetchPendingData.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      })

      // ongoing data
      .addCase(fetchOngoingData.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchOngoingData.fulfilled, (state, action) => {
        state.loading = false;
        state.ongoingData = action.payload?.data;
        state.success = action.payload?.success;
      })

      .addCase(fetchOngoingData.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default statusTableSlice.reducer;
