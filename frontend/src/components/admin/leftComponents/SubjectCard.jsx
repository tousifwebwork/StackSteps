import React from 'react';

const SubjectCard = ({ subject, count, loading, onSelect }) => (
  <button
    onClick={() => onSelect(subject.key)}
    className={`w-full ${subject.bg} border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left group`}
    type="button"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg bg-linear-to-br ${subject.color} flex items-center justify-center shadow-md`}>
          <span className="text-white font-bold text-sm">{subject.label[0]}</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
            {subject.label}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {loading ? 'Loading...' : `${count} questions`}
          </p>
        </div>
      </div>
      <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  </button>
);

export default SubjectCard;
