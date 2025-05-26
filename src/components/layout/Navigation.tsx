"use client";

import CreatePostForm from "@/components/features/CreatePostForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { ShareTripData } from "@/types";
import {
  ArrowRightEndOnRectangleIcon,
  BellIcon,
  Cog6ToothIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  MapIcon,
  PlusIcon,
  UserCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Navigation() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setShowUserMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleCreatePost = async (tripData: ShareTripData) => {
    // In a real app, this would save to your backend
    console.log("Creating trip post:", tripData);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const handleCreatePostClick = () => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    setIsCreatePostOpen(true);
  };
  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    router.push("/login");
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    router.push("/profile");
  };

  const handleSettingsClick = () => {
    setShowUserMenu(false);
    router.push("/settings");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 text-white p-2 rounded-lg">
                <MapIcon className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-900">TourTribe</span>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search destinations, trips, or people..."
                  className="pl-10 pr-4 w-full"
                />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <HomeIcon className="h-6 w-6" />
              </Link>
              <Link
                href="/explore"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <MapIcon className="h-6 w-6" />
              </Link>
              <Link
                href="/community"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                <UsersIcon className="h-6 w-6" />
              </Link>{" "}
              <Button
                variant="primary"
                size="sm"
                className="hidden sm:flex items-center space-x-1"
                onClick={handleCreatePostClick}
              >
                <PlusIcon className="h-4 w-4" />
                <span>Share Trip</span>
              </Button>
              {isAuthenticated ? (
                <>
                  <button className="text-gray-700 hover:text-blue-600 transition-colors relative">
                    <BellIcon className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 cursor-pointer transition-colors"
                    >
                      {user?.avatar ? (
                        <Image
                          src={user.avatar}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="rounded-full"
                        />
                      ) : (
                        <UserCircleIcon className="h-8 w-8" />
                      )}
                    </button>{" "}
                    {showUserMenu && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                        </div>

                        <button
                          onClick={handleProfileClick}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <UserCircleIcon className="h-4 w-4" />
                          <span>Profile</span>
                        </button>

                        <button
                          onClick={handleSettingsClick}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                        >
                          <Cog6ToothIcon className="h-4 w-4" />
                          <span>Settings</span>
                        </button>

                        <div className="border-t border-gray-100 my-1"></div>

                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-red-50 flex items-center space-x-2"
                        >
                          <ArrowRightEndOnRectangleIcon className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="primary" size="sm">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10 pr-4 w-full"
            />
          </div>
        </div>
      </nav>

      <CreatePostForm
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onSubmit={handleCreatePost}
      />
    </>
  );
}
