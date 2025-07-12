"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Star, MessageSquare, Heart, Zap, ArrowLeft, Clock, User } from 'lucide-react';
import Link from 'next/link';

interface IUser {
  _id: string;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  rating?: number;
  swapCount?: number;
  skillsOffered: Array<{ name: string; proficiency?: string; _id?: string }>;
  skillsWanted: Array<{ name: string; proficiency?: string; _id?: string }>;
  availability: Array<{ day: string; time: string; _id?: string }>;
  isPublic?: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function Browse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all skills');
  const [showFilters, setShowFilters] = useState(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Helper function to format availability
  const formatAvailability = (availability: { day: string; time: string }[]) => {
    if (!availability || availability.length === 0) return 'Not specified';
    
    const days = [...new Set(availability.map(a => a.day))];
    const times = [...new Set(availability.map(a => a.time))];
    
    return `${days.join('/')} ${times.join('/')}`;
  };

  // Helper function to check if user matches category
  const matchesCategory = (user: IUser, category: string) => {
    if (category === 'all skills') return true;
    
    const categoryLower = category.toLowerCase();
    const userSkills = [
      ...user.skillsOffered.map(skill => skill.name.toLowerCase()),
      ...user.skillsWanted.map(skill => skill.name.toLowerCase())
    ];
    
    return userSkills.some(skill => skill.includes(categoryLower));
  };

  const filteredUsers = users.filter(user => {
    // Only show public profiles (default to true if not specified)
    if (user.isPublic === false) return false;
    
    // Check search query
    const matchesSearch = searchQuery === '' || (
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.skillsOffered.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      user.skillsWanted.some(skill => skill.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (user.location && user.location.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    // Check category filter
    const matchesCategoryFilter = matchesCategory(user, selectedCategory);
    
    return matchesSearch && matchesCategoryFilter;
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center p-6 bg-white/10 rounded-xl">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
                onClick={() => handleCategoryChange(category)}
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
            <div key={user._id} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all group">
              {/* User Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.profilePhoto || 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop'}
                      alt={user.name}
                      className="w-16 h-16 rounded-full border-2 border-white/20 object-cover"
                    />
                    {user.isVerified && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{user.name}</h3>
                    {user.location && (
                      <div className="flex items-center space-x-1 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{user.location}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button className="text-gray-400 hover:text-red-400 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                {user.rating && (
                  <>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{user.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-gray-400 text-sm">({user.swapCount } swaps)</span>
                  </>
                )}
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{formatAvailability(user.availability)}</span>
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-3 mb-6">
                <div>
                  <p className="text-xs text-blue-400 font-medium mb-1">OFFERS</p>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full text-xs">
                        {skill.name}
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
                        {skill.name}
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
                  href={`/profile/${user._id}`}
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
            <p className="text-gray-300">
              {searchQuery ? `No users found matching "${searchQuery}"` : 'Try adjusting your search or filters'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}