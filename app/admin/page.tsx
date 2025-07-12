"use client";

import { useState } from 'react';
import { Users, MessageSquare, AlertTriangle, Download, Send, Shield, BarChart3, Zap, Search, Filter, Eye, Ban, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Total Users', value: '10,247', change: '+12%', icon: <Users className="w-6 h-6" /> },
    { label: 'Active Swaps', value: '1,834', change: '+8%', icon: <MessageSquare className="w-6 h-6" /> },
    { label: 'Pending Reports', value: '23', change: '-15%', icon: <AlertTriangle className="w-6 h-6" /> },
    { label: 'Monthly Revenue', value: '$12,450', change: '+25%', icon: <BarChart3 className="w-6 h-6" /> }
  ];

  const pendingReports = [
    {
      id: 1,
      type: 'Inappropriate Content',
      user: 'John Smith',
      reportedBy: 'Sarah Wilson',
      description: 'User posted inappropriate skill description',
      date: '2024-01-15',
      status: 'pending'
    },
    {
      id: 2,
      type: 'Spam',
      user: 'Mike Johnson',
      reportedBy: 'Emma Davis',
      description: 'User sending spam messages to multiple users',
      date: '2024-01-14',
      status: 'pending'
    },
    {
      id: 3,
      type: 'Fake Profile',
      user: 'Lisa Brown',
      reportedBy: 'David Kim',
      description: 'Suspected fake profile with stolen photos',
      date: '2024-01-13',
      status: 'investigating'
    }
  ];

  const recentSwaps = [
    {
      id: 1,
      user1: 'Sarah Chen',
      user2: 'Mike Rodriguez',
      skill1: 'Photoshop',
      skill2: 'Spanish',
      status: 'active',
      startDate: '2024-01-10'
    },
    {
      id: 2,
      user1: 'Emma Wilson',
      user2: 'David Kim',
      skill1: 'Piano',
      skill2: 'Korean',
      status: 'completed',
      startDate: '2024-01-08'
    },
    {
      id: 3,
      user1: 'Alex Johnson',
      user2: 'Lisa Thompson',
      skill1: 'Surfing',
      skill2: 'Photography',
      status: 'cancelled',
      startDate: '2024-01-05'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Sarah Chen',
      email: 'sarah@example.com',
      joinDate: '2023-12-01',
      swapsCompleted: 12,
      rating: 4.9,
      status: 'active',
      reports: 0
    },
    {
      id: 2,
      name: 'Mike Rodriguez',
      email: 'mike@example.com',
      joinDate: '2023-11-15',
      swapsCompleted: 8,
      rating: 4.8,
      status: 'active',
      reports: 1
    },
    {
      id: 3,
      name: 'John Smith',
      email: 'john@example.com',
      joinDate: '2023-10-20',
      swapsCompleted: 3,
      rating: 3.2,
      status: 'suspended',
      reports: 3
    }
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
              SkillSwap Admin
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users, reports..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-green-400" />
              <span className="text-white font-medium">Admin Panel</span>
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
                  { id: 'overview', label: 'Overview', icon: <BarChart3 className="w-5 h-5" /> },
                  { id: 'users', label: 'User Management', icon: <Users className="w-5 h-5" /> },
                  { id: 'reports', label: 'Reports & Moderation', icon: <AlertTriangle className="w-5 h-5" /> },
                  { id: 'swaps', label: 'Swap Monitoring', icon: <MessageSquare className="w-5 h-5" /> },
                  { id: 'messages', label: 'Platform Messages', icon: <Send className="w-5 h-5" /> },
                  { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> }
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
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="text-blue-400">
                          {stat.icon}
                        </div>
                        <span className={`text-sm font-medium ${
                          stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Platform Message</span>
                    </button>
                    <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                      <Download className="w-5 h-5" />
                      <span>Download Reports</span>
                    </button>
                    <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-4 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Review Reports</span>
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-white">New user registration: Sarah Chen</span>
                      <span className="text-gray-400 text-sm ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-white">Report submitted for inappropriate content</span>
                      <span className="text-gray-400 text-sm ml-auto">4 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                      <div className="w-2 h-2 rounded-full bg-blue-400" />
                      <span className="text-white">Skill swap completed: Photography ↔ Guitar</span>
                      <span className="text-gray-400 text-sm ml-auto">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-white">Reports & Moderation</h1>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-all">
                      <Filter className="w-4 h-4" />
                      <span>Filter</span>
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <div key={report.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.type === 'Inappropriate Content' ? 'bg-red-500/20 text-red-300' :
                              report.type === 'Spam' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {report.type}
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                              'bg-blue-500/20 text-blue-300'
                            }`}>
                              {report.status}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-white">Report #{report.id}</h3>
                          <p className="text-gray-300 text-sm">
                            <span className="font-medium">Reported User:</span> {report.user}
                          </p>
                          <p className="text-gray-300 text-sm">
                            <span className="font-medium">Reported By:</span> {report.reportedBy}
                          </p>
                          <p className="text-gray-300 text-sm">
                            <span className="font-medium">Date:</span> {report.date}
                          </p>
                        </div>
                      </div>
                      
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <p className="text-gray-300">{report.description}</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>Approve</span>
                        </button>
                        <button className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                          <XCircle className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                        <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>Investigate</span>
                        </button>
                        <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center space-x-2">
                          <Ban className="w-4 h-4" />
                          <span>Ban User</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold text-white">User Management</h1>
                  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all">
                    Export Users
                  </button>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-white/5">
                        <tr>
                          <th className="text-left p-4 text-gray-300 font-medium">User</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Join Date</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Swaps</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Rating</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Reports</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Status</th>
                          <th className="text-left p-4 text-gray-300 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user.id} className="border-t border-white/10">
                            <td className="p-4">
                              <div>
                                <p className="text-white font-medium">{user.name}</p>
                                <p className="text-gray-400 text-sm">{user.email}</p>
                              </div>
                            </td>
                            <td className="p-4 text-gray-300">{user.joinDate}</td>
                            <td className="p-4 text-gray-300">{user.swapsCompleted}</td>
                            <td className="p-4 text-gray-300">{user.rating}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.reports === 0 ? 'bg-green-500/20 text-green-300' :
                                user.reports <= 2 ? 'bg-yellow-500/20 text-yellow-300' :
                                'bg-red-500/20 text-red-300'
                              }`}>
                                {user.reports}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === 'active' ? 'bg-green-500/20 text-green-300' :
                                user.status === 'suspended' ? 'bg-red-500/20 text-red-300' :
                                'bg-gray-500/20 text-gray-300'
                              }`}>
                                {user.status}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex space-x-2">
                                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                                  <Eye className="w-4 h-4" />
                                </button>
                                <button className="text-red-400 hover:text-red-300 transition-colors">
                                  <Ban className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'swaps' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Swap Monitoring</h1>
                
                <div className="space-y-4">
                  {recentSwaps.map((swap) => (
                    <div key={swap.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <p className="text-white font-medium">{swap.user1}</p>
                            <p className="text-blue-400 text-sm">{swap.skill1}</p>
                          </div>
                          <div className="text-gray-400">↔</div>
                          <div className="text-center">
                            <p className="text-white font-medium">{swap.user2}</p>
                            <p className="text-purple-400 text-sm">{swap.skill2}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            swap.status === 'active' ? 'bg-green-500/20 text-green-300' :
                            swap.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-red-500/20 text-red-300'
                          }`}>
                            {swap.status}
                          </span>
                          <p className="text-gray-400 text-sm mt-1">{swap.startDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-3">
                        <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                          View Details
                        </button>
                        <button className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg font-medium hover:bg-white/20 transition-all">
                          Contact Users
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-white">Platform Messages</h1>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h2 className="text-xl font-bold text-white mb-4">Send Platform-wide Message</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message Type</label>
                      <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <option value="announcement">Announcement</option>
                        <option value="maintenance">Maintenance Alert</option>
                        <option value="feature">Feature Update</option>
                        <option value="warning">Warning</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter message subject"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                      <textarea
                        rows={6}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        placeholder="Enter your message..."
                      />
                    </div>
                    <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center space-x-2">
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}