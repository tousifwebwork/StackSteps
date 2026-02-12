import React from 'react';

const UserRow = ({ user }) => {
  const attempted = user.stats?.attempted || 0;
  const correct = user.stats?.correct || 0;
  const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;

  return (
    <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold overflow-hidden">
            {user.imgURL ? (
              <img src={user.imgURL} alt={user.username} className="w-full h-full object-cover" />
            ) : (
              user.username?.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white">{user.username}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
          {user.stats?.solved || 0}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
          {attempted}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-green-600 dark:text-green-400 font-medium">{correct}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <span className="text-red-600 dark:text-red-400 font-medium">{user.stats?.incorrect || 0}</span>
      </td>
      <td className="px-6 py-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <div className="w-16 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                accuracy >= 70 ? 'bg-green-500' : accuracy >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{accuracy}%</span>
        </div>
      </td>
    </tr>
  );
};

export default UserRow;
