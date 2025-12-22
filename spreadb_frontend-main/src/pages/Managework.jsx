
import React, { useState } from "react";
import Header from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { 
  Eye, Edit3, X, Users, Clock, ChevronRight, DollarSign, 
  Calendar, TrendingUp, CheckCircle, MessageSquare, FileText, 
  Zap, Briefcase, Award, Target, Send, ThumbsUp, ThumbsDown,
  FileCheck, RefreshCw, Star, Download, Upload, BarChart,
  Filter, Search, MoreVertical, AlertCircle, CheckSquare,
  Video, Image, File, Mail, Phone, Globe, MapPin, ArrowRight,
  Sparkles, Rocket, Trophy, Crown, PieChart,
  Bell, ExternalLink, Copy, MousePointerClick,
  TrendingUp as TrendingUpIcon, Megaphone, Layers, Grid,
  Heart, Share2, Tag, Hash, BellRing, EyeOff, Trash2,
  CreditCard, Shield, Lock, Unlock, CalendarDays, Timer,
  Percent, Target as TargetIcon, Zap as Lightning
} from "lucide-react";

const Managework = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("promotions");
  const [promotionSubTab, setPromotionSubTab] = useState("live");
  const [proposalSubTab, setProposalSubTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);

  // Fixed Campaign Data Structure
  const [campaigns, setCampaigns] = useState({
    draft: [
      {
        id: 1,
        title: "Summer Fashion Collection 2024",
        category: "Fashion & Apparel",
        status: "draft",
        budget: 5000,
        createdDate: "2024-06-15",
        endDate: "2024-07-30",
        targetAudience: "Females 18-35",
        platforms: ["Instagram", "YouTube"],
        description: "Summer fashion campaign for new collection launch",
        color: "from-pink-500 to-rose-500",
        icon: "👗",
        engagement: "0%",
        proposals: 0,
        views: 0
      },
      {
        id: 2,
        title: "Tech Gadget Review Series",
        category: "Technology",
        status: "draft",
        budget: 3000,
        createdDate: "2024-06-10",
        endDate: "2024-08-15",
        targetAudience: "Tech Enthusiasts",
        platforms: ["YouTube", "Twitter"],
        description: "Review series for latest tech gadgets",
        color: "from-blue-500 to-cyan-500",
        icon: "💻",
        engagement: "0%",
        proposals: 0,
        views: 0
      },
      {
        id: 8,
        title: "Travel Adventure Campaign",
        category: "Travel",
        status: "draft",
        budget: 4500,
        createdDate: "2024-06-18",
        endDate: "2024-09-30",
        targetAudience: "Adventure Seekers 25-45",
        platforms: ["Instagram", "YouTube", "TikTok"],
        description: "Promoting travel packages for adventure destinations",
        color: "from-emerald-500 to-teal-500",
        icon: "✈️",
        engagement: "0%",
        proposals: 0,
        views: 0
      },
      {
        id: 9,
        title: "Sustainable Products Launch",
        category: "Eco-Friendly",
        status: "draft",
        budget: 3500,
        createdDate: "2024-06-12",
        endDate: "2024-08-20",
        targetAudience: "Eco-conscious Consumers",
        platforms: ["Instagram", "Pinterest"],
        description: "Launch campaign for sustainable lifestyle products",
        color: "from-green-500 to-emerald-500",
        icon: "🌿",
        engagement: "0%",
        proposals: 0,
        views: 0
      },
      {
        id: 10,
        title: "Pet Products Promotion",
        category: "Pet Care",
        status: "draft",
        budget: 2800,
        createdDate: "2024-06-20",
        endDate: "2024-09-15",
        targetAudience: "Pet Owners",
        platforms: ["Instagram", "Facebook"],
        description: "Promoting new line of premium pet care products",
        color: "from-orange-500 to-amber-500",
        icon: "🐶",
        engagement: "0%",
        proposals: 0,
        views: 0
      }
    ],
    live: [
      {
        id: 3,
        title: "Fitness App Launch Campaign",
        category: "Health & Fitness",
        status: "live",
        budget: 8000,
        createdDate: "2024-06-01",
        endDate: "2024-07-15",
        proposals: 24,
        views: 1250,
        engagement: "4.8%",
        platforms: ["Instagram", "Facebook", "YouTube"],
        influencers: ["@fitlife", "@gymqueen"],
        metrics: {
          reach: "50K",
          clicks: "2.4K",
          conversions: "320",
          roi: "28%"
        },
        color: "from-purple-500 to-pink-500",
        icon: "💪",
        trending: true
      },
      {
        id: 4,
        title: "Organic Skincare Product Launch",
        category: "Beauty",
        status: "live",
        budget: 6500,
        createdDate: "2024-05-20",
        endDate: "2024-08-20",
        proposals: 42,
        views: 3150,
        engagement: "6.2%",
        platforms: ["Instagram", "YouTube"],
        influencers: ["@beautyexpert", "@skincareguru"],
        metrics: {
          reach: "85K",
          clicks: "5.1K",
          conversions: "780",
          roi: "42%"
        },
        color: "from-emerald-500 to-teal-500",
        icon: "✨",
        trending: true
      },
      {
        id: 5,
        title: "Coffee Brand Morning Boost",
        category: "Food & Beverage",
        status: "live",
        budget: 3200,
        createdDate: "2024-06-05",
        endDate: "2024-07-30",
        proposals: 15,
        views: 890,
        engagement: "3.8%",
        platforms: ["Instagram", "YouTube"],
        influencers: ["@coffeelover", "@morningbrew"],
        metrics: {
          reach: "35K",
          clicks: "1.8K",
          conversions: "210",
          roi: "18%"
        },
        color: "from-amber-500 to-orange-500",
        icon: "☕"
      },
      {
        id: 11,
        title: "Smart Home Tech Campaign",
        category: "Technology",
        status: "live",
        budget: 7500,
        createdDate: "2024-06-01",
        endDate: "2024-08-31",
        proposals: 38,
        views: 2450,
        engagement: "5.5%",
        platforms: ["YouTube", "Instagram", "Twitter"],
        influencers: ["@techguru", "@smartliving"],
        metrics: {
          reach: "120K",
          clicks: "8.2K",
          conversions: "920",
          roi: "35%"
        },
        color: "from-blue-600 to-indigo-600",
        icon: "🏠",
        trending: true
      },
      {
        id: 12,
        title: "Yoga Wear Collection",
        category: "Fitness & Fashion",
        status: "live",
        budget: 4200,
        createdDate: "2024-05-25",
        endDate: "2024-07-20",
        proposals: 28,
        views: 1850,
        engagement: "7.1%",
        platforms: ["Instagram", "TikTok"],
        influencers: ["@yogalife", "@fitnessmodel"],
        metrics: {
          reach: "65K",
          clicks: "4.5K",
          conversions: "580",
          roi: "32%"
        },
        color: "from-purple-500 to-violet-500",
        icon: "🧘‍♀️",
        trending: false
      }
    ],
    closed: [
      {
        id: 6,
        title: "Gaming Equipment Promotion",
        category: "Gaming",
        status: "closed",
        budget: 4500,
        createdDate: "2024-03-15",
        endDate: "2024-04-30",
        proposals: 18,
        hired: 3,
        totalSpent: 4200,
        roi: "28%",
        color: "from-indigo-500 to-purple-500",
        icon: "🎮",
        metrics: {
          reach: "95K",
          clicks: "7.8K",
          conversions: "650",
          roi: "28%"
        }
      },
      {
        id: 7,
        title: "Book Launch Campaign",
        category: "Education",
        status: "closed",
        budget: 2800,
        createdDate: "2024-02-10",
        endDate: "2024-03-20",
        proposals: 12,
        hired: 2,
        totalSpent: 2600,
        roi: "22%",
        color: "from-blue-500 to-indigo-500",
        icon: "📚",
        metrics: {
          reach: "45K",
          clicks: "3.2K",
          conversions: "280",
          roi: "22%"
        }
      },
      {
        id: 13,
        title: "Music Festival Promotion",
        category: "Entertainment",
        status: "closed",
        budget: 5800,
        createdDate: "2024-01-15",
        endDate: "2024-03-10",
        proposals: 35,
        hired: 5,
        totalSpent: 5600,
        roi: "45%",
        color: "from-pink-500 to-rose-500",
        icon: "🎵",
        metrics: {
          reach: "180K",
          clicks: "12.5K",
          conversions: "1250",
          roi: "45%"
        }
      },
      {
        id: 14,
        title: "Home Decor Launch",
        category: "Lifestyle",
        status: "closed",
        budget: 3800,
        createdDate: "2024-02-20",
        endDate: "2024-04-15",
        proposals: 22,
        hired: 4,
        totalSpent: 3700,
        roi: "31%",
        color: "from-amber-500 to-orange-500",
        icon: "🏡",
        metrics: {
          reach: "78K",
          clicks: "6.3K",
          conversions: "480",
          roi: "31%"
        }
      },
      {
        id: 15,
        title: "Sustainable Fashion Line",
        category: "Fashion",
        status: "closed",
        budget: 5200,
        createdDate: "2023-11-10",
        endDate: "2024-01-31",
        proposals: 41,
        hired: 6,
        totalSpent: 5100,
        roi: "38%",
        color: "from-green-500 to-emerald-500",
        icon: "👕",
        metrics: {
          reach: "210K",
          clicks: "15.8K",
          conversions: "980",
          roi: "38%"
        }
      }
    ]
  });

  // Fixed Proposals Data Structure
  const [proposals, setProposals] = useState({
    pending: [
      {
        id: 101,
        campaignId: 3,
        campaignTitle: "Fitness App Launch Campaign",
        influencerName: "Sarah Johnson",
        influencerHandle: "@fitlife",
        followers: "125K",
        engagementRate: "5.2%",
        proposalAmount: 1200,
        submittedDate: "2024-06-10",
        proposalText: "I'll create 3 Reels showing workout routines using your app, plus 2 Stories per week for 4 weeks.",
        portfolioLink: "https://portfolio.sarahj.com",
        rating: 4.8,
        previousCollaborations: 12,
        avatarColor: "bg-gradient-to-r from-purple-500 to-pink-500"
      },
      {
        id: 102,
        campaignId: 3,
        campaignTitle: "Fitness App Launch Campaign",
        influencerName: "Mike Chen",
        influencerHandle: "@gymwarrior",
        followers: "85K",
        engagementRate: "7.1%",
        proposalAmount: 800,
        submittedDate: "2024-06-09",
        proposalText: "30-day transformation challenge showcasing your app's features.",
        portfolioLink: "https://mikechenfitness.com",
        rating: 4.9,
        previousCollaborations: 8,
        avatarColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
      },
      {
        id: 105,
        campaignId: 4,
        campaignTitle: "Organic Skincare Product Launch",
        influencerName: "Lisa Wang",
        influencerHandle: "@beautybylisa",
        followers: "210K",
        engagementRate: "6.8%",
        proposalAmount: 1800,
        submittedDate: "2024-06-12",
        proposalText: "Will create detailed skincare routine videos and before/after results over 6 weeks.",
        portfolioLink: "https://beautybylisa.com",
        rating: 4.7,
        previousCollaborations: 15,
        avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-500"
      }
    ],
    accepted: [
      {
        id: 103,
        campaignId: 4,
        campaignTitle: "Organic Skincare Product Launch",
        influencerName: "Emma Davis",
        influencerHandle: "@skincareguru",
        followers: "250K",
        engagementRate: "6.5%",
        proposalAmount: 2000,
        acceptedDate: "2024-06-05",
        deliverables: ["3 YouTube Videos", "5 Instagram Posts", "10 Stories"],
        contractSigned: true,
        paymentStatus: "50% Advanced",
        avatarColor: "bg-gradient-to-r from-emerald-500 to-teal-500"
      }
    ],
    rejected: [
      {
        id: 104,
        campaignId: 4,
        campaignTitle: "Organic Skincare Product Launch",
        influencerName: "Alex Brown",
        influencerHandle: "@beautytips",
        followers: "45K",
        engagementRate: "3.2%",
        proposalAmount: 1500,
        rejectedDate: "2024-06-03",
        rejectionReason: "Audience mismatch",
        avatarColor: "bg-gradient-to-r from-gray-500 to-slate-500"
      }
    ]
  });

  // Active Collaborations
  const [activeCollaborations, setActiveCollaborations] = useState([
    {
      id: 201,
      campaignId: 4,
      campaignTitle: "Organic Skincare Product Launch",
      influencerName: "Emma Davis",
      influencerHandle: "@skincareguru",
      startDate: "2024-06-10",
      endDate: "2024-07-10",
      budget: 2000,
      paid: 1000,
      progress: 65,
      deliverables: [
        {
          id: 1,
          title: "YouTube Product Review",
          type: "video",
          dueDate: "2024-06-20",
          status: "submitted",
          submittedDate: "2024-06-18",
          reviewStatus: "pending",
          revisions: 0
        },
        {
          id: 2,
          title: "Instagram Carousel Post",
          type: "image",
          dueDate: "2024-06-25",
          status: "in-progress",
          reviewStatus: "not-submitted"
        },
        {
          id: 3,
          title: "Demo Video",
          type: "video",
          dueDate: "2024-07-01",
          status: "upcoming",
          reviewStatus: "not-submitted"
        }
      ],
      icon: TrendingUpIcon,
      color: "from-purple-500 to-indigo-500"
    }
  ]);

  // Completed Campaigns
  const [completedCampaigns, setCompletedCampaigns] = useState([
    {
      id: 301,
      campaignTitle: "Coffee Brand Awareness Campaign",
      influencerName: "James Wilson",
      campaignPeriod: "Mar 15 - Apr 30, 2024",
      totalBudget: 1500,
      finalPayment: 1500,
      paymentDate: "2024-05-05",
      deliverablesCompleted: 5,
      metrics: {
        reach: "250K",
        engagement: "15K",
        conversions: "850",
        roi: "42%"
      },
      rating: 5,
      review: "Excellent collaboration! James delivered high-quality content on time.",
      influencerRating: 5,
      influencerReview: "Great brand to work with, clear communication",
      icon: Trophy,
      color: "from-pink-500 to-rose-500" // Changed from amber/yellow to pink
    },
    {
      id: 302,
      campaignTitle: "Summer Fashion Sale 2023",
      influencerName: "Sophia Martinez",
      campaignPeriod: "Jun 1 - Aug 31, 2023",
      totalBudget: 3200,
      finalPayment: 3200,
      paymentDate: "2023-09-10",
      deliverablesCompleted: 8,
      metrics: {
        reach: "520K",
        engagement: "42K",
        conversions: "2.1K",
        roi: "68%"
      },
      rating: 4,
      review: "Good results, some delays in content delivery but overall satisfied.",
      influencerRating: 5,
      influencerReview: "Professional partnership, would work again",
      icon: Trophy,
      color: "from-pink-500 to-rose-500"
    }
  ]);

  // Stats Calculation
  const getStats = () => {
    const totalPromotions = campaigns.draft.length + campaigns.live.length + campaigns.closed.length;
    const totalProposals = proposals.pending.length + proposals.accepted.length + proposals.rejected.length;
    const totalActive = activeCollaborations.length;
    const totalCompleted = completedCampaigns.length;
    const totalBudget = [...campaigns.draft, ...campaigns.live, ...campaigns.closed].reduce((sum, p) => sum + (p.budget || 0), 0);
    
    return { totalPromotions, totalProposals, totalActive, totalCompleted, totalBudget };
  };

  const stats = getStats();

  // Handler functions
  const handlePublishCampaign = (campaignId) => {
    const campaign = campaigns.draft.find(c => c.id === campaignId);
    if (!campaign) return;

    setCampaigns(prev => ({
      ...prev,
      draft: prev.draft.filter(c => c.id !== campaignId),
      live: [...prev.live, {
        ...campaign,
        status: "live",
        proposals: 0,
        views: 0,
        engagement: "0%",
        endDate: "2024-08-31",
        trending: false,
        metrics: {
          reach: "0",
          clicks: "0",
          conversions: "0",
          roi: "0%"
        }
      }]
    }));
    alert("Campaign published successfully!");
  };

  const handleDeleteCampaign = (campaignId, tab) => {
    if (window.confirm("Are you sure you want to delete this campaign?")) {
      setCampaigns(prev => ({
        ...prev,
        [tab]: prev[tab].filter(c => c.id !== campaignId)
      }));
      alert("Campaign deleted successfully!");
    }
  };

  const handleProposalAction = (proposalId, action) => {
    const proposal = proposals.pending.find(p => p.id === proposalId);
    if (!proposal) return;

    if (action === 'accept') {
      setProposals(prev => ({
        ...prev,
        pending: prev.pending.filter(p => p.id !== proposalId),
        accepted: [...prev.accepted, { 
          ...proposal, 
          acceptedDate: new Date().toISOString().split('T')[0],
          contractSigned: true,
          paymentStatus: "50% Advanced"
        }]
      }));

      setActiveCollaborations(prev => [...prev, {
        id: Date.now(),
        campaignId: proposal.campaignId,
        campaignTitle: proposal.campaignTitle,
        influencerName: proposal.influencerName,
        influencerHandle: proposal.influencerHandle,
        startDate: new Date().toISOString().split('T')[0],
        endDate: "2024-07-10",
        budget: proposal.proposalAmount,
        paid: proposal.proposalAmount * 0.5,
        progress: 10,
        deliverables: [],
        icon: TrendingUpIcon,
        color: "from-purple-500 to-indigo-500"
      }]);

      alert(`Proposal from ${proposal.influencerName} accepted!`);
    } else if (action === 'reject') {
      setProposals(prev => ({
        ...prev,
        pending: prev.pending.filter(p => p.id !== proposalId),
        rejected: [...prev.rejected, { 
          ...proposal, 
          rejectedDate: new Date().toISOString().split('T')[0], 
          rejectionReason: "Not selected" 
        }]
      }));
      alert(`Proposal from ${proposal.influencerName} rejected.`);
    }
  };

  const handleCompleteCampaign = (collabId) => {
    const collab = activeCollaborations.find(c => c.id === collabId);
    if (!collab) return;

    setActiveCollaborations(prev => prev.filter(c => c.id !== collabId));
    setCompletedCampaigns(prev => [...prev, {
      id: Date.now(),
      campaignTitle: collab.campaignTitle,
      influencerName: collab.influencerName,
      campaignPeriod: `${collab.startDate} - ${collab.endDate}`,
      totalBudget: collab.budget,
      finalPayment: collab.budget,
      paymentDate: new Date().toISOString().split('T')[0],
      deliverablesCompleted: 3,
      metrics: {
        reach: "150K",
        engagement: "12K",
        conversions: "650",
        roi: "35%"
      },
      rating: 5,
      review: "Great collaboration, delivered as promised.",
      influencerRating: 5,
      influencerReview: "Professional brand, timely payments.",
      icon: Trophy,
      color: "from-pink-500 to-rose-500" // Changed to pink
    }]);

    alert("Campaign marked as completed!");
  };

  const renderPromotionsTab = () => {
    const currentPromotions = campaigns[promotionSubTab] || [];
    
    return (
      <div className="space-y-8">
        {/* Sub-tabs */}
        <div className="flex space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-2xl border border-purple-100 w-full max-w-3xl">
          {['draft', 'live', 'closed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setPromotionSubTab(tab)}
              className={`flex-1 px-10 py-4 rounded-xl font-medium capitalize transition-all text-center ${
                promotionSubTab === tab
                  ? 'bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white shadow-lg'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab} ({campaigns[tab]?.length || 0})
            </button>
          ))}
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {currentPromotions.length > 0 ? (
            currentPromotions.map(campaign => (
              <div key={campaign.id} className="group relative">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${campaign.color} p-6`}>
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{campaign.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{campaign.title}</h3>
                          <p className="text-white/80 text-sm">{campaign.category}</p>
                        </div>
                      </div>
                      {campaign.trending && (
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-bold rounded-full">
                          TRENDING
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="text-3xl font-bold text-emerald-600">
                        ${campaign.budget.toLocaleString()}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        campaign.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                        campaign.status === 'live' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {campaign.status.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-gray-600 mb-4">{campaign.description}</p>

                    <div className="flex items-center gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <Users size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{campaign.targetAudience || "Target audience"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{campaign.endDate}</span>
                      </div>
                    </div>

                    {/* Campaign Metrics */}
                    {(campaign.status === 'live' || campaign.status === 'closed') && campaign.metrics && (
                      <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-xl border border-gray-200 mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3">Campaign Performance</h4>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="text-center">
                            <div className="text-xl font-bold text-blue-600">{campaign.metrics.reach}</div>
                            <div className="text-xs text-gray-600">Reach</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-purple-600">{campaign.metrics.clicks}</div>
                            <div className="text-xs text-gray-600">Clicks</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xl font-bold text-emerald-600">{campaign.metrics.roi || campaign.metrics.conversions}</div>
                            <div className="text-xs text-gray-600">{campaign.metrics.roi ? 'ROI' : 'Sales'}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Platforms */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {campaign.platforms && campaign.platforms.map((platform, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-100">
                          {platform}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {campaign.status === 'draft' && (
                        <>
                          <button 
                            onClick={() => handlePublishCampaign(campaign.id)}
                            className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                          >
                            Publish Now
                          </button>
                          <button 
                            onClick={() => setSelectedCampaign(campaign)}
                            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all"
                          >
                            <Edit3 size={18} />
                          </button>
                        </>
                      )}
                      {campaign.status === 'live' && (
                        <>
                          <button 
                            onClick={() => alert(`Viewing analytics for ${campaign.title}`)}
                            className="flex-1 py-3 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                          >
                            View Analytics
                          </button>
                          <button 
                            onClick={() => alert(`Managing proposals for ${campaign.title}`)}
                            className="px-4 py-3 border border-blue-300 text-blue-700 rounded-xl hover:bg-blue-50 transition-all"
                          >
                            <Users size={18} />
                          </button>
                        </>
                      )}
                      {campaign.status === 'closed' && (
                        <button 
                          onClick={() => alert(`Viewing results for ${campaign.title}`)}
                          className="flex-1 py-3 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                          View Results
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteCampaign(campaign.id, promotionSubTab)}
                        className="px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:border-red-300 hover:text-red-700 hover:bg-red-50 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📭</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No {promotionSubTab} campaigns found</h3>
              <p className="text-gray-500">Get started by creating your first campaign</p>
            </div>
          )}

          {/* Create New Card */}
          <div 
            onClick={() => navigate("/promotion")}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9333EA] to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            
            <div className="relative bg-gradient-to-br from-white to-purple-50 border-3 border-dashed border-purple-300 rounded-2xl p-8 text-center hover:border-purple-400 hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-[#9333EA] to-[#B366FF] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Rocket className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Create New Campaign</h3>
              <p className="text-gray-600 max-w-md mx-auto mb-6">
                Launch a stunning new campaign and connect with top influencers
              </p>
              <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                <Rocket size={18} />
                <span>Start Creating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderProposalsTab = () => {
    const currentProposals = proposals[proposalSubTab] || [];
    
    return (
      <div className="space-y-8">
        {/* Proposal Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 border border-purple-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-[#9333EA]">{proposals.pending.length}</div>
                <div className="text-gray-600">Pending Review</div>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <Clock className="text-[#9333EA]" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl p-6 border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-emerald-600">{proposals.accepted.length}</div>
                <div className="text-gray-600">Accepted</div>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <CheckCircle className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl p-6 border border-rose-100">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-rose-600">{proposals.rejected.length}</div>
                <div className="text-gray-600">Rejected</div>
              </div>
              <div className="p-3 bg-white rounded-xl shadow-sm">
                <X className="text-rose-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="flex space-x-2 bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-2xl border border-purple-100 w-full max-w-3xl">
          {['pending', 'accepted', 'rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setProposalSubTab(tab)}
              className={`flex-1 px-10 py-4 rounded-xl font-medium capitalize transition-all text-center ${
                proposalSubTab === tab
                  ? tab === 'pending' ? 'bg-purple-600 text-white' :
                    tab === 'accepted' ? 'bg-emerald-600 text-white' :
                    'bg-rose-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab} ({proposals[tab]?.length || 0})
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {currentProposals.length > 0 ? (
            currentProposals.map(proposal => (
              <div key={proposal.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 p-6 hover:shadow-2xl transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                    {/* Influencer Card */}
                    <div className="lg:w-1/3">
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-200">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className={`w-16 h-16 rounded-full ${proposal.avatarColor} flex items-center justify-center text-white text-2xl font-bold`}>
                            {proposal.influencerName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{proposal.influencerName}</h4>
                            <p className="text-[#9333EA] font-medium">{proposal.influencerHandle}</p>
                            <div className="flex items-center mt-1">
                              <Star size={14} className="text-amber-500 fill-amber-500" />
                              <span className="ml-1 text-sm text-gray-700">{proposal.rating}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Followers</span>
                            <span className="font-semibold text-gray-900">{proposal.followers}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Engagement</span>
                            <span className="font-semibold text-emerald-600">{proposal.engagementRate}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-600">Previous Collabs</span>
                            <span className="font-semibold text-gray-900">{proposal.previousCollaborations}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Proposal Details */}
                    <div className="lg:w-2/3">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-2">
                            {proposal.campaignTitle}
                          </div>
                          <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-3">
                            <p className="text-gray-700 italic">"{proposal.proposalText}"</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-emerald-600">${proposal.proposalAmount}</div>
                          <div className="text-sm text-gray-500">Proposal Amount</div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-2" />
                          Submitted: {proposal.submittedDate}
                        </span>
                        {proposal.acceptedDate && (
                          <span className="flex items-center">
                            <CheckCircle size={14} className="mr-2" />
                            Accepted: {proposal.acceptedDate}
                          </span>
                        )}
                        {proposal.rejectedDate && (
                          <span className="flex items-center">
                            <X size={14} className="mr-2" />
                            Rejected: {proposal.rejectedDate}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        {proposalSubTab === 'pending' && (
                          <>
                            <button 
                              onClick={() => handleProposalAction(proposal.id, 'accept')}
                              className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2"
                            >
                              <CheckCircle size={20} />
                              <span>Accept Proposal</span>
                            </button>
                            <button 
                              onClick={() => handleProposalAction(proposal.id, 'reject')}
                              className="flex-1 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl hover:shadow-lg hover:shadow-rose-500/25 transition-all flex items-center justify-center space-x-2"
                            >
                              <X size={20} />
                              <span>Reject</span>
                            </button>
                          </>
                        )}
                        <button className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-[#9333EA] hover:text-[#9333EA] transition-all">
                          View Portfolio
                        </button>
                        <button className="px-6 py-3 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                          <MessageSquare size={18} className="inline mr-2" />
                          Message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">
                {proposalSubTab === 'pending' ? '📩' : proposalSubTab === 'accepted' ? '✅' : '❌'}
              </div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No {proposalSubTab} proposals</h3>
              <p className="text-gray-500">
                {proposalSubTab === 'pending' 
                  ? "You don't have any pending proposals right now" 
                  : proposalSubTab === 'accepted'
                  ? "No accepted proposals yet"
                  : "No rejected proposals"}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    return (
      <div className="space-y-8">
        {/* Progress Overview */}
        <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl p-8 border border-purple-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Active Collaborations</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {activeCollaborations.length > 0 ? (
              activeCollaborations.map(collab => {
                const Icon = collab.icon;
                return (
                  <div key={collab.id} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${collab.color}`}>
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">{collab.campaignTitle}</h4>
                          <p className="text-sm text-gray-600">{collab.influencerName}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">
                        {collab.progress}% Complete
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{collab.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full bg-gradient-to-r ${collab.color}`}
                          style={{ width: `${collab.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        Budget: <span className="font-semibold text-gray-900">${collab.budget}</span>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white text-sm rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all">
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-3 text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">⏳</div>
                <h3 className="text-xl font-bold text-gray-600 mb-2">No active collaborations</h3>
                <p className="text-gray-500">Accept some proposals to start collaborating!</p>
              </div>
            )}
          </div>
        </div>

        {/* Deliverables */}
        {activeCollaborations.length > 0 && activeCollaborations.map(collab => (
          <div key={collab.id} className="group relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
            
            <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 p-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{collab.campaignTitle}</h3>
                    <div className="flex items-center space-x-6 text-gray-300">
                      <span className="flex items-center">
                        <Users size={16} className="mr-2" />
                        {collab.influencerName} ({collab.influencerHandle})
                      </span>
                      <span className="flex items-center">
                        <Calendar size={16} className="mr-2" />
                        {collab.startDate} - {collab.endDate}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 lg:mt-0 px-6 py-3 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center space-x-2">
                    <MessageSquare size={20} />
                    <span>Message Influencer</span>
                  </button>
                </div>
              </div>

              {/* Deliverables Section */}
              <div className="p-8">
                <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg mr-3">
                    <FileCheck className="text-[#9333EA]" size={24} />
                  </div>
                  Deliverables Tracking
                </h4>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {collab.deliverables.map(deliverable => (
                    <div key={deliverable.id} className={`relative group p-6 rounded-2xl border-2 transition-all hover:shadow-lg ${
                      deliverable.status === 'submitted' ? 'border-blue-200 bg-blue-50' :
                      deliverable.status === 'in-progress' ? 'border-yellow-200 bg-yellow-50' :
                      'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`p-3 rounded-xl ${
                            deliverable.type === 'video' ? 'bg-red-100 text-red-600' :
                            deliverable.type === 'image' ? 'bg-blue-100 text-blue-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {deliverable.type === 'video' ? <Video size={20} /> :
                             deliverable.type === 'image' ? <Image size={20} /> :
                             <File size={20} />}
                          </div>
                          <div>
                            <h5 className="font-bold text-gray-900">{deliverable.title}</h5>
                            <p className="text-sm text-gray-600">Due: {deliverable.dueDate}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          deliverable.status === 'submitted' ? 'bg-blue-100 text-blue-700' :
                          deliverable.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                          deliverable.status === 'approved' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {deliverable.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        {deliverable.status === 'submitted' && (
                          <div className="flex space-x-3">
                            <button className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all">
                              Approve
                            </button>
                            <button className="flex-1 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-all">
                              Request Revision
                            </button>
                          </div>
                        )}
                        <button className="w-full py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-[#9333EA] hover:text-[#9333EA] transition-all">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderCompletedTab = () => {
    return (
      <div className="space-y-8">
        {/* Success Metrics */}
        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-8 border border-pink-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Campaign Success Dashboard</h3>
              <p className="text-gray-600">Performance overview of completed campaigns</p>
            </div>
            <div className="p-3 bg-white rounded-xl shadow-sm">
              <Trophy className="text-pink-600" size={24} />
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-[#9333EA] mb-2">${stats.totalBudget.toLocaleString()}</div>
              <div className="text-gray-600">Total Investment</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-emerald-600 mb-2">42%</div>
              <div className="text-gray-600">Average ROI</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stats.totalPromotions}</div>
              <div className="text-gray-600">Total Campaigns</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl font-bold text-pink-600 mb-2">4.8</div>
              <div className="text-gray-600">Avg. Rating</div>
            </div>
          </div>
        </div>

        {/* Completed Campaigns */}
        {completedCampaigns.length > 0 ? (
          completedCampaigns.map(campaign => {
            const Icon = campaign.icon;
            return (
              <div key={campaign.id} className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                
                <div className="relative bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className={`bg-gradient-to-r ${campaign.color} p-8`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                          <Icon className="text-white" size={24} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{campaign.campaignTitle}</h3>
                          <p className="text-white/80">Completed • {campaign.campaignPeriod}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${i < campaign.rating ? 'text-amber-300 fill-amber-300' : 'text-white/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    {/* Performance Metrics */}
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-gray-900 mb-6">Campaign Performance</h4>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {Object.entries(campaign.metrics).map(([key, value]) => (
                          <div key={key} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
                            <div className="text-sm text-gray-600 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Brand Review */}
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-bold text-gray-900">Your Review</h5>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${i < campaign.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 italic">"{campaign.review}"</p>
                      </div>

                      {/* Influencer Review */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
                        <div className="flex items-center justify-between mb-4">
                          <h5 className="font-bold text-gray-900">Influencer's Feedback</h5>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={`${i < campaign.influencerRating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 italic">"{campaign.influencerReview}"</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4 mt-8 pt-8 border-t border-gray-200">
                      <button 
                        onClick={() => alert(`Downloading report for ${campaign.campaignTitle}`)}
                        className="flex-1 py-4 bg-gradient-to-r from-gray-900 to-gray-800 text-white rounded-2xl hover:shadow-xl transition-all flex items-center justify-center space-x-3"
                      >
                        
                        <RefreshCw size={20} />
                        <span>Re-run This Campaign</span>
                      </button>
                      <button 
                        onClick={() => alert(`Sharing results of ${campaign.campaignTitle}`)}
                        className="px-6 py-4 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-2xl hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                      >
                        <Share2 size={20} className="inline mr-2" />
                        Share Results
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-600 mb-2">No completed campaigns yet</h3>
            <p className="text-gray-500">Complete some active collaborations to see them here</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50">
      <Header />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Header */}
        <div className="relative mb-12">
          {/* Background Glow */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
          
          <div className="relative">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-[#9333EA] to-[#B366FF] rounded-xl">
                    <Crown className="text-white" size={24} />
                  </div>
                  <span className="text-sm font-medium text-[#9333EA] bg-purple-100 px-3 py-1 rounded-full">
                    Manage Work Dashboard
                  </span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Manage Your <span className="bg-gradient-to-r from-[#9333EA] to-pink-500 bg-clip-text text-transparent">Promotions</span>
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl">
                  Complete control over your influencer marketing campaigns. Track, manage, and optimize every aspect.
                </p>
              </div>
              
              <div className="flex space-x-4">
                {/* Removed Settings Button */}
                <button 
                  onClick={() => navigate("/promotion")}
                  className="px-6 py-3 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-xl hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center space-x-2 group"
                >
                  <Rocket size={20} />
                  <span>New Promotion</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total Campaigns", value: stats.totalPromotions, icon: Megaphone, color: "from-[#9333EA] to-[#B366FF]" },
                { label: "Pending Proposals", value: stats.totalProposals, icon: Send, color: "from-blue-500 to-cyan-500" },
                { label: "Active", value: stats.totalActive, icon: TrendingUpIcon, color: "from-emerald-500 to-teal-500" },
                { label: "Completed", value: stats.totalCompleted, icon: Trophy, color: "from-pink-500 to-rose-500" } // Changed to pink
              ].map((stat, index) => (
                <div key={index} className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  
                  <div className="relative bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                        <stat.icon className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search campaigns, influencers, or keywords..."
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#9333EA] focus:border-transparent shadow-sm hover:shadow-md transition-shadow"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-[#9333EA] hover:text-[#9333EA] transition-all flex items-center space-x-2"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
              <button 
                onClick={() => alert("Opening analytics dashboard")}
                className="px-6 py-4 bg-gradient-to-r from-[#9333EA] to-[#B366FF] text-white rounded-2xl hover:shadow-xl hover:shadow-purple-500/25 transition-all flex items-center space-x-2"
              >
                <BarChart size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation Tabs */}
        <div className="mb-12">
          <div className="relative">
            <div className="relative flex flex-wrap gap-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-2">
              {[
                { id: 'promotions', label: 'Promotions Posted', icon: Megaphone, color: 'from-[#9333EA] to-[#B366FF]' },
                { id: 'proposals', label: 'Proposals Received', icon: Send, color: 'from-blue-500 to-cyan-500' },
                { id: 'active', label: 'Active Collaborations', icon: TrendingUpIcon, color: 'from-emerald-500 to-teal-500' },
                { id: 'completed', label: 'Completed Campaigns', icon: Trophy, color: 'from-pink-500 to-rose-500' } // Changed to pink
              ].map((tab) => {
                const Icon = tab.icon;
                const count = tab.id === 'promotions' 
                  ? stats.totalPromotions
                  : tab.id === 'proposals'
                  ? stats.totalProposals
                  : tab.id === 'active'
                  ? stats.totalActive
                  : stats.totalCompleted;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`group relative flex-1 min-w-[200px] px-6 py-4 rounded-xl transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${tab.color} shadow-lg`}></div>
                    )}
                    <div className="relative z-10 flex items-center justify-center space-x-3">
                      <div className={`p-2 rounded-lg ${
                        activeTab === tab.id 
                          ? 'bg-white/20 backdrop-blur-sm' 
                          : 'bg-gray-100'
                      }`}>
                        <Icon size={20} className={activeTab === tab.id ? 'text-white' : 'text-gray-600'} />
                      </div>
                      <div className="text-left">
                        <div className="font-semibold">{tab.label}</div>
                        <div className={`text-sm ${
                          activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                        }`}>
                          {count} {count === 1 ? 'item' : 'items'}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-[600px]">
          {activeTab === 'promotions' && renderPromotionsTab()}
          {activeTab === 'proposals' && renderProposalsTab()}
          {activeTab === 'active' && renderActiveTab()}
          {activeTab === 'completed' && renderCompletedTab()}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Campaign Performance</h3>
            <p className="text-gray-600">Overall success metrics across all campaigns</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-100 text-center">
              <div className="text-4xl font-bold text-[#9333EA] mb-2">${stats.totalBudget.toLocaleString()}</div>
              <div className="text-gray-600">Total Campaign Value</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-8 rounded-2xl border border-emerald-100 text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">142%</div>
              <div className="text-gray-600">Total ROI</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border border-blue-100 text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">28</div>
              <div className="text-gray-600">Influencers Worked With</div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-8 rounded-2xl border border-pink-100 text-center">
              <div className="text-4xl font-bold text-pink-600 mb-2">4.9</div>
              <div className="text-gray-600">Avg. Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Bell */}
      <button 
        onClick={() => alert("You have 3 new notifications!")}
        className="fixed bottom-8 left-8 z-40 p-3 bg-white text-gray-900 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all transform hover:scale-110"
      >
        <div className="relative">
          <Bell size={24} />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            3
          </span>
        </div>
      </button>
    </div>
  );
};export default Managework;
