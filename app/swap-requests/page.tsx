"use client";

import { useState } from 'react';
import { ArrowLeft, Search, Filter, Calendar, Clock, MessageSquare, Video, CheckCircle, XCircle, Star, User, MapPin, Zap } from 'lucide-react';
import Link from 'next/link';

export default function SwapRequests() {
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');

  const activeSwaps = [
    {
      id: 1,
      partner: "Mike Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      mySkill: "Photoshop",
      theirSkill: "Spanish Conversation",
      location: "Austin, TX",
      startDate: "2024-01-10",
      nextSession: "Tomorrow, 3:00 PM",
      totalSessions: 8,
      completedSessions: 5,
      progress: 62,
      status: "ongoing",
      lastMessage: "Looking forward to our session tomorrow!",
      rating: 4.8
    },
    {
      id: 2,
      partner: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      mySkill: "UI/UX Design",
      theirSkill: "Piano Lessons",
      location: "London, UK",
      startDate: "2024-01-05",
      nextSession: "Friday, 7:00 PM",
      totalSessions: 10,
      completedSessions: 7,
      progress: 70,
      status: "ongoing",
      lastMessage: "Great progress on the design principles!",
      rating: 5.0
    }
  ];

  const completedSwaps = [
    {
      id: 3,
      partner: "David Kim",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      mySkill: "Adobe Illustrator",
      theirSkill: "Korean Language",
      location: "Seoul, South Korea",
      startDate: "2023-12-01",
      endDate: "2024-01-08",
      totalSessions: 12,
      completedSessions: 12,
      progress: 100,
      status: "completed",
      myRating: 4.5,
      theirRating: 4.8,
      feedback: "Excellent teacher! Very patient and knowledgeable."
    },
    {
      id: 4,
      partner: "Lisa Thompson",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      mySkill: "Figma",
      theirSkill: "Photography",
      location: "Toronto, Canada",
      startDate: "2023-11-15",
      endDate: "2023-12-20",
      totalSessions: 8,
      completedSessions: 8,
      progress: 100,
      status: "completed",
      myRating: 4.9,
      theirRating: 4.7,
      feedback: "Amazing photography skills! Learned so much about composition."
    }
  ];

  const cancelledSwaps = [
    {
      id: 5,
      partner: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      mySkill: "Photoshop",
      theirSkill: "Surfing",
      location: "Sydney, Australia",
      startDate: "2024-01-01",
      cancelDate: "2024-01-05",
      totalSessions: 4,
      completedSessions: 2,
      progress: 50,
      status: "cancelled",
      reason: "Schedule conflicts - both parties agreed to cancel"
    }
  ];

  const getCurrentSwaps = () => {
    switch (activeTab) {
      case 'active': return activeSwaps;
      case 'completed': return completedSwaps;
      case 'cancelled': return cancelledSwaps;
      default: return activeSwaps;
    }
  };

  const filteredSwaps = getCurrentSwaps().filter(swap =>
    swap.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
    swap.mySkill.toLowerCase().includes(searchQuery.toLowerCase()) ||
    swap.theirSkill.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing': return 'bg-green-500/20 text-green-300';
      case 'completed': return 'bg-blue-500/20 text-blue-300';
      case 'cancelled': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

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
            <Link href="/requests" className="text-white hover:text-blue-400 transition-colors">
              Requests
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Skill Swaps</h1>
          <p className="text-gray-300">Manage your ongoing, completed, and cancelled skill exchanges</p>
        </div>

        {/* Tabs and Search */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex bg-white/10 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('active')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'active'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Active ({activeSwaps.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'completed'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Completed ({completedSwaps.length})
              </button>
              <button
                onClick={() => setActiveTab('cancelled')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'cancelled'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Cancelled ({cancelledSwaps.length})
              </button>
            </div>

            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search swaps..."
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

        {/* Swaps List */}
        <div className="space-y-6">
          {filteredSwaps.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No swaps found</h3>
              <p className="text-gray-300 mb-6">
                {activeTab === 'active' && "You don't have any active skill swaps."}
                {activeTab === 'completed' && "You haven't completed any skill swaps yet."}
                {activeTab === 'cancelled' && "You don't have any cancelled swaps."}
              </p>
              {activeTab === 'active' && (
                <Link href="/browse" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                  Find Skills to Exchange
                </Link>
              )}
            </div>
          ) : (
            filteredSwaps.map((swap) => (
              <div key={swap.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Swap Info */}
                  <div className="flex items-start space-x-4 lg:min-w-0 lg:flex-1">
                    <img
                      src={swap.avatar}
                      alt={swap.partner}
                      className="w-16 h-16 rounded-full border-2 border-white/20 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{swap.partner}</h3>
                        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(swap.status)}`}>
                            {swap.status}
                          </span>
                          <div className="flex items-center space-x-1 text-gray-300">
                            <MapPin className="w-4 h-4" />
                            <span className="text-sm">{swap.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Skills Exchange */}
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="text-center">
                            <p className="text-xs text-blue-400 font-medium mb-1">YOU TEACH</p>
                            <span className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-full text-sm">
                              {swap.mySkill}
                            </span>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-purple-400 font-medium mb-1">YOU LEARN</p>
                            <span className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm">
                              {swap.theirSkill}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Progress</span>
                          <span className="text-white text-sm">{swap.completedSessions}/{swap.totalSessions} sessions</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${swap.progress}%` }}
                          />
                        </div>
                        <div className="text-right text-sm text-gray-400 mt-1">{swap.progress}% complete</div>
                      </div>

                      {/* Status-specific content */}
                      {activeTab === 'active' && (
                        <div className="bg-white/5 rounded-lg p-3 mb-4">
                          <div className="flex items-center space-x-2 mb-2">
                            <Calendar className="w-4 h-4 text-blue-400" />
                            <span className="text-white text-sm font-medium">Next Session: {swap.nextSession}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{swap.lastMessage}</p>
                        </div>
                      )}

                      {activeTab === 'completed' && (
                        <div className="bg-white/5 rounded-lg p-3 mb-4">
                          <div className="grid sm:grid-cols-2 gap-4 mb-3">
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-white text-sm">Your Rating: {swap.myRating}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Star className="w-4 h-4 text-yellow-400" />
                              <span className="text-white text-sm">Their Rating: {swap.theirRating}</span>
                            </div>
                          </div>
                          <p className="text-gray-300 text-sm italic">"{swap.feedback}"</p>
                        </div>
                      )}

                      {activeTab === 'cancelled' && (
                        <div className="bg-red-500/10 rounded-lg p-3 mb-4 border border-red-500/20">
                          <p className="text-red-300 text-sm">{swap.reason}</p>
                          <p className="text-gray-400 text-xs mt-1">Cancelled on {swap.cancelDate}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:min-w-[200px]">
                    {activeTab === 'active' && (
                      <>
                        <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center">
                          <Video className="w-4 h-4 mr-2" />
                          Join Session
                        </button>
                        <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </button>
                        <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </button>
                      </>
                    )}

                    {activeTab === 'completed' && (
                      <>
                        <Link 
                          href={`/rating/${swap.id}`}
                          className="bg-gradient-to-r from-yellow-500 to-orange-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                        >
                          <Star className="w-4 h-4 mr-2" />
                          View Rating
                        </Link>
                        <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Message
                        </button>
                      </>
                    )}

                    <Link 
                      href={`/user-profile/${swap.id}`}
                      className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center"
                    >
                      <User className="w-4 h-4 mr-2" />
                      View Profile
                    </Link>

                    {activeTab === 'active' && (
                      <button className="bg-red-500/20 border border-red-500/30 text-red-300 px-6 py-2 rounded-lg font-medium hover:bg-red-500/30 transition-all flex items-center justify-center">
                        <XCircle className="w-4 h-4 mr-2" />
                        Cancel Swap
                      </button>
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