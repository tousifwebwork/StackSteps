
import React from 'react';
import { Navigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuthStore();

    // Redirect to login if not authenticated
    if (!isLoggedIn()) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content
    return children;
};

export default ProtectedRoute;