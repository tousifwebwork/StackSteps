 

import React, { useState } from 'react';
import Nav from '../../Nav';
import Footer from '../../Footer';
import Carrier from './Carrier';
import Header from './Header';
import QuestionSection from './QuestionSection';
import Instructions from './Instructions';
 
// Sample Question Data (for reference) 

const SAMPLE_QUESTIONS = [
    { id: 1, question: 'What is closure in JavaScript?', difficulty: 'Medium', topic: 'JavaScript', timeLimit: 60 },
    { id: 2, question: 'Difference between props & state?', difficulty: 'Easy', topic: 'React', timeLimit: 45 },
    { id: 3, question: 'What is REST API?', difficulty: 'Easy', topic: 'Backend', timeLimit: 45 },
    { id: 4, question: 'MongoDB vs SQL?', difficulty: 'Medium', topic: 'Database', timeLimit: 60 },
    { id: 5, question: 'Explain event bubbling.', difficulty: 'Hard', topic: 'JavaScript', timeLimit: 90 },
];

const SAMPLE_OPTIONS = [
    ['Function inside another function that has access to outer scope', 'Object type', 'Variable type', 'Loop type'],
    ['Props are immutable, State is mutable', 'State is immutable', 'Both are same', 'None of these'],
    ['Representational State Transfer', 'A type of database', 'JavaScript library', 'None of these'],
    ['MongoDB is NoSQL, SQL is relational', 'Both are same', 'MongoDB is relational', 'All of these'],
    ['Event propagates from child to parent', 'Event stops at target', 'Only parent fires', 'None of these'],
]; 
// Instructions Configuration 
const INSTRUCTIONS = [
    { icon: '📝', text: 'Read each question carefully before answering' },
    { icon: '⏱️', text: 'Each question has a time limit - manage your time wisely' },
    { icon: '🔄', text: 'You can navigate between questions using the buttons' },
    { icon: '✅', text: 'Click on an option to select your answer' },
    { icon: '📊', text: 'Your progress is saved automatically' },
    { icon: '🎯', text: 'Try to complete all questions for best results' },
];
 
// Question Component 

const Question = () => {
     // State 
    const [selectedOption, setSelectedOption] = useState(null);
 
    // Handlers (unused - handled in QuestionSection) 
    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'bg-green-100 text-green-700';
            case 'Medium':
                return 'bg-yellow-100 text-yellow-700';
            case 'Hard':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };
 
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Nav />

            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Subject Selection Header */}
                <Header />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Question Card and Navigation */}
                    <QuestionSection />

                    {/* Instructions and Stats Sidebar */}
                    <Instructions instructions={INSTRUCTIONS} />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Question;
