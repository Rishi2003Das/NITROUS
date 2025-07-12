"use client";

import { useState } from 'react';
import { ArrowLeft, Search, Filter, Clock, CheckCircle, XCircle, Eye, MessageSquare, User, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AccessRequests() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const accessRequests = [
    {
      id: 1,
      requester: "John Smith",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      requestType: "Profile Access",
      reason: "Interested in your Photoshop skills for a potential skill exchange",
      requestDate: "2024-01-15",
      status: "pending",
      skillsOffered: ["Web Development", "JavaScript"],
      skillsWanted: ["Photoshop", "Graphic Design"]
    },
    {
      id: 2,
      requester: "Maria Garcia",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      requestType: "Contact Information",
      reason: "Would like to discuss a potential cooking for language exchange",
      requestDate: "2024-01-14",
      status: "approved",
      skillsOffered: ["Spanish", "Cooking"],
      skillsWanted: ["English", "Photography"]
    },
    {
      id: 3,
      requester: "Alex Chen",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      requestType: "Skill Details",
      reason: "Wants to know more about your UI/UX design experience",
      requestDate: "2024-01-13",
      status: "rejected",
      skillsOffered: ["Piano", "Music Theory"],
      skillsWanted: ["UI/UX Design", "Figma"]
    },
    {
      id: 4,
      requester: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      requestType: "Schedule Access",
      reason: "Looking to coordinate availability for potential French lessons exchange",
      requestDate: "2024-01-12",
      status: "pending",
      skillsOffered: ["French", "Baking"],
      skillsWanted: ["Guitar", "Music Production"]
    }
  ];

  const handleApproveRequest = (requestId: number) => {
    console.log('Approving access request:', requestId);
    // Handle approve logic
  };

  const handleRejectRequest = (requestId: number) => {
    console.log('Rejecting access request:', requestId);
    // Handle reject logic
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300';
      case 'approved': return 'bg-green-500/20 text-green-300';
      case 'rejected': return 'bg-red-500/20 text-red-300';
      default: return 'bg-gray-500/20 text-gray-300';
    }
  };

  const getRequestTypeIcon = (type: string) => {
    switch (type) {
      case 'Profile Access': return <User className="w-5 h-5" />;
      case 'Contact Information': return <MessageSquare className="w-5 h-5" />;
      case 'Skill Details': return <Eye className="w-5 h-5" />;
      case 'Schedule Access': return <Calendar className="w-5 h-5" />;
      default: return <Eye className="w-5 h-5" />;
    }
  };

  const filteredRequests = accessRequests.filter(request => {
    const matchesSearch = request.requester.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         request.requestType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || request.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Access Requests</h1>
          <p className="text-gray-300">Manage requests for access to your profile information and skills</p>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search access requests..."
                  className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>Pending: {accessRequests.filter(r => r.status === 'pending').length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Approved: {accessRequests.filter(r => r.status === 'approved').length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>Rejected: {accessRequests.filter(r => r.status === 'rejected').length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Access Requests List */}
        <div className="space-y-6">
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No access requests found</h3>
              <p className="text-gray-300">No one has requested access to your information yet.</p>
            </div>
          ) : (
            filteredRequests.map((request) => (
              <div key={request.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Request Info */}
                  <div className="flex items-start space-x-4 lg:min-w-0 lg:flex-1">
                    <img
                      src={request.avatar}
                      alt={request.requester}
                      className="w-16 h-16 rounded-full border-2 border-white/20 flex-shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h3 className="text-xl font-bold text-white">{request.requester}</h3>
                        <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          <div className="flex items-center space-x-1 text-gray-300">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{request.requestDate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Request Type */}
                      <div className="flex items-center space-x-2 mb-4">
                        <div className="bg-blue-500/20 text-blue-300 p-2 rounded-lg">
                          {getRequestTypeIcon(request.requestType)}
                        </div>
                        <div>
                          <p className="text-white font-medium">{request.requestType}</p>
                          <p className="text-gray-400 text-sm">Access request type</p>
                        </div>
                      </div>

                      {/* Reason */}
                      <div className="bg-white/5 rounded-lg p-4 mb-4">
                        <p className="text-gray-300 text-sm leading-relaxed">{request.reason}</p>
                      </div>

                      {/* Requester Skills */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-blue-400 font-medium mb-2">THEIR SKILLS</p>
                          <div className="flex flex-wrap gap-1">
                            {request.skillsOffered.map((skill, index) => (
                              <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-purple-400 font-medium mb-2">THEY WANT</p>
                          <div className="flex flex-wrap gap-1">
                            {request.skillsWanted.map((skill, index) => (
                              <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col space-y-2 lg:min-w-[200px]">
                    {request.status === 'pending' && (
                      <>
                        <button
                          onClick={() => handleApproveRequest(request.id)}
                          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectRequest(request.id)}
                          className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Reject
                        </button>
                      </>
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

                    {request.status === 'approved' && (
                      <Link 
                        href={`/send-request/${request.id}`}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
                      >
                        <Clock className="w-4 h-4 mr-2" />
                        Send Request
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Help Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4">About Access Requests</h3>
          <div className="grid md:grid-cols-2 gap-6 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">What are access requests?</h4>
              <p className="text-sm">
                Access requests are sent by users who want to view specific parts of your profile or contact information 
                before initiating a skill exchange. This helps maintain privacy while enabling meaningful connections.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Types of access requests:</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Profile Access:</strong> View your full profile details</li>
                <li>• <strong>Contact Information:</strong> Access your contact details</li>
                <li>• <strong>Skill Details:</strong> See detailed skill descriptions</li>
                <li>• <strong>Schedule Access:</strong> View your availability calendar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}