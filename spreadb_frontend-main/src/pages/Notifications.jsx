// src/pages/brand/Notifications.jsx
import React, { useState } from 'react';
import Header from "../components/Navbar";


const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'new_proposal',
      title: 'New Campaign Proposal',
      user: 'Alex Johnson',
      userRole: 'Travel Influencer',
      userImage: 'AJ',
      action: 'submitted a proposal for',
      target: 'Summer Collection 2024 Campaign',
      time: '1h ago',
      read: false,
      color: '#b033ea'
    },
    {
      id: 2,
      type: 'influencer_submission',
      title: 'Content Submitted for Review',
      user: 'Sarah Miller',
      userRole: 'Fashion Content Creator',
      userImage: 'SM',
      action: 'submitted content for',
      target: 'Back to School Campaign',
      time: '2h ago',
      read: false,
      color: '#3b82f6'
    },
    {
      id: 3,
      type: 'approval_deadline',
      title: 'Deadline Approaching',
      user: 'System Alert',
      userRole: '',
      userImage: '⚡',
      action: 'approval needed for',
      target: 'Winter Launch Campaign',
      time: '5h ago',
      read: true,
      color: '#f59e0b'
    },
    {
      id: 4,
      type: 'payment_confirmation',
      title: 'Payment Processed',
      user: 'Finance Team',
      userRole: 'SpreadB Payments',
      userImage: '💰',
      action: 'confirmed payment to',
      target: '@TravelGuru - Campaign: Bali Travels',
      time: '1d ago',
      read: true,
      color: '#10b981'
    },
    {
      id: 5,
      type: 'system_alert',
      title: 'Platform Update',
      user: 'SpreadB Team',
      userRole: 'System Notification',
      userImage: '🔔',
      action: 'announced',
      target: 'Scheduled maintenance on Saturday',
      time: '2d ago',
      read: true,
      color: '#6b7280'
    },
    {
      id: 6,
      type: 'new_proposal',
      title: 'New Collaboration Request',
      user: 'Mike Chen',
      userRole: 'Tech Reviewer',
      userImage: 'MC',
      action: 'wants to collaborate on',
      target: 'Festive Season Campaign',
      time: '3d ago',
      read: true,
      color: '#b033ea'
    }
  ]);

  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      name: 'Mahima Saraswat',
      title: 'Building Gokwik | Delhivery | Cars24',
      followers: '80k+ followers',
      follow: true
    },
    {
      id: 2,
      name: 'Dr. Prasada Rao Bondada',
      title: 'Healthcare Influencer',
      followers: '45k+ followers',
      follow: false
    },
    {
      id: 3,
      name: 'Travel With Meena',
      title: 'Travel Content Creator',
      followers: '120k+ followers',
      follow: false
    },
    {
      id: 4,
      name: 'Tech Guru Raj',
      title: 'Technology Reviewer',
      followers: '65k+ followers',
      follow: false
    }
  ]);

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'new_proposal', label: 'New Proposals' },
    { id: 'influencer_submission', label: 'Content Submissions' },
    { id: 'approval_deadline', label: 'Deadlines' },
    { id: 'payment_confirmation', label: 'Payments' },
   
  ];

  const filteredNotifications = activeTab === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleFollow = (id) => {
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, follow: !s.follow } : s
    ));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="flex"> 
        <main className="flex-1 p-4 md:p-6">
          {/* Page Header */}
          <div className="mb-6">
          <h1 className="text-2xl md:text-3xl mt-24 font-bold text-purple-600">
  🔔 Notifications
</h1>
           <p className="text-gray-600 mt-1 font-medium">
  New proposals • Influencer submissions • Approval deadlines • Payment confirmations 

</p>
          </div>

          <div className="flex flex-col">
            {/* Tabs */}
            <div className="bg-white rounded-lg border border-gray-200 mb-4">
              <div className="flex overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                    }`}
                    style={activeTab === tab.id ? { borderColor: '#b033ea', color: '#b033ea' } : {}}
                  >
                    {tab.label}
                    {tab.id === 'all' && unreadCount > 0 && (
                      <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-100 text-purple-800">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="space-y-3 mb-8">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <div className="text-gray-300 text-5xl mb-4">📭</div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">No notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                filteredNotifications.map((notification) => (
                  <div 
                    key={notification.id}
                    className={`bg-white rounded-lg border border-gray-200 p-4 hover:shadow-sm transition-shadow ${
                      !notification.read ? 'border-l-4' : ''
                    }`}
                    style={!notification.read ? { borderLeftColor: notification.color } : {}}
                  >
                    <div className="flex">
                      {/* Avatar */}
                      <div className="mr-3">
                        <div 
                          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-lg"
                          style={{ backgroundColor: notification.color }}
                        >
                          {notification.userImage}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {notification.title}
                            </h3>
                            <p className="text-gray-800 mt-1">
                              <span className="font-medium">{notification.user}</span>
                              {notification.userRole && (
                                <span className="text-gray-600"> • {notification.userRole}</span>
                              )}
                            </p>
                            <p className="text-gray-700 mt-1">
                              {notification.action}{' '}
                              <span className="font-medium">{notification.target}</span>
                            </p>
                          </div>
                          <span className="text-sm text-gray-500 whitespace-nowrap">
                            {notification.time}
                          </span>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 mt-3">
                          {!notification.read ? (
                            <>
                              {notification.type === 'new_proposal' && (
                                <button 
                                  className="px-4 py-2 rounded-full font-medium text-white hover:opacity-90 transition-opacity"
                                  style={{ backgroundColor: '#b033ea' }}
                                >
                                  Review Proposal
                                </button>
                              )}
                              {notification.type === 'influencer_submission' && (
                                <button 
                                  className="px-4 py-2 rounded-full font-medium text-white hover:opacity-90 transition-opacity"
                                  style={{ backgroundColor: '#3b82f6' }}
                                >
                                  View Content
                                </button>
                              )}
                              {notification.type === 'approval_deadline' && (
                                <button 
                                  className="px-4 py-2 rounded-full font-medium text-white hover:opacity-90 transition-opacity"
                                  style={{ backgroundColor: '#f59e0b' }}
                                >
                                  Approve Now
                                </button>
                              )}
                              <button 
                                onClick={() => markAsRead(notification.id)}
                                className="px-4 py-2 rounded-full font-medium border border-gray-300 hover:bg-gray-50 transition-colors"
                              >
                                Mark as read
                              </button>
                            </>
                          ) : (
                            <button 
                              className="px-4 py-2 rounded-full font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              View details
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* People Suggestions Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">People you may know</h3>
                <button className="text-sm font-medium hover:underline" style={{ color: '#b033ea' }}>
                  See all
                </button>
              </div>
              
              <div className="space-y-4">
                {suggestions.map((person) => (
                  <div key={person.id} className="flex items-start justify-between">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-semibold mr-3">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{person.name}</h4>
                        <p className="text-sm text-gray-600">{person.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{person.followers}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleFollow(person.id)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        person.follow
                          ? 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                          : 'text-white hover:opacity-90'
                      }`}
                      style={!person.follow ? { backgroundColor: '#b033ea' } : {}}
                    >
                      {person.follow ? 'Following' : 'Follow'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg mr-3 bg-blue-100">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Security Alert</h3>
                    <p className="text-sm text-gray-500">New device detected</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Your account was accessed from a new device in New York. Review your security settings.
                </p>
                <button className="mt-4 text-sm font-medium hover:underline" style={{ color: '#b033ea' }}>
                  Review now →
                </button>
              </div>

              <div className="bg-white rounded-lg border border-gray-200 p-5">
                <div className="flex items-center mb-4">
                  <div className="p-2 rounded-lg mr-3 bg-green-100">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Campaign Success</h3>
                    <p className="text-sm text-gray-500">125% target achieved</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">
                  Your "Summer Collection 2024" campaign achieved 125% of its engagement target with 45k+ impressions.
                </p>
                <button className="mt-4 text-sm font-medium hover:underline" style={{ color: '#b033ea' }}>
                  View report →
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};export default Notifications;