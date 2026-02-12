import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import toast from 'react-hot-toast';
import { AdminNavLogo, AdminNavLinks, AdminNavUserMenu, AdminNavMobileMenu } from './nav';

const ADMIN_NAV_LINKS = [
  { to: '/', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { to: '/admin/users', label: 'Users', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
];

const AdminNav = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

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
          <AdminNavLogo
            isMobileMenuOpen={isMobileMenuOpen}
            onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
            onLogoClick={() => navigate('/')}
          />

          <nav className="hidden lg:flex lg:items-center lg:space-x-1">
            <AdminNavLinks links={ADMIN_NAV_LINKS} />
          </nav>

          <div className="flex items-center gap-3">
            <AdminNavUserMenu
              isOpen={isUserMenuOpen}
              onToggle={() => setIsUserMenuOpen((prev) => !prev)}
              onLogout={handleLogout}
              menuRef={menuRef}
            />
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <AdminNavMobileMenu
          links={ADMIN_NAV_LINKS}
          onNavigate={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default AdminNav;