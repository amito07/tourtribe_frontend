"use client";

import PostCard from "@/components/features/PostCard";
import TripCard from "@/components/features/TripCard";
import UserProfile from "@/components/features/UserProfile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { mockPosts, mockTrips, mockUsers } from "@/data/mockData";
import { useRequireAuth } from "@/hooks/useAuth";
import {
  ArrowTrendingUpIcon,
  MapIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"feed" | "trips" | "people">(
    "feed"
  );
  const { user } = useAuth();
  const { checkAuthAndRedirect } = useRequireAuth();
  const router = useRouter();

  const handleLike = (postId: string) => {
    if (!checkAuthAndRedirect()) return;
    console.log("Liked post:", postId);
  };

  const handleComment = (postId: string) => {
    if (!checkAuthAndRedirect()) return;
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId: string) => {
    if (!checkAuthAndRedirect()) return;
    console.log("Share post:", postId);
  };

  const handlePlanTrip = () => {
    if (!checkAuthAndRedirect()) return;
    console.log("Planning trip...");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {user
                  ? `Welcome back, ${user.name}! 🌍`
                  : "Welcome to TourTribe! 🌍"}
              </h1>
              <p className="text-lg text-gray-600">
                {user
                  ? "Ready for your next adventure? Check out what the community is sharing!"
                  : "Discover amazing destinations, connect with fellow travelers, and share your adventures."}
              </p>
            </div>

            {/* Content Tabs */}
            <div className="mb-6">
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab("feed")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "feed"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <ArrowTrendingUpIcon className="h-4 w-4" />
                  <span>Feed</span>
                </button>
                <button
                  onClick={() => setActiveTab("trips")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "trips"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <MapIcon className="h-4 w-4" />
                  <span>Trips</span>
                </button>
                <button
                  onClick={() => setActiveTab("people")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === "people"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <UserGroupIcon className="h-4 w-4" />
                  <span>People</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {activeTab === "feed" && (
                <>
                  {mockPosts.map((post) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onLike={handleLike}
                      onComment={handleComment}
                      onShare={handleShare}
                    />
                  ))}
                </>
              )}

              {activeTab === "trips" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockTrips.map((trip) => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              )}

              {activeTab === "people" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockUsers.map((user) => (
                    <UserProfile key={user.id} user={user} compact />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  🔥 Trending Destinations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    "Sajek Valley",
                    "Sundarban",
                    "Cox's Bazar",
                    "Bandarban",
                    "Sreemangal",
                  ].map((destination, index) => (
                    <div
                      key={destination}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-900">{destination}</span>
                      <span className="text-sm text-gray-500">
                        #{index + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">📊 Community Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Active Travelers</span>
                    <span className="font-semibold">12,543</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shared Trips</span>
                    <span className="font-semibold">3,891</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Countries Visited</span>
                    <span className="font-semibold">167</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Photos Shared</span>
                    <span className="font-semibold">89,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Ready to explore?
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share your next adventure with the TourTribe community.
                </p>
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={handlePlanTrip}
                >
                  Plan Your Trip
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
