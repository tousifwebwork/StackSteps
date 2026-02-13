 
import React, { useEffect, useState, useRef } from 'react';
import DarkLightMode from '../../DarkLightMode';
import useProfileStore from '../../store/client/profileStore';

// API endpoint for time tracking
const TIME_API = `${import.meta.env.VITE_API_URL}/api/updateTimeSpent`;

// Timer intervals in milliseconds
const ONE_SECOND = 1000;  
const formatTime = (ms) => {
    if (!ms || ms <= 0) return '00:00:00';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}; 
const formatTimeSpent = (ms) => {
    if (!ms || ms <= 0) return '0m 0s';
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) return `${hours}h ${minutes}m ${seconds}s`;
    if (minutes > 0) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
};
 
// RightColumn Component 

const RightColumn = () => {
    const { fetchStats, stats, updateTimeSpent } = useProfileStore();
    const [timeLeft, setTimeLeft] = useState(null);
    const [liveTimeSpent, setLiveTimeSpent] = useState(0);
    const liveTimeRef = useRef(0);
 
    // Data Fetching 
    useEffect(() => {
        fetchStats();
    }, []);
 
    // Time Tracking Effects 

    // Initialize live time spent from stats
    useEffect(() => {
        if (stats?.timeSpentToday !== undefined) {
            setLiveTimeSpent(stats.timeSpentToday);
            liveTimeRef.current = stats.timeSpentToday;
        }
    }, [stats?.timeSpentToday]);

    // Real-time counter - increment every second
    useEffect(() => {
        const timer = setInterval(() => {
            setLiveTimeSpent((prev) => {
                const newTime = prev + ONE_SECOND;
                liveTimeRef.current = newTime;
                return newTime;
            });
        }, ONE_SECOND);

        return () => clearInterval(timer);
    }, []);

    // Save time to backend every second
    useEffect(() => {
        const saveInterval = setInterval(() => {
            if (liveTimeRef.current > 0) {
                updateTimeSpent(liveTimeRef.current);
            }
        }, ONE_SECOND);

        // Save when leaving the page
        const handleBeforeUnload = () => {
            if (liveTimeRef.current > 0) {
                const token = localStorage.getItem('token');
                navigator.sendBeacon(
                    TIME_API,
                    new Blob([JSON.stringify({ timeSpent: liveTimeRef.current, token })], {
                        type: 'application/json',
                    })
                );
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearInterval(saveInterval);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            if (liveTimeRef.current > 0) {
                updateTimeSpent(liveTimeRef.current);
            }
        };
    }, [updateTimeSpent]);

    // Update countdown timer every second
    useEffect(() => {
        if (stats?.timeRemaining > 0) {
            setTimeLeft(stats.timeRemaining);

            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= ONE_SECOND) {
                        clearInterval(timer);
                        fetchStats();
                        return 0;
                    }
                    return prev - ONE_SECOND;
                });
            }, ONE_SECOND);

            return () => clearInterval(timer);
        } else {
            setTimeLeft(0);
        }
    }, [stats?.timeRemaining]);
 
    // Computed Values 
    const todayAttempted = stats?.todayAttempted || 0;
 
    return (
        <div className="space-y-6">
            {/* Time Spent Today */}
            <div className="bg-linear-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-1">⏱️</div>
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                        {formatTimeSpent(liveTimeSpent)}
                    </div>
                    <div className="text-blue-600 dark:text-blue-400 font-medium">Time Spent Today</div>
                    <p className="text-blue-700/70 dark:text-blue-300/70 text-sm mt-2">
                        Keep up the great work!
                    </p>
                    {timeLeft > 0 && (
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            Resets in: <span className="font-mono">{formatTime(timeLeft)}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Today's Attempts */}
            <div className="bg-linear-to-br from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 rounded-xl p-6 border border-orange-200 dark:border-orange-800">
                <div className="text-center">
                    <div className="text-4xl font-bold text-gray-800 dark:text-white mb-1">
                        {todayAttempted}
                    </div>
                    <div className="text-orange-600 dark:text-orange-400 font-medium">Todays Attempt!</div>
                    <p className="text-orange-700/70 dark:text-orange-300/70 text-sm mt-3">
                        Keep learning daily to maintain your Consistency
                    </p>
                    {timeLeft > 0 && (
                        <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                            Resets in:{' '}
                            <span className="font-mono font-semibold text-orange-600 dark:text-orange-400">
                                {formatTime(timeLeft)}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex justify-center gap-1 mt-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium"></div>
                </div>
            </div>
            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">🔔</span> Notifications
                </h3>
                <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-gray-800 dark:text-white text-sm font-medium">
                                Email Notifications
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                Receive updates via email
                            </div>
                        </div>
                        <button className="w-12 h-6 bg-indigo-600 rounded-full relative transition">
                            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition" />
                        </button>
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-gray-800 dark:text-white text-sm font-medium">
                                Push Notifications
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                Get instant alerts
                            </div>
                        </div>
                        <button className="w-12 h-6 bg-indigo-600 rounded-full relative transition">
                            <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition" />
                        </button>
                    </div>

                    {/* Weekly Digest */}
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-gray-800 dark:text-white text-sm font-medium">
                                Weekly Digest
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-xs">
                                Summary of your progress
                            </div>
                        </div>
                        <button className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full relative transition">
                            <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Dark/Light Mode Toggle */}
            <DarkLightMode />

            {/* Account Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                    <span className="text-xl">⚙️</span> Account
                </h3>
                <div className="space-y-2">
                    {/* Change Password */}
                    <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                            />
                        </svg>
                        Change Password
                    </button>

                    {/* Privacy Settings */}
                    <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                        Privacy Settings
                    </button>

                    {/* Download My Data */}
                    <button className="w-full flex items-center gap-3 p-3 text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                            />
                        </svg>
                        Download My Data
                    </button>

                    {/* Delete Account */}
                    <button className="w-full flex items-center gap-3 p-3 text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                        </svg>
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RightColumn;