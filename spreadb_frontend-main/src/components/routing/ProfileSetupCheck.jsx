import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Profile Setup Check Component
 * Ensures users have completed their profile setup before accessing certain pages
 */
const ProfileSetupCheck = ({ children, role }) => {
  const [isProfileSetup, setIsProfileSetup] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const checkProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          setIsProfileSetup(false);
          return;
        }

        let endpoint;
        if (role === 'Brand Owner') {
          endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/profile/brand-owner`;
        } else if (role === 'Influencer') {
          endpoint = `${process.env.REACT_APP_BACKEND_URL}/api/profile/influencer`;
        } else {
          setIsProfileSetup(true);
          return;
        }

        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        setIsProfileSetup(!data.needsSetup);
      } catch (error) {
        console.error('Error checking profile:', error);
        setIsProfileSetup(false);
      } finally {
        setLoading(false);
      }
    };

    checkProfile();
  }, [role]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isProfileSetup) {
    if (role === 'Brand Owner') {
      return <Navigate to="/brandeditprofile" replace />;
    } else if (role === 'Influencer') {
      return <Navigate to="/influencer/profile" replace />;
    }
  }

  return children;
};

export default ProfileSetupCheck;