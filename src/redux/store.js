import { configureStore } from "@reduxjs/toolkit";
import { studentSlice } from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    student: studentSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
