import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getApiErrorMessage, setSessionStorage } from "../../utils";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: false,
  error: null as string | null,
  user: null,
  forgotPasswordLoading: false,
  forgotPasswordError: null as string | null,
  forgotPasswordSuccessMessage: null as string | null,
  resetPasswordLoading: false,
  resetPasswordError: null as string | null,
  resetPasswordSuccessMessage: null as string | null,
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
      const body = err.response?.data;
      if (typeof body?.message === "string" && body.message.trim()) {
        throw rejectWithValue(body.message);
      }
      if (err.response?.status === 400) {
        throw rejectWithValue("Please enter valid credintial");
      }
      throw rejectWithValue(getApiErrorMessage(err));
    }
  }
);

/** POST /api/user/forgot-password — body: { email: string } */
export const requestForgotPassword = createAsyncThunk(
  "auth/requestForgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        SERVER_URL + "/api/user/forgot-password",
        { email: email.trim() }
      );
      return res.data;
    } catch (err: any) {
      const body = err.response?.data;
      if (typeof body?.message === "string" && body.message.trim()) {
        throw rejectWithValue(body.message);
      }
      throw rejectWithValue(getApiErrorMessage(err));
    }
  }
);

/** PUT /api/user/reset-password — body: { resetToken, newPassword } */
export const submitResetPassword = createAsyncThunk(
  "auth/submitResetPassword",
  async (
    payload: { resetToken: string; newPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(
        SERVER_URL + "/api/user/reset-password",
        {
          resetToken: payload.resetToken,
          newPassword: payload.newPassword,
        }
      );
      return res.data;
    } catch (err: any) {
      const body = err.response?.data;
      if (typeof body?.message === "string" && body.message.trim()) {
        throw rejectWithValue(body.message);
      }
      throw rejectWithValue(getApiErrorMessage(err));
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
    resetForgotPasswordState: (state) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordError = null;
      state.forgotPasswordSuccessMessage = null;
    },
    resetResetPasswordState: (state) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = null;
      state.resetPasswordSuccessMessage = null;
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

    builder.addCase(requestForgotPassword.pending, (state) => {
      state.forgotPasswordLoading = true;
      state.forgotPasswordError = null;
      state.forgotPasswordSuccessMessage = null;
    });
    builder.addCase(requestForgotPassword.fulfilled, (state, action) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordError = null;
      const msg = action.payload?.message;
      state.forgotPasswordSuccessMessage =
        typeof msg === "string" && msg.trim()
          ? msg
          : "Password reset instructions have been sent to your email.";
    });
    builder.addCase(requestForgotPassword.rejected, (state, action: any) => {
      state.forgotPasswordLoading = false;
      state.forgotPasswordSuccessMessage = null;
      state.forgotPasswordError =
        typeof action.payload === "string"
          ? action.payload
          : "Something went wrong. Please try again.";
    });

    builder.addCase(submitResetPassword.pending, (state) => {
      state.resetPasswordLoading = true;
      state.resetPasswordError = null;
      state.resetPasswordSuccessMessage = null;
    });
    builder.addCase(submitResetPassword.fulfilled, (state, action) => {
      state.resetPasswordLoading = false;
      state.resetPasswordError = null;
      const msg = action.payload?.message;
      state.resetPasswordSuccessMessage =
        typeof msg === "string" && msg.trim()
          ? msg
          : "Your password has been changed. You can sign in with your new password.";
    });
    builder.addCase(submitResetPassword.rejected, (state, action: any) => {
      state.resetPasswordLoading = false;
      state.resetPasswordSuccessMessage = null;
      state.resetPasswordError =
        typeof action.payload === "string"
          ? action.payload
          : "Something went wrong. Please try again.";
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
  resetForgotPasswordState,
  resetResetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
