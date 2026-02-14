// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import ApplyJob from "./Pages/ApplyJob";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }, [token]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage setToken={setToken} />} />
        <Route path="/register" element={<RegisterPage setToken={setToken} />} />

        {/* Apply for job (protected) */}
        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute token={token}>
              <ApplyJob />
            </ProtectedRoute>
          }
        />

        {/* Dashboard (protected) */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute token={token}>
              <Dashboard setToken={setToken} />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route
          path="*"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
