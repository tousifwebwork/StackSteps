 

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// API endpoint
const FEEDBACK_API = `${import.meta.env.VITE_API_URL}/api/feedback`;
 
// FeedbackModal Component 

const FeedbackModal = () => { 
    // State 
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
 
    // Form Handlers 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(FEEDBACK_API, { name, email, message });
            toast.success('Feedback submitted successfully');
            setIsOpen(false);
            // Reset form
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            toast.error('Something went wrong');
        }
    }; 
    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md"
            >
                Give Feedback
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-11/12 max-w-md shadow-lg relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-bold"
                        >
                            ✕
                        </button>

                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            Feedback
                        </h1>

                        {/* Feedback Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />

                            <textarea
                                placeholder="Your Feedback"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="4"
                                required
                            />

                            <button
                                type="submit"
                                className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                            >
                                Submit Feedback
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedbackModal;
