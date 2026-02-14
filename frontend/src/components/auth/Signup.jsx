/**
 * Signup Page Component
 * Handles new user registration with validation
 */

import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthStore from '../store/authStore';
import { useNavigate } from 'react-router-dom';

// Hero background image
const HERO_IMAGE = '/authbackground.png'; 

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ============================================
// Signup Component
// ============================================

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuthStore();

    // ========================================
    // Password Visibility State
    // ========================================
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ========================================
    // Form State
    // ========================================
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // ========================================
    // Form Handlers
    // ========================================

    /**
     * Validate form and submit signup request
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate username length
        if (username.length < 5) {
            return toast.error('Username must be at least 5 characters');
        }

        // Validate email format
        if (!EMAIL_REGEX.test(email)) {
            return toast.error('Please enter a valid email address');
        }

        // Validate password length
        if (password.length < 5) {
            return toast.error('Password must be at least 5 characters long');
        }

        // Validate password match
        if (password !== confirmPassword) {
            return toast.error('Passwords do not match');
        }

        try {
            await signup(username, email, password, confirmPassword);
            toast.success('Signup successful!');
            navigate('/login');
        } catch (err) {
            toast.error(err?.message || 'Signup failed');
        }
    };

    // ========================================
    // Render
    // ========================================
    return (
        <div className="min-h-screen bg-linear-to-br from-[#3f3a50] via-[#2f2a3e] to-[#1f1a2e] flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-5xl rounded-[28px] bg-[#1c1829] text-white shadow-2xl border border-white/5 overflow-hidden grid grid-cols-1 lg:grid-cols-2">

                {/* Left Side - Hero Image */}
                <div className="relative h-full min-h-130">
                    <img
                        src={HERO_IMAGE}
                        alt="Desert landscape"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-b from-black/10 via-[#3b2d5a]/50 to-[#181125]/85" />
                </div>

                {/* Right Side - Signup Form */}
                <div className="flex flex-col gap-8 px-8 py-10 lg:px-12">
                    {/* Header Section */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-semibold">
                            Create an account
                        </h1>
                        <p className="text-sm text-white/70">
                            Already have an account?{' '}
                            <a href="/login" className="text-[#9e84ff] hover:text-white">
                                Log in
                            </a>
                        </p>
                    </div>

                    {/* Signup Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm text-white/80">Username</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Your username"
                                className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm"
                            />
                        </div>

                        {/* Email Field */}
                        <div>
                            <label className="block text-sm text-white/80">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm"
                            />
                        </div>

                        {/* Password Fields Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Password Field */}
                            <div className="relative">
                                <label className="block text-sm text-white/80">Password</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm"
                                />
                                {/* Toggle password visibility */}
                                {showPassword ? (
                                    <Eye
                                        onClick={() => setShowPassword(false)}
                                        className="absolute right-5 bottom-3 cursor-pointer text-white/50 hover:text-white"
                                    />
                                ) : (
                                    <EyeClosed
                                        onClick={() => setShowPassword(true)}
                                        className="absolute right-5 bottom-3 cursor-pointer text-white/50 hover:text-white"
                                    />
                                )}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="relative">
                                <label className="block text-sm text-white/80">
                                    Confirm password
                                </label>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm password"
                                    className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm"
                                />
                                {/* Toggle confirm password visibility */}
                                {showConfirmPassword ? (
                                    <Eye
                                        onClick={() => setShowConfirmPassword(false)}
                                        className="absolute right-5 bottom-3 cursor-pointer text-white/50 hover:text-white"
                                    />
                                ) : (
                                    <EyeClosed
                                        onClick={() => setShowConfirmPassword(true)}
                                        className="absolute right-5 bottom-3 cursor-pointer text-white/50 hover:text-white"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-linear-to-r from-[#7b5df9] to-[#9d6bff] px-4 py-3 text-sm font-semibold text-white"
                        >
                            Create account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
