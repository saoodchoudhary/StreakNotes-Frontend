import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    console.log('Auth State:', authState);
  }, [authState]);

  return authState ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
