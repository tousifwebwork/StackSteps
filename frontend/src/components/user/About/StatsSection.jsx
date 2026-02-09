
import React from 'react';


const StatsSection = ({ stats }) => {
    return (
        <section className="relative -mt-10 max-w-5xl mx-auto px-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                        <div className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                            {stat.number}
                        </div>
                        <div className="text-gray-500 dark:text-gray-400 text-sm">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsSection;