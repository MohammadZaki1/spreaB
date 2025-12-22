// BrandOwnerDashboard.jsx
import React, { useState } from 'react';
import Header from "../components/Navbar";
import { Link } from 'react-router-dom';

const BrandOwnerDashboard = () => {
    // Mock data - in real app, this would come from API
    const [dashboardData, setDashboardData] = useState({
        walletBalance: 1250,
        activeCollaborations: 4,
        proposalsReceived: 12,
        completedCampaigns: 8,
        pendingApprovals: 3,
        totalSpent: 4500,
        averageRating: 4.7,
        alerts: [
            { id: 1, type: 'deliverable', message: 'Campaign "Summer Launch" deliverables due in 2 days', date: '2024-03-15' },
            { id: 2, type: 'payment', message: 'Payment for campaign "Holiday Sale" completed', date: '2024-03-14' },
            { id: 3, type: 'proposal', message: 'New proposal received for "Fitness Gear" campaign', date: '2024-03-13' }
        ],
        recentCampaigns: [
            { id: 1, name: 'Summer Launch', status: 'active', influencers: 3, budget: 800, progress: 75 },
            { id: 2, name: 'Product Review', status: 'active', influencers: 2, budget: 500, progress: 45 },
            { id: 3, name: 'Holiday Sale', status: 'completed', influencers: 5, budget: 1200, progress: 100 },
            { id: 4, name: 'New Year Launch', status: 'pending', influencers: 0, budget: 600, progress: 0 }
        ],
        topInfluencers: [
            { id: 1, name: 'Sarah Lifestyle', category: 'Lifestyle', rating: 4.9, completed: 3 },
            { id: 2, name: 'Mike Fitness', category: 'Fitness', rating: 4.8, completed: 2 },
            { id: 3, name: 'Tech Guru', category: 'Technology', rating: 4.7, completed: 1 }
        ]
    });

    // No alert handlers needed for view all buttons - they're now static

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            
            <div className="container mx-auto mt-20 px-4 py-6">
                {/* Top Header with Search and Button */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                    <div>
                       <h1 className="text-3xl font-bold">
                           <span className="text-gray-600">Welcome to </span>
                           <span className="text-purple-600">Your Dashboard!</span>
                       </h1>
                       <p className="text-gray-500 mt-2 font-medium italic">Manage your brand campaigns and track performance with ease</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-4 md:mt-0">
                        {/* Search Bar */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search campaigns, influencers..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-64"
                            />
                            <svg 
                                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        
                      {/* Post Promotion Button as Link */}
                      <Link
                        to="/promotion" 
                        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Post a Promotion
                      </Link>
                    </div>
                </div>

                {/* First Two Sections - Side by Side */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Left Column - Stats Cards */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-2 gap-4">
                            {/* Wallet Balance Card */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start mb-3">
                                    <div className="p-2.5 bg-blue-500 bg-opacity-20 rounded-lg mr-3">
                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-blue-600 font-semibold text-sm mb-1">Wallet Balance</p>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {dashboardData.walletBalance} <span className="text-base">Sticks</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium text-sm">Available for campaigns</p>
                            </div>

                            {/* Active Collaborations Card */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start mb-3">
                                    <div className="p-2.5 bg-green-500 bg-opacity-20 rounded-lg mr-3">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-green-600 font-semibold text-sm mb-1">Active Collaborations</p>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {dashboardData.activeCollaborations}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium text-sm">Ongoing partnerships</p>
                            </div>

                            {/* Proposals Received Card */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start mb-3">
                                    <div className="p-2.5 bg-purple-500 bg-opacity-20 rounded-lg mr-3">
                                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-purple-600 font-semibold text-sm mb-1">Proposals Received</p>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {dashboardData.proposalsReceived}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium text-sm">Pending review</p>
                            </div>

                            {/* Pending Approvals Card */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start mb-3">
                                    <div className="p-2.5 bg-orange-500 bg-opacity-20 rounded-lg mr-3">
                                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-orange-600 font-semibold text-sm mb-1">Pending Approvals</p>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {dashboardData.pendingApprovals}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-700 font-medium text-sm">Awaiting action</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Quick Actions */}
                    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            {/* Post Promotion - Already a Link above */}
                            <Link
                                to="/promotion"
                                className="w-full flex items-center p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all duration-200 group"
                            >
                                <div className="p-2.5 bg-blue-500 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <span className="text-gray-800 font-bold block">Post Promotion</span>
                                    <span className="text-gray-600 text-sm">Create new campaign</span>
                                </div>
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            <Link
                                to="/proposals"
                                className="w-full flex items-center p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-all duration-200 group"
                            >
                                <div className="p-2.5 bg-purple-500 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <span className="text-gray-800 font-bold block">Review Proposals</span>
                                    <span className="text-gray-600 text-sm">{dashboardData.proposalsReceived} pending review</span>
                                </div>
                                <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>

                            <Link
                                to="/buy-sticks"
                                className="w-full flex items-center p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-all duration-200 group"
                            >
                                <div className="p-2.5 bg-green-500 rounded-lg mr-3">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="text-left flex-1">
                                    <span className="text-gray-800 font-bold block">Buy Sticks</span>
                                    <span className="text-gray-600 text-sm">Add funds to your wallet</span>
                                </div>
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Campaigns Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-purple-800">Recent Campaigns</h2>
                        <Link 
                            to="/campaigns"
                            className="text-purple-600 hover:text-purple-800 font-medium flex items-center"
                        >
                            View All
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {dashboardData.recentCampaigns.map((campaign) => (
                            <div key={campaign.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-800">{campaign.name}</h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        campaign.status === 'active' ? 'bg-green-100 text-green-600' :
                                        campaign.status === 'completed' ? 'bg-gray-100 text-gray-600' :
                                        'bg-yellow-100 text-yellow-600'
                                    }`}>
                                        {campaign.status}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-600 text-sm mb-3">
                                    <span className="flex items-center mr-4">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {campaign.influencers} influencers
                                    </span>
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {campaign.budget} Sticks
                                    </span>
                                </div>
                                <div className="mb-2">
                                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                                        <span>Progress</span>
                                        <span className="font-medium">{campaign.progress}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full ${
                                                campaign.progress === 100 ? 'bg-green-500' :
                                                campaign.progress > 50 ? 'bg-blue-500' : 'bg-purple-500'
                                            }`}
                                            style={{ width: `${campaign.progress}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two Column Layout for Bottom Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Notifications Section */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Notifications</h2>
                            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                                {dashboardData.alerts.length} new
                            </span>
                        </div>
                        
                        <div className="space-y-3">
                            {dashboardData.alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    className={`p-3 rounded-lg border ${
                                        alert.type === 'deliverable'
                                            ? 'border-orange-200 bg-orange-50'
                                            : alert.type === 'payment'
                                            ? 'border-green-200 bg-green-50'
                                            : 'border-blue-200 bg-blue-50'
                                    }`}
                                >
                                    <div className="flex items-start">
                                        <div className={`mr-3 mt-0.5 p-1.5 rounded ${
                                            alert.type === 'deliverable' ? 'bg-orange-100' :
                                            alert.type === 'payment' ? 'bg-green-100' : 'bg-blue-100'
                                        }`}>
                                            {alert.type === 'deliverable' && (
                                                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {alert.type === 'payment' && (
                                                <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            )}
                                            {alert.type === 'proposal' && (
                                                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-gray-800 font-medium text-sm">{alert.message}</p>
                                            <p className="text-gray-600 text-xs mt-1 font-medium">{alert.date}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link 
                            to="/notifications"
                            className="w-full mt-4 px-3 py-2.5 text-center text-purple-600 font-semibold border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors block"
                        >
                            View All Notifications
                        </Link>
                    </div>

                    {/* Performance Summary Section */}
                    <div className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl shadow-sm p-6 text-white">
                        <h2 className="text-xl font-bold mb-6">Performance Summary</h2>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Average Rating</span>
                                    <span className="font-bold text-xl">{dashboardData.averageRating.toFixed(1)}/5.0</span>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg
                                            key={i}
                                            className={`w-5 h-5 mr-1 ${i < Math.floor(dashboardData.averageRating) ? 'text-yellow-300' : 'text-blue-300'}`}
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Completed Campaigns</span>
                                    <span className="font-bold text-xl">{dashboardData.completedCampaigns}</span>
                                </div>
                                <div className="w-full bg-blue-500 bg-opacity-30 rounded-full h-2">
                                    <div 
                                        className="h-2 bg-green-300 rounded-full"
                                        style={{ width: '85%' }}
                                    ></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-medium">Total Spent</span>
                                    <span className="font-bold text-xl">{dashboardData.totalSpent} Sticks</span>
                                </div>
                                <div className="text-blue-200 text-sm font-medium">
                                    Across all campaigns
                                </div>
                            </div>
                        </div>
                        <Link 
                            to="/analytics"
                            className="w-full mt-6 py-2.5 text-center bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors block"
                        >
                            View Detailed Analytics
                        </Link>
                    </div>
                </div>

                {/* Quick Links Section */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Links</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <Link to="/templates" className="flex flex-col items-center p-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-gray-200">
                            <div className="p-2.5 bg-blue-100 rounded-lg mb-2">
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </div>
                            <span className="font-medium text-sm">Campaign Templates</span>
                        </Link>
                        
                        <Link to="/influencers" className="flex flex-col items-center p-4 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors border border-gray-200">
                            <div className="p-2.5 bg-purple-100 rounded-lg mb-2">
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-sm">Influencer Directory</span>
                        </Link>
                        
                        <Link to="/billing" className="flex flex-col items-center p-4 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-lg transition-colors border border-gray-200">
                            <div className="p-2.5 bg-green-100 rounded-lg mb-2">
                                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-sm">Billing & Payments</span>
                        </Link>
                        
                        <Link to="/support" className="flex flex-col items-center p-4 text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg transition-colors border border-gray-200">
                            <div className="p-2.5 bg-orange-100 rounded-lg mb-2">
                                <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <span className="font-medium text-sm">Help & Support</span>
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="text-center text-gray-600 text-sm">
                        <p className="mt-1 text-blue-600 font-medium">
                            Need help? Contact support@spreadb.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BrandOwnerDashboard;