// src/pages/InfluencerProfilePage.jsx
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Camera,
  Edit,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Save,
  X,
  Upload,
  FileText,
  Hash,
  Globe,
  Users,
  Briefcase,
  Star,
  MessageSquare,
  Check
} from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const InfluencerProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [influencerProfile, setInfluencerProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    about: "",
    category: "",
    locations: "",
    contentTypes: "",
    collaborationTypes: "",
    languages: "",
    minBudget: "",
    socialMedia: {
      instagram: { link: "", followers: "", views: "" },
      youtube: { link: "", followers: "", views: "" },
      twitter: { link: "", followers: "", views: "" }
    }
  });

  useEffect(() => {
    fetchProfile();
  }, []);

 const fetchProfile = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    const res = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/profile/get_influencer`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const profile = res.data;
    
    // Store the complete profile for view mode
    setInfluencerProfile(profile);
    
    // Prepare form data - handle both string and object formats for social media
    let socialMediaData = {
      instagram: { link: "", followers: "", views: "" },
      youtube: { link: "", followers: "", views: "" },
      twitter: { link: "", followers: "", views: "" }
    };
    
    if (profile.socialMedia) {
      // If social media is stored as strings in backend
      if (typeof profile.socialMedia.instagram === 'string') {
        socialMediaData.instagram.link = profile.socialMedia.instagram;
      } else if (profile.socialMedia.instagram && typeof profile.socialMedia.instagram === 'object') {
        // If it's stored as objects (for backward compatibility)
        socialMediaData.instagram = profile.socialMedia.instagram;
      }
      
      if (typeof profile.socialMedia.youtube === 'string') {
        socialMediaData.youtube.link = profile.socialMedia.youtube;
      } else if (profile.socialMedia.youtube && typeof profile.socialMedia.youtube === 'object') {
        socialMediaData.youtube = profile.socialMedia.youtube;
      }
      
      if (typeof profile.socialMedia.twitter === 'string') {
        socialMediaData.twitter.link = profile.socialMedia.twitter;
      } else if (profile.socialMedia.twitter && typeof profile.socialMedia.twitter === 'object') {
        socialMediaData.twitter = profile.socialMedia.twitter;
      }
    }
    
    const formattedData = {
      fullName: profile.fullName || `${profile.firstName || ""} ${profile.lastName || ""}`.trim(),
      userName: profile.userName || "",
      email: profile.email || "",
      phoneNumber: profile.phoneNumber || "",
      about: profile.about || "",
      category: Array.isArray(profile.category) ? profile.category.join(", ") : profile.category || "",
      locations: Array.isArray(profile.locations) ? profile.locations.join(", ") : profile.locations || "",
      contentTypes: Array.isArray(profile.contentTypes) ? profile.contentTypes.join(", ") : "",
      collaborationTypes: Array.isArray(profile.collaborationTypes) ? profile.collaborationTypes.join(", ") : "",
      languages: Array.isArray(profile.languages) ? profile.languages.join(", ") : "",
      minBudget: profile.minBudget || "",
      socialMedia: socialMediaData
    };
    
    setFormData(formattedData);

    if (profile.profilePhoto) {
      setProfilePic(`${process.env.REACT_APP_BACKEND_URL}/${profile.profilePhoto}`);
    }
  } catch (error) {
    console.error("Profile fetch error:", error);
    toast.error("Failed to load profile");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (platform, field, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: {
          ...prev.socialMedia[platform],
          [field]: value
        }
      }
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setProfilePicFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    const token = localStorage.getItem("authToken");
    const data = new FormData();
    
    // CRITICAL FIX 1: Send fullName (not firstName)
    data.append("fullName", formData.fullName);
    data.append("userName", formData.userName);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("about", formData.about);
    data.append("minBudget", formData.minBudget);
    
    // Convert comma-separated values into arrays
    if (formData.category) {
      data.append("category", JSON.stringify(formData.category.split(",").map(n => n.trim())));
    }
    if (formData.locations) {
      data.append("locations", JSON.stringify(formData.locations.split(",").map(l => l.trim())));
    }
    if (formData.contentTypes) {
      data.append("contentTypes", JSON.stringify(formData.contentTypes.split(",").map(c => c.trim())));
    }
    if (formData.collaborationTypes) {
      data.append("collaborationTypes", JSON.stringify(formData.collaborationTypes.split(",").map(c => c.trim())));
    }
    if (formData.languages) {
      data.append("languages", JSON.stringify(formData.languages.split(",").map(l => l.trim())));
    }
    
    // CRITICAL FIX 2: Send social media as STRINGS (not objects)
    // Backend expects: socialMedia.instagram = "username" (string)
    // Not: socialMedia.instagram = {link: "username", followers: 100} (object)
    const socialMediaStrings = {
      instagram: formData.socialMedia.instagram.link || "",
      youtube: formData.socialMedia.youtube.link || "",
      twitter: formData.socialMedia.twitter.link || ""
    };
    
    data.append("socialMedia", JSON.stringify(socialMediaStrings));
    
    // Profile pic file
    if (profilePicFile) {
      data.append("profilePhoto", profilePicFile);
    }

    console.log("Sending:", {
      fullName: formData.fullName,
      socialMedia: socialMediaStrings
    });

    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/profile/influencer`,
      data,
      { 
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data" 
        } 
      }
    );

    toast.success("Profile updated successfully 🎉");
    await fetchProfile();
    setIsEditing(false);
    
  } catch (error) {
    console.error("Update error:", error.response?.data || error);
    toast.error(error.response?.data?.message || "Profile update failed");
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
  if (window.confirm("Are you sure you want to discard changes?")) {
    if (influencerProfile) {
      // Handle social media data format
      let socialMediaData = {
        instagram: { link: "", followers: "", views: "" },
        youtube: { link: "", followers: "", views: "" },
        twitter: { link: "", followers: "", views: "" }
      };
      
      if (influencerProfile.socialMedia) {
        if (typeof influencerProfile.socialMedia.instagram === 'string') {
          socialMediaData.instagram.link = influencerProfile.socialMedia.instagram;
        } else if (influencerProfile.socialMedia.instagram) {
          socialMediaData.instagram = influencerProfile.socialMedia.instagram;
        }
        
        if (typeof influencerProfile.socialMedia.youtube === 'string') {
          socialMediaData.youtube.link = influencerProfile.socialMedia.youtube;
        } else if (influencerProfile.socialMedia.youtube) {
          socialMediaData.youtube = influencerProfile.socialMedia.youtube;
        }
        
        if (typeof influencerProfile.socialMedia.twitter === 'string') {
          socialMediaData.twitter.link = influencerProfile.socialMedia.twitter;
        } else if (influencerProfile.socialMedia.twitter) {
          socialMediaData.twitter = influencerProfile.socialMedia.twitter;
        }
      }
      
      const formattedData = {
        fullName: influencerProfile.fullName || `${influencerProfile.firstName || ""} ${influencerProfile.lastName || ""}`.trim(),
        userName: influencerProfile.userName || "",
        email: influencerProfile.email || "",
        phoneNumber: influencerProfile.phoneNumber || "",
        about: influencerProfile.about || "",
        category: Array.isArray(influencerProfile.category) ? influencerProfile.category.join(", ") : influencerProfile.category || "",
        locations: Array.isArray(influencerProfile.locations) ? influencerProfile.locations.join(", ") : influencerProfile.locations || "",
        contentTypes: Array.isArray(influencerProfile.contentTypes) ? influencerProfile.contentTypes.join(", ") : "",
        collaborationTypes: Array.isArray(influencerProfile.collaborationTypes) ? influencerProfile.collaborationTypes.join(", ") : "",
        languages: Array.isArray(influencerProfile.languages) ? influencerProfile.languages.join(", ") : "",
        minBudget: influencerProfile.minBudget || "",
        socialMedia: socialMediaData
      };
      setFormData(formattedData);
    }
    setIsEditing(false);
  }
};

  const socialMediaIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="text-purple-700">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Influencer Profile</h1>
              <p className="text-gray-600">View and manage your influencer information</p>
            </div>
            
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="px-5 py-2.5 rounded-lg font-medium bg-purple-700 text-white hover:bg-purple-800 flex items-center gap-2 transition-colors"
              >
                <Edit className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg font-medium bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2 transition-colors"
                >
                  {saving ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Card Header with Gradient */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
                  <div className="flex flex-col items-center text-center">
                    {/* Profile Picture */}
                    <div className="relative mb-4">
                      <div className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                        {profilePic ? (
                          <img 
                            src={profilePic} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                            <User className="h-16 w-16 text-white" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <Camera className="h-5 w-5 text-gray-700" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleProfilePicChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Name & Username */}
                    <div className="text-white">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="text-2xl font-bold bg-transparent text-center border-b border-white/50 focus:outline-none focus:border-white w-full mb-2 text-white placeholder-white/70"
                            placeholder="Full Name"
                          />
                          <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            required
                            className="text-lg bg-transparent text-center border-b border-white/50 focus:outline-none focus:border-white w-full text-white placeholder-white/70"
                            placeholder="@username"
                          />
                        </>
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold">{formData.fullName}</h2>
                          <p className="text-lg opacity-90">@{formData.userName}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body - Quick Info */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Email</p>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-gray-900"
                            placeholder="your@email.com"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium truncate">{formData.email}</p>
                        )}
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Phone className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Phone</p>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-gray-900"
                            placeholder="+1 (555) 123-4567"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{formData.phoneNumber || "Not provided"}</p>
                        )}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Location</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="locations"
                            value={formData.locations}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-gray-900"
                            placeholder="City, State"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{formData.locations || "Not specified"}</p>
                        )}
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Globe className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Languages</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="languages"
                            value={formData.languages}
                            onChange={handleChange}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent text-gray-900"
                            placeholder="English, Spanish"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{formData.languages || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Stats Summary */}
                  {formData.socialMedia && Object.values(formData.socialMedia).some(val => val.link) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 mb-4">Social Media</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {Object.entries(formData.socialMedia).map(([platform, data]) => (
                          data.link ? (
                            <div
                              key={platform}
                              className="flex flex-col items-center p-2 bg-gray-50 rounded-lg"
                            >
                              {socialMediaIcons[platform]}
                              <span className="text-xs text-gray-600 mt-1 truncate w-full text-center">
                                {data.link}
                              </span>
                            </div>
                          ) : null
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Information */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden h-full">
                {/* Header */}
                <div className="border-b border-gray-200">
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-semibold text-gray-900">Influencer Details</h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {isEditing ? (
                    // Edit Mode Form
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Bio Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Bio</h4>
                        </div>
                        <textarea
                          name="about"
                          value={formData.about}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                        />
                      </div>

                      {/* Niche Section */}
                      <div className="space-y-6 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Hash className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Niches</h4>
                        </div>
                        <div>
                          <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Fashion, Beauty, Lifestyle"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            Separate multiple niches with commas
                          </p>
                        </div>
                      </div>

                      {/* Social Media Details */}
                      <div className="space-y-6 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Social Media Profiles</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {Object.entries(formData.socialMedia).map(([platform, data]) => {
                            const Icon = socialMediaIcons[platform];
                            
                            return (
                              <div key={platform} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-4">
                                  {Icon}
                                  <h4 className="font-medium text-gray-900 capitalize">{platform}</h4>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Handle/Link
                                    </label>
                                    <input
                                      type="text"
                                      value={data.link}
                                      onChange={(e) => handleSocialMediaChange(platform, "link", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      placeholder={`@${platform}username`}
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Followers
                                    </label>
                                    <input
                                      type="text"
                                      value={data.followers}
                                      onChange={(e) => handleSocialMediaChange(platform, "followers", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      placeholder="125K"
                                    />
                                  </div>
                                  
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Views/Engagement
                                    </label>
                                    <input
                                      type="text"
                                      value={data.views}
                                      onChange={(e) => handleSocialMediaChange(platform, "views", e.target.value)}
                                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                      placeholder="2.5M views or 4.8% engagement"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Form Actions */}
                      <div className="pt-8 border-t border-gray-200 flex justify-end gap-3">
                        <button
                          type="button"
                          onClick={handleCancel}
                          className="px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={saving}
                          className="px-6 py-3 rounded-lg font-medium bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50"
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </form>
                  ) : (
                    // View Mode
                    <div className="space-y-8">
                      {/* Bio Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">About Me</h4>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {formData.about || "No bio provided."}
                          </p>
                        </div>
                      </div>

                      {/* Niche Section */}
                      {formData.category && (
                        <div className="space-y-6 pt-8 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Hash className="h-5 w-5 text-purple-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Niches</h4>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {formData.category.split(",").map((niche, index) => (
                              <span
                                key={index}
                                className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                              >
                                {niche.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Social Media Details */}
                      {formData.socialMedia && Object.values(formData.socialMedia).some(val => val.link) && (
                        <div className="space-y-6 pt-8 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Social Media Profiles</h4>
                          </div>
                          
                          <div className="space-y-4">
                            {Object.entries(formData.socialMedia).map(([platform, data]) => (
                              data.link && (
                                <div key={platform} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                  <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                      {socialMediaIcons[platform]}
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500 capitalize">{platform}</p>
                                      <p className="text-gray-900 font-medium">{data.link}</p>
                                    </div>
                                  </div>
                                  
                                  <div className="flex-1 grid md:grid-cols-2 gap-4">
                                    {data.followers && (
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          {platform === "youtube" ? "Subscribers" : "Followers"}
                                        </p>
                                        <p className="text-gray-900 font-medium">{data.followers}</p>
                                      </div>
                                    )}
                                    {data.views && (
                                      <div>
                                        <p className="text-sm text-gray-500">
                                          {platform === "instagram" ? "Engagement" : "Views"}
                                        </p>
                                        <p className="text-gray-900 font-medium">{data.views}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfluencerProfilePage;