import { useState, useEffect, useCallback } from 'react';

const useNotifications = () => {
  const [counts, setCounts] = useState({
    messages: 0,
    promotions: 0,
    notifications: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotificationCounts = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/notifications/counts`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setCounts(data.counts);
          setError(null);
        } else {
          setError(data.message || 'Failed to fetch notification counts');
        }
      } else {
        setError('Failed to fetch notification counts');
      }
    } catch (err) {
      console.error('Error fetching notification counts:', err);
      setError('Network error while fetching notification counts');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch counts on mount
  useEffect(() => {
    fetchNotificationCounts();
  }, [fetchNotificationCounts]);

  // Refresh counts every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotificationCounts();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, [fetchNotificationCounts]);

  // Function to manually refresh counts
  const refreshCounts = useCallback(() => {
    setLoading(true);
    fetchNotificationCounts();
  }, [fetchNotificationCounts]);

  // Function to update specific count (for real-time updates)
  const updateCount = useCallback((type, newCount) => {
    setCounts(prev => ({
      ...prev,
      [type]: newCount
    }));
  }, []);

  // Function to decrement count (when user reads a notification)
  const decrementCount = useCallback((type, amount = 1) => {
    setCounts(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] - amount)
    }));
  }, []);

  return {
    counts,
    loading,
    error,
    refreshCounts,
    updateCount,
    decrementCount
  };
};

export default useNotifications;