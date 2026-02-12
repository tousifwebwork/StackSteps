import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNav from './AdminNav';
import Footer from '../Footer';
import { UserStatsCards, UserSearch, UsersTable } from './userComponents';

const ADMIN_URL = 'http://localhost:3000/admin';

const getAuthHeaders = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await axios.get(`${ADMIN_URL}/users`, getAuthHeaders());
      setUsers(data.users || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user =>
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalUsers = users.length;
  const totalSolved = users.reduce((sum, u) => sum + (u.stats?.solved || 0), 0);
  const totalAttempted = users.reduce((sum, u) => sum + (u.stats?.attempted || 0), 0);
  const totalCorrect = users.reduce((sum, u) => sum + (u.stats?.correct || 0), 0);
  const totals = {
    users: totalUsers,
    solved: totalSolved,
    attempted: totalAttempted,
    correct: totalCorrect
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNav />
      
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            User Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">View all users and their progress</p>
        </div>

        <UserStatsCards loading={loading} totals={totals} />
        <UserSearch searchTerm={searchTerm} onChange={setSearchTerm} />
        <UsersTable users={filteredUsers} loading={loading} />
      </div>

      <Footer />
    </div>
  );
};

export default User;