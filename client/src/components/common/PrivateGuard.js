import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from "../../contexts/AuthContext";

import {  useContext } from 'react';

const PrivateGuard = ({children}) => {
    const { user } = useContext(AuthContext);
    
    if (!user.accessToken) {
        return <Navigate to="/login" replace />
    }

    return children ? children : <Outlet />  
};

export default PrivateGuard;