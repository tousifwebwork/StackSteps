 

import { useEffect, useState } from 'react';
import Carrier from './Carrier';
import useQuestionStore from '../../store/client/questionStore';
import useProfileStore from '../../store/client/profileStore';
import useBookmarkStore from '../../store/client/bookmarkStore';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
 
// QuestionSection Component 

const QuestionSection = () => { 
    // Store Hooks 
    const {
        selectedSubject,
        currentIndex,
        setCurrentIndex,
        questions,
        fetchQuestions,
        submitAnswer,
        getTotalQuestions,
    } = useQuestionStore();

    const { stats, fetchStats } = useProfileStore();
    const { addBookmark, fetchBookmarks, isBookmarked } = useBookmarkStore();
 
    // Local State 
    const [selectedOption, setSelectedOption] = useState(null);
 
    // Data Fetching 
    useEffect(() => {
        fetchQuestions();
        fetchStats();
        fetchBookmarks();
    }, []);

    // Reset selection when question changes
    useEffect(() => {
        setSelectedOption(null);
    }, [currentIndex, selectedSubject]); 

    // Derived State 
    const currentQuestions = questions[selectedSubject.toLowerCase()] || [];
    const currentQuestion = currentQuestions[currentIndex];
    const totalQuestions = getTotalQuestions(selectedSubject);

    // Check if current question is solved
    const solvedArray = stats?.[selectedSubject.toLowerCase()]?.solved || [];
    const isCurrentSolved = currentQuestion ? solvedArray.includes(currentQuestion.questionNo) : false;

    // Check if current question is bookmarked
    const isCurrentBookmarked = currentQuestion ? isBookmarked(selectedSubject, currentQuestion.questionNo) : false;
 
    // Event Handlers 
    const handleBookmark = async () => {
        if (!currentQuestion) return;
        try {
            await addBookmark(currentQuestion, selectedSubject);
        } catch (err) {
            // Error handled in store
        }
    };

    /**
     * Navigate to next question
     */
    const nextQuestion = () => {
        if (currentQuestions.length === 0) return;
        setCurrentIndex(currentIndex < currentQuestions.length - 1 ? currentIndex + 1 : 0);
    };

    /**
     * Navigate to previous question
     */
    const prevQuestion = () => {
        if (currentQuestions.length === 0) return;
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentQuestions.length - 1);
    };

    /**
     * Submit answer for current question
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitAnswer(selectedSubject, currentQuestion.questionNo, selectedOption);
        fetchStats(); // Refresh stats after submitting
    };

    /**
     * Get difficulty badge color class
     */
    const getDifficultyClass = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-400';
            case 'Medium':
                return 'bg-yellow-400';
            case 'Hard':
                return 'bg-red-400';
            default:
                return 'bg-gray-400';
        }
    }; 
    return (
        <div className="lg:col-span-2 space-y-6">
            {/* Question Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                {/* Question Header */}
                <div className="bg-linear-to-r from-indigo-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                    <span className="text-white font-medium">
                        Question {currentIndex + 1} of {totalQuestions}
                    </span>

                    <div className="flex items-center gap-3">
                        {/* Bookmark Button */}
                        <button
                            type="button"
                            onClick={handleBookmark}
                            disabled={isCurrentBookmarked}
                            className={`p-2 rounded-full transition-colors ${
                                isCurrentBookmarked
                                    ? 'bg-yellow-400 text-white cursor-not-allowed'
                                    : 'bg-white/20 text-white hover:bg-white/30'
                            }`}
                            title={isCurrentBookmarked ? 'Already bookmarked' : 'Bookmark this question'}
                        >
                            {isCurrentBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        </button>

                        {/* Solved Badge */}
                        {isCurrentSolved && (
                            <span className="px-3 py-1 rounded-full text-xs font-medium text-white bg-green-500">
                                ✓ Solved
                            </span>
                        )}

                        {/* Difficulty Badge */}
                        <span
                            className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getDifficultyClass(
                                currentQuestion?.difficulty
                            )}`}
                        >
                            {currentQuestion?.difficulty || 'Medium'}
                        </span>

                        {/* Subject Badge */}
                        <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white">
                            {selectedSubject}
                        </span>
                    </div>
                </div>

                {/* Question Form */}
                <form onSubmit={handleSubmit} className="p-6">
                    {/* Question Text */}
                    <p className="text-lg font-medium text-gray-800 dark:text-white mb-6">
                        {currentQuestion?.question || 'Loading question...'}
                    </p>

                    {/* Answer Options */}
                    <div className="space-y-3">
                        {currentQuestion?.options && currentQuestion.options.length > 0 ? (
                            currentQuestion.options.map((opt, idx) => (
                                <button
                                    type="button"
                                    key={idx}
                                    onClick={() => setSelectedOption(opt)}
                                    className={`w-full text-left p-4 rounded-lg border-2 
                                        ${selectedOption === opt
                                            ? 'border-indigo-500 bg-indigo-50 dark:bg-gray-700'
                                            : 'border-gray-200 dark:border-gray-600'
                                        }
                                        dark:text-white hover:border-indigo-300 transition-colors`}
                                >
                                    {opt}
                                </button>
                            ))
                        ) : (
                            // Loading placeholders
                            <>
                                {[1, 2, 3, 4].map((num) => (
                                    <button
                                        key={num}
                                        className="w-full text-left p-4 rounded-lg border-2 border-gray-200 dark:border-gray-600 dark:text-white"
                                    >
                                        Option {num} - Loading...
                                    </button>
                                ))}
                            </>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            disabled={!selectedOption}
                            className="w-full py-3 bg-indigo-600 text-white rounded-lg 
                                       disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
                        >
                            Submit Answer
                        </button>
                    </div>
                </form>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
                <button
                    onClick={prevQuestion}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                    Previous
                </button>
                <button
                    onClick={nextQuestion}
                    className="px-6 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                >
                    Next
                </button>
            </div>

            {/* Career Opportunities Section */}
            <Carrier />
        </div>
    );
};

export default QuestionSection;