import SessionManager from './sessionManager';

/**
 * Authentication utility functions
 */

// Export logout utility (using SessionManager)
export const logout = (showMessage = false) => {
  SessionManager.logout(showMessage);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return SessionManager.isAuthenticated();
};

// Get user role
export const getUserRole = () => {
  return localStorage.getItem('Role');
};

// Get user ID
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Get auth token
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Check if profile is set up
export const isProfileSetup = async (role) => {
  try {
    const token = getAuthToken();
    if (!token) return false;

    let endpoint;
    if (role === 'Brand Owner') {
      endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/profile/brand-owner`;
    } else if (role === 'Influencer') {
      endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/profile/influencer`;
    } else {
      return false;
    }

    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    const data = await response.json();
    return !data.needsSetup;
  } catch (error) {
    console.error('Error checking profile setup:', error);
    return false;
  }
};

// Check if user has specific role
export const hasRole = (requiredRole) => {
  const userRole = getUserRole();
  return userRole === requiredRole;
};

// Check if user has any of the specified roles
export const hasAnyRole = (roles) => {
  const userRole = getUserRole();
  return roles.includes(userRole);
};

// Get user info from localStorage
export const getUserInfo = () => {
  return {
    id: getUserId(),
    role: getUserRole(),
    email: localStorage.getItem('Email'),
    isAuthenticated: isAuthenticated()
  };
};