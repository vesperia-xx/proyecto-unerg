import unergApi from "@/api/unergApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux"




export const useAuthStore = () => {


    const { status, user, errorMessage } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await unergApi.post('http://localhost:4000/api/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            console.log({ data })

        } catch (error) {
            dispatch(onLogout('Credenciales incorrectas'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
            console.log(error)
        }

    }

    const startRegister = async ({ email, lastName, name, CI, phoneNumber, password, image }) => {
        dispatch(onChecking());
        try {
            const { data } = await unergApi.post('http://localhost:4000/api/auth/new', { email, lastName, name, CI, phoneNumber, password, image });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
            console.log({ data })

        } catch (error) {
            dispatch(onLogout(error.response.data?.msg || ''));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
            console.log(error)
        }

    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(onLogout());

        try {
            const { data } = await unergApi.get('http://localhost:4000/api/auth/renew');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }



    return {
        status,
        user,
        errorMessage,


        startLogin,
        startRegister,
        checkAuthToken,
        startLogout



    }
}