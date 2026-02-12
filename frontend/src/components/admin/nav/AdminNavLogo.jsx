import React from 'react';

const AdminNavLogo = ({ isMobileMenuOpen, onToggleMobileMenu, onLogoClick }) => (
  <div className="flex items-center gap-4">
    <button
      className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
      onClick={onToggleMobileMenu}
      type="button"
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {isMobileMenuOpen ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>

    <div className="flex items-center gap-3 cursor-pointer" onClick={onLogoClick}>
      <div className="w-10 h-10 rounded-md bg-linear-to-br from-purple-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
      <div className="hidden sm:block">
        <span className="text-lg font-bold text-gray-800 dark:text-white">StackSteps</span>
        <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full">
          Admin
        </span>
      </div>
    </div>
  </div>
);

export default AdminNavLogo;
