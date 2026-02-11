
import React from 'react';
import useToggleStore from './store/toggleStore';



const DarkLightMode = () => {
    const { toggle } = useToggleStore();

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
            

            {/* Theme Toggle Buttons */}
            <div className="flex gap-3">
                {/* Dark Mode Button */}
                <button
                    onClick={toggle}
                    className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl transition
                        bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-2 dark:border-white"
                >
                    <svg
                        className="w-6 h-6 text-gray-600 dark:text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                    </svg>
                    <span className="text-sm font-medium">Dark</span>
                </button>

                {/* Light Mode Button */}
                <button
                    onClick={toggle}
                    className="flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition
                        bg-indigo-50 border-indigo-500 dark:bg-gray-700 dark:border-gray-900 dark:text-gray-200"
                >
                    <svg
                        className="w-6 h-6 text-indigo-600 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                    </svg>
                    <span className="text-sm font-medium">Light</span>
                </button>
            </div>
        </div>
    );
};

export default DarkLightMode;
