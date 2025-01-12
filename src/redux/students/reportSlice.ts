import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import queryString from "query-string";
import { getAuthToken } from "../../utils";
import { cloneDeep, filter, orderBy, remove } from "lodash";

const initialState = {
  loading: false,
  success: false,
  error: "",
  reportQuestionList: undefined,
  studentYearList: undefined,
  studentReport: undefined,
  updateReportRes: undefined,
  newReport: undefined,
};

export const addContactedInfo = createAsyncThunk(
  `/contact/add`,
  async (data: any) => {
    const res = await axios.post("/api/contact/add", data);
    console.log("res", res);
    return res.data;
  }
);

export const getReportQuestion = createAsyncThunk(
  `/report/get-report-questions`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/report/get-report-questions?" + urlParams;
    if (data.searchString) {
      url = url + "&searchString=" + data.searchString;
    }
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

export const getStudentYears = createAsyncThunk(
  `/report/get-student_years`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/report/get-student_years?" + urlParams;
    if (data.searchString) {
      url = url + "&searchString=" + data.searchString;
    }
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

export const createNewReport = createAsyncThunk(
  `/report/create`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/report/create", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      const message = err?.response?.data?.message;
      console.log("Message >>>", message);
      if (err?.response?.data?.message) {
        const message = err?.response?.data?.message;
        console.log("Message >>>", message);
        if (
          message.includes("duplicate key value violates unique constraint ")
        ) {
          if (message.includes("(user_id)=")) {
            throw rejectWithValue(
              "Selected teacher already class teacher of another class"
            );
          } else {
            throw rejectWithValue(
              "Class identity '" +
                data.classIdentity +
                "' already exist in application"
            );
          }
        } else {
          throw rejectWithValue(err?.response?.data?.message);
        }
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const getStudentReports = createAsyncThunk(
  `/report/get-student_reports`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/report/get-student_reports?" + urlParams;
    if (data.searchString) {
      url = url + "&searchString=" + data.searchString;
    }
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

const getFormattedReportQuestion = (list: any): any => {
  const mainQuestinList = orderBy(
    filter(list, (obj: any) => obj.main),
    "index",
    "asc"
  );

  for (let i = 0; i < mainQuestinList.length; i++) {
    const childQuestions = filter(
      list,
      (obj: any) => !obj.main && obj.parentId === mainQuestinList[i].id
    );
    mainQuestinList[i]["child"] = orderBy(childQuestions, "index", "asc");
  }

  return mainQuestinList;
};

export const updateReportCard = createAsyncThunk(
  `/report/update-report-card`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.put("/api/report/update-report-card", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const activeDeactiveStudentReport = createAsyncThunk(
  `/report/delete-report`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/api/report/delete-report", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);
const reportSlice = createSlice({
  name: "report",
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
    resetReportData: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.reportQuestionList = undefined;
      state.studentYearList = undefined;
      state.studentReport = undefined;
    },
    resetUpdatedReport: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.updateReportRes = undefined;
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
    builder.addCase(getReportQuestion.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.reportQuestionList = getFormattedReportQuestion(action.payload);
    });
    builder.addCase(getReportQuestion.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getReportQuestion.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(getStudentYears.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.studentYearList = action.payload;
    });
    builder.addCase(getStudentYears.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getStudentYears.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createNewReport.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.newReport = action.payload;
    });
    builder.addCase(createNewReport.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(createNewReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getStudentReports.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.studentReport = action.payload;
    });
    builder.addCase(getStudentReports.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getStudentReports.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateReportCard.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updateReportRes = action.payload;
    });
    builder.addCase(updateReportCard.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(updateReportCard.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(activeDeactiveStudentReport.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      const tempStudentList: any = cloneDeep(state.studentReport);
      remove(tempStudentList, (item: any) => {
        return item.id === action.payload.id;
      });
      state.studentReport = tempStudentList;
    });
    builder.addCase(activeDeactiveStudentReport.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(activeDeactiveStudentReport.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  addingStartedContactsUs,
  addedContactsUsSuccess,
  addedContactsUsFailed,
  resetReportData,
  resetUpdatedReport,
} = reportSlice.actions;

export default reportSlice.reducer;
