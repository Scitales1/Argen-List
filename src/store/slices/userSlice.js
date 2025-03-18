import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTours: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    toggleTourSelection: (state, action) => {
      const existingIndex = state.selectedTours.findIndex(
        (tour) => tour.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.selectedTours.splice(existingIndex, 1);
      } else {
        state.selectedTours.push(action.payload);
      }
    },
  },
});

export const { toggleTourSelection } = userSlice.actions;
export const userReducer = userSlice.reducer;
