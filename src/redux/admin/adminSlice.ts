import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils";
import queryString from "query-string";
import { cloneDeep, remove } from "lodash";
import AWS from "aws-sdk";

const initialState = {
  loading: false,
  success: false,
  error: "",
  yearList: [],
  updated: false,
  newHoliday: undefined,
  holiday: undefined,
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

export const getSchoolHolidays = createAsyncThunk(
  `/school/get-schools-holidays`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/school/get-schools-holidays?" + urlParams;
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

export const activeDeactiveSchoolHoliday = createAsyncThunk(
  `/school/delete-holiday`,
  async (data: any, { rejectWithValue }) => {
    console.log("Data ::", data);
    try {
      const res = await axios.delete("/api/school/delete-holiday", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      getSchoolYear();
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const uploadFiles = async (data: any) => {
  let formData = new FormData();
  formData.append("file", data.file);
  formData.append(
    "fileInfo",
    new Blob(
      [
        JSON.stringify({
          bucket: data.bucket,
          type: data.type,
          subtype: data.subtype,
        }),
      ],
      {
        type: "application/json",
      }
    )
  );
  const res = await axios.post("/api/file/upload", formData, {
    headers: { Authorization: getAuthToken() },
  });

  return res;
};

export const createNewHoliday = createAsyncThunk(
  `/school/create-holidays`,
  async (data: any, { rejectWithValue }) => {
    try {
      let result: any = undefined;
      if (data.fileObj) {
        result = await uploadFiles(data.fileObj);
        console.log("File Upload result :", result);
      }

      if (result && result.data) {
        data.imageURL = result.data.bucket + "|" + result.data.name;
        delete data.fileObj;
      }

      const res = await axios.post("/api/school/create-holidays", data, {
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
          if (message.includes("(date)=")) {
            throw rejectWithValue(
              "you have already declared holiday for this date"
            );
          } else {
            throw rejectWithValue(
              "you have already declared holiday for this date"
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

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    resetActivateYear: (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    },
    resetNewHoliday: (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
      state.newHoliday = undefined;
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
    builder.addCase(createNewHoliday.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updated = true;
      state.newHoliday = action.payload;
    });
    builder.addCase(createNewHoliday.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(createNewHoliday.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(getSchoolHolidays.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updated = true;
      state.holiday = action.payload;
    });
    builder.addCase(getSchoolHolidays.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(getSchoolHolidays.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(activeDeactiveSchoolHoliday.fulfilled, (state, action) => {
      const tempSchoolList: any = cloneDeep(state.holiday);
      remove(tempSchoolList.content, (item: any) => {
        return item.id === action.payload.id;
      });
      state.holiday = tempSchoolList;
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(activeDeactiveSchoolHoliday.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(activeDeactiveSchoolHoliday.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
  },
});

export const { resetActivateYear, resetNewHoliday } = adminSlice.actions;

export default adminSlice.reducer;
