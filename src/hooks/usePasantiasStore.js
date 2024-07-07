import { useDispatch, useSelector } from "react-redux";
import unergApi from "@/api/unergApi";
import {
    createPasantiaStart,
    createPasantiaSuccess,
    createPasantiaFailure,
    clearPasantiaError,
    getPasantiasStart,
    getPasantiasSuccess,
    getPasantiasFailure,
    acceptRequestStart,
    acceptRequestSuccess,
    acceptRequestFailure,
    rejectRequestStart,
    rejectRequestSuccess,
    rejectRequestFailure,
} from "@/redux/slices/pasantiasSlice";

export const usePasantiasStore = () => {
    const { loading, success, error, pasantia, pasantias } = useSelector(state => state.pasantias);
    const dispatch = useDispatch();

    // Función para crear una nueva pasantía
    const startCrearPasantia = async (pasantiaData) => {
        dispatch(createPasantiaStart());
        try {
            const { data } = await unergApi.post('http://localhost:4000/api/inscripciones/pasantias', pasantiaData);
            dispatch(createPasantiaSuccess(data));
        } catch (error) {
            dispatch(createPasantiaFailure(error.response?.data?.msg || 'Error al crear la pasantía'));
            setTimeout(() => {
                dispatch(clearPasantiaError());
            }, 5000); // Limpiar error después de 5 segundos
        }
    };

    // Función para obtener todas las pasantías
    const getPasantias = async () => {
        dispatch(getPasantiasStart());
        try {
            const { data } = await unergApi.get('http://localhost:4000/api/inscripciones/registro-pasantias');
            dispatch(getPasantiasSuccess(data.pasantias)); // Se espera que el backend devuelva un objeto con la propiedad pasantias
        } catch (error) {
            dispatch(getPasantiasFailure(error.response?.data?.msg || 'Error al obtener las pasantías'));
        }
    };

    // Función para aceptar una solicitud de inscripción
    const acceptRequest = async (requestId) => {
        dispatch(acceptRequestStart());
        try {
            await unergApi.post(`http://localhost:4000/api/requests/accept/${requestId}`); // Cambia la ruta según tu backend
            dispatch(acceptRequestSuccess(requestId));
        } catch (error) {
            dispatch(acceptRequestFailure(error.response?.data?.msg || 'Error al aceptar la solicitud'));
        }
    };

    // Función para rechazar una solicitud de inscripción
    const rejectRequest = async (requestId) => {
        dispatch(rejectRequestStart());
        try {
            await unergApi.post(`http://localhost:4000/api/requests/reject/${requestId}`); // Cambia la ruta según tu backend
            dispatch(rejectRequestSuccess(requestId));
        } catch (error) {
            dispatch(rejectRequestFailure(error.response?.data?.msg || 'Error al rechazar la solicitud'));
        }
    };

    // Función para verificar si un usuario está registrado en pasantías
    const isUserRegisteredInPasantias = (uid) => {
        if (!pasantias) return false; // Verifica que `pasantias` no sea undefined o null
        return pasantias.some(pasantia => pasantia.user === uid);
    };

    return {
        loading,
        success,
        error,
        pasantia,
        pasantias,
        startCrearPasantia,
        getPasantias,
        acceptRequest,
        rejectRequest,
        isUserRegisteredInPasantias,
    };
};
