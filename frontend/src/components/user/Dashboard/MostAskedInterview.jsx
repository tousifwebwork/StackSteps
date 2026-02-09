 
import React from 'react';
import { NavLink } from 'react-router-dom';
 

const POPULAR_QUESTIONS = [
    'What is closure in JavaScript?',
    'Difference between props & state',
    'What is REST API?',
    'MongoDB vs SQL',
]; 

const MostAskedInterview = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
                Most Asked in Interviews
            </h2>

            {/* Questions List */}
            <ul className="space-y-3 text-sm">
                {POPULAR_QUESTIONS.map((question) => (
                    <li
                        key={question}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded"
                    >
                        {/* Question Icon */}
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 flex items-center justify-center text-xs font-medium">
                            Q
                        </div>
                        {/* Question Text */}
                        <div className="flex-1 text-gray-700 dark:text-gray-300">{question}</div>
                    </li>
                ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-5 text-center">
                <NavLink to="/question">
                    <button className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                        Solve More
                    </button>
                </NavLink>
            </div>
        </div>
    );
};

export default MostAskedInterview;