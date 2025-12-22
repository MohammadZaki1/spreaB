import React, { useState } from 'react';
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const TalentMarketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      title: "Social Media Influencers",
      description: "Instagram, TikTok, YouTube, and more",
      icon: "📱",
      count: "1,200+",
      color: "bg-blue-50 border-blue-100",
      bgImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Content Creators",
      description: "Bloggers, Writers, Copywriters",
      icon: "✍️",
      count: "850+",
      color: "bg-green-50 border-green-100",
      bgImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Video Production",
      description: "Videographers, Editors, Animators",
      icon: "🎬",
      count: "650+",
      color: "bg-purple-50 border-purple-100",
      bgImage: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Graphic Design",
      description: "Brand Design, Social Media Graphics",
      icon: "🎨",
      count: "420+",
      color: "bg-pink-50 border-pink-100",
      bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Photography",
      description: "Product, Lifestyle, Commercial",
      icon: "📸",
      count: "380+",
      color: "bg-yellow-50 border-yellow-100",
      bgImage: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Podcast & Audio",
      description: "Hosts, Producers, Sound Design",
      icon: "🎙️",
      count: "210+",
      color: "bg-indigo-50 border-indigo-100",
      bgImage: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const topTalents = [
    {
      name: "Sarah Chen",
      title: "Instagram Fashion Influencer",
      rate: "$250/post",
      rating: 4.9,
      reviews: 128,
      location: "Los Angeles, CA",
      verified: true,
      followers: "450K+",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bgImage: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Marcus Johnson",
      title: "YouTube Tech Reviewer",
      rate: "$500/video",
      rating: 4.8,
      reviews: 96,
      location: "San Francisco, CA",
      verified: true,
      followers: "320K+",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Priya Sharma",
      title: "Content Marketing Specialist",
      rate: "$80/hour",
      rating: 4.9,
      reviews: 156,
      location: "Mumbai, India",
      verified: true,
      followers: "Blog Network",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bgImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "David Kim",
      title: "Brand Identity Designer",
      rate: "$120/hour",
      rating: 4.7,
      reviews: 89,
      location: "Seoul, South Korea",
      verified: true,
      followers: "Design Studio",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bgImage: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const features = [
    {
      title: "Discover quality influencers faster",
      description: "Find the perfect match with our AI-powered search and detailed creator profiles showcasing their niche, audience demographics, and past campaign results.",
      icon: "🔍",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Collaboration tools for campaign management",
      description: "Built-in messaging, file sharing, and project tracking tools to streamline your influencer collaborations from brief to payment.",
      icon: "🛠️",
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      title: "Secure payment protection",
      description: "SpreadB holds payments until you approve the work, ensuring you only pay for deliverables that meet your expectations.",
      icon: "🔒",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const stats = [
    { number: "4.9/5", label: "Average client rating", icon: "⭐" },
    { number: "98%", label: "Client satisfaction rate", icon: "😊" },
    { number: "24h", label: "Average response time", icon: "⚡" },
    { number: "2,500+", label: "Active creators", icon: "👥" }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Background Image */}
      <div className="relative bg-gradient-to-r from-purple-900/90 via-[#9333EA]/90 to-purple-700/90 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold">⭐ Trusted by 5,000+ Brands</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Your perfect creator awaits <br />
              <span className="text-yellow-300">Post, match, launch</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto">
              Connect with vetted influencers and creators. Find the perfect match for your brand campaigns on SpreadB.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="What kind of creator are you looking for?"
                      className="w-full px-6 py-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA] text-lg"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="absolute right-3 top-3 text-gray-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 transform hover:scale-105"
                >
                  Get Started
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Stats Section with Images */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-[#9333EA] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Grid with Images */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse talent by category
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Find specialized creators across all major platforms and content types
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-1"
              >
                <div className="h-40 relative overflow-hidden">
                  <img 
                    src={category.bgImage} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 text-3xl">{category.icon}</div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-[#9333EA] px-3 py-1 rounded-full text-sm font-bold">
                      {category.count}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-sm text-white/90">{category.description}</p>
                  </div>
                </div>
                <div className="p-4">
                  <button className="w-full bg-[#9333EA] hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition duration-300">
                    Browse Creators
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Talent Section with Background Images */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Top-rated creators on SpreadB</h2>
              <p className="text-gray-600 mt-2">Highly reviewed influencers ready for your next campaign</p>
            </div>
            <button className="text-[#9333EA] font-semibold hover:text-purple-700 flex items-center">
              View all creators 
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topTalents.map((talent, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Talent Background Image */}
                <div className="h-32 relative overflow-hidden">
                  <img 
                    src={talent.bgImage} 
                    alt={talent.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute -bottom-10 left-4">
                    <div className="relative">
                      <img 
                        src={talent.image} 
                        alt={talent.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      {talent.verified && (
                        <div className="absolute -bottom-1 -right-1 bg-[#9333EA] text-white w-6 h-6 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="pt-12 pb-6 px-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900">{talent.name}</h3>
                    <p className="text-[#9333EA] font-semibold text-sm">{talent.title}</p>
                    <div className="flex items-center mt-2 text-gray-600 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {talent.location}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="flex text-yellow-400 mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">{talent.rating}</span>
                      <span className="text-gray-500 mx-2">•</span>
                      <span className="text-gray-600 text-sm">{talent.reviews} reviews</span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-gray-900">{talent.rate}</div>
                        <div className="text-gray-500 text-sm">{talent.followers} followers</div>
                      </div>
                      <button className="bg-[#9333EA] hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-300">
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section with Images */}
        <div className="mb-16 bg-gradient-to-r from-purple-50 to-white rounded-2xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why choose SpreadB for your influencer campaigns?
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Everything you need to find, hire, and collaborate with top influencers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works with Images */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How SpreadB works for brands
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Simple steps to launch your influencer marketing campaign
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Post Your Campaign",
                desc: "Describe your campaign needs, budget, and goals",
                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                step: "2",
                title: "Review Proposals",
                desc: "Receive proposals from interested influencers within hours",
                image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                step: "3",
                title: "Hire The Best",
                desc: "Compare profiles, reviews, and rates to hire the perfect match",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              {
                step: "4",
                title: "Collaborate & Pay",
                desc: "Use our tools to manage the project and pay securely",
                image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-[#9333EA] rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                    {step.step}
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials with Images */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Brand Collaboration"
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent md:hidden"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
                  <h2 className="text-2xl font-bold mb-2">You're in good company</h2>
                  <p className="text-gray-300">
                    Thousands of brands trust SpreadB for influencer collaborations
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 p-8 md:p-12">
                <div className="hidden md:block mb-8">
                  <h2 className="text-3xl font-bold mb-4">
                    You're in good company
                  </h2>
                  <p className="text-gray-300 text-lg">
                    Thousands of brands, from startups to Fortune 500 companies, use SpreadB to find top influencers
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl">★</div>
                      <span className="ml-2 text-lg font-bold">4.9/5</span>
                    </div>
                    <p className="text-gray-300 italic mb-4">
                      "SpreadB transformed how we run influencer campaigns. The quality of creators and ease of collaboration is unmatched."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
                      <div>
                        <div className="font-bold">Jessica Miller</div>
                        <div className="text-gray-400 text-sm">Marketing Director, TechStart Inc.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-4">
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl mr-1">★</div>
                      <div className="text-yellow-400 text-xl">★</div>
                      <span className="ml-2 text-lg font-bold">4.9/5</span>
                    </div>
                    <p className="text-gray-300 italic mb-4">
                      "We found 5 perfect influencers for our product launch in just 3 days. The platform is intuitive and the support team is fantastic."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-700 rounded-full mr-3"></div>
                      <div>
                        <div className="font-bold">Alex Thompson</div>
                        <div className="text-gray-400 text-sm">Brand Manager, FashionForward</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA with Background Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Brand Collaboration"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#9333EA]/90 to-purple-700/90"></div>
          </div>
          
          <div className="relative z-10 text-center text-white py-16 px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Take the first step toward smarter influencer marketing
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join thousands of brands who trust SpreadB for their influencer collaborations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[#9333EA] hover:bg-purple-50 px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl">
                Post a Campaign - It's Free
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-[#9333EA] px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
                Browse Top Creators
              </button>
            </div>
            <p className="text-purple-200 mt-8">
              No upfront costs • Only pay when you hire • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TalentMarketplace;