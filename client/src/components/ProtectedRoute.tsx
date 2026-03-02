import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, Role } from '../context/AuthContext';

interface ProtectedRouteProps {
    allowedRoles?: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <div className="loading-state">Loading...</div>;
    }

    if (!isAuthenticated || !user) {
        // Not logged in, redirect to login page
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Logged in but doesn't have required role
        return <Navigate to="/" replace />;
    }

    // All checks pass, render child routes
    return <Outlet />;
};
