import { createSlice } from "@reduxjs/toolkit";
import { fetchUpcomingData } from "./statusTableThunk.js";

const initialState = {
  success: false,
  upcomingData: [],
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
      });
  },
});

export default statusTableSlice.reducer;
