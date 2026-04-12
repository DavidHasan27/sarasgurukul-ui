import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosPrivate } from "../network";
import { getApiErrorMessage } from "../../utils";

export interface DashboardSpecialDay {
  id: string;
  eventDate: string;
  specialDay: string;
  celebration: string;
  message: string;
  category: string;
}

export interface DashboardStudentBirthday {
  studentId: string;
  fullName: string;
  studentPhoto: string;
}

export interface DashboardStaffBirthday {
  userId: string;
  fullName: string;
  roleName: string;
  profilePhoto: string;
}

export interface DashboardOverdueFee {
  studentId: string;
  studentName: string;
  className: string;
  feeTypeName: string;
  installmentLabel: string;
  dueDate: string;
  amountDue: number;
}

export interface DashboardNewStudent {
  studentId: string;
  fullName: string;
  studentPhoto: string;
  joiningDate: string;
  className: string;
}

export interface DashboardData {
  today: string;
  specialDays: DashboardSpecialDay[];
  studentBirthdays: DashboardStudentBirthday[];
  staffBirthdays: DashboardStaffBirthday[];
  overdueFees: DashboardOverdueFee[];
  newStudentsLastFiveDays: DashboardNewStudent[];
}

const initialState = {
  loading: false,
  error: null as string | null,
  data: null as DashboardData | null,
};

/** GET /api/dashboard/data */
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchDashboardData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosPrivate.get<DashboardData>("/dashboard/data");
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

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    clearDashboardError: (state) => {
      state.error = null;
    },
    clearDashboard: (state) => {
      state.loading = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action: any) => {
      state.loading = false;
      state.data = null;
      state.error =
        typeof action.payload === "string"
          ? action.payload
          : "Unable to load dashboard.";
    });
  },
});

export const { clearDashboardError, clearDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;
