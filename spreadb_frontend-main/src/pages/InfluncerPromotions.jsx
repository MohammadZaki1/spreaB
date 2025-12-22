import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Users, 
  Eye, 
  Search,
  Clock,
  CheckCircle,
  Tag,
  Star,
  TrendingUp,
  Award
} from 'lucide-react';
import axios from 'axios';

const InfluencerPromotions = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [savedPromotions, setSavedPromotions] = useState([]);

  useEffect(() => {
    fetchAllPromotions();
    fetchSavedPromotions();
  }, []);

  // Fetch all promotions for influencers to browse
  const fetchAllPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/promotion/all');
      // Filter only active promotions for influencers
      const activePromotions = response.data.promotions.filter(
        promo => promo.status === 'active' && promo.applicationStatus === 'open'
      );
      setPromotions(activePromotions);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      alert('Failed to load promotions');
    } finally {
      setLoading(false);
    }
  };

  // Fetch saved promotions from localStorage
  const fetchSavedPromotions = () => {
    const saved = JSON.parse(localStorage.getItem('savedPromotions') || '[]');
    setSavedPromotions(saved);
  };

  const handleViewPromotion = (promotionId) => {
    navigate(`/influencer/promotion/${promotionId}`);
  };

  const handleApplyNow = (promotionId, e) => {
    e.stopPropagation();
    navigate(`/influencer/promotion/${promotionId}?apply=true`);
  };

  const handleSavePromotion = async (promotionId, e) => {
    e.stopPropagation();
    
    try {
      let updatedSaved = [...savedPromotions];
      const isSaved = savedPromotions.includes(promotionId);
      
      if (isSaved) {
        // Remove from saved
        updatedSaved = updatedSaved.filter(id => id !== promotionId);
        // Show toast/notification for unsave
      } else {
        // Add to saved
        updatedSaved.push(promotionId);
        // Show toast/notification for save
      }
      
      localStorage.setItem('savedPromotions', JSON.stringify(updatedSaved));
      setSavedPromotions(updatedSaved);
      
    } catch (error) {
      console.error('Error saving promotion:', error);
    }
  };

  // Filter promotions based on search
  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         promo.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const getBudgetTypeColor = (budgetType) => {
    switch (budgetType) {
      case 'fixed':
        return 'bg-green-100 text-green-800';
      case 'negotiable':
        return 'bg-blue-100 text-blue-800';
      case 'performance':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLocationBadge = (locations) => {
    if (!locations || locations.length === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          <MapPin className="w-3 h-3" />
          Remote
        </span>
      );
    }
    
    if (locations.length === 1) {
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          <MapPin className="w-3 h-3" />
          {locations[0]}
        </span>
      );
    }
    
    return (
      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <MapPin className="w-3 h-3" />
        {locations.length} Locations
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                ))}
              </div>
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
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Discover Promotions</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find exciting brand collaborations that match your skills and audience
            </p>
          </div>

          {/* Stats Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Promotions</p>
                  <p className="text-2xl font-bold text-gray-900">{promotions.length}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Promotions</p>
                  <p className="text-2xl font-bold text-gray-900">{savedPromotions.length}</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available Brands</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {[...new Set(promotions.map(p => p.brandId || 'anonymous'))].length}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-lg">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, skills, categories, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 mt-4">
              <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium">
                Trending
              </button>
              <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                High Budget
              </button>
              <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                Remote Only
              </button>
              <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors text-sm font-medium">
                Urgent Hiring
              </button>
            </div>
          </div>

          {/* Promotions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPromotions.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Briefcase className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No promotions found' : 'No active promotions available'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms or browse all promotions' 
                    : 'Check back soon for new promotion opportunities!'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            ) : (
              filteredPromotions.map((promotion) => {
                const isSaved = savedPromotions.includes(promotion._id);
                
                return (
                  <div 
                    key={promotion._id} 
                    className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer"
                    onClick={() => handleViewPromotion(promotion._id)}
                  >
                    {/* Promotion Image/Thumbnail */}
                    <div className="h-48 bg-gradient-to-br from-purple-500 to-blue-600 relative">
                      {promotion.images && promotion.images.length > 0 ? (
                        <img 
                          src={`http://localhost:3001/api/uploads/promotions/${promotion.images[0]?.url}`} 
                          alt={promotion.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/api/placeholder/400/300';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Briefcase className="w-12 h-12 text-white/80" />
                        </div>
                      )}
                      
                      {/* Save Button */}
                      <button
                        onClick={(e) => handleSavePromotion(promotion._id, e)}
                        className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                      >
                        <Star 
                          className={`w-5 h-5 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}`} 
                        />
                      </button>
                      
                      {/* Budget Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getBudgetTypeColor(promotion.budgetType)}`}>
                          <IndianRupee className="w-4 h-4" />
                          ₹{promotion.budget?.toLocaleString()}
                          <span className="text-xs ml-1">({promotion.budgetType})</span>
                        </span>
                      </div>
                    </div>

                    {/* Promotion Content */}
                    <div className="p-6">
                      {/* Title and Status */}
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                          {promotion.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 flex-shrink-0">
                          <CheckCircle className="w-3 h-3" />
                          Active
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {promotion.description}
                      </p>

                      {/* Key Details */}
                      <div className="space-y-3 mb-4">
                        {/* Duration */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span className="capitalize">{promotion.duration?.replace('months', ' months')}</span>
                        </div>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          {getLocationBadge(promotion.locations)}
                        </div>

                        {/* Sticks Required */}
                        {promotion.requiredSticks > 0 && (
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Award className="w-4 h-4 text-purple-500" />
                            <span>Minimum {promotion.requiredSticks} sticks</span>
                          </div>
                        )}
                      </div>

                      {/* Categories */}
                      {promotion.categories && promotion.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {promotion.categories.slice(0, 2).map((category, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {category}
                            </span>
                          ))}
                          {promotion.categories.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              +{promotion.categories.length - 2} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Skills */}
                      {promotion.skills && promotion.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {promotion.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                          {promotion.skills.length > 3 && (
                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                              +{promotion.skills.length - 3} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Stats & Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{promotion.views || 0}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{promotion.applicationsCount || 0} applied</span>
                          </div>
                        </div>
                        
                        <button
                          onClick={(e) => handleApplyNow(promotion._id, e)}
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Empty State for No Results */}
          {filteredPromotions.length === 0 && (
            <div className="mt-8 text-center">
              <p className="text-gray-500 mb-4">
                Can't find what you're looking for?
              </p>
              <button
                onClick={() => navigate('/influencer/dashboard')}
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Go back to dashboard →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default InfluencerPromotions;