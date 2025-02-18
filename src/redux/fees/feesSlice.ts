import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils";
import queryString from "query-string";
import { cloneDeep, remove } from "lodash";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  newFees: undefined,
  feesList: undefined,
  message: "",
};

export const addContactedInfo = createAsyncThunk(
  `/contact/add`,
  async (data: any) => {
    const res = await axios.post(SERVER_URL + "/api/contact/add", data);
    console.log("res", res);
    return res.data;
  }
);

export const createNewFees = createAsyncThunk(
  `/school-fees/create-fee-type`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        SERVER_URL + "/api/school-fees/create-fee-type",
        data,
        {
          headers: { Authorization: getAuthToken() },
        }
      );
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

export const getAllFees = createAsyncThunk(
  `/school-fees/get-fee-type`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    console.log("Params", urlParams);
    let url = SERVER_URL + "/api/school-fees/get-fee-type?" + urlParams;
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

export const activeDeactiveFees = createAsyncThunk(
  `/school-fees/delete-fee-type`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        SERVER_URL + "/api/school-fees/delete-fee-type",
        {
          headers: { Authorization: getAuthToken() },
          data,
        }
      );
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const feesSlice = createSlice({
  name: "fees",
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
    resetNewFeesDetai: (state) => {
      state.loading = false;
      state.success = false;
      state.newFees = undefined;
      state.feesList = undefined;
    },
    resetFeeDetails: (state) => {
      state.loading = false;
      state.success = false;
      state.newFees = undefined;
      state.message = "";
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
    builder.addCase(createNewFees.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.newFees = action.payload;
    });
    builder.addCase(createNewFees.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(createNewFees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFees.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.feesList = action.payload;
    });
    builder.addCase(getAllFees.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getAllFees.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(activeDeactiveFees.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      const tempSchoolList: any = cloneDeep(state.feesList);
      remove(tempSchoolList.content, (item: any) => {
        return item.id === action.payload.id;
      });
      state.feesList = tempSchoolList;
      state.message = action.payload.active
        ? "Successfully activated fees"
        : "Successfully de-activated fees";
    });
    builder.addCase(activeDeactiveFees.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(activeDeactiveFees.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { resetNewFeesDetai, resetFeeDetails } = feesSlice.actions;

export default feesSlice.reducer;
