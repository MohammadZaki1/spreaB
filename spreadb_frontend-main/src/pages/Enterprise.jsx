// EnterprisePage.jsx
import React from 'react';
import Header from "../components/Navbar";
import Footer from "../components/Footer";

const EnterprisePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-sm font-medium mb-4">
                Enterprise Solutions
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Spreadb <span className="text-purple-600">Enterprise</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Premium platform connecting brands with influencers at scale. 
                Streamline campaigns, track performance, and maximize ROI with 
                our enterprise-grade influencer marketing solution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 shadow-lg hover:shadow-xl">
                  Request a Demo
                </button>
                <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold py-3 px-8 rounded-lg transition duration-300">
                  Contact Sales
                </button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-64 w-64 rounded-3xl rotate-6 absolute -z-10 top-4 left-4 opacity-20"></div>
                <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-64 w-64 rounded-3xl -rotate-12 absolute -z-10 bottom-4 right-4 opacity-20"></div>
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                  <div className="p-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                    <h3 className="text-xl font-bold">Enterprise Dashboard</h3>
                    <p className="text-purple-100">Campaign Overview</p>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Active Campaigns</p>
                      <p className="text-2xl font-bold text-purple-600">24</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Active Influencers</p>
                      <p className="text-2xl font-bold text-purple-600">1,248</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Engagement Rate</p>
                      <p className="text-2xl font-bold text-purple-600">4.8%</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-500">Total Reach</p>
                      <p className="text-2xl font-bold text-purple-600">18.2M</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">500+</p>
              <p className="text-gray-600 mt-2">Enterprise Brands</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">50K+</p>
              <p className="text-gray-600 mt-2">Verified Influencers</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">120+</p>
              <p className="text-gray-600 mt-2">Countries</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-purple-600">98%</p>
              <p className="text-gray-600 mt-2">Client Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to scale your influencer marketing campaigns
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Campaign Management</h3>
              <p className="text-gray-600">
                Plan, execute, and track multiple influencer campaigns from a single dashboard with real-time analytics and reporting.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Influencer Discovery & Vetting</h3>
              <p className="text-gray-600">
                Access our verified influencer database with advanced filtering, fraud detection, and performance metrics.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Performance Analytics</h3>
              <p className="text-gray-600">
                Measure ROI, engagement rates, and conversion metrics with customizable dashboards and automated reporting.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">API Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect Spreadb with your existing marketing stack, CRM, and analytics platforms.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compliance & Security</h3>
              <p className="text-gray-600">
                Enterprise-grade security, GDPR compliance, and legal contract management for influencer agreements.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Dedicated Account Management</h3>
              <p className="text-gray-600">
                Get personalized support with a dedicated account manager and 24/7 priority customer service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Influencer Marketing?
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-10">
            Join leading brands using Spreadb Enterprise to drive authentic engagement and measurable results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300 shadow-lg">
              Schedule a Demo
            </button>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-lg transition duration-300">
              Download Enterprise Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Leading Brands
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what enterprise customers are saying about Spreadb
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  S
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Sarah Chen</h4>
                  <p className="text-gray-500">Marketing Director, TechGlobal</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Spreadb Enterprise has transformed how we manage influencer campaigns. The ROI tracking alone has justified the investment tenfold."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  M
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Marcus Johnson</h4>
                  <p className="text-gray-500">Head of Digital, FashionForward</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "The influencer vetting tools saved us from several fraudulent accounts. The platform pays for itself in risk mitigation alone."
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">Rebecca Smith</h4>
                  <p className="text-gray-500">CMO, WellnessPlus</p>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Our campaign efficiency improved by 40% after switching to Spreadb. The dedicated account team is exceptional."
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EnterprisePage;