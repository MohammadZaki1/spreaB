// src/context/InfluencerContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

const InfluencerContext = createContext();

export const useInfluencer = () => {
  const context = useContext(InfluencerContext);
  if (!context) {
    throw new Error('useInfluencer must be used within InfluencerProvider');
  }
  return context;
};

export const InfluencerProvider = ({ children }) => {
  // Initial influencer profile data
  const initialProfile = {
    fullName: "Jane Smith",
    username: "@janesmith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    bio: "Lifestyle influencer & content creator focusing on fashion, beauty, and sustainable living. I love creating authentic content that resonates with my audience.",
    
    // Social media stats
    socialMedia: {
      instagram: {
        handle: "@janesmith",
        followers: "125K",
        engagement: "4.8%"
      },
      youtube: {
        handle: "Jane Smith",
        subscribers: "85K",
        views: "2.5M"
      },
      // tiktok: {
      //   handle: "@janesmith",
      //   followers: "210K",
      //   likes: "5.2M"
      // },
      twitter: {
        handle: "@janesmith",
        followers: "45K"
      }
    },
    
    // Profile details
    niche: ["Fashion", "Beauty", "Lifestyle"],
    location: "Los Angeles, CA",
    gender: "Female",
    age: 28,
    languages: ["English", "Spanish"],
    
    // Stats
    totalCampaigns: 24,
    completedCampaigns: 22,
    totalEarnings: 18500,
    averageRating: 4.9,
    
    // Preferences
    contentTypes: ["Photos", "Videos", "Stories", "Reels"],
    collaborationTypes: ["Paid Posts", "Product Reviews", "Brand Ambassadorships", "Giveaways"],
    minBudget: 500,
    
    // Verification
    verification: {
      email: true,
      phone: true,
      identity: true,
      socialMedia: true
    },
    
    // Portfolio
    portfolio: [
      {
        id: 1,
        type: "image",
        url: "https://example.com/portfolio1.jpg",
        title: "Summer Collection Campaign",
        brand: "FashionBrand Co",
        engagement: "45K likes"
      },
      {
        id: 2,
        type: "video",
        url: "https://example.com/video1.mp4",
        title: "Makeup Tutorial",
        brand: "BeautyGuru Inc",
        views: "250K"
      }
    ]
  };

  const [influencerProfile, setInfluencerProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);

  // Fetch profile from localStorage or API
  const fetchProfile = async () => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check localStorage for saved profile
      const savedProfile = localStorage.getItem('influencerProfile');
      if (savedProfile) {
        setInfluencerProfile(JSON.parse(savedProfile));
      }
    } catch (error) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (updatedData) => {
    setLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Merge updated data with existing profile
      const newProfile = {
        ...influencerProfile,
        ...updatedData,
        // Handle arrays specifically
        niche: updatedData.niche 
          ? (Array.isArray(updatedData.niche) 
              ? updatedData.niche 
              : updatedData.niche.split(',').map(item => item.trim()).filter(item => item))
          : influencerProfile.niche,
        
        languages: updatedData.languages 
          ? (Array.isArray(updatedData.languages) 
              ? updatedData.languages 
              : updatedData.languages.split(',').map(item => item.trim()).filter(item => item))
          : influencerProfile.languages,
        
        contentTypes: updatedData.contentTypes 
          ? (Array.isArray(updatedData.contentTypes) 
              ? updatedData.contentTypes 
              : updatedData.contentTypes.split(',').map(item => item.trim()).filter(item => item))
          : influencerProfile.contentTypes,
        
        collaborationTypes: updatedData.collaborationTypes 
          ? (Array.isArray(updatedData.collaborationTypes) 
              ? updatedData.collaborationTypes 
              : updatedData.collaborationTypes.split(',').map(item => item.trim()).filter(item => item))
          : influencerProfile.collaborationTypes
      };
      
      // Update state
      setInfluencerProfile(newProfile);
      
      // Save to localStorage for persistence
      localStorage.setItem('influencerProfile', JSON.stringify(newProfile));
      
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
    <InfluencerContext.Provider value={{ 
      influencerProfile, 
      loading, 
      updateProfile,
      fetchProfile 
    }}>
      {children}
    </InfluencerContext.Provider>
  );
};