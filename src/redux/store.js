import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./slices/studentSlice";
import { authSlice } from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    student: studentSlice.reducer, 
    auth: authSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
