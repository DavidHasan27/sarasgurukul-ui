import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setSessionStorage } from "../../utils";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: false,
  error: null,
  user: null,
};

export const login = createAsyncThunk(
  `/auth/v1/authenticate`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        SERVER_URL + "/api/auth/v1/authenticate",
        data
      );
      console.log("Login Response", res);
      setSessionStorage(res.data);
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        throw rejectWithValue(
          err.response.data.status === 400
            ? "Please enter valid credintial"
            : "Something went wrong, Please try again later"
        );
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addingStartedLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    addedLoginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addedLoginUsFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetLoginError: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setUserDetails: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = action.payload;
    },
    resetUserDetails: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("Payload Success::", action.payload);
      state.loading = false;
      state.success = true;
      state.user = action.payload.user;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action: any) => {
      console.log("Payload Error ::", action.payload);
      state.loading = false;
      state.success = false;
      state.user = null;
      state.error = action.payload;
    });
    builder.addCase(login.pending, (state, action) => {
      console.log("Payload pending ::", action.payload);
      state.loading = true;
      state.error = null;
    });
  },
});

export const {
  addingStartedLogin,
  addedLoginSuccess,
  addedLoginUsFailed,
  resetLoginError,
  setUserDetails,
  resetUserDetails,
} = authSlice.actions;

export default authSlice.reducer;
