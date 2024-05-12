
import { getEnvVariables } from "@/helpers/getEnvVariables";
import axios from "axios";




const { NEXT_PUBLIC_API_URL } = getEnvVariables()




const unergApi = axios.create({
    baseURL: NEXT_PUBLIC_API_URL
});

// Todo: configurar interceptores
unergApi.interceptors.request.use( config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }

    return config;
})


export default unergApi;