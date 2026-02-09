
import React from 'react';

const FeaturesSection = ({ features }) => {
    return (
        <section className="bg-white dark:bg-gray-800 py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                        Features
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                        Everything You Need to Succeed
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Our platform is packed with features designed to accelerate your learning and
                        keep you motivated.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-linear-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 border border-gray-100 dark:border-gray-600 hover:border-indigo-200 dark:hover:border-indigo-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        >
                            <div className="text-4xl mb-4">{feature.icon}</div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;