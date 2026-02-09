

import React, { useEffect, useState, useRef } from 'react';
import useProfileStore from '../../store/client/profileStore';
import useQuestionStore from '../../store/client/questionStore';


const formatTimeSpent = (ms) => {
    if (!ms || ms <= 0) return '0m 0s';

    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    }
    if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
};


const calculateSolvedQuestions = (stats) => {
    return (
        (stats?.javascript?.solved?.length || 0) +
        (stats?.react?.solved?.length || 0) +
        (stats?.nodejs?.solved?.length || 0) +
        (stats?.mongodb?.solved?.length || 0) +
        (stats?.gitgithub?.solved?.length || 0)
    );
};

const AdditionalStats = () => {
    const { stats, updateTimeSpent } = useProfileStore();
    const { getTotalAllQuestions } = useQuestionStore();

    // Live time tracking state
    const [liveTimeSpent, setLiveTimeSpent] = useState(0);
    const liveTimeRef = useRef(0);

    // Time Tracking Effects
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
                const newTime = prev + 1000;
                liveTimeRef.current = newTime;
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Save time to backend every second
    useEffect(() => {
        const saveInterval = setInterval(() => {
            if (liveTimeRef.current > 0) {
                updateTimeSpent(liveTimeRef.current);
            }
        }, 1000);

        // Save when component unmounts (navigation)
        return () => {
            clearInterval(saveInterval);
            if (liveTimeRef.current > 0) {
                updateTimeSpent(liveTimeRef.current);
            }
        };
    }, [updateTimeSpent]);

    // Calculate Statistics
    const totalQuestions = getTotalAllQuestions();
    const solvedQuestions = calculateSolvedQuestions(stats);
    const remainingQuestions = totalQuestions - solvedQuestions;

    return (
        <div className="lg:col-span-3 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Time Spent Today */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Time Spent Today</h3>
                    <div className="text-2xl font-semibold text-indigo-600 dark:text-indigo-400 mt-2">
                        {formatTimeSpent(liveTimeSpent)}
                    </div>
                </div>

                {/* Today's Attempts */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Today's Attempts</h3>
                    <div className="text-2xl font-semibold text-green-600 dark:text-green-400 mt-2">
                        {stats?.todayAttempted || 0}
                    </div>
                </div>

                {/* Total Remaining */}
                <div className="bg-white dark:bg-gray-800 rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Total Remaining</h3>
                    <div className="text-2xl font-semibold text-gray-800 dark:text-white mt-2">
                        {remainingQuestions}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdditionalStats;