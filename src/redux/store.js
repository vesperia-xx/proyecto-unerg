import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./slices/studentSlice";
import { useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    student: studentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});