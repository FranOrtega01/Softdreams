import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export const PrivateRoute = ({to, children }) => {
    const { isLogged } = useContext(AuthContext);
    return isLogged ? children : <Navigate to={to} />
};
