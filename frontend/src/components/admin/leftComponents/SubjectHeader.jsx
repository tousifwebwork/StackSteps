import React from 'react';

const SubjectHeader = () => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      Subjects
    </h2>
    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Click on a subject to view questions</p>
  </div>
);

export default SubjectHeader;
