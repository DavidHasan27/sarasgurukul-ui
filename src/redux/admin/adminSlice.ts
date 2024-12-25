import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils";

const initialState = {
  loading: false,
  success: false,
  error: "",
  yearList: [],
  updated: false,
};

export const getSchoolYear = createAsyncThunk(
  `/admin/getYears`,
  async (_: void, { rejectWithValue }) => {
    let url = "/api/admin/getYears";
    try {
      const res = await axios.get(url, {
        headers: { Authorization: getAuthToken() },
      });

      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const activeDeactiveYears = createAsyncThunk(
  `/admin/update-years`,
  async (data: any, { rejectWithValue }) => {
    console.log("Data ::", data);
    try {
      const res = await axios.put("/api/admin/update-years", data, {
        headers: { Authorization: getAuthToken() },
      });
      getSchoolYear();
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetActivateYear: (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSchoolYear.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.yearList = action.payload;
    });
    builder.addCase(getSchoolYear.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getSchoolYear.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(activeDeactiveYears.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(activeDeactiveYears.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(activeDeactiveYears.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
  },
});

export const { resetActivateYear } = adminSlice.actions;

export default adminSlice.reducer;
