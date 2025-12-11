import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import InfluencerProfileForm from './InfluencerProfileForm';
import { 
  Search, 
  MapPin, 
  Tag, 
  Briefcase, 
  IndianRupee, 
  Clock, 
  Users, 
  Eye,
  Calendar,
  Filter,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';
import axios from 'axios';

const InfluencerDashboard = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [filteredPromotions, setFilteredPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchSkills, setSearchSkills] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [budgetRange, setBudgetRange] = useState([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);
  const [appliedPromotions, setAppliedPromotions] = useState(new Set());

  // Available categories for filtering
  const categories = [
    "Fashion", "Lifestyle", "Beauty", "Personal Care", "Food", "Beverage",
    "Healthcare", "Fitness", "Travel", "Technology", "Gaming", "Entertainment",
    "Education", "Business", "Automotive", "Art", "Photography", "Writing"
  ];

  useEffect(() => {
    fetchAllPromotions();
    loadAppliedPromotions();
  }, []);

  useEffect(() => {
    filterPromotions();
  }, [promotions, searchSkills, searchLocation, selectedCategories, budgetRange]);

  const fetchAllPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/promotion/all');
      setPromotions(response.data.promotions);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      alert('Failed to load promotions');
    } finally {
      setLoading(false);
    }
  };

  const loadAppliedPromotions = () => {
    // Load from localStorage or API
    const saved = JSON.parse(localStorage.getItem('appliedPromotions') || '[]');
    setAppliedPromotions(new Set(saved));
  };

  const filterPromotions = () => {
    let filtered = promotions;

    // Filter by skills
    if (searchSkills) {
      filtered = filtered.filter(promo => 
        promo.skills?.some(skill => 
          skill.toLowerCase().includes(searchSkills.toLowerCase())
        )
      );
    }

    // Filter by location
    if (searchLocation) {
      filtered = filtered.filter(promo => 
        promo.locations?.some(location => 
          location.toLowerCase().includes(searchLocation.toLowerCase())
        )
      );
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(promo => 
        promo.categories?.some(category => 
          selectedCategories.includes(category)
        )
      );
    }

    // Filter by budget
    filtered = filtered.filter(promo => 
      promo.budget >= budgetRange[0] && promo.budget <= budgetRange[1]
    );

    setFilteredPromotions(filtered);
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleQuickApply = async (promotionId, e) => {
    e.stopPropagation();
    
    try {
      // Simulate application process
      const newApplied = new Set([...appliedPromotions, promotionId]);
      setAppliedPromotions(newApplied);
      localStorage.setItem('appliedPromotions', JSON.stringify([...newApplied]));
      
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  const handleViewPromotion = (promotionId) => {
    navigate(`/influencer/promotion/${promotionId}`);
  };

  const handleViewApplied = () => {
    navigate('/influencer/applied');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded mb-4"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Promotion
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover promotion opportunities that match your skills and preferences. 
              Apply to campaigns that align with your influencer journey.
            </p>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{promotions.length}</p>
              <p className="text-sm text-gray-600">Total Promotions</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{filteredPromotions.length}</p>
              <p className="text-sm text-gray-600">Matching Promotions</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{appliedPromotions.size}</p>
              <p className="text-sm text-gray-600">Applied</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{promotions.filter(p => p.views > 100).length}</p>
              <p className="text-sm text-gray-600">Popular</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Skills Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by skills (e.g., Photography, Writing)"
                  value={searchSkills}
                  onChange={(e) => setSearchSkills(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Location Search */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by location"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
                {selectedCategories.length > 0 && (
                  <span className="bg-purple-600 text-white px-2 py-1 rounded-full text-xs">
                    {selectedCategories.length}
                  </span>
                )}
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Categories */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
                      {categories.map((category) => (
                        <label key={category} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategoryToggle(category)}
                            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                          />
                          <span className="text-sm text-gray-700">{category}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Budget Range */}
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3">
                      Budget Range: ₹{budgetRange[0].toLocaleString()} - ₹{budgetRange[1].toLocaleString()}
                    </h3>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={budgetRange[1]}
                      onChange={(e) => setBudgetRange([0, parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>₹0</span>
                      <span>₹100,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Applied Promotions Button */}
          {appliedPromotions.size > 0 && (
            <div className="flex justify-end mb-6">
              <button
                onClick={handleViewApplied}
                className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <CheckCircle className="w-5 h-5" />
                View Applied Promotions ({appliedPromotions.size})
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPromotions.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No promotions found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or check back later for new opportunities.
                </p>
              </div>
            ) : (
              filteredPromotions.map((promotion) => (
                <div 
                  key={promotion._id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 cursor-pointer group"
                  onClick={() => handleViewPromotion(promotion._id)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {promotion.title}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(promotion.status)}`}>
                            <CheckCircle className="w-3 h-3" />
                            {promotion.status}
                          </span>
                          {appliedPromotions.has(promotion._id) && (
                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              <CheckCircle className="w-3 h-3" />
                              Applied
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {promotion.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">₹{promotion.budget?.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">({promotion.budgetType})</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span className="capitalize">{promotion.duration?.replace('months', ' months')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{promotion.locations?.join(', ') || 'Remote'}</span>
                      </div>
                    </div>

                    {/* Categories */}
                    {promotion.categories && promotion.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {promotion.categories.slice(0, 3).map((category, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                          >
                            {category}
                          </span>
                        ))}
                        {promotion.categories.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            +{promotion.categories.length - 3}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Skills */}
                    {promotion.skills && promotion.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {promotion.skills.slice(0, 3).map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>{promotion.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(promotion.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      
                      {/* Apply Button */}
                      <button
                        onClick={(e) => handleQuickApply(promotion._id, e)}
                        disabled={appliedPromotions.has(promotion._id)}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                          appliedPromotions.has(promotion._id)
                            ? 'bg-green-100 text-green-700 cursor-not-allowed'
                            : 'bg-purple-600 text-white hover:bg-purple-700'
                        }`}
                      >
                        {appliedPromotions.has(promotion._id) ? 'Applied' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfluencerDashboard;
