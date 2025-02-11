import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import ErrorPage from '../pages/error/ErrorPage';
import { Navigate, useNavigate } from 'react-router-dom';
import { axiosClient } from '../apiClient/apiClient';
import { SECURED } from '../apiClient/url';

function ProtectedRoute({ children }) {
    const { authData, loading, isLogOut, setUnauthError } = useAuth();
    const navigate = useNavigate()
    const [allow, setAllow] = useState(false);

    const callApi = async () => {
        try {
            const response = await axiosClient.get(SECURED, { withCredentials: true })
            if(response.status === 200) setAllow(true);
        } catch (error) {
            if (error?.code === 'ERR_NETWORK' || error?.response?.status === 401 || error?.response?.status === 403) {
                setUnauthError(error)
                console.log(error, "at protected route")
                navigate('/', { replace: true })
            }
        }
    }

    useEffect(() => {
        callApi();
    },[])

    if (!loading && !authData?.token) {
        if (isLogOut) {
            return <Navigate to={'/'} replace />
        }
        return <ErrorPage
            statusCode={401}
            message={'Unauthorized access to this page'}
            description={'But don\'t worry, you can go home and login/register to access this page'}
        />
    }
    return allow ? children : <h1 className='font-bold text-slate-500 text-2xl text-center m-10'>Loading & validating credentials...</h1>
}

export default ProtectedRoute