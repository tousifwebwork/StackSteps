 
import React from 'react';
 
// Instructions Component  
const Instructions = ({ instructions }) => {
    return (
        <div className="space-y-6">
            {/* Instructions Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📋</span> Instructions
                </h3>
                <ul className="space-y-3">
                    {instructions.map((instruction, idx) => (
                        <li
                            key={idx}
                            className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400"
                        >
                            <span className="text-lg">{instruction.icon}</span>
                            <span>{instruction.text}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Quick Stats Panel */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">📊</span> Your Stats
                </h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Questions Attempted</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Current Topic</span>
                    </div>
                </div>
            </div>

            {/* Bookmark Question Button */}
            <button className="w-full flex items-center justify-center gap-2 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all duration-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                </svg>
                Bookmark This Question
            </button>

            {/* Pro Tips Section */}
            <div className="bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl shadow-sm p-6 text-white">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span className="text-2xl">💡</span> Pro Tip
                </h3>
                <p className="text-sm text-indigo-100 leading-relaxed">
                    Take your time to understand each question. If you're unsure, eliminate
                    obviously wrong answers first to increase your chances of selecting the
                    correct option.
                </p>
            </div>
        </div>
    );
};

export default Instructions;