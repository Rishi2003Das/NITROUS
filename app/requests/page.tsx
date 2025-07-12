"use client";

import { useState } from 'react';
import { ArrowLeft, Search, Filter, MessageSquare, Check, X, Clock, User, Star, MapPin, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

export default function Requests() {
  const [activeTab, setActiveTab] = useState('received');
  const [searchQuery, setSearchQuery] = useState('');

  const receivedRequests = [
    {
      id: 1,
      user: "Mike Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "Spanish Conversation",
      skillWanted: "Photoshop Basics",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 31,
      message: "Hi Sarah! I'd love to exchange Spanish conversation lessons for Photoshop basics. I'm a native speaker and have been teaching for 3 years. Available weekends!",
      requestDate: "2024-01-15",
      status: "pending"
    },
    {
      id: 2,
      user: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "Piano Lessons",
      skillWanted: "UI/UX Design",
      location: "London, UK",
      rating: 5.0,
      reviewCount: 18,
      message: "Hello! I'm a classical pianist and would love to learn UI/UX design fundamentals. I can offer structured piano lessons in return. Very flexible with timing!",
      requestDate: "2024-01-14",
      status: "pending"
    },
    {
      id: 3,
      user: "David Kim",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "Korean Language",
      skillWanted: "Adobe Illustrator",
      location: "Seoul, South Korea",
      rating: 4.7,
      reviewCount: 42,
      message: "Annyeong! I'm a Korean language teacher and would love to learn Adobe Illustrator. I can help you become conversational in Korean!",
      requestDate: "2024-01-13",
      status: "accepted"
    }
  ];

  const sentRequests = [
    {
      id: 4,
      user: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "Photoshop",
      skillWanted: "Surfing Lessons",
      location: "Sydney, Australia",
      rating: 4.6,
      reviewCount: 35,
      message: "Hey Alex! I saw your surfing skills and would love to learn. I can teach you advanced Photoshop techniques in return. Let me know if you're interested!",
      requestDate: "2024-01-12",
      status: "pending"
    },
    {
      id: 5,
      user: "Lisa Thompson",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "UI/UX Design",
      skillWanted: "Photography",
      location: "Toronto, Canada",
      rating: 4.9,
      reviewCount: 27,
      message: "Hi Lisa! I'd love to learn photography from you. I can help you with UI/UX design principles and tools. Available evenings and weekends!",
      requestDate: "2024-01-10",
      status: "rejected"
    }
  ];

  const handleAcceptRequest = (requestId: number) => {
    console.log('Accepting request:', requestId);
    // Handle accept logic
  };

  const handleRejectRequest = (requestId: number) => {
    console.log('Rejecting request:', requestId);
    // Handle reject logic
  };

  const handleDeleteRequest = (requestId: number) => {
    console.log('Deleting request:', requestId);
    // Handle delete logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'accepted': return 'bg-green-500/20 text-green-300';
      case 'rejected': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const currentRequests = activeTab === 'received' ? receivedRequests : sentRequests;
  const filteredRequests = currentRequests.filter(request =>
    request.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.skillOffered.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.skillWanted.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <Link href="/dashboard" className="text-white hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/browse" className="text-white hover:text-blue-400 transition-colors">
              Browse
            </Link>
            <Link href="/user-details" className="text-white hover:text-blue-400 transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Skill Requests</h1>
          <p className="text-gray-300">Manage your incoming and outgoing skill exchange requests</p>
        </div>

        {/* Tabs */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('received')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'received'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Received ({receivedRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('sent')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'sent'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Sent ({sentRequests.length})
              </button>
            </div>

            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search requests..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No requests found</h3>
              <p className="text-gray-300 mb-6">
                {activeTab === 'received' 
                  ? "You haven't received any skill exchange requests yet."
                  : "You haven't sent any skill exchange requests yet."
                }
              </p>
              <Link href="/browse" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                Browse Skills
              </Link>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* User Info */}
                  <div className="flex items-start space-x-4 lg:min-w-0 lg:flex-1">
                    <img
                      src={request.avatar}
                      alt={request.user}
                      className="w-16 h-16 rounded-full border-2 border-white/20 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-xl font-bold text-white">{request.user}</h3>
                        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          <div className="flex items-center space-x-1 text-yellow-400">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm text-white">{request.rating}</span>
                            <span className="text-sm text-gray-400">({request.reviewCount})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4 mb-3">
                        <div className="flex items-center space-x-1 text-gray-300">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{request.location}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-gray-300">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{request.requestDate}</span>
                        </div>
                      </div>

                      {/* Skills Exchange */}
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-blue-400 font-medium mb-1">
                              {activeTab === 'received' ? 'OFFERS TO TEACH' : 'YOU OFFER'}
                            </p>
                            <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm">
                              {request.skillOffered}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs text-purple-400 font-medium mb-1">
                              {activeTab === 'received' ? 'WANTS TO LEARN' : 'YOU WANT'}
                            </p>
                            <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                              {request.skillWanted}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{request.message}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:min-w-[200px]">
                    {activeTab === 'received' && request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleAcceptRequest(request.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </>
                    )}
                    
                    {activeTab === 'sent' && request.status === 'pending' && (
                      <button
                        onClick={() => handleDeleteRequest(request.id)}
                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel Request
                      </button>
                    )}

                    <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </button>
                    
                    <Link 
                      href={`/user-profile/${request.id}`}
                      className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Link>

                    {request.status === 'accepted' && (
                      <Link 
                        href={`/swap-details/${request.id}`}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Manage Swap
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}