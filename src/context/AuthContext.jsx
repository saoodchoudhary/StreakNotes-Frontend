import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if(authState){
            axios.defaults.headers.common['Authorization'] = `Bearer ${authState}`;
        }else{
            delete axios.defaults.headers.common['Authorization'];
        }

    }, []);

    const setToken = (token) => {
        localStorage.setItem('token', token);
        setAuthState(token);
    }

    const logout = () => {
        localStorage.removeItem('token');
        setAuthState({token : null});
    }
    return (
        <AuthContext.Provider value={{authState, setToken, logout}}>
            {children}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthProvider }