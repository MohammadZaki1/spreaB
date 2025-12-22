// HireAgencyPage.jsx
import React, { useState } from 'react';
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Search, ArrowRight, CheckCircle, Users, TrendingUp, Clock, 
  Star, MapPin, Briefcase, ChevronDown, Filter, Mail, Phone, MessageCircle
} from 'lucide-react';

// Brand color configuration
const brandColor = {
  primary: '#9333EA',
  light: '#A855F7',
  dark: '#7C3AED',
  background: '#F3E8FF',
  text: '#9333EA'
};

// Main HireAgency Component
const HireAgencyPage = () => {
  const [showAllAgencies, setShowAllAgencies] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    {
      main: "Development & IT",
      subcategories: ["App Development", "Robotics", "Software Development", "Web Development"],
      icon: "💻",
      image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      main: "Design & Creative",
      subcategories: ["Branding", "Design", "Graphic Design", "Video Production"],
      icon: "🎨",
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      main: "Sales & Marketing",
      subcategories: ["Advertising", "Affiliate Marketing", "Content Marketing", "Creators"],
      icon: "📈",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      main: "Writing & Translation",
      subcategories: ["Translation", "Copywriting", "Content Writing", "Ghostwriting"],
      icon: "✍️",
      image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      main: "Admin & Customer Support",
      subcategories: ["Support", "BPO", "Call Center", "Virtual Assistant"],
      icon: "🤝",
      image: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    },
    {
      main: "Finance & Accounting",
      subcategories: ["Accounting", "Bookkeeping", "HR Consulting", "Payroll Processing"],
      icon: "💰",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const agencies = [
    {
      id: 1,
      name: "Digital Nexus Agency",
      category: "Development & IT",
      subcategories: ["App Development", "Software Development", "Web Development"],
      rating: 4.9,
      reviews: 128,
      projects: 245,
      location: "San Francisco, USA",
      description: "Full-service digital agency specializing in cutting-edge tech solutions for startups and enterprises.",
      hourlyRate: "$75-150/hr",
      verified: true,
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      cover: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      badges: ["Top Rated", "Preferred Partner"],
      teamSize: "50-100 employees",
      languages: ["English", "Spanish", "French"],
      minimumProject: "$5,000"
    },
    {
      id: 2,
      name: "Creative Canvas Studio",
      category: "Design & Creative",
      subcategories: ["Branding", "Graphic Design", "Video Production"],
      rating: 4.8,
      reviews: 96,
      projects: 187,
      location: "New York, USA",
      description: "Award-winning creative agency delivering stunning visual designs and brand identities.",
      hourlyRate: "$60-120/hr",
      verified: true,
      logo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      cover: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      badges: ["Top Rated"],
      teamSize: "20-50 employees",
      languages: ["English", "German"],
      minimumProject: "$3,000"
    },
    {
      id: 3,
      name: "Market Momentum Pro",
      category: "Sales & Marketing",
      subcategories: ["Advertising", "Content Marketing", "Affiliate Marketing"],
      rating: 4.7,
      reviews: 204,
      projects: 312,
      location: "London, UK",
      description: "Data-driven marketing agency specializing in growth strategies and digital campaigns.",
      hourlyRate: "$80-160/hr",
      verified: true,
      logo: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      cover: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      badges: ["Top Rated", "Best Seller"],
      teamSize: "100-200 employees",
      languages: ["English", "French", "Spanish"],
      minimumProject: "$10,000"
    },
    {
      id: 4,
      name: "Tech Forge Solutions",
      category: "Development & IT",
      subcategories: ["Robotics", "Software Development", "AI Solutions"],
      rating: 4.9,
      reviews: 87,
      projects: 189,
      location: "Berlin, Germany",
      description: "Specialists in advanced tech including robotics, AI systems, and enterprise software.",
      hourlyRate: "$90-180/hr",
      verified: true,
      logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      cover: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      badges: ["Innovation Leader"],
      teamSize: "30-70 employees",
      languages: ["English", "German", "French"],
      minimumProject: "$7,500"
    },
    {
      id: 5,
      name: "Brand Boost Collective",
      category: "Sales & Marketing",
      subcategories: ["Advertising", "Content Marketing", "Creator Partnerships"],
      rating: 4.6,
      reviews: 143,
      projects: 156,
      location: "Toronto, Canada",
      description: "Experts in brand development and influencer marketing campaigns with proven results.",
      hourlyRate: "$70-140/hr",
      verified: true,
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      cover: "https://images.unsplash.com/photo-1551836026-d5c2c5af78e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      badges: ["Trending"],
      teamSize: "15-40 employees",
      languages: ["English", "French"],
      minimumProject: "$4,000"
    },
    {
      id: 6,
      name: "Pixel Perfect Agency",
      category: "Design & Creative",
      subcategories: ["Graphic Design", "Video Production", "UI/UX Design"],
      rating: 4.8,
      reviews: 231,
      projects: 231,
      location: "Sydney, Australia",
      description: "Creative agency focused on user-centered design solutions and digital experiences.",
      hourlyRate: "$65-130/hr",
      verified: true,
      logo: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
      cover: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      badges: ["Top Rated"],
      teamSize: "25-60 employees",
      languages: ["English", "Japanese"],
      minimumProject: "$5,500"
    }
  ];

  const trackingPartners = [
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "eMob", logo: "https://via.placeholder.com/100x50/4CAF50/FFFFFF?text=eMob" },
    { name: "AUTOMATIC", logo: "https://via.placeholder.com/100x50/2196F3/FFFFFF?text=AUTOMATIC" },
    { name: "SAMMYCAN", logo: "https://via.placeholder.com/100x50/FF9800/FFFFFF?text=SAMMYCAN" }
  ];

  const howItWorks = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Search",
      description: "Browse agencies by category, rating, or location"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Compare",
      description: "Review portfolios, ratings, and client feedback"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Hire",
      description: "Post your project and receive proposals"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Collaborate",
      description: "Work together using our project management tools"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Verified agency profiles with ratings"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Secure payment protection"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "24/7 customer support"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Project management tools"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Quality guarantee"
    }
  ];

  const handleViewProfile = (agencyId) => {
    // Navigate to agency profile page
    console.log(`Navigating to agency profile ${agencyId}`);
    // In a real app, you would use react-router:
    // navigate(`/agency/${agencyId}`);
    
    // For demo, show an alert
    alert(`Navigating to agency profile page for agency ID: ${agencyId}`);
  };

  const scrollToAgencies = () => {
    setShowAllAgencies(true);
    setTimeout(() => {
      document.getElementById('agencies-section').scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const filteredAgencies = agencies.filter(agency => {
    if (selectedCategory === 'All') return true;
    return agency.category === selectedCategory;
  });

  const displayedAgencies = showAllAgencies ? filteredAgencies : filteredAgencies.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Image */}
      <div 
        className="relative bg-cover bg-center"
        style={{ 
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')`
        }}
      >
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Bring it to life with an agency
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              From rapid jobs to complex programs, there's an agency ready to help.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="flex items-center bg-white rounded-lg shadow-2xl overflow-hidden">
                <Search className="w-5 h-5 text-gray-400 ml-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="What services are you looking for? (e.g., Web Development, Brand Design)"
                  className="flex-grow px-4 py-4 text-gray-800 focus:outline-none"
                />
                <button 
                  onClick={() => {
                    if (searchTerm) {
                      scrollToAgencies();
                    }
                  }}
                  className="text-white px-8 py-4 flex items-center space-x-2 transition-colors whitespace-nowrap hover:shadow-lg"
                  style={{ backgroundColor: brandColor.primary }}
                >
                  <span>Search Agencies</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
              
              {/* Tracking Partners */}
              <div className="mt-10">
                <p className="text-sm text-gray-300 mb-4">Tracked by leading companies</p>
                <div className="flex flex-wrap gap-6 justify-center items-center">
                  {trackingPartners.map((partner, index) => (
                    <div 
                      key={index} 
                      className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 hover:bg-white/20 transition-colors"
                    >
                      <div className="w-8 h-8 flex items-center justify-center">
                        <img 
                          src={partner.logo} 
                          alt={partner.name}
                          className="h-6 w-auto object-contain"
                        />
                      </div>
                      <span className="font-medium text-white">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore our most in-demand categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find specialized agencies across various fields to bring your vision to reality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-100"
              onClick={() => {
                setSelectedCategory(category.main);
                scrollToAgencies();
              }}
            >
              {/* Category Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.main}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/800x400/9333EA/FFFFFF?text=${encodeURIComponent(category.main)}`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                  <span className="text-3xl bg-white/20 backdrop-blur-sm p-2 rounded-lg">{category.icon}</span>
                  <h3 className="text-xl font-bold text-white">{category.main}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <ul className="space-y-2 mb-4">
                  {category.subcategories.slice(0, expandedCategory === index ? 4 : 2).map((sub, subIndex) => (
                    <li key={subIndex} className="flex items-center text-gray-600 hover:text-purple-600 transition-colors">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      <span>{sub}</span>
                    </li>
                  ))}
                </ul>
                
                {category.subcategories.length > 2 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setExpandedCategory(expandedCategory === index ? null : index);
                    }}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                    style={{ color: brandColor.primary }}
                  >
                    {expandedCategory === index ? 'Show Less' : 'Show More'}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${expandedCategory === index ? 'rotate-180' : ''}`} />
                  </button>
                )}
                
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCategory(category.main);
                    scrollToAgencies();
                  }}
                  className="mt-4 w-full py-3 text-white font-medium rounded-lg transition-colors flex items-center justify-center group-hover:shadow-lg hover:opacity-90"
                  style={{ backgroundColor: brandColor.primary }}
                >
                  Browse {category.main} Agencies
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agencies Section */}
      <div id="agencies-section" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Top Rated Agencies
              </h2>
              <p className="text-gray-600">
                Discover agencies matched to your needs
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-[200px]"
                style={{ borderColor: brandColor.light }}
              >
                <option value="All">All Categories</option>
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat.main}>{cat.main}</option>
                ))}
              </select>
            </div>
          </div>

          {displayedAgencies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No agencies found matching your criteria.</p>
              <button 
                onClick={() => setSelectedCategory('All')}
                className="mt-4 text-purple-600 hover:text-purple-800 font-medium"
                style={{ color: brandColor.primary }}
              >
                View all agencies
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedAgencies.map((agency) => (
                  <div key={agency.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                    {/* Agency Cover */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={agency.cover} 
                        alt={agency.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/800x400/9333EA/FFFFFF?text=${encodeURIComponent(agency.name)}`;
                        }}
                      />
                      <div className="absolute top-4 right-4 flex flex-wrap gap-2">
                        {agency.badges.map((badge, idx) => (
                          <span 
                            key={idx} 
                            className="text-white text-xs px-3 py-1 rounded-full font-medium"
                            style={{ backgroundColor: brandColor.primary }}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      {agency.verified && (
                        <div 
                          className="absolute bottom-4 left-4 text-white text-xs px-3 py-1 rounded-full flex items-center font-medium"
                          style={{ backgroundColor: brandColor.dark }}
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start mb-4">
                        <img 
                          src={agency.logo} 
                          alt={agency.name}
                          className="w-16 h-16 rounded-full object-cover border-4 border-white -mt-12 bg-white shadow-md"
                          onError={(e) => {
                            e.target.src = `https://via.placeholder.com/100x100/9333EA/FFFFFF?text=${encodeURIComponent(agency.name.substring(0, 2))}`;
                          }}
                        />
                        <div className="ml-4 flex-1">
                          <h3 className="text-xl font-bold text-gray-900 hover:text-purple-600 cursor-pointer transition-colors">
                            {agency.name}
                          </h3>
                          <div className="flex items-center mt-1">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="ml-1 font-semibold">{agency.rating}</span>
                              <span className="mx-1 text-gray-400">•</span>
                              <span className="text-gray-600">{agency.reviews} reviews</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-4 line-clamp-2">{agency.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span className="truncate">{agency.location}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Briefcase className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{agency.projects} projects completed</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Users className="w-4 h-4 mr-2 flex-shrink-0" />
                          <span>{agency.hourlyRate}</span>
                        </div>
                      </div>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {agency.subcategories.map((sub, idx) => (
                          <span 
                            key={idx} 
                            className="px-3 py-1 rounded-full text-sm font-medium"
                            style={{ 
                              backgroundColor: brandColor.background,
                              color: brandColor.text
                            }}
                          >
                            {sub}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleViewProfile(agency.id)}
                          className="flex-1 text-white py-2.5 rounded-lg font-medium transition-colors hover:shadow-lg hover:opacity-90"
                          style={{ backgroundColor: brandColor.primary }}
                        >
                          View Profile
                        </button>
                        <button 
                          className="flex-1 border py-2.5 rounded-lg font-medium transition-colors hover:shadow-lg hover:bg-purple-50"
                          style={{ 
                            borderColor: brandColor.primary,
                            color: brandColor.primary,
                            backgroundColor: 'white'
                          }}
                        >
                          Contact
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {!showAllAgencies && filteredAgencies.length > 3 && (
                <div className="text-center mt-12">
                  <button 
                    onClick={() => setShowAllAgencies(true)}
                    className="border-2 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center hover:shadow-lg hover:opacity-90"
                    style={{ 
                      backgroundColor: brandColor.primary,
                      borderColor: brandColor.primary
                    }}
                  >
                    Show All {filteredAgencies.length} Agencies
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How it works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Simple steps to find and hire the perfect agency for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-lg text-center h-full hover:shadow-xl transition-shadow border border-gray-100">
                  <div 
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 text-white"
                    style={{ backgroundColor: brandColor.primary }}
                  >
                    {step.icon}
                  </div>
                  <div 
                    className="absolute -top-3 -right-3 w-10 h-10 text-white rounded-full flex items-center justify-center font-bold text-lg"
                    style={{ backgroundColor: brandColor.dark }}
                  >
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Content */}
            <div className="p-8 md:p-12 lg:p-16 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">
                Why choose SpreadB Agencies?
              </h2>
              
              <div className="space-y-6 mb-10">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      <div 
                        className="p-2 rounded-lg"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
                      >
                        {benefit.icon}
                      </div>
                    </div>
                    <div>
                      <span className="text-lg font-medium">{benefit.text}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={scrollToAgencies}
                  className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg"
                  style={{ color: brandColor.primary }}
                >
                  Get Started - It's Free
                </button>
                <button className="bg-transparent border-2 border-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
                  Schedule a Demo
                </button>
              </div>
            </div>
            
            {/* Right Image - Team Collaboration */}
            <div className="relative h-64 lg:h-auto min-h-[300px]">
              <img 
                src="https://images.unsplash.com/photo-1560264280-88b68371db39?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Team collaboration" 
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/800x400/9333EA/FFFFFF?text=Team+Collaboration`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-purple-800/20"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-white text-xl font-bold">Team Collaboration</h3>
                <p className="text-gray-200">Successful projects through effective teamwork</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: brandColor.primary }}>5,000+</div>
              <div className="text-gray-600">Agencies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: brandColor.primary }}>98%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: brandColor.primary }}>50K+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2" style={{ color: brandColor.primary }}>150+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Finding the Right Agency?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our expert advisors can help match you with the perfect agency for your project requirements and budget.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white" style={{ backgroundColor: brandColor.primary }}>
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Get detailed responses within 24 hours</p>
              <a href="mailto:support@spreadb.com" className="text-purple-600 font-medium" style={{ color: brandColor.primary }}>
                support@spreadb.com
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white" style={{ backgroundColor: brandColor.primary }}>
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
              <a href="tel:+18005551234" className="text-purple-600 font-medium" style={{ color: brandColor.primary }}>
                +1 (800) 555-1234
              </a>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 text-white" style={{ backgroundColor: brandColor.primary }}>
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our experts in real-time</p>
              <button className="text-purple-600 font-medium" style={{ color: brandColor.primary }}>
                Start Live Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-white border-t">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to find your perfect agency match?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of brands and influencers who have found success with SpreadB agencies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={scrollToAgencies}
                className="text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center shadow-lg hover:shadow-xl hover:opacity-90"
                style={{ backgroundColor: brandColor.primary }}
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Agencies
              </button>
              <button 
                className="border-2 px-8 py-3 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg hover:bg-purple-50"
                style={{ 
                  borderColor: brandColor.primary,
                  color: brandColor.primary,
                  backgroundColor: 'white'
                }}
              >
                Post a Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HireAgencyPage;