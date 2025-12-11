// src/pages/InfluencerEditProfile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import {
  User,
  Camera,
  ArrowLeft,
  Save,
  X,
  Upload,
  Instagram,
  Youtube,
  Twitter,
  // Video, // Using Video icon for TikTok placeholder
  Plus,
  X as XIcon
} from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useInfluencer } from "../context/InfluencerContext";

// Custom TikTok icon since it's not available in lucide-react
// const TikTokIcon = ({ className }) => (
//   <svg className={className} viewBox="0 0 24 24" fill="currentColor">
//     <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
//   </svg>
// );

const InfluencerEditProfile = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicPreview, setProfilePicPreview] = useState(null); 
  // Get profile data and update function from context
  const { influencerProfile, updateProfile, loading: contextLoading } = useInfluencer();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    bio: "",
    niche: "",
    location: "",
    gender: "",
    age: "",
    languages: "",
    contentTypes: "",
    collaborationTypes: "",
    minBudget: "",
    socialMedia: {
      instagram: { handle: "", followers: "", engagement: "" },
      youtube: { handle: "", subscribers: "", views: "" },
      // tiktok: { handle: "", followers: "", likes: "" },
      twitter: { handle: "", followers: "" }
    }
  });

  // Initialize form when profile loads
  // useEffect(() => {
  //   if (influencerProfile) {
  //     setFormData({
  //       fullName: influencerProfile.fullName || "",
  //       username: influencerProfile.username || "",
  //       email: influencerProfile.email || "",
  //       phone: influencerProfile.phone || "",
  //       bio: influencerProfile.bio || "",
  //       niche: Array.isArray(influencerProfile.niche) 
  //         ? influencerProfile.niche.join(", ")
  //         : influencerProfile.niche || "",
  //       location: influencerProfile.location || "",
  //       gender: influencerProfile.gender || "",
  //       age: influencerProfile.age || "",
  //       languages: Array.isArray(influencerProfile.languages) 
  //         ? influencerProfile.languages.join(", ")
  //         : influencerProfile.languages || "",
  //       contentTypes: Array.isArray(influencerProfile.contentTypes) 
  //         ? influencerProfile.contentTypes.join(", ")
  //         : influencerProfile.contentTypes || "",
  //       collaborationTypes: Array.isArray(influencerProfile.collaborationTypes) 
  //         ? influencerProfile.collaborationTypes.join(", ")
  //         : influencerProfile.collaborationTypes || "",
  //       minBudget: influencerProfile.minBudget || "",
  //       socialMedia: influencerProfile.socialMedia || {
  //         instagram: { handle: "", followers: "", engagement: "" },
  //         youtube: { handle: "", subscribers: "", views: "" },
  //         // tiktok: { handle: "", followers: "", likes: "" },
  //         twitter: { handle: "", followers: "" }
  //       }
  //     });
  //   }
  // }, [influencerProfile]);

  useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/get_influencer`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const profile = res.data;

      // setFormData({
      //   fullName: profile.fullName || "",
      //   username: profile.userName || "",
      //   email: profile.email || "",
      //   phone: profile.phoneNumber || "",
      //   bio: profile.about || "",
      //   niche: Array.isArray(profile.category) ? profile.category.join(", ") : profile.category || "",
      //   location: Array.isArray(profile.locations) ? profile.locations.join(", ") : profile.locations || "",
      //   gender: profile.gender || "",
      //   age: profile.age || "",
      //   languages: Array.isArray(profile.languages) ? profile.languages.join(", ") : profile.languages || "",
      //   contentTypes: Array.isArray(profile.contentTypes) ? profile.contentTypes.join(", ") : profile.contentTypes || "",
      //   collaborationTypes: Array.isArray(profile.collaborationTypes) ? profile.collaborationTypes.join(", ") : profile.collaborationTypes || "",
      //   minBudget: profile.minBudget || "",
      //   socialMedia: profile.socialMedia || {
      //     instagram: { handle: "", followers: "", engagement: "" },
      //     youtube: { handle: "", subscribers: "", views: "" },
      //     twitter: { handle: "", followers: "" }
      //   }
      // });
      setFormData({
  fullName: `${profile.firstName || ""} ${profile.lastName || ""}`,
  username: profile.userName || "",
  email: profile.email || "",
  phone: profile.phoneNumber || "",
  bio: profile.about || "",
  niche: Array.isArray(profile.category) ? profile.category.join(", ") : profile.category || "",
  location: Array.isArray(profile.locations) ? profile.locations.join(", ") : profile.locations || "",
  //gender: profile.gender || "",
  //age: profile.age || "",
  //languages: Array.isArray(profile.languages) ? profile.languages.join(", ") : "",
  contentTypes: Array.isArray(profile.contentTypes) ? profile.contentTypes.join(", ") : "",
  collaborationTypes: Array.isArray(profile.collaborationTypes) ? profile.collaborationTypes.join(", ") : "",
  minBudget: profile.minBudget || "",
  socialMedia: {
    instagram: {
      handle: profile.socialMedia?.instagram?.link || "",
      followers: profile.socialMedia?.instagram?.followers || "",
      engagement: profile.socialMedia?.instagram?.views || ""
    },
    youtube: {
      handle: profile.socialMedia?.youtube?.link || "",
      subscribers: profile.socialMedia?.youtube?.followers || "",
      views: profile.socialMedia?.youtube?.views || ""
    },
    twitter: {
      handle: profile.socialMedia?.twitter?.link || "",
      followers: profile.socialMedia?.twitter?.followers || "",
      views: profile.socialMedia?.twitter?.views || ""
    }
  }
});


      if (profile.profilePhoto) setProfilePic(`${process.env.REACT_APP_BACKEND_URL}/api/${profile.profilePhoto}`);

    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  fetchProfile();
}, []);

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

  // const handleProfilePicChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     if (file.size > 5 * 1024 * 1024) {
  //       toast.error("Image size should be less than 5MB");
  //       return;
  //     }
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       setProfilePic(reader.result);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSaving(true);

  //   try {
  //     // Call update function from context
  //     const result = await updateProfile(formData);
      
  //     if (result.success) {
  //       navigate("/influencer-profile");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

  const handleProfilePicChange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    toast.error("Image size should be less than 5MB");
    return;
  }

  setProfilePic(file); // store the file for form submission

  const reader = new FileReader();
  reader.onloadend = () => {
    setProfilePicPreview(reader.result); // show preview in UI
  };
  reader.readAsDataURL(file);
};

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    const token = localStorage.getItem("authToken");

    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("userName", formData.username);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phone);
    data.append("about", formData.bio);
    data.append("minBudget", formData.minBudget);

    // Convert comma-separated values into arrays for BE
    if (formData.niche) data.append("category", JSON.stringify(formData.niche.split(",").map(n => n.trim())));
    if (formData.location) data.append("locations", JSON.stringify(formData.location.split(",").map(l => l.trim())));
    if (formData.contentTypes) data.append("contentTypes", JSON.stringify(formData.contentTypes.split(",").map(c => c.trim())));
    if (formData.collaborationTypes) data.append("collaborationTypes", JSON.stringify(formData.collaborationTypes.split(",").map(c => c.trim())));
    if (formData.languages) data.append("languages", JSON.stringify(formData.languages.split(",").map(l => l.trim())));

    data.append("gender", formData.gender);
    data.append("age", formData.age);

    // Social media
    data.append("socialMedia", JSON.stringify(formData.socialMedia));

    // Profile pic file
    if (profilePic && profilePic instanceof File) {
      data.append("profilePhoto", profilePic);
    }

    const res = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/api/profile/influencer`,
      data,
      { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
    );

    toast.success("Profile updated successfully 🎉");
    navigate("/influencer-profile");

  } catch (error) {
    toast.error(error.response?.data?.message || "Profile update failed");
  } finally {
    setSaving(false);
  }
};


  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      navigate("/influencer-profile");
    }
  };

  const niches = [
    "Fashion", "Beauty", "Lifestyle", "Travel", "Food",
    "Fitness", "Gaming", "Technology", "Parenting", "Education",
    "Business", "Finance", "Arts", "Music", "Sports"
  ];

  const genderOptions = ["Male", "Female", "Non-binary", "Prefer not to say"];
  const contentTypeOptions = ["Photos", "Videos", "Stories", "Reels", "Blog Posts", "Live Streams"];
  const collaborationOptions = ["Paid Posts", "Product Reviews", "Brand Ambassadorships", "Giveaways", "Events", "Affiliate Marketing"];

  if (contextLoading && !influencerProfile) {
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
    <div className="mt-20">
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => navigate("/influencer-profile")}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-b border-purple-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Edit Influencer Profile</h1>
                <p className="text-gray-600">Update your influencer information and settings</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2.5 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={saving}
                  className="px-5 py-2.5 rounded-lg font-medium bg-purple-700 text-white hover:bg-purple-800 disabled:opacity-50 flex items-center gap-2"
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
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            {/* Profile Picture */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Profile Picture</label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg overflow-hidden">
                      {profilePicPreview ? (
                        <img src={profilePicPreview} alt="Profile preview" className="w-full h-full object-cover" />
                      ) : profilePic ? (
                        <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <User className="h-12 w-12 text-white" />
                      )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-50 shadow-sm cursor-pointer">
                    <Camera className="h-4 w-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePicChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    Upload a clear profile picture. Max file size: 5MB.
                  </p>
                  <button
                    type="button"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Photo
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="@username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="City, State"
                  />
                </div>

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select gender</option>
                    {genderOptions.map(gender => (
                      <option key={gender} value={gender}>{gender}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="28"
                    min="13"
                    max="100"
                  />
                </div> */}

                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Budget ($)
                  </label>
                  <input
                    type="number"
                    name="minBudget"
                    value={formData.minBudget}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="500"
                    min="0"
                  />
                </div> */}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio *
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  This helps brands understand if you're a good fit for their campaigns.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niches *
                </label>
                <input
                  type="text"
                  name="niche"
                  value={formData.niche}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Fashion, Beauty, Lifestyle"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple niches with commas
                </p>
              </div>

              {/* <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages
                </label>
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="English, Spanish, French"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate multiple languages with commas
                </p>
              </div> */}
            </div>

            {/* Social Media */}
            <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Social Media Profiles</h3>
              
              <div className="space-y-4">
                {Object.entries(formData.socialMedia).map(([platform, data]) => {
                  if (platform === "tiktok") return null; // Skip rendering TikTok
                  const icons = {
                    instagram: Instagram,
                    youtube: Youtube,
                    // tiktok: TikTokIcon, // Using custom TikTokIcon
                    twitter: Twitter
                  };
                  const Icon = icons[platform];
                  
                  return (
                    <div key={platform} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Icon className="h-5 w-5 text-gray-700" />
                        <h4 className="font-medium text-gray-900 capitalize">{platform}</h4>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Handle
                          </label>
                          <input
                            type="text"
                            value={data.handle}
                            onChange={(e) => handleSocialMediaChange(platform, "handle", e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder={`@${platform}username`}
                          />
                        </div>
                        
                        {platform === "instagram" && (
                          <>
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
                                Engagement Rate
                              </label>
                              <input
                                type="text"
                                value={data.engagement}
                                onChange={(e) => handleSocialMediaChange(platform, "engagement", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="4.8%"
                              />
                            </div>
                          </>
                        )}
                        
                        {platform === "youtube" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Subscribers
                              </label>
                              <input
                                type="text"
                                value={data.subscribers}
                                onChange={(e) => handleSocialMediaChange(platform, "subscribers", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="85K"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total Views
                              </label>
                              <input
                                type="text"
                                value={data.views}
                                onChange={(e) => handleSocialMediaChange(platform, "views", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="2.5M"
                              />
                            </div>
                          </>
                        )}
                        
                         {platform === "tiktok" && (
                          <>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Followers
                              </label>
                              <input
                                type="text"
                                value={data.followers}
                                onChange={(e) => handleSocialMediaChange(platform, "followers", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="210K"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Total Likes
                              </label>
                              <input
                                type="text"
                                value={data.likes}
                                onChange={(e) => handleSocialMediaChange(platform, "likes", e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder="5.2M"
                              />
                            </div>
                          </>
                        )}
                        
                        {platform === "twitter" && (
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Followers
                            </label>
                            <input
                              type="text"
                              value={data.followers}
                              onChange={(e) => handleSocialMediaChange(platform, "followers", e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="45K"
                            />
                          </div>
                        )} 
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Content & Collaboration Preferences
            <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Preferences</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content Types
                  </label>
                  <input
                    type="text"
                    name="contentTypes"
                    value={formData.contentTypes}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Photos, Videos, Stories"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    What type of content do you create?
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Collaboration Types
                  </label>
                  <input
                    type="text"
                    name="collaborationTypes"
                    value={formData.collaborationTypes}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Paid Posts, Product Reviews"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    What types of collaborations are you interested in?
                  </p>
                </div>
              </div>
            </div> */}

            {/* Form Actions */}
            <div className="mt-8 pt-8 border-t border-gray-200 flex justify-end gap-3">
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
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InfluencerEditProfile;