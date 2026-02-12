import React from 'react';

const OverviewStatsCards = ({ loading, totalQuestions, subjectCount, averagePerSubject }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-100 text-sm">Total Questions</p>
          <p className="text-3xl font-bold mt-1">{loading ? '...' : totalQuestions}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-linear-to-br from-green-500 to-emerald-600 rounded-xl p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-100 text-sm">Subjects</p>
          <p className="text-3xl font-bold mt-1">{subjectCount}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      </div>
    </div>

    <div className="bg-linear-to-br from-orange-500 to-red-500 rounded-xl p-5 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-orange-100 text-sm">Avg per Subject</p>
          <p className="text-3xl font-bold mt-1">{loading ? '...' : averagePerSubject}</p>
        </div>
        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

export default OverviewStatsCards;
