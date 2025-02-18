import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import { getAuthToken } from "../../utils";
import queryString from "query-string";
import { clone, findIndex, remove } from "lodash";
import { SERVER_URL } from "../../utils/constants";

const initialState = {
  loading: false,
  success: false,
  error: "",
  contactus: undefined,
  newMessage: "",
};

export const addContactedInfo = createAsyncThunk(
  `/contact/add`,
  async (data: any) => {
    const res = await axios.post(SERVER_URL + "/api/contact/add", data);
    console.log("res", res);
    return res.data;
  }
);

export const getContactUs = createAsyncThunk(
  `/admin/contact/get-contacts`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = SERVER_URL + "/api/contact/get-contacts?" + urlParams;
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

export const updateContacts = createAsyncThunk(
  `/contact/update-contact`,
  async (data: any, { rejectWithValue }) => {
    console.log("Data ::", data);
    try {
      const res = await axios.put(
        SERVER_URL + "/api/contact/update-contact",
        data,
        {
          headers: { Authorization: getAuthToken() },
        }
      );
      return data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const contactUsSlice = createSlice({
  name: "contactus",
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
    resetNewContact: (state) => {
      state.loading = false;
      state.success = false;
      state.error = "";
      state.newMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addContactedInfo.fulfilled, (state) => {
      state.loading = false;
      state.success = true;
      state.newMessage = "Message added Successfully";
    });
    builder.addCase(addContactedInfo.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(addContactedInfo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContactUs.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.contactus = action.payload;
    });
    builder.addCase(getContactUs.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getContactUs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateContacts.fulfilled, (state, action) => {
      const tempList: any = clone(state.contactus);
      if (action.payload.active) {
        const index = findIndex(
          tempList.content,
          (obj: any) => obj.id === action.payload.id
        );
        tempList.content[index] = action.payload;
      } else {
        remove(tempList.content, (obj: any) => obj.id === action.payload.id);
      }
      state.contactus = tempList;
      state.loading = false;
      state.success = true;
      // state.contactus = action.payload;
    });
    builder.addCase(updateContacts.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(updateContacts.pending, (state) => {
      state.loading = true;
    });
  },
});

export const {
  addingStartedContactsUs,
  addedContactsUsSuccess,
  addedContactsUsFailed,
  resetNewContact,
} = contactUsSlice.actions;

export default contactUsSlice.reducer;
