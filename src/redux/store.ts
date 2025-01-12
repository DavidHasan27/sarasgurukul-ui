import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactsus/contactUsSlice";
import authReducer from "./user_auth/authSlice";
import schoolReducer from "./schools/schoolSlice";
import webReducer from "./website/webSlice";
import userReducer from "./user/userSlice";
import classReducer from "./class/classSlice";
import studentReducer from "./students/studentSlice";
import reportReducer from "./students/reportSlice";
import adminReducer from "./admin/adminSlice";
import feesReducer from "./fees/feesSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    contactus: contactReducer,
    auth: authReducer,
    website: webReducer,
    school: schoolReducer,
    user: userReducer,
    class: classReducer,
    student: studentReducer,
    admin: adminReducer,
    report: reportReducer,
    fees: feesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
