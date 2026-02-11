import React, { useState, useEffect } from 'react';
import useQuestionStore from '../store/client/questionStore';
import axios from 'axios';
import toast from 'react-hot-toast';

const ADMIN_URL = 'http://localhost:3000/admin';
const SUBJECTS = [
  { key: 'javascript', label: 'JavaScript' },
  { key: 'react', label: 'React' },
  { key: 'nodejs', label: 'Node.js' },
  { key: 'mongodb', label: 'MongoDB' },
  { key: 'gitgithub', label: 'Git & GitHub' },
];

const DIFFICULTY_OPTIONS = ['easy', 'medium', 'hard'];

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

const Right = () => {
  const { questions, fetchQuestions, loading } = useQuestionStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    tech: 'javascript',
    questionNo: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    difficulty: 'medium'
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  // Calculate stats
  const getTotalQuestions = () => Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);
  const getSubjectStats = () => SUBJECTS.map(s => ({
    ...s,
    count: questions[s.key]?.length || 0,
    easy: questions[s.key]?.filter(q => q.difficulty === 'easy').length || 0,
    medium: questions[s.key]?.filter(q => q.difficulty === 'medium').length || 0,
    hard: questions[s.key]?.filter(q => q.difficulty === 'hard').length || 0,
  }));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData.options];
    const oldValue = newOptions[index];
    newOptions[index] = value;
    
    // Update correctAnswer if the edited option was the selected answer
    setFormData(prev => ({
      ...prev,
      options: newOptions,
      correctAnswer: prev.correctAnswer === oldValue ? value : prev.correctAnswer
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.question.trim()) {
      toast.error('Please enter a question');
      return;
    }
    if (formData.options.some(opt => !opt.trim())) {
      toast.error('Please fill all options');
      return;
    }
    if (!formData.correctAnswer) {
      toast.error('Please select the correct answer');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post(`${ADMIN_URL}/add`, {
        ...formData,
        questionNo: parseInt(formData.questionNo) || (questions[formData.tech]?.length || 0) + 1
      }, getAuthHeaders());
      
      toast.success('Question added successfully!');
      fetchQuestions();
      
      // Reset form
      setFormData({
        tech: 'javascript',
        questionNo: '',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        difficulty: 'medium'
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add question');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'overview'
              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Overview
          </span>
        </button>
        <button
          onClick={() => setActiveTab('add')}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            activeTab === 'add'
              ? 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Question
          </span>
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-linear-to-br from-purple-500 to-indigo-600 rounded-xl p-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Total Questions</p>
                  <p className="text-3xl font-bold mt-1">{loading ? '...' : getTotalQuestions()}</p>
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
                  <p className="text-3xl font-bold mt-1">{SUBJECTS.length}</p>
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
                  <p className="text-3xl font-bold mt-1">
                    {loading ? '...' : Math.round(getTotalQuestions() / SUBJECTS.length)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Subject Breakdown Table */}
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
                  {getSubjectStats().map((subject) => (
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
        </div>
      )}

      {/* Add Question Tab */}
      {activeTab === 'add' && (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Subject Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                name="tech"
                value={formData.tech}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                {SUBJECTS.map(s => (
                  <option key={s.key} value={s.key}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Difficulty Select */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
              >
                {DIFFICULTY_OPTIONS.map(d => (
                  <option key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Question
            </label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleInputChange}
              rows={3}
              placeholder="Enter your question here..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition resize-none"
            />
          </div>

          {/* Options */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Options (select the correct answer)
            </label>
            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={option}
                    checked={formData.correctAnswer === option && option !== ''}
                    onChange={() => setFormData(prev => ({ ...prev, correctAnswer: option }))}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                    disabled={!option}
                  />
                  <div className="flex-1 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-3 bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg
                       hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-300 
                       disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
                       flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Question
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Right;