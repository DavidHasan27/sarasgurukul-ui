import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils";
import queryString from "query-string";

const initialState = {
  loading: false,
  success: false,
  error: "",
  studentList: null,
  newStudent: null,
};

export const addContactedInfo = createAsyncThunk(
  `/contact/add`,
  async (data: any) => {
    const res = await axios.post("/api/contact/add", data);
    console.log("res", res);
    return res.data;
  }
);

export const getStudentList = createAsyncThunk(
  `/student/getStudents`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    console.log("Params", urlParams);
    let url = "/api/student/getStudents?" + urlParams;
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

export const createNewStudent = createAsyncThunk(
  `/student/createStudent`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/student/createStudent", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      console.log(err);
      if (err?.response?.data?.message) {
        const message = err?.response?.data?.message;
        console.log("Message >>>", message);
        if (
          message.includes("duplicate key value violates unique constraint ")
        ) {
          throw rejectWithValue(
            "Email id '" + data.email + "' already exist in application"
          );
        } else {
          throw rejectWithValue(err?.response?.data?.message);
        }
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    addingStartedContactsUs: (state) => {
      state.loading = true;
      state.error = "";
    },
    addedContactsUsSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = "";
    },
    addedContactsUsFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetNewStudent: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.newStudent = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addContactedInfo.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(addContactedInfo.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(addContactedInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentList.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.studentList = action.payload;
    });
    builder.addCase(getStudentList.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getStudentList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(createNewStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.newStudent = action.payload;
    });
    builder.addCase(createNewStudent.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(createNewStudent.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  addingStartedContactsUs,
  addedContactsUsSuccess,
  addedContactsUsFailed,
  resetNewStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
