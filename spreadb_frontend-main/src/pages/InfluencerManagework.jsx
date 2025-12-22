import React, { useState } from 'react';
import Header from "../components/Navbar";
import { Calendar, DollarSign, Clock, Star, CheckCircle, XCircle, AlertCircle, Download, Eye, Send } from 'lucide-react';

const ManageWork = () => {
  const [activeSubTab, setActiveSubTab] = useState('pending');

  // Enhanced sample data with influencer-specific details
  const proposalsData = {
    pending: [
      { 
        id: 1, 
        brand: 'Nike Sportswear', 
        campaign: 'Air Max Day Campaign',
        date: '2024-01-15', 
        offer: '$1,200',
        platform: 'Instagram',
        engagement: '2.5M followers',
        duration: '3 days',
        requirements: '3 Reels, 2 Stories'
      },
      { 
        id: 2, 
        brand: 'Apple', 
        campaign: 'iPhone 15 Launch',
        date: '2024-01-14', 
        offer: '$2,500',
        platform: 'YouTube + Instagram',
        engagement: '1.8M followers',
        duration: '1 week',
        requirements: '1 Unboxing Video, 4 Stories'
      },
      { 
        id: 3, 
        brand: 'Sephora', 
        campaign: 'Spring Collection',
        date: '2024-01-16', 
        offer: '$1,800',
        platform: 'Instagram',
        engagement: '3.2M followers',
        duration: '4 days',
        requirements: '2 Reels, 3 Grid Posts'
      },
    ],
    accepted: [
      { 
        id: 4, 
        brand: 'Adidas Originals', 
        campaign: 'Superstar Campaign',
        date: '2024-01-10', 
        offer: '$1,800',
        platform: 'TikTok',
        engagement: '4.1M followers',
        duration: '5 days',
        requirements: '2 TikTok Videos'
      },
    ],
    rejected: [
      { 
        id: 5, 
        brand: 'PepsiCo', 
        campaign: 'Summer Refresh',
        date: '2024-01-05', 
        offer: '$900',
        platform: 'Instagram',
        engagement: '1.2M followers',
        duration: '2 days',
        requirements: '1 Reel, 2 Stories'
      },
    ],
  };

  const activeCollabData = [
    { 
      campaign: 'Zara Summer Collection', 
      brand: 'Zara', 
      deadline: '2024-02-15', 
      status: 'Content Creation',
      progress: 60,
      deliverables: '3 Reels, 2 Grid Posts',
      platform: 'Instagram',
      budget: '$3,500',
      nextMilestone: 'Content Review - Jan 30',
      brandContact: 'Sarah Johnson (sarah@zara.com)'
    },
    { 
      campaign: 'Samsung Galaxy S24 Launch', 
      brand: 'Samsung', 
      deadline: '2024-02-28', 
      status: 'Brand Review',
      progress: 40,
      deliverables: '1 YouTube Video, 3 Stories',
      platform: 'YouTube + Instagram',
      budget: '$5,200',
      nextMilestone: 'Revisions - Feb 5',
      brandContact: 'Mike Chen (mike@samsung.com)'
    },
    { 
      campaign: 'Lululemon Fitness Challenge', 
      brand: 'Lululemon', 
      deadline: '2024-03-10', 
      status: 'Planning Phase',
      progress: 25,
      deliverables: '4 Reels, Live Session',
      platform: 'Instagram',
      budget: '$4,800',
      nextMilestone: 'Content Plan Approval - Jan 25',
      brandContact: 'Jessica Wong (jessica@lululemon.com)'
    },
  ];

  const completedWorkData = [
    { 
      promotion: 'H&M Winter Collection', 
      brand: 'H&M', 
      rating: 4.5, 
      payment: 'Paid',
      earnings: '$2,800',
      date: '2023-12-20',
      platform: 'Instagram',
      engagementRate: '8.2%',
      reach: '4.5M',
      feedback: 'Great content! Engagement exceeded expectations.'
    },
    { 
      promotion: 'Sephora Skincare Review', 
      brand: 'Sephora', 
      rating: 4.8, 
      payment: 'Pending',
      earnings: '$3,200',
      date: '2024-01-05',
      platform: 'YouTube + Instagram',
      engagementRate: '12.5%',
      reach: '6.2M',
      feedback: 'Excellent video quality and authentic review.'
    },
    { 
      promotion: 'Dyson Hair Launch', 
      brand: 'Dyson', 
      rating: 4.9, 
      payment: 'Paid',
      earnings: '$4,500',
      date: '2023-11-15',
      platform: 'Instagram + TikTok',
      engagementRate: '15.3%',
      reach: '8.7M',
      feedback: 'Outstanding performance! Would love to work again.'
    },
  ];

  const tabConfig = {
    pending: {
      label: 'Pending',
      count: 3,
      icon: <AlertCircle className="w-4 h-4" />,
      color: 'yellow',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-300',
      activeBg: 'bg-yellow-100'
    },
    accepted: {
      label: 'Accepted',
      count: 1,
      icon: <CheckCircle className="w-4 h-4" />,
      color: 'green',
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
      borderColor: 'border-green-300',
      activeBg: 'bg-green-100'
    },
    rejected: {
      label: 'Rejected',
      count: 1,
      icon: <XCircle className="w-4 h-4" />,
      color: 'red',
      bgColor: 'bg-red-50',
      textColor: 'text-red-800',
      borderColor: 'border-red-300',
      activeBg: 'bg-red-100'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50">
      <Header />
      
      <main className="max-w-7xl mx-auto mt-28 px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                Manage Work
              </h1>
              <p className="text-gray-600 mt-2 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Track everything after applying and manage your influencer campaigns
              </p>
            </div>
          </div>
        </div>

        {/* Stats Bar - Updated with light colored backgrounds */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Total Proposals</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">12</p>
              </div>
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 font-medium flex items-center">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">↑</span>
              +2 this week
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Active Campaigns</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">5</p>
              </div>
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-blue-600 font-medium">
              $24,500 pending
            </div>
          </div>

          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 shadow-lg border border-yellow-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Avg. Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4.7</p>
              </div>
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600 fill-yellow-400" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600 font-medium flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400 mr-1" />
              Based on 28 reviews
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-medium">Total Earned</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">$42K</p>
              </div>
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 text-sm text-green-600 font-medium flex items-center">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs mr-2">↑</span>
              +15% from last quarter
            </div>
          </div>
        </div>

        {/* Proposals Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="bg-purple-100 text-purple-700 p-2 rounded-lg">📝</span>
                Proposals <span className="text-sm font-normal text-gray-500">(12)</span>
              </h2>
            </div>
          </div>

          {/* Elegant Sub-tabs */}
          <div className="px-8 pt-6">
            <div className="flex space-x-4">
              {Object.entries(tabConfig).map(([key, tab]) => (
                <button
                  key={key}
                  onClick={() => setActiveSubTab(key)}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200
                    ${activeSubTab === key
                      ? `${tab.bgColor} ${tab.textColor} border ${tab.borderColor} shadow-sm`
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                  <span className={`
                    px-2.5 py-1 rounded-full text-xs font-semibold
                    ${activeSubTab === key
                      ? `${tab.activeBg} ${tab.textColor}`
                      : 'bg-gray-100 text-gray-600'
                    }
                  `}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Proposals Content */}
          <div className="p-8">
            <div className="grid grid-cols-1 gap-6">
              {proposalsData[activeSubTab]?.map((item) => (
                <div key={item.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                          <span className="text-xl font-bold text-purple-600">🏷️</span>
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900">{item.brand}</h3>
                          <p className="text-gray-600 text-sm">{item.campaign}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-4">
                      <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                        {item.offer}
                      </span>
                      <span className={`
                        px-4 py-2 rounded-full text-sm font-medium
                        ${activeSubTab === 'pending' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : ''}
                        ${activeSubTab === 'accepted' ? 'bg-green-100 text-green-800 border border-green-300' : ''}
                        ${activeSubTab === 'rejected' ? 'bg-red-100 text-red-800 border border-red-300' : ''}
                      `}>
                        {tabConfig[activeSubTab].label}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border border-gray-100">
                      <p className="text-gray-500 text-xs">Platform</p>
                      <p className="font-medium text-gray-900">{item.platform}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-4 border border-blue-100">
                      <p className="text-gray-500 text-xs">Engagement</p>
                      <p className="font-medium text-blue-700">{item.engagement}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-lg p-4 border border-purple-100">
                      <p className="text-gray-500 text-xs">Duration</p>
                      <p className="font-medium text-purple-700">{item.duration}</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-white rounded-lg p-4 border border-pink-100">
                      <p className="text-gray-500 text-xs">Requirements</p>
                      <p className="font-medium text-pink-700">{item.requirements}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      Received on {item.date}
                    </div>
                    <div className="flex gap-3">
                      {activeSubTab === 'pending' && (
                        <>
                          <button className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:opacity-90 transition shadow-sm">
                            Accept
                          </button>
                          <button className="px-5 py-2 border border-red-500 text-red-600 rounded-lg font-medium hover:bg-red-50">
                            Decline
                          </button>
                        </>
                      )}
                      <button className="px-5 py-2 bg-gradient-to-br from-gray-100 to-white text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center gap-2 border border-gray-200">
                        <Eye className="w-4 h-4" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Collaborations Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg">🔥</span>
              Active Collaborations <span className="text-sm font-normal text-gray-500">(5)</span>
            </h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {activeCollabData.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium bg-blue-100 text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                          {item.platform}
                        </span>
                        <span className="text-sm font-medium bg-purple-100 text-purple-700 px-3 py-1 rounded-full border border-purple-200">
                          {item.budget}
                        </span>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900">{item.campaign}</h3>
                      <p className="text-gray-600 mt-1">{item.brand}</p>
                    </div>
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-4 py-2 rounded-full">
                      {item.status}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-bold text-blue-600">{item.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200">
                      <p className="text-gray-500 text-xs mb-1">Deliverables</p>
                      <p className="font-medium text-gray-900">{item.deliverables}</p>
                    </div>
                    <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-4 border border-purple-200">
                      <p className="text-gray-500 text-xs mb-1">Next Milestone</p>
                      <p className="font-medium text-purple-700">{item.nextMilestone}</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="w-4 h-4 text-amber-600" />
                      <p className="font-bold text-amber-800">Deadline: {item.deadline}</p>
                    </div>
                    <p className="text-amber-700 text-sm">Brand Contact: {item.brandContact}</p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 text-white py-3 px-4 rounded-xl font-semibold transition flex items-center justify-center gap-2 shadow-sm">
                      <Send className="w-4 h-4" />
                      Submit Work
                    </button>
                    <button className="px-6 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-medium transition">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Completed Work Section */}
        <div className="bg-white rounded-2xl shadow-lg mb-8 border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-white">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-2 rounded-lg">✅</span>
              Completed Work <span className="text-sm font-normal text-gray-500">(28)</span>
            </h2>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 gap-6">
              {completedWorkData.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center border border-emerald-200">
                        <CheckCircle className="w-8 h-8 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">{item.promotion}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <span className="text-gray-600">{item.brand}</span>
                          <span className="text-sm font-medium bg-gradient-to-br from-blue-50 to-white text-blue-700 px-3 py-1 rounded-full border border-blue-200">
                            {item.platform}
                          </span>
                          <span className="text-sm font-bold bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                            Earnings: {item.earnings}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center gap-4">
                      <div className="text-center bg-gradient-to-br from-yellow-50 to-amber-50 p-3 rounded-xl border border-yellow-200">
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-yellow-500 fill-yellow-400" />
                          <span className="text-2xl font-bold text-gray-900">{item.rating}</span>
                          <span className="text-gray-400">/5</span>
                        </div>
                        <p className="text-xs text-gray-500">Rating</p>
                      </div>
                      <span className={`
                        px-6 py-3 rounded-full text-sm font-bold
                        ${item.payment === 'Paid' 
                          ? 'bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-800 border border-emerald-300' 
                          : 'bg-gradient-to-br from-orange-100 to-yellow-100 text-orange-800 border border-orange-300'
                        }
                      `}>
                        {item.payment}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-purple-50 to-white rounded-xl p-4 border border-purple-200">
                      <p className="text-gray-500 text-xs mb-1">Engagement Rate</p>
                      <p className="text-2xl font-bold text-purple-700">{item.engagementRate}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-4 border border-blue-200">
                      <p className="text-gray-500 text-xs mb-1">Reach</p>
                      <p className="text-2xl font-bold text-blue-700">{item.reach}</p>
                    </div>
                    <div className="bg-gradient-to-br from-pink-50 to-white rounded-xl p-4 border border-pink-200">
                      <p className="text-gray-500 text-xs mb-1">Completed On</p>
                      <p className="text-lg font-medium text-pink-700">{item.date}</p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-white rounded-xl p-4 border border-emerald-200">
                      <p className="text-gray-500 text-xs mb-1">Performance</p>
                      <p className="text-lg font-medium text-emerald-700">Excellent</p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-2 font-medium">Brand Feedback:</p>
                    <p className="text-gray-700 italic">"{item.feedback}"</p>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-gradient-to-br from-gray-100 to-white text-gray-700 rounded-xl font-medium hover:bg-gray-200 border border-gray-200 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download Report
                      </button>
                    </div>
                    <button className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:opacity-90 shadow-sm">
                      Request Payment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default ManageWork;