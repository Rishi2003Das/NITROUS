"use client";

import { useState } from 'react';
import { ArrowLeft, Star, Send, ThumbsUp, ThumbsDown, Award, MessageSquare, User, Calendar, Zap } from 'lucide-react';
import Link from 'next/link';

export default function RatingFeedback() {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedAspects, setSelectedAspects] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const swapDetails = {
    partner: "Mike Rodriguez",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    mySkill: "Photoshop",
    theirSkill: "Spanish Conversation",
    duration: "6 weeks",
    sessions: 12,
    completedDate: "2024-01-15"
  };

  const ratingAspects = [
    { id: 'punctual', label: 'Punctual', icon: <Calendar className="w-4 h-4" /> },
    { id: 'knowledgeable', label: 'Knowledgeable', icon: <Award className="w-4 h-4" /> },
    { id: 'patient', label: 'Patient', icon: <ThumbsUp className="w-4 h-4" /> },
    { id: 'prepared', label: 'Well Prepared', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'communicative', label: 'Good Communicator', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'flexible', label: 'Flexible Schedule', icon: <Calendar className="w-4 h-4" /> }
  ];

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleAspectToggle = (aspectId: string) => {
    setSelectedAspects(prev => 
      prev.includes(aspectId) 
        ? prev.filter(id => id !== aspectId)
        : [...prev, aspectId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Please provide a rating');
      return;
    }
    
    console.log('Submitting rating:', {
      rating,
      feedback,
      aspects: selectedAspects
    });
    
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <ThumbsUp className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Thank You!</h2>
          <p className="text-gray-300 mb-6">
            Your rating and feedback have been submitted successfully. This helps build trust in our community.
          </p>
          <div className="space-y-3">
            <Link href="/swap-requests" className="block w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
              View All Swaps
            </Link>
            <Link href="/browse" className="block w-full bg-white/10 border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all">
              Find New Skills
            </Link>
          </div>
        </div>
      </div>
    );
  }

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
            <Link href="/swap-requests" className="text-white hover:text-blue-400 transition-colors">
              Swaps
            </Link>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-2xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <Link href="/swap-requests" className="inline-flex items-center text-white/70 hover:text-white mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Swaps
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Rate & Review</h1>
          <p className="text-gray-300">Share your experience to help build trust in our community</p>
        </div>

        {/* Swap Summary */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={swapDetails.avatar}
              alt={swapDetails.partner}
              className="w-16 h-16 rounded-full border-2 border-white/20"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{swapDetails.partner}</h3>
              <p className="text-gray-300">Skill exchange completed</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-xs text-blue-400 font-medium mb-1">YOU TAUGHT</p>
              <span className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-full text-sm">
                {swapDetails.mySkill}
              </span>
            </div>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-xs text-purple-400 font-medium mb-1">YOU LEARNED</p>
              <span className="bg-purple-500/20 text-purple-300 px-3 py-2 rounded-full text-sm">
                {swapDetails.theirSkill}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {swapDetails.duration}
              </div>
              <div className="text-gray-300 text-sm">Duration</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                {swapDetails.sessions}
              </div>
              <div className="text-gray-300 text-sm">Sessions</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-gray-300 text-sm">Complete</div>
            </div>
          </div>
        </div>

        {/* Rating Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Star Rating */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Overall Rating</h3>
            <div className="text-center">
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className={`text-4xl transition-all hover:scale-110 ${
                      star <= rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  >
                    <Star className={`w-12 h-12 ${star <= rating ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
              <p className="text-gray-300">
                {rating === 0 && "Click to rate"}
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            </div>
          </div>

          {/* Rating Aspects */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">What made this exchange great?</h3>
            <p className="text-gray-300 text-sm mb-4">Select all that apply</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {ratingAspects.map((aspect) => (
                <button
                  key={aspect.id}
                  type="button"
                  onClick={() => handleAspectToggle(aspect.id)}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                    selectedAspects.includes(aspect.id)
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {aspect.icon}
                  <span>{aspect.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Written Feedback */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4">Written Feedback</h3>
            <p className="text-gray-300 text-sm mb-4">Share your experience (optional)</p>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={4}
              placeholder="What did you learn? How was the teaching style? Would you recommend this person to others?"
            />
          </div>

          {/* Submit Button */}
          <div className="flex space-x-4">
            <Link 
              href="/swap-requests"
              className="flex-1 bg-white/10 border border-white/20 text-white py-3 rounded-lg font-medium hover:bg-white/20 transition-all text-center"
            >
              Skip for Now
            </Link>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Rating
            </button>
          </div>
        </form>

        {/* Help Text */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-2xl p-6 border border-white/20">
          <h4 className="font-semibold text-white mb-2">Why ratings matter</h4>
          <p className="text-gray-300 text-sm">
            Your honest feedback helps other users make informed decisions about skill exchanges. 
            Ratings and reviews build trust and improve the overall quality of our community.
          </p>
        </div>
      </div>
    </div>
  );
}