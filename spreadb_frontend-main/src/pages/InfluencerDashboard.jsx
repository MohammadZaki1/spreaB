import React, { useState } from "react";
import Header from "../components/Navbar";
import { 
  TrendingUp, 
  Users, 
  Award,
  Clock,
  DollarSign,
  Coins,
  Star,
  FileText,
  CheckCircle,
  AlertCircle,
  Calendar,
  ShoppingBag,
  Eye,
  Zap,
  ArrowUpRight,
  ChevronRight,
  X,
  Bell,
  Wallet,
  Percent,
  ExternalLink,
  MessageSquare,
  PlusCircle,
  ChevronDown,
  Settings,
  RefreshCw,
  Download,
  Filter,
  MoreVertical
} from "lucide-react";

const InfluencerDashboard = () => {
  // State for modals
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeTab, setActiveTab] = useState("active");

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle quick actions
  const handleQuickAction = (action) => {
    switch(action) {
      case "Browse Promotions":
        showNotification("Browsing available promotions", "info");
        break;
      case "View Active Work":
        showNotification("Opening active work dashboard", "info");
        break;
      case "Buy Coins":
        showNotification("Opening coin purchase page", "info");
        break;
      case "Contact Support":
        showNotification("Opening support chat", "info");
        break;
      default:
        showNotification(`${action} clicked`, "info");
    }
  };

  // Handle view campaign details
  const handleViewCampaign = (campaign) => {
    setSelectedCampaign(campaign);
    setShowCampaignModal(true);
  };

  // Mock data
  const stats = {
    walletBalance: "$1,850",
    coins: "2,450",
    activeCollaborations: 3,
    pendingProposals: 2,
    completedPromotions: 12,
    averageRating: 4.8
  };

  const alerts = [
    { id: 1, type: "payment", title: "Payment Received", description: "$850 from Glow Beauty", time: "2 hours ago", urgent: false },
    { id: 2, type: "approval", title: "Proposal Approved", description: "Tech Gadget Review", time: "Yesterday", urgent: true },
    { id: 3, type: "deadline", title: "Submission Due", description: "Sustainable Fashion content", time: "Tomorrow", urgent: true },
  ];

  const activeCollaborations = [
    { id: 1, brand: "TechWiz", campaign: "Tech Gadget Review", deadline: "Dec 25", budget: "$850", progress: 60 },
    { id: 2, brand: "EcoStyle", campaign: "Sustainable Fashion", deadline: "Jan 5", budget: "$1,200", progress: 30 },
    { id: 3, brand: "FitLife", campaign: "Fitness Apparel", deadline: "Jan 10", budget: "$950", progress: 15 },
  ];

  const pendingProposals = [
    { id: 1, brand: "BeautyPlus", campaign: "Winter Skincare", budget: "$2,100", submitted: "Dec 15" },
    { id: 2, brand: "TravelGuru", campaign: "Travel Vlog Series", budget: "$3,400", submitted: "Dec 16" },
  ];

  const completedPromotions = [
    { id: 1, brand: "Glow Beauty", campaign: "Summer Skincare", earnings: "$1,250", rating: 4.9, date: "Nov 30" },
    { id: 2, brand: "FoodieHub", campaign: "Kitchen Gadgets", earnings: "$850", rating: 4.7, date: "Nov 25" },
    { id: 3, brand: "GameOn", campaign: "Gaming Accessories", earnings: "$1,100", rating: 4.8, date: "Nov 20" },
  ];

  const performanceMetrics = [
    { label: "Engagement Rate", value: "8.7%", change: "+1.2%", positive: true },
    { label: "Completion Rate", value: "94%", change: "+3%", positive: true },
    { label: "Avg. Response Time", value: "12h", change: "-2h", positive: true },
    { label: "Client Satisfaction", value: "4.8/5", change: "+0.2", positive: true },
  ];

  const recentEarnings = [
    { brand: "Glow Beauty", amount: "$1,250", date: "Dec 15", status: "completed" },
    { brand: "TechWiz", amount: "$850", date: "Dec 14", status: "completed" },
    { brand: "EcoStyle", amount: "$600", date: "Dec 13", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-24 right-4 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === "success" 
            ? "bg-green-50 border border-green-200 text-green-800" 
            : "bg-blue-50 border border-blue-200 text-blue-800"
        }`}>
          <Bell className="w-5 h-5" />
          <span className="font-medium">{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-4">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Campaign Modal */}
      {showCampaignModal && selectedCampaign && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-bold">{selectedCampaign.brand}</h3>
              <button onClick={() => setShowCampaignModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">{selectedCampaign.campaign}</h4>
                  <p className="text-gray-600 text-sm mt-1">Campaign Details</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">Deadline</p>
                    <p className="font-semibold">{selectedCampaign.deadline}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">Budget</p>
                    <p className="font-semibold text-green-600">{selectedCampaign.budget}</p>
                  </div>
                </div>
                {selectedCampaign.progress && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{selectedCampaign.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${selectedCampaign.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
                <button 
                  onClick={() => {
                    setShowCampaignModal(false);
                    showNotification(`Viewing ${selectedCampaign.campaign} details`, "info");
                  }}
                  className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Dashboard */}
      <div className="max-w-6xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-6">

        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
  <span className="text-black">Dashboard</span>
  <span className="text-purple-600"> Overview</span>
</h1>
              <p className="text-gray-600">Welcome back! Here's your performance summary</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border rounded-lg">
                <Coins className="w-5 h-5 text-amber-500" />
                <span className="font-semibold">{stats.coins}</span>
                <span className="text-gray-600">Coins</span>
              </div>
              <button 
                onClick={() => handleQuickAction("Buy Coins")}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium flex items-center gap-2 hover:bg-amber-600"
              >
                <PlusCircle className="w-4 h-4" />
                Buy Coins
              </button>
            </div>
          </div>

          {/* Main Stats Grid - Simplified */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { 
                label: "Wallet Balance", 
                value: stats.walletBalance, 
                icon: Wallet, 
                bgColor: "bg-green-50",
                textColor: "text-green-600",
                borderColor: "border-green-100"
              },
              { 
                label: "Active", 
                value: stats.activeCollaborations, 
                icon: Users, 
                bgColor: "bg-blue-50",
                textColor: "text-blue-600",
                borderColor: "border-blue-100"
              },
              { 
                label: "Pending", 
                value: stats.pendingProposals, 
                icon: FileText, 
                bgColor: "bg-amber-50",
                textColor: "text-amber-600",
                borderColor: "border-amber-100"
              },
              { 
                label: "Completed", 
                value: stats.completedPromotions, 
                icon: CheckCircle, 
                bgColor: "bg-purple-50",
                textColor: "text-purple-600",
                borderColor: "border-purple-100"
              },
              { 
                label: "Rating", 
                value: stats.averageRating, 
                icon: Star, 
                bgColor: "bg-yellow-50",
                textColor: "text-yellow-600",
                borderColor: "border-yellow-100",
                isRating: true
              },
              { 
                label: "Response Rate", 
                value: "92%", 
                icon: Percent, 
                bgColor: "bg-teal-50",
                textColor: "text-teal-600",
                borderColor: "border-teal-100"
              },
            ].map((stat, idx) => (
              <div 
                key={idx} 
                onClick={() => stat.label === "Active" ? setActiveTab("active") : 
                         stat.label === "Pending" ? setActiveTab("pending") : 
                         stat.label === "Completed" ? setActiveTab("completed") : 
                         showNotification(`${stat.label}: ${stat.value}`, "info")}
                className={`${stat.bgColor} ${stat.borderColor} p-4 rounded-xl border cursor-pointer hover:shadow-sm transition-shadow`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 ${stat.bgColor.replace('50', '100')} rounded-lg`}>
                    <stat.icon className={`w-4 h-4 ${stat.textColor}`} />
                  </div>
                  {stat.isRating && (
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < Math.floor(stats.averageRating) ? "text-amber-500 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Single Column Layout */}
        <div className="space-y-6">

          {/* Alerts Section */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-semibold">Alerts & Notifications</h2>
              </div>
              <button 
                onClick={() => showNotification("Viewing all alerts", "info")}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                View All
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {alerts.map((alert) => (
                  <div 
                    key={alert.id}
                    onClick={() => showNotification(`Viewing ${alert.title}`, "info")}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-sm ${
                      alert.urgent 
                        ? "bg-red-50 border-red-200" 
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          {alert.urgent && (
                            <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded-full">
                              Urgent
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{alert.description}</p>
                        <p className="text-gray-500 text-xs mt-2">{alert.time}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Work Section with Tabs */}
          <div className="bg-white rounded-xl border shadow-sm">
            <div className="p-4 border-b">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-semibold">Your Work</h2>
                <div className="flex gap-2 overflow-x-auto">
                  {[
                    { id: "active", label: "Active Collaborations", count: activeCollaborations.length },
                    { id: "pending", label: "Pending Proposals", count: pendingProposals.length },
                    { id: "completed", label: "Completed Promotions", count: completedPromotions.length },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id 
                          ? "bg-blue-600 text-white" 
                          : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                      }`}
                    >
                      {tab.label}
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                        activeTab === tab.id 
                          ? "bg-white/20" 
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4">
              {/* Active Collaborations */}
              {activeTab === "active" && (
                <div className="space-y-4">
                  {activeCollaborations.map((collab) => (
                    <div 
                      key={collab.id}
                      onClick={() => handleViewCampaign(collab)}
                      className="p-4 border rounded-lg hover:shadow-sm cursor-pointer transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold mb-1">{collab.campaign}</h4>
                          <p className="text-gray-600 text-sm">By {collab.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{collab.budget}</p>
                          <p className="text-gray-500 text-xs">Budget</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium">{collab.deadline}</span>
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-gray-600">Progress</span>
                            <span className="font-medium">{collab.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${collab.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pending Proposals */}
              {activeTab === "pending" && (
                <div className="space-y-4">
                  {pendingProposals.map((proposal) => (
                    <div 
                      key={proposal.id}
                      className="p-4 border rounded-lg hover:shadow-sm cursor-pointer"
                      onClick={() => showNotification(`Viewing ${proposal.campaign} proposal`, "info")}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">{proposal.campaign}</h4>
                          <p className="text-gray-600 text-sm">By {proposal.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-600">{proposal.budget}</p>
                          <p className="text-gray-500 text-xs">Submitted: {proposal.submitted}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-2 border rounded-lg hover:bg-gray-50 text-sm font-medium">
                          Edit
                        </button>
                        <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                          Check Status
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Promotions */}
              {activeTab === "completed" && (
                <div className="space-y-4">
                  {completedPromotions.map((promo) => (
                    <div 
                      key={promo.id}
                      className="p-4 border rounded-lg hover:shadow-sm cursor-pointer"
                      onClick={() => showNotification(`Viewing ${promo.campaign} details`, "info")}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold mb-1">{promo.campaign}</h4>
                          <p className="text-gray-600 text-sm">By {promo.brand}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{promo.earnings}</p>
                          <p className="text-gray-500 text-xs">Completed: {promo.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < Math.floor(promo.rating) 
                                  ? "text-amber-500 fill-current" 
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm font-medium">{promo.rating}</span>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                          Details
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Performance Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Summary */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold">Performance Summary</h2>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <div className="space-y-5">
                {performanceMetrics.map((metric, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600">{metric.label}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        metric.positive 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {metric.change}
                      </span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                      <div 
                        className="bg-green-500 h-1.5 rounded-full" 
                        style={{ width: metric.label === "Client Satisfaction" ? 
                          `${parseFloat(metric.value) * 20}%` : 
                          metric.label === "Avg. Response Time" ? '60%' : 
                          metric.label === "Engagement Rate" ? '80%' : '90%' 
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Earnings */}
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h2 className="text-lg font-semibold">Recent Earnings</h2>
                </div>
                <button 
                  onClick={() => showNotification("Viewing all earnings", "info")}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentEarnings.map((earning, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-blue-600">{earning.brand.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{earning.brand}</p>
                        <p className="text-gray-500 text-sm">{earning.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{earning.amount}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        earning.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {earning.status}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <p className="text-gray-600">Total This Month</p>
                    <p className="text-xl font-bold text-green-600">$2,700</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border shadow-sm p-6">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "Browse Promotions", icon: ShoppingBag, color: "bg-blue-100 text-blue-600", description: "Find new campaigns to work on" },
                { label: "View Active Work", icon: Eye, color: "bg-purple-100 text-purple-600", description: "Check your current projects" },
                { label: "Buy Coins", icon: Coins, color: "bg-amber-100 text-amber-600", description: "Top up your wallet" },
                { label: "Contact Support", icon: MessageSquare, color: "bg-green-100 text-green-600", description: "Get help from our team" },
              ].map((action, idx) => (
                <button 
                  key={idx}
                  onClick={() => handleQuickAction(action.label)}
                  className="p-4 bg-gray-50 hover:bg-gray-100 rounded-lg border text-left transition-all hover:shadow-sm"
                >
                  <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                    <action.icon className="w-6 h-6" />
                  </div>
                  <h4 className="font-semibold mb-1">{action.label}</h4>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Ready to boost your influence?</h3>
              <p className="opacity-90">Unlock premium features and priority campaigns</p>
            </div>
            <button 
              onClick={() => showNotification("Exploring premium features", "info")}
              className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-gray-100"
            >
              Upgrade Now
              <ArrowUpRight className="w-4 h-4 inline ml-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InfluencerDashboard;