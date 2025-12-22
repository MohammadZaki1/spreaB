import React, { useState } from 'react';
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const ProjectCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Projects', count: 28 },
    { id: 'social-media', name: 'Social Media Campaigns', count: 12 },
    { id: 'content', name: 'Content Creation', count: 8 },
    { id: 'video', name: 'Video Production', count: 6 },
    { id: 'photo', name: 'Photography', count: 4 },
    { id: 'branding', name: 'Brand Partnerships', count: 3 }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Instagram Reels Campaign Package",
      description: "5 high-quality Reels with trending sounds and creative transitions",
      delivery: "3 days delivery",
      price: "$499",
      category: "social-media",
      influencer: "Sarah Chen",
      influencerImage: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      reviews: 128,
      image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "YouTube Product Review Package",
      description: "Comprehensive product review video with demo and call-to-action",
      delivery: "5 days delivery",
      price: "$799",
      category: "video",
      influencer: "Marcus Johnson",
      influencerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      reviews: 96,
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "Brand Blog Content Package",
      description: "3 SEO-optimized blog posts (1000+ words each) with images",
      delivery: "7 days delivery",
      price: "$299",
      category: "content",
      influencer: "Priya Sharma",
      influencerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      reviews: 156,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "TikTok Brand Challenge Package",
      description: "Branded challenge creation with 3 influencers participating",
      delivery: "4 days delivery",
      price: "$899",
      category: "social-media",
      influencer: "Alex Rodriguez",
      influencerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.7,
      reviews: 89,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Product Photography Package",
      description: "20 professional product photos with lifestyle context",
      delivery: "4 days delivery",
      price: "$399",
      category: "photo",
      influencer: "Lisa Wang",
      influencerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      reviews: 67,
      image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      title: "Brand Ambassador Package",
      description: "3-month brand partnership with exclusive content rights",
      delivery: "Setup in 2 days",
      price: "$2,499",
      category: "branding",
      influencer: "David Kim",
      influencerImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4.8,
      reviews: 45,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    }
  ];

  const shopByCategory = [
    {
      name: "Social Media Campaigns",
      icon: "📱",
      projects: 12,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Video Production",
      icon: "🎬",
      projects: 8,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Content Creation",
      icon: "✍️",
      projects: 10,
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Brand Partnerships",
      icon: "🤝",
      projects: 6,
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const howItWorks = [
    {
      step: "Browse",
      title: "Find ready-to-go campaigns",
      description: "Discover pre-packaged influencer campaigns with clear scope and deliverables"
    },
    {
      step: "Buy",
      title: "Purchase instantly",
      description: "Work begins as soon as you purchase and provide your brand requirements"
    },
    {
      step: "Approve",
      title: "Review & approve",
      description: "Get your content delivered by deadline. Review, approve, and pay securely"
    }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? featuredProjects 
    : featuredProjects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Background */}
      <div className="relative bg-gradient-to-r from-purple-900 via-[#9333EA] to-purple-700 text-white overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-semibold"></span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Project Catalog
            </h1>
            <div className="text-2xl md:text-3xl font-bold text-yellow-300 mb-6">
       Ready campaigns. Clear pricing. Proven results.
            </div>
            <p className="text-xl text-purple-100 mb-10 max-w-3xl">
              Complete your most exciting influencer campaigns with Project Catalog. 
              Browse and buy pre-packaged campaigns from top creators in just a few clicks.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for campaign packages (e.g., 'Instagram Reels', 'Product Launch')"
                  className="w-full px-6 py-4 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#9333EA] text-lg"
                />
                <button className="absolute right-3 top-3 text-gray-400">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How it works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#9333EA] rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Shop by Category */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Shop by category
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {shopByCategory.map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer group"
              >
                <div className="h-40 relative overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="text-lg font-bold">{category.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{category.projects} projects</span>
                    <button className="text-[#9333EA] font-semibold hover:text-purple-700">
                      Browse →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-5 py-2.5 rounded-full font-medium transition duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-[#9333EA] text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-[#9333EA] hover:text-[#9333EA]'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Featured Projects Grid */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                {/* Project Image */}
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-white/90 text-[#9333EA] px-3 py-1 rounded-full text-sm font-bold">
                      {project.delivery}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  {/* Influencer Info */}
                  <div className="flex items-center mb-4">
                    <img 
                      src={project.influencerImage} 
                      alt={project.influencer}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-bold text-gray-900">{project.influencer}</div>
                      <div className="flex items-center text-sm text-gray-600">
                        <div className="flex text-yellow-400 mr-1">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="font-bold mr-1">{project.rating}</span>
                        <span>({project.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Details */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-6">{project.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{project.price}</div>
                      <div className="text-gray-500 text-sm">Fixed price</div>
                    </div>
                    <button className="bg-[#9333EA] hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
                      Purchase Package
                    </button>
                  </div>
                  
                  {/* Included Features */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Fast delivery
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Revisions included
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Source files
                      </div>
                      <div className="flex items-center text-gray-600">
                        <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        100% satisfaction
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Browse All Categories */}
        <div className="mb-16 bg-gradient-to-r from-purple-50 to-white rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Browse all categories
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Instagram Campaigns", count: 8, icon: "📸" },
              { name: "YouTube Packages", count: 6, icon: "🎥" },
              { name: "TikTok Challenges", count: 5, icon: "🎵" },
              { name: "Blog Content", count: 7, icon: "📝" },
              { name: "Podcast Sponsorships", count: 4, icon: "🎙️" },
              { name: "Email Marketing", count: 3, icon: "📧" },
              { name: "Product Photography", count: 5, icon: "📷" },
              { name: "Brand Ambassadors", count: 4, icon: "👑" },
              { name: "Live Streaming", count: 3, icon: "🔴" },
              { name: "SEO Content", count: 6, icon: "🔍" }
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-white rounded-lg p-4 hover:shadow-lg transition duration-300 cursor-pointer border border-gray-200"
              >
                <div className="text-2xl mb-2">{category.icon}</div>
                <div className="font-medium text-gray-900 mb-1">{category.name}</div>
                <div className="text-sm text-gray-500">{category.count} packages</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scale Your Business Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-gray-900 to-black text-white rounded-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">
                  Scale your brand with ready-made influencer solutions
                </h2>
                <p className="text-gray-300 mb-8">
                  Save time and resources with our pre-packaged campaigns designed 
                  for quick deployment and maximum impact.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#9333EA] rounded-lg p-2 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Social Media Campaign Packages</div>
                      <div className="text-gray-400 text-sm">Complete Instagram, TikTok, and YouTube campaigns</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#9333EA] rounded-lg p-2 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Content Creation Packages</div>
                      <div className="text-gray-400 text-sm">SEO-optimized blogs, email newsletters, and more</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#9333EA] rounded-lg p-2 mr-4">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-bold">Video & Photography Packages</div>
                      <div className="text-gray-400 text-sm">Professional video editing and product photography</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="md:w-3/5 relative">
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Brand Collaboration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
                  <div className="text-xl font-bold mb-2">Ready to launch your campaign?</div>
                  <button className="bg-[#9333EA] hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-300">
                    Explore All Packages
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center py-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Start your influencer campaign in minutes
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            No lengthy negotiations. No hidden costs. Just clear packages from top creators ready to work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#9333EA] hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition duration-300 shadow-lg hover:shadow-xl">
              Browse Project Catalog
            </button>
            <button className="border-2 border-[#9333EA] text-[#9333EA] hover:bg-purple-50 px-8 py-4 rounded-lg font-bold text-lg transition duration-300">
              Learn How It Works
            </button>
          </div>
          <p className="text-gray-500 mt-6">
            All packages include: Fast delivery • Quality guarantee • Revisions included • Secure payment
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectCatalog;