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
  Plus,
  Search,
  Clock,
  CheckCircle,
  Tag,
  Trash2,
  Edit3
} from 'lucide-react';
import axios from 'axios';

const MyPromotions = () => {
  const navigate = useNavigate();
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchAllPromotions();
  }, []);

  // Fetch all promotions (no authentication required)
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

  const handleCreateNew = () => {
    navigate('/promotion');
  };

  const handleViewPromotion = (promotionId) => {
    navigate(`/promotion/${promotionId}`);
  };

  const handleEditPromotion = async (promotionId, e) => {
    e.stopPropagation();
    setEditing(true);
    
    try {
      // For now, we'll just show an alert and navigate to edit page
      // In a real app, you would navigate to an edit form with the promotion data
      const promotion = promotions.find(p => p._id === promotionId);
      if (promotion) {
        // You can navigate to an edit page or show a modal
        // navigate(`/edit-promotion/${promotionId}`);
        alert(`Edit functionality for: ${promotion.title}\n\nThis would open an edit form with pre-filled data.`);
      }
    } catch (error) {
      console.error('Error preparing edit:', error);
      alert('Failed to prepare edit');
    } finally {
      setEditing(false);
    }
  };

  const handleDeletePromotion = async (promotionId, e) => {
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this promotion? This action cannot be undone.')) {
      setDeleting(true);
      try {
        await axios.delete(`http://localhost:3001/api/promotion/${promotionId}`);
        
        // Remove from local state
        setPromotions(prev => prev.filter(promo => promo._id !== promotionId));
        
        alert('Promotion deleted successfully!');
      } catch (error) {
        console.error('Error deleting promotion:', error);
        alert('Failed to delete promotion');
      } finally {
        setDeleting(false);
      }
    }
  };

  // Filter promotions based on search
  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.categories.some(cat => cat.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">All Promotions</h1>
              <p className="text-gray-600 mt-2">Browse and explore all available promotion campaigns</p>
            </div>
            <button
              onClick={handleCreateNew}
              className="mt-4 lg:mt-0 flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
            >
              <Plus className="w-5 h-5" />
              Create New Promotion
            </button>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Promotions</p>
                <p className="text-2xl font-bold text-gray-900">{promotions.length}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search promotions by title, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Promotions List */}
          <div className="space-y-4">
            {filteredPromotions.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchTerm ? 'No promotions found' : 'No promotions available'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm 
                    ? 'Try adjusting your search terms' 
                    : 'Be the first to create a promotion!'
                  }
                </p>
                {!searchTerm && (
                  <button
                    onClick={handleCreateNew}
                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
                  >
                    Create Your First Promotion
                  </button>
                )}
              </div>
            ) : (
              filteredPromotions.map((promotion) => (
                <div 
                  key={promotion._id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group relative"
                  onClick={() => handleViewPromotion(promotion._id)}
                >
                  
                  {/* Action Buttons - Fixed positioning */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
                    <button
                      onClick={(e) => handleEditPromotion(promotion._id, e)}
                      disabled={editing}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Edit Promotion"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDeletePromotion(promotion._id, e)}
                      disabled={deleting}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete Promotion"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                    {/* Promotion Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 mr-4">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {promotion.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 mb-4">
                            {promotion.description}
                          </p>
                        </div>
                        
                        {/* Status Badge */}
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(promotion.status)} flex-shrink-0`}>
                          <CheckCircle className="w-4 h-4" />
                          {promotion.status.charAt(0).toUpperCase() + promotion.status.slice(1)}
                        </span>
                      </div>

                      {/* Promotion Details */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <IndianRupee className="w-4 h-4" />
                          <span className="font-semibold">₹{promotion.budget?.toLocaleString()}</span>
                          <span className="text-xs text-gray-500">({promotion.budgetType})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span className="capitalize">{promotion.duration?.replace('months', ' months')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{promotion.locations?.join(', ') || 'Remote'}</span>
                        </div>
                      </div>

                      {/* Categories */}
                      {promotion.categories && promotion.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {promotion.categories.map((category, index) => (
                            <span
                              key={index}
                              className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Skills */}
                      {promotion.skills && promotion.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
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

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Created {new Date(promotion.createdAt).toLocaleDateString()}</span>
                        </div>
                        {promotion.views > 0 && (
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            <span>{promotion.views} views</span>
                          </div>
                        )}
                        {promotion.requiredSticks > 0 && (
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{promotion.requiredSticks} sticks required</span>
                          </div>
                        )}
                      </div>
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

export default MyPromotions;
