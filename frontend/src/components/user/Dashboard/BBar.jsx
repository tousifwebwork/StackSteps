
import React from 'react';
import { Bar } from 'react-chartjs-2';
import useToggleStore from '../../store/toggleStore';
import useQuestionStore from '../../store/client/questionStore';
import useProfileStore from '../../store/client/profileStore';
import { DiJavascript } from 'react-icons/di';
import { FaGithub, FaNodeJs, FaReact } from 'react-icons/fa';
import { SiMongodb } from 'react-icons/si';

// BBar Component

const BBar = () => {
    const { theme } = useToggleStore();
    const { getTotalQuestions } = useQuestionStore();
    const { stats } = useProfileStore();

    // Subject Data Configuration
    const subjects = [
        {
            name: 'JavaScript',
            key: 'javascript',
            icon: <DiJavascript />,
            solved: stats?.javascript?.solved?.length || 0,
            total: getTotalQuestions('javascript'),
        },
        {
            name: 'React',
            key: 'react',
            icon: <FaReact />,
            solved: stats?.react?.solved?.length || 0,
            total: getTotalQuestions('react'),
        },
        {
            name: 'NodeJS',
            key: 'nodejs',
            icon: <FaNodeJs />,
            solved: stats?.nodejs?.solved?.length || 0,
            total: getTotalQuestions('nodejs'),
        },
        {
            name: 'MongoDB',
            key: 'mongodb',
            icon: <SiMongodb />,
            solved: stats?.mongodb?.solved?.length || 0,
            total: getTotalQuestions('mongodb'),
        },
        {
            name: 'Git',
            key: 'gitgithub',
            icon: <FaGithub />,
            solved: stats?.gitgithub?.solved?.length || 0,
            total: getTotalQuestions('gitgithub'),
        },
    ];

    const isDark = theme === 'dark';

    const chartData = {
        labels: subjects.map((s) => s.name),
        datasets: [
            {
                label: 'Questions Solved',
                data: subjects.map((s) => s.solved),
                backgroundColor: isDark ? '#60a5fa' : '#3b82f6',
                borderColor: isDark ? '#93c5fd' : '#2563eb',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                    color: isDark ? '#fff' : '#111827',
                },
            },
        },
        scales: {
            x: {
                ticks: { color: isDark ? '#fff' : '#111827' },
                grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            },
            y: {
                ticks: { color: isDark ? '#fff' : '#111827' },
                grid: { color: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg p-5 shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-2">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-lg font-semibold">Questions Solved by Technology</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        Recent distribution across topics
                    </p>
                </div>
            </div>

            {/* Bar Chart */}
            <div className="mt-4 h-64">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default BBar;
