
import { create } from 'zustand';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// API Configuration
const API_URL = `${import.meta.env.VITE_API_URL}/api`;


const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});


const mapQuestion = (q) => ({
    _id: q._id,
    questionNo: q.questionNo,
    question: q.question,
    options: q.options || [],
    correctAnswer: q.correctAnswer,
    difficulty: q.difficulty || 'Medium',
});

// Question Store

const useQuestionStore = create((set, get) => ({
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

     
    setSelectedSubject: (subject) => set({ selectedSubject: subject, currentIndex: 0 }),

    
    setCurrentIndex: (index) => set({ currentIndex: index }),

    // Selectors
    getCurrentQuestions: () => {
        const { selectedSubject, questions } = get();
        return questions[selectedSubject.toLowerCase()] || [];
    },

    getTotalQuestions: (subject) => {
        const { questions } = get();
        const key = subject?.toLowerCase() || get().selectedSubject.toLowerCase();
        return questions[key]?.length || 0;
    },

    getTotalAllQuestions: () => {
        const { questions } = get();
        return Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);
    },

    // API Actions
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

    getDifficultySummary: () => {
  const { questions } = get();

  const result = {};

  Object.keys(questions).forEach((subject) => {
    result[subject] = questions[subject].reduce(
      (acc, q) => {
        acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        return acc;
      },
      { Easy: 0, Medium: 0, Hard: 0 }
    );
  });

  return result;
},
}));

export default useQuestionStore;