import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "../components/Navbar";
import Footer from "../components/Footer";
import { faqSections, contactIcons } from "../data/faqData";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get('q') || '';
    setSearchQuery(query);

    if (query) {
      const results = faqSections.flatMap(section =>
        section.questions.filter(q =>
          q.question.toLowerCase().includes(query.toLowerCase()) ||
          q.answer.toLowerCase().includes(query.toLowerCase())
        ).map(q => ({ ...q, sectionId: section.id, sectionTitle: section.title, sectionIcon: section.icon }))
      );
      setFilteredQuestions(results);
    } else {
      setFilteredQuestions([]);
    }
  }, [location.search]);

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
            <h1 className="text-3xl font-bold text-white mb-6">Search Results</h1>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for help topics..."
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

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <p className="text-gray-600">
                {filteredQuestions.length === 0 
                  ? searchQuery 
                    ? `No results found for "${searchQuery}"`
                    : 'No search query entered'
                  : `Found ${filteredQuestions.length} result${filteredQuestions.length === 1 ? '' : 's'} for "${searchQuery}"`
                }
              </p>
            </div>

            {filteredQuestions.length > 0 ? (
              <div className="space-y-6">
                {filteredQuestions.map((q, index) => (
                  <div key={`${q.sectionId}-${q.id}-${index}`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{q.question}</h3>
                      <Link 
                        to={`/help/category/${q.sectionId}`}
                        className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 flex items-center"
                      >
                        {q.sectionTitle}
                      </Link>
                    </div>
                    <div className="text-gray-700 whitespace-pre-line mb-4">{q.answer}</div>
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium px-3 py-1 rounded ${
                        q.audience === 'influencer' 
                          ? 'bg-pink-100 text-pink-700'
                          : q.audience === 'brand'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}>
                        {q.audience === 'both' ? 'For Everyone' : `For ${q.audience === 'influencer' ? 'Influencers' : 'Brands'}`}
                      </span>
                      <Link 
                        to={`/help/category/${q.sectionId}`}
                        className="text-purple-700 hover:text-purple-800 text-sm font-medium flex items-center"
                      >
                        View full category
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : searchQuery ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-gray-600 mb-2">No results found for "{searchQuery}"</p>
                <p className="text-gray-500 text-sm mb-6">Try a different search term or browse our categories</p>
                <Link 
                  to="/help"
                  className="inline-flex items-center text-purple-700 hover:text-purple-800 font-medium"
                >
                  Browse all categories
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600">Enter a search term to find help articles</p>
              </div>
            )}

            {/* Browse Categories */}
            {searchQuery && filteredQuestions.length > 0 && (
              <div className="mt-12">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Browse All Categories</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {faqSections.slice(0, 3).map((section) => (
                    <Link
                      key={section.id}
                      to={`/help/category/${section.id}`}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3 text-purple-600">
                          {section.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 group-hover:text-purple-700">
                            {section.title}
                          </h3>
                          <p className="text-sm text-gray-600">{section.questions.length} articles</p>
                        </div>
                      </div>
                      <div className="text-sm text-purple-600 flex items-center">
                        View category
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchResults;