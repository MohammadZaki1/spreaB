import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  MapPin, 
  Calendar, 
  IndianRupee, 
  Clock, 
  Users, 
  Share2, 
  Bookmark, 
  Eye,
  Building,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  User,
  Globe,
  Instagram,
  Facebook,
  Link as LinkIcon,
  Send,
  Star,
  Award,
  TrendingUp
} from 'lucide-react';
import axios from 'axios';

const InfluencerPromotionDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [similarPromotions, setSimilarPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [applicationData, setApplicationData] = useState({
    proposal: '',
    estimatedDelivery: '',
    bidAmount: ''
  });
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    fetchPromotion();
    checkApplicationStatus();
    // Get user role from localStorage
    const role = localStorage.getItem('Role');
    setUserRole(role || '');
  }, [id]);

  const fetchPromotion = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/promotion/${id}`);
      setPromotion(response.data.promotion);
    } catch (error) {
      console.error('Error fetching promotion:', error);
      alert('Failed to load promotion');
    } finally {
      setLoading(false);
    }
  };

  const checkApplicationStatus = () => {
    const appliedPromotions = JSON.parse(localStorage.getItem('appliedPromotions') || '[]');
    setApplied(appliedPromotions.includes(id));
  };

  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/api/placeholder/600/400';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/api/uploads')) return `http://localhost:3001${imageUrl}`;
    return `http://localhost:3001/api/uploads/promotions/${imageUrl}`;
  };

  const formatSocialLink = (platform, value) => {
    if (!value) return null;
    if (value.startsWith('http')) return value;
    if (platform === 'instagram' && value.startsWith('@')) {
      return `https://instagram.com/${value.substring(1)}`;
    }
    if (platform === 'instagram') return `https://instagram.com/${value}`;
    return value;
  };

  const handleApply = () => {
    // Check if user is logged in and is an influencer
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('Role');
    
    if (!token) {
      navigate('/login');
      return;
    }
    
    if (role !== 'Influencer') {
      alert('Only influencers can apply to promotions');
      return;
    }
    
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async () => {
    try {
      // Save application to localStorage
      const appliedPromotions = JSON.parse(localStorage.getItem('appliedPromotions') || '[]');
      const newApplied = [...appliedPromotions, id];
      localStorage.setItem('appliedPromotions', JSON.stringify(newApplied));
      
      setApplied(true);
      setShowApplicationModal(false);
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Failed to submit application');
    }
  };

  const handleSave = () => {
    setSaved(!saved);
    // API call to save/unsave would go here
  };

  const nextImage = () => {
    if (promotion?.images && promotion.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === promotion.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (promotion?.images && promotion.images.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? promotion.images.length - 1 : prev - 1
      );
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Check if user can apply (only influencers)
  const canApply = userRole === 'Influencer';
  
  // Check if user is the owner of the promotion
  const isPromotionOwner = promotion?.userId === localStorage.getItem('userId');

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-4">
                  <div className="h-64 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-48 bg-gray-200 rounded"></div>
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!promotion) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 to-blue-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Promotion Not Found</h1>
              <p className="text-gray-600 mb-6">The promotion you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate(userRole === 'Brand Owner' ? '/brand/dashboard' : '/influencer/dashboard')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Back to Dashboard
              </button>
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
          {/* Back Button */}
          <button
            onClick={() => navigate(userRole === 'Brand Owner' ? '/brand/dashboard' : '/influencer/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Promotion Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {promotion.title}
                      </h1>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span className="font-medium">Anonymous Brand</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Verified</span>
                        </div>
                        {applied && (
                          <div className="flex items-center space-x-1">
                            <Award className="w-4 h-4 text-green-500" />
                            <span className="text-green-600 font-medium">Applied</span>
                          </div>
                        )}
                        {isPromotionOwner && (
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span className="text-yellow-600 font-medium">Your Promotion</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {canApply && (
                      <button
                        onClick={handleSave}
                        className={`p-2 rounded-lg border ${
                          saved 
                            ? 'bg-purple-100 border-purple-500 text-purple-600' 
                            : 'border-gray-300 text-gray-400 hover:border-gray-400'
                        }`}
                      >
                        <Bookmark className="w-5 h-5" fill={saved ? 'currentColor' : 'none'} />
                      </button>
                    )}
                    <button className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:border-gray-400">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center space-x-6 text-sm text-gray-600 border-t border-gray-100 pt-4">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{promotion.views?.toLocaleString() || 0} views</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{promotion.applicationsCount || 0} applications</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>Posted {formatDate(promotion.createdAt)}</span>
                  </div>
                  {promotion.requiredSticks > 0 && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{promotion.requiredSticks} sticks required</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Image Gallery */}
              {promotion.images && promotion.images.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotion Images</h3>
                  <div className="relative">
                    <img
                      src={getImageUrl(promotion.images[currentImageIndex]?.url)}
                      alt="Promotion"
                      className="w-full h-80 object-cover rounded-lg"
                    />
                    {promotion.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                          {promotion.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full ${
                                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* Promotion Details */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Promotion Details</h2>
                <div className="prose prose-gray max-w-none">
                  <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {promotion.description || 'No description provided.'}
                  </div>
                </div>
              </div>

              {/* About Section */}
              {promotion.about && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-4">About the Brand</h2>
                  <div className="prose prose-gray max-w-none">
                    <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                      {promotion.about}
                    </div>
                  </div>

                  {/* Social Links */}
                  {(promotion.website || promotion.instagram || promotion.facebook || promotion.otherLinks?.length > 0) && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Brand</h3>
                      <div className="flex flex-wrap gap-4">
                        {promotion.website && (
                          <a
                            href={formatSocialLink('website', promotion.website)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Globe className="w-4 h-4" />
                            Website
                          </a>
                        )}
                        {promotion.instagram && (
                          <a
                            href={formatSocialLink('instagram', promotion.instagram)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-pink-50 text-pink-700 rounded-lg hover:bg-pink-100 transition-colors"
                          >
                            <Instagram className="w-4 h-4" />
                            Instagram
                          </a>
                        )}
                        {promotion.facebook && (
                          <a
                            href={formatSocialLink('facebook', promotion.facebook)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                          >
                            <Facebook className="w-4 h-4" />
                            Facebook
                          </a>
                        )}
                        {promotion.otherLinks?.map((link, index) => (
                          <a
                            key={index}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <LinkIcon className="w-4 h-4" />
                            Link {index + 1}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Requirements & Skills */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Requirements & Skills</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Skills */}
                  {promotion.skills && promotion.skills.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {promotion.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories */}
                  {promotion.categories && promotion.categories.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-3">Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {promotion.categories.map((category, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Locations */}
                {promotion.locations && promotion.locations.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-gray-800 mb-3">Locations</h3>
                    <div className="flex flex-wrap gap-2">
                      {promotion.locations.map((location, index) => (
                        <span
                          key={index}
                          className="bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium"
                        >
                          <MapPin className="w-3 h-3 inline mr-1" />
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Apply Card - Only show for influencers */}
              {canApply ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-6 h-6 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {promotion.budget?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 capitalize">
                        {promotion.budgetType} price
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span className="capitalize">{promotion.duration?.replace('months', ' months')}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <div className="flex flex-wrap gap-1">
                          {promotion.locations && promotion.locations.length > 0 ? (
                            promotion.locations.map((location, index) => (
                              <span key={index} className="text-sm">
                                {location}{index < promotion.locations.length - 1 ? ',' : ''}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Remote</span>
                          )}
                        </div>
                      </div>
                      {promotion.requiredSticks > 0 && (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <TrendingUp className="w-5 h-5" />
                          <span>Minimum {promotion.requiredSticks} sticks required</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={applied ? () => navigate('/influencer/applied') : handleApply}
                      disabled={promotion.status !== 'active' || promotion.applicationStatus !== 'open'}
                      className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                        applied 
                          ? 'bg-green-600 text-white hover:bg-green-700' 
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                      }`}
                    >
                      {applied ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          View Application
                        </span>
                      ) : (
                        'Apply Now'
                      )}
                    </button>

                    {promotion.status !== 'active' && (
                      <p className="text-sm text-red-600 text-center">
                        This promotion is {promotion.status}
                      </p>
                    )}

                    <button
                      onClick={handleSave}
                      className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    >
                      {saved ? (
                        <span className="flex items-center justify-center gap-2">
                          <Bookmark className="w-4 h-4" fill="currentColor" />
                          Saved
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Bookmark className="w-4 h-4" />
                          Save for Later
                        </span>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Show different card for brand owners or non-logged in users
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-6 h-6 text-green-600" />
                        <span className="text-2xl font-bold text-gray-900">
                          {promotion.budget?.toLocaleString()}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500 capitalize">
                        {promotion.budgetType} price
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span className="capitalize">{promotion.duration?.replace('months', ' months')}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <div className="flex flex-wrap gap-1">
                          {promotion.locations && promotion.locations.length > 0 ? (
                            promotion.locations.map((location, index) => (
                              <span key={index} className="text-sm">
                                {location}{index < promotion.locations.length - 1 ? ',' : ''}
                              </span>
                            ))
                          ) : (
                            <span className="text-sm text-gray-500">Remote</span>
                          )}
                        </div>
                      </div>
                      {promotion.requiredSticks > 0 && (
                        <div className="flex items-center space-x-3 text-gray-600">
                          <TrendingUp className="w-5 h-5" />
                          <span>Minimum {promotion.requiredSticks} sticks required</span>
                        </div>
                      )}
                    </div>

                    {userRole === 'Brand Owner' ? (
                      <div className="text-center py-4">
                        <p className="text-gray-600 mb-4">This is your promotion</p>
                        <button
                          onClick={() => navigate(`/brand/promotion/edit/${id}`)}
                          className="w-full bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors mb-2"
                        >
                          Edit Promotion
                        </button>
                        <button
                          onClick={() => navigate(`/brand/promotion/applications/${id}`)}
                          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                        >
                          View Applications
                        </button>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-600 mb-4">
                          {userRole ? 
                            'Only influencers can apply to promotions' : 
                            'Please login as an influencer to apply'
                          }
                        </p>
                        {!userRole && (
                          <button
                            onClick={() => navigate('/login')}
                            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                          >
                            Login as Influencer
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Promotion Status */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Promotion Status</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium ${
                      promotion.status === 'active' ? 'text-green-600' : 
                      promotion.status === 'paused' ? 'text-yellow-600' : 
                      'text-blue-600'
                    }`}>
                      {promotion.status?.charAt(0).toUpperCase() + promotion.status?.slice(1)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications:</span>
                    <span className={`font-medium ${
                      promotion.applicationStatus === 'open' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {promotion.applicationStatus === 'open' ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Posted:</span>
                    <span className="font-medium">{formatDate(promotion.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Application Modal - Only show for influencers */}
      {showApplicationModal && canApply && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Apply to Promotion</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Proposal
                </label>
                <textarea
                  value={applicationData.proposal}
                  onChange={(e) => setApplicationData(prev => ({...prev, proposal: e.target.value}))}
                  placeholder="Tell the brand why you're the perfect fit for this promotion..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Delivery
                  </label>
                  <input
                    type="date"
                    value={applicationData.estimatedDelivery}
                    onChange={(e) => setApplicationData(prev => ({...prev, estimatedDelivery: e.target.value}))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Bid (₹)
                  </label>
                  <input
                    type="number"
                    value={applicationData.bidAmount}
                    onChange={(e) => setApplicationData(prev => ({...prev, bidAmount: e.target.value}))}
                    placeholder="Optional"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowApplicationModal(false)}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default InfluencerPromotionDisplay;