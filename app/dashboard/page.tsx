"use client";

import React, { useState, useEffect } from "react";
import {
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  Zap,
  MapPin,
  Calendar,
  CheckCircle,
  Star,
  Edit3,
  Mail,
  Phone,
  Globe,
  Clock,
} from "lucide-react";
import { useRouter } from "next/navigation";


// Type definitions based on your User model
interface ISkill {
  name: string;
  category?: string;
  proficiency?: "beginner" | "intermediate" | "advanced";
}

interface IAvailability {
  day: "weekday" | "weekend";
  time: "morning" | "afternoon" | "evening";
}

interface IUser {
  _id: string;
  name: string;
  email: string;
  location?: string;
  profilePhoto?: string;
  skillsOffered: ISkill[];
  skillsWanted: ISkill[];
  availability: IAvailability[];
  isPublic: boolean;
  isVerified: boolean;
  authProvider: "email" | "google";
  googleId?: string;
  rating?: number;
  swapCount?: number;
  isBanned?: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  // Fixed: Removed duplicate userData declaration
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if localStorage is available (client-side only)
        if (typeof window === "undefined") return;

        // Get user email from localStorage
        const userString = localStorage.getItem("user");
        if (!userString) {
          setError("No user found. Please login again.");
          setLoading(false);
          return;
        }

        const userObj = JSON.parse(userString); // parse string to object
        const userEmail = userObj.email;

        if (!userEmail) {
          setError("No user email found. Please login again.");
          setLoading(false);
          return;
        }

        // Fetch all users from API
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const users: IUser[] = await response.json();

        // Find current user by email
        const currentUser = users.find((user) => user.email === userEmail);

        if (!currentUser) {
          throw new Error("User not found");
        }

        setUserData(currentUser);
        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load user data"
        );
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatAvailability = (availability: IAvailability) => {
    const dayText = availability.day === "weekday" ? "Weekdays" : "Weekends";
    const timeText =
      availability.time.charAt(0).toUpperCase() + availability.time.slice(1);
    return `${dayText} - ${timeText}`;
  };

  const getProficiencyColor = (proficiency?: string) => {
    switch (proficiency) {
      case "beginner":
        return "bg-green-500/20 text-green-400";
      case "intermediate":
        return "bg-yellow-500/20 text-yellow-400";
      case "advanced":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-4">
            <User className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-white text-lg mb-4">{error}</p>
          <button
            onClick={() => {
              if (typeof window !== "undefined") {
                window.location.href = "/login";
              }
            }}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition-all"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }
const router=useRouter();
  return (
    

    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Navigation */}
      <nav className="bg-white/10 backdrop-blur-sm border-b border-white/20 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              SkillSwap
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search skills..."
                className="pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
              />
            </div>

            <button className="relative p-2 text-white hover:bg-white/10 rounded-lg transition-colors">
              <Bell className="w-6 h-6" />
            </button>

            <div className="flex items-center space-x-2">
              <img
                src={
                  userData?.profilePhoto ||
                  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
                }
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
              />
              <div className="flex items-center space-x-2">
                <span className="text-white font-medium">{userData?.name}</span>
                {userData?.isVerified && (
                  <CheckCircle className="w-4 h-4 text-green-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-6">
        {/* Profile Header */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 mb-6">
          <div className="flex items-start space-x-6">
            <div className="relative">
              <img
                src={
                  userData?.profilePhoto ||
                  "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
                }
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
              />
              <button className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-2 rounded-full hover:shadow-lg transition-all">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {userData?.name}
                </h1>
                {userData?.isVerified && (
                  <CheckCircle className="w-6 h-6 text-green-400" />
                )}
              </div>

              <div className="flex items-center space-x-4 text-gray-300 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{userData?.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{userData?.location || "Location not set"}</span>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-medium">
                    {userData?.rating || 0}
                  </span>
                  <span className="text-gray-400 text-sm">Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">
                    {userData?.swapCount || 0}
                  </span>
                  <span className="text-gray-400 text-sm">Swaps</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">
                    {userData?.createdAt
                      ? formatDate(userData.createdAt)
                      : "Unknown"}
                  </span>
                  <span className="text-gray-400 text-sm">Joined</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    userData?.isPublic
                      ? "bg-green-500/20 text-green-400"
                      : "bg-gray-500/20 text-gray-400"
                  }`}
                >
                  {userData?.isPublic ? "Public Profile" : "Private Profile"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    userData?.isVerified
                      ? "bg-blue-500/20 text-blue-400"
                      : "bg-yellow-500/20 text-yellow-400"
                  }`}
                >
                  {userData?.isVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Skills Offered */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
              Skills I Offer
            </h2>
            <div className="space-y-3">
              {userData?.skillsOffered && userData.skillsOffered.length > 0 ? (
                userData.skillsOffered.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">
                        {typeof skill === "string" ? skill : skill.name}
                      </span>
                      {typeof skill === "object" && skill.proficiency && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getProficiencyColor(
                            skill.proficiency
                          )}`}
                        >
                          {skill.proficiency}
                        </span>
                      )}
                    </div>
                    {typeof skill === "object" && skill.category && (
                      <span className="text-gray-400 text-sm">
                        {skill.category}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No skills offered yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
              Skills I Want
            </h2>
            <div className="space-y-3">
              {userData?.skillsWanted && userData.skillsWanted.length > 0 ? (
                userData.skillsWanted.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-white/5 rounded-lg p-3 border border-white/10"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">
                        {typeof skill === "string" ? skill : skill.name}
                      </span>
                      {typeof skill === "object" && skill.proficiency && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${getProficiencyColor(
                            skill.proficiency
                          )}`}
                        >
                          {skill.proficiency}
                        </span>
                      )}
                    </div>
                    {typeof skill === "object" && skill.category && (
                      <span className="text-gray-400 text-sm">
                        {skill.category}
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-gray-400 text-center py-8">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No skills wanted yet</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Availability */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mt-6">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-3 text-blue-400" />
            My Availability
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {userData?.availability && userData.availability.length > 0 ? (
              userData.availability.map((slot, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <span className="text-white font-medium">
                    {typeof slot === "string" ? slot : formatAvailability(slot)}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full text-gray-400 text-center py-8">
                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No availability set</p>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center">
            <Edit3 className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
           <button onClick={()=>{router.push('/browse')}} className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center">
            
            Go To Browse Skills
          </button>
          <button className="bg-white/10 border border-white/20 text-white px-8 py-3 rounded-xl font-medium hover:bg-white/20 transition-all flex items-center">
            <Settings className="w-5 h-5 mr-2" />
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500/20 border border-red-500/20 text-red-400 px-8 py-3 rounded-xl font-medium hover:bg-red-500/30 transition-all flex items-center"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
