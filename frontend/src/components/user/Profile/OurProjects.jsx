 
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

 // Projects Data 

const PROJECTS = [
    { id: 1, title: 'Project 1', content: 'Content for project 1' },
    { id: 2, title: 'Project 2', content: 'Content for project 2' },
    { id: 3, title: 'Project 3', content: 'Content for project 3' },
    { id: 4, title: 'Project 4', content: 'Content for project 4' },
];
 
// OurProjects Component 

const OurProjects = () => {
    const [isOpen, setIsOpen] = useState(false);
 
    // Render 
    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors"
            >
                Our Projects
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-177 bg-white dark:bg-gray-900 rounded-xl max-w-6xl shadow-2xl max-h-[90vh] flex flex-col">
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Our Projects
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition-colors"
                            >
                                Close
                            </button>
                        </div>

                        {/* Horizontal Scroll Container */}
                        <div className="overflow-x-auto overflow-y-hidden p-6">
                            <div className="flex gap-6 pb-4">
                                {PROJECTS.map((project) => (
                                    <ProjectCard
                                        key={project.id}
                                        title={project.title}
                                        content={project.content}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Scroll Hint */}
                        <div className="px-6 pb-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            ← Scroll to see more →
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default OurProjects;