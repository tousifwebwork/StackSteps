

import React from 'react';

const VALUES = [
    {
        icon: '🎓',
        title: 'Quality Education',
        description: 'Curated content from industry experts',
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/50',
    },
    {
        icon: '♿',
        title: 'Accessibility',
        description: 'Learning for everyone, everywhere',
        bgColor: 'bg-green-100 dark:bg-green-900/50',
    },
    {
        icon: '🚀',
        title: 'Innovation',
        description: 'Constantly improving the experience',
        bgColor: 'bg-purple-100 dark:bg-purple-900/50',
    },
    {
        icon: '🤝',
        title: 'Community',
        description: 'Growing together as developers',
        bgColor: 'bg-orange-100 dark:bg-orange-900/50',
    },
];

const ValuesSection = () => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            {/* Section Header */}
            <div className="text-center mb-12">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                    Our Values
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                    What Drives Us
                </h2>
            </div>

            {/* Values Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {VALUES.map((value, idx) => (
                    <div key={idx} className="text-center p-6">
                        <div
                            className={`w-16 h-16 ${value.bgColor} rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4`}
                        >
                            {value.icon}
                        </div>
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                            {value.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">{value.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ValuesSection;