import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { faqSections, categoryIcons, contactIcons } from "../data/faqData";

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Create category cards from faqSections
  const faqCategories = faqSections.map(section => ({
    id: section.id,
    title: section.title,
    icon: section.icon,
    description: getCategoryDescription(section.id),
    count: section.questions.length
  }));

  function getCategoryDescription(categoryId) {
    const descriptions = {
      "getting-started": "Begin your journey with our platform",
      "account-profile": "Manage your account and profile settings",
      "collaboration": "Learn about posting and applying for promotions",
      "tokens-wallet": "Understand our currency and payment system",
      "payment-security": "Secure payments and dispute resolution",
      "verification-safety": "Verification process and safety guidelines",
      "technical": "Troubleshoot technical issues"
    };
    return descriptions[categoryId] || "Browse helpful articles";
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/help/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/help/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section with Background */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80")',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-purple-700/80"></div>
          </div>

          {/* Subtle Pattern Overlay */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}
          ></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Help & Support Center
            </h1>
            <div className="h-1 w-20 bg-white mx-auto mb-6"></div>
            <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
              We're here to support Influencers, Brand Owners, and Partners throughout your collaboration journey.
              Choose a topic below or contact our support team anytime.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for help topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-6 py-4 pl-12 border-0 rounded-xl 
             focus:ring-2 focus:ring-purple-500 focus:border-transparent 
             bg-white/95 backdrop-blur-sm text-gray-900"
                  // added text-gray-900 (black text)
                  />

                  <div className="absolute left-4 top-4 text-purple-600">
                    {contactIcons.search}
                  </div>
                  <button
                    type="submit"
                    className="absolute right-4 top-4 text-purple-700 hover:text-purple-800"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
                <p className="text-white/80 text-sm mt-3">
                  Search for topics like "verification", "payment", "profile setup", etc.
                </p>
              </form>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">{faqCategories.length}</div>
                <div className="text-sm text-white/80">Help Categories</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">
                  {faqCategories.reduce((total, cat) => total + cat.count, 0)}
                </div>
                <div className="text-sm text-white/80">FAQ Articles</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-white/80">Support Available</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-white/80">Resolution Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Category Navigation */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Browse Help Topics</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Select a category to find detailed guides and answers to common questions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className="p-6 rounded-xl text-left transition-all duration-200 group bg-white text-gray-900 border border-gray-200 hover:border-purple-300 hover:shadow-lg hover:transform hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-purple-100 text-purple-600">
                    {category.icon}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-purple-700">{category.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                  <p className="text-sm text-purple-600 font-medium">
                    {category.count} articles
                  </p>
                  <div className="mt-4 flex items-center text-sm text-purple-600">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    View category
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Contact Our Support Team
              </h2>
              <p className="text-gray-700">
                Our dedicated support team is here to help you with any issues or questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Email Support */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {contactIcons.email}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Get detailed help via email</p>
                <a href="mailto:support@spreadb.com" className="text-purple-700 font-semibold hover:text-purple-800 block">
                  support@spreadb.com
                </a>
                <p className="text-sm text-gray-500 mt-2">Response time: 24 hours</p>
              </div>

              {/* Phone Support */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {contactIcons.phone}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Call us for immediate assistance</p>
                <a href="tel:+911234567890" className="text-purple-700 font-semibold hover:text-purple-800 block">
                  +91 12345 67890
                </a>
                <p className="text-sm text-gray-500 mt-2">Mon-Sat, 10 AM - 7 PM IST</p>
              </div>

              {/* Live Chat */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                  {contactIcons.chat}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Chat with our support team</p>
                <button className="bg-purple-700 text-white hover:bg-purple-800 px-6 py-3 rounded-lg font-medium transition-colors w-full">
                  Start Live Chat
                </button>
                <p className="text-sm text-gray-500 mt-2">10 AM - 8 PM IST, Mon-Sat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">
              Quick Help Links
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <a href="/privacy-policy" className="text-gray-700 hover:text-purple-700 hover:bg-purple-50 p-4 rounded-lg transition-colors group">
                <div className="font-medium mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Privacy Policy
                </div>
                <div className="text-sm text-gray-500">How we protect your data</div>
              </a>
              <a href="/terms" className="text-gray-700 hover:text-purple-700 hover:bg-purple-50 p-4 rounded-lg transition-colors group">
                <div className="font-medium mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Terms of Service
                </div>
                <div className="text-sm text-gray-500">Platform rules and guidelines</div>
              </a>
              <a href="/safety" className="text-gray-700 hover:text-purple-700 hover:bg-purple-50 p-4 rounded-lg transition-colors group">
                <div className="font-medium mb-1 flex items-center">
                  <svg className="w-4 h-4 mr-2 text-gray-400 group-hover:text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Safety Guidelines
                </div>
                <div className="text-sm text-gray-500">Stay safe while collaborating</div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HelpSupport;