
import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Lenis from "lenis";

// Auth Components
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

// Protected Page Components
import Dashboard from './components/user/Dashboard/Dashboard';
import Profile from './components/user/Profile/Profile';
import Question from './components/user/Question/Question';
import Aboutus from './components/user/About/Aboutus';
import Bookmark from './components/user/bookmark/Bookmark';
import Feedback from './components/user/Profile/Feedback';
import OurProjects from './components/user/Profile/OurProjects';
import Features from './components/user/Profile/Features';

// Utility Components
import ProtectedRoute from './components/ProtectedRoute';
import NotFoundPage from './components/user/NotFoundPage/NotFoundPage';

// Store
import useToggleStore from './components/store/toggleStore';
import useAuthStore from './components/store/authStore';

//Admin
import Admin from './components/admin/Admin';
import AdminUsers from './components/admin/User';
import Adminprofile from './components/admin/Adminprofile';




const App = () => {
  const { theme } = useToggleStore();
  const location = useLocation();
  const lenisRef = useRef(null);
  const { role, loading, initAuth } = useAuthStore();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  // Initialize Smooth Scrolling (Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      smoothTouch: true,
    });

    lenisRef.current = lenis;

    function animationLoop(time) {
      lenis.raf(time);
      requestAnimationFrame(animationLoop);
    }

    requestAnimationFrame(animationLoop);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);


  // Scroll to Top on Route Change
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
    window.scrollTo(0, 0);
  }, [location.pathname]);



  // Dark Mode Theme Handler
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />


      {/* Home Route - Role-based rendering */}
      <Route path="/" element={
        <ProtectedRoute>
          {role === 'admin' ? <Admin /> : <Dashboard />}
        </ProtectedRoute>
      } />

      {/* Admin Routes */}
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="admin">
          <Admin />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute requiredRole="admin">
          <AdminUsers />
        </ProtectedRoute>
      } />
      <Route path="/admin/profile" element={
        <ProtectedRoute requiredRole="admin">
          <Adminprofile />
        </ProtectedRoute>
      } />

      {/* User Routes */}
      <Route path="/question" element={
        <ProtectedRoute requiredRole="user">
          <Question />
        </ProtectedRoute>
      } />
      <Route path="/profile" element={
        <ProtectedRoute requiredRole="user">
          <Profile />
        </ProtectedRoute>
      } />
      <Route path="/aboutus" element={
        <ProtectedRoute requiredRole="user">
          <Aboutus />
        </ProtectedRoute>
      } />
      <Route path="/bookmark" element={
        <ProtectedRoute requiredRole="user">
          <Bookmark />
        </ProtectedRoute>
      } />
      <Route path="/feedback" element={
        <ProtectedRoute requiredRole="user">
          <Feedback />
        </ProtectedRoute>
      } />
      <Route path="/ourprojects" element={
        <ProtectedRoute requiredRole="user">
          <OurProjects />
        </ProtectedRoute>
      } />
      <Route path="/features" element={
        <ProtectedRoute requiredRole="user">
          <Features />
        </ProtectedRoute>
      } />

      {/* Fallback Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;