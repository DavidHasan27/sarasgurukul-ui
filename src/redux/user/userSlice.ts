import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getAuthToken, setSessionStorage } from "../../utils";
import queryString from "query-string";
import { cloneDeep, remove } from "lodash";
import { uploadFiles } from "../admin/adminSlice";

const initialState = {
  loading: false,
  success: false,
  error: null,
  user: null,
  roleList: [],
  newuser: null,
  dropdownUserList: [],
  userList: null,
  updatedUser: "",
  receiverList: [],
  receiverLoding: false,
};

export const getUserRoles = createAsyncThunk(
  `/user/get-user-role`,
  async (_: void, { rejectWithValue }: any) => {
    try {
      const res = await axios.get("/api/user/get-user-role", {
        headers: { Authorization: getAuthToken() },
      });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        throw rejectWithValue(
          err.response.data.status === 400
            ? "Please enter valid credintial"
            : "Something went wrong, Please try again later"
        );
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const createNewUser = createAsyncThunk(
  `/user/createUser`,
  async (data: any, { rejectWithValue }) => {
    try {
      if (data.userProfilePhoto) {
        const result = await uploadFiles(data.userProfilePhoto);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.userProfilePhoto.file.name;
        data.userProfilePhoto = finalResult;
      }

      if (data.fileList && data.fileList.length > 0) {
        for (let i = 0; i < data.fileList.length; i++) {
          const result = await uploadFiles(data.fileList[i]);
          if (result && result.data) {
            const finalResult =
              result.data.bucket +
              "|" +
              result.data.name +
              "|" +
              data.fileList[i].file.name;
            data.userDetails["doc" + (i + 1)] = finalResult;
          }
        }
      }

      delete data.fileList;

      const res = await axios.post("/api/user/createUser", data, {
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

export const getUserForDropdown = createAsyncThunk(
  `/user/getUsersByFilterForDropdown`,
  async (data: any, { rejectWithValue }: any) => {
    try {
      const params = "?roleId=" + data.roleId + "&schoolId=" + data.schoolId;
      const res = await axios.get(
        "/api/user/getUsersByFilterForDropdown" + params,
        {
          headers: { Authorization: getAuthToken() },
        }
      );
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        throw rejectWithValue(
          err.response.data.status === 400
            ? "Please enter valid credintial"
            : "Something went wrong, Please try again later"
        );
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const getUsersList = createAsyncThunk(
  `/user/getUsersByFilter`,
  async (data: any, { rejectWithValue }: any) => {
    try {
      const urlParams = queryString.stringify(data);
      const res = await axios.get("/api/user/getUsersByFilter?" + urlParams, {
        headers: { Authorization: getAuthToken() },
      });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        throw rejectWithValue(
          err.response.data.status === 400
            ? "Please enter valid credintial"
            : "Something went wrong, Please try again later"
        );
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const activeDeactiveUser = createAsyncThunk(
  `/user/delete`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/api/user/delete", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      return { ...res.data, id: data.id, active: data.active };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const isString = (value: any) => {
  return typeof value === "string" || value instanceof String;
};

export const updateUser = createAsyncThunk(
  `/user/update`,
  async (data: any, { rejectWithValue }) => {
    try {
      if (data.userProfilePhoto && !isString(data.userProfilePhoto)) {
        const result = await uploadFiles(data.userProfilePhoto);
        const finalResult =
          result.data.bucket +
          "|" +
          result.data.name +
          "|" +
          data.userProfilePhoto.file.name;
        data.userProfilePhoto = finalResult;
      }

      for (let i = 1; i <= 3; i++) {
        if (data.fileList && data.fileList[i - 1]) {
          if (!isString(data.fileList[i - 1])) {
            const result = await uploadFiles(data.fileList[i - 1]);
            if (result && result.data) {
              const finalResult =
                result.data.bucket +
                "|" +
                result.data.name +
                "|" +
                data.fileList[i - 1].file.name;
              data.userDetails["doc" + i] = finalResult;
            }
          } else {
            data.userDetails["doc" + i] = data.fileList[i - 1];
          }
        } else {
          data.userDetails["doc" + i] = null;
        }
      }

      delete data.fileList;

      const res = await axios.put("/api/user/update", data, {
        headers: { Authorization: getAuthToken() },
      });
      console.log("res", res);
      return res.data;
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

export const getReceiverList = createAsyncThunk(
  `/user/get-user-receiver`,
  async (data: any, { rejectWithValue }: any) => {
    try {
      const urlParams = queryString.stringify(data);
      const res = await axios.get("/api/user/get-user-receiver?" + urlParams, {
        headers: { Authorization: getAuthToken() },
      });
      return res.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        throw rejectWithValue(
          err.response.data.status === 400
            ? "Please enter valid credintial"
            : "Something went wrong, Please try again later"
        );
      } else {
        throw rejectWithValue("Something went wrong, Please try again later");
      }
    }
  }
);

export const getReceivers = async (data: any) => {
  const urlParams = queryString.stringify(data);
  const res = await axios.get("/api/user/get-user-receiver?" + urlParams, {
    headers: { Authorization: getAuthToken() },
  });
  return res.data;
};
const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addingStartedLogin: (state) => {
      state.loading = true;
      state.error = null;
    },
    addedLoginSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addedLoginUsFailed: (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetLoginError: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
    setUserDetails: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = action.payload;
    },
    resetUserDetails: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = null;
    },
    resetNewUserDetails: (state) => {
      state.loading = false;
      state.success = false;
      state.newuser = null;
      state.error = null;
      state.user = null;
    },
    resetUpdatedUserDetails: (state) => {
      state.loading = false;
      state.success = false;
      state.updatedUser = "";
      state.error = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserRoles.fulfilled, (state, action) => {
      console.log("Role List Success::>>>", action.payload);
      state.loading = false;
      state.roleList = action.payload;
      state.error = null;
    });
    builder.addCase(getUserRoles.rejected, (state, action: any) => {
      console.log("Payload Error ::", action.payload);
      state.loading = false;
      state.user = null;
      state.error = action.payload;
    });
    builder.addCase(getUserRoles.pending, (state, action) => {
      console.log("Payload pending ::", action.payload);
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      console.log("Create User Success::>>>", action.payload);
      state.loading = false;
      state.newuser = action.payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(createNewUser.rejected, (state, action: any) => {
      console.log("Create User Error ::", action.payload);
      state.loading = false;
      state.newuser = null;
      state.error = action.payload;
    });
    builder.addCase(createNewUser.pending, (state, action) => {
      console.log("Create User pending ::", action.payload);
      state.loading = true;
      state.error = null;
      state.newuser = null;
    });

    builder.addCase(getUserForDropdown.fulfilled, (state, action) => {
      console.log("Create User Success::>>>", action.payload);
      state.loading = false;
      state.dropdownUserList = action.payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(getUserForDropdown.rejected, (state, action: any) => {
      console.log("Create User Error ::", action.payload);
      state.loading = false;
      state.dropdownUserList = [];
      state.error = action.payload;
    });
    builder.addCase(getUserForDropdown.pending, (state, action) => {
      console.log("Create User pending ::", action.payload);
      state.loading = true;
      state.error = null;
      state.dropdownUserList = [];
    });

    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.loading = false;
      state.userList = action.payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(getUsersList.rejected, (state, action: any) => {
      state.loading = false;
      state.userList = null;
      state.error = action.payload;
    });
    builder.addCase(getUsersList.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.userList = null;
    });

    builder.addCase(activeDeactiveUser.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.updatedUser = action.payload.active
        ? "Successfully activated school"
        : "Successfully de-activated school";

      const tempSchoolList: any = cloneDeep(state.userList);
      remove(tempSchoolList.content, (item: any) => {
        return item.id === action.payload.id;
      });
      //   }
      state.userList = tempSchoolList;
    });
    builder.addCase(activeDeactiveUser.rejected, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(activeDeactiveUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedUser = "User successfully updated";
      state.error = null;
      state.success = true;
    });
    builder.addCase(updateUser.rejected, (state, action: any) => {
      state.loading = false;
      state.userList = null;
      state.updatedUser = "";
      state.error = action.payload;
    });
    builder.addCase(updateUser.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      state.updatedUser = "";
      state.userList = null;
    });
    builder.addCase(getReceiverList.fulfilled, (state, action) => {
      console.log("Create User Success::>>>", action.payload);
      state.receiverLoding = false;
      state.receiverList = action.payload;
      state.success = true;
      state.error = null;
    });
    builder.addCase(getReceiverList.rejected, (state, action: any) => {
      console.log("Create User Error ::", action.payload);
      state.receiverLoding = false;
      state.receiverList = [];
      state.error = action.payload;
    });
    builder.addCase(getReceiverList.pending, (state, action) => {
      console.log("Create User pending ::", action.payload);
      state.receiverLoding = true;
      state.error = null;
      state.receiverList = [];
    });
  },
});

export const {
  addingStartedLogin,
  addedLoginSuccess,
  addedLoginUsFailed,
  resetLoginError,
  setUserDetails,
  resetUserDetails,
  resetNewUserDetails,
  resetUpdatedUserDetails,
} = userSlice.actions;

export default userSlice.reducer;
