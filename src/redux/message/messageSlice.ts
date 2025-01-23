import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { error } from "console";
import { axiosPublic } from "../network";
import { RootState } from "../store";
import axios from "axios";
import { uploadFiles } from "../admin/adminSlice";
import { getAuthToken } from "../../utils";
import queryString from "query-string";
import { da } from "date-fns/locale";
import { clone, findIndex, remove } from "lodash";

const initialState = {
  loading: false,
  success: false,
  error: "",
  newMessage: undefined,
  message: undefined,
  messageLoader: false,
  successMessage: "",
};

export const createNewMessage = createAsyncThunk(
  `/message/create`,
  async (data: any) => {
    const fileResult = [];
    let result: any = undefined;
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
    const res = await axios.post("/api/message/create", data, {
      headers: { Authorization: getAuthToken() },
    });
    console.log("res", res);
    return res.data;
  }
);

export const markRead = createAsyncThunk(
  `/message/mark-read`,
  async (data: any) => {
    const url = "/api/message/mark-read/" + data.messageId + "/" + data.userId;
    const res = await axios.post(url, data, {
      headers: { Authorization: getAuthToken() },
    });
    console.log("res", res);
    return { messageId: data.messageId, userId: data.userId };
  }
);

export const getMessageList = createAsyncThunk(
  `/message/inbox-message`,
  async (data: any, { rejectWithValue }) => {
    const urlParams = queryString.stringify(data);
    let url = "/api/message/inbox-message?" + urlParams;
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

export const deleteMessage = createAsyncThunk(
  `/message/delete-message`,
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.delete("/api/message/delete-message", {
        headers: { Authorization: getAuthToken() },
        data,
      });
      return { ...res.data, ...data };
    } catch (err: any) {
      throw rejectWithValue("Something went wrong, Please try again later");
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    resetNewMessage: (state) => {
      state.loading = false;
      state.success = false;
      state.newMessage = undefined;
      state.error = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewMessage.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.newMessage = action.payload;
    });
    builder.addCase(createNewMessage.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(createNewMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMessageList.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.message = action.payload;
    });
    builder.addCase(getMessageList.rejected, (state) => {
      state.loading = false;
      state.success = false;
    });
    builder.addCase(getMessageList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(markRead.fulfilled, (state, action) => {
      const tempMessageList: any = clone(state.message);
      const index = findIndex(
        tempMessageList.content,
        (obj: any) => obj.id === action.payload.messageId
      );
      const messageReceiver = tempMessageList.content[index].receiverDetails;
      const receiverindex = findIndex(
        messageReceiver,
        (obj: any) => obj.receiverId.id === action.payload.userId
      );
      tempMessageList.content[index].receiverDetails[receiverindex].read = true;
      state.messageLoader = false;
      state.success = true;
      state.message = tempMessageList;
    });
    builder.addCase(markRead.rejected, (state) => {
      state.messageLoader = false;
      state.success = false;
    });
    builder.addCase(markRead.pending, (state) => {
      state.messageLoader = true;
    });

    builder.addCase(deleteMessage.fulfilled, (state, action) => {
      const tempMessageList: any = clone(state.message);
      remove(tempMessageList.content, (item: any) => {
        return item.id === action.payload.messageId;
      });
      state.messageLoader = false;
      state.success = true;
      state.message = tempMessageList;
      state.successMessage = "Message Delete Successfully";
    });
    builder.addCase(deleteMessage.rejected, (state) => {
      state.messageLoader = false;
      state.success = false;
    });
    builder.addCase(deleteMessage.pending, (state) => {
      state.messageLoader = true;
    });
  },
});

export const { resetNewMessage } = messageSlice.actions;

export default messageSlice.reducer;
