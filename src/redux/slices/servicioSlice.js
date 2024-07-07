import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    success: false,
    error: null,
    servicio: null,
    servicios: [], // Inicializado como un array vacío
};

export const servicioSlice = createSlice({
    name: 'servicio',
    initialState,
    reducers: {
        createServicioStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createServicioSuccess: (state, action) => {
            state.loading = false;
            state.success = true;
            state.servicio = action.payload;
        },
        createServicioFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearServicioError: (state) => {
            state.error = null;
        },
        getServiciosStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        getServiciosSuccess: (state, action) => {
            state.loading = false;
            state.servicios = action.payload;
        },
        getServiciosFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { 
    createServicioStart, 
    createServicioSuccess, 
    createServicioFailure, 
    clearServicioError, 
    getServiciosStart, 
    getServiciosSuccess, 
    getServiciosFailure 
} = servicioSlice.actions;

export default servicioSlice.reducer; // Export the reducer to use it in the store

