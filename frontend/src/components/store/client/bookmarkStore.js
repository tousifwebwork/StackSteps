/**
 * Bookmark Store (Zustand)
 * Manages bookmarked questions state and CRUD operations
 */

import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

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
// Bookmark Store
// ============================================

const useBookmarkStore = create((set, get) => ({
    // ========================================
    // State
    // ========================================
    bookmarks: [],
    selectedSubject: 'all',
    loading: false,
    error: null,

    // ========================================
    // Actions
    // ========================================

    /**
     * Set the selected subject filter
     * @param {string} subject - Subject to filter by ('all' or specific subject)
     */
    setSelectedSubject: (subject) => set({ selectedSubject: subject }),

    /**
     * Fetch all bookmarks from the server
     */
    fetchBookmarks: async () => {
        set({ loading: true, error: null });
        try {
            const { data } = await axios.get(`${API_URL}/bookmarks`, getAuthHeaders());
            set({ bookmarks: data.bookmarks || [], loading: false });
        } catch (err) {
            set({
                error: err.response?.data?.message || 'Failed to fetch bookmarks',
                loading: false
            });
            toast.error('Failed to fetch bookmarks');
        }
    },

    /**
     * Add a question to bookmarks
     * @param {Object} question - Question object to bookmark
     * @param {string} subject - Subject category
     */
    addBookmark: async (question, subject) => {
        try {
            const { data } = await axios.post(`${API_URL}/bookmark`, {
                subject,
                questionNo: question.questionNo,
                questionText: question.question,
                options: question.options,
                correctAnswer: question.correctAnswer
            }, getAuthHeaders());

            // Refresh bookmarks list
            get().fetchBookmarks();
            toast.success('Question bookmarked!');
            return data;
        } catch (err) {
            const message = err.response?.data?.message || 'Failed to bookmark';
            toast.error(message);
            throw err;
        }
    },

    /**
     * Remove a single bookmark
     * @param {string} bookmarkId - ID of bookmark to remove
     */
    removeBookmark: async (bookmarkId) => {
        try {
            await axios.delete(`${API_URL}/bookmark/${bookmarkId}`, getAuthHeaders());
            set((state) => ({
                bookmarks: state.bookmarks.filter((b) => b._id !== bookmarkId)
            }));
            toast.success('Bookmark removed!');
        } catch (err) {
            toast.error('Failed to remove bookmark');
        }
    },

    /**
     * Clear bookmarks (all or by subject)
     * @param {string} subject - Subject to clear, or 'all'
     */
    clearBookmarks: async (subject = 'all') => {
        try {
            await axios.delete(`${API_URL}/bookmarks?subject=${subject}`, getAuthHeaders());

            if (subject === 'all') {
                set({ bookmarks: [] });
            } else {
                set((state) => ({
                    bookmarks: state.bookmarks.filter((b) => b.subject !== subject.toLowerCase())
                }));
            }
            toast.success('Bookmarks cleared!');
        } catch (err) {
            toast.error('Failed to clear bookmarks');
        }
    },

    // ========================================
    // Selectors
    // ========================================

    /**
     * Get bookmarks filtered by selected subject
     * @returns {Array} Filtered bookmarks array
     */
    getFilteredBookmarks: () => {
        const { bookmarks, selectedSubject } = get();
        if (selectedSubject === 'all') return bookmarks;
        return bookmarks.filter((b) => b.subject === selectedSubject.toLowerCase());
    },

    /**
     * Check if a specific question is bookmarked
     * @param {string} subject - Subject category
     * @param {number} questionNo - Question number
     * @returns {boolean} True if question is bookmarked
     */
    isBookmarked: (subject, questionNo) => {
        const { bookmarks } = get();
        return bookmarks.some(
            (b) => b.subject === subject.toLowerCase() && b.questionNo === questionNo
        );
    }
}));

export default useBookmarkStore;
