import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ token, children }) {
  if (!token) {
    // No token → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token exists → render children
  return children;
}
