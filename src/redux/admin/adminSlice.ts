import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils";
import queryString from "query-string";
import { cloneDeep, remove, unionBy } from "lodash";
import fileDownload from "js-file-download";
import { IMAGE_TAG } from "../../utils/constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  yearList: [],
  updated: false,
  newHoliday: undefined,
  holiday: undefined,
  newWorksheet: undefined,
  worksheets: undefined,
  newImages: undefined,
  imageTags: undefined,
  imagesData: undefined,
  updateImageMessage: "",
  newPlans: undefined,
  planner: undefined,
  planDelete: "",
  calenderEvents: undefined,
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

export const activeDeactiveWorksheet = createAsyncThunk(
  `/admin/delete-worksheet`,
  async (data: any, { rejectWithValue }) => {
    console.log("Data ::", data);
    try {
      const res = await axios.delete("/api/admin/delete-worksheet", {
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

export const uploadFiles = async (data: any) => {
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

export const downloadFile = async (data: any) => {
  const urlParams = queryString.stringify(data);
  const res = await axios.get("/api/file/download-file?" + urlParams, {
    headers: { Authorization: getAuthToken() },
    responseType: "blob",
  });
  fileDownload(res.data, data.name);
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
        data.imageURL =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.fileObj.file.name;
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

export const createNewWorksheet = createAsyncThunk(
  `/admin/create-worksheet`,
  async (data: any, { rejectWithValue }) => {
    try {
      let result: any = undefined;
      const fileResult = [];
      if (data.file && data.file.length > 0) {
        for (let i = 0; i < data.file.length; i++) {
          result = await uploadFiles(data.file[i]);
          console.log("File Upload result :", result);
          if (result && result.data) {
            const finalResult =
              result.data.bucket +
              "|" +
              result.data.name +
              "|" +
              data.file[i].file.name;
            fileResult.push(finalResult);
          }
        }
      }
      data.file = fileResult;
      console.log("Final Body", data);
      const res = await axios.post("/api/admin/create-worksheet", data, {
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

export const createNewImages = createAsyncThunk(
  `/admin/add-images`,
  async (data: any, { rejectWithValue }) => {
    try {
      let result: any = undefined;
      for (let i = 0; i < data.length; i++) {
        result = await uploadFiles(data[i].fileObj);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data[i].fileObj.file.name;
        data[i].imageDetails = finalResult;
        delete data[i].fileObj;
      }

      console.log("Final Body", data);
      const res = await axios.post("/api/admin/add-images", data, {
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

export const getImageTags = createAsyncThunk(
  `/admin/get-image-tags`,
  async (_: void, { rejectWithValue }) => {
    let url = "/api/admin/get-image-tags";
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

export const updateImageActions = createAsyncThunk(
  `/admin/image-actions`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/admin/image-actions", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);

      return { ...res.data, id: data.id, action: data.action };
    } catch (err: any) {
      const message = err?.response?.data?.message;
      console.log("Message >>>", message);
      if (err?.response?.data?.message) {
        const message = err?.response?.data?.message;
        console.log("Message >>>", message);
        throw rejectWithValue(message);
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const getImages = createAsyncThunk(
  `/admin/get-images`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/admin/get-images?" + urlParams;
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

export const getCalenderEvents = createAsyncThunk(
  `/admin/get-calender-events`,
  async (_: void, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/admin/get-calender-events", {
        headers: { Authorization: getAuthToken() },
      });

      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const getWorksheet = createAsyncThunk(
  `/admin/get-worksheets`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/admin/get-worksheets?" + urlParams;
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

export const createNewPlannes = createAsyncThunk(
  `/admin/create-plans`,
  async (data: any, { rejectWithValue }) => {
    try {
      for (let i = 0; i < data.length; i++) {
        let result: any = undefined;
        if (data[i].fileObj) {
          result = await uploadFiles(data[i].fileObj);
          console.log("File Upload result :", result);
        }

        if (result && result.data) {
          data[i].imageUrl =
            result.data.bucket +
            "|" +
            result.data.name +
            "|" +
            data[i].fileObj.file.name;
          delete data[i].fileObj;
        }
      }

      const res = await axios.post("/api/admin/create-plans", data, {
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
        throw rejectWithValue(err?.response?.data?.message);
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const getPlans = createAsyncThunk(
  `/admin/get-planes`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/admin/get-planes?" + urlParams;
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

export const activeDeactivePlanner = createAsyncThunk(
  `/admin/delete-planner`,
  async (data: any, { rejectWithValue }) => {
    console.log("Data ::", data);
    try {
      const res = await axios.delete("/api/admin/delete-planner", {
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

const mergeArray = (array1: any, array2: any) => {
  return array1.concat(
    array2.filter(
      (item2: any) => !array1.some((item1: any) => item1.id === item2.id)
    )
  );
};

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
      state.newWorksheet = undefined;
      state.newImages = undefined;
      state.updateImageMessage = "";
      state.newPlans = undefined;
      state.planDelete = "";
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

    builder.addCase(createNewWorksheet.fulfilled, (state, action) => {
      state.newWorksheet = action.payload;
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(createNewWorksheet.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(createNewWorksheet.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(getWorksheet.fulfilled, (state, action) => {
      state.worksheets = action.payload;
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(getWorksheet.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(getWorksheet.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(activeDeactiveWorksheet.fulfilled, (state, action) => {
      const tempWorksheets: any = cloneDeep(state.worksheets);
      remove(tempWorksheets.content, (item: any) => {
        return item.id === action.payload.id;
      });
      state.worksheets = tempWorksheets;
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(activeDeactiveWorksheet.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(activeDeactiveWorksheet.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(createNewImages.fulfilled, (state, action) => {
      state.newImages = action.payload;
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(createNewImages.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(createNewImages.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(getImageTags.fulfilled, (state, action: any) => {
      state.imageTags = mergeArray(action.payload, IMAGE_TAG);
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(getImageTags.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(getImageTags.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(getImages.fulfilled, (state, action: any) => {
      state.imagesData = action.payload;
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getImages.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getImages.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(updateImageActions.fulfilled, (state, action) => {
      const tempImageData: any = cloneDeep(state.imagesData);
      if (action.payload.action != "tags") {
        remove(tempImageData.content, (item: any) => {
          return item.id === action.payload.id;
        });
      }
      state.imagesData = tempImageData;
      state.updateImageMessage =
        action.payload.action == "delete"
          ? "Image deleted successfully"
          : action.payload.action == "tags"
          ? "Image tags updated successfully"
          : "Image archived successfully";
      state.loading = false;
      state.success = true;
      state.updated = true;
    });
    builder.addCase(updateImageActions.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(updateImageActions.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });

    builder.addCase(createNewPlannes.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.updated = true;
      state.newPlans = action.payload;
    });
    builder.addCase(createNewPlannes.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(createNewPlannes.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });

    builder.addCase(getPlans.fulfilled, (state, action) => {
      state.loading = false;
      state.planner = action.payload;
    });
    builder.addCase(getPlans.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(getPlans.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });

    builder.addCase(activeDeactivePlanner.fulfilled, (state, action) => {
      const tempPlanner: any = cloneDeep(state.planner);
      remove(tempPlanner.content, (item: any) => {
        return item.id === action.payload.id;
      });
      state.planner = tempPlanner;
      state.loading = false;
      state.planDelete = "Plan Deleted Successfully";
      state.updated = true;
    });
    builder.addCase(activeDeactivePlanner.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(activeDeactivePlanner.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
    builder.addCase(getCalenderEvents.fulfilled, (state, action) => {
      state.loading = false;
      state.success = false;
      state.calenderEvents = action.payload;
    });
    builder.addCase(getCalenderEvents.rejected, (state) => {
      state.loading = false;
      state.success = false;
      state.updated = false;
    });
    builder.addCase(getCalenderEvents.pending, (state) => {
      state.loading = true;
      state.updated = false;
    });
  },
});

export const { resetActivateYear, resetNewHoliday } = adminSlice.actions;

export default adminSlice.reducer;
