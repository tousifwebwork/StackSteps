
import React from 'react';
import useBookmarkStore from '../../store/client/bookmarkStore';

// Subjects Configuration

const SUBJECTS = [
    { key: 'all', label: 'All Bookmarks' },
    { key: 'javascript', label: 'JavaScript' },
    { key: 'react', label: 'React' },
    { key: 'nodejs', label: 'NodeJS' },
    { key: 'mongodb', label: 'MongoDB' },
    { key: 'gitgithub', label: 'Git-Github' },
];

const LeftCol = () => {
    const { selectedSubject, setSelectedSubject, bookmarks } = useBookmarkStore();

    
    const getCount = (subject) => {
        if (subject === 'all') return bookmarks.length;
        return bookmarks.filter((b) => b.subject === subject).length;
    };

    
    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md w-50">
            <p className="flex justify-center text-gray-800 dark:text-white font-medium mb-4">
                Select Subject
            </p>

            <div className="flex flex-col gap-y-3">
                {SUBJECTS.map((subject) => (
                    <div
                        key={subject.key}
                        onClick={() => setSelectedSubject(subject.key)}
                        className={`px-3 py-2 rounded-md border-2 cursor-pointer transition-colors flex justify-between items-center
              ${selectedSubject === subject.key
                                ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                                : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-indigo-300'
                            }`}
                    >
                        <span>{subject.label}</span>
                        <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {getCount(subject.key)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeftCol;