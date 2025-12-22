import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { faqSections, contactIcons } from "../data/faqData";

const FAQCategory = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const activeSection = faqSections.find(section => section.id === categoryId);

  if (!activeSection) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Category not found</h1>
            <p className="text-gray-600 mb-8">The requested FAQ category does not exist.</p>
            <Link to="/help" className="text-purple-700 hover:text-purple-800 font-medium">
              ← Back to Help Center
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/help/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-purple-700 to-purple-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/help" className="inline-flex items-center text-white/80 hover:text-white mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Help Center
            </Link>
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 text-white">
                {activeSection.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{activeSection.title}</h1>
                <p className="text-white/80 mt-2">{activeSection.questions.length} articles</p>
              </div>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search within this category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-6 py-3 pl-12 border-0 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <div className="absolute left-4 top-3.5 text-purple-600">
                  {contactIcons.search}
                </div>
                <button
                  type="submit"
                  className="absolute right-4 top-3.5 text-purple-700 hover:text-purple-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="divide-y divide-gray-200">
                {activeSection.questions.map((q) => (
                  <div key={q.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {q.question}
                      </h3>
                      <span className={`text-sm font-medium px-3 py-1 rounded ${q.audience === 'influencer'
                          ? 'bg-pink-100 text-pink-700'
                          : q.audience === 'brand'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                        {q.audience === 'both' ? 'For Everyone' : `For ${q.audience === 'influencer' ? 'Influencers' : 'Brands'}`}
                      </span>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line leading-relaxed bg-gray-50 p-4 rounded-lg">
                      {q.answer}
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <button className="text-purple-700 hover:text-purple-800 font-medium text-sm flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Still have questions? Contact support
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Categories */}
            <div className="mt-12">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Other help categories</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {faqSections
                  .filter(section => section.id !== categoryId)
                  .map((section) => (
                    <Link
                      key={section.id}
                      to={`/help/category/${section.id}`}
                      className="bg-white border border-gray-200 rounded-lg p-3 hover:border-purple-300 hover:shadow-sm transition-all group flex flex-col items-center justify-center"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mb-2 text-purple-600">
                        <div className="scale-75">
                          {section.icon}
                        </div>
                      </div>
                      <h3 className="font-medium text-xs text-gray-900 group-hover:text-purple-700 text-center">
                        {section.title}
                      </h3>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQCategory;