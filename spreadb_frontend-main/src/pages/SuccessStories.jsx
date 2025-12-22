import React, { useState } from "react";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const placeholder = (w = 800, h = 500, txt = "Image") =>
  `https://via.placeholder.com/${w}x${h}?text=${encodeURIComponent(txt)}`;

const SuccessStories = () => {
  const [activeTab, setActiveTab] = useState("null");
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
    const [currentFeaturedPage, setCurrentFeaturedPage] = useState(1); // Add this
  const itemsPerPage = 6; // Show 6 cards per page (3 columns × 2 rows)

  // Featured Stories
  // Update your featuredStories array to have at least 4 items:
  const featuredStories = [
    {
      id: "featured1",
      title: "How Microsoft Scaled Video Production While Driving Cost Savings",
      category: "Business",
      client: "Microsoft",
      results: [
        { label: "videos", value: "9", description: "produced within 10 days" },
        { label: "Trusted talent bench", value: "", description: "built through Enterprise Suite" }
      ],
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      trustedBy: ["Microsoft", "AUTOMATTIC", "Sissel", "Nasdaq"]
    },
    {
      id: "featured2",
      title: "How One Contract Through SpreadB Transformed This Founder's Startup",
      category: "Business",
      client: "Startup Founder",
      results: [
        { label: "saved", value: "10x", description: "in hiring costs through sourcing strategic skills on SpreadB vs. hiring for a single full-time role" },
        { label: "turnaround", value: "1 day", description: "between posting jobs and holding interviews with qualified creators" }
      ],
      image: "https://plus.unsplash.com/premium_photo-1661326274569-dd8337c5e6cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnVzaW5lc3MlMjBwZW9wbGV8ZW58MHx8MHx8fDA%3D",
      trustedBy: ["TechStart", "VentureCap"]
    },
    // Add 2 more featured stories
    {
      id: "featured3",
      title: "Global Brand Achieved 300% ROI with Micro-Influencer Campaign",
      category: "Marketing",
      client: "Global FMCG Brand",
      results: [
        { label: "ROI", value: "300%", description: "return on influencer marketing investment" },
        { label: "Engagement", value: "5.2%", description: "average engagement rate across all posts" }
      ],
      image: "https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D",
      trustedBy: ["P&G", "Unilever", "Nestlé"]
    },
    {
      id: "featured4",
      title: "E-commerce Brand Doubled Sales with TikTok Creator Network",
      category: "E-commerce",
      client: "Direct-to-Consumer Brand",
      results: [
        { label: "Sales Growth", value: "2x", description: "increase in monthly revenue" },
        { label: "New Customers", value: "45K", description: "acquired through creator content" }
      ],
      image: "https://images.unsplash.com/photo-1586880244386-8b3e34c8382c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGUlMjBjb21tZXJjZXxlbnwwfHwwfHx8MA%3D%3D",
      trustedBy: ["Shopify", "Meta", "TikTok"]
    }
  ];

  // Business Stories
  const businessStories = [
    {
      id: "biz1",
      title: "How Omic Uses AI and SpreadB to Help Save Lives: From Heartbreak to Breakthrough",
      category: "AI Services",
      tag: "Business",
      image: "https://images.unsplash.com/photo-1551135049-8a33b5883817?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "biz2",
      title: "Outperforming Bigger Rivals: Demco's Edge With SpreadB Business Plus",
      category: "Development & IT",
      tag: "Business",
      image: "https://images.unsplash.com/photo-1714974528737-3e6c7e4d11af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "biz3",
      title: "How PTS Blends Human Empathy with AI-Powered Dealmaking",
      category: "AI Services",
      tag: "Business",
      image:"https://images.unsplash.com/photo-1603201667230-bd139210db18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  // Talent Stories
  const talentStories = [
    {
      id: "talent1",
      title: "Turning Necessity Into Opportunity With Graphic Designer Pam Cheney",
      category: "Design & Creative",
      tag: "Talent",
      image: "https://plus.unsplash.com/premium_photo-1664299751486-52e135d92101?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzaWduJTIwJTI2JTIwdGFsZW50fGVufDB8fDB8fHww"
    },
    {
      id: "talent2",
      title: "Why a Creative Industry Veteran Is Thriving as a Freelancer",
      category: "Design & Creative",
      tag: "Talent",
      image: "https://images.unsplash.com/photo-1760883803481-6068a8666982?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRlc2lnbiUyMCUyNiUyMHRhbGVudHxlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "talent3",
      title: "How a Creative TikTok Landed a New Grad Her First Freelance Gig",
      category: "Sales & Marketing",
      tag: "Talent",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2NhbGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "talent4",
      title: "How a Med Student Built a Fulfilling Life Freelancing",
      category: "Development & IT",
      tag: "Talent",
      image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2ZWxvcG1lbnR8ZW58MHx8MHx8fDA%3D"
    }
  ];

  // SpreadB x SpreadB Stories
  const platformStories = [
    {
      id: "platform1",
      title: "How AI and Engineering Talent Are Shaping the Future of SpreadB",
      category: "Platform",
      results: [
        { label: "increase YoY", value: "11%", description: "in Q3 total revenue" },
        { label: "new Enterprise accounts", value: "210+", description: "added in two years through Q3 2023" }
      ],
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGRldmVsb3BtZW50fGVufDB8fDB8fHww"
    },
    {
      id: "platform2",
      title: "How Independent Talent Helps Power SpreadB's Global, 24/7 Enterprise Support Team",
      category: "Admin & Customer Support",
      tag: "SpreadB x SpreadB",
      image: "https://images.unsplash.com/photo-1603201667230-bd139210db18?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGJ1c2luZXNzJTIwbWVldGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      id: "platform3",
      title: "How Independent Pros Are Key to SpreadB's Best Creative Work",
      category: "Design & Creative",
      tag: "SpreadB x SpreadB",
      image: "https://plus.unsplash.com/premium_photo-1664299751486-52e135d92101?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVzaWduJTIwJTI2JTIwdGFsZW50fGVufDB8fDB8fHww"
    },
    {
      id: "platform4",
      title: "The Award-Winning Content Team Fueled by Independent Talent",
      category: "Sales & Marketing",
      tag: "SpreadB x SpreadB",
      image: "https://images.unsplash.com/photo-1760883803481-6068a8666982?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGRlc2lnbiUyMCUyNiUyMHRhbGVudHxlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  // All Stories Grid
  const allStories = [
    ...businessStories,
    ...talentStories,
    ...platformStories.filter(s => s.id !== "platform1"),
    {
      id: "biz4",
      title: "What MROSupply.com Learned From Hiring 1,000+ Freelancers on SpreadB",
      category: "Business",
      tag: "Success Stories",
      image: "https://images.unsplash.com/photo-1584268879905-f2e1fc9321e8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGRldmVsb3BtZW50fGVufDB8fDB8fHww"
    },
    {
      id: "biz5",
      title: "How SpreadB Helped Promly Build a Healthier Future for Gen Z Online",
      category: "Development & IT",
      tag: "Success Stories",
      image: "https://images.unsplash.com/photo-1587612049655-c1030366a74a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGRldmVsb3BtZW50fGVufDB8fDB8fHww"
    },
    {
      id: "biz6",
      title: "How One Contract Through SpreadB Transformed This Founder's Startup",
      category: "Business",
      tag: "Success Stories",
      image: "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fGRldmVsb3BtZW50fGVufDB8fDB8fHww"
    }
  ];

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

   {/* HERO SECTION */}
<section className="pt-24 pb-8" id="top-section">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="mb-2">
      <span className="text-sm text-gray-500">Resources</span>
      <span className="text-sm text-gray-500 mx-2">›</span>
      <span className="text-sm font-medium">Success Stories</span>
    </div>

    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
      Success Stories
    </h1>

    <p className="text-lg text-gray-600 max-w-3xl mb-8">
      See what happens when skilled creators meet innovative brands. Read the
      success stories of independent professionals who've built careers influencing
      on SpreadB. Get inspired by what brands have been able to accomplish with the
      help of expert talent. You could be next.
    </p>

    {/* Category Tabs */}
    <div className="flex flex-wrap gap-2 mb-8">
      {[
        { id: "business", label: "Business", targetId: "business-stories" },
        { id: "talent", label: "Talent", targetId: "talent-stories" },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => {
            const element = document.getElementById(tab.targetId);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              // Reset active states
              setActiveTab(null);
            }
          }}
          className={`px-5 py-2 text-sm font-medium rounded-full border transition ${
            activeTab === tab.id
              ? "bg-purple-700 text-white border-purple-700"
              : "bg-white text-gray-700 border-gray-300 hover:border-purple-300 hover:text-purple-700"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  </div>
</section>

{/* FEATURED SUCCESS STORIES - Horizontal Layout */}
<section className="py-8 border-t border-gray-200">
  <div className="container mx-auto px-4 max-w-7xl">
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-2xl font-bold">Featured Success Stories</h2>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {currentFeaturedPage}-{Math.min(currentFeaturedPage * 2, featuredStories.length)} of {featuredStories.length}
        </span>
        <div className="flex gap-2">
          <button 
            onClick={() => setCurrentFeaturedPage(prev => Math.max(1, prev - 1))}
            disabled={currentFeaturedPage === 1}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
              currentFeaturedPage === 1
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-purple-500 text-purple-600 hover:bg-purple-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            onClick={() => setCurrentFeaturedPage(prev => Math.min(Math.ceil(featuredStories.length / 2), prev + 1))}
            disabled={currentFeaturedPage === Math.ceil(featuredStories.length / 2)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition ${
              currentFeaturedPage === Math.ceil(featuredStories.length / 2)
                ? 'border-gray-300 text-gray-400 cursor-not-allowed'
                : 'border-purple-500 text-purple-600 hover:bg-purple-50'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    {/* Horizontal Rectangle Cards - Show 2 at a time */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {featuredStories
        .slice((currentFeaturedPage - 1) * 2, currentFeaturedPage * 2)
        .map((story) => (
          <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition flex flex-col lg:flex-row">
            {/* Image Section */}
            <div className="lg:w-2/5 relative">
              <img
                src={story.image}
                className="w-full h-48 lg:h-full object-cover"
                alt={story.title}
              />
              <div className="absolute top-3 left-3">
                <span className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full">
                  {story.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="lg:w-3/5 p-5 flex flex-col">
              <h3 className="text-lg font-bold mb-3 line-clamp-2">{story.title}</h3>

              <div className="space-y-3 mb-4">
                {story.results.slice(0, 2).map((result, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    {result.value && (
                      <div className="bg-purple-100 text-purple-700 font-bold text-base px-3 py-1 rounded flex-shrink-0 min-w-[60px] text-center">
                        {result.value}
                      </div>
                    )}
                    <div className="min-w-0">
                      {result.label && (
                        <div className="text-xs text-gray-500 uppercase truncate">{result.label}</div>
                      )}
                      <div className="text-sm text-gray-700 line-clamp-2">{result.description}</div>
                    </div>
                  </div>
                ))}
              </div>

              {story.trustedBy && story.trustedBy.length > 0 && (
                <div className="pt-4 border-t border-gray-100 mt-auto">
                  <div className="text-xs text-gray-500 mb-2">Trusted by</div>
                  <div className="flex flex-wrap gap-2">
                    {story.trustedBy.slice(0, 3).map((brand) => (
                      <div key={brand} className="text-xs font-medium text-gray-700 bg-gray-100 px-2 py-1 rounded">
                        {brand}
                      </div>
                    ))}
                    {story.trustedBy.length > 3 && (
                      <div className="text-xs text-gray-500">+{story.trustedBy.length - 3}</div>
                    )}
                  </div>
                </div>
              )}

              <button className="mt-4 text-purple-700 text-sm font-medium hover:text-purple-800 self-start">
                Read story →
              </button>
            </div>
          </div>
        ))}
    </div>

    {/* Pagination Dots */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: Math.ceil(featuredStories.length / 2) }).map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentFeaturedPage(index + 1)}
          className={`w-2 h-2 rounded-full transition ${
            currentFeaturedPage === index + 1
              ? 'bg-purple-700 w-8'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          aria-label={`Go to page ${index + 1}`}
        />
      ))}
    </div>
  </div>
</section>

      {/* BUSINESS STORIES SECTION */}
    <section id="business-stories" className="py-12 border-t border-gray-200">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Business Stories</h2>
      <a href="#" className="text-purple-700 font-medium hover:underline">
        See all business success stories →
      </a>
    </div>

          <div className="grid md:grid-cols-3 gap-6">
            {businessStories.map((story) => (
              <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <img
                  src={story.image}
                  className="w-full h-40 object-cover"
                  alt={story.title}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {story.category}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs font-medium text-gray-700">{story.tag}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-3">{story.title}</h3>
                  <button className="text-purple-700 text-sm font-medium hover:underline">
                    Read story →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TALENT STORIES SECTION */}
      <section id="talent-stories" className="py-12 border-t border-gray-200">
  <div className="container mx-auto px-4 max-w-6xl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold">Talent Stories</h2>
      <a href="#" className="text-purple-700 font-medium hover:underline">
        See all talent success stories →
      </a>
    </div>
          

          <div className="grid md:grid-cols-4 gap-6">
            {talentStories.map((story) => (
              <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                <img
                  src={story.image}
                  className="w-full h-40 object-cover"
                  alt={story.title}
                />
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">
                      {story.category}
                    </span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs font-medium text-gray-700">{story.tag}</span>
                  </div>
                  <h3 className="font-semibold text-lg mb-3 line-clamp-3">{story.title}</h3>
                  <button className="text-purple-700 text-sm font-medium hover:underline">
                    Read story →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOIN MARKETPLACE CTA */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Join the world's creator marketplace</h2>
          <p className="text-lg text-gray-600 mb-8">
            Find great talent. Find great work. Are you ready to move your business or career forward?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <div className="space-x-4">
  <Link 
    to="/signup?role=Brand%20Owner"
    className="inline-block bg-purple-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-800 transition-colors"
  >
    Get Started as a Brand
  </Link>
  
  <Link 
    to="/signup?role=Influencer"
    className="inline-block bg-white border border-purple-700 text-purple-700 px-8 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors"
  >
    Join as a Creator
  </Link>
</div>
          </div>
        </div>
      </section>

      {/* ALL SUCCESS STORIES GRID */}
      <section className="py-12 border-t border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl font-bold mb-6">All Success Stories</h2>

          {/* Stories Grid - Smaller Cards with Pagination */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {allStories
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((story) => (
                <div key={story.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition">
                  <img
                    src={story.image}
                    className="w-full h-36 object-cover"
                    alt={story.title}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${story.tag?.includes('Success Stories')
                          ? 'bg-purple-100 text-purple-700'
                          : story.tag === 'Business'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}>
                        {story.category}
                      </span>
                      <span className="text-xs text-gray-500">•</span>
                      <span className="text-xs font-medium text-gray-700">{story.tag}</span>
                    </div>
                    <h3 className="font-semibold text-base mb-2 line-clamp-2">{story.title}</h3>
                    <button className="text-purple-700 text-sm font-medium hover:underline mt-2">
                      Read story →
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              Showing {Math.min((currentPage - 1) * itemsPerPage + 1, allStories.length)}-
              {Math.min(currentPage * itemsPerPage, allStories.length)} of {allStories.length} stories
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium ${currentPage === 1
                    ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                    : 'text-purple-700 border-purple-300 hover:bg-purple-50'
                  }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              <div className="flex items-center gap-1">
                {Array.from({ length: Math.ceil(allStories.length / itemsPerPage) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium ${currentPage === index + 1
                        ? 'bg-purple-700 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(Math.ceil(allStories.length / itemsPerPage), prev + 1))}
                disabled={currentPage === Math.ceil(allStories.length / itemsPerPage)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg border text-sm font-medium ${currentPage === Math.ceil(allStories.length / itemsPerPage)
                    ? 'text-gray-400 border-gray-300 cursor-not-allowed'
                    : 'text-purple-700 border-purple-300 hover:bg-purple-50'
                  }`}
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Empty State (if no stories) */}
          {activeCategory === "hiring" && (
            <div className="text-center py-12 border border-gray-200 rounded-lg">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-lg font-medium mb-2">We don't have any content in this category.</h3>
              <p className="text-gray-600 mb-4">Search again or sign up to get started with SpreadB.</p>
              <button className="bg-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-800">
                Sign Up Free
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuccessStories;