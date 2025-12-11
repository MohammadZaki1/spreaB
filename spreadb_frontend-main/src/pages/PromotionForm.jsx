import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Briefcase, 
  MapPin, 
  Tag, 
  FileText, 
  IndianRupee, 
  Calendar, 
  X, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  Share2, 
  Copy,
  Upload,
  Image,
  Trash2,
  Link,
  User,
  Plus,
  Clock,
  Users
} from 'lucide-react';
import axios from 'axios';

const PromotionForm = () => {
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    about: '',
    website: '',
    instagram: '',
    facebook: '',
    otherLinks: [''],
    budgetType: 'fixed',
    budget: '',
    duration: 'ongoing',
    requiredSticks: 0,
  });
  
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [publishedPromotion, setPublishedPromotion] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [newLocation, setNewLocation] = useState('');

  // UI states
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [skillSuggestions, setSkillSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSkillSuggestions, setShowSkillSuggestions] = useState(false);
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [copied, setCopied] = useState(false);

  // Categories list
  const allCategories = [
    "Fashion", "Lifestyle", "Beauty", "Personal Care", "Food", "Beverage",
    "Healthcare", "Fitness", "Travel", "Hospitality", "Technology", "Gadgets",
    "Education", "Learning", "E-Commerce", "Shopping", "Kids", "Parenting",
    "Pets", "Animal Care", "Business", "Finance", "Startups", "Automotive",
    "Gaming", "Esports", "Entertainment", "Media", "Art", "Creativity",
    "Environment", "Sustainability", "Gifts", "Events", "Decorations", "Home",
    "Photography", "Writer", "Women-Centric", "Male-Centric"
  ];

  // Get remaining categories
  const remainingCategories = allCategories.filter(category => !categories.includes(category));

  // Skills suggestions
  const commonSkills = [
    "HTML", "CSS", "JavaScript", "React", "NextJS", "Vue", "Angular",
    "Node.js", "Python", "Django", "Flask", "Java", "Spring Boot",
    "PHP", "Laravel", "WordPress", "Shopify", "Web Development",
    "Mobile Development", "Android", "iOS", "Flutter", "React Native",
    "UI/UX Design", "Graphic Design", "Figma", "Adobe Photoshop", "Illustrator",
    "Digital Marketing", "SEO", "SEM", "Social Media Marketing", "Content Marketing",
    "Email Marketing", "Google Analytics", "Google Ads", "Facebook Ads",
    "Content Writing", "Copywriting", "Technical Writing", "Blog Writing",
    "Video Editing", "Premiere Pro", "Final Cut Pro", "After Effects",
  ];

  // Location suggestions
  const commonLocations = [
    "Madhapur", "Hitech City", "Gachibowli", "Kondapur", "Jubilee Hills",
    "Banjara Hills", "Secunderabad", "Begumpet", "Ameerpet", "SR Nagar",
    "KPHB", "Kukatpally", "Miyapur", "Balanagar", "Hyderabad", "Remote",
    "Bangalore", "Mumbai", "Delhi", "Chennai", "Pune", "Kolkata"
  ];

  // Generate promotion URL
  const promotionUrl = publishedPromotion 
    ? `http://localhost:3000/promotion/${publishedPromotion._id}`
    : '';

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate file types and size
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        alert(`File ${file.name} is not a valid image type. Only JPEG, JPG, PNG, and WebP are allowed.`);
        return false;
      }
      
      if (!isValidSize) {
        alert(`File ${file.name} is too large. Maximum size is 5MB.`);
        return false;
      }
      
      return true;
    });

    // Create preview URLs and add to images state
    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }));

    setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
  };

  // Remove image
  const handleRemoveImage = (index) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview); // Clean up memory
      newImages.splice(index, 1);
      return newImages;
    });
  };

  // Handle other links
  const handleAddLink = () => {
    setFormData(prev => ({
      ...prev,
      otherLinks: [...prev.otherLinks, '']
    }));
  };

  const handleRemoveLink = (index) => {
    setFormData(prev => ({
      ...prev,
      otherLinks: prev.otherLinks.filter((_, i) => i !== index)
    }));
  };

  const handleLinkChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      otherLinks: prev.otherLinks.map((link, i) => i === index ? value : link)
    }));
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(promotionUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  // Share promotion
  const sharePromotion = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: formData.title,
          text: formData.description.substring(0, 100) + '...',
          url: promotionUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle category selection
  const handleCategoryToggle = (category) => {
    setCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleRemoveCategory = (categoryToRemove) => {
    setCategories(prev => prev.filter(category => category !== categoryToRemove));
  };

  const toggleCategoryDropdown = () => {
    setShowCategoryDropdown(!showCategoryDropdown);
  };

  // Handle skill input change with autocomplete
  const handleSkillInputChange = (e) => {
    const value = e.target.value;
    setNewSkill(value);
    
    if (value.length > 0) {
      const filtered = commonSkills.filter(skill =>
        skill.toLowerCase().includes(value.toLowerCase())
      );
      setSkillSuggestions(filtered);
      setShowSkillSuggestions(true);
    } else {
      setShowSkillSuggestions(false);
    }
  };

  // Handle location input change with autocomplete
  const handleLocationInputChange = (e) => {
    const value = e.target.value;
    setNewLocation(value);
    
    if (value.length > 0) {
      const filtered = commonLocations.filter(location =>
        location.toLowerCase().includes(value.toLowerCase())
      );
      setLocationSuggestions(filtered);
      setShowLocationSuggestions(true);
    } else {
      setShowLocationSuggestions(false);
    }
  };

  // Add skill
  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setNewSkill('');
      setShowSkillSuggestions(false);
    }
  };

  // Select skill from suggestions - FIXED
  const handleSelectSkill = (skill) => {
    if (!skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
    }
    setNewSkill('');
    setShowSkillSuggestions(false);
  };

  // Remove skill
  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  // Add location
  const handleAddLocation = () => {
    const location = newLocation.trim();
    if (location && !locations.includes(location)) {
      setLocations(prev => [...prev, location]);
      setNewLocation('');
      setShowLocationSuggestions(false);
    }
  };

  // Select location from suggestions - FIXED
  const handleSelectLocation = (location) => {
    if (!locations.includes(location)) {
      setLocations(prev => [...prev, location]);
    }
    setNewLocation('');
    setShowLocationSuggestions(false);
  };

  // Remove location
  const handleRemoveLocation = (locationToRemove) => {
    setLocations(prev => prev.filter(location => location !== locationToRemove));
  };

  // Handle skill input key press
  const handleSkillKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Handle location input key press
  const handleLocationKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddLocation();
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Promotion title is required';
    } else if (formData.title.trim().length < 5) {
      newErrors.title = 'Title must be at least 5 characters long';
    }

    if (categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    }

    if (locations.length === 0) {
      newErrors.locations = 'At least one location is required';
    }

    if (formData.description.length > 500) {
      newErrors.description = 'Description cannot exceed 500 characters';
    }

    if (formData.about.length > 1000) {
      newErrors.about = 'About section cannot exceed 1000 characters';
    }

    // Validate URLs
    if (formData.website && !isValidUrl(formData.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    if (formData.instagram && !isValidUrl(formData.instagram) && !formData.instagram.startsWith('@')) {
      newErrors.instagram = 'Please enter a valid Instagram URL or @username';
    }

    if (formData.facebook && !isValidUrl(formData.facebook)) {
      newErrors.facebook = 'Please enter a valid Facebook URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // URL validation helper
  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Handle form submission with image upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    
    try {
      const submissionData = new FormData();
      
      // Append form data
      submissionData.append('title', formData.title);
      submissionData.append('description', formData.description);
      submissionData.append('about', formData.about);
      submissionData.append('website', formData.website);
      submissionData.append('instagram', formData.instagram);
      submissionData.append('facebook', formData.facebook);
      submissionData.append('otherLinks', JSON.stringify(formData.otherLinks.filter(link => link.trim())));
      submissionData.append('budgetType', formData.budgetType);
      submissionData.append('budget', formData.budget);
      submissionData.append('duration', formData.duration);
      submissionData.append('requiredSticks', formData.requiredSticks);
      submissionData.append('categories', JSON.stringify(categories));
      submissionData.append('locations', JSON.stringify(locations));
      submissionData.append('skills', JSON.stringify(skills));
      
      // Append images
      images.forEach(image => {
        submissionData.append('images', image.file);
      });

      console.log('Submitting promotion with images:', images.length);
      
      // Direct API call with FormData
      const response = await axios.post(
        'http://localhost:3001/api/promotion/create', 
        submissionData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          timeout: 30000 // 30 seconds for file upload
        }
      );
      
      setPublishedPromotion(response.data.promotion);
      setShowSuccessModal(true);
      
    } catch (error) {
      console.error('Error submitting promotion:', error);
      
      if (error.response?.data?.message) {
        setErrors({ submit: error.response.data.message });
      } else if (error.code === 'ECONNABORTED') {
        setErrors({ submit: 'Request timeout. Please try again.' });
      } else {
        setErrors({ submit: error.message || 'Failed to publish promotion. Please try again.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      about: '',
      website: '',
      instagram: '',
      facebook: '',
      otherLinks: [''],
      budgetType: 'fixed',
      budget: '',
      duration: 'ongoing',
      requiredSticks: 0,
    });
    setCategories([]);
    setSkills([]);
    setLocations([]);
    setImages([]);
    setErrors({});
    setNewSkill('');
    setNewLocation('');
    setShowCategoryDropdown(false);
    setShowSkillSuggestions(false);
    setShowLocationSuggestions(false);
  };

  // Close success modal and reset form
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    handleReset();
    navigate('/my-promotions');
  };

  const handleViewPromotion = () => {
    if (publishedPromotion) {
      navigate(`/promotion/${publishedPromotion._id}`);
    }
  };

  const handleViewAllPromotions = () => {
    navigate('/my-promotions');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow mt-20">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          
          {/* Error Message */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-center">
              {errors.submit}
            </div>
          )}

          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-3">
              Create a New Promotion
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the details below to create your promotion. No login required!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Promotion Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Promotion Details</h2>
              </div>
              
              <div className="space-y-6">
                {/* Promotion Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Promotion Title *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter promotion title"
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500 ${
                        errors.title ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Briefcase className="w-5 h-5" />
                    </span>
                  </div>
                  {errors.title && (
                    <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                  )}
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categories * {categories.length > 0 && `(${categories.length} selected)`}
                  </label>
                  
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                      showCategoryDropdown ? 'border-purple-500 bg-purple-50' : errors.categories ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={toggleCategoryDropdown}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Tag className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-gray-700">
                          {categories.length === 0 
                            ? "Select categories" 
                            : `${categories.length} category${categories.length > 1 ? 'ies' : ''} selected`
                          }
                        </span>
                      </div>
                      {showCategoryDropdown ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>

                  {/* Selected Categories Tags */}
                  {categories.length > 0 && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm font-medium text-gray-700 mb-2">Selected Categories:</p>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category, index) => (
                          <span key={index} className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                            {category}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveCategory(category);
                              }}
                              className="text-purple-600 hover:text-purple-800 focus:outline-none"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Categories Dropdown */}
                  {showCategoryDropdown && (
                    <div className="mt-4 border-2 border-gray-300 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        Available Categories ({remainingCategories.length} remaining):
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                        {remainingCategories.map((category, index) => (
                          <label 
                            key={index} 
                            className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <input
                              type="checkbox"
                              checked={categories.includes(category)}
                              onChange={() => handleCategoryToggle(category)}
                              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                            />
                            <span className="text-sm text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={toggleCategoryDropdown}
                          className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {errors.categories && (
                    <p className="mt-1 text-sm text-red-600">{errors.categories}</p>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Enter promotion description..."
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={4}
                    />
                    <span className="absolute left-3 top-3 text-gray-500">
                      <FileText className="w-5 h-5" />
                    </span>
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                      {formData.description.length}/500
                    </div>
                  </div>
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                </div>

                {/* About Section */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    About the Brand/Company
                  </label>
                  <div className="relative">
                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleInputChange}
                      placeholder="Tell us about your brand, company, or what you're looking for..."
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-800 placeholder-gray-500 ${
                        errors.about ? 'border-red-500' : 'border-gray-300'
                      }`}
                      rows={4}
                    />
                    <span className="absolute left-3 top-3 text-gray-500">
                      <User className="w-5 h-5" />
                    </span>
                    <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                      {formData.about.length}/1000
                    </div>
                  </div>
                  {errors.about && (
                    <p className="mt-1 text-sm text-red-600">{errors.about}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Links & Social Media Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Link className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Links & Social Media</h2>
              </div>
              
              <div className="space-y-4">
                {/* Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500 ${
                        errors.website ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Link className="w-5 h-5" />
                    </span>
                  </div>
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                  )}
                </div>

                {/* Instagram */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Instagram
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      placeholder="@username or https://instagram.com/username"
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500 ${
                        errors.instagram ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <span className="w-5 h-5">📷</span>
                    </span>
                  </div>
                  {errors.instagram && (
                    <p className="mt-1 text-sm text-red-600">{errors.instagram}</p>
                  )}
                </div>

                {/* Facebook */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      placeholder="https://facebook.com/pagename"
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500 ${
                        errors.facebook ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <span className="w-5 h-5">📘</span>
                    </span>
                  </div>
                  {errors.facebook && (
                    <p className="mt-1 text-sm text-red-600">{errors.facebook}</p>
                  )}
                </div>

                {/* Other Links */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Other Links
                  </label>
                  <div className="space-y-2">
                    {formData.otherLinks.map((link, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="flex-1 relative">
                          <input
                            type="url"
                            value={link}
                            onChange={(e) => handleLinkChange(index, e.target.value)}
                            placeholder="https://example.com"
                            className="w-full p-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                            <Link className="w-5 h-5" />
                          </span>
                        </div>
                        {formData.otherLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveLink(index)}
                            className="p-3 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddLink}
                      className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      Add Another Link
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Images Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Image className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Promotion Images</h2>
              </div>
              
              <div className="space-y-4">
                {/* Image Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    id="image-upload"
                    multiple
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-lg font-medium text-gray-700 mb-1">
                      Upload Promotion Images
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, JPEG, WebP up to 5MB each (max 5 images)
                    </p>
                  </label>
                </div>

                {/* Image Previews */}
                {images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Selected Images ({images.length}/5)
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                            {image.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Scope & Budget Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <IndianRupee className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Scope & Budget</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Budget Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Budget Type *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="budgetType"
                        value="fixed"
                        checked={formData.budgetType === 'fixed'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Fixed price</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="budgetType"
                        value="hourly"
                        checked={formData.budgetType === 'hourly'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Hourly</span>
                    </label>
                  </div>
                </div>

                {/* Budget Amount */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Budget ({formData.budgetType === 'fixed' ? '₹' : '₹/hour'}) *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      placeholder={`Enter budget (${formData.budgetType === 'fixed' ? '₹' : '₹/hour'})`}
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500 ${
                        errors.budget ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <IndianRupee className="w-5 h-5" />
                    </span>
                  </div>
                  {errors.budget && (
                    <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
                  )}
                </div>

                {/* Project Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Duration
                  </label>
                  <div className="relative">
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-full p-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 appearance-none"
                    >
                      <option value="ongoing">On going</option>
                      <option value="1week">1 week</option>
                      <option value="1month">1 month</option>
                      <option value="3months">3 months</option>
                      <option value="6months">6 months</option>
                    </select>
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Calendar className="w-5 h-5" />
                    </span>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Required Sticks */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Sticks (Optional)
                </label>
                <input
                  type="number"
                  name="requiredSticks"
                  value={formData.requiredSticks}
                  onChange={handleInputChange}
                  placeholder="Enter minimum sticks required"
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                  min="0"
                />
              </div>
            </div>

            {/* Requirements Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Tag className="w-5 h-5 text-orange-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Requirements</h2>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Required Skills (Optional)
                </label>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={handleSkillInputChange}
                      onKeyPress={handleSkillKeyPress}
                      onFocus={() => newSkill.length > 0 && setShowSkillSuggestions(true)}
                      placeholder="Enter Your skills"
                      className="w-full p-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500"
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <Tag className="w-5 h-5" />
                    </span>
                    
                    {/* Skill Suggestions Dropdown - FIXED */}
                    {showSkillSuggestions && skillSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {skillSuggestions.map((skill, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-purple-50 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent input blur
                              handleSelectSkill(skill);
                            }}
                          >
                            {skill}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddSkill}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
                
                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                      {skill}
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Locations Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <MapPin className="w-5 h-5 text-red-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Target Location(s) *</h2>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Add Locations
                </label>
                <div className="flex gap-2 mb-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={newLocation}
                      onChange={handleLocationInputChange}
                      onKeyPress={handleLocationKeyPress}
                      onFocus={() => newLocation.length > 0 && setShowLocationSuggestions(true)}
                      placeholder="Enter locations"
                      className={`w-full p-3 pl-12 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-800 placeholder-gray-500 ${
                        errors.locations ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <MapPin className="w-5 h-5" />
                    </span>
                    
                    {/* Location Suggestions Dropdown - FIXED */}
                    {showLocationSuggestions && locationSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                        {locationSuggestions.map((location, index) => (
                          <div
                            key={index}
                            className="px-4 py-3 hover:bg-purple-50 cursor-pointer text-gray-800 border-b border-gray-100 last:border-b-0"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent input blur
                              handleSelectLocation(location);
                            }}
                          >
                            {location}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={handleAddLocation}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
                
                {/* Location Tags */}
                <div className="flex flex-wrap gap-2">
                  {locations.map((location, index) => (
                    <span key={index} className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                      {location}
                      <button
                        type="button"
                        onClick={() => handleRemoveLocation(location)}
                        className="text-green-600 hover:text-green-800 focus:outline-none"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
                {errors.locations && (
                  <p className="mt-1 text-sm text-red-600">{errors.locations}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end pt-6">
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors font-medium"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Promotion'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />

      {/* Success Modal */}
      {showSuccessModal && publishedPromotion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            {/* Success Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Promotion Published!
              </h3>
              <p className="text-gray-600">
                Your promotion has been successfully published and is now live.
              </p>
            </div>

            {/* Promotion Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">{publishedPromotion.title}</h4>
              <p className="text-sm text-gray-600 line-clamp-2">
                {publishedPromotion.description?.substring(0, 100)}...
              </p>
              {publishedPromotion.images && publishedPromotion.images.length > 0 && (
                <div className="mt-2">
                  <img
                    src={`http://localhost:3001${publishedPromotion.images[0].url}`}
                    alt="Promotion"
                    className="w-full h-20 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/80';
                    }}
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-1 mt-2">
                {publishedPromotion.categories?.slice(0, 3).map((category, index) => (
                  <span key={index} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                    {category}
                  </span>
                ))}
                {publishedPromotion.categories?.length > 3 && (
                  <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
                    +{publishedPromotion.categories.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Promotion URL */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Promotion URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promotionUrl}
                  readOnly
                  className="flex-1 p-2 border border-gray-300 rounded-lg text-sm bg-gray-50 text-gray-600"
                />
                <button
                  onClick={copyToClipboard}
                  className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCircle className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={sharePromotion}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handleViewPromotion}
                className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                View Promotion
              </button>
            </div>

            {/* Additional Options */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleViewAllPromotions}
                className="w-full py-2 text-purple-600 hover:text-purple-700 font-medium"
              >
                View All Promotions
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleSuccessModalClose}
              className="w-full mt-2 py-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionForm;
