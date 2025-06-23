/* eslint-disable @typescript-eslint/no-explicit-any */
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import { auth } from "./lib/firebase";
import { setUser } from "./redux/authSlice";
import { AuthPage } from "./screens/AuthPage";
import { Dashboard } from "./screens/Dashboard";
import { NotFound } from "./screens/NotFound";

/**
 * - Auth state listener from Firebase
 * - Conditional route rendering based on login status
 * - Loading UI until auth state resolves
 */
const App = () => {
  const dispatch = useDispatch();

  // Local loading state to show spinner until auth state is resolved
  const [loading, setLoading] = useState<boolean>(true);

  //  current user from Redux state
  const user = useSelector((state: any) => state.auth.user);

  /**
   * Setup Firebase auth state listener on mount
   */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch(setUser(user)); // Save user to Redux
      setLoading(false); // Stop showing spinner
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [dispatch]);

  /**
   * Render loading spinner until auth state is resolved
   */
  if (loading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Route - Redirect to dashboard if already logged in */}
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <AuthPage />}
        />

        {/* Protected Route - Redirect to login if not authenticated */}
        <Route
          path="/"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />

        {/* 404 Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
