// Session Management Utilities
export class SessionManager {
  static SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
  static ACTIVITY_EVENTS = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
  
  static timeoutId = null;
  static isActive = false;

  // Initialize session management
  static init() {
    if (this.isActive) return;
    
    this.isActive = true;
    this.resetTimeout();
    this.bindActivityEvents();
    this.bindVisibilityEvents();
  }

  // Reset the session timeout
  static resetTimeout() {
    clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(() => {
      this.handleSessionTimeout();
    }, this.SESSION_TIMEOUT);
  }

  // Handle session timeout
  static handleSessionTimeout() {
    this.clearSession();
    alert('Your session has expired due to inactivity. Please login again.');
    window.location.href = '/login';
  }

  // Bind activity events to reset timeout
  static bindActivityEvents() {
    this.ACTIVITY_EVENTS.forEach(event => {
      document.addEventListener(event, () => this.resetTimeout(), true);
    });
  }

  // Bind visibility change events
  static bindVisibilityEvents() {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        // Optional: Clear session when tab becomes hidden
        // Uncomment the line below for immediate logout on tab switch
        // this.clearSession();
      }
    });

    // Clear session when browser/tab is closed
    window.addEventListener('beforeunload', () => {
      this.clearSession();
    });

    // Clear session when page is unloaded
    window.addEventListener('unload', () => {
      this.clearSession();
    });
  }

  // Clear all session data
  static clearSession() {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('Email');
    localStorage.removeItem('Role');
    localStorage.removeItem('authMode');
    localStorage.removeItem('UserId');
    
    // Clear sessionStorage
    sessionStorage.clear();
    
    // Clear timeout
    clearTimeout(this.timeoutId);
    this.isActive = false;
  }

  // Check if user is authenticated
  static isAuthenticated() {
    return !!localStorage.getItem('authToken');
  }

  // Manual logout
  static logout(showMessage = true) {
    this.clearSession();
    
    if (showMessage) {
      alert('You have been logged out successfully.');
    }
    
    window.location.href = '/login';
  }

  // Cleanup (remove event listeners)
  static cleanup() {
    this.ACTIVITY_EVENTS.forEach(event => {
      document.removeEventListener(event, () => this.resetTimeout(), true);
    });
    
    clearTimeout(this.timeoutId);
    this.isActive = false;
  }
}

export default SessionManager;