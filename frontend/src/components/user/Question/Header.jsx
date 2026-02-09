 

import { useEffect } from 'react';
import useQuestionStore from '../../store/client/questionStore';
import useProfileStore from '../../store/client/profileStore';

 // Subject Options 

const SUBJECTS = ['JavaScript', 'React', 'NodeJs', 'MongoDB', 'GitGithub'];

 // Progress Bar Colors 

const PROGRESS_COLORS = {
    javascript: 'bg-green-500',
    react: 'bg-pink-500',
    nodejs: 'bg-yellow-500',
    mongodb: 'bg-purple-500',
    gitgithub: 'bg-cyan-500',
};
 
// Header Component 

const Header = () => {
    const { selectedSubject, setSelectedSubject } = useQuestionStore();
    const { fetchStats, stats } = useProfileStore();
 
    useEffect(() => {
        fetchStats();
    }, []);
 
    const courseProgress = {
        javascript: stats?.javascript?.correct || 0,
        react: stats?.react?.correct || 0,
        nodejs: stats?.nodejs?.correct || 0,
        mongodb: stats?.mongodb?.correct || 0,
        gitgithub: stats?.gitgithub?.correct || 0,
    };
 
    return (
        <div className="mb-8">
            {/* Header Bar with Title and Progress */}
            <div className="bg-gray-200 rounded-2xl p-6 flex items-center justify-between mb-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                    Practice Questions
                </h1>

                {/* Progress for Selected Subject */}
                <div className="space-y-4">
                    {Object.keys(courseProgress)
                        .filter((tech) => tech === selectedSubject.toLowerCase())
                        .map((tech) => (
                            <div key={tech} className="relative">
                                {/* Progress Label */}
                                <div className="w-30 relative flex gap-7 justify-between text-sm mb-2">
                                    <span className="absolute left-0 p-1 text-gray-500 dark:text-gray-400">
                                        {tech}
                                    </span>
                                    <span className="absolute right-0 p-1 text-indigo-600 dark:text-indigo-400 font-medium">
                                        {Math.round(courseProgress[tech])}%
                                    </span>
                                </div>
                                {/* Progress Bar */}
                                <div className="absolute top-7 left-0 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${PROGRESS_COLORS[tech] || 'bg-gray-500'} rounded-full`}
                                        style={{ width: `${courseProgress[tech]}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* Subject Selector Dropdown */}
            <div className="flex flex-wrap items-center gap-4">
                <label className="font-medium text-gray-700 dark:text-gray-300">
                    Select Subject:
                </label>

                <details className="dropdown">
                    <summary className="btn m-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                        {selectedSubject}
                    </summary>

                    <ul className="menu dropdown-content bg-white dark:bg-gray-800 rounded-box z-1 w-52 p-2 shadow-sm border border-gray-200 dark:border-gray-700">
                        {SUBJECTS.map((subject) => (
                            <li
                                key={subject}
                                onClick={(e) => {
                                    setSelectedSubject(subject);
                                    e.target.closest('details')?.removeAttribute('open');
                                }}
                            >
                                <a className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                    {subject}
                                </a>
                            </li>
                        ))}
                    </ul>
                </details>
            </div>
        </div>
    );
};

export default Header;
