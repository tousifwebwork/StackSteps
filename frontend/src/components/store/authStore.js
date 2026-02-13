 

import { create } from 'zustand';
import axios from 'axios';

// API base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

 // Auth Store 
const useAuthStore = create((set, get) => ({ 
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
    role: localStorage.getItem("role") || null,
    loading: true,

     
    isLoggedIn: () => {
        return !!localStorage.getItem("token");
    },

     
    login: async (username, password, role) => {
        try {
            const response = await axios.post(`${API_URL}/login`, {
                username,
                password,
                role
            });

            // Update state and store token
            set({
                user: response.data.user,
                token: response.data.token,
                error: null,
                role: response.data.user.role
            });

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("role", response.data.user.role);
        } catch (error) {
            set({ error: error.response?.data?.message || 'Login failed' });
        }
    },

     
    signup: async (username, email, password, confirmPassword) => {
        try {
            const response = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password,
                confirmPassword
            });

            set({
                user: response.data.user,
                token: response.data.token,
                error: null
            });
        } catch (error) {
            set({ error: error.response?.data?.message || "Signup failed" });
        }
    },

     
    logout: () => {
        set({ user: null, token: null, error: null, role: null });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    },

     
    restoreAuth: async () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        
        if (!token) {
            set({ loading: false, user: null, token: null, role: null });
            return;
        }

        try {
            // Validate token with backend
            const response = await axios.get(`${API_URL}/validate`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            set({
                user: response.data.user,
                token: token,
                role: response.data.user?.role || role,
                loading: false,
                error: null
            });
        } catch (error) {
            // Token invalid, clear everything
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            set({ user: null, token: null, role: null, loading: false });
        }
    },

     
    initAuth: () => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        
        if (token && role) {
            set({ token, role, loading: false });
        } else {
            set({ loading: false });
        }
    }
}));

export default useAuthStore;
