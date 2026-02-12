import React from 'react';

const AdminTabs = ({ activeTab, onChange }) => (
  <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
    <button
      onClick={() => onChange('overview')}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        activeTab === 'overview'
          ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      type="button"
    >
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        Overview
      </span>
    </button>
    <button
      onClick={() => onChange('add')}
      className={`px-4 py-2 rounded-lg font-medium transition ${
        activeTab === 'add'
          ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
      }`}
      type="button"
    >
      <span className="flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Question
      </span>
    </button>
  </div>
);

export default AdminTabs;
