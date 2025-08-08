import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: "",
  destination: "",
  departureDate: "",
  returnDate: "",
  passengers: 1,
};
const flightsSlice = createSlice({
  name: "flights",
  initialState,
  reducers: {
    getOrigin: (state, action) => {
      state.origin = action.payload;
    },
    getdestination: (state, action) => {
      state.destination = action.payload;
    },
    getdepartureDate: (state, action) => {
      state.departureDate = action.payload;
    },
    getreturnDate: (state, action) => {
      state.returnDate = action.payload;
    },
    getpassengers: (state, action) => {
      state.passengers = action.payload;
    },
  },
});

export default flightsSlice.reducer;
export const {
  getOrigin,
  getdestination,
  getdepartureDate,
  getreturnDate,
  getpassengers,
} = flightsSlice.actions;
