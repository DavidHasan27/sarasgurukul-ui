import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  branch: "Rahatani Phata, Kalewadi",
};

const websiteSlice = createSlice({
  name: "website",
  initialState,
  reducers: {
    setBranch: (state, action) => {
      state.branch = action.payload;
    },
  },
});

export const { setBranch } = websiteSlice.actions;
export default websiteSlice.reducer;
