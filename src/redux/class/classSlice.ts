import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import queryString from "query-string";
import { getAuthToken } from "../../utils";
import { cloneDeep, findIndex, remove } from "lodash";
import { getSchoolsForSelection } from "../schools/schoolSlice";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: "",
  error: "",
  classList: null,
  optionClassList: [],
};
export const createNewClass = createAsyncThunk(
  `/class/create`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(SERVER_URL + "/api/class/create", data, {
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

export const getClassList = createAsyncThunk(
  `/class/get-class`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    console.log("Params", urlParams);
    let url = SERVER_URL + "/api/class/get-class?" + urlParams;
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

export const getClassListBySchoolForDropdown = createAsyncThunk(
  `/class/get-class-by-school`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        SERVER_URL + "/api/class/get-class-by-school",
        data,
        {
          headers: { Authorization: getAuthToken() },
        }
      );

      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const activeDeactiveClass = createAsyncThunk(
  `/class/delete`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(SERVER_URL + "/api/class/delete", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const updateClass = createAsyncThunk(
  `/school/class`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.put(SERVER_URL + "/api/class/update", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const classSlice = createSlice({
  name: "class",
  initialState,
  reducers: {
    addingStartedContactsUs: (state) => {
      state.loading = true;
      state.error = "";
    },
    addedContactsUsSuccess: (state, action) => {
      state.loading = false;
      state.success = "";
      state.error = "";
    },
    addedContactsUsFailed: (state, action) => {
      state.loading = false;
      state.success = "";
      state.error = action.payload;
    },
    resetNewClassDetails: (state) => {
      state.loading = false;
      state.success = "";
      state.error = "";
    },
    resetActivateDeactivateClass: (state) => {
      state.loading = false;
      state.success = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewClass.fulfilled, (state) => {
      state.loading = false;
      state.success = "New Class Created Successfully";
    });
    builder.addCase(createNewClass.rejected, (state, action: any) => {
      state.loading = false;
      state.success = "";
      state.error = action.payload;
    });
    builder.addCase(createNewClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getClassList.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "";
      state.classList = action.payload;
    });
    builder.addCase(getClassList.rejected, (state, action: any) => {
      state.loading = false;
      state.success = "";
      state.error = action.payload;
    });
    builder.addCase(getClassList.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(activeDeactiveClass.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.active
        ? "Successfully activated class"
        : "Successfully de-activated class";
      const tempSchoolList: any = cloneDeep(state.classList);
      remove(tempSchoolList.content, (item: any) => {
        return item.id === action.payload.id;
      });
      //   }
      state.classList = tempSchoolList;
    });
    builder.addCase(activeDeactiveClass.rejected, (state, action: any) => {
      state.loading = false;
      state.success = "";
      state.error = action.payload;
    });
    builder.addCase(activeDeactiveClass.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateClass.fulfilled, (state, action) => {
      state.loading = false;
      state.success = "Class Updated successfully";
    });
    builder.addCase(updateClass.rejected, (state, action) => {
      state.loading = false;
      state.success = "";
    });
    builder.addCase(updateClass.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getClassListBySchoolForDropdown.fulfilled,
      (state, action) => {
        state.loading = false;
        state.optionClassList = action.payload;
      }
    );
    builder.addCase(
      getClassListBySchoolForDropdown.rejected,
      (state, action) => {
        state.loading = false;
        state.success = "";
        state.optionClassList = [];
      }
    );
    builder.addCase(
      getClassListBySchoolForDropdown.pending,
      (state, action) => {
        state.loading = true;
      }
    );
  },
});

export const {
  addingStartedContactsUs,
  addedContactsUsSuccess,
  addedContactsUsFailed,
  resetNewClassDetails,
  resetActivateDeactivateClass,
} = classSlice.actions;

export default classSlice.reducer;
