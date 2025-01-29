import axios from "axios";
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
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error)
    }
)