// src/pages/InfluencerProfileForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Upload, MapPin, CheckCircle, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Header from "../components/Navbar";
import Footer from "../components/Footer";

// Categories
const CategoryOptions = [
  { value: "", label: "Select Category" },
  { value: "Fashion", label: "Fashion" },
  { value: "Food", label: "Food" },
  { value: "Beauty", label: "Beauty" },
  { value: "Fitness", label: "Fitness" },
  { value: "Travel", label: "Travel" },
  { value: "Gaming", label: "Gaming" },
  { value: "Technology", label: "Technology" },
  { value: "Lifestyle", label: "Lifestyle" },
  { value: "Art", label: "Art" },
  { value: "Music", label: "Music" },
  { value: "Education", label: "Education" },
  { value: "Business", label: "Business" },
  { value: "Parenting", label: "Parenting" },
  { value: "Sports", label: "Sports" }
];

// Button Component
const Button = ({ children, className, ...props }) => (
  <button
    className={`px-4 py-2 font-semibold text-sm rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const InfluencerProfileForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewPhoto, setPreviewPhoto] = useState(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [about, setAbout] = useState("");
  const [location, setLocation] = useState("");

  const [primaryCategory, setPrimaryCategory] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");

  const [portfolioLinks, setPortfolioLinks] = useState([""]);

  const [socialMedia, setSocialMedia] = useState({
    instagram: { link: "", followers: "", views: "" },
    youtube: { link: "", followers: "", views: "" },
    twitter: { link: "", followers: "", views: "" },
  });

  // Handlers
  const addPortfolioLink = () => setPortfolioLinks([...portfolioLinks, ""]);

  const updatePortfolio = (index, value) => {
    const arr = [...portfolioLinks];
    arr[index] = value;
    setPortfolioLinks(arr);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    setProfilePhoto(file);
    setPreviewPhoto(URL.createObjectURL(file));
  };

  const updateSocialMedia = (platform, field, value) => {
    setSocialMedia({
      ...socialMedia,
      [platform]: { ...socialMedia[platform], [field]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Basic information
      formData.append("firstName", firstName.trim());
      formData.append("lastName", lastName.trim());
      formData.append("userName", userName.trim());
      formData.append("phoneNumber", phoneNumber.trim());
      formData.append("about", about.trim());

      // Location as array
      if (location.trim()) {
        formData.append("locations", JSON.stringify([location.trim()]));
      }

      // Categories
      const categories = [];
      if (primaryCategory) categories.push(primaryCategory);
      if (secondaryCategory) categories.push(secondaryCategory);
      if (categories.length > 0) {
        formData.append("category", JSON.stringify(categories));
      }

      // Portfolio links
      const validPortfolioLinks = portfolioLinks.filter(link => link.trim());
      if (validPortfolioLinks.length > 0) {
        formData.append("portfolioLinks", JSON.stringify(validPortfolioLinks));
      }

      // Social media
      const socialMediaData = {
        instagram: {
          link: socialMedia.instagram.link.trim(),
          followers: parseInt(socialMedia.instagram.followers) || 0,
          views: parseInt(socialMedia.instagram.views) || 0
        },
        youtube: {
          link: socialMedia.youtube.link.trim(),
          followers: parseInt(socialMedia.youtube.followers) || 0,
          views: parseInt(socialMedia.youtube.views) || 0
        },
        twitter: {
          link: socialMedia.twitter.link.trim(),
          followers: parseInt(socialMedia.twitter.followers) || 0,
          views: parseInt(socialMedia.twitter.views) || 0
        }
      };
      formData.append("socialMedia", JSON.stringify(socialMediaData));

      // Profile photo
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }

      const token = localStorage.getItem("authToken");

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/profile/influencer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Profile Created Successfully!");
      navigate("/influencer-profile");
      
    } catch (error) {
      console.error("Profile creation error:", error);
      toast.error(error.response?.data?.message || "Failed to create profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="mt-20">
        <div className="w-full flex justify-center py-12">
          <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8">

            {/* Title + Profile Photo */}
            <div className="flex items-center justify-between mb-6 gap-6">
              <div>
                <p className="text-2xl font-semibold text-purple-700">Create Your Influencer Identity</p>
                <p className="text-sm text-gray-500">
                  Grow your audience, collaborate with brands, and make an impact
                </p>
              </div>

              <div className="flex-shrink-0">
                <label className="cursor-pointer flex flex-col items-center">
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={handlePhotoUpload}
                    accept="image/*"
                  />
                  <div className="w-28 h-28 rounded-full border overflow-hidden flex items-center justify-center bg-gray-100">
                    {previewPhoto ? (
                      <img src={previewPhoto} alt="Profile" className="object-cover w-full h-full" />
                    ) : (
                      <Upload className="text-gray-400" size={32} />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Upload Profile Photo</p>
                </label>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Basic Fields */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-semibold text-purple-600">First Name *</label>
                  <input
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter first name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-600">Last Name *</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter last name"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-600">Username *</label>
                  <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="@username"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-purple-600">Phone Number *</label>
                  <input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                {/* Primary Category */}
                <div>
                  <label className="text-sm font-semibold text-purple-600">Primary Category *</label>
                  <select
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={primaryCategory}
                    onChange={(e) => setPrimaryCategory(e.target.value)}
                    required
                  >
                    {CategoryOptions.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>

                {/* Secondary Category */}
                <div>
                  <label className="text-sm font-semibold text-purple-600">Secondary Category</label>
                  <select
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={secondaryCategory}
                    onChange={(e) => setSecondaryCategory(e.target.value)}
                  >
                    {CategoryOptions.map((c) => (
                      <option key={c.value} value={c.value}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* About */}
              <div className="mt-6">
                <label className="text-sm font-medium">About / Bio *</label>
                <textarea
                  rows={3}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Tell brands about yourself, your content style, and what makes you unique..."
                  required
                />
              </div>

              {/* Location */}
              <div className="mt-6">
                <label className="text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} /> Location *
                </label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="City, State, Country"
                  required
                />
              </div>

              {/* Portfolio */}
              <div className="mt-8">
                <p className="text-lg font-semibold text-purple-600">Portfolio Links</p>
                <p className="text-sm text-gray-500 mb-2">Add links to your best work</p>
                
                {portfolioLinks.map((value, index) => (
                  <input
                    key={index}
                    value={value}
                    className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="https://yourportfolio.com"
                    onChange={(e) => updatePortfolio(index, e.target.value)}
                  />
                ))}

                <button 
                  type="button"
                  onClick={addPortfolioLink} 
                  className="text-sm text-purple-600 mt-2 hover:text-purple-700"
                >
                  + Add another link
                </button>
              </div>

              {/* Social Media */}
              <div className="mt-10">
                <p className="text-lg font-semibold text-purple-600">
                  Social Media Accounts & Audience
                </p>
                <p className="text-sm text-gray-500 mb-4">Add your social media profiles to showcase your reach</p>

                <div className="grid grid-cols-3 gap-6">
                  
                  {/* Instagram */}
                  <div>
                    <label className="text-sm font-medium">Instagram</label>
                    <input
                      value={socialMedia.instagram.link}
                      onChange={(e) => updateSocialMedia("instagram", "link", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://instagram.com/@username"
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        value={socialMedia.instagram.followers}
                        onChange={(e) => updateSocialMedia("instagram", "followers", e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Followers"
                        type="number"
                      />
                      <input
                        value={socialMedia.instagram.views}
                        onChange={(e) => updateSocialMedia("instagram", "views", e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Avg Views"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* YouTube */}
                  <div>
                    <label className="text-sm font-medium">YouTube</label>
                    <input
                      value={socialMedia.youtube.link}
                      onChange={(e) => updateSocialMedia("youtube", "link", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://youtube.com/@username"
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        value={socialMedia.youtube.followers}
                        onChange={(e) => updateSocialMedia("youtube", "followers", e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Subscribers"
                        type="number"
                      />
                      <input
                        value={socialMedia.youtube.views}
                        onChange={(e) => updateSocialMedia("youtube", "views", e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Total Views"
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Twitter */}
                  <div>
                    <label className="text-sm font-medium">Twitter</label>
                    <input
                      value={socialMedia.twitter.link}
                      onChange={(e) => updateSocialMedia("twitter", "link", e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="https://twitter.com/@username"
                    />
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <input
                        value={socialMedia.twitter.followers}
                        onChange={(e) => updateSocialMedia("twitter", "followers", e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Followers"
                        type="number"
                      />
                      <input
                        value={socialMedia.twitter.views}
                        onChange={(e) => updateSocialMedia("twitter", "views", e.target.value)}
                        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Avg Views"
                        type="number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div className="mt-6">
                <label className="text-sm font-medium">Verification Status</label>
                <div className="flex gap-5 mt-2">
                  <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18} />Email Verified</div>
                  <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18} />Phone Verified</div>
                  <div className="flex items-center gap-2"><CheckCircle className="text-purple-600" size={18} />Profile Verification Pending</div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-700 text-white hover:bg-purple-800 px-6 py-2 shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Creating Profile...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save & Complete Profile
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfluencerProfileForm;