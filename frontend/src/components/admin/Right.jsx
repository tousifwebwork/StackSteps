import React, { useState, useEffect } from 'react';
import useQuestionStore from '../store/client/questionStore';
import axios from 'axios';
import toast from 'react-hot-toast';
import { AdminTabs, OverviewTab, AddQuestionForm } from './rightComponents';

const ADMIN_URL = `${import.meta.env.VITE_API_URL}/admin`;
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

  const totalQuestions = Object.values(questions).reduce((sum, arr) => sum + arr.length, 0);
  const subjectStats = SUBJECTS.map((s) => ({
    ...s,
    count: questions[s.key]?.length || 0,
    easy: questions[s.key]?.filter((q) => q.difficulty?.toLowerCase() === 'easy').length || 0,
    medium: questions[s.key]?.filter((q) => q.difficulty?.toLowerCase() === 'medium').length || 0,
    hard: questions[s.key]?.filter((q) => q.difficulty?.toLowerCase() === 'hard').length || 0
  }));
  const averagePerSubject = SUBJECTS.length ? Math.round(totalQuestions / SUBJECTS.length) : 0;

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
      <AdminTabs activeTab={activeTab} onChange={setActiveTab} />

      {activeTab === 'overview' && (
        <OverviewTab
          loading={loading}
          totalQuestions={totalQuestions}
          subjectCount={SUBJECTS.length}
          averagePerSubject={averagePerSubject}
          subjectStats={subjectStats}
        />
      )}

      {activeTab === 'add' && (
        <AddQuestionForm
          formData={formData}
          subjects={SUBJECTS}
          difficultyOptions={DIFFICULTY_OPTIONS}
          submitting={submitting}
          onInputChange={handleInputChange}
          onOptionChange={handleOptionChange}
          onCorrectAnswerChange={(value) => setFormData((prev) => ({ ...prev, correctAnswer: value }))}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Right;