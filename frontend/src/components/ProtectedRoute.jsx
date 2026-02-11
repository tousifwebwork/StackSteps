
import React from 'react';
import { Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

/**
 * ProtectedRoute - Handles authentication and role-based access
 * @param {React.ReactNode} children - Child components to render
 * @param {string} requiredRole - Required role to access route ('admin' | 'user')
 */
const ProtectedRoute = ({ children, requiredRole }) => {
    const { isLoggedIn, role, loading } = useAuthStore();

    // Don't redirect while still loading auth state
    if (loading) {
        return null;
    }
 
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    // Role-based access control
    if (requiredRole && role !== requiredRole) {
        // Redirect admin to admin dashboard, users to user dashboard
        if (role === 'admin') {
            return <Navigate to="/admin" replace />;
        }
        return <Navigate to="/" replace />;
    }

    // Render protected content
    return children;
};

export default ProtectedRoute;