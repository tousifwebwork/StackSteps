
import { useEffect, useRef } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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




const App = () => {
  const { theme } = useToggleStore();
  const location = useLocation();
  const lenisRef = useRef(null);

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


  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/question" element={<ProtectedRoute><Question /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/aboutus" element={<ProtectedRoute><Aboutus /></ProtectedRoute>} />
      <Route path="/bookmark" element={<ProtectedRoute><Bookmark /></ProtectedRoute>} />
      <Route path="/feedback" element={<ProtectedRoute><Feedback /></ProtectedRoute>} />
      <Route path="/ourprojects" element={<ProtectedRoute><OurProjects /></ProtectedRoute>} />
      <Route path="/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />

      {/* 404 Page */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;