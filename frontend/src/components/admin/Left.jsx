import React, { useEffect, useState } from 'react';
import useQuestionStore from '../store/client/questionStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import { SubjectHeader, SubjectCard, QuestionsModal } from './leftComponents';

const ADMIN_URL = `${import.meta.env.VITE_API_URL}/admin`;

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

const SUBJECTS = [
  { key: 'javascript', label: 'JavaScript', color: 'from-yellow-400 to-yellow-600', bg: 'bg-yellow-50 dark:bg-yellow-900/20' },
  { key: 'react', label: 'React', color: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-50 dark:bg-cyan-900/20' },
  { key: 'nodejs', label: 'Node.js', color: 'from-green-500 to-green-700', bg: 'bg-green-50 dark:bg-green-900/20' },
  { key: 'mongodb', label: 'MongoDB', color: 'from-emerald-500 to-teal-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
  { key: 'gitgithub', label: 'Git & GitHub', color: 'from-orange-500 to-red-500', bg: 'bg-orange-50 dark:bg-orange-900/20' },
];

const Left = () => {
  const { questions, fetchQuestions, loading } = useQuestionStore();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const openModal = (subjectKey) => {
    setSelectedSubject(subjectKey);
  };

  const closeModal = () => {
    setSelectedSubject(null);
  };

  const handleDelete = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) return;
    
    setDeleting(questionId);
    try {
      await axios.delete(`${ADMIN_URL}/delete/${questionId}`, getAuthHeaders());
      toast.success('Question deleted successfully!');
      fetchQuestions();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete question');
    } finally {
      setDeleting(null);
    }
  };

  const getQuestionCount = (key) => questions[key]?.length || 0;
  const selectedMeta = SUBJECTS.find((subject) => subject.key === selectedSubject);
  const selectedQuestions = selectedSubject ? questions[selectedSubject] || [] : [];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit">
      <SubjectHeader />

      <div className="space-y-3">
        {SUBJECTS.map((subject) => (
          <SubjectCard
            key={subject.key}
            subject={subject}
            count={getQuestionCount(subject.key)}
            loading={loading}
            onSelect={openModal}
          />
        ))}
      </div>

      {selectedSubject && (
        <QuestionsModal
          subjectMeta={selectedMeta}
          questionCount={getQuestionCount(selectedSubject)}
          questions={selectedQuestions}
          onClose={closeModal}
          onDelete={handleDelete}
          deleting={deleting}
        />
      )}
    </div>
  );
};

export default Left;