// src/pages/BrandProfilePage.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import {
  Building2,
  MapPin,
  Globe,
  Phone,
  Mail,
  Lock,
  Bell,
  Shield,
  Wallet,
  Settings,
  Camera,
  Edit,
  Save,
  LogOut,
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Link2,
  FileText,
  CreditCard,
  MessageSquare,
  Star,
  Eye,
  EyeOff
} from "lucide-react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { useBrand } from "../context/BrandContext";

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

const VerificationBadge = ({ verified, label }) => (
  <div className="flex items-center gap-2">
    {verified ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-gray-400" />
    )}
    <span className={`text-sm ${verified ? 'text-green-600' : 'text-gray-500'}`}>
      {label}
    </span>
  </div>
);

const BrandProfilePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  
  // Get profile data from context
  const { brandProfile, loading } = useBrand();

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Notification preferences
  const [notifications, setNotifications] = useState({
    emailCampaigns: true,
    emailMessages: true,
    pushMessages: true,
    creatorApplications: true,
    paymentUpdates: true,
    newsletter: false
  });

  // Recent activity
  // const [recentActivity, setRecentActivity] = useState([
  //   { id: 1, action: "New campaign launched", date: "2 hours ago", type: "campaign" },
  //   { id: 2, action: "Payment to creator @styledbyjane", date: "1 day ago", type: "payment" },
  //   { id: 3, action: "Profile updated", date: "2 days ago", type: "update" },
  //   { id: 4, action: "New creator application", date: "3 days ago", type: "application" }
  // ]);

  // Stats data (you can move this to context if needed)
  // const [stats, setStats] = useState({
  //   activeCampaigns: 3,
  //   totalCreators: 45,
  //   totalSpent: brandProfile?.wallet || 12500,
  //   roi: 285
  // });

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    try {
      // await axios.post('/api/brand/change-password', passwordForm);
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success("Password updated successfully");
    } catch (error) {
      toast.error("Failed to update password");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
    toast.success("Logged out successfully");
  };

  const handleEditProfile = () => {
    navigate("/brandeditprofile");
  };

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (loading && !brandProfile) {
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
                  <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Building2 className="h-12 w-12 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{brandProfile.brandName}</h1>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                        {brandProfile.industry}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        Verified Business
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 max-w-2xl">{brandProfile.description}</p>

                  {/* Verification Status */}
                  {/* <div className="flex flex-wrap gap-4 mb-4">
                    <VerificationBadge verified={brandProfile.verification.email} label="Email Verified" />
                    <VerificationBadge verified={brandProfile.verification.phone} label="Phone Verified" />
                    <VerificationBadge verified={brandProfile.verification.business} label="Business Verified" />
                  </div> */}

                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Globe className="h-4 w-4 text-purple-600" />
                      <a href={brandProfile.website} className="hover:text-purple-700 hover:underline">
                        {brandProfile.website}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Phone className="h-4 w-4 text-purple-600" />
                      {brandProfile.phone}
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Mail className="h-4 w-4 text-purple-600" />
                      {brandProfile.email}
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

          {/* Stats Section
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard icon={Users} label="Active Campaigns" value={stats.activeCampaigns} color="blue" />
            <StatCard icon={TrendingUp} label="Total Creators" value={stats.totalCreators} color="green" />
            <StatCard icon={Wallet} label="Total Spent" value={`$${(brandProfile.wallet || 12500).toLocaleString()}`} color="purple" />
            <StatCard icon={Award} label="Avg ROI" value={`${stats.roi}%`} color="orange" />
          </div> */}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile & Tabs */}
            <div className="lg:col-span-2">
              {/* Tab Navigation */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6">
                <div className="border-b border-gray-200">
                  <div className="flex overflow-x-auto">
                    {[
                      { id: "profile", label: "Profile", icon: Building2 },
                      // { id: "security", label: "Security", icon: Shield },
                      // { id: "notifications", label: "Notifications", icon: Bell },
                      { id: "wallet", label: "Wallet", icon: Wallet },
                      { id: "social", label: "Social Links", icon: Link2 },
                      // { id: "activity", label: "Activity", icon: Calendar }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${activeTab === tab.id
                            ? "border-purple-700 text-purple-700"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                          }`}
                      >
                        <tab.icon className="h-4 w-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {/* Profile Tab - Read Only */}
                  {activeTab === "profile" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Brand Information</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name</label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {brandProfile.brandName}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {brandProfile.industry}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {brandProfile.website}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {brandProfile.email}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {brandProfile.phone}
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Locations</label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {Array.isArray(brandProfile.locations) 
                                ? brandProfile.locations.join(", ")
                                : brandProfile.locations}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Brand Description</label>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 min-h-[100px]">
                          {brandProfile.description}
                        </div>
                      </div>
                    </div>
                  )}

                  Security Tab
                  {activeTab === "security" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Change Password</h3>

                      <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              value={passwordForm.currentPassword}
                              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-6 py-2.5 bg-purple-700 text-white rounded-lg font-medium hover:bg-purple-800 transition"
                        >
                          Update Password
                        </button>
                      </form>

                      <div className="pt-6 border-t border-gray-200">
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Security Settings</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Two-Factor Authentication</p>
                              <p className="text-sm text-gray-600">Add an extra layer of security</p>
                            </div>
                            <button className="px-4 py-2 text-sm bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200">
                              Enable
                            </button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Active Sessions</p>
                              <p className="text-sm text-gray-600">Manage your logged-in devices</p>
                            </div>
                            <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                              View All
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notifications Tab
                  {activeTab === "notifications" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Notification Preferences</h3>

                      <div className="space-y-4">
                        {Object.entries(notifications).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div>
                              <p className="font-medium">
                                {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                              </p>
                              <p className="text-sm text-gray-600">
                                {key.includes('email') ? 'Receive email notifications' :
                                  key.includes('push') ? 'Receive push notifications' :
                                    'Get notified about this'}
                              </p>
                            </div>
                            <button
                              onClick={() => handleNotificationToggle(key)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-purple-600' : 'bg-gray-300'
                                }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                              />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {/* Wallet Tab */}
                  {activeTab === "wallet" && (
                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm opacity-90">Current Balance</p>
                            <p className="text-3xl font-bold">${(brandProfile.wallet || 12500).toLocaleString()}</p>
                          </div>
                          <Wallet className="h-12 w-12 opacity-80" />
                        </div>
                        <button className="mt-4 bg-white text-purple-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-100">
                          Add Funds
                        </button>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900">Recent Transactions</h4>
                        {[
                          { id: 1, description: "Campaign Payment", amount: -2500, date: "Today", status: "Completed" },
                          { id: 2, description: "Added Funds", amount: 5000, date: "2 days ago", status: "Completed" },
                          { id: 3, description: "Creator Payment", amount: -1200, date: "1 week ago", status: "Completed" }
                        ].map(transaction => (
                          <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-600">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                              <p className={`font-bold ${transaction.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">{transaction.status}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Links Tab */}
                  {activeTab === "social" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Social Media Profiles</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        {Object.entries(brandProfile.socialMedia).map(([platform, handle]) => (
                          <div key={platform}>
                            <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                              {platform}
                            </label>
                            <div className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700">
                              {handle}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Activity Tab
                  {activeTab === "activity" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold text-gray-900">Recent Activity</h3>

                      <div className="space-y-4">
                        {recentActivity.map(activity => (
                          <div key={activity.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                            <div className="p-2 bg-purple-100 rounded-lg">
                              {activity.type === 'campaign' && <TrendingUp className="h-4 w-4 text-purple-600" />}
                              {activity.type === 'payment' && <Wallet className="h-4 w-4 text-purple-600" />}
                              {activity.type === 'update' && <Edit className="h-4 w-4 text-purple-600" />}
                              {activity.type === 'application' && <Users className="h-4 w-4 text-purple-600" />}
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{activity.action}</p>
                              <p className="text-sm text-gray-600">{activity.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )} */}
                </div>
              </div>
            </div>

            {/* Right Column - Quick Actions & Verification */}
            <div className="space-y-6">
              {/* Quick Actions */}
              {/* <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <Users className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Find Creators</p>
                      <p className="text-sm text-gray-600">Browse top influencers</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Start Campaign</p>
                      <p className="text-sm text-gray-600">Launch new campaign</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <FileText className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">View Reports</p>
                      <p className="text-sm text-gray-600">Analytics & insights</p>
                    </div>
                  </button>

                  <button className="w-full flex items-center gap-3 p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                    <CreditCard className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Billing</p>
                      <p className="text-sm text-gray-600">Manage subscription</p>
                    </div>
                  </button>
                </div>
              </div> */}

              {/* Verification Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Verification</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Phone Verification</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Business Verification</span>
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600 mb-2">Your account is fully verified</p>
                    <button className="w-full text-sm text-purple-700 hover:text-purple-800 font-medium">
                      Learn about verification →
                    </button>
                  </div>
                </div>
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

export default BrandProfilePage;