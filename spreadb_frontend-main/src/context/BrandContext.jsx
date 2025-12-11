// src/context/BrandContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

const BrandContext = createContext();

export const useBrand = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrand must be used within BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }) => {
  // Initial profile data
  const initialProfile = {
    brandName: "TechStyle Fashion",
    industry: "Fashion & Lifestyle",
    website: "https://techstyle.com",
    description: "A premium fashion brand creating sustainable clothing for the modern lifestyle. We partner with top creators for authentic marketing.",
    email: "contact@techstyle.com",
    phone: "+1 (555) 123-4567",
    locations: ["New York", "Los Angeles", "Miami"],
    socialMedia: {
      instagram: "@techstylefashion",
      youtube: "TechStyle Fashion",
      twitter: "@techstyle",
      tiktok: "@techstyleofficial",
      facebook: "",
      linkedin: ""
    },
    wallet: 12500,
    verification: {
      email: true,
      phone: true,
      business: true
    }
  };

  const [brandProfile, setBrandProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);

  // Fetch profile from API (simulated)
  const fetchProfile = async () => {
    setLoading(true);
    try {
      // In real app: const response = await axios.get('/api/brand/profile');
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // For demo, we'll use localStorage to persist changes
      const savedProfile = localStorage.getItem('brandProfile');
      if (savedProfile) {
        setBrandProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Update profile (simulated API call)
  const updateProfile = async (updatedData) => {
    setLoading(true);
    try {
      // In real app: await axios.put('/api/brand/profile', updatedData);
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      
      // Merge updated data with existing profile
      const newProfile = {
        ...brandProfile,
        ...updatedData,
        // Handle locations specifically
        locations: updatedData.locations 
          ? (Array.isArray(updatedData.locations) 
              ? updatedData.locations 
              : updatedData.locations.split(',').map(loc => loc.trim()).filter(loc => loc))
          : brandProfile.locations
      };
      
      // Update state
      setBrandProfile(newProfile);
      
      // Save to localStorage for persistence
      localStorage.setItem('brandProfile', JSON.stringify(newProfile));
      
      toast.success("Profile updated successfully!");
      return { success: true };
    } catch (error) {
      toast.error("Failed to update profile");
      return { success: false, error };
    } finally {
      setLoading(false);
    }
  };

  // Load profile on initial render
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <BrandContext.Provider value={{ 
      brandProfile, 
      loading, 
      updateProfile,
      fetchProfile 
    }}>
      {children}
    </BrandContext.Provider>
  );
};