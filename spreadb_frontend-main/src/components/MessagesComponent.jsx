import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from './Navbar';
import useNotifications from '../hooks/useNotifications';

const MessagesComponent = ({ userRole }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [availableUsers, setAvailableUsers] = useState([]);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { refreshCounts, decrementCount } = useNotifications();

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch conversations on component mount
  useEffect(() => {
    fetchConversations();
    fetchAvailableUsers();
  }, []);

  const fetchConversations = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found');
        setIsLoading(false);
        return;
      }
      
      console.log('Fetching conversations from:', `${API_BASE_URL}/messages/conversations`);
      const response = await axios.get(`${API_BASE_URL}/messages/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setConversations(response.data.conversations);
        console.log('Conversations loaded:', response.data.conversations.length);
        if (response.data.conversations.length > 0) {
          setSelectedConversation(response.data.conversations[0]);
          fetchMessages(response.data.conversations[0]._id);
        }
      } else {
        console.error('Failed to fetch conversations:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMessages = async (conversationId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${API_BASE_URL}/messages/conversations/${conversationId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setMessages(response.data.messages);
        // Mark conversation as read
        markConversationAsRead(conversationId);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      // Try the new profiles endpoint first
      let response;
      try {
        response = await axios.get(`${API_BASE_URL}/messages/profiles`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (profileError) {
        console.log('Profiles endpoint failed, trying users endpoint:', profileError.message);
        // Fallback to users endpoint
        response = await axios.get(`${API_BASE_URL}/messages/users`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      
      if (response.data.success) {
        setAvailableUsers(response.data.users);
        console.log('Available users loaded:', response.data.users.length);
      } else {
        console.error('Failed to fetch users:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching available users:', error);
      
      // Try debug endpoint to see what's in the database
      try {
        const token = localStorage.getItem('authToken');
        const debugResponse = await axios.get(`${API_BASE_URL}/messages/debug`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Debug info:', debugResponse.data);
      } catch (debugError) {
        console.error('Debug endpoint also failed:', debugError);
      }
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if ((!messageInput.trim() && !selectedFile) || !selectedConversation) return;

    try {
      const token = localStorage.getItem('authToken');
      const currentUserId = getCurrentUserId();
      const receiverId = getOtherParticipantId(selectedConversation);
      
      console.log('=== Send Message Debug ===');
      console.log('Current User ID:', currentUserId);
      console.log('Receiver ID:', receiverId);
      console.log('Message content:', messageInput);
      console.log('Selected conversation:', selectedConversation);
      console.log('Auth token present:', !!token);
      console.log('Auth token (first 50 chars):', token?.substring(0, 50) + '...');
      
      if (!token) {
        alert('No authentication token found. Please login again.');
        return;
      }
      
      if (!currentUserId) {
        alert('Cannot identify current user. Please login again.');
        return;
      }
      
      if (!receiverId) {
        console.error('Cannot find receiver ID from conversation:', selectedConversation);
        alert('Cannot find receiver ID. Please try selecting the conversation again.');
        return;
      }
      
      // Validate receiverId is a valid MongoDB ObjectId format
      if (!/^[0-9a-fA-F]{24}$/.test(receiverId)) {
        console.error('Invalid receiverId format:', receiverId);
        alert('Invalid receiver ID format. Please try again.');
        return;
      }
      
      const formData = new FormData();
      
      if (selectedFile) {
        formData.append('file', selectedFile);
        formData.append('messageType', selectedFile.type.startsWith('image/') ? 'image' : 'file');
        formData.append('receiverId', receiverId);
      } else {
        formData.append('content', messageInput);
        formData.append('messageType', 'text');
        formData.append('receiverId', receiverId);
      }

      // Log FormData contents
      console.log('FormData contents:');
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      console.log('Sending POST request to:', `${API_BASE_URL}/messages/send`);
      
      const response = await axios.post(`${API_BASE_URL}/messages/send`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Send message response:', response.data);

      if (response.data.success) {
        setMessages(prev => [...prev, response.data.message]);
        setMessageInput('');
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        
        // Update conversation list and refresh notification counts
        fetchConversations();
        refreshCounts();
      }
    } catch (error) {
      console.error('=== Send Message Error ===');
      console.error('Error sending message:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
        console.error('Response headers:', error.response.headers);
        alert(`Failed to send message: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('Request error:', error.request);
        alert('Network error. Please check your connection and try again.');
      } else {
        console.error('General error:', error.message);
        alert('Failed to send message. Please try again.');
      }
    }
  };

  const startNewConversation = async (userId) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${API_BASE_URL}/messages/send`, {
        receiverId: userId,
        content: 'Hello! I would like to connect with you.',
        messageType: 'text'
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setShowNewChatModal(false);
        fetchConversations();
        // Select the new conversation
        setTimeout(() => {
          const newConversation = conversations.find(conv => 
            conv.participants.some(p => p.userId._id === userId)
          );
          if (newConversation) {
            setSelectedConversation(newConversation);
            fetchMessages(newConversation._id);
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error starting conversation:', error);
      alert('Failed to start conversation. Please try again.');
    }
  };

  const markConversationAsRead = async (conversationId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${API_BASE_URL}/messages/conversations/${conversationId}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Refresh notification counts after marking as read
      refreshCounts();
    } catch (error) {
      console.error('Error marking conversation as read:', error);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
    }
  };

  // Helper function to get current user ID from JWT token
  const getCurrentUserId = () => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found in localStorage');
        return null;
      }
      
      // Decode JWT token to get user ID
      const payload = JSON.parse(atob(token.split('.')[1]));
      console.log('JWT payload:', payload);
      
      const userId = payload.id || payload._id || payload.userId || payload.user_id;
      console.log('Extracted user ID from token:', userId);
      
      if (!userId) {
        console.error('No user ID found in JWT payload');
        // Fallback to localStorage keys
        const fallbackId = localStorage.getItem('UserId') || 
                          localStorage.getItem('userId') || 
                          localStorage.getItem('user_id') ||
                          localStorage.getItem('id');
        console.log('Fallback user ID from localStorage:', fallbackId);
        return fallbackId;
      }
      
      return userId;
    } catch (error) {
      console.error('Error decoding token:', error);
      // Fallback to localStorage keys
      const fallbackId = localStorage.getItem('UserId') || 
                        localStorage.getItem('userId') || 
                        localStorage.getItem('user_id') ||
                        localStorage.getItem('id');
      console.log('Fallback user ID from localStorage after error:', fallbackId);
      return fallbackId;
    }
  };

  const getOtherParticipantId = (conversation) => {
    const currentUserId = getCurrentUserId();
    console.log('=== getOtherParticipantId Debug ===');
    console.log('Current User ID:', currentUserId);
    console.log('Conversation:', conversation);
    console.log('Conversation participants:', conversation.participants);
    
    if (!currentUserId) {
      console.error('No current user ID available');
      return null;
    }
    
    // Handle different conversation structures
    if (conversation.participants && conversation.participants.length > 0) {
      console.log('Processing participants...');
      
      for (let i = 0; i < conversation.participants.length; i++) {
        const participant = conversation.participants[i];
        console.log(`Participant ${i}:`, participant);
        
        // Try different ways to get participant ID
        const participantId = participant.userId?._id || 
                             participant.userId || 
                             participant._id ||
                             participant.id;
        
        console.log(`Participant ${i} ID:`, participantId);
        console.log(`Is different from current user? ${participantId?.toString() !== currentUserId?.toString()}`);
        
        if (participantId && participantId.toString() !== currentUserId.toString()) {
          console.log('Found other participant ID:', participantId);
          return participantId;
        }
      }
    }
    
    console.error('No other participant found in conversation');
    return null;
  };

  const getOtherParticipantInfo = (conversation) => {
    if (!conversation.otherParticipant) return null;
    
    const participant = conversation.otherParticipant;
    const profile = participant.profile;
    
    if (participant.role === "Brand Owner") {
      return {
        name: profile?.brandName || 'Brand Owner',
        avatar: profile?.brandLogo || null,
        subtitle: profile?.industry || 'Brand',
        role: 'Brand Owner'
      };
    } else {
      return {
        name: profile?.name || `${participant.userId.firstName} ${participant.userId.lastName}`,
        avatar: profile?.photo || null,
        subtitle: profile?.categories?.join(', ') || 'Influencer',
        role: 'Influencer'
      };
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return date.toLocaleDateString();
  };

  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = getOtherParticipantInfo(conv);
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredAvailableUsers = availableUsers.filter(user =>
    user.profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(147, 51, 234, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #ec4899);
          border-radius: 10px;
          transition: background 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #9333ea rgba(147, 51, 234, 0.1);
          scroll-behavior: smooth;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #f472b6);
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      {/* Navbar */}
      <Header />
      
      {/* Compact Messages Header */}
      <div className="pt-20"> {/* Add padding-top to account for fixed navbar */}
        <header className="bg-white/80 backdrop-blur-lg shadow-sm border-b border-purple-200/50">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Messages
                </h1>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={`Search...`}
                    className="pl-9 pr-3 py-2 border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 w-48 bg-white/70 backdrop-blur-sm placeholder-purple-400 text-purple-900 text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <svg className="w-4 h-4 text-purple-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                <button
                  onClick={() => setShowNewChatModal(true)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 flex items-center space-x-2 shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>New Chat</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-180px)]"> {/* Increased height for more message space */}
          {/* Left Panel - Conversations */}
          <div className="lg:w-1/3">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-200/50 overflow-hidden h-full flex flex-col">
              <div className="p-4 border-b border-purple-200/50 bg-gradient-to-r from-purple-600/10 to-pink-600/10 flex-shrink-0">
                <h2 className="text-lg font-bold text-purple-900">Conversations</h2>
                <p className="text-xs text-purple-600/70">{filteredConversations.length} chats</p>
              </div>
              
              <div className="divide-y divide-purple-100/50 overflow-y-auto flex-1 custom-scrollbar relative">
                {isLoading ? (
                  // Loading skeleton
                  [...Array(3)].map((_, i) => (
                    <div key={i} className="p-3 animate-pulse">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-purple-200 rounded-lg w-3/4 mb-2"></div>
                          <div className="h-2 bg-purple-100 rounded-lg w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  filteredConversations.map((conversation) => {
                    const otherParticipant = getOtherParticipantInfo(conversation);
                    if (!otherParticipant) return null;
                    
                    return (
                      <div
                        key={conversation._id}
                        className={`p-3 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 cursor-pointer transition-all duration-200 ${
                          selectedConversation?._id === conversation._id 
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-l-4 border-purple-500 shadow-md' 
                            : ''
                        }`}
                        onClick={() => {
                          setSelectedConversation(conversation);
                          fetchMessages(conversation._id);
                        }}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                              {otherParticipant.avatar ? (
                                <img 
                                  src={otherParticipant.avatar} 
                                  alt={otherParticipant.name}
                                  className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                />
                              ) : (
                                <span className="font-bold text-white text-lg">
                                  {otherParticipant.name.charAt(0).toUpperCase()}
                                </span>
                              )}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start mb-1">
                              <div>
                                <h3 className="text-sm font-bold text-purple-900 truncate">
                                  {otherParticipant.name}
                                </h3>
                                <p className="text-xs text-purple-600/70">{otherParticipant.subtitle}</p>
                              </div>
                              <span className="text-xs text-purple-500 font-medium">
                                {formatDate(conversation.lastMessageAt)}
                              </span>
                            </div>
                            
                            {conversation.lastMessage && (
                              <p className="text-xs text-purple-700/80 truncate mb-2 bg-white/50 rounded px-2 py-1">
                                {conversation.lastMessage.content || '📎 File attachment'}
                              </p>
                            )}
                            
                            <div className="flex justify-between items-center">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-semibold shadow-sm ${
                                otherParticipant.role === 'Brand Owner'
                                  ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                                  : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              }`}>
                                {otherParticipant.role}
                              </span>
                              
                              {conversation.metadata?.unreadCount?.[userRole === 'Brand Owner' ? 'brand' : 'influencer'] > 0 && (
                                <span className="w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg animate-pulse">
                                  {conversation.metadata.unreadCount[userRole === 'Brand Owner' ? 'brand' : 'influencer']}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                
                {!isLoading && filteredConversations.length === 0 && (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-purple-900 mb-2">No conversations yet</h4>
                    <p className="text-purple-600/70 text-sm mb-4 max-w-xs mx-auto">
                      Start connecting with {userRole === 'Influencer' ? 'brands' : 'influencers'}
                    </p>
                    <button
                      onClick={() => setShowNewChatModal(true)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 shadow-md hover:shadow-lg transition-all duration-200 text-sm"
                    >
                      Start New Chat
                    </button>
                  </div>
                )}
                
                {/* Scroll Indicator - Shows when there are many conversations */}
                {!isLoading && filteredConversations.length > 5 && (
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white/90 to-transparent pointer-events-none flex items-end justify-center pb-2">
                    <div className="text-xs text-purple-500 bg-white/80 px-2 py-1 rounded-full shadow-sm animate-bounce">
                      ↓ Scroll for more
                    </div>
                  </div>
                )}
                
                {/* Scroll to Top Button - Shows when scrolled down */}
                {!isLoading && filteredConversations.length > 8 && (
                  <button
                    onClick={() => {
                      const scrollContainer = document.querySelector('.custom-scrollbar');
                      if (scrollContainer) {
                        scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center opacity-70 hover:opacity-100 z-10"
                    title="Scroll to top"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Window */}
          <div className="lg:w-2/3">
            {selectedConversation ? (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-purple-200/50 h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b border-purple-200/50 bg-gradient-to-r from-purple-600/10 to-pink-600/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {(() => {
                        const otherParticipant = getOtherParticipantInfo(selectedConversation);
                        return (
                          <>
                            <div className="relative">
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                                {otherParticipant?.avatar ? (
                                  <img 
                                    src={otherParticipant.avatar} 
                                    alt={otherParticipant.name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white"
                                  />
                                ) : (
                                  <span className="font-bold text-white text-lg">
                                    {otherParticipant?.name.charAt(0).toUpperCase()}
                                  </span>
                                )}
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
                            </div>
                            <div>
                              <h2 className="text-lg font-bold text-purple-900">{otherParticipant?.name}</h2>
                              <p className="text-sm text-purple-600/70">{otherParticipant?.subtitle}</p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-md ${
                        getOtherParticipantInfo(selectedConversation)?.role === 'Brand Owner'
                          ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      }`}>
                        {getOtherParticipantInfo(selectedConversation)?.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-purple-50/30 to-pink-50/30 custom-scrollbar">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                      <p className="text-gray-500">Start the conversation by sending a message</p>
                    </div>
                  ) : (
                    <>
                      {messages.map((message) => {
                        const isMyMessage = message.senderId._id === getCurrentUserId();
                        
                        return (
                          <div
                            key={message._id}
                            className={`mb-4 flex ${isMyMessage ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                              isMyMessage
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-none'
                                : 'bg-gray-100 text-gray-900 rounded-bl-none'
                            }`}>
                              {message.messageType === 'text' ? (
                                <p className="whitespace-pre-wrap">{message.content}</p>
                              ) : message.messageType === 'image' ? (
                                <div>
                                  <img 
                                    src={`${API_BASE_URL}${message.fileUrl}`}
                                    alt="Shared image"
                                    className="max-w-full h-auto rounded-lg mb-2"
                                  />
                                  {message.fileName && (
                                    <p className="text-sm opacity-75">{message.fileName}</p>
                                  )}
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                  </svg>
                                  <div>
                                    <p className="font-medium">{message.fileName}</p>
                                    <a 
                                      href={`${API_BASE_URL}${message.fileUrl}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-sm underline opacity-75 hover:opacity-100"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </div>
                              )}
                              
                              <div className={`text-xs mt-2 ${isMyMessage ? 'text-purple-100' : 'text-gray-500'}`}>
                                {formatTime(message.createdAt)}
                                {isMyMessage && (
                                  <span className="ml-2">
                                    {message.isRead ? '✓✓' : '✓'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </>
                  )}
                </div>

                {/* Message Input */}
                <div className="border-t border-gray-200 p-4">
                  {selectedFile && (
                    <div className="mb-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg flex items-center justify-between border border-purple-200">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                        <span className="text-sm text-purple-800 font-medium">{selectedFile.name}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  <form onSubmit={sendMessage} className="flex items-end space-x-3">
                    <div className="flex-1 bg-gray-100 rounded-lg">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage(e);
                          }
                        }}
                        placeholder="Type your message here..."
                        className="w-full bg-transparent border-0 focus:ring-0 resize-none py-3 px-4 text-gray-900 placeholder-gray-500"
                        rows={2}
                        disabled={!!selectedFile}
                      />
                    </div>
                    
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx,.txt,.zip"
                    />
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                      </svg>
                    </button>
                    
                    <button
                      type="submit"
                      disabled={!messageInput.trim() && !selectedFile}
                      className={`px-6 py-3 rounded-lg font-medium ${
                        (!messageInput.trim() && !selectedFile)
                          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200'
                      }`}
                    >
                      Send
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-12 text-center h-full flex flex-col justify-center">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                <p className="text-gray-500">Choose a conversation to start messaging</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  Start New Conversation
                </h3>
                <button
                  onClick={() => setShowNewChatModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <input
                  type="text"
                  placeholder={`Search ${userRole === 'Influencer' ? 'brands' : 'influencers'}...`}
                  className="w-full px-3 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white/70 placeholder-purple-400 text-purple-900"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {filteredAvailableUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">
                      No {userRole === 'Influencer' ? 'brands' : 'influencers'} found
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredAvailableUsers.map((user) => (
                      <div
                        key={user.userId}
                        className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                        onClick={() => startNewConversation(user.userId)}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            {user.profile.logo || user.profile.photo ? (
                              <img 
                                src={user.profile.logo || user.profile.photo} 
                                alt={user.profile.name}
                                className="w-10 h-10 rounded-full object-cover"
                              />
                            ) : (
                              <span className="font-semibold text-white">
                                {user.profile.name.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900">
                              {user.profile.name}
                            </h4>
                            <p className="text-xs text-gray-500">
                              {user.profile.industry || user.profile.categories?.join(', ') || user.role}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default MessagesComponent;