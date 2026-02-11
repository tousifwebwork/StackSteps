import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuthStore from '../components/store/authStore';
import toast from 'react-hot-toast';
import useProfileStore from '../components/store/client/profileStore';

const NAV_LINKS = [
  { to: '/', label: 'Dashboard' },
  { to: '/question', label: 'Questions' },
  { to: '/bookmark', label: 'Bookmark' },
];

const Nav = () => {
  const { user, fetchProfile } = useProfileStore();
  const { imgURL } = user || {};

  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { logout } = useAuthStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // 🔥 FETCH PROFILE ON NAV LOAD (FIX)
  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logout successful!');
  };

  return (
    <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 rounded-md bg-indigo-600 text-white flex items-center justify-center font-bold">
                SS
              </div>
              <span className="text-lg font-semibold text-gray-800 dark:text-white">
                StackSteps
              </span>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex md:items-center md:space-x-6">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-indigo-600 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600 dark:border-indigo-400 pb-1'
                    : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition border-b-2 border-transparent pb-1'
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <div
              className="relative border-2 border-indigo-400 rounded-full p-0.5 hover:scale-105 transition-transform"
              ref={menuRef}
            >
              <button
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium"
              >
                {imgURL ? (
                  <img
                    src={imgURL}
                    alt="User Avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <span>M</span>
                )}
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border rounded-md shadow-lg py-1">
                  <NavLink
                    to="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Your Profile
                  </NavLink>
                  <NavLink
                    to="/aboutus"
                    className="block px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    About Us
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Log out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md"
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Nav;