import React from 'react';

const SubjectBreakdownTable = ({ subjectStats }) => (
  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Subject Breakdown
    </h3>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-600">
            <th className="pb-3 font-medium">Subject</th>
            <th className="pb-3 font-medium text-center">Total</th>
            <th className="pb-3 font-medium text-center">Easy</th>
            <th className="pb-3 font-medium text-center">Medium</th>
            <th className="pb-3 font-medium text-center">Hard</th>
          </tr>
        </thead>
        <tbody>
          {subjectStats.map((subject) => (
            <tr key={subject.key} className="border-b border-gray-100 dark:border-gray-600 last:border-0">
              <td className="py-3">
                <span className="font-medium text-gray-800 dark:text-white">{subject.label}</span>
              </td>
              <td className="py-3 text-center">
                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                  {subject.count}
                </span>
              </td>
              <td className="py-3 text-center">
                <span className="text-green-600 dark:text-green-400 font-medium">{subject.easy}</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-yellow-600 dark:text-yellow-400 font-medium">{subject.medium}</span>
              </td>
              <td className="py-3 text-center">
                <span className="text-red-600 dark:text-red-400 font-medium">{subject.hard}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default SubjectBreakdownTable;
