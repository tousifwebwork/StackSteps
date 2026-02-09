
import React from 'react';
import Nav from '../../Nav';
import Footer from '../../Footer';
import HeroSection from './HeroSection';
import StatsSection from './StatsSection';
import OurStorySection from './OurStorySection';
import FeaturesSection from './FeaturesSection';
import TeamSection from './TeamSection';
import ValuesSection from './ValuesSection';
import MissionandVisionSection from './MissionandVisionSection';
import CTASection from './CTASection';


// Team Members Data

const TEAM_MEMBERS = [
    {
        id: 1,
        name: 'Alex Johnson',
        role: 'Founder & Lead Developer',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
        bio: 'Full-stack developer with 8+ years of experience in building educational platforms.',
        skills: ['React', 'Node.js', 'MongoDB', 'AWS'],
        social: {
            github: '#',
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 2,
        name: 'Sarah Williams',
        role: 'UI/UX Designer',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop&crop=face',
        bio: 'Creative designer passionate about creating intuitive and beautiful user experiences.',
        skills: ['Figma', 'Adobe XD', 'Tailwind CSS', 'Framer'],
        social: {
            github: '#',
            linkedin: '#',
            twitter: '#',
        },
    },
    {
        id: 3,
        name: 'Michael Chen',
        role: 'Backend Developer',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
        bio: 'Backend specialist focused on building scalable and secure server architectures.',
        skills: ['Python', 'Node.js', 'PostgreSQL', 'Docker'],
        social: {
            github: '#',
            linkedin: '#',
            twitter: '#',
        },
    },
];


// Features Data
const FEATURES = [
    {
        icon: '🎯',
        title: 'Interactive Quizzes',
        description:
            'Test your knowledge with our comprehensive quiz system featuring multiple topics and difficulty levels.',
    },
    {
        icon: '📊',
        title: 'Progress Tracking',
        description:
            'Monitor your learning journey with detailed analytics, streaks, and performance insights.',
    },
    {
        icon: '🏆',
        title: 'Achievements & Badges',
        description: 'Earn rewards and badges as you complete milestones and master new skills.',
    },
    {
        icon: '📚',
        title: 'Comprehensive Courses',
        description:
            'Access curated content covering the full MERN stack - MongoDB, Express, React, and Node.js.',
    },
    {
        icon: '💡',
        title: 'Smart Learning Path',
        description: 'Personalized recommendations based on your progress and learning goals.',
    },
    {
        icon: '🤝',
        title: 'Community Support',
        description: 'Connect with fellow learners and get help from our supportive community.',
    },
];


// Stats Data


const STATS = [
    { number: '10K+', label: 'Active Learners' },
    { number: '500+', label: 'Quiz Questions' },
    { number: '50+', label: 'Topics Covered' },
    { number: '95%', label: 'Satisfaction Rate' },
];


// Tech Stack Data

const TECH_STACK = [
    { name: 'MongoDB', icon: '🍃', color: 'bg-green-100 text-green-700' },
    { name: 'Express.js', icon: '⚡', color: 'bg-gray-100 text-gray-700' },
    { name: 'React', icon: '⚛️', color: 'bg-blue-100 text-blue-700' },
    { name: 'Node.js', icon: '🟢', color: 'bg-green-100 text-green-700' },
    { name: 'Tailwind CSS', icon: '🎨', color: 'bg-cyan-100 text-cyan-700' },
    { name: 'JWT Auth', icon: '🔐', color: 'bg-purple-100 text-purple-700' },
];


const Aboutus = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
            <Nav />

            {/* Hero Section */}
            <HeroSection />

            {/* Stats Section */}
            <StatsSection stats={STATS} />

            {/* Our Story Section */}
            <OurStorySection techStack={TECH_STACK} />

            {/* Features Section */}
            <FeaturesSection features={FEATURES} />

            {/* Team Section */}
            <TeamSection teamMembers={TEAM_MEMBERS} />

            {/* Mission & Vision Section */}
            <MissionandVisionSection />

            {/* Values Section */}
            <ValuesSection />

            {/* CTA Section */}
            <CTASection />

            <Footer />
        </div>
    );
};

export default Aboutus;