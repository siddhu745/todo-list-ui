import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
    const { authData, loading } = useAuth();
    if (!loading && !authData?.token) {
        return <Navigate to={'/'} />
    }
    return children
}

export default ProtectedRoute