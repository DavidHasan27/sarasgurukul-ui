import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken } from "../../utils";
import { cloneDeep, findIndex } from "lodash";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: "",
  error: "",
  schoolList: null,
  newSchool: {},
  optionSchoolList: [],
};

export const createNewSchool = createAsyncThunk(
  `/school/create`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(SERVER_URL + "/api/school/create", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const getSchoolList = createAsyncThunk(
  `/school/get-schools`,
  async (data: any, { rejectWithValue }) => {
    let url =
      SERVER_URL +
      "/api/school/get-schools?page=" +
      data.pageIndex +
      "&size=" +
      data.count +
      "&sortBy=schoolName&sort=ASC";

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

export const getSchoolsForSelection = createAsyncThunk(
  `/school/schoolList`,
  async (_: void, { rejectWithValue }) => {
    let url = SERVER_URL + "/api/school/schoolList";
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

export const activeDeactiveSchool = createAsyncThunk(
  `/school/delete`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(SERVER_URL + "/api/school/delete", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const updateSchool = createAsyncThunk(
  `/school/update`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.put(SERVER_URL + "/api/school/update", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const schoolSlice = createSlice({
  name: "schools",
  initialState,
  reducers: {
    addingStartedNewSchool: (state) => {
      state.loading = true;
      state.error = "";
    },
    addingStartedNewSchoolSuccess: (state, action) => {
      state.loading = false;
      state.success = "";
      state.error = "";
    },
    addingStartedNewSchoolFailed: (state, action) => {
      state.loading = false;
      state.success = "";
      state.error = action.payload;
    },
    resetNewSchoolDetails: (state) => {
      state.loading = false;
      state.success = "";
      state.error = "";
    },
    resetGetSchools: (state) => {
      state.loading = false;
      state.success = "";
      state.error = "";
      state.schoolList = null;
    },
    resetActivateDeactivateSchool: (state) => {
      state.loading = false;
      state.success = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewSchool.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "New School added successfully";
    });
    builder.addCase(createNewSchool.rejected, (state, action) => {
      state.loading = false;
      state.success = "";
    });
    builder.addCase(createNewSchool.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSchoolList.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "";
      state.schoolList = action.payload;
    });
    builder.addCase(getSchoolList.rejected, (state, action) => {
      state.loading = false;
      state.success = "";
      // state.error = action.payload;
    });
    builder.addCase(getSchoolList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(activeDeactiveSchool.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.active
        ? "Successfully activated school"
        : "Successfully de-activated school";
      const tempSchoolList: any = cloneDeep(state.schoolList);
      const index = findIndex(
        tempSchoolList.content,
        (item: any) => item.id === action.payload.id
      );
      if (index !== -1) {
        tempSchoolList.content[index].active = action.payload.active;
      }
      state.schoolList = tempSchoolList;
    });
    builder.addCase(activeDeactiveSchool.rejected, (state, action) => {
      state.loading = false;
      state.success = "";
      // state.error = action.payload;
    });
    builder.addCase(activeDeactiveSchool.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateSchool.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "School Updated successfully";
    });
    builder.addCase(updateSchool.rejected, (state, action) => {
      state.loading = false;
      state.success = "";
    });
    builder.addCase(updateSchool.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSchoolsForSelection.rejected, (state, action: any) => {
      state.loading = false;
      state.optionSchoolList = [];
    });
    builder.addCase(getSchoolsForSelection.fulfilled, (state, action: any) => {
      state.loading = false;
      state.optionSchoolList = action.payload;
      state.success = "";
    });
  },
});

export const {
  addingStartedNewSchool,
  addingStartedNewSchoolSuccess,
  addingStartedNewSchoolFailed,
  resetNewSchoolDetails,
  resetActivateDeactivateSchool,
} = schoolSlice.actions;

export default schoolSlice.reducer;
