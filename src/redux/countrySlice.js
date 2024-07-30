// redux/countrySlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countryData: null,
  countryHistory: null,
  status: "idle",
  error: null,
};

const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {
    getCountryFetch: (state) => {
      state.status = "loading";
    },
    getCountrySuccess: (state, action) => {
      state.status = "succeeded";
      state.countryData = action.payload;
    },
    getCountryFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    getCountryHistoryFetch: (state) => {
      state.status = "loading";
    },
    getCountryHistorySuccess: (state, action) => {
      state.status = "succeeded";
      state.countryHistory = action.payload;
    },
    getCountryHistoryFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  getCountryFetch,
  getCountrySuccess,
  getCountryFailure,
  getCountryHistoryFetch,
  getCountryHistorySuccess,
  getCountryHistoryFailure,
} = countrySlice.actions;

export default countrySlice.reducer;
