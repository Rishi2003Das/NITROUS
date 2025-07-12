"use client";

import { useState } from 'react';
import { Bell, Search, Plus, MessageSquare, Star, Clock, User, Settings, LogOut, Zap, Filter, MapPin, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const pendingRequests = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "Photoshop",
      skillWanted: "Guitar Lessons",
      location: "San Francisco, CA",
      rating: 4.9,
      message: "Hi! I'd love to exchange Photoshop skills for guitar lessons. I'm available weekends."
    },
    {
      id: 2,
      user: "Mike Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skillOffered: "Spanish",
      skillWanted: "Web Development",
      location: "Austin, TX",
      rating: 4.8,
      message: "I can help you with Spanish conversation in exchange for web development basics."
    }
  ];

  const activeSwaps = [
    {
      id: 1,
      user: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skill: "Piano Lessons",
      nextSession: "Tomorrow, 3:00 PM",
      progress: 75
    },
    {
      id: 2,
      user: "David Kim",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      skill: "French Conversation",
      nextSession: "Friday, 7:00 PM",
      progress: 45
    }
  ];

  const recentActivity = [
    { type: 'request', message: 'New swap request from Sarah Chen', time: '2 hours ago' },
    { type: 'message', message: 'Message from Emma Wilson', time: '4 hours ago' },
    { type: 'review', message: 'You received a 5-star review', time: '1 day ago' },
    { type: 'swap', message: 'Swap completed with Alex Johnson', time: '2 days ago' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills or users..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <button className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">3</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white/20"
              />
              <span className="text-white font-medium">John Doe</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: <User className="w-5 h-5" /> },
                  { id: 'requests', label: 'Requests', icon: <MessageSquare className="w-5 h-5" /> },
                  { id: 'active', label: 'Active Swaps', icon: <Clock className="w-5 h-5" /> },
                  { id: 'profile', label: 'My Profile', icon: <User className="w-5 h-5" /> },
                  { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === item.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
                
                <div className="pt-4 border-t border-white/20">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 transition-all">
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-white/20">
                  <h1 className="text-3xl font-bold text-white mb-2">Welcome back, John! 👋</h1>
                  <p className="text-gray-300">You have 2 pending requests and 3 active skill swaps.</p>
                  <Link href="/browse" className="inline-flex items-center mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                    <Plus className="w-4 h-4 mr-2" />
                    Find New Skills
                  </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Swaps', value: '12', icon: <MessageSquare className="w-6 h-6" /> },
                    { label: 'Average Rating', value: '4.8', icon: <Star className="w-6 h-6" /> },
                    { label: 'Skills Taught', value: '8', icon: <User className="w-6 h-6" /> },
                    { label: 'Skills Learned', value: '6', icon: <Clock className="w-6 h-6" /> }
                  ].map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">{stat.label}</p>
                          <p className="text-2xl font-bold text-white">{stat.value}</p>
                        </div>
                        <div className="text-blue-400">
                          {stat.icon}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'request' ? 'bg-blue-400' :
                          activity.type === 'message' ? 'bg-green-400' :
                          activity.type === 'review' ? 'bg-yellow-400' : 'bg-purple-400'
                        }`} />
                        <div className="flex-1">
                          <p className="text-white">{activity.message}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'requests' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-white">Swap Requests</h1>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingRequests.map((request) => (
                    <div key={request.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex items-start space-x-4">
                        <img
                          src={request.avatar}
                          alt={request.user}
                          className="w-16 h-16 rounded-full border-2 border-white/20"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-white">{request.user}</h3>
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm">{request.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-300 text-sm">{request.location}</span>
                          </div>
                          <div className="bg-white/5 rounded-lg p-3 mb-4">
                            <p className="text-sm text-gray-300 mb-2">
                              <span className="text-blue-400 font-medium">Offers:</span> {request.skillOffered}
                            </p>
                            <p className="text-sm text-gray-300">
                              <span className="text-purple-400 font-medium">Wants:</span> {request.skillWanted}
                            </p>
                          </div>
                          <p className="text-gray-300 mb-4">{request.message}</p>
                          <div className="flex space-x-3">
                            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                              Accept
                            </button>
                            <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                              Decline
                            </button>
                            <button className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                              Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'active' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Active Skill Swaps</h1>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {activeSwaps.map((swap) => (
                    <div key={swap.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={swap.avatar}
                          alt={swap.user}
                          className="w-12 h-12 rounded-full border-2 border-white/20"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-white">{swap.user}</h3>
                          <p className="text-gray-300">{swap.skill}</p>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-300 text-sm">Progress</span>
                          <span className="text-white text-sm">{swap.progress}%</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all"
                            style={{ width: `${swap.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4 text-gray-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{swap.nextSession}</span>
                      </div>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                          Message
                        </button>
                        <button className="flex-1 bg-white/10 border border-white/20 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                          Schedule
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}