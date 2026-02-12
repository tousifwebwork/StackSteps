import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavUserMenu = ({ isOpen, onToggle, onLogout, menuRef }) => (
  <div className="relative" ref={menuRef}>
    <button
      onClick={onToggle}
      className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      type="button"
    >
      <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
        A
      </div>
      <svg
        className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {isOpen && (
      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 animate-in fade-in slide-in-from-top-2 duration-200">
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Admin User</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">admin@stacksteps.com</p>
        </div>

        <div className="py-1">
          
          <NavLink
            to="/admin/profile"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile Setting
          </NavLink>

 


        </div>

        <div className="border-t border-gray-100 dark:border-gray-700 py-1">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
            type="button"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </div>
    )}
  </div>
);

export default AdminNavUserMenu;
