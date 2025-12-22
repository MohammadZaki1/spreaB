import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Building2, 
  Star, 
  MapPin, 
  Globe, 
  Users,
  TrendingUp,
  Shield,
  Check,
  Heart,
  MessageSquare,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  Grid,
  List,
  RefreshCw,
  X,
  Award,
  DollarSign,
  Hash,
  Sparkles,
  Calendar,
  Mail,
  Phone,
  UserPlus,
  Eye,
  Building,
  Target,
  BarChart3,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Linkedin,
  Loader2
} from 'lucide-react';
import Header from '../components/Navbar';
import { API_CONFIG } from '../config';
import axios from 'axios';
const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});
const BrandOwnersList = () => {
  const [brandOwners, setBrandOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [savedBrands, setSavedBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBrands, setTotalBrands] = useState(0);
  const [filters, setFilters] = useState({
    industry: '',
    location: '',
    minPromotions: '',
    maxPromotions: '',
    verified: '',
    search: ''
  });

  const brandColor = "#9333EA";
  const brandGradient = "from-purple-600 to-purple-800";

   const fetchBrandOwners = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: 12,
        ...filters
      };

      // Clean up empty filter values
      Object.keys(params).forEach(key => {
        if (!params[key] && params[key] !== 0) {
          delete params[key];
        }
      });

      console.log("Fetching from:", `${API_CONFIG.BASE_URL}/profile/brand-owners`);
      console.log("Params:", params);

      const response = await api.get('/profile/brand-owners', { params });

      console.log("Response:", response.data); // Debug log

      if (response.data.success) {
        setBrandOwners(response.data.data);
        setTotalPages(response.data.pagination.pages);
        setTotalBrands(response.data.pagination.total);
      } else {
        throw new Error(response.data.message || 'Failed to fetch brand owners');
      }
    } catch (err) {
      console.error('Error fetching brand owners:', err);
      
      // Check if it's a 404 error
      if (err.response?.status === 404) {
        setError('API endpoint not found. Please check backend routes.');
        
        // // Try a test endpoint
        // try {
        //   const testResponse = await api.get('/profile/test');
        //   console.log("Test endpoint response:", testResponse.data);
        // } catch (testErr) {
        //   console.error("Test endpoint also failed:", testErr);
        // }
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to fetch brand owners');
      }
      
      // For now, use empty array
      setBrandOwners([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchBrandOwners();
  }, [currentPage, filters]);

  const stats = [
    { 
      value: totalBrands.toString(), 
      label: "Active Brands", 
      icon: Building2, 
      color: "text-purple-600", 
      bgColor: "bg-purple-50",
      trend: "+8%",
      trendUp: true
    },
    { 
      value: "92%", 
      label: "Verified Accounts", 
      icon: Shield, 
      color: "text-green-600", 
      bgColor: "bg-green-50",
      trend: "+4%",
      trendUp: true
    },
    { 
      value: "15+", 
      label: "Industries", 
      icon: Hash, 
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      trend: "All Active",
      trendUp: true
    },
    { 
      value: "4.7/5", 
      label: "Avg. Brand Rating", 
      icon: Star, 
      color: "text-amber-600", 
      bgColor: "bg-amber-50",
      trend: "+0.2",
      trendUp: true
    }
  ];

  const industries = [
    { id: 'all', name: '🏢 All Industries', value: '' },
    { id: 'fashion', name: '👗 Fashion', value: 'Fashion' },
    { id: 'tech', name: '💻 Tech & Gadgets', value: 'Technology' },
    { id: 'beauty', name: '💄 Beauty & Cosmetics', value: 'Beauty' },
    { id: 'food', name: '🍕 Food & Beverage', value: 'Food' },
    { id: 'fitness', name: '💪 Health & Fitness', value: 'Fitness' },
    { id: 'gaming', name: '🎮 Gaming', value: 'Gaming' },
    { id: 'travel', name: '✈️ Travel & Lifestyle', value: 'Travel' }
  ];

  const filterOptions = [
    { 
      label: "Promotion History", 
      icon: TrendingUp,
      options: [
        { label: "High Activity (20+ campaigns)", value: "20", field: "minPromotions" },
        { label: "Moderate (10-20 campaigns)", value: "10", field: "minPromotions", max: "20" },
        { label: "New Brands (<10 campaigns)", value: "", field: "maxPromotions", maxValue: "10" }
      ] 
    },
    { 
      label: "Verification Level", 
      icon: Shield,
      options: [
        { label: "✅ Fully Verified", value: "true", field: "verified" },
        { label: "🔄 Partially Verified", value: "partial", field: "verified" },
        { label: "⏳ All Brands", value: "", field: "verified" }
      ] 
    },
    { 
      label: "Brand Budget", 
      icon: DollarSign,
      options: [
        { label: "💰 High Budget ($5k+)", value: "5000", field: "minBudget" },
        { label: "💸 Medium Budget ($1k-5k)", value: "1000", field: "minBudget", max: "5000" },
        { label: "💡 Small Budget (<$1k)", value: "", field: "maxBudget", maxValue: "1000" }
      ] 
    }
  ];

  const toggleSaveBrand = (id) => {
    if (savedBrands.includes(id)) {
      setSavedBrands(savedBrands.filter(brandId => brandId !== id));
    } else {
      setSavedBrands([...savedBrands, id]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters({ ...filters, search: searchQuery });
    setCurrentPage(1);
  };

  const handleQuickFilter = (industry) => {
    setActiveFilter(industry.id);
    setFilters({ ...filters, industry: industry.value });
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
      industry: '',
      location: '',
      minPromotions: '',
      maxPromotions: '',
      verified: '',
      search: ''
    });
    setSearchQuery('');
    setActiveFilter('all');
    setCurrentPage(1);
  };

  const handleConnect = async (brand) => {
    try {
      const token = localStorage.getItem('token');
      // Send connection request to backend
      await axios.post(`${API_CONFIG.BASE_URL}/connections/request`, {
        brandOwnerId: brand.userId,
        message: 'I would like to collaborate with your brand!'
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert(`🤝 Connection request sent to ${brand.brandName}! They'll review your profile shortly.`);
    } catch (error) {
      console.error('Error sending connection request:', error);
      alert('Failed to send connection request. Please try again.');
    }
  };

  const handleViewProfile = (brand) => {
    setSelectedBrand(brand);
    setShowBrandModal(true);
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

  const renderBrandCard = (brand) => (
    <div key={brand._id} className="group relative">
      {/* Verification Badge */}
      {brand.verificationStatus?.email && (
        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            <Shield className="w-3 h-3" />
            Verified
          </div>
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 group-hover:border-purple-200">
        {/* Header Section */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 relative">
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-gray-300 shadow-sm">
                {brand.brandLogo ? (
                  <img 
                    src={`${API_CONFIG.BASE_URL}/${brand.brandLogo}`} 
                    alt={brand.brandName}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <Building2 className="w-8 h-8 text-purple-600" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-gray-900 truncate max-w-[200px]">
                    {brand.brandName}
                  </h3>
                </div>
                <p className="text-gray-600 truncate max-w-[200px]">{brand.industry}</p>
              </div>
            </div>
            <button
              onClick={() => toggleSaveBrand(brand._id)}
              className="p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-xl transition-colors shadow-sm"
            >
              <Heart className={`w-5 h-5 ${savedBrands.includes(brand._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-2 h-12">
            {brand.description || 'No description available'}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar className="w-4 h-4" />
                Campaigns
              </div>
              <p className="text-2xl font-bold text-gray-900">
                {brand.promotionsPosted || 0}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Star className="w-4 h-4" />
                Rating
              </div>
              <p className="text-2xl font-bold text-amber-600">
                {brand.rating ? brand.rating.toFixed(1) : 'N/A'}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <DollarSign className="w-4 h-4" />
                Budget
              </div>
              <p className="text-2xl font-bold text-gray-900">
                ${formatNumber(brand.wallet || 0)}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <MapPin className="w-4 h-4" />
                Locations
              </div>
              <p className="text-sm font-semibold text-gray-900">
                {brand.locations?.length || 0}
              </p>
            </div>
          </div>

          {/* Locations */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {brand.locations?.slice(0, 3).map((location, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium"
                >
                  📍 {location}
                </span>
              ))}
              {brand.locations?.length > 3 && (
                <span className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg text-sm">
                  +{brand.locations.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => handleViewProfile(brand)}
              className="flex-1 py-3 border-2 border-gray-200 rounded-xl hover:border-purple-300 hover:bg-purple-50 font-semibold text-gray-700 hover:text-purple-700 transition-all flex items-center justify-center gap-2 group/btn"
            >
              <Eye className="w-5 h-5 group-hover/btn:text-purple-600" />
              View Details
            </button>
            <button
              onClick={() => handleConnect(brand)}
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

  if (loading && brandOwners.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto mt-28 px-4 py-8">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading brand owners...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Brands</h1>
              <p className="text-gray-600 mt-2">Find brands looking for influencers like you</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg hover:shadow-purple-200 font-semibold transition-all flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Match with Brands
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
                placeholder="Search brands by name, industry, or location..."
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

          {/* Industry Filters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Browse Industries</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-purple-600 hover:text-purple-800 font-medium flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                {showFilters ? 'Hide Filters' : 'Advanced Filters'}
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleQuickFilter(industry)}
                  className={`flex-shrink-0 px-5 py-3 rounded-xl transition-all flex items-center gap-2 ${activeFilter === industry.id 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-200' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {industry.name}
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
                    fetchBrandOwners();
                    setShowFilters(false);
                  }}
                  className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-md font-semibold"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}

          {/* View Controls and Results Info */}
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
                Showing {brandOwners.length} of {totalBrands} brands
              </span>
            </div>
            <button onClick={fetchBrandOwners} className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
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

        {/* Brands Grid */}
        {brandOwners.length === 0 && !loading ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
            <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No brands found</h3>
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
                brandOwners.map(brand => (
                  <div key={brand._id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all">
                    {/* List view content */}
                    <div className="flex items-start gap-6">
                      {/* Logo */}
                      <div className="relative">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-blue-200">
                          {brand.brandLogo ? (
                            <img 
                              src={`${API_CONFIG.BASE_URL}/${brand.brandLogo}`} 
                              alt={brand.brandName}
                              className="w-full h-full rounded-2xl object-cover"
                            />
                          ) : (
                            <Building2 className="w-10 h-10 text-blue-600" />
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{brand.brandName}</h3>
                            <p className="text-gray-600">{brand.industry}</p>
                          </div>
                          <button
                            onClick={() => toggleSaveBrand(brand._id)}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                          >
                            <Heart className={`w-5 h-5 ${savedBrands.includes(brand._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                          </button>
                        </div>

                        <p className="text-gray-600 mb-6 line-clamp-2">
                          {brand.description || 'No description available'}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <div>
                              <p className="text-sm text-gray-500">Campaigns</p>
                              <p className="text-2xl font-bold text-gray-900">{brand.promotionsPosted || 0}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Rating</p>
                              <p className="text-2xl font-bold text-amber-600">
                                {brand.rating ? brand.rating.toFixed(1) : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Budget</p>
                              <p className="text-2xl font-bold text-gray-900">${formatNumber(brand.wallet || 0)}</p>
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleViewProfile(brand)}
                              className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleConnect(brand)}
                              className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:shadow-md font-semibold"
                            >
                              Connect
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                brandOwners.map(renderBrandCard)
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
            <h2 className="text-3xl font-bold mb-4">Want Brands to Find You?</h2>
            <p className="text-lg text-white/90 mb-8">
              Optimize your profile to appear in brand searches and get more collaboration opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-700 font-semibold rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Boost Profile Visibility
              </button>
              <button className="px-8 py-3 bg-white/10 border-2 border-white/30 font-semibold rounded-xl hover:bg-white/20 transition-all">
                View Profile Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Modal */}
      {showBrandModal && selectedBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center border-2 border-blue-200">
                    {selectedBrand.brandLogo ? (
                      <img 
                        src={`${API_CONFIG.BASE_URL}/${selectedBrand.brandLogo}`} 
                        alt={selectedBrand.brandName}
                        className="w-full h-full rounded-2xl object-cover"
                      />
                    ) : (
                      <Building2 className="w-12 h-12 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedBrand.brandName}</h2>
                    <p className="text-gray-600">{selectedBrand.industry}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleSaveBrand(selectedBrand._id)}
                    className="p-2 hover:bg-gray-100 rounded-lg"
                  >
                    <Heart className={`w-5 h-5 ${savedBrands.includes(selectedBrand._id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                  <button
                    onClick={() => setShowBrandModal(false)}
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">About the Brand</h3>
                    <p className="text-gray-600">{selectedBrand.description || 'No description available'}</p>
                  </div>

                  {/* Detailed Stats */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Total Campaigns</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedBrand.promotionsPosted || 0}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Brand Rating</p>
                      <p className="text-2xl font-bold text-amber-600">
                        {selectedBrand.rating ? selectedBrand.rating.toFixed(1) : 'N/A'}/5
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Available Budget</p>
                      <p className="text-2xl font-bold text-green-600">${formatNumber(selectedBrand.wallet || 0)}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <p className="text-sm text-gray-500 mb-1">Active Locations</p>
                      <p className="text-2xl font-bold text-gray-900">{selectedBrand.locations?.length || 0}</p>
                    </div>
                  </div>

                  {/* Locations */}
                  {selectedBrand.locations?.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Operating Locations</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedBrand.locations.map((location, idx) => (
                          <span key={idx} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            {location}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      {selectedBrand.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-600">{selectedBrand.email}</span>
                        </div>
                      )}
                      {selectedBrand.website && (
                        <a href={selectedBrand.website} target="_blank" rel="noopener noreferrer" 
                          className="flex items-center gap-3 text-blue-600 hover:underline">
                          <Globe className="w-5 h-5" />
                          {selectedBrand.website}
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column - Connect Panel */}
                <div>
                  <div className="sticky top-6 bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Connect with Brand</h3>
                    
                    <div className="space-y-6">
                      {/* Verification Status */}
                      {selectedBrand.verificationStatus && (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">Verification Status</p>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Email</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${selectedBrand.verificationStatus.email ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                {selectedBrand.verificationStatus.email ? 'Verified' : 'Not Verified'}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm">Phone</span>
                              <span className={`px-2 py-1 rounded-full text-xs ${selectedBrand.verificationStatus.phone ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                {selectedBrand.verificationStatus.phone ? 'Verified' : 'Not Verified'}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Social Media Links */}
                      {(selectedBrand.socialMedia?.instagram || selectedBrand.socialMedia?.twitter) && (
                        <div>
                          <p className="text-sm text-gray-500 mb-3">Social Media</p>
                          <div className="space-y-2">
                            {selectedBrand.socialMedia?.instagram && (
                              <a href={selectedBrand.socialMedia.instagram} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-pink-600 hover:text-pink-700">
                                <Instagram className="w-5 h-5" />
                                <span className="text-sm">Instagram</span>
                              </a>
                            )}
                            {selectedBrand.socialMedia?.twitter && (
                              <a href={selectedBrand.socialMedia.twitter} target="_blank" rel="noopener noreferrer" 
                                className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
                                <Twitter className="w-5 h-5" />
                                <span className="text-sm">Twitter</span>
                              </a>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="pt-6 border-t border-gray-200 space-y-3">
                        <button
                          onClick={() => {
                            handleConnect(selectedBrand);
                            setShowBrandModal(false);
                          }}
                          className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl hover:shadow-lg font-semibold transition-all flex items-center justify-center gap-2"
                        >
                          <Mail className="w-5 h-5" />
                          Send Collaboration Request
                        </button>
                        <button 
                          onClick={() => setShowBrandModal(false)}
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

export default BrandOwnersList;