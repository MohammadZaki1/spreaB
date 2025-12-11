// src/pages/BrandEditProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  Camera,
  ArrowLeft,
  Save,
  X,
  Upload
} from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useBrand } from "../context/BrandContext"; // Import context

const BrandEditProfilePage = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  
  // Get profile data and update function from context
  const { brandProfile, updateProfile, loading: contextLoading } = useBrand();

  // Form state
  const [formData, setFormData] = useState({
    brandName: "",
    industry: "",
    website: "",
    description: "",
    email: "",
    phone: "",
    locations: "",
    socialMedia: {
      instagram: "",
      youtube: "",
      twitter: "",
      // tiktok: "",
      // facebook: "",
      // linkedin: ""
    }
  });

  // // Initialize form when profile loads
  // useEffect(() => {
  //   if (brandProfile) {
  //     setFormData({
  //       brandName: brandProfile.brandName || "",
  //       industry: brandProfile.industry || "",
  //       website: brandProfile.website || "",
  //       description: brandProfile.description || "",
  //       email: brandProfile.email || "",
  //       phone: brandProfile.phone || "",
  //       locations: Array.isArray(brandProfile.locations) 
  //         ? brandProfile.locations.join(", ")
  //         : brandProfile.locations || "",
  //       socialMedia: {
  //         instagram: brandProfile.socialMedia?.instagram || "",
  //         youtube: brandProfile.socialMedia?.youtube || "",
  //         twitter: brandProfile.socialMedia?.twitter || "",
  //         // tiktok: brandProfile.socialMedia?.tiktok || "",
  //         facebook: brandProfile.socialMedia?.facebook || "",
  //         linkedin: brandProfile.socialMedia?.linkedin || ""
  //       }
  //     });
  //   }
  // }, [brandProfile]);
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/profile/brand-owner`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          brandName: data.brandName || "",
          industry: data.industry || "",
          website: data.website || "",
          description: data.description || "",
          email: data.email || "",
          phone: data.phone || "",
          locations: Array.isArray(data.locations) ? data.locations.join(", ") : data.locations || "",
          socialMedia: {
            instagram: data.socialMedia?.instagram || "",
            youtube: data.socialMedia?.youtube || "",
            twitter: data.socialMedia?.twitter || "",
            // facebook: data.socialMedia?.facebook || "",
            // linkedin: data.socialMedia?.linkedin || ""
          }
        });

        if (data.brandLogo) {
          setLogoPreview(`${process.env.REACT_APP_BACKEND_URL}/api/${data.brandLogo}`);
        }

      } else {
        toast.error(data.message || "Failed to fetch profile");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch profile");
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

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setSaving(true);

  //   try {
  //     // Call update function from context
  //     const result = await updateProfile(formData);
      
  //     if (result.success) {
  //       navigate("/brand-profile");
  //     }
  //   } catch (error) {
  //     toast.error("Failed to update profile");
  //   } finally {
  //     setSaving(false);
  //   }
  // };

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
    formDataToSend.append("locations", JSON.stringify(formData.locations.split(",").map(loc => loc.trim())));

    // Append social media
    formDataToSend.append("socialMedia", JSON.stringify(formData.socialMedia));

    // Append logo file if selected
    const logoFileInput = document.querySelector('input[type="file"]');
    if (logoFileInput && logoFileInput.files[0]) {
      formDataToSend.append("brandLogo", logoFileInput.files[0]);
    }

    // Make PATCH request
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
      navigate("/brand-profile");
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
    if (window.confirm("Are you sure you want to cancel? Any unsaved changes will be lost.")) {
      navigate("/brand-profile");
    }
  };

  const industries = [
    "Fashion & Lifestyle",
    "Beauty & Personal Care",
    "Technology & Gadgets",
    "Food & Beverage",
    "Health & Fitness",
    "Travel & Hospitality",
    "Automotive",
    "Education",
    "Entertainment",
    "Finance",
    "Home & Garden",
    "Sports & Outdoors",
    "Other"
  ];

  if (contextLoading && !brandProfile) {
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
     <div className="mt-20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <button
            onClick={() => navigate("/brand-profile")}
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
                <h1 className="text-2xl font-bold text-gray-900">Edit Brand Profile</h1>
                <p className="text-gray-600">Update your brand information and settings</p>
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
            {/* Logo Upload */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 mb-4">Brand Logo</label>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg overflow-hidden">
                    {logoPreview ? (
                      <img 
                        src={logoPreview} 
                        alt="Logo preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building2 className="h-12 w-12 text-white" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-white border border-gray-300 rounded-full p-2 hover:bg-gray-50 shadow-sm cursor-pointer">
                    <Camera className="h-4 w-4 text-gray-600" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-2">
                    Upload a high-quality logo. Max file size: 5MB.
                  </p>
                  <button
                    type="button"
                    onClick={() => document.querySelector('input[type="file"]').click()}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Logo
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
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    name="brandName"
                    value={formData.brandName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your brand name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry *
                  </label>
                  <select
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select industry</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website *
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="https://example.com"
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
                    placeholder="contact@brand.com"
                  />
                </div>

                {/* <div>
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
                </div> */}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Locations
                  </label>
                  <input
                    type="text"
                    name="locations"
                    value={formData.locations}
                    onChange={handleChange}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="New York, Los Angeles, Miami"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple locations with commas</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Describe your brand, mission, and values..."
                />
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-6 mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Social Media Profiles</h3>

              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(formData.socialMedia).map(([platform, value]) => (
                  <div key={platform}>
                    <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                      {platform}
                    </label>
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleSocialMediaChange(platform, e.target.value)}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder={`@${platform}username`}
                    />
                  </div>
                ))}
              </div>
            </div>

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

export default BrandEditProfilePage;