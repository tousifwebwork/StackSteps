 

import React from 'react';
 
// Color Tone Mapping 
const TONE_COLORS = {
    gray: 'text-gray-700 dark:text-gray-300',
    green: 'text-green-600 dark:text-green-400',
    red: 'text-red-600 dark:text-red-400',
    blue: 'text-blue-600 dark:text-blue-400',
};

 // StatCard Component
 
const StatCard = ({ label, value, tone = 'gray', sub }) => {
    const toneColor = TONE_COLORS[tone] || TONE_COLORS.gray;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <p className="text-2xl text-gray-500 dark:text-gray-400">{label}</p>
            <div className="flex items-baseline justify-between mt-2">
                <h3 className={`text-2xl font-semibold ${toneColor}`}>{value}</h3>
                {sub && <span className="text-xs text-gray-400 dark:text-gray-500">{sub}</span>}
            </div>
        </div>
    );
};

export default StatCard;
