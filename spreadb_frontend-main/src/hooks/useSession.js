import { useState, useEffect } from 'react';
import SessionManager from '../utils/sessionManager';

// Custom hook for session management
export const useSession = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(SessionManager.isAuthenticated());
  const [userRole, setUserRole] = useState(localStorage.getItem('Role'));

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      setIsAuthenticated(SessionManager.isAuthenticated());
      setUserRole(localStorage.getItem('Role'));
    };

    // Check every 5 seconds
    const interval = setInterval(checkAuth, 5000);

    return () => clearInterval(interval);
  }, []);

  const login = (token, role, userId, email) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('Role', role);
    localStorage.setItem('UserId', userId);
    localStorage.setItem('Email', email);
    
    setIsAuthenticated(true);
    setUserRole(role);
    
    // Initialize session management
    SessionManager.init();
  };

  const logout = (showMessage = true) => {
    SessionManager.logout(showMessage);
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return {
    isAuthenticated,
    userRole,
    login,
    logout
  };
};

export default useSession;