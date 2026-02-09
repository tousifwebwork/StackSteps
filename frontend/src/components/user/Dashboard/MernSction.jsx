 
import React from 'react';
 

const MERN_FEATURES = [
    'Scalable APIs and microservices with Node.js & Express',
    'Real-time features (websockets), performant UIs with React',
    'Unified JS reduces context switching and accelerates delivery',
];

const MERN_TECHNOLOGIES = ['MongoDB', 'Express', 'React', 'Node.js'];
 

const MernSction = () => {
    return (
        <div className="lg:col-span-3 mt-6">
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <figure className="md:w-1/3 w-full">
                        <img
                            src="../../public/image.png"
                            alt="Developers collaborating on a MERN stack project"
                            className="w-full h-64 md:h-full object-cover"
                            loading="lazy"
                        />
                    </figure>

                    {/* Content Section */}
                    <div className="p-6 md:p-8 md:w-2/3">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                            Industrial Use Cases of the MERN Stack
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            MERN is used to build fast, scalable, and real-time web applications—dashboards,
                            e-commerce platforms, social apps, LMS, and enterprise portals—leveraging full-stack
                            JavaScript for faster development and easier maintenance.
                        </p>

                        {/* Feature List */}
                        <ul className="mb-4 space-y-2">
                            {MERN_FEATURES.map((feature) => (
                                <li key={feature} className="flex items-start text-gray-700 dark:text-gray-300">
                                    <svg
                                        className="w-5 h-5 text-green-500 mr-2 shrink-0"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        {/* Technology Tags */}
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            {MERN_TECHNOLOGIES.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 dark:text-gray-300 rounded"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Learn More Button */}
                        <div className="flex items-center gap-3">
                            <a href="https://www.geeksforgeeks.org/mern/understand-mern-stack/">
                                <button
                                    className="btn btn-ghost btn-sm bg-gray-200 dark:bg-gray-700 dark:text-white"
                                    aria-label="Learn more about MERN"
                                >
                                    Learn More
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MernSction;