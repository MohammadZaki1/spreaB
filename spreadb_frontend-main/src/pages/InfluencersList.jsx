import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Users, 
  Star, 
  TrendingUp, 
  MapPin,
  Instagram,
  Youtube,
  Twitter,
  Heart,
  Eye,
  Check,
  Shield,
  Grid,
  List,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  X,
  Hash,
  Mail,
  ExternalLink,
  DollarSign,
  Calendar,
  CheckCircle2,
  Sparkles,
  Award,
  Zap,
  Globe,
  Tag,
  UserPlus,
  MessageSquare,
  Facebook,
  Linkedin,
  Loader2,
  Phone
} from 'lucide-react';
import Header from '../components/Navbar';
import axios from 'axios';
import { toast } from "sonner";
import { API_CONFIG } from '../config';
 // Adjust based on your backend URL
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

const InfluencersList = () => {
  const [influencers, setInfluencers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [savedInfluencers, setSavedInfluencers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedInfluencer, setSelectedInfluencer] = useState(null);
  const [showInfluencerModal, setShowInfluencerModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalInfluencers, setTotalInfluencers] = useState(0);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    minFollowers: '',
    maxFollowers: '',
    verified: '',
    search: ''
  });

   
  // const fetchInfluencers = async () => {
  //   try {
  //     setLoading(true);
  //     setError(null);

  //     const params = {
  //       page: currentPage,
  //       limit: 12,
  //       ...filters
  //     };

  //     // Clean up empty filter values
  //     Object.keys(params).forEach(key => {
  //       if (!params[key] && params[key] !== 0) {
  //         delete params[key];
  //       }
  //     });

  //     console.log("Fetching from:", `${API_CONFIG.BASE_URL}/profile/brand/influencers`);
  //     console.log("Params:", params);

  //     const response = await api.get('/profile/brand/influencers', { params });

  //     console.log("Response:", response.data); // Debug log

  //     if (response.data.success) {
  //       setInfluencers(response.data.data);
  //       setTotalPages(response.data.pagination.pages);
  //       setTotalInfluencers(response.data.pagination.total);
  //     } else {
  //       throw new Error(response.data.message || 'Failed to fetch influencers');
  //     }
  //   } catch (err) {
  //     console.error('Error fetching influencers:', err);
      
  //     // Check if it's a 404 error
  //     if (err.response?.status === 404) {
  //       setError('API endpoint not found. Please check backend routes.');
        
  //       // // Try a test endpoint
  //       // try {
  //       //   const testResponse = await api.get('/profile/test');
  //       //   console.log("Test endpoint response:", testResponse.data);
  //       // } catch (testErr) {
  //       //   console.error("Test endpoint also failed:", testErr);
  //       // }
  //     } else {
  //       setError(err.response?.data?.message || err.message || 'Failed to fetch influencers');
  //     }
      
  //     // For now, use empty array
  //     setInfluencers([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // useEffect(() => {
  //   fetchInfluencers();
  // }, [currentPage, filters]);


const fetchInfluencers = async () => {
  try {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("authToken");

    const res = await axios.get(
      `${API_CONFIG.BASE_URL}/profile/brand/influencers`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setInfluencers(res.data.influencers || []);
    setTotalInfluencers(res.data.count || 0);
  } catch (err) {
    console.error(err);
    toast.error(
      err.response?.data?.message || "Failed to fetch influencers"
    );
    setInfluencers([]);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchInfluencers();
}, []);

  const stats = [
    { 
      value: totalInfluencers.toString(), 
      label: "Active Influencers", 
      icon: Users, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50",
      trend: "+12%",
      trendUp: true
    },
    { 
      value: "8.2%", 
      label: "Avg. Engagement", 
      icon: TrendingUp, 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      trend: "+1.4%",
      trendUp: true
    },
    { 
      value: "15+", 
      label: "Categories", 
      icon: Hash, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      trend: "All Active",
      trendUp: true
    },
    { 
      value: "85%", 
      label: "Verified Profiles", 
      icon: Shield, 
      color: "text-amber-600", 
      bgColor: "bg-amber-50",
      trend: "+5%",
      trendUp: true
    }
  ];

  const categories = [
    { id: 'all', name: '🔥 All Categories', value: '' },
    { id: 'beauty', name: '💄 Beauty', value: 'Beauty' },
    { id: 'fashion', name: '👗 Fashion', value: 'Fashion' },
    { id: 'tech', name: '💻 Tech & Gadgets', value: 'Technology' },
    { id: 'lifestyle', name: '🏠 Lifestyle', value: 'Lifestyle' },
    { id: 'fitness', name: '💪 Fitness', value: 'Fitness' },
    { id: 'food', name: '🍕 Food & Travel', value: 'Food' },
    { id: 'gaming', name: '🎮 Gaming', value: 'Gaming' }
  ];

  const filterOptions = [
    { 
      label: "Followers Range", 
      icon: Users,
      options: [
        { label: "Mega (500k+)", value: "500000", field: "minFollowers" },
        { label: "Macro (100k-500k)", value: "100000", field: "minFollowers", max: "500000" },
        { label: "Micro (10k-100k)", value: "10000", field: "minFollowers", max: "100000" },
        { label: "Nano (<10k)", value: "", field: "maxFollowers", maxValue: "10000" }
      ] 
    },
    { 
      label: "Engagement Rate", 
      icon: TrendingUp,
      options: [
        { label: "High (10%+)", value: "10", field: "minEngagement" },
        { label: "Good (5-10%)", value: "5", field: "minEngagement", max: "10" },
        { label: "Average (3-5%)", value: "3", field: "minEngagement", max: "5" },
        { label: "All Rates", value: "", field: "minEngagement" }
      ] 
    },
    { 
      label: "Verification", 
      icon: Shield,
      options: [
        { label: "✅ Verified Only", value: "true", field: "verified" },
        { label: "🌐 All Profiles", value: "", field: "verified" }
      ] 
    }
  ];

  const toggleSaveInfluencer = (id) => {
    if (savedInfluencers.includes(id)) {
      setSavedInfluencers(savedInfluencers.filter(influencerId => influencerId !== id));
    } else {
      setSavedInfluencers([...savedInfluencers, id]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchQuery });
    setCurrentPage(1);
  };

  const handleQuickFilter = (category) => {
    setActiveFilter(category.id);
    setFilters({ ...filters, category: category.value });
    setCurrentPage(1);
  };

  const handleFilterChange = (field, value) => {
    const newFilters = { ...filters };
    
    if (value === '') {
      delete newFilters[field];
    } else {
      newFilters[field] = value;
    }
    
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      location: '',
      minFollowers: '',
      maxFollowers: '',
      verified: '',
      search: ''
    });
    setSearchQuery('');
    setActiveFilter('all');
    setCurrentPage(1);
  };

  const handleConnect = async (influencer) => {
    try {
      const token = localStorage.getItem('token');
      // Send connection request to backend
      await axios.post(`${API_CONFIG.BASE_URL}/connections/request`, {
        influencerId: influencer.userId,
        message: 'I would like to collaborate with you!'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert(`🤝 Connection request sent to ${influencer.firstName}! They'll review your request shortly.`);
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('Failed to send connection request. Please try again.');
    }
  };

  const handleViewProfile = (influencer) => {
    setSelectedInfluencer(influencer);
    setShowInfluencerModal(true);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const calculateTotalFollowers = (influencer) => {
    const instagram = influencer.socialMedia?.instagram?.followers || 0;
    const youtube = influencer.socialMedia?.youtube?.followers || 0;
    const twitter = influencer.socialMedia?.twitter?.followers || 0;
    return instagram + youtube + twitter;
  };

  const getTopPlatform = (influencer) => {
    const platforms = [
      { name: 'Instagram', followers: influencer.socialMedia?.instagram?.followers || 0 },
      { name: 'YouTube', followers: influencer.socialMedia?.youtube?.followers || 0 },
      { name: 'Twitter', followers: influencer.socialMedia?.twitter?.followers || 0 }
    ];
    return platforms.sort((a, b) => b.followers - a.followers)[0];
  };

  const renderInfluencerCard = (influencer) => {
    const totalFollowers = calculateTotalFollowers(influencer);
    const topPlatform = getTopPlatform(influencer);
    
    return (
      <div key={influencer._id} className="group relative">
        {/* Verification Badge */}
        {influencer.verified && (
          <div className="absolute top-4 left-4 z-10">
            <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
              <Shield className="w-3 h-3" />
              Verified
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group-hover:border-purple-200">
          {/* Avatar Section */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 relative">
            <div className="relative flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-white shadow-sm">
                  {influencer.profilePhoto ? (
                    <img 
                      src={`${API_CONFIG.BASE_URL}/${influencer.profilePhoto}`} 
                      alt={influencer.userName}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                      <span className="text-xl font-bold text-white">
                        {influencer.firstName?.[0]}{influencer.lastName?.[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {influencer.firstName} {influencer.lastName}
                  </h3>
                  <p className="text-gray-600">@{influencer.userName}</p>
                </div>
              </div>
              <button
                onClick={() => toggleSaveInfluencer(influencer._id)}
                className="p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-xl transition-colors shadow-sm"
              >
                <Heart className={`w-5 h-5 ${savedInfluencers.includes(influencer._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* About */}
            <p className="text-gray-600 mb-6 line-clamp-2 h-12">
              {influencer.about || 'No description available'}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Users className="w-4 h-4" />
                  Total Followers
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatNumber(totalFollowers)}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <TrendingUp className="w-4 h-4" />
                  Top Platform
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  {topPlatform.name}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Star className="w-4 h-4" />
                  Rating
                </div>
                <p className="text-2xl font-bold text-amber-600">
                  {influencer.rating ? influencer.rating.toFixed(1) : 'N/A'}
                </p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4" />
                  Location
                </div>
                <p className="text-sm font-semibold text-gray-900">
                  {influencer.locations?.[0] || 'Not specified'}
                </p>
              </div>
            </div>

            {/* Categories */}
            {influencer.category && influencer.category.length > 0 && (
              <div className="mb-8">
                <div className="flex flex-wrap gap-2">
                  {influencer.category.slice(0, 3).map((cat, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium"
                    >
                      {cat}
                    </span>
                  ))}
                  {influencer.category.length > 3 && (
                    <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                      +{influencer.category.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleViewProfile(influencer)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 font-semibold text-gray-700 hover:text-purple-700 transition-all flex items-center justify-center gap-2 group/btn"
              >
                <Eye className="w-5 h-5 group-hover/btn:text-purple-600" />
                View Profile
              </button>
              <button
                onClick={() => handleConnect(influencer)}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 font-semibold transition-all flex items-center justify-center gap-2 group/btn"
              >
                <UserPlus className="w-5 h-5" />
                Connect
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading && influencers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto mt-28 px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading influencers...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Influencers</h1>
              <p className="text-gray-600 mt-2">Find the perfect influencers for your brand</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 font-semibold transition-all flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Matchmaker
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 ${stat.bgColor} rounded-xl`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <span className={`text-sm font-medium ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-200">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
                placeholder="Search influencers by name, category, or location..."
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg shadow-sm"
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-md font-semibold transition-all"
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Browse Categories</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Advanced Filters'}
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleQuickFilter(category)}
                  className={`flex-shrink-0 px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${activeFilter === category.id 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 pt-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filterOptions.map((filter, index) => (
                  <div key={index}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-purple-50 rounded-lg">
                        <filter.icon className="w-5 h-5 text-purple-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900">{filter.label}</h4>
                    </div>
                    <div className="space-y-3">
                      {filter.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          onClick={() => handleFilterChange(option.field, option.value)}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${filters[option.field] === option.value 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'hover:bg-gray-100 text-gray-700'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={clearFilters}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => {
                    fetchInfluencers();
                    setShowFilters(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-md font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* View Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "grid" 
                    ? 'bg-white shadow-sm text-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${viewMode === "list" 
                    ? 'bg-white shadow-sm text-purple-600' 
                    : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              <span className="text-gray-600">
                Showing {influencers.length} of {totalInfluencers} influencers
              </span>
            </div>
            <button onClick={fetchInfluencers} className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
              <RefreshCw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Influencers Grid */}
        {influencers.length === 0 && !loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No influencers found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12" 
              : "space-y-6 mb-12"
            }>
              {viewMode === "list" ? (
                influencers.map(influencer => {
                  const totalFollowers = calculateTotalFollowers(influencer);
                  const topPlatform = getTopPlatform(influencer);
                  
                  return (
                    <div key={influencer._id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
                      <div className="flex items-start gap-6">
                        {/* Avatar */}
                        <div className="relative">
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-purple-200">
                            {influencer.profilePhoto ? (
                              <img 
                                src={`${API_CONFIG.BASE_URL}/${influencer.profilePhoto}`} 
                                alt={influencer.userName}
                                className="w-full h-full rounded-2xl object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">
                                  {influencer.firstName?.[0]}{influencer.lastName?.[0]}
                                </span>
                              </div>
                            )}
                          </div>
                          {influencer.verified && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-1 rounded-full">
                              <Shield className="w-4 h-4" />
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">
                                {influencer.firstName} {influencer.lastName}
                              </h3>
                              <p className="text-gray-600">@{influencer.userName}</p>
                            </div>
                            <button
                              onClick={() => toggleSaveInfluencer(influencer._id)}
                              className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                              <Heart className={`w-5 h-5 ${savedInfluencers.includes(influencer._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                            </button>
                          </div>

                          <p className="text-gray-600 mb-6 line-clamp-2">
                            {influencer.about || 'No description available'}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex gap-6">
                              <div>
                                <p className="text-sm text-gray-500">Followers</p>
                                <p className="text-2xl font-bold text-gray-900">{formatNumber(totalFollowers)}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Rating</p>
                                <p className="text-2xl font-bold text-amber-600">
                                  {influencer.rating ? influencer.rating.toFixed(1) : 'N/A'}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-500">Top Platform</p>
                                <p className="text-lg font-semibold text-gray-900">{topPlatform.name}</p>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleViewProfile(influencer)}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                              >
                                View Profile
                              </button>
                              <button
                                onClick={() => handleConnect(influencer)}
                                className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-md font-semibold"
                              >
                                Connect
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                influencers.map(renderInfluencerCard)
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mb-16">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-3 hover:bg-gray-100 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {[...Array(totalPages).keys()].map(page => (
                  <button
                    key={page + 1}
                    onClick={() => handlePageChange(page + 1)}
                    className={`w-12 h-12 rounded-xl font-semibold transition-all ${
                      currentPage === page + 1
                        ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-200'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {page + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-3 hover:bg-gray-100 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-purple-900 p-12 text-center text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -translate-x-24 translate-y-24" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Need Help Finding the Perfect Influencer?</h2>
            <p className="text-lg text-white/90 mb-8">
              Our expert team will analyze your requirements and match you with the best influencers for maximum ROI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Try AI Matchmaker
              </button>
              <button className="px-8 py-3 bg-white/10 border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-all">
                Book Expert Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Influencer Modal */}
      {showInfluencerModal && selectedInfluencer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center border-2 border-purple-200">
                    {selectedInfluencer.profilePhoto ? (
                      <img 
                        src={`${API_CONFIG.BASE_URL}/${selectedInfluencer.profilePhoto}`} 
                        alt={selectedInfluencer.userName}
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
                        <span className="text-3xl font-bold text-white">
                          {selectedInfluencer.firstName?.[0]}{selectedInfluencer.lastName?.[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {selectedInfluencer.firstName} {selectedInfluencer.lastName}
                    </h2>
                    <p className="text-gray-600">@{selectedInfluencer.userName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveInfluencer(selectedInfluencer._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Heart className={`w-5 h-5 ${savedInfluencers.includes(selectedInfluencer._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => setShowInfluencerModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2">
                  {/* About Section */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                    <p className="text-gray-600">{selectedInfluencer.about || 'No description available'}</p>
                  </div>

                  {/* Detailed Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Total Followers</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatNumber(calculateTotalFollowers(selectedInfluencer))}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Rating</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {selectedInfluencer.rating ? selectedInfluencer.rating.toFixed(1) : 'N/A'}/5
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Categories</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedInfluencer.category?.length || 0}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Locations</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {selectedInfluencer.locations?.length || 0}
                      </p>
                    </div>
                  </div>

                  {/* Categories */}
                  {selectedInfluencer.category && selectedInfluencer.category.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedInfluencer.category.map((cat, idx) => (
                          <span key={idx} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-lg font-medium">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Social Media Stats */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Stats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {selectedInfluencer.socialMedia?.instagram && (
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Instagram className="w-5 h-5 text-pink-600" />
                            <span className="font-semibold">Instagram</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatNumber(selectedInfluencer.socialMedia.instagram.followers || 0)}
                          </p>
                          <p className="text-sm text-gray-500">followers</p>
                        </div>
                      )}
                      {selectedInfluencer.socialMedia?.youtube && (
                        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Youtube className="w-5 h-5 text-red-600" />
                            <span className="font-semibold">YouTube</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatNumber(selectedInfluencer.socialMedia.youtube.followers || 0)}
                          </p>
                          <p className="text-sm text-gray-500">followers</p>
                        </div>
                      )}
                      {selectedInfluencer.socialMedia?.twitter && (
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <Twitter className="w-5 h-5 text-blue-500" />
                            <span className="font-semibold">Twitter</span>
                          </div>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatNumber(selectedInfluencer.socialMedia.twitter.followers || 0)}
                          </p>
                          <p className="text-sm text-gray-500">followers</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Connect Panel */}
                <div>
                  <div className="sticky top-6 bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Connect with {selectedInfluencer.firstName}</h3>
                    
                    <div className="space-y-6">
                      {/* Contact Info */}
                      <div>
                        <p className="text-sm text-gray-500 mb-3">Contact Information</p>
                        <div className="space-y-3">
                          {selectedInfluencer.email && (
                            <div className="flex items-center gap-3 text-gray-700">
                              <Mail className="w-5 h-5 text-purple-600" />
                              <span className="text-sm">{selectedInfluencer.email}</span>
                            </div>
                          )}
                          {selectedInfluencer.phoneNumber && (
                            <div className="flex items-center gap-3 text-gray-700">
                              <Phone className="w-5 h-5 text-purple-600" />
                              <span className="text-sm">{selectedInfluencer.phoneNumber}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Verification Status */}
                      {selectedInfluencer.verified && (
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Verification Status</p>
                          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-xl">
                            <Shield className="w-5 h-5" />
                            <span className="font-medium">Verified Influencer</span>
                          </div>
                        </div>
                      )}

                      {/* Portfolio Links */}
                      {selectedInfluencer.portfolioLinks && selectedInfluencer.portfolioLinks.length > 0 && (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">Portfolio Links</p>
                          <div className="space-y-2">
                            {selectedInfluencer.portfolioLinks.slice(0, 2).map((link, idx) => (
                              <a key={idx} href={link} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm">
                                <ExternalLink className="w-4 h-4" />
                                {link.length > 40 ? link.substring(0, 40) + '...' : link}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-6 border-t border-gray-200 space-y-3">
                        <button
                          onClick={() => {
                            handleConnect(selectedInfluencer);
                            setShowInfluencerModal(false);
                          }}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Mail className="w-5 h-5" />
                          Send Collaboration Request
                        </button>
                        <button 
                          onClick={() => setShowInfluencerModal(false)}
                          className="w-full py-3 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 font-semibold transition-all"
                        >
                          Cancel
                        </button>
                      </div>
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

export default InfluencersList;