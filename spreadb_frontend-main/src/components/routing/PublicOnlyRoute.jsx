import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

/**
 * Public Only Route Component
 * Redirects authenticated users away from public pages (login, signup, etc.)
 */
const PublicOnlyRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem('authToken');
  
  // If user is already logged in, redirect based on role
  if (token) {
    const userRole = localStorage.getItem('Role');
    const from = location.state?.from || '/';
    
    if (userRole === 'Brand Owner') {
      return <Navigate to="/brandeditprofile" state={{ from: location.pathname }} replace />;
    } else if (userRole === 'Influencer') {
      return <Navigate to="/influencereditprofile" state={{ from: location.pathname }} replace />;
    } else {
      return <Navigate to={from} replace />;
    }
  }
  
  return children;
};

export default PublicOnlyRoute;