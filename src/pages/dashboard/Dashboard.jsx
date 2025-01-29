import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { axiosClient } from '../../apiClient/apiClient';
import { SECURED } from '../../apiClient/url';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const { authData, logOut } = useAuth();
    const navigate = useNavigate()

    const callApi = async () => {
        try {
            const response = await axiosClient.get(SECURED,{withCredentials:true})
        } catch (error) {
            if (error?.response?.status === 401 || error?.response?.status === 403) {
                navigate('/error-page')
            }
        }
    }

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
                <h1>welcome to the Dashboard, {authData?.username || 'user'}</h1>
                <button className='blackButton mt-5' onClick={logOut}>Logout</button>
                <button className='blackButton mt-5 ml-2' onClick={callApi}>Call</button>
            </div>
        </div>
    )
}

export default Dashboard