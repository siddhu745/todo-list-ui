import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [authData, setAuthData] = useState({});
    const [unAuthError, setUnauthError] = useState({})
    const [loading, setLoading] = useState(true);
    const [isLogOut, setIsLogOut] = useState(false);

    useEffect(() => {
        const data = localStorage.getItem('authData');
        if (data) {
            try {
                setAuthData(JSON.parse(data))
            } catch (error) {
                console.error(error)
            }

        };
        setLoading(false);
    }, [])


    const login = (authData) => {
        if (authData) {
            setAuthData(authData);
            localStorage.setItem('authData', JSON.stringify(authData));
        }
    }

    const logOut = () => {
        setAuthData({});
        setIsLogOut(true);
        localStorage.removeItem('authData');
    }

    return (
        <AuthContext.Provider value={
            { 
                authData,
                login,
                logOut, 
                loading, 
                unAuthError, 
                setUnauthError,
                isLogOut,
                setIsLogOut
            }
        }>
            {children}
        </AuthContext.Provider>
    )
}