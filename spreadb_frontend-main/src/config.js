// src/config.js
export const API_CONFIG = {
  // Use the correct backend port (3001 based on your message)
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
};