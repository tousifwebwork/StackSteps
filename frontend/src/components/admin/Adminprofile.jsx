import { useEffect } from 'react';
import AdminNav from './AdminNav';
import Footer from '../Footer';
import useProfileStore from '../store/client/profileStore';

const Adminprofile = () => {
  const { fetchProfile, user, loading } = useProfileStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNav />

      <main className="max-w-2xl mx-auto py-12 px-4">
        {
        loading ? 
        (<div className="text-center text-gray-500">Loading...</div>) : 
        user ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-8">
            <div className="flex items-center gap-6 mb-6">
              <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                {user.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.username}</h1>
                <span className="text-sm text-purple-600 dark:text-purple-400 font-medium">{user.role}</span>
              </div>
            </div>

            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium">Email</span>
                <span>{user.email}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium">Joined</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">No profile data</div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Adminprofile;