import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    success: false,
    error: null,
    pasantia: null,
    pasantias: [], // Inicializado como un array vacío
};

export const pasantiasSlice = createSlice({
    name: 'pasantias',
    initialState,
    reducers: {
        createPasantiaStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createPasantiaSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.pasantia = action.payload;
        },
        createPasantiaFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearPasantiaError: (state) => {
            state.error = null;
        },
        getPasantiasStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getPasantiasSuccess: (state, action) => {
            state.loading = false;
            state.pasantias = action.payload;
        },
        getPasantiasFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    createPasantiaStart, 
    createPasantiaSuccess, 
    createPasantiaFailure, 
    clearPasantiaError, 
    getPasantiasStart, 
    getPasantiasSuccess, 
    getPasantiasFailure 
} = pasantiasSlice.actions;