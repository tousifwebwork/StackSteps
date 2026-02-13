import { create } from 'zustand';
import axios from 'axios';

// API base URL
const API_URL = `${import.meta.env.VITE_API_URL}/api`;

// Auth header helper
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { headers: { Authorization: `Bearer ${token}` } }
    : {};
};

const useProfileStore = create((set) => ({
  user: null,
  stats: null,
  quote: null,
  loading: false,
  error: null,

  // FETCH USER PROFILE
  fetchProfile: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_URL}/profile`,
        getAuthHeaders()
      );

      set({ user: data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch profile',
        loading: false,
      });
    }
  },

  // UPDATE USER PROFILE
  updateProfile: async (updatedData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.put(
        `${API_URL}/profile`,
        updatedData,
        getAuthHeaders()
      );
      set({ user: data, loading: false });
      return data;
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to update profile',
        loading: false,
      });
      throw err;
    }
  },

  // FETCH USER STATS
  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get(
        `${API_URL}/getStats`,
        getAuthHeaders()
      );
      set({ stats: data, loading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || 'Failed to fetch stats',
        loading: false,
      });
    }
  },

  // FETCH QUOTE
  fetchQuote: async () => {
    try {
      const { data } = await axios.get(`${API_URL}/quote`);
      set({ quote: data });
    } catch (err) {
      console.error('Failed to fetch quote:', err.message);
    }
  },

  // UPDATE TIME SPENT
  updateTimeSpent: async (timeSpent) => {
    try {
      await axios.post(
        `${API_URL}/updateTimeSpent`,
        { timeSpent },
        getAuthHeaders()
      );
    } catch (err) {
      console.error('Failed to update time spent:', err.message);
    }
  },

  
  // CLEAR ERROR
  clearError: () => set({ error: null }),
}));

export default useProfileStore;