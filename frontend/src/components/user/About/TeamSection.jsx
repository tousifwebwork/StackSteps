
import React from 'react';

const TeamSection = ({ teamMembers }) => {
    return (
        <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
            {/* Section Header */}
            <div className="text-center mb-12">
                <span className="text-indigo-600 dark:text-indigo-400 font-semibold text-sm uppercase tracking-wider">
                    Our Team
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mt-2 mb-4">
                    Meet the Developers
                </h2>
                <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Passionate developers dedicated to creating the best learning experience for you.
                </p>
            </div>

            {/* Team Grid */}
            <div className="grid md:grid-cols-3 gap-8">
                {teamMembers.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                    >
                        {/* Profile Image */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-xl" />
                            <img
                                src={member.image}
                                alt={member.name}
                                className="relative w-32 h-32 mx-auto rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                            />
                        </div>

                        {/* Member Info */}
                        <div className="text-center">
                            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                {member.name}
                            </h3>
                            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-medium mb-3">
                                {member.role}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                {member.bio}
                            </p>

                            {/* Skills */}
                            <div className="flex flex-wrap justify-center gap-2 mb-4">
                                {member.skills.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            {/* Social Links */}
                            <div className="flex justify-center gap-3">
                                <a
                                    href={member.social.github}
                                    className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                                <a
                                    href={member.social.linkedin}
                                    className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                                <a
                                    href={member.social.twitter}
                                    className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TeamSection;