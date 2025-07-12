"use client";

import { useState } from 'react';
import { ArrowLeft, Edit, MapPin, Star, Calendar, Clock, MessageSquare, UserPlus, Camera, Save, X, Plus, Trash2, Zap } from 'lucide-react';
import Link from 'next/link';

export default function UserDetails() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Chen',
    email: 'sarah.chen@example.com',
    location: 'San Francisco, CA',
    bio: 'Professional UI/UX designer with 5+ years of experience. Passionate about creating beautiful and functional designs. Love teaching creative skills and learning new technologies!',
    profilePhoto: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
    skillsOffered: ['Photoshop', 'UI/UX Design', 'Figma', 'Adobe Illustrator', 'Sketch'],
    skillsWanted: ['Guitar', 'Spanish', 'Cooking', 'Photography', 'Web Development'],
    availability: ['Weekends', 'Weekday Evenings'],
    isPublic: true,
    joinDate: 'December 2023',
    totalSwaps: 12,
    rating: 4.9,
    reviews: 23
  });

  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      setProfileData({
        ...profileData,
        skillsOffered: [...profileData.skillsOffered, newSkillOffered.trim()]
      });
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      setProfileData({
        ...profileData,
        skillsWanted: [...profileData.skillsWanted, newSkillWanted.trim()]
      });
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (index: number) => {
    setProfileData({
      ...profileData,
      skillsOffered: profileData.skillsOffered.filter((_, i) => i !== index)
    });
  };

  const removeSkillWanted = (index: number) => {
    setProfileData({
      ...profileData,
      skillsWanted: profileData.skillsWanted.filter((_, i) => i !== index)
    });
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
            <Link href="/browse" className="text-white hover:text-blue-400 transition-colors">
              Browse
            </Link>
            <Link href="/requests" className="text-white hover:text-blue-400 transition-colors">
              Requests
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-0">User Profile</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center space-x-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 sticky top-6">
              {/* Profile Photo */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={profileData.profilePhoto}
                    alt={profileData.name}
                    className="w-32 h-32 rounded-full border-4 border-white/20 mx-auto"
                  />
                  {isEditing && (
                    <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                    className="mt-4 text-center text-xl font-bold bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white w-full"
                  />
                ) : (
                  <h2 className="mt-4 text-xl font-bold text-white">{profileData.name}</h2>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {profileData.totalSwaps}
                  </div>
                  <div className="text-gray-300 text-sm">Swaps</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center justify-center">
                    <Star className="w-5 h-5 text-yellow-400 mr-1" />
                    {profileData.rating}
                  </div>
                  <div className="text-gray-300 text-sm">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    {profileData.reviews}
                  </div>
                  <div className="text-gray-300 text-sm">Reviews</div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-sm flex-1"
                      placeholder="Location"
                    />
                  ) : (
                    <span className="text-sm">{profileData.location}</span>
                  )}
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Available {profileData.availability.join(', ')}</span>
                </div>
              </div>

              {/* Privacy Setting */}
              {isEditing && (
                <div className="mt-6 pt-6 border-t border-white/20">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={profileData.isPublic}
                      onChange={(e) => setProfileData({...profileData, isPublic: e.target.checked})}
                      className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="ml-2 text-sm text-gray-300">Make profile public</span>
                  </label>
                </div>
              )}

              {/* Action Buttons */}
              {!isEditing && (
                <div className="mt-6 space-y-2">
                  <Link href="/requests" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View Requests
                  </Link>
                  <Link href="/browse" className="w-full bg-white/10 border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all flex items-center justify-center">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Find Skills
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">About Me</h3>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none"
                  rows={4}
                  placeholder="Tell others about yourself..."
                />
              ) : (
                <p className="text-gray-300 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Skills Offered */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Skills I Can Teach</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skillsOffered.map((skill, index) => (
                  <div key={index} className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-full text-sm flex items-center">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkillOffered(index)}
                        className="ml-2 text-blue-300 hover:text-red-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Add a skill you can teach..."
                    onKeyPress={(e) => e.key === 'Enter' && addSkillOffered()}
                  />
                  <button
                    onClick={addSkillOffered}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Skills Wanted */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Skills I Want to Learn</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.skillsWanted.map((skill, index) => (
                  <div key={index} className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm flex items-center">
                    {skill}
                    {isEditing && (
                      <button
                        onClick={() => removeSkillWanted(index)}
                        className="ml-2 text-purple-300 hover:text-red-300 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400"
                    placeholder="Add a skill you want to learn..."
                    onKeyPress={(e) => e.key === 'Enter' && addSkillWanted()}
                  />
                  <button
                    onClick={addSkillWanted}
                    className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Availability */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Availability</h3>
              {isEditing ? (
                <div className="grid grid-cols-2 gap-2">
                  {['Weekday Mornings', 'Weekday Afternoons', 'Weekday Evenings', 'Weekend Mornings', 'Weekend Afternoons', 'Weekend Evenings'].map((time) => (
                    <label key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={profileData.availability.includes(time)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setProfileData({
                              ...profileData,
                              availability: [...profileData.availability, time]
                            });
                          } else {
                            setProfileData({
                              ...profileData,
                              availability: profileData.availability.filter(a => a !== time)
                            });
                          }
                        }}
                        className="w-4 h-4 text-blue-500 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-gray-300">{time}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.availability.map((time, index) => (
                    <span key={index} className="bg-green-500/20 text-green-300 px-3 py-2 rounded-full text-sm">
                      {time}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}