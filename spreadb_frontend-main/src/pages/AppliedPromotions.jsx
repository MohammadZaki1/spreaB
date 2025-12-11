import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Briefcase, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  CheckCircle, 
  X,
  Search,
  Filter,
  TrendingUp,
  Star,
  Eye,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import axios from 'axios';

const AppliedPromotions = () => {
  const navigate = useNavigate();
  const [appliedPromotions, setAppliedPromotions] = useState([]);
  const [allPromotions, setAllPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchAllPromotions();
  }, []);

  const fetchAllPromotions = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/promotion/all');
      setAllPromotions(response.data.promotions);
      
      // Get applied promotion IDs from localStorage
      const appliedIds = JSON.parse(localStorage.getItem('appliedPromotions') || '[]');
      const applied = response.data.promotions.filter(promo => appliedIds.includes(promo._id));
      setAppliedPromotions(applied);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveApplication = (promotionId) => {
    if (window.confirm('Are you sure you want to withdraw this application?')) {
      const appliedIds = JSON.parse(localStorage.getItem('appliedPromotions') || '[]');
      const newAppliedIds = appliedIds.filter(id => id !== promotionId);
      localStorage.setItem('appliedPromotions', JSON.stringify(newAppliedIds));
      
      setAppliedPromotions(prev => prev.filter(promo => promo._id !== promotionId));
      alert('Application withdrawn successfully!');
    }
  };

  const handleViewPromotion = (promotionId) => {
    navigate(`/influencer/promotion/${promotionId}`);
  };

  const filteredPromotions = appliedPromotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    if (statusFilter === 'active') return matchesSearch && promo.status === 'active';
    if (statusFilter === 'completed') return matchesSearch && promo.status === 'completed';
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getApplicationStatus = (promotion) => {
    // Simulate different application statuses
    const statuses = ['pending', 'under_review', 'accepted', 'rejected'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    switch (randomStatus) {
      case 'pending': return { text: 'Pending Review', color: 'bg-yellow-100 text-yellow-800' };
      case 'under_review': return { text: 'Under Review', color: 'bg-blue-100 text-blue-800' };
      case 'accepted': return { text: 'Accepted', color: 'bg-green-100 text-green-800' };
      case 'rejected': return { text: 'Not Selected', color: 'bg-red-100 text-red-800' };
      default: return { text: 'Pending', color: 'bg-gray-100 text-gray-800' };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => navigate('/influencer/dashboard')}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Dashboard
              </button>
              <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
              <p className="text-gray-600 mt-2">
                Track your promotion applications and their status
              </p>
            </div>
            
            {/* Stats */}
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">{appliedPromotions.length}</p>
              <p className="text-sm text-gray-600">Total Applications</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appliedPromotions.filter(p => getApplicationStatus(p).text === 'Pending Review').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appliedPromotions.filter(p => getApplicationStatus(p).text === 'Under Review').length}
                  </p>
                  <p className="text-sm text-gray-600">Under Review</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appliedPromotions.filter(p => getApplicationStatus(p).text === 'Accepted').length}
                  </p>
                  <p className="text-sm text-gray-600">Accepted</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {appliedPromotions.filter(p => getApplicationStatus(p).text === 'Not Selected').length}
                  </p>
                  <p className="text-sm text-gray-600">Not Selected</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search applications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active Promotions</option>
                <option value="completed">Completed</option>
              </select>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>{filteredPromotions.length} applications found</span>
              </div>
            </div>
          </div>

          {/* Applications List */}
          <div className="space-y-6">
            {filteredPromotions.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No applications found
                </h3>
                <p className="text-gray-600 mb-6">
                  {appliedPromotions.length === 0 
                    ? "You haven't applied to any promotions yet." 
                    : "Try adjusting your search criteria."
                  }
                </p>
                {appliedPromotions.length === 0 && (
                  <button
                    onClick={() => navigate('/influencer/dashboard')}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Browse Promotions
                  </button>
                )}
              </div>
            ) : (
              filteredPromotions.map((promotion) => {
                const appStatus = getApplicationStatus(promotion);
                
                return (
                  <div key={promotion._id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {promotion.title}
                          </h3>
                          <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${appStatus.color}`}>
                            <CheckCircle className="w-4 h-4" />
                            {appStatus.text}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-2 mb-4">
                          {promotion.description}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewPromotion(promotion._id)}
                          className="p-2 text-gray-400 hover:text-purple-600 transition-colors"
                          title="View Promotion"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleRemoveApplication(promotion._id)}
                          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          title="Withdraw Application"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Promotion Details */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-2">
                        <IndianRupee className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">₹{promotion.budget?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="capitalize">{promotion.duration?.replace('months', ' months')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{promotion.locations?.join(', ') || 'Remote'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        <span>{promotion.views} views</span>
                      </div>
                    </div>

                    {/* Categories and Skills */}
                    <div className="flex flex-wrap gap-4">
                      {promotion.categories && promotion.categories.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {promotion.categories.slice(0, 3).map((category, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {promotion.skills && promotion.skills.length > 0 && (
                        <div className="flex flex-wrap gap-1">
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
                    </div>

                    {/* Application Timeline */}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Applied on {new Date().toLocaleDateString()}</span>
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppliedPromotions;
