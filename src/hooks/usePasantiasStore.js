// hooks/usePasantiasStore.js
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
} from "@/redux/slices/pasantiasSlice";

export const usePasantiasStore = () => {
    const { loading, success, error, pasantia, pasantias } = useSelector(state => state.pasantias);
    const dispatch = useDispatch();

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

    const getPasantias = async () => {
        dispatch(getPasantiasStart());
        try {
            const { data } = await unergApi.get('http://localhost:4000/api/inscripciones/registro-pasantias');
            dispatch(getPasantiasSuccess(data.pasantias)); // Se espera que el backend devuelva un objeto con la propiedad pasantias
        } catch (error) {
            dispatch(getPasantiasFailure(error.response?.data?.msg || 'Error al obtener las pasantías'));
        }
    };

    // Nueva función para verificar si el usuario está registrado en alguna pasantía
    const isUserRegisteredInPasantias = (uid) => {
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
        isUserRegisteredInPasantias, // Exporta la nueva función
    };
};