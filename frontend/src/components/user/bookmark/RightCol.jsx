
import React, { useState } from 'react';
import useBookmarkStore from '../../store/client/bookmarkStore';
import { FaTrash, FaTimes } from 'react-icons/fa';

// Subject Color Mapping

const SUBJECT_COLORS = {
    javascript: 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20',
    react: 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20',
    nodejs: 'border-green-400 bg-green-50 dark:bg-green-900/20',
    mongodb: 'border-green-600 bg-green-50 dark:bg-green-900/20',
    gitgithub: 'border-orange-400 bg-orange-50 dark:bg-orange-900/20',
};

const RightCol = () => {
    const { getFilteredBookmarks, clearBookmarks, removeBookmark, selectedSubject } = useBookmarkStore();
    const [expandedBookmark, setExpandedBookmark] = useState(null);

    const filteredBookmarks = getFilteredBookmarks();


    // Event Handlers
    const handleClearAll = () => {
        if (window.confirm(`Clear ${selectedSubject === 'all' ? 'all' : selectedSubject} bookmarks?`)) {
            clearBookmarks(selectedSubject);
        }
    };

    const handleRemoveBookmark = (e, bookmarkId) => {
        e.stopPropagation();
        removeBookmark(bookmarkId);
    };
    const handleRemoveAndClose = () => {
        removeBookmark(expandedBookmark._id);
        setExpandedBookmark(null);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md w-full ml-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <p className="text-gray-800 dark:text-white font-medium">
                    Bookmarks {filteredBookmarks.length > 0 && `(${filteredBookmarks.length})`}
                </p>
                <button
                    onClick={handleClearAll}
                    disabled={filteredBookmarks.length === 0}
                    className="text-red-500 hover:text-red-600 disabled:text-gray-400 disabled:cursor-not-allowed text-sm"
                >
                    Clear All
                </button>
            </div>

            {/* Empty State */}
            {filteredBookmarks.length === 0 ? (
                <div className="text-center text-gray-500 dark:text-gray-400 py-10">
                    <p>No bookmarks yet</p>
                    <p className="text-sm mt-2">Bookmark questions from the practice page</p>
                </div>
            ) : (
                /* Bookmarks Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-150 pb-4">
                    {filteredBookmarks.map((bookmark) => (
                        <div
                            key={bookmark._id}
                            onClick={() => setExpandedBookmark(bookmark)}
                            className={`border-2 h-40 rounded-md min-w-52 max-w-66 p-4 cursor-pointer shrink-0 transition-all hover:shadow-md ${SUBJECT_COLORS[bookmark.subject] || 'border-gray-200'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400">
                                    {bookmark.subject}
                                </span>
                                <button
                                    onClick={(e) => handleRemoveBookmark(e, bookmark._id)}
                                    className="text-red-400 hover:text-red-600 p-1"
                                >
                                    <FaTrash size={12} />
                                </button>
                            </div>
                            <p className="text-sm text-gray-800 dark:text-gray-200 line-clamp-3">
                                {bookmark.questionText}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Expanded Bookmark Modal */}
            {expandedBookmark && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-xl max-w-lg w-full p-6 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setExpandedBookmark(null)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400"
                        >
                            <FaTimes size={20} />
                        </button>

                        {/* Subject Label */}
                        <span className="text-xs uppercase font-medium text-indigo-600 dark:text-indigo-400">
                            {expandedBookmark.subject}
                        </span>

                        {/* Question Text */}
                        <h3 className="text-lg font-medium text-gray-800 dark:text-white mt-2 mb-4">
                            {expandedBookmark.questionText}
                        </h3>

                        {/* Answer Options */}
                        <div className="space-y-2 mb-4">
                            {expandedBookmark.options.map((opt, idx) => (
                                <div
                                    key={idx}
                                    className={`p-3 rounded-lg border-2 ${
                                        opt === expandedBookmark.correctAnswer
                                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                                            : 'border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300'
                                    }`}
                                >
                                    {opt}
                                    {opt === expandedBookmark.correctAnswer && (
                                        <span className="ml-2 text-xs font-medium">✓ Correct</span>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Remove Button */}
                        <button
                            onClick={handleRemoveAndClose}
                            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Remove Bookmark
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RightCol;