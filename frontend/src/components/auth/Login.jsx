/**
 * Login Page Component
 * Handles user authentication with username, password, and role
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Eye, EyeClosed } from 'lucide-react';
import useAuthStore from '../store/authStore';

// Hero background image
import HERO_IMAGE from '../../assets/authbackground.png'; 

// ============================================
// Login Component
// ============================================

const Login = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();

    // ========================================
    // Form State
    // ========================================
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [showPassword, setShowPassword] = useState(false);

    // ========================================
    // Form Handlers
    // ========================================

    /**
     * Handle form submission
     * Validates input and calls login API
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        await login(username, password, role);

        const token = localStorage.getItem("token");
        if (token) {
            navigate('/');
            toast.success('Login successful!');
        } else {
            // Show specific validation error
            if (username.length < 5) {
                toast.error('Username must be at least 5 characters');
            } else if (password.length < 5) {
                toast.error('Password must be at least 5 characters long');
            } else {
                toast.error('Please check your credentials.');
            }
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
                    <img src={HERO_IMAGE} alt="Desert landscape" className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-b from-black/10 via-[#3b2d5a]/50 to-[#181125]/85" />
                    <div className="relative flex h-full flex-col px-8 py-6">
                        <div className="flex items-center justify-between gap-4">
                            <div className="text-2xl font-semibold tracking-[0.18em]">AMU</div>
                        </div>
                        <div className="mt-auto pb-6">
                            <p className="text-xl sm:text-2xl font-semibold leading-snug max-w-xs">
                                Capturing Moments, Creating Memories
                            </p>
                            {/* Decorative dots */}
                            <div className="mt-6 flex items-center gap-2">
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                                <span className="h-1 w-6 rounded-full bg-white/60" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-col gap-8 px-8 py-10 lg:px-12">
                    {/* Header Section */}
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-semibold">Login Your Account</h1>
                        <p className="text-sm text-white/70">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-[#9e84ff] hover:text-white">Sign up</a>
                        </p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Username Field */}
                        <div>
                            <label className="block text-sm text-white/80">Username</label>
                            <input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                                name="username"
                                placeholder="Your username"
                                className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-[#8c6bff] focus:ring-2 focus:ring-[#8c6bff]/40"
                            />
                        </div>

                        {/* Password Field with Toggle Visibility */}
                        <div>
                            <label className="block text-sm text-white/80">Password</label>
                            <div className="flex items-center relative">
                                <input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="Enter your password"
                                    className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm placeholder:text-white/50 outline-none focus:border-[#8c6bff] focus:ring-2 focus:ring-[#8c6bff]/40"
                                />
                                {/* Toggle password visibility */}
                                {showPassword ? (
                                    <Eye
                                        onClick={() => setShowPassword(false)}
                                        className="absolute right-5 bottom-0 -translate-y-1/2 cursor-pointer text-white/50 hover:text-white"
                                    />
                                ) : (
                                    <EyeClosed
                                        onClick={() => setShowPassword(true)}
                                        className="absolute right-5 bottom-0 -translate-y-1/2 cursor-pointer text-white/50 hover:text-white"
                                    />
                                )}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div>
                            <label className="block text-sm text-white/80">Role</label>
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="mt-2 w-full rounded-xl bg-[#29233b] border border-white/10 px-4 py-3 text-sm text-white outline-none focus:border-[#8c6bff] focus:ring-2 focus:ring-[#8c6bff]/40"
                            >
                                <option className="text-white" value="user">User</option>
                                <option className="text-white" value="admin">Admin</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full rounded-xl bg-linear-to-r from-[#7b5df9] to-[#9d6bff] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-900/40 transition hover:from-[#8a6cff] hover:to-[#b07bff] focus:outline-none focus:ring-2 focus:ring-[#8c6bff]/50"
                        >
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;