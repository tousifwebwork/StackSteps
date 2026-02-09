/**
 * Question Store (Zustand)
 * Manages questions, subject selection, and answer submission
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

/**
 * Map raw question data to consistent format
 * @param {Object} q - Raw question from API
 * @returns {Object} Formatted question object
 */
const mapQuestion = (q) => ({
    questionNo: q.questionNo,
    question: q.question,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    difficulty: q.difficulty || 'Medium',
});

// ============================================
// Question Store
// ============================================

const useQuestionStore = create((set, get) => ({
    // ========================================
    // State
    // ========================================
    selectedSubject: 'JavaScript',
    currentIndex: 0,
    questions: {
        javascript: [],
        react: [],
        nodejs: [],
        mongodb: [],
        gitgithub: [],
    },
    loading: false,

    // ========================================
    // Actions
    // ========================================

    /**
     * Set the currently selected subject
     * @param {string} subject - Subject name
     */
    setSelectedSubject: (subject) => set({ selectedSubject: subject, currentIndex: 0 }),

    /**
     * Set the current question index
     * @param {number} index - Question index
     */
    setCurrentIndex: (index) => set({ currentIndex: index }),

    // ========================================
    // Selectors
    // ========================================

    /**
     * Get questions for the currently selected subject
     * @returns {Array} Array of questions
     */
    getCurrentQuestions: () => {
        const { selectedSubject, questions } = get();
        return questions[selectedSubject.toLowerCase()] || [];
    },

    /**
     * Get total question count for a specific subject
     * @param {string} subject - Subject name (optional, defaults to selected)
     * @returns {number} Total number of questions
     */
    getTotalQuestions: (subject) => {
        const { questions } = get();
        const key = subject?.toLowerCase() || get().selectedSubject.toLowerCase();
        return questions[key]?.length || 0;
    },

    /**
     * Get total question count across all subjects
     * @returns {number} Total questions in all subjects
     */
    getTotalAllQuestions: () => {
        const { questions } = get();
        return Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);
    },

    // ========================================
    // API Actions
    // ========================================

    /**
     * Fetch all questions from backend and group by subject
     */
    fetchQuestions: async () => {
        set({ loading: true });
        try {
            const { data } = await axios.get(`${API_URL}/questions`, getAuthHeaders());
            const allQuestions = data.questions || [];

            // Group questions by technology
            const groupedQuestions = {
                javascript: allQuestions.filter((q) => q.tech.toLowerCase() === 'javascript').map(mapQuestion),
                react: allQuestions.filter((q) => q.tech.toLowerCase() === 'react').map(mapQuestion),
                nodejs: allQuestions.filter((q) => q.tech.toLowerCase() === 'nodejs').map(mapQuestion),
                mongodb: allQuestions.filter((q) => q.tech.toLowerCase() === 'mongodb').map(mapQuestion),
                gitgithub: allQuestions.filter((q) => q.tech.toLowerCase() === 'gitgithub').map(mapQuestion),
            };

            set({ questions: groupedQuestions, currentIndex: 0, loading: false });
        } catch (err) {
            console.error('Failed to fetch questions:', err.message);
            toast.error('Failed to load questions');
            set({ loading: false });
        }
    },

    /**
     * Submit an answer for a question
     * @param {string} tech - Technology/subject
     * @param {number} questionNo - Question number
     * @param {string} selectedOption - User's selected answer
     * @returns {Object} Response from server
     */
    submitAnswer: async (tech, questionNo, selectedOption) => {
        try {
            const { data } = await axios.post(
                `${API_URL}/question`,
                { tech: tech.toLowerCase(), questionNo, selectedOption },
                getAuthHeaders()
            );

            // Show feedback toast
            if (data.correct) {
                toast.success('Correct Answer!');
            } else {
                toast.error('Wrong Answer. Try Again!');
            }

            return data;
        } catch (err) {
            console.error('Failed to submit answer:', err.response?.data || err.message);
            toast.error('Failed to submit answer');
        }
    },
}));

export default useQuestionStore;