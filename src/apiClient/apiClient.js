import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL

export const axiosClient = axios.create(
    {
        baseURL: baseURL,
        headers: {
            "Content-Type": 'application/json'
        }
    }
)

axiosClient.interceptors.request.use(
    (config) => {
        try {
            const token = JSON.parse(localStorage.getItem('authData'))?.token
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
        } catch (error) {
            console.error(error)
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)


let navigateFunction = null

export const useNavigation = () => {
    console.log(baseURL, "baseURL---->");
    const navigate = useNavigate();
    navigateFunction = navigate;
}


const navigate = (path) => {
    if (navigateFunction) {
        navigateFunction(path)
        console.log('redirected')
    }
        
    else console.error('navigation function not intialized in axios client')
}


axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            console.log("error page")
            navigate('/error-page')
        }

        return Promise.reject(error)
    }
)

export const httpMethods = Object.freeze({
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    PATCH: 'PATCH',
    DELETE: 'DELETE'
})


export const ping = async (url, data = null, method) => {
    if (!url) throw new Error('url is required')
    try {
        switch (method) {
            case httpMethods.POST:
                return (await axiosClient.post(url, data)).data;
            case httpMethods.PUT:
                return (await axiosClient.put(url, data)).data;
            case httpMethods.PATCH:
                return (await axiosClient.patch(url, data)).data;
            case httpMethods.DELETE:
                return (await axiosClient.delete(url, { data })).data;
            default:
                return (await axiosClient.get(url)).data;
        }
    } catch (error) {
        console.error("API call failed: ", error)
    }
}