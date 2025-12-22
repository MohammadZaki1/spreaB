import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { X, ChevronDown, ChevronUp, Tag, MapPin, DollarSign, Calendar, Users, Award } from "lucide-react";
import axios from "axios";

const PromotionForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    requiredSticks: 0,
    openings: 1,
  });

  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const allCategories = [
    "Fashion", "Lifestyle", "Beauty", "Food", "Fitness", "Travel",
    "Technology", "Education", "Finance", "Entertainment",
    "Gaming", "Healthcare", "E-Commerce"
  ];

  const commonLocations = [
    "Hyderabad", "Bangalore", "Mumbai", "Delhi",
    "Chennai", "Pune", "Remote"
  ];

  const remainingCategories = allCategories.filter(c => !categories.includes(c));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (cat) => {
    setCategories(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  };

  const removeCategory = (cat) => setCategories(prev => prev.filter(c => c !== cat));

  const toggleLocation = (loc) => setLocations(prev => prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]);

  const validate = () => {
    const err = {};
    if (!formData.title.trim()) err.title = "Title is required";
    if (!formData.description.trim()) err.description = "Description is required";
    if (categories.length === 0) err.categories = "Select at least one category";
    if (locations.length === 0) err.locations = "Select at least one location";
    if (!formData.budget || formData.budget <= 0) err.budget = "Valid budget required";
    if (!formData.duration.trim()) err.duration = "Duration is required";
    if (!formData.openings || formData.openings <= 0) err.openings = "Openings must be greater than 0";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      const payload = {
        title: formData.title,
        description: formData.description,
        categories,
        locations,
        budget: Number(formData.budget),
        duration: formData.duration,
        requiredSticks: Number(formData.requiredSticks),
        openings: Number(formData.openings)
      };
      const token = localStorage.getItem("authToken");
      if (!token) return setErrors({ submit: "Login required" });

      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/promotion/create`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      navigate("/my-promotions");
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || "Failed to create promotion" });
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main className="flex-grow mt-20 mb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Create New Promotion
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Fill in the details below to create a new promotion campaign. All fields marked with * are required.
            </p>
          </div>

          {/* Error Alert */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-center font-medium">{errors.submit}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
            {/* TITLE */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Promotion Title *
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter promotion title"
                className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
              {errors.title && <p className="text-red-600 text-sm font-medium mt-1">{errors.title}</p>}
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                placeholder="Describe your promotion in detail"
                className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
              {errors.description && <p className="text-red-600 text-sm font-medium mt-1">{errors.description}</p>}
            </div>

            {/* CATEGORIES */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-gray-700" />
                <label className="block text-sm font-semibold text-gray-800">
                  Categories *
                </label>
              </div>
              
              <div 
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)} 
                className={`border ${showCategoryDropdown ? 'border-purple-500 ring-1 ring-purple-500' : 'border-gray-300'} p-3.5 rounded-xl cursor-pointer flex justify-between items-center bg-white hover:border-gray-400 transition-all duration-200`}
              >
                <span className={categories.length === 0 ? "text-gray-500" : "text-gray-800"}>
                  {categories.length === 0 ? "Select Categories" : categories.join(", ")}
                </span>
                {showCategoryDropdown ? <ChevronUp className="text-gray-600" /> : <ChevronDown className="text-gray-600" />}
              </div>
              
              {showCategoryDropdown && (
                <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {remainingCategories.map(cat => (
                    <label key={cat} className="flex items-center gap-3 p-2 hover:bg-white rounded-lg cursor-pointer transition-colors duration-150">
                      <input 
                        type="checkbox" 
                        checked={categories.includes(cat)} 
                        onChange={() => toggleCategory(cat)} 
                        className="rounded border-gray-400 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="text-gray-700 font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              )}
              
              {categories.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {categories.map(cat => (
                    <span 
                      key={cat} 
                      className="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full flex gap-2 items-center text-sm font-medium text-purple-800 border border-purple-200"
                    >
                      {cat}
                      <X 
                        size={16} 
                        className="cursor-pointer hover:text-red-600 transition-colors" 
                        onClick={() => removeCategory(cat)} 
                      />
                    </span>
                  ))}
                </div>
              )}
              
              {errors.categories && <p className="text-red-600 text-sm font-medium">{errors.categories}</p>}
            </div>

            {/* LOCATIONS */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-gray-700" />
                <label className="block text-sm font-semibold text-gray-800">
                  Target Locations *
                </label>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {commonLocations.map(loc => (
                  <label 
                    key={loc} 
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200 ${locations.includes(loc) ? 'border-purple-500 bg-purple-50 ring-1 ring-purple-500' : 'border-gray-300 hover:border-gray-400'}`}
                  >
                    <input 
                      type="checkbox" 
                      checked={locations.includes(loc)} 
                      onChange={() => toggleLocation(loc)} 
                      className="rounded border-gray-400 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-gray-700 font-medium">{loc}</span>
                  </label>
                ))}
              </div>
              {errors.locations && <p className="text-red-600 text-sm font-medium">{errors.locations}</p>}
            </div>

            {/* BUDGET & DURATION */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* BUDGET */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <DollarSign size={18} className="text-gray-700" />
                  <label className="block text-sm font-semibold text-gray-800">
                    Budget *
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">₹</span>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="Enter budget amount"
                    className="w-full border border-gray-300 rounded-xl p-3.5 pl-10 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                {errors.budget && <p className="text-red-600 text-sm font-medium mt-1">{errors.budget}</p>}
              </div>

              {/* DURATION */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar size={18} className="text-gray-700" />
                  <label className="block text-sm font-semibold text-gray-800">
                    Duration *
                  </label>
                </div>
                <input
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 2 weeks, 30 days"
                  className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                {errors.duration && <p className="text-red-600 text-sm font-medium mt-1">{errors.duration}</p>}
              </div>
            </div>

            {/* OPENINGS & REQUIRED STICKS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* OPENINGS */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-gray-700" />
                  <label className="block text-sm font-semibold text-gray-800">
                    Openings *
                  </label>
                </div>
                <input
                  type="number"
                  min="1"
                  name="openings"
                  value={formData.openings}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
                {errors.openings && <p className="text-red-600 text-sm font-medium mt-1">{errors.openings}</p>}
              </div>

              {/* REQUIRED STICKS */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-gray-700" />
                  <label className="block text-sm font-semibold text-gray-800">
                    Required Sticks
                  </label>
                </div>
                <input
                  type="number"
                  name="requiredSticks"
                  value={formData.requiredSticks}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3.5 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating Promotion...
                  </span>
                ) : (
                  "Create Promotion"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PromotionForm;