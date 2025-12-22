// src/pages/BrandProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  Camera,
  Edit,
  Globe,
  Mail,
  Phone,
  MapPin,
  Star,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Linkedin,
  Save,
  X,
  Upload,
  Briefcase,
  FileText,
  Users
} from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useBrand } from "../context/BrandContext";

const BrandProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [brandProfile, setBrandProfile] = useState(null);
  //const { brandProfile, updateProfile, loading: contextLoading } = useBrand();
const navigate = useNavigate();
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    website: "",
    description: "",
    email: "",
    phone: "",
    rating: "",
    locations: "",
    socialMedia: {
      instagram: "",
      youtube: "",
      twitter: "",
      facebook: "",
      linkedin: ""
    }
  });

 useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/brand-owner`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setBrandProfile(data);
      setFormData({
        brandName: data.brandName || "",
        industry: data.industry || "",
        website: data.website || "",
        description: data.description || "",
        email: data.email || "",
        phone: data.phone || "",
        rating: data.rating || "",
        locations: Array.isArray(data.locations) ? data.locations.join(", ") : "",
        socialMedia: {
          instagram: data.socialMedia?.instagram || "",
          youtube: data.socialMedia?.youtube || "",
          twitter: data.socialMedia?.twitter || "",
          facebook: data.socialMedia?.facebook || "",
          linkedin: data.socialMedia?.linkedin || ""
        }
      });

      if (data.brandLogo) {
        setLogoPreview(`${process.env.REACT_APP_BACKEND_URL}/api/${data.brandLogo}`);
      }
    } catch (err) {
      toast.error(err.message || "Failed to load profile");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Logo size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setSaving(true);

  try {
    const formDataToSend = new FormData();

    // Append simple fields
    formDataToSend.append("brandName", formData.brandName);
    formDataToSend.append("industry", formData.industry);
    formDataToSend.append("website", formData.website);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("rating", formData.rating);
    
    // Handle locations - convert string to array
    if (formData.locations) {
      formDataToSend.append("locations", JSON.stringify(
        formData.locations.split(",").map(loc => loc.trim()).filter(loc => loc)
      ));
    }

    // Social media
    formDataToSend.append("socialMedia", JSON.stringify(formData.socialMedia));

    // Logo file if selected
    const logoFileInput = document.querySelector('input[type="file"]');
    if (logoFileInput && logoFileInput.files[0]) {
      formDataToSend.append("brandLogo", logoFileInput.files[0]);
    }

    // PATCH request
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/brand-owner`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`
      },
      body: formDataToSend
    });

    const data = await res.json();
    if (res.ok) {
      toast.success("Profile updated successfully");
      
      // CRITICAL FIX: Update local state with new data
      setBrandProfile({
        ...brandProfile,
        ...formData,
        locations: formData.locations.split(",").map(loc => loc.trim()).filter(loc => loc),
        socialMedia: formData.socialMedia
      });
      
      // CRITICAL FIX: Exit edit mode and stay on page
      setIsEditing(false);
      
      // Optional: Refresh data from server
      await fetchProfile();
      
    } else {
      toast.error(data.message || "Failed to update profile");
    }

  } catch (err) {
    console.error(err);
    toast.error("Failed to update profile");
  } finally {
    setSaving(false);
  }
};

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to discard changes?")) {
      setIsEditing(false);
      if (brandProfile) {
        setFormData({
          brandName: brandProfile.brandName || "",
          industry: brandProfile.industry || "",
          website: brandProfile.website || "",
          description: brandProfile.description || "",
          rating: brandProfile.rating || "",
          email: brandProfile.email || "",
          phone: brandProfile.phone || "",
          locations: Array.isArray(brandProfile.locations) 
            ? brandProfile.locations.join(", ")
            : brandProfile.locations || "",
          socialMedia: {
            instagram: brandProfile.socialMedia?.instagram || "",
            youtube: brandProfile.socialMedia?.youtube || "",
            twitter: brandProfile.socialMedia?.twitter || "",
            facebook: brandProfile.socialMedia?.facebook || "",
            linkedin: brandProfile.socialMedia?.linkedin || ""
          }
        });
      }
    }
  };

  const socialMediaIcons = {
    instagram: <Instagram className="h-5 w-5" />,
    youtube: <Youtube className="h-5 w-5" />,
    twitter: <Twitter className="h-5 w-5" />,
    facebook: <Facebook className="h-5 w-5" />,
    linkedin: <Linkedin className="h-5 w-5" />
  };

  // if (contextLoading && !brandProfile) {
  //   return (
  //     <div className="min-h-screen bg-gray-50">
  //       <Header />
  //       <div className="container mx-auto px-4 py-32 text-center">
  //         <div className="text-purple-700">Loading...</div>
  //       </div>
  //       <Footer />
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Brand Profile</h1>
              <p className="text-gray-600">View and manage your brand information</p>
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
                    {/* Logo Section */}
                    <div className="relative mb-4">
                      <div className="w-40 h-40 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden">
                        {logoPreview ? (
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : brandProfile?.logo ? (
                          <img 
                            src={brandProfile.logo} 
                            alt={brandProfile.brandName} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500">
                            <Building2 className="h-16 w-16 text-white" />
                          </div>
                        )}
                      </div>
                      {isEditing && (
                        <label className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 cursor-pointer transition-colors">
                          <Camera className="h-5 w-5 text-gray-700" />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleLogoChange}
                            className="hidden"
                          />
                        </label>
                      )}
                    </div>

                    {/* Brand Name & Industry */}
                    <div className="text-white">
                      {isEditing ? (
                        <>
                          <input
                            type="text"
                            name="brandName"
                            value={formData.brandName}
                            onChange={handleChange}
                            required
                            className="text-2xl font-bold bg-transparent text-center border-b border-white/50 focus:outline-none focus:border-white w-full mb-2 text-white placeholder-white/70"
                            placeholder="Brand Name"
                          />
                          <input
                            type="text"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            className="text-lg bg-transparent text-center border-b border-white/50 focus:outline-none focus:border-white w-full text-white placeholder-white/70"
                            placeholder="Industry"
                          />
                        </>
                      ) : (
                        <>
                          <h2 className="text-2xl font-bold">{brandProfile?.brandName}</h2>
                          <p className="text-lg opacity-90">{brandProfile?.industry}</p>
                        </>
                      )}
                    </div>

                    {/* Rating */}
                    <div className="mt-4 flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(brandProfile?.rating || 0)
                                ? "text-yellow-300 fill-yellow-300"
                                : "text-white/30"
                            }`}
                          />
                        ))}
                      </div>
                      {isEditing ? (
                        <input
                          type="number"
                          name="rating"
                          value={formData.rating}
                          onChange={handleChange}
                          className="w-16 px-2 py-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded text-sm text-white"
                          placeholder="4.5"
                          min="0"
                          max="5"
                          step="0.1"
                        />
                      ) : (
                        <span className="text-white font-medium">
                          {brandProfile?.rating ? `${brandProfile.rating}/5` : "No rating"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Body - Quick Info */}
                <div className="p-6">
                  <div className="space-y-4">
                    {/* Website */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Globe className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Website</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-900"
                            placeholder="https://example.com"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium truncate">{brandProfile?.website}</p>
                        )}
                      </div>
                    </div>

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
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-900"
                            placeholder="contact@brand.com"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium truncate">{brandProfile?.email}</p>
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
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-900"
                            placeholder="+1 (555) 123-4567"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{brandProfile?.phone || "Not provided"}</p>
                        )}
                      </div>
                    </div>

                    {/* Locations */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">Locations</p>
                        {isEditing ? (
                          <input
                            type="text"
                            name="locations"
                            value={formData.locations}
                            onChange={handleChange}
                            className="w-full bg-transparent border-b border-gray-300 focus:outline-none focus:border-purple-500 text-gray-900"
                            placeholder="New York, LA, Miami"
                          />
                        ) : (
                          <p className="text-gray-900 font-medium">{brandProfile?.locations || "Not specified"}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Social Media Links (in card) */}
                  {(brandProfile?.socialMedia && Object.values(brandProfile.socialMedia).some(val => val)) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="text-sm font-medium text-gray-500 mb-4">Social Media</h4>
                      <div className="grid grid-cols-5 gap-3">
                        {Object.entries(brandProfile.socialMedia).map(([platform, url]) => (
                          url ? (
                            <div
                              key={platform}
                              className="flex flex-col items-center p-2 bg-gray-50 rounded-lg"
                            >
                              {socialMediaIcons[platform]}
                              <span className="text-xs text-gray-600 mt-1 truncate w-full text-center">
                                {url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0]}
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
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* Tabs/Navigation */}
                <div className="border-b border-gray-200">
                  <div className="px-6 py-4">
                    <h3 className="text-xl font-semibold text-gray-900">Brand Details</h3>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6">
                  {isEditing ? (
                    // Edit Mode Form
                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Description Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                          <FileText className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Brand Description</h4>
                        </div>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          required
                          rows={8}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                          placeholder="Describe your brand, mission, values, and what makes you unique..."
                        />
                      </div>

                      {/* Social Media Details Section */}
                      <div className="space-y-6 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Users className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Social Media Profiles</h4>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          {Object.entries(formData.socialMedia).map(([platform, value]) => (
                            <div key={platform} className="space-y-2">
                              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                                {socialMediaIcons[platform]}
                                <span className="capitalize">{platform}</span>
                              </label>
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                placeholder={`Enter ${platform} username or URL`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Additional Info Section */}
                      <div className="space-y-6 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-4">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Additional Information</h4>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Industry Category
                            </label>
                            <input
                              type="text"
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="e.g., Fashion & Lifestyle"
                            />
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">
                              Brand Rating
                            </label>
                            <input
                              type="number"
                              name="rating"
                              value={formData.rating}
                              onChange={handleChange}
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Enter rating (0-5)"
                              min="0"
                              max="5"
                              step="0.1"
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  ) : (
                    // View Mode
                    <div className="space-y-8">
                      {/* Description Section */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <FileText className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">About Us</h4>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                            {brandProfile?.description || "No description provided."}
                          </p>
                        </div>
                      </div>

                      {/* Social Media Details */}
                      {brandProfile?.socialMedia && Object.values(brandProfile.socialMedia).some(val => val) && (
                        <div className="space-y-6 pt-8 border-t border-gray-200">
                          <div className="flex items-center gap-2">
                            <Users className="h-5 w-5 text-purple-600" />
                            <h4 className="text-lg font-semibold text-gray-900">Social Media Profiles</h4>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            {Object.entries(brandProfile.socialMedia).map(([platform, url]) => (
                              url && (
                                <div key={platform} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                                  <div className="p-2 bg-white rounded-lg shadow-sm">
                                    {socialMediaIcons[platform]}
                                  </div>
                                  <div className="flex-1">
                                    <p className="text-sm text-gray-500 capitalize">{platform}</p>
                                    <p className="text-gray-900 font-medium truncate">{url}</p>
                                  </div>
                                </div>
                              )
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Additional Info Section */}
                      <div className="space-y-6 pt-8 border-t border-gray-200">
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-purple-600" />
                          <h4 className="text-lg font-semibold text-gray-900">Additional Information</h4>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500">Industry Category</p>
                            <p className="text-gray-900 font-medium mt-1">{brandProfile?.industry}</p>
                          </div>

                          <div className="p-4 bg-gray-50 rounded-xl">
                            <p className="text-sm text-gray-500">Rating</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.floor(brandProfile?.rating || 0)
                                        ? "text-yellow-400 fill-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-gray-900 font-medium">
                                {brandProfile?.rating ? `${brandProfile.rating}/5` : "Not rated"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default BrandProfilePage;