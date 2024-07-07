import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  error: null,
  pasantias: [],
};

const pasantiasSlice = createSlice({
  name: 'pasantias',
  initialState,
  reducers: {
    getPasantiasStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    getPasantiasSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.pasantias = action.payload;
      state.error = null;
    },
    getPasantiasFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    acceptPasantiaStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    acceptPasantiaSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.pasantias = state.pasantias.map(pasantia =>
        pasantia._id === action.payload ? { ...pasantia, status: 'Aceptada' } : pasantia
      );
      state.error = null;
    },
    acceptPasantiaFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    rejectPasantiaStart: (state) => {
      state.loading = true;
      state.success = false;
    },
    rejectPasantiaSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.pasantias = state.pasantias.filter(pasantia => pasantia._id !== action.payload.pasantiaId);
      state.error = null;
    },
    rejectPasantiaFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
  },
});

export const {
  getPasantiasStart,
  getPasantiasSuccess,
  getPasantiasFailure,
  acceptPasantiaStart,
  acceptPasantiaSuccess,
  acceptPasantiaFailure,
  rejectPasantiaStart,
  rejectPasantiaSuccess,
  rejectPasantiaFailure,
} = pasantiasSlice.actions;

export default pasantiasSlice.reducer;

