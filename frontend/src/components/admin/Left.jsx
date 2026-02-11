import React, { useEffect, useState } from 'react';
import useQuestionStore from '../store/client/questionStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const ADMIN_URL = 'http://localhost:3000/admin';

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

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-fit">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          Subjects
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Click on a subject to view questions
        </p>
      </div>

      {/* Subject Cards */}
      <div className="space-y-3">
        {SUBJECTS.map((subject) => (
          <button
            key={subject.key}
            onClick={() => openModal(subject.key)}
            className={`w-full ${subject.bg} border border-gray-200 dark:border-gray-700 rounded-xl p-4 
                       hover:shadow-md hover:scale-[1.02] transition-all duration-200 text-left group`}
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
                    {loading ? 'Loading...' : `${getQuestionCount(subject.key)} questions`}
                  </p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedSubject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className={`bg-linear-to-r ${SUBJECTS.find(s => s.key === selectedSubject)?.color} p-6`}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {SUBJECTS.find(s => s.key === selectedSubject)?.label} Questions
                  </h3>
                  <p className="text-white/80 text-sm mt-1">
                    {getQuestionCount(selectedSubject)} questions available
                  </p>
                </div>
                <button 
                  onClick={closeModal}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body - Questions List */}
            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {questions[selectedSubject]?.length === 0 ? (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-gray-500 dark:text-gray-400">No questions found for this subject</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions[selectedSubject]?.map((q, index) => (
                    <div 
                      key={q._id || index}
                      className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition"
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-sm">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 dark:text-white mb-3">
                            {q.question}
                          </p>
                          
                          {/* Options */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                            {q.options?.map((option, optIdx) => (
                              <div 
                                key={optIdx}
                                className={`px-3 py-2 rounded-lg text-sm ${
                                  option === q.correctAnswer 
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-300 dark:border-green-700'
                                    : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-500'
                                }`}
                              >
                                <span className="font-medium mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                                {option}
                              </div>
                            ))}
                          </div>

                          {/* Difficulty Badge & Delete Button */}
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              q.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                              q.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            }`}>
                              {q.difficulty || 'Medium'}
                            </span>
                            
                            <button
                              onClick={() => handleDelete(q._id)}
                              disabled={deleting === q._id}
                              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 hover:text-white hover:bg-red-600 border border-red-300 hover:border-red-600 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {deleting === q._id ? (
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              )}
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Left;