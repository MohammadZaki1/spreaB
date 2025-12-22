import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
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
  MessageCircle,
  Eye,
  Heart,
  Building,
  CheckCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  User,
  Globe,
  Instagram,
  Facebook,
  Link as LinkIcon,
  Edit,
  BarChart,
  FileText
} from 'lucide-react';
import axios from 'axios';

const PromotionDisplay = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [similarPromotions, setSimilarPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    fetchPromotion();
    fetchSimilarPromotions();
    checkIfOwner();
  }, [id]);

  // Direct API call to fetch promotion
  const fetchPromotion = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/promotion/${id}`);
      console.log('Promotion data:', response.data.promotion);
      console.log('Promotion images:', response.data.promotion.images);
      setPromotion(response.data.promotion);
    } catch (error) {
      console.error('Error fetching promotion:', error);
      alert('Failed to load promotion');
    } finally {
      setLoading(false);
    }
  };

  // Fetch similar promotions
  const fetchSimilarPromotions = async () => {
    try {
      setSimilarLoading(true);
      const response = await axios.get(`http://localhost:3001/api/promotion/${id}/similar`);
      setSimilarPromotions(response.data.promotions);
    } catch (error) {
      console.error('Error fetching similar promotions:', error);
    } finally {
      setSimilarLoading(false);
    }
  };

  // Check if current user is the owner of the promotion
  const checkIfOwner = () => {
    const userId = localStorage.getItem('userId');
    // You might need to fetch promotion first or pass owner info in promotion data
    // For now, we'll set a dummy check
    // In real implementation, you would compare userId with promotion.ownerId
    setIsOwner(false); // Set based on your actual logic
  };

  // Helper function to get correct image URL
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return '/api/placeholder/600/400';
    
    // If it's already a full URL, return as is
    if (imageUrl.startsWith('http')) {
      return imageUrl;
    }
    
    // If it starts with /api/uploads, make it relative to the current domain
    if (imageUrl.startsWith('/api/uploads')) {
      return `http://localhost:3001${imageUrl}`;
    }
    
    // If it's just a filename, construct the full URL
    return `http://localhost:3001/api/uploads/promotions/${imageUrl}`;
  };

  // Format social media links
  const formatSocialLink = (platform, value) => {
    if (!value) return null;
    
    if (value.startsWith('http')) {
      return value;
    }
    
    if (platform === 'instagram' && value.startsWith('@')) {
      return `https://instagram.com/${value.substring(1)}`;
    }
    
    if (platform === 'instagram') {
      return `https://instagram.com/${value}`;
    }
    
    return value;
  };

  const handleEdit = () => {
    navigate(`/brand/promotion/edit/${id}`);
  };

  const handleViewApplications = () => {
    navigate(`/brand/promotion/applications/${id}`);
  };

  const handleSave = () => {
    setSaved(!saved);
    // API call to save/unsave would go here
  };

  const handleLike = () => {
    setLiked(!liked);
    // API call to like/unlike would go here
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: promotion?.title,
          text: promotion?.description?.substring(0, 100),
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
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
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center py-12">
              <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-gray-900 mb-4">Promotion Not Found</h1>
              <p className="text-gray-600 mb-6">The promotion you're looking for doesn't exist or has been removed.</p>
              <button
                onClick={() => navigate('/my-promotions')}
                className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Browse Promotions
              </button>
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
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - 3 columns */}
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
                          <span className="font-medium">Your Brand</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>Verified</span>
                        </div>
                        {isOwner && (
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-blue-500" />
                            <span className="text-blue-600 font-medium">Your Promotion</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {isOwner && (
                      <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                    )}
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
                    <button
                      onClick={handleShare}
                      className="p-2 rounded-lg border border-gray-300 text-gray-400 hover:border-gray-400"
                    >
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
                      onError={(e) => {
                        e.target.src = '/api/placeholder/600/400';
                        console.error('Failed to load image:', promotion.images[currentImageIndex]?.url);
                      }}
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
                  
                  {/* Image Thumbnails */}
                  {promotion.images.length > 1 && (
                    <div className="mt-4 grid grid-cols-4 gap-2">
                      {promotion.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`border-2 rounded-lg overflow-hidden ${
                            index === currentImageIndex ? 'border-purple-500' : 'border-gray-300'
                          }`}
                        >
                          <img
                            src={getImageUrl(image.url)}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-16 object-cover"
                            onError={(e) => {
                              e.target.src = '/api/placeholder/150/100';
                            }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
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
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect With Us</h3>
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

              {/* Brand Owner Actions */}
              {isOwner && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Promotion Management</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={handleEdit}
                      className="flex items-center justify-center gap-2 p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                      Edit Promotion
                    </button>
                    <button
                      onClick={handleViewApplications}
                      className="flex items-center justify-center gap-2 p-4 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
                    >
                      <FileText className="w-5 h-5" />
                      View Applications ({promotion.applicationsCount || 0})
                    </button>
                    <button
                      onClick={() => navigate(`/brand/promotion/analytics/${id}`)}
                      className="flex items-center justify-center gap-2 p-4 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
                    >
                      <BarChart className="w-5 h-5" />
                      View Analytics
                    </button>
                  </div>
                </div>
              )}

              {/* Engagement Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                        liked 
                          ? 'bg-red-50 border-red-200 text-red-600' 
                          : 'border-gray-300 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={liked ? 'currentColor' : 'none'} />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400">
                      <MessageCircle className="w-5 h-5" />
                      <span>Comment</span>
                    </button>
                  </div>
                  <button 
                    onClick={handleShare}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:border-gray-400"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar - 1 column */}
            <div className="space-y-6">
              {/* Promotion Info Card - Replaced Apply Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="font-semibold text-gray-900 mb-4">Promotion Details</h3>
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
                        <Users className="w-5 h-5" />
                        <span>Minimum {promotion.requiredSticks} sticks required</span>
                      </div>
                    )}
                  </div>

                  {/* Brand owner specific actions */}
                  {isOwner ? (
                    <>
                      <button
                        onClick={handleViewApplications}
                        className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200"
                      >
                        View Applications ({promotion.applicationsCount || 0})
                      </button>
                      <button
                        onClick={handleEdit}
                        className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                      >
                        Edit Promotion
                      </button>
                    </>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-600 mb-2">This is your promotion</p>
                      <p className="text-sm text-gray-500">
                        Share this link to attract influencers
                      </p>
                      <button
                        onClick={handleShare}
                        className="w-full mt-3 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                      >
                        Share Promotion
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Similar Promotions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Similar Promotions</h3>
                <div className="space-y-4">
                  {similarLoading ? (
                    <div className="animate-pulse space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex space-x-3">
                          <div className="w-16 h-16 bg-gray-200 rounded"></div>
                          <div className="flex-1">
                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : similarPromotions.length > 0 ? (
                    similarPromotions.map((similarPromo) => (
                      <Link
                        key={similarPromo._id}
                        to={`/promotion/${similarPromo._id}`}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Building className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                            {similarPromo.title}
                          </h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <IndianRupee className="w-3 h-3 text-green-600" />
                            <span className="text-sm text-gray-600">
                              ₹{similarPromo.budget?.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {similarPromo.categories?.slice(0, 2).map((category, index) => (
                              <span
                                key={index}
                                className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs"
                              >
                                {category}
                              </span>
                            ))}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm text-center py-4">
                      No similar promotions found
                    </p>
                  )}
                </div>
              </div>

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
                  {promotion.updatedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Updated:</span>
                      <span className="font-medium">{formatDate(promotion.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PromotionDisplay;