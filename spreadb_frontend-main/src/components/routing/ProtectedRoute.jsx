import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Protected Route Component
 * Handles authentication and role-based access control
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  
  // Check if user is authenticated
  const token = localStorage.getItem('authToken');
  
  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // Get user role from localStorage
  const userRole = localStorage.getItem('Role');
  
  // If specific roles are required, check authorization
  if (allowedRoles.length > 0) {
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect based on user's role or to home
      if (userRole === 'Brand Owner') {
        return <Navigate to="/brandeditprofile" state={{ from: location.pathname }} replace />;
      } else if (userRole === 'Influencer') {
        return <Navigate to="/influencereditprofile" state={{ from: location.pathname }} replace />;
      } else {
        return <Navigate to="/" state={{ from: location.pathname }} replace />;
      }
    }
  }
  
  return children;
};

export default ProtectedRoute;