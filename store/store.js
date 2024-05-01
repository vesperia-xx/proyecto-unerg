import { configureStore } from "@reduxjs/toolkit"
import { studentSlice } from "./users/studentSlice"



export const store = configureStore({
    reducer: {
        student: studentSlice,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),


})
