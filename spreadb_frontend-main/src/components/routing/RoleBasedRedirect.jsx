import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Role Based Redirect Component
 * Redirects users to appropriate pages based on their role
 */
const RoleBasedRedirect = () => {
  const token = localStorage.getItem('authToken');
  const userRole = localStorage.getItem('Role');
  
  React.useEffect(() => {
    // Clean up auth mode after redirection
    localStorage.removeItem("authMode");
  }, []);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  if (userRole === 'Brand Owner') {
    return <Navigate to="/brandeditprofile" replace />;
  } else if (userRole === 'Influencer') {
    return <Navigate to="/influencereditprofile" replace />;
  }
  
  return <Navigate to="/" replace />;
};

export default RoleBasedRedirect;