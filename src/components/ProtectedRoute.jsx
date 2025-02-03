import React from 'react'
import { useAuth } from '../context/AuthContext'
import ErrorPage from '../pages/error/ErrorPage';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { authData, loading, isLogOut } = useAuth();
    if (!loading && !authData?.token) {
        if(isLogOut){
            return <Navigate to={'/'} replace />
        } 
        return <ErrorPage 
                    statusCode={401} 
                    message={'Unauthorized access to this page'} 
                    description={'But don\'t worry, you can go home and login/register to access this page'}
                />
    }
    return children
}

export default ProtectedRoute