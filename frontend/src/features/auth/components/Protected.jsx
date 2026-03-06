import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router';

const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    // console.log(user);
    if(!loading && !user){
        return <Navigate to='/login' />
    }

    return children;
};

export default Protected;