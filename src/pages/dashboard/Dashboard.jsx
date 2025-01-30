import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { axiosClient } from '../../apiClient/apiClient';
import { SECURED } from '../../apiClient/url';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { authData, logOut, setUnauthError } = useAuth();
    const navigate = useNavigate()

    const callApi = async () => {
        try {
            const response = await axiosClient.get(SECURED,{withCredentials:true})
        } catch (error) {
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                setUnauthError(error)
                navigate('/', { replace: true })
            }
        }
    }

    const handleLogOut = () => {
        navigate('/', { replace: true })
        logOut()
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
                <h1>welcome to the Dashboard, {authData?.username || 'user'}</h1>
                <div className='flex justify-center'>
                <button className='blackButton mt-5' onClick={handleLogOut}>Logout</button>
                <button className='blackButton mt-5 ml-2' onClick={callApi}>Call</button>
                </div>
            </div>
        </div>
    )
}

export default Dashboard