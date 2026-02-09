/**
 * Profile Page Component
 * User profile page with stats, settings, and account management
 */

import React from 'react';
import Nav from '../../Nav';
import Footer from '../../Footer';
import ProfileHeader from './ProfileHeader';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
 
// Profile Component 

const Profile = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-black dark:text-gray-100">
            <Nav />

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Profile Header with User Info */}
                <ProfileHeader />

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Stats and Progress */}
                    <LeftColumn />

                    {/* Right Column - Settings and Actions */}
                    <RightColumn />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Profile;