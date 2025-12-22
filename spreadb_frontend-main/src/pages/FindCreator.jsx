import React, { useState, useEffect } from "react";
import Header from "../components/Navbar";
import {
  Search,
  Filter,
  Users,
  Star,
  TrendingUp,
  MapPin,
  Instagram,
  Youtube,
  Heart,
  Eye,
  Check,
  Grid,
  List,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  X,
  Mail,
  DollarSign,
  Calendar,
  Award,
  UserPlus,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Camera,
  MessageCircle,
  BarChart,
  Shield,
  Zap,
  Globe,
  Target,
  Bookmark,
  Download,
  Share2,
  Crown,
  Sparkles,
  Mic,
  Gamepad2,
  Coffee,
  Dumbbell,
  ShoppingBag,
  Smartphone,
  Palette,
  Music,
  Home,
  Hash
} from "lucide-react";

const FindCreator = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePlatform, setActivePlatform] = useState("all");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [savedCreators, setSavedCreators] = useState([1, 3, 5]);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [showCreatorModal, setShowCreatorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [creatorsPerPage] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  // Color palette using brand color #b033ea
  const colors = {
    primary: "#b033ea",
    primaryLight: "#f3e8fd",
    primaryLighter: "#faf5ff",
    primaryDark: "#8a27c2",
    secondary: "#7c3aed",
    accent: "#10B981",
    background: "#F9FAFB",
    cardBg: "#FFFFFF",
    textPrimary: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    gradient: "linear-gradient(135deg, #b033ea 0%, #7c3aed 100%)",
    lightGradient: "linear-gradient(135deg, #f3e8fd 0%, #ede9fe 100%)",
  };

  // Image URLs for creator profiles
  const creatorImages = [
    "https://images.unsplash.com/photo-1494790108755-2616b786d4d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ];

  // All creators data - Updated with images
  const allCreators = [
    {
      id: 1,
      name: "Priya Sharma",
      handle: "@priyabeauty",
      category: "Beauty & Skincare",
      followers: "245K",
      engagement: "8.2%",
      location: "Mumbai",
      platforms: [
        { name: "Instagram", icon: Instagram, followers: "180K", engagement: "9.1%", brandColor: "#E4405F" },
        { name: "YouTube", icon: Youtube, followers: "65K", engagement: "6.5%", brandColor: "#FF0000" }
      ],
      rate: "₹25K - ₹50K",
      verified: true,
      premium: true,
      avatar: "PS",
      badge: "Top Rated",
      badgeColor: colors.primary,
      bio: "Award-winning makeup artist & skincare expert with 5+ years experience. Specializes in bridal makeup and product reviews.",
      tags: ["Makeup", "Skincare", "Tutorials", "Bridal"],
      metrics: {
        avgViews: "45K",
        responseTime: "24h",
        completionRate: "96%",
        satisfaction: "4.8",
        audienceGender: "85% Female"
      },
      recentCampaigns: [
        { brand: "Maybelline", type: "Instagram Reels", result: "2.4M views" },
        { brand: "NIVEA", type: "Product Review", result: "12K clicks" }
      ],
      imageUrl: creatorImages[0]
    },
    {
      id: 2,
      name: "Rohan Verma",
      handle: "@techwithrohan",
      category: "Tech & Gadgets",
      followers: "156K",
      engagement: "6.7%",
      location: "Bangalore",
      platforms: [
        { name: "YouTube", icon: Youtube, followers: "120K", engagement: "7.2%", brandColor: "#FF0000" },
        { name: "Twitter", icon: Twitter, followers: "36K", engagement: "4.8%", brandColor: "#1DA1F2" }
      ],
      rate: "₹40K - ₹75K",
      verified: true,
      premium: true,
      avatar: "RV",
      badge: "Tech Expert",
      badgeColor: colors.primary,
      bio: "Tech reviewer & gadget enthusiast known for unbiased reviews and detailed tutorials. Focus on Indian market tech products.",
      tags: ["Tech", "Reviews", "Gadgets", "Smartphones"],
      metrics: {
        avgViews: "85K",
        responseTime: "12h",
        completionRate: "98%",
        satisfaction: "4.9",
        audienceGender: "78% Male"
      },
      imageUrl: creatorImages[1]
    },
    {
      id: 3,
      name: "Ananya Patel",
      handle: "@ananyastyle",
      category: "Fashion & Style",
      followers: "320K",
      engagement: "9.1%",
      location: "Delhi",
      platforms: [
        { name: "Instagram", icon: Instagram, followers: "280K", engagement: "10.2%", brandColor: "#E4405F" },
        { name: "LinkedIn", icon: Linkedin, followers: "40K", engagement: "7.8%", brandColor: "#0A66C2" }
      ],
      rate: "₹50K - ₹90K",
      verified: true,
      premium: true,
      avatar: "AP",
      badge: "Fashion Icon",
      badgeColor: colors.primary,
      bio: "Fashion influencer & stylist specializing in Indian ethnic wear and sustainable fashion. Known for detailed outfit breakdowns.",
      tags: ["Fashion", "Style", "OOTD", "Ethnic"],
      metrics: {
        avgViews: "120K",
        responseTime: "48h",
        completionRate: "94%",
        satisfaction: "4.7",
        audienceGender: "92% Female"
      },
      imageUrl: creatorImages[2]
    },
    {
      id: 4,
      name: "Arjun Singh",
      handle: "@fitwitharjun",
      category: "Fitness & Wellness",
      followers: "189K",
      engagement: "7.5%",
      location: "Chennai",
      platforms: [
        { name: "YouTube", icon: Youtube, followers: "110K", engagement: "8.1%", brandColor: "#FF0000" },
        { name: "Instagram", icon: Instagram, followers: "79K", engagement: "6.8%", brandColor: "#E4405F" }
      ],
      rate: "₹20K - ₹45K",
      verified: true,
      premium: false,
      avatar: "AS",
      badge: "Certified Coach",
      badgeColor: colors.success,
      bio: "Certified fitness coach & nutritionist focusing on home workouts and Indian diet plans. Transformational stories and science-backed advice.",
      tags: ["Fitness", "Wellness", "Nutrition", "Workouts"],
      metrics: {
        avgViews: "65K",
        responseTime: "36h",
        completionRate: "97%",
        satisfaction: "4.8",
        audienceGender: "55% Male, 45% Female"
      },
      imageUrl: creatorImages[3]
    },
    {
      id: 5,
      name: "Meera Reddy",
      handle: "@meerafoodie",
      category: "Food & Travel",
      followers: "278K",
      engagement: "8.9%",
      location: "Hyderabad",
      platforms: [
        { name: "Instagram", icon: Instagram, followers: "190K", engagement: "9.5%", brandColor: "#E4405F" },
        { name: "YouTube", icon: Youtube, followers: "88K", engagement: "7.8%", brandColor: "#FF0000" }
      ],
      rate: "₹30K - ₹60K",
      verified: true,
      premium: true,
      avatar: "MR",
      badge: "Food Critic",
      badgeColor: colors.warning,
      bio: "Food blogger & travel enthusiast exploring authentic Indian cuisine and hidden travel gems. High-quality photography and storytelling.",
      tags: ["Food", "Travel", "Recipes", "Photography"],
      metrics: {
        avgViews: "95K",
        responseTime: "24h",
        completionRate: "95%",
        satisfaction: "4.6",
        audienceGender: "68% Female"
      },
      imageUrl: creatorImages[4]
    },
    {
      id: 6,
      name: "Vikram Joshi",
      handle: "@vikramgaming",
      category: "Gaming & Esports",
      followers: "412K",
      engagement: "5.8%",
      location: "Pune",
      platforms: [
        { name: "YouTube", icon: Youtube, followers: "350K", engagement: "6.2%", brandColor: "#FF0000" },
        { name: "Twitter", icon: Twitter, followers: "62K", engagement: "4.1%", brandColor: "#1DA1F2" }
      ],
      rate: "₹60K - ₹1.2L",
      verified: true,
      premium: true,
      avatar: "VJ",
      badge: "Pro Gamer",
      badgeColor: colors.danger,
      bio: "Professional gamer & streamer focusing on popular games and esports commentary. Interactive streams with high viewer engagement.",
      tags: ["Gaming", "Streaming", "Esports", "PC Games"],
      metrics: {
        avgViews: "250K",
        responseTime: "72h",
        completionRate: "99%",
        satisfaction: "4.9",
        audienceGender: "88% Male"
      },
      imageUrl: creatorImages[5]
    },
  ];

  const [creators, setCreators] = useState(allCreators);

  // Categories with professional colors
  const categories = [
    { id: "all", name: "All", icon: Hash, color: colors.primary, bgColor: colors.primaryLighter },
    { id: "beauty", name: "Beauty", icon: Palette, color: "#EC4899", bgColor: "#fdf2f8" },
    { id: "fashion", name: "Fashion", icon: ShoppingBag, color: "#8B5CF6", bgColor: "#f5f3ff" },
    { id: "tech", name: "Tech", icon: Smartphone, color: "#3B82F6", bgColor: "#eff6ff" },
    { id: "lifestyle", name: "Lifestyle", icon: Home, color: "#10B981", bgColor: "#f0fdf4" },
    { id: "fitness", name: "Fitness", icon: Dumbbell, color: "#059669", bgColor: "#ecfdf5" },
    { id: "food", name: "Food", icon: Coffee, color: "#F59E0B", bgColor: "#fffbeb" },
    { id: "gaming", name: "Gaming", icon: Gamepad2, color: "#EF4444", bgColor: "#fef2f2" },
    { id: "music", name: "Music", icon: Music, color: "#8B5CF6", bgColor: "#faf5ff" },
    { id: "travel", name: "Travel", icon: Globe, color: "#06B6D4", bgColor: "#f0f9ff" }
  ];

  // Platforms with brand colors
  const platforms = [
    { id: "all", name: "All", icon: Globe, color: colors.primary, bgColor: colors.primaryLighter },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "#E4405F", bgColor: "#fdf2f8" },
    { id: "youtube", name: "YouTube", icon: Youtube, color: "#FF0000", bgColor: "#fef2f2" },
    { id: "twitter", name: "Twitter", icon: Twitter, color: "#1DA1F2", bgColor: "#eff6ff" },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "#0A66C2", bgColor: "#f0f9ff" }
  ];

  // Advanced filters
  const advancedFilters = [
    { id: "engagement", label: "Engagement > 5%", value: "highEngagement" },
    { id: "verified", label: "Verified Only", value: "verified" },
    { id: "premium", label: "Premium Creators", value: "premium" },
    { id: "recent", label: "Recent Activity", value: "recent" },
  ];

  // Stats for the header
  const stats = [
    {
      id: 1,
      title: "Creators Found",
      value: creators.length,
      icon: Users,
      color: "#3b82f6",
      bgColor: "#eff6ff",
      change: "+128 this month"
    },
    {
      id: 2,
      title: "Avg Engagement",
      value: "7.8%",
      icon: TrendingUp,
      color: "#10b981",
      bgColor: "#dcfce7",
      change: "+2.1% from avg"
    },
    {
      id: 3,
      title: "Verified",
      value: "98%",
      icon: Shield,
      color: "#8b5cf6",
      bgColor: "#f5f3ff",
      change: "100% authentic"
    },
    {
      id: 4,
      title: "Response Rate",
      value: "89%",
      icon: MessageCircle,
      color: "#f59e0b",
      bgColor: "#fffbeb",
      change: "Fast responders"
    }
  ];

  // Function handlers
  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Searching for:", searchQuery);
    
    setTimeout(() => {
      const filtered = allCreators.filter(creator =>
        creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        creator.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setCreators(filtered);
      setCurrentPage(1);
      setLoading(false);
    }, 500);
  };

  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    
    if (categoryId === "all") {
      setCreators(allCreators);
    } else {
      const filtered = allCreators.filter(creator => 
        creator.category.toLowerCase().includes(categoryId)
      );
      setCreators(filtered);
    }
  };

  const handlePlatformFilter = (platformId) => {
    setActivePlatform(platformId);
    setCurrentPage(1);
    
    if (platformId === "all") {
      setCreators(allCreators);
    } else {
      const filtered = allCreators.filter(creator =>
        creator.platforms.some(p => 
          p.name.toLowerCase().includes(platformId)
        )
      );
      setCreators(filtered);
    }
  };

  const toggleSaveCreator = (id) => {
    if (savedCreators.includes(id)) {
      setSavedCreators(savedCreators.filter(creatorId => creatorId !== id));
    } else {
      setSavedCreators([...savedCreators, id]);
    }
  };

  const handleConnect = (creator) => {
    console.log("Connecting with:", creator.name);
    alert(`✅ Connection request sent to ${creator.name}!\nThey have 48 hours to respond.`);
  };

  const handleViewProfile = (creator) => {
    setSelectedCreator(creator);
    setShowCreatorModal(true);
  };

  const handleClearFilters = () => {
    setActiveCategory("all");
    setActivePlatform("all");
    setSearchQuery("");
    setCreators(allCreators);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handleSendMessage = (creator) => {
    const message = prompt(`Send a message to ${creator.name}:`, "Hi! I'm interested in collaborating...");
    if (message) {
      console.log("Message sent:", message);
    }
  };

  const handleDownloadReport = (creator) => {
    console.log("Downloading report for:", creator.name);
  };

  const handleSortChange = (sortType) => {
    setSortBy(sortType);
    let sorted = [...creators];
    
    switch(sortType) {
      case "followers":
        sorted.sort((a, b) => {
          const aNum = parseFloat(a.followers.replace('K', '')) * 1000;
          const bNum = parseFloat(b.followers.replace('K', '')) * 1000;
          return bNum - aNum;
        });
        break;
      case "engagement":
        sorted.sort((a, b) => {
          const aNum = parseFloat(a.engagement.replace('%', ''));
          const bNum = parseFloat(b.engagement.replace('%', ''));
          return bNum - aNum;
        });
        break;
      case "rate":
        sorted.sort((a, b) => {
          const aNum = parseFloat(a.rate.replace(/[^0-9]/g, ''));
          const bNum = parseFloat(b.rate.replace(/[^0-9]/g, ''));
          return aNum - bNum;
        });
        break;
      default:
        sorted = allCreators;
        break;
    }
    
    setCreators(sorted);
  };

  // Pagination logic
  const indexOfLastCreator = currentPage * creatorsPerPage;
  const indexOfFirstCreator = indexOfLastCreator - creatorsPerPage;
  const currentCreators = creators.slice(indexOfFirstCreator, indexOfLastCreator);
  const totalPages = Math.ceil(creators.length / creatorsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 600, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Header />
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12">
        
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                Find <span className="bg-gradient-to-r from-[#b033ea] to-[#7c3aed] bg-clip-text text-transparent">Creators</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl">
                Discover and connect with verified influencers for your campaigns. Complete control over your influencer search and selection.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-6 py-3 bg-gradient-to-r from-[#b033ea] to-[#7c3aed] text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <Filter className="w-5 h-5" />
                Advanced Filters
              </button>
            </div>
          </div>

          {/* Stats Grid - FIXED COLORS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div 
                key={stat.id} 
                className="rounded-2xl border border-gray-200/50 p-6 shadow-sm hover:shadow-md transition-all duration-300"
                style={{ backgroundColor: stat.bgColor }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl"
                    style={{ backgroundColor: stat.bgColor }}
                  >
                    <stat.icon 
                      className="w-6 h-6" 
                      style={{ color: stat.color }} 
                    />
                  </div>
                  <span 
                    className="text-xs font-medium px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: stat.color }}
                  >
                    {stat.id === 1 ? "Total" : "Live"}
                  </span>
                </div>
                <p 
                  className="text-3xl font-bold mb-2"
                  style={{ color: stat.color }}
                >
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-gray-600 mb-2">{stat.title}</p>
                <p 
                  className="text-xs font-medium"
                  style={{ color: stat.color }}
                >
                  {stat.change}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-8 shadow-lg animate-slideDown">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Advanced Filters
              </h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {advancedFilters.map((filter) => (
                <label key={filter.id} className="flex items-center gap-3 p-4 bg-gray-50/50 rounded-xl border border-gray-200 hover:bg-gray-100/50 transition-colors cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#b033ea] focus:ring-[#b033ea] focus:ring-2"
                  />
                  <span className="text-sm font-medium text-gray-700">{filter.label}</span>
                </label>
              ))}
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="200000"
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="text-sm font-medium text-gray-600">₹0 - ₹2L</span>
                </div>
              </div>
              <button className="px-6 py-3 bg-gradient-to-r from-[#b033ea] to-[#7c3aed] text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Main Search & Filter Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-8 shadow-lg">
          
          {/* Search Bar */}
          <div className="mb-8">
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#b033ea]/20 to-[#7c3aed]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                <div className="relative">
                  <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400 z-10" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search creators by name, niche, skills, or keywords..."
                    className="w-full pl-16 pr-40 py-4 bg-white border-2 border-gray-300/50 rounded-2xl focus:outline-none focus:border-[#b033ea] focus:ring-4 focus:ring-[#b033ea]/10 text-lg text-gray-900 placeholder-gray-500 transition-all duration-300 z-20 relative"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-8 py-3 bg-gradient-to-r from-[#b033ea] to-[#7c3aed] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md z-20"
                  >
                    Search Creators
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Category Filters */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
              Browse Categories
            </h3>
            <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryFilter(category.id)}
                  className={`flex-shrink-0 px-6 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 group hover:scale-[1.02] ${
                    activeCategory === category.id 
                    ? 'shadow-lg transform scale-[1.02]' 
                    : 'bg-white border border-gray-200/50 hover:border-gray-300 hover:shadow-md'
                  }`}
                  style={activeCategory === category.id ? { 
                    backgroundColor: category.color,
                    color: 'white'
                  } : { backgroundColor: category.bgColor }}
                >
                  <div className={`p-2 rounded-lg ${activeCategory === category.id ? 'bg-white/20' : ''}`}>
                    <category.icon className="w-5 h-5" style={activeCategory === category.id ? { color: 'white' } : { color: category.color }} />
                  </div>
                  <span className={`font-medium ${activeCategory === category.id ? 'font-semibold' : ''}`}>
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Platform Filters */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Globe className="w-5 h-5" style={{ color: colors.primary }} />
              Filter by Platform
            </h3>
            <div className="flex flex-wrap gap-3">
              {platforms.map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handlePlatformFilter(platform.id)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-3 group hover:scale-[1.02] ${
                    activePlatform === platform.id 
                    ? 'shadow-lg transform scale-[1.02]' 
                    : 'bg-white border border-gray-200/50 hover:border-gray-300 hover:shadow-md'
                  }`}
                  style={activePlatform === platform.id ? { 
                    backgroundColor: platform.color,
                    color: 'white'
                  } : { backgroundColor: platform.bgColor }}
                >
                  <platform.icon className="w-5 h-5" style={activePlatform === platform.id ? { color: 'white' } : { color: platform.color }} />
                  <span className={`font-medium ${activePlatform === platform.id ? 'font-semibold' : ''}`}>
                    {platform.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 mb-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100/50 rounded-xl p-1.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    viewMode === "grid" 
                    ? 'bg-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                  }`}
                  style={viewMode === "grid" ? { 
                    color: colors.primary,
                    boxShadow: `0 4px 20px ${colors.primary}20`
                  } : {}}
                >
                  <Grid className="w-5 h-5" />
                  <span className="text-sm font-medium">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-3 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                    viewMode === "list" 
                    ? 'bg-white shadow-md' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
                  }`}
                  style={viewMode === "list" ? { 
                    color: colors.primary,
                    boxShadow: `0 4px 20px ${colors.primary}20`
                  } : {}}
                >
                  <List className="w-5 h-5" />
                  <span className="text-sm font-medium">List</span>
                </button>
              </div>
              <div>
                <p className="text-gray-600">
                  Showing <span className="font-bold text-lg" style={{ color: colors.primary }}>{currentCreators.length}</span> of {creators.length} creators
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Sort by:</span>
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="appearance-none border border-gray-300/50 rounded-xl px-5 py-3 bg-white focus:outline-none focus:border-[#b033ea] focus:ring-4 focus:ring-[#b033ea]/10 text-gray-700 font-medium w-48 cursor-pointer"
                >
                  <option value="relevance">Relevance</option>
                  <option value="followers">Followers (High to Low)</option>
                  <option value="engagement">Engagement Rate</option>
                  <option value="rate">Price (Low to High)</option>
                </select>
                <ChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
            <div className="inline-flex flex-col items-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-[#b033ea] rounded-full animate-spin border-t-transparent"></div>
              </div>
              <p className="mt-6 text-gray-600 text-lg font-medium">Searching creators...</p>
              <p className="text-gray-500 mt-2">Finding the perfect match for your campaign</p>
            </div>
          </div>
        ) : creators.length === 0 ? (
          <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-sm">
            <div className="inline-block p-8 rounded-3xl mb-6" style={{ background: colors.lightGradient }}>
              <Search className="w-20 h-20" style={{ color: colors.primary }} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No creators found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">Try adjusting your search terms or filters to find more creators</p>
            <button
              onClick={handleClearFilters}
              className="px-8 py-3.5 bg-gradient-to-r from-[#b033ea] to-[#7c3aed] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all duration-300 shadow-md"
            >
              Clear All Filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentCreators.map((creator) => (
              <div key={creator.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1">
                {/* Creator Header with Gradient Background */}
                <div className="relative h-40 overflow-hidden" style={{ background: colors.gradient }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  
                  {/* Creator Image */}
                  <div className="absolute -bottom-8 left-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                        <img 
                          src={creator.imageUrl} 
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {creator.premium && (
                        <div className="absolute -top-2 -right-2">
                          <Crown className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Save Button */}
                  <div className="absolute top-4 right-4">
                    <button
                      onClick={() => toggleSaveCreator(creator.id)}
                      className="p-2.5 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors"
                    >
                      <Heart className={`w-5 h-5 ${savedCreators.includes(creator.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="pt-16 px-6 pb-6">
                  {/* Creator Info */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-bold text-gray-900">{creator.name}</h3>
                          {creator.verified && (
                            <div className="p-1 rounded-full" style={{ backgroundColor: colors.primaryLight }}>
                              <Check className="w-3 h-3" style={{ color: colors.primary }} />
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm">{creator.handle}</p>
                      </div>
                      {creator.badge && (
                        <div 
                          className="text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                          style={{ backgroundColor: creator.badgeColor }}
                        >
                          {creator.badge}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <MapPin className="w-4 h-4" />
                      {creator.location} • {creator.category}
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{creator.bio}</p>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                        <Users className="w-4 h-4" />
                        Followers
                      </div>
                      <p className="text-xl font-bold text-gray-900">{creator.followers}</p>
                    </div>
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                      <div className="flex items-center gap-2 text-gray-600 text-sm mb-1">
                        <TrendingUp className="w-4 h-4" />
                        Engagement
                      </div>
                      <p className="text-xl font-bold text-gray-900">{creator.engagement}</p>
                    </div>
                  </div>

                  {/* Rate and Response */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                      <div className="flex items-center gap-2 text-purple-600 text-sm mb-1">
                        <DollarSign className="w-4 h-4" />
                        Rate
                      </div>
                      <p className="text-lg font-bold text-purple-700">{creator.rate}</p>
                    </div>
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-center gap-2 text-blue-600 text-sm mb-1">
                        <Clock className="w-4 h-4" />
                        Response
                      </div>
                      <p className="text-lg font-semibold text-blue-700">{creator.metrics.responseTime}</p>
                    </div>
                  </div>

                  {/* Platforms */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">Platforms</p>
                    <div className="flex gap-2">
                      {creator.platforms.map((platform, idx) => (
                        <div key={idx} className="flex-1 bg-gray-50/50 rounded-xl p-3 border border-gray-200/50">
                          <div className="flex items-center gap-2 mb-1">
                            {platform.icon && <platform.icon className="w-4 h-4" style={{ color: platform.brandColor }} />}
                            <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                          </div>
                          <p className="text-xs text-gray-500">{platform.followers}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-2">
                      {creator.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{ backgroundColor: colors.primaryLight, color: colors.primary }}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleViewProfile(creator)}
                      className="flex-1 py-3 border-2 border-gray-300/50 rounded-xl hover:border-gray-400 hover:bg-gray-50/50 font-medium text-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                      <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      View Profile
                    </button>
                    <button
                      onClick={() => handleConnect(creator)}
                      className="flex-1 py-3 text-white rounded-xl hover:shadow-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                      style={{ background: colors.gradient }}
                    >
                      <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                      Connect
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4 mb-12">
            {currentCreators.map((creator) => (
              <div key={creator.id} className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-0.5">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
                      <img 
                        src={creator.imageUrl} 
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {creator.premium && (
                      <div className="absolute -top-2 -right-2 text-white p-1.5 rounded-full shadow-lg"
                           style={{ background: colors.gradient }}>
                        <Crown className="w-4 h-4" />
                      </div>
                    )}
                  </div>

                  {/* Main Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900">{creator.name}</h3>
                          {creator.verified && (
                            <div className="flex items-center gap-1 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-sm"
                                 style={{ background: colors.gradient }}>
                              <Check className="w-4 h-4" />
                              Verified
                            </div>
                          )}
                          {creator.badge && (
                            <div 
                              className="text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm"
                              style={{ backgroundColor: creator.badgeColor }}
                            >
                              {creator.badge}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-gray-600 mb-3">
                          <span className="font-medium">{creator.handle}</span>
                          <span>•</span>
                          <span className="font-medium">{creator.category}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {creator.location}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-6 line-clamp-2">{creator.bio}</p>
                      </div>
                      <button
                        onClick={() => toggleSaveCreator(creator.id)}
                        className="p-2.5 hover:bg-gray-100/50 rounded-xl transition-colors"
                      >
                        <Heart className={`w-6 h-6 ${savedCreators.includes(creator.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                      </button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-6 mb-6">
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-200/50">
                        <p className="text-sm text-gray-600 mb-2">Followers</p>
                        <p className="text-2xl font-bold text-gray-900">{creator.followers}</p>
                      </div>
                      <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-200/50">
                        <p className="text-sm text-gray-600 mb-2">Engagement</p>
                        <p className="text-2xl font-bold text-gray-900">{creator.engagement}</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
                        <p className="text-sm text-purple-600 mb-2">Rate</p>
                        <p className="text-2xl font-bold text-purple-700">{creator.rate}</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                        <p className="text-sm text-blue-600 mb-2">Response Time</p>
                        <p className="text-xl font-bold text-blue-700">{creator.metrics.responseTime}</p>
                      </div>
                    </div>

                    {/* Platforms & Action Buttons */}
                    <div className="flex items-center justify-between gap-6">
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-3">Platforms</p>
                        <div className="flex gap-2">
                          {creator.platforms.map((platform, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-2 bg-gray-50/50 rounded-xl border border-gray-200/50">
                              {platform.icon && <platform.icon className="w-4 h-4" style={{ color: platform.brandColor }} />}
                              <span className="text-sm font-medium text-gray-900">{platform.name}</span>
                              <span className="text-xs text-gray-500">({platform.followers})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewProfile(creator)}
                          className="px-6 py-3 border border-gray-300/50 rounded-xl font-medium hover:bg-gray-50/50 text-gray-700 flex items-center gap-2 transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                        <button
                          onClick={() => handleConnect(creator)}
                          className="px-8 py-3 text-white rounded-xl font-semibold hover:shadow-lg flex items-center gap-2 transition-all duration-300 group"
                          style={{ background: colors.gradient }}
                        >
                          <UserPlus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                          Connect Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {creators.length > creatorsPerPage && (
          <div className="flex items-center justify-center gap-2 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-5 py-3 border border-gray-300/50 rounded-xl hover:bg-gray-50/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-gray-700 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>
            
            {getPageNumbers().map((pageNum, index) => (
              <button
                key={index}
                onClick={() => typeof pageNum === 'number' && handlePageChange(pageNum)}
                disabled={pageNum === '...'}
                className={`w-12 h-12 rounded-xl font-medium transition-all duration-300 ${
                  currentPage === pageNum
                    ? 'text-white shadow-lg scale-105'
                    : 'hover:bg-gray-50/50 text-gray-700'
                } ${pageNum === '...' ? 'cursor-default hover:bg-transparent' : 'hover:scale-105'}`}
                style={currentPage === pageNum ? { background: colors.gradient } : {}}
              >
                {pageNum}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-5 py-3 border border-gray-300/50 rounded-xl hover:bg-gray-50/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-gray-700 transition-all duration-300"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-2xl p-10 text-center shadow-2xl"
             style={{ background: colors.gradient }}>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full -translate-x-40 translate-y-40"></div>
          
          <div className="relative z-10">
            <div className="inline-block p-4 rounded-2xl bg-white/20 backdrop-blur-sm mb-6">
              <Sparkles className="w-10 h-10 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Need Help Finding the Right Creator?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Our expert team analyzes 50+ parameters to find creators who perfectly align with your brand values.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-white font-bold rounded-xl hover:bg-gray-100 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                      style={{ color: colors.primary }}>
                <Users className="w-6 h-6" />
                Book Expert Consultation
              </button>
              <button className="px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 font-bold rounded-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 text-white">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Creator Detail Modal */}
      {showCreatorModal && selectedCreator && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 p-6 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-lg">
                    <img 
                      src={selectedCreator.imageUrl} 
                      alt={selectedCreator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-2xl font-bold text-gray-900">{selectedCreator.name}</h2>
                      {selectedCreator.verified && (
                        <div className="flex items-center gap-1 text-white px-3 py-1 rounded-full text-sm"
                             style={{ background: colors.gradient }}>
                          <Check className="w-4 h-4" />
                          Verified
                        </div>
                      )}
                      {selectedCreator.premium && (
                        <div className="flex items-center gap-1 text-white px-3 py-1 rounded-full text-sm"
                             style={{ background: colors.gradient }}>
                          <Crown className="w-4 h-4" />
                          Premium
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-gray-600">
                      <span>{selectedCreator.handle}</span>
                      <span>•</span>
                      <span className="font-medium">{selectedCreator.category}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {selectedCreator.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveCreator(selectedCreator.id)}
                    className="p-2.5 hover:bg-gray-100/50 rounded-xl transition-colors"
                  >
                    <Heart className={`w-5 h-5 ${savedCreators.includes(selectedCreator.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => setShowCreatorModal(false)}
                    className="p-2.5 hover:bg-gray-100/50 rounded-xl transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                  {/* Bio */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Sparkles className="w-5 h-5" style={{ color: colors.primary }} />
                      About
                    </h3>
                    <p className="text-gray-600 bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">{selectedCreator.bio}</p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                      <p className="text-sm text-gray-600 mb-1">Avg. Views</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCreator.metrics.avgViews}</p>
                    </div>
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                      <p className="text-sm text-gray-600 mb-1">Response Time</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCreator.metrics.responseTime}</p>
                    </div>
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                      <p className="text-sm text-gray-600 mb-1">Completion Rate</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCreator.metrics.completionRate}%</p>
                    </div>
                    <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50">
                      <p className="text-sm text-gray-600 mb-1">Satisfaction</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedCreator.metrics.satisfaction}/5</p>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedCreator.tags.map((tag, idx) => (
                        <span key={idx} className="px-4 py-2 rounded-xl font-medium"
                              style={{ backgroundColor: colors.primaryLight, color: colors.primary }}>
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Campaigns */}
                  {selectedCreator.recentCampaigns && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Campaigns</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedCreator.recentCampaigns.map((campaign, idx) => (
                          <div key={idx} className="rounded-xl p-4 border border-gray-200/50 bg-gradient-to-r from-gray-50/50 to-white/50">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-900">{campaign.brand}</span>
                              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">{campaign.type}</span>
                            </div>
                            <p className="text-gray-600">Result: {campaign.result}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column */}
                <div>
                  <div className="sticky top-6 bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Connect</h3>
                    
                    {/* Rate */}
                    <div className="mb-6 p-4 rounded-xl" style={{ background: colors.lightGradient }}>
                      <p className="text-sm text-gray-600 mb-1">Standard Rate</p>
                      <p className="text-3xl font-bold" style={{ color: colors.primary }}>{selectedCreator.rate}</p>
                    </div>

                    {/* Platforms */}
                    <div className="mb-6">
                      <p className="text-sm text-gray-600 mb-3">Platforms</p>
                      <div className="space-y-3">
                        {selectedCreator.platforms.map((platform, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-200/50">
                            <div className="flex items-center gap-3">
                              {platform.icon && <platform.icon className="w-5 h-5" style={{ color: platform.brandColor }} />}
                              <span className="font-medium text-gray-900">{platform.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-gray-900 font-medium block">{platform.engagement}</span>
                              <span className="text-xs text-gray-500">{platform.followers}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          handleConnect(selectedCreator);
                          setShowCreatorModal(false);
                        }}
                        className="w-full py-3.5 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
                        style={{ background: colors.gradient }}
                      >
                        Send Campaign Request
                      </button>
                      <button
                        onClick={() => handleSendMessage(selectedCreator)}
                        className="w-full py-3 border-2 rounded-xl font-semibold hover:bg-gray-50/50 transition-all duration-300"
                        style={{ borderColor: colors.primary, color: colors.primary }}
                      >
                        Send Message
                      </button>
                      <button
                        onClick={() => handleDownloadReport(selectedCreator)}
                        className="w-full py-3 border-2 border-gray-300/50 rounded-xl font-medium hover:bg-gray-50/50 text-gray-700 transition-all duration-300"
                      >
                        Download Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindCreator;