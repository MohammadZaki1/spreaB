// src/pages/Influencer-profile.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Users,
  TrendingUp,
  Award,
  DollarSign,
  Star,
  Camera,
  Video,
  MessageSquare,
  Link2,
  Instagram,
  Youtube,
  Twitter,
  Edit,
  LogOut,
  Calendar,
  FileText,
  CheckCircle,
  ChevronRight
} from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useInfluencer } from "../context/InfluencerContext";

// Custom TikTok icon since it's not available in lucide-react
const TikTokIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
  </svg>
);

// Reusable components
const StatCard = ({ icon: Icon, label, value, color = "purple" }) => (
  <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-lg bg-${color}-100`}>
        <Icon className={`h-5 w-5 text-${color}-600`} />
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-sm text-gray-600">{label}</p>
      </div>
    </div>
  </div>
);

const SocialPlatformCard = ({ platform, data }) => {
  const icons = {
    instagram: Instagram,
    youtube: Youtube,
    tiktok: TikTokIcon, // Use custom TikTokIcon
    twitter: Twitter
  };
  
  const Icon = icons[platform];
  const colors = {
    instagram: "from-purple-500 to-pink-500",
    youtube: "from-red-500 to-orange-500",
    tiktok: "from-black to-purple-700",
    twitter: "from-blue-400 to-blue-600"
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colors[platform]}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-semibold text-gray-900 capitalize">{platform}</p>
          <p className="text-sm text-gray-600">{data.handle}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <p className="text-xs text-gray-500">Followers</p>
          <p className="font-bold text-gray-900">{data.followers}</p>
        </div>
        {data.engagement && (
          <div>
            <p className="text-xs text-gray-500">Engagement</p>
            <p className="font-bold text-green-600">{data.engagement}</p>
          </div>
        )}
        {data.subscribers && (
          <div>
            <p className="text-xs text-gray-500">Subscribers</p>
            <p className="font-bold text-gray-900">{data.subscribers}</p>
          </div>
        )}
        {data.views && (
          <div>
            <p className="text-xs text-gray-500">Views</p>
            <p className="font-bold text-gray-900">{data.views}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const InfluencerProfile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Get profile data from context
  const { influencerProfile, loading } = useInfluencer();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleEditProfile = () => {
    navigate("/influencereditprofile");
  };

  if (loading && !influencerProfile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="text-purple-700">Loading profile...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="mt-20">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl shadow-sm border border-purple-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-start gap-6">
                <div className="relative">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <User className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white border border-gray-300 rounded-full p-1 shadow-sm">
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{influencerProfile.fullName}</h1>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {influencerProfile.niche.join(", ")}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Verified Influencer
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 max-w-2xl">{influencerProfile.bio}</p>

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-purple-600" />
                      {influencerProfile.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4 text-purple-600" />
                      {influencerProfile.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin className="h-4 w-4 text-purple-600" />
                      {influencerProfile.location}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe className="h-4 w-4 text-purple-600" />
                      {influencerProfile.username}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleEditProfile}
                  className="px-5 py-2.5 rounded-lg font-medium bg-purple-700 text-white hover:bg-purple-800 transition flex items-center gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2.5 rounded-lg font-medium border border-red-300 text-red-700 hover:bg-orange-50 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={TrendingUp} label="Total Campaigns" value={influencerProfile.totalCampaigns} color="blue" />
            <StatCard icon={Award} label="Completed" value={influencerProfile.completedCampaigns} color="green" />
            <StatCard icon={DollarSign} label="Total Earnings" value={`$${influencerProfile.totalEarnings.toLocaleString()}`} color="purple" />
            <StatCard icon={Star} label="Average Rating" value={influencerProfile.averageRating} color="orange" />
          </div> */}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2">
              {/* Social Media Platforms */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Social Media Platforms</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(influencerProfile.socialMedia).map(([platform, data]) => (
                    <SocialPlatformCard key={platform} platform={platform} data={data} />
                  ))}
                </div>
              </div>

              {/* About Me */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">About Me</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                    <p className="text-gray-600">{influencerProfile.bio}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Personal Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gender</span>
                          <span className="font-medium">{influencerProfile.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Age</span>
                          <span className="font-medium">{influencerProfile.age}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location</span>
                          <span className="font-medium">{influencerProfile.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {influencerProfile.languages.map((lang, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {lang}
                          </span>
                        ))}
                      </div>

                      <h4 className="font-medium text-gray-900 mt-4 mb-2">Content Types</h4>
                      <div className="flex flex-wrap gap-2">
                        {influencerProfile.contentTypes.map((type, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Collaboration Preferences</h4>
                    <div className="flex flex-wrap gap-2">
                      {influencerProfile.collaborationTypes.map((type, index) => (
                        <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Minimum Budget</h4>
                    <p className="text-2xl font-bold text-purple-700">${influencerProfile.minBudget}+</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Verification Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                <div className="space-y-3">
                  {Object.entries(influencerProfile.verification).map(([key, verified]) => (
                    <div key={key} className="flex items-center justify-between">
                      <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      {verified ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <span className="text-sm text-gray-500">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-sm text-purple-700 hover:text-purple-800 font-medium">
                  Complete verification →
                </button>
              </div>

              {/* Quick Stats */}
              {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Total Reach</p>
                        <p className="text-sm text-gray-600">Across all platforms</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">420K</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <MessageSquare className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Avg. Engagement</p>
                        <p className="text-sm text-gray-600">Last 30 days</p>
                      </div>
                    </div>
                    <span className="font-bold text-green-600">5.2%</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Calendar className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Response Time</p>
                        <p className="text-sm text-gray-600">Avg. hours</p>
                      </div>
                    </div>
                    <span className="font-bold text-gray-900">4.5h</span>
                  </div>
                </div>
              </div> */}

              {/* Portfolio Preview */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio</h3>
                <div className="space-y-3">
                  {influencerProfile.portfolio.slice(0, 3).map(item => (
                    <div key={item.id} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        {item.type === "video" ? (
                          <Video className="h-4 w-4 text-purple-600" />
                        ) : (
                          <Camera className="h-4 w-4 text-purple-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-gray-600">{item.brand}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-sm text-purple-700 hover:text-purple-800 font-medium">
                  View full portfolio →
                </button>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100 p-6">
                <MessageSquare className="h-8 w-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-sm text-gray-600 mb-3">Our support team is here to help you 24/7</p>
                <button className="w-full bg-purple-700 text-white py-2 rounded-lg font-medium hover:bg-purple-800 transition">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default InfluencerProfile;