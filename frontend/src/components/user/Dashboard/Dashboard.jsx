 

import { useEffect } from 'react';
import Nav from '../../Nav';
import Footer from '../../Footer';
import StatCard from './StatCard';
import MernSction from './MernSction';
import Testimonial from './Testimonial';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
import MostAskedInterview from './MostAskedInterview';
import AdditionalStats from './AdditionalStats';
import SubjectCards from './SubjectCards';
import BBar from './BBar';
import useQuestionStore from '../../store/client/questionStore';
import useProfileStore from '../../store/client/profileStore';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);
 
const calculateSolvedQuestions = (stats) => {
    return (
        (stats?.javascript?.solved?.length || 0) +
        (stats?.react?.solved?.length || 0) +
        (stats?.nodejs?.solved?.length || 0) +
        (stats?.mongodb?.solved?.length || 0) +
        (stats?.gitgithub?.solved?.length || 0)
    );
};

 
const calculateTotalAttempted = (stats) => {
    return (
        (stats?.javascript?.attempted || 0) +
        (stats?.react?.attempted || 0) +
        (stats?.nodejs?.attempted || 0) +
        (stats?.mongodb?.attempted || 0) +
        (stats?.gitgithub?.attempted || 0)
    );
};

 
const calculateTotalCorrect = (stats) => {
    return (
        (stats?.javascript?.correct || 0) +
        (stats?.react?.correct || 0) +
        (stats?.nodejs?.correct || 0) +
        (stats?.mongodb?.correct || 0) +
        (stats?.gitgithub?.correct || 0)
    );
};
 
const Dashboard = () => {
    const { fetchQuestions, getTotalAllQuestions } = useQuestionStore();
    const { fetchStats, stats } = useProfileStore();
 
    useEffect(() => {
        fetchQuestions();
        fetchStats();
    }, []);

 
    const totalQuestions = getTotalAllQuestions();
    const solvedQuestions = calculateSolvedQuestions(stats);
    const totalAttempted = calculateTotalAttempted(stats);
    const totalCorrect = calculateTotalCorrect(stats);
    const remainingQuestions = totalQuestions - solvedQuestions;
    const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 0;

    
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Nav />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Overall Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard label="Total Questions" value={totalQuestions} />
                    <StatCard label="Solved Questions" value={solvedQuestions} tone="green" />
                    <StatCard label="Remaining" value={remainingQuestions} tone="red" />
                    <StatCard label="Accuracy" value={`${accuracy}%`} tone="blue" />
                </div>

                {/* Main Content Grid */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Progress Chart */}
                    <BBar />

                    {/* Most Asked Interview Questions */}
                    <MostAskedInterview />

                    {/* Additional Stats (Time, Attempts, Remaining) */}
                    <AdditionalStats />

                    {/* Subject Progress Cards */}
                    <SubjectCards />

                    {/* MERN Stack Information Section */}
                    <MernSction />

                    {/* Company Testimonials */}
                    <Testimonial />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;
