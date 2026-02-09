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

const useAuthStore = create((set) => ({
    // ========================================
    // State
    // ========================================
    user: null,
    token: localStorage.getItem("token") || null,
    error: null,

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
                error: null
            });

            localStorage.setItem("token", response.data.token);
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
        set({ user: null, token: null, error: null });
        localStorage.removeItem("token");
    }
}));

export default useAuthStore;
