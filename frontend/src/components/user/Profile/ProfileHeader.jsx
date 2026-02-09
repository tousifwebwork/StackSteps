/**
 * ProfileHeader Component
 * Displays user profile photo, info, and edit profile modal
 */

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import useProfileStore from '../../store/client/profileStore';

// ============================================
// ProfileHeader Component
// ============================================

const ProfileHeader = () => {
    const { fetchProfile, user, updateProfile, loading } = useProfileStore();

    // ========================================
    // Form State for Edit Modal
    // ========================================
    const [editFullname, setEditFullname] = useState('');
    const [editUsername, setEditUsername] = useState('');
    const [editEmail, setEditEmail] = useState('');

    // ========================================
    // Data Fetching
    // ========================================
    useEffect(() => {
        fetchProfile();
    }, []);

    // Sync form state with user data
    useEffect(() => {
        if (user) {
            setEditFullname(user.fullname || '');
            setEditUsername(user.username || '');
            setEditEmail(user.email || '');
        }
    }, [user]);
 
    // Loading State 
    if (loading || !user) {
        return <div>Loading profile...</div>;
    }
 
    // Destructure User Data 
    const { profilePhoto, username, fullname, role, email, createdAt } = user;
    const joinDate = createdAt ? new Date(createdAt).toLocaleDateString() : '';
 
    // Event Handlers 
    const openEditModal = () => {
        document.getElementById('my_modal_3').showModal();
    };

    /**
     * Close the edit profile modal
     */
    const closeEditModal = () => {
        document.getElementById('my_modal_3').close();
    };

    /**
     * Save profile changes
     */
    const handleSaveProfile = async () => {
        try {
            await updateProfile({
                fullname: editFullname,
                username: editUsername,
                email: editEmail,
            });
            closeEditModal();
        } catch (err) {
            console.error(err);
        }
    };
 
    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:border-gray-300 dark:hover:border-gray-600 transition">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                {/* Profile Photo */}
                <div className="relative group">
                    <img
                        src={
                            profilePhoto ||
                            'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'
                        }
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg shadow-indigo-500/20"
                    />
                </div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                            {username}
                        </h1>
                        <span className="inline-flex items-center justify-center md:justify-start">
                            <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 text-sm rounded-full border border-indigo-200 dark:border-indigo-700">
                                {role}
                            </span>
                        </span>
                    </div>

                    <p className="text-indigo-600 dark:text-indigo-400 mb-1">
                        {fullname || 'Not set'}
                    </p>

                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{email}</p>

                    <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center md:justify-start gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        Joined {joinDate}
                    </p>
                </div>

                {/* Edit Profile & Logout Actions */}
                <div className="flex flex-col gap-3">
                    {/* Edit Profile Button */}
                    <button className="btn" onClick={openEditModal}>
                        Edit Profile
                    </button>

                    {/* Edit Profile Modal */}
                    <dialog id="my_modal_3" className="modal">
                        <div className="modal-box">
                            <form method="dialog">
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                    ✕
                                </button>
                            </form>

                            <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

                            {/* Username Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Username</label>
                                <input
                                    type="text"
                                    value={editUsername}
                                    onChange={(e) => setEditUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Email Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    type="email"
                                    value={editEmail}
                                    onChange={(e) => setEditEmail(e.target.value)}
                                    placeholder="Enter email"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Full Name Field */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Full Name</label>
                                <input
                                    type="text"
                                    value={editFullname}
                                    onChange={(e) => setEditFullname(e.target.value)}
                                    placeholder="Enter full name"
                                    className="input input-bordered w-full"
                                />
                            </div>

                            {/* Modal Actions */}
                            <div className="flex justify-end gap-2">
                                <button className="btn btn-ghost" onClick={closeEditModal}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary" onClick={handleSaveProfile}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </dialog>

                    {/* Logout Button */}
                    <NavLink
                        to="/login"
                        className="flex items-center gap-2 px-5 py-2.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition font-medium border border-red-200 dark:border-red-800"
                    >
                        Logout
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
