import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import axios from 'axios';
import { Briefcase, MapPin, Tag, FileText, IndianRupee, Calendar, X, ChevronDown, ChevronUp } from 'lucide-react';

const EditPromotion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budgetType: 'fixed',
    budget: '',
    duration: 'ongoing',
    requiredSticks: 0,
  });
  
  const [categories, setCategories] = useState([]);
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Categories list (same as in PromotionForm)
  const allCategories = [
    "Fashion", "Lifestyle", "Beauty", "Personal Care", "Food", "Beverage",
    "Healthcare", "Fitness", "Travel", "Hospitality", "Technology", "Gadgets",
    "Education", "Learning", "E-Commerce", "Shopping", "Kids", "Parenting",
    "Pets", "Animal Care", "Business", "Finance", "Startups", "Automotive",
    "Gaming", "Esports", "Entertainment", "Media", "Art", "Creativity",
    "Environment", "Sustainability", "Gifts", "Events", "Decorations", "Home",
    "Photography", "Writer", "Women-Centric", "Male-Centric"
  ];

  useEffect(() => {
    fetchPromotion();
  }, [id]);

  // Direct API call to fetch promotion
  const fetchPromotion = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3001/api/promotion/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const promotionData = response.data.promotion;
      setPromotion(promotionData);
      
      // Set form data
      setFormData({
        title: promotionData.title,
        description: promotionData.description,
        budgetType: promotionData.budgetType,
        budget: promotionData.budget,
        duration: promotionData.duration,
        requiredSticks: promotionData.requiredSticks,
      });
      
      setCategories(promotionData.categories || []);
      setSkills(promotionData.skills || []);
      setLocations(promotionData.locations || []);
      
    } catch (error) {
      console.error('Error fetching promotion:', error);
      alert('Failed to load promotion');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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

  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(prev => prev.filter(skill => skill !== skillToRemove));
  };

  const handleAddLocation = () => {
    const location = newLocation.trim();
    if (location && !locations.includes(location)) {
      setLocations(prev => [...prev, location]);
      setNewLocation('');
    }
  };

  const handleRemoveLocation = (locationToRemove) => {
    setLocations(prev => prev.filter(location => location !== locationToRemove));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Promotion title is required';
    }

    if (categories.length === 0) {
      newErrors.categories = 'At least one category is required';
    }

    if (!formData.budget) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(formData.budget) || parseFloat(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Direct API call to update promotion
  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    
    try {
      const token = localStorage.getItem('token');
      const updateData = {
        ...formData,
        categories,
        skills,
        locations,
        budget: parseFloat(formData.budget),
        requiredSticks: parseInt(formData.requiredSticks) || 0,
      };

      // Direct API call
      await axios.put(`http://localhost:3001/api/promotion/${id}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      alert('Promotion updated successfully!');
      navigate('/my-promotions');
    } catch (error) {
      console.error('Error updating promotion:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update promotion';
      alert(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow mt-20">
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-200 rounded"></div>
                ))}
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
          <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">Promotion not found</h1>
              <button 
                onClick={() => navigate('/my-promotions')}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Back to My Promotions
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const remainingCategories = allCategories.filter(category => !categories.includes(category));

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow mt-20">
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Promotion</h1>
          
          <form onSubmit={handleSave} className="space-y-6">
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
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Categories * {categories.length > 0 && `(${categories.length} selected)`}
                  </label>
                  
                  <div 
                    className="border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:border-gray-400"
                    onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Tag className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-700">
                          {categories.length === 0 
                            ? "Select categories" 
                            : `${categories.length} category${categories.length > 1 ? 'ies' : ''} selected`
                          }
                        </span>
                      </div>
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    </div>
                  </div>

                  {/* Selected Categories */}
                  {categories.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.map((category, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-3 py-2 rounded-full text-sm font-medium">
                          {category}
                          <button
                            type="button"
                            onClick={() => handleRemoveCategory(category)}
                            className="text-purple-600 hover:text-purple-800"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Categories Dropdown */}
                  {showCategoryDropdown && (
                    <div className="mt-4 border-2 border-gray-300 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Available Categories ({remainingCategories.length} remaining):
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
                        {remainingCategories.map((category, index) => (
                          <label key={index} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
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
                      <button
                        type="button"
                        onClick={() => setShowCategoryDropdown(false)}
                        className="w-full mt-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                      >
                        Done
                      </button>
                    </div>
                  )}
                  
                  {errors.categories && <p className="mt-1 text-sm text-red-600">{errors.categories}</p>}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Scope & Budget */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget ({formData.budgetType === 'fixed' ? '₹' : '₹/hour'}) *
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                      errors.budget ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.budget && <p className="mt-1 text-sm text-red-600">{errors.budget}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="ongoing">On going</option>
                    <option value="1week">1 week</option>
                    <option value="1month">1 month</option>
                    <option value="3months">3 months</option>
                    <option value="6months">6 months</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Sticks
                </label>
                <input
                  type="number"
                  name="requiredSticks"
                  value={formData.requiredSticks}
                  onChange={handleInputChange}
                  className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  min="0"
                />
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                  placeholder="Enter skill"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddSkill}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span key={index} className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-sm font-medium">
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Locations */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Locations</h3>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddLocation())}
                  placeholder="Enter location"
                  className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={handleAddLocation}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {locations.map((location, index) => (
                  <span key={index} className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-full text-sm font-medium">
                    {location}
                    <button
                      type="button"
                      onClick={() => handleRemoveLocation(location)}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => navigate('/my-promotions')}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EditPromotion;
