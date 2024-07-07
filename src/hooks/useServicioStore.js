import { useDispatch, useSelector } from "react-redux";

import { clearServicioError, createServicioFailure, createServicioStart, createServicioSuccess, getServiciosFailure, getServiciosStart, getServiciosSuccess } from "@/redux/slices/servicioSlice";
import unergApi from "@/api/unergApi";

export const useServicioStore = () => {
    const { loading, success, error, servicio, servicios } = useSelector(state => state.servicio);
    const dispatch = useDispatch();

    // Función para crear un nuevo servicio
    const startCrearServicio = async (servicioData) => {
        dispatch(createServicioStart());
        try {
            const { data } = await unergApi.post('http://localhost:4000/api/inscripciones/servicio', servicioData); // Usa ruta relativa
            dispatch(createServicioSuccess(data));
        } catch (error) {
            dispatch(createServicioFailure(error.response?.data?.msg || 'Error al crear el servicio'));
            setTimeout(() => {
                dispatch(clearServicioError());
            }, 5000); // Limpiar error después de 5 segundos
        }
    };

    // Función para obtener todos los servicios
    const getServicios = async () => {
        dispatch(getServiciosStart());
        try {
            const { data } = await unergApi.get('http://localhost:4000/api/inscripciones/registro-servicio'); // Usa ruta relativa
            dispatch(getServiciosSuccess(data.servicios)); // Se espera que el backend devuelva un objeto con la propiedad servicios
        } catch (error) {
            dispatch(getServiciosFailure(error.response?.data?.msg || 'Error al obtener el servicio'));
        }
    };

    // Función para verificar si un usuario está registrado en servicios
    const isUserRegisteredInServicios = (uid) => {
        if (!servicios) return false; // Verifica que `servicios` no sea undefined o null
        return servicios.some(servicio => servicio.user === uid);
    };

    return {
        loading,
        success,
        error,
        servicio,
        servicios,
        startCrearServicio,
        getServicios,
        isUserRegisteredInServicios,
    };
};
