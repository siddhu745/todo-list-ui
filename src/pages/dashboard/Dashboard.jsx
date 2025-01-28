import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Dashboard() {
    const { authData,logOut } = useAuth();
    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='text-center'>
                <h1>welcome to the Dashboard, {authData?.username || 'user'}</h1>
                <button className='blackButton mt-5' onClick={logOut}>Logout</button>
            </div>
        </div>
    )
}

export default Dashboard