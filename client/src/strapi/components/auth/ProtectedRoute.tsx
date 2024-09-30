/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const token = localStorage.getItem('jwt');

    // If the token exists, render the children (protected component)
    // Otherwise, redirect to the login page
    return !token ? (
        <Navigate to="/login" replace />
    ) : (
        <>{children}</>
    );
};

export default ProtectedRoute;
