/**
 * Profile Store (Zustand)
 * Manages user profile data, statistics, and time tracking
 */

import { create } from 'zustand';
import axios from 'axios';

// API Configuration
const API_URL = 'http://localhost:3000/api';

/**
 * Get authorization headers for API requests
 * @returns {Object} Headers object with Bearer token
 */
const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// ============================================
// Profile Store
// ============================================

const useProfileStore = create((set) => ({
    // ========================================
    // State
    // ========================================
    user: null,
    stats: null,
    quote: null,
    loading: false,
    error: null,

    // ========================================
    // Actions
    // ========================================

    /**
     * Fetch user profile information
     */
    fetchProfile: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(`${API_URL}/profile`, getAuthHeaders());
            set({ user: data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to fetch profile',
                loading: false
            });
        }
    },

    /**
     * Update user profile information
     * @param {Object} updatedData - Updated profile fields
     */
    updateProfile: async (updatedData) => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.put(`${API_URL}/profile`, updatedData, getAuthHeaders());
            set({ user: data.user, loading: false });
            return data;
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to update profile',
                loading: false
            });
            throw err;
        }
    },

    /**
     * Fetch user statistics (solved questions, progress, etc.)
     */
    fetchStats: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(`${API_URL}/getStats`, getAuthHeaders());
            set({ stats: data, loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to fetch stats',
                loading: false
            });
        }
    },

    /**
     * Fetch a random motivational quote
     */
    fetchQuote: async () => {
        try {
            const { data } = await axios.get(`${API_URL}/quote`);
            set({ quote: data });
        } catch (err) {
            console.error('Failed to fetch quote:', err.message);
        }
    },

    /**
     * Update time spent on platform today
     * @param {number} timeSpent - Time in milliseconds
     */
    updateTimeSpent: async (timeSpent) => {
        try {
            await axios.post(`${API_URL}/updateTimeSpent`, { timeSpent }, getAuthHeaders());
        } catch (err) {
            console.error('Failed to update time spent:', err.message);
        }
    },

    /**
     * Clear error state
     */
    clearError: () => set({ error: null })
}));

export default useProfileStore;
