import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils";
import queryString from "query-string";
import { cloneDeep, remove } from "lodash";
import { uploadFiles } from "../admin/adminSlice";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  studentList: null,
  newStudent: null,
  updateStudent: null,
  message: "",
  classFee: undefined,
  studentFee: undefined,
  feesMessage: "",
};

export const addContactedInfo = createAsyncThunk(
  `/contact/add`,
  async (data: any) => {
    const res = await axios.post(SERVER_URL + "/api/contact/add", data);
    console.log("res", res);
    return res.data;
  }
);

export const getStudentList = createAsyncThunk(
  `/student/getStudents`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    console.log("Params", urlParams);
    let url = SERVER_URL + "/api/student/getStudents?" + urlParams;
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
      if (data.studentPhoto) {
        const result = await uploadFiles(data.studentPhoto);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.studentPhoto.file.name;
        data.studentPhoto = finalResult;
      }

      if (data.parents.userProfilePhoto) {
        const result = await uploadFiles(data.parents.userProfilePhoto);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.parents.userProfilePhoto.file.name;
        data.parents.userProfilePhoto = finalResult;
      }

      if (data.studentFileList && data.studentFileList.length > 0) {
        for (let i = 0; i < data.studentFileList.length; i++) {
          const result = await uploadFiles(data.studentFileList[i]);
          if (result && result.data) {
            const finalResult =
              result.data.bucket +
              "|" +
              result.data.name +
              "|" +
              data.studentFileList[i].file.name;
            data["doc" + (i + 1)] = finalResult;
          }
        }
      }
      delete data.studentFileList;

      if (data.parentFileList && data.parentFileList.length > 0) {
        for (let i = 0; i < data.parentFileList.length; i++) {
          const result = await uploadFiles(data.parentFileList[i]);
          if (result && result.data) {
            const finalResult =
              result.data.bucket +
              "|" +
              result.data.name +
              "|" +
              data.parentFileList[i].file.name;
            data.parents["doc" + (i + 1)] = finalResult;
          }
        }
      }
      delete data.parentFileList;

      const res = await axios.post(
        SERVER_URL + "/api/student/createStudent",
        data,
        {
          headers: { Authorization: getAuthToken() },
        }
      );
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

const isString = (value: any) => {
  return typeof value === "string" || value instanceof String;
};

export const updateStudentDetails = createAsyncThunk(
  `/student/update`,
  async (data: any, { rejectWithValue }) => {
    try {
      if (data.studentPhoto && !isString(data.studentPhoto)) {
        const result = await uploadFiles(data.studentPhoto);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.studentPhoto.file.name;
        data.studentPhoto = finalResult;
      }

      if (
        data.parents.userProfilePhoto &&
        !isString(data.parents.userProfilePhoto)
      ) {
        const result = await uploadFiles(data.parents.userProfilePhoto);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.parents.userProfilePhoto.file.name;
        data.parents.userProfilePhoto = finalResult;
      }

      for (let i = 1; i <= 3; i++) {
        if (data.studentFileList && data.studentFileList[i - 1]) {
          if (!isString(data.studentFileList[i - 1])) {
            const result = await uploadFiles(data.studentFileList[i - 1]);
            if (result && result.data) {
              const finalResult =
                result.data.bucket +
                "|" +
                result.data.name +
                "|" +
                data.studentFileList[i - 1].file.name;
              data["doc" + i] = finalResult;
            }
          } else {
            data["doc" + i] = data.studentFileList[i - 1];
          }
        } else {
          data["doc" + i] = null;
        }
      }
      delete data.studentFileList;

      for (let i = 1; i <= 3; i++) {
        if (data.parentFileList && data.parentFileList[i - 1]) {
          if (!isString(data.parentFileList[i - 1])) {
            const result = await uploadFiles(data.parentFileList[i - 1]);
            if (result && result.data) {
              const finalResult =
                result.data.bucket +
                "|" +
                result.data.name +
                "|" +
                data.parentFileList[i - 1].file.name;
              data.parents["doc" + i] = finalResult;
            }
          } else {
            data.parents["doc" + i] = data.parentFileList[i - 1];
          }
        } else {
          data.parents["doc" + i] = null;
        }
      }
      delete data.parentFileList;

      const res = await axios.put(SERVER_URL + "/api/student/update", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const updateStudentFeesDetails = createAsyncThunk(
  `/student/update-student-fee`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        SERVER_URL + "/api/student/update-student-fee",
        data,
        {
          headers: { Authorization: getAuthToken() },
        }
      );
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const activeDeactiveStudent = createAsyncThunk(
  `/student/delete`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(SERVER_URL + "/api/student/delete", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const getStudentClassFees = createAsyncThunk(
  `/school-fees/get-fee`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    console.log("Params", urlParams);
    let url = SERVER_URL + "/api/school-fees/get-fee?" + urlParams;
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

export const getStudentFeesDetails = createAsyncThunk(
  `/student/get-student-fee`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    console.log("Params", urlParams);
    let url = SERVER_URL + "/api/student/get-student-fee?" + urlParams;
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
      state.updateStudent = null;
    },
    resetActivatetudent: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.newStudent = null;
      state.updateStudent = null;
      state.message = "";
    },
    resetStudentFee: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.newStudent = null;
      state.updateStudent = null;
      state.classFee = undefined;
      state.studentFee = undefined;
    },
    resetUpdateFee: (state) => {
      state.feesMessage = "";
      state.loading = false;
      state.success = false;
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
    builder.addCase(updateStudentDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updateStudent = action.payload;
    });
    builder.addCase(updateStudentDetails.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(updateStudentDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(activeDeactiveStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload.active
        ? "Successfully activated student"
        : "Successfully de-activated student";

      const tempStudentList: any = cloneDeep(state.studentList);
      remove(tempStudentList.content, (item: any) => {
        return item.id === action.payload.id;
      });
      state.studentList = tempStudentList;
    });
    builder.addCase(activeDeactiveStudent.rejected, (state, action: any) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });
    builder.addCase(activeDeactiveStudent.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getStudentClassFees.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.classFee = action.payload;
    });
    builder.addCase(getStudentClassFees.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getStudentClassFees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentFeesDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.studentFee = action.payload;
    });
    builder.addCase(getStudentFeesDetails.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getStudentFeesDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStudentFeesDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.studentFee = action.payload;
      state.feesMessage = "Fees updated successfully.";
    });
    builder.addCase(updateStudentFeesDetails.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(updateStudentFeesDetails.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  addingStartedContactsUs,
  addedContactsUsSuccess,
  addedContactsUsFailed,
  resetNewStudent,
  resetActivatetudent,
  resetStudentFee,
  resetUpdateFee,
} = studentSlice.actions;

export default studentSlice.reducer;
