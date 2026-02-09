
import React from 'react';

const OurStorySection = ({ techStack }) => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                        Our Story
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-6">
                        Building the Future of <br />Web Development Education
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                        StackSteps was born from a simple idea: learning to code should be fun,
                        interactive, and accessible to everyone. We noticed that many aspiring
                        developers struggled with traditional learning methods that lacked engagement
                        and practical application.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                        That's why we created a platform that combines interactive quizzes, progress
                        tracking, and gamification to make learning the MERN stack an enjoyable
                        journey rather than a tedious task.
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="flex flex-wrap gap-3">
                        {techStack.map((tech, idx) => (
                            <span
                                key={idx}
                                className={`px-4 py-2 rounded-full text-sm font-medium ${tech.color}`}
                            >
                                {tech.icon} {tech.name}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Image */}
                <div className="relative">
                    <div className="absolute -inset-4 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 blur-xl" />
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                        alt="Team collaboration"
                        className="relative rounded-2xl shadow-lg w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default OurStorySection;