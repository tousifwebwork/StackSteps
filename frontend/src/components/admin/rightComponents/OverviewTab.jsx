import React from 'react';
import OverviewStatsCards from './OverviewStatsCards';
import SubjectBreakdownTable from './SubjectBreakdownTable';

const OverviewTab = ({ loading, totalQuestions, subjectCount, averagePerSubject, subjectStats }) => (
  <div>
    <OverviewStatsCards
      loading={loading}
      totalQuestions={totalQuestions}
      subjectCount={subjectCount}
      averagePerSubject={averagePerSubject}
    />
    <SubjectBreakdownTable subjectStats={subjectStats} />
  </div>
);

export default OverviewTab;
