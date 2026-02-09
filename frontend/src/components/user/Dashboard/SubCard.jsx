 
import React from 'react';

 
// SubCard Component 
const SubCard = ({ Subject, Solved, Remaining, icon }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-1 hover:scale-105 transition-transform cursor-pointer">
            {/* Subject Header */}
            <div className="flex items-center justify-center">
                <span className="mr-5 text-2xl dark:text-gray-300">{icon}</span>
                <h3 className="text-bold text-2xl text-gray-600 dark:text-gray-300 underline">
                    {Subject}
                </h3>
            </div>
            {/* Stats */}
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-2">
                Solved: <span className="text-green-600 dark:text-green-400">{Solved}</span>
            </p>
            <p className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-2">
                Remaining: <span className="text-red-600 dark:text-red-400">{Remaining}</span>
            </p>
        </div>
    );
};

export default SubCard;