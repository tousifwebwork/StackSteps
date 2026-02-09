 
import React, { useState } from 'react';
 
// Features Data 

const FEATURES_DATA = [
    {
        id: 1,
        title: 'Interactive Quizzes',
        description: 'Test your MERN & Git/GitHub knowledge with fun and interactive quizzes.',
        icon: '❓',
    },
    {
        id: 2,
        title: 'Progress Tracking',
        description: 'Track your progress across JavaScript, React, Node.js, MongoDB, and Git/GitHub.',
        icon: '📈',
    },
    {
        id: 3,
        title: 'Achievement Badges',
        description: 'Earn badges as you complete challenges and level up your skills.',
        icon: '🏆',
    },
    {
        id: 4,
        title: 'Code Challenges',
        description: 'Solve coding challenges to strengthen your MERN stack skills in real scenarios.',
        icon: '💻',
    },
    {
        id: 5,
        title: 'Gamified Learning',
        description: 'Learn MERN stack in a game-like environment with points, levels, and rewards.',
        icon: '🎮',
    },
    {
        id: 6,
        title: 'Peer Leaderboard',
        description: 'Compete with peers and see how your skills rank globally.',
        icon: '🌍',
    },
    {
        id: 7,
        title: 'Project-Based Learning',
        description: 'Build real projects to apply what you learn and showcase your portfolio.',
        icon: '📂',
    },
    {
        id: 8,
        title: 'Git/GitHub Integration',
        description: 'Learn version control with hands-on Git and GitHub exercises.',
        icon: '🛠️',
    },
    {
        id: 9,
        title: 'Instant Feedback',
        description: 'Get immediate feedback on quizzes and challenges to learn efficiently.',
        icon: '⚡',
    },
    {
        id: 10,
        title: 'Adaptive Difficulty',
        description: 'Challenges adjust to your skill level to keep learning engaging and effective.',
        icon: '🎯',
    },
    {
        id: 11,
        title: 'Dark Mode Support',
        description: 'Enjoy a comfortable learning experience with full dark mode support.',
        icon: '🌙',
    },
    {
        id: 12,
        title: 'Resource Library',
        description: 'Access curated resources, tutorials, and cheat sheets for MERN stack.',
        icon: '📚',
    },
];
 
// FeatureCard Sub-Component 
const FeatureCard = ({ title, description, icon }) => {
    return (
        <div className="group bg-linear-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 hover:-translate-y-1">
            <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{description}</p>
        </div>
    );
};
 
// Features Component 
const Features = () => {
    const [isOpen, setIsOpen] = useState(false);
 
    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transition-colors"
            >
                Features
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white w-200 dark:bg-gray-900 rounded-2xl max-w-7xl shadow-2xl max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center px-8 py-6 border-b-2 border-purple-500/20 dark:border-purple-400/20">
                            <div>
                                <h2 className="text-3xl font-bold bg-linear-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                                    Our Features
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 mt-1">
                                    Discover what makes us special
                                </p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-5 py-2.5 bg-purple-500 hover:bg-purple-600 text-white rounded-lg shadow-md transition-all hover:shadow-lg hover:scale-105"
                            >
                                Close
                            </button>
                        </div>

                        {/* Features Grid */}
                        <div className="overflow-y-auto p-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {FEATURES_DATA.map((feature) => (
                                    <FeatureCard
                                        key={feature.id}
                                        title={feature.title}
                                        description={feature.description}
                                        icon={feature.icon}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Features;