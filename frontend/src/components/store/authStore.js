/**
 * Authentication Store (Zustand)
 * Manages user authentication state, login, signup, and logout
 */

import { create } from 'zustand';
import axios from 'axios';

// API base URL
const API_URL = 'http://localhost:3000/api';

// ============================================
// Auth Store
// ============================================

const useAuthStore = create((set, get) => ({
    // ========================================
    // State
    // ========================================
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,
    role: localStorage.getItem("role") || null,
    loading: true,

    // ========================================
    // Actions
    // ========================================

    /**
     * Check if user is currently logged in
     * @returns {boolean} True if token exists in localStorage
     */
    isLoggedIn: () => {
        return !!localStorage.getItem("token");
    },

    /**
     * Login user with credentials
     * @param {string} username - User's username
     * @param {string} password - User's password
     * @param {string} role - User's role (user/admin)
     */
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

    /**
     * Register a new user
     * @param {string} username - Desired username
     * @param {string} email - User's email
     * @param {string} password - Desired password
     * @param {string} confirmPassword - Password confirmation
     */
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

    /**
     * Logout user and clear session
     */
    logout: () => {
        set({ user: null, token: null, error: null, role: null });
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    },

    /**
     * Restore auth state from localStorage on app mount
     * Validates token and sets loading to false
     */
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

    /**
     * Set loading state to false (fallback if no validation endpoint)
     */
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
