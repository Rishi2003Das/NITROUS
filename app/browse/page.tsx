"use client";

import { useState } from 'react';
import { Search, Filter, MapPin, Star, MessageSquare, Heart, Zap, ArrowLeft, Clock, User } from 'lucide-react';
import Link from 'next/link';

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'All Skills',
    'Technology',
    'Languages',
    'Arts & Design',
    'Music',
    'Cooking',
    'Sports',
    'Business',
    'Crafts'
  ];

  const users = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 23,
      skillsOffered: ["Photoshop", "UI/UX Design", "Figma"],
      skillsWanted: ["Guitar", "Spanish", "Cooking"],
      availability: "Weekends",
      isOnline: true,
      bio: "Professional designer with 5+ years experience. Love teaching creative skills!"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 31,
      skillsOffered: ["Spanish", "Guitar", "Salsa Dancing"],
      skillsWanted: ["Web Development", "Photography", "Excel"],
      availability: "Evenings",
      isOnline: false,
      bio: "Native Spanish speaker and music enthusiast. Let's learn together!"
    },
    {
      id: 3,
      name: "Emma Wilson",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      location: "London, UK",
      rating: 5.0,
      reviewCount: 18,
      skillsOffered: ["Piano", "French", "Baking"],
      skillsWanted: ["Yoga", "Digital Marketing", "Painting"],
      availability: "Flexible",
      isOnline: true,
      bio: "Classical pianist and pastry chef. Passionate about sharing knowledge!"
    },
    {
      id: 4,
      name: "David Kim",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      location: "Seoul, South Korea",
      rating: 4.7,
      reviewCount: 42,
      skillsOffered: ["Korean", "Taekwondo", "K-Pop Dance"],
      skillsWanted: ["English", "Programming", "Chess"],
      availability: "Mornings",
      isOnline: true,
      bio: "Language teacher and martial arts instructor. Always excited to meet new people!"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      location: "Toronto, Canada",
      rating: 4.9,
      reviewCount: 27,
      skillsOffered: ["Photography", "Photoshop", "Video Editing"],
      skillsWanted: ["Violin", "Italian", "Rock Climbing"],
      availability: "Weekends",
      isOnline: false,
      bio: "Professional photographer with a passion for visual storytelling."
    },
    {
      id: 6,
      name: "Alex Johnson",
      avatar: "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop",
      location: "Sydney, Australia",
      rating: 4.6,
      reviewCount: 35,
      skillsOffered: ["Surfing", "Australian English", "Cooking"],
      skillsWanted: ["Japanese", "Skateboarding", "Graphic Design"],
      availability: "Afternoons",
      isOnline: true,
      bio: "Surf instructor and food lover. Let's exchange skills and stories!"
    }
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                         user.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

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
            <Link href="/dashboard" className="text-white hover:text-blue-400 transition-colors">
              Dashboard
            </Link>
            <Link href="/profile" className="text-white hover:text-blue-400 transition-colors">
              Profile
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Browse Skills</h1>
          <p className="text-gray-300">Discover amazing people and their skills</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, skill, or location..."
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/20 transition-all"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category.toLowerCase()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-2 border-white/20"
                    />
                    {user.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                    <div className="flex items-center space-x-1 text-gray-300">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{user.location}</span>
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">{user.rating}</span>
                </div>
                <span className="text-gray-400 text-sm">({user.reviewCount} reviews)</span>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{user.availability}</span>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-300 text-sm mb-4 line-clamp-2">{user.bio}</p>

              {/* Skills */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-blue-400 font-medium mb-1">OFFERS</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                    {user.skillsOffered.length > 3 && (
                      <span className="text-blue-300 text-xs">+{user.skillsOffered.length - 3} more</span>
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-purple-400 font-medium mb-1">WANTS</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                    {user.skillsWanted.length > 3 && (
                      <span className="text-purple-300 text-xs">+{user.skillsWanted.length - 3} more</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  Connect
                </button>
                <Link 
                  href={`/profile/${user.id}`}
                  className="flex-1 bg-white/10 border border-white/20 text-white py-2 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
            <p className="text-gray-300">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}