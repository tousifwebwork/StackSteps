 
import React from 'react';
import { NavLink } from 'react-router-dom';
 
// NotFoundPage Component 
const NotFoundPage = () => {
    return (
        <div className="flex flex-col items-center justify-center text-sm max-md:px-4 min-h-screen bg-white dark:bg-gray-900">
            {/* Error Code */}
            <h1 className="text-8xl md:text-9xl font-bold text-indigo-500">404</h1>

            {/* Divider */}
            <div className="h-1 w-16 rounded bg-indigo-500 my-5 md:my-7"></div>

            {/* Error Message */}
            <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Page Not Found
            </p>
            <p className="text-sm md:text-base mt-4 text-gray-500 dark:text-gray-400 max-w-md text-center">
                The page you are looking for might have been removed, had its name changed, or
                is temporarily unavailable.
            </p>

            {/* Return Home Button */}
            <div className="flex items-center gap-4 mt-6">
                <NavLink
                    to="/"
                    className="bg-gray-800 dark:bg-indigo-600 hover:bg-black dark:hover:bg-indigo-700 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all"
                >
                    Return Home
                </NavLink>
            </div>
        </div>
    );
};

export default NotFoundPage;