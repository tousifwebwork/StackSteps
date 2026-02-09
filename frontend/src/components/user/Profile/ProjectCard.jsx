 

import React from 'react';
 
// ProjectCard Component 

const ProjectCard = ({ title, content }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg shrink-0 w-80 border border-gray-200 dark:border-gray-700 transition-transform hover:scale-105">
            {/* Project Title */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{title}</h3>

            {/* Project Content */}
            <div className="w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center p-4 text-gray-600 dark:text-gray-300">
                {content}
            </div>
        </div>
    );
};

export default ProjectCard;