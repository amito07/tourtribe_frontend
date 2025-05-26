import { Post, Trip, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    username: "sarahj_travels",
    email: "sarah@example.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Sarah%20Johnson",
    bio: "Travel photographer & blogger. Exploring the world one destination at a time 📸✈️",
    location: "San Francisco, CA",
    verified: true,
    followersCount: 2150,
    followingCount: 890,
    tripsCount: 23,
    joinedAt: new Date("2023-01-15"),
  },
  {
    id: "2",
    name: "Alex Chen",
    username: "alexc_explorer",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Alex%20Chen",
    bio: "Adventure seeker & digital nomad. Currently in Bali 🏝️",
    location: "Bali, Indonesia",
    verified: false,
    followersCount: 1350,
    followingCount: 456,
    tripsCount: 18,
    joinedAt: new Date("2023-03-20"),
  },
  {
    id: "3",
    name: "Maria Rodriguez",
    username: "maria_wanderlust",
    email: "maria@example.com",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Maria%20Rodriguez",
    bio: "Food & culture enthusiast. Sharing authentic travel experiences 🍜🗺️",
    location: "Barcelona, Spain",
    verified: true,
    followersCount: 3420,
    followingCount: 1200,
    tripsCount: 31,
    joinedAt: new Date("2022-11-10"),
  },
];

export const mockTrips: Trip[] = [
  {
    id: "1",
    title: "Northern Lights Adventure in Iceland",
    description:
      "An incredible 7-day journey through Iceland, chasing the aurora borealis and exploring stunning landscapes.",
    destination: "Iceland",
    startDate: new Date("2024-02-10"),
    endDate: new Date("2024-02-17"),
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1531168556467-80aace4d0144?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    ],
    tags: ["aurora", "winter", "photography", "adventure"],
    isPublic: true,
    author: mockUsers[0],
    likesCount: 156,
    commentsCount: 23,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "2",
    title: "Southeast Asia Backpacking",
    description:
      "A month-long backpacking adventure through Thailand, Vietnam, and Cambodia.",
    destination: "Southeast Asia",
    startDate: new Date("2024-03-01"),
    endDate: new Date("2024-03-30"),
    images: [
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop",
    ],
    tags: ["backpacking", "culture", "temples", "street-food"],
    isPublic: true,
    author: mockUsers[1],
    likesCount: 89,
    commentsCount: 12,
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-02-15"),
  },
];

export const mockPosts: Post[] = [
  {
    id: "1",
    content:
      "Just witnessed the most incredible sunrise over the Blue Lagoon! Iceland never ceases to amaze me 🌅 The geothermal waters were perfect after a night of aurora hunting.",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    ],
    location: "Blue Lagoon, Iceland",
    trip: mockTrips[0],
    author: mockUsers[0],
    likesCount: 42,
    commentsCount: 8,
    createdAt: new Date("2024-02-12"),
    updatedAt: new Date("2024-02-12"),
  },
  {
    id: "2",
    content:
      "Temple hopping in Angkor Wat today! The intricate details and rich history are absolutely mesmerizing. Definitely worth waking up at 4 AM for that sunrise 🏛️",
    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562602833-0ac0ac7705c5?w=800&h=600&fit=crop",
    ],
    location: "Angkor Wat, Cambodia",
    trip: mockTrips[1],
    author: mockUsers[1],
    likesCount: 67,
    commentsCount: 15,
    createdAt: new Date("2024-03-08"),
    updatedAt: new Date("2024-03-08"),
  },
  {
    id: "3",
    content:
      "Found this hidden gem of a cafe in Barcelona! The locals here know how to live ☕ Sometimes the best travel experiences happen when you get lost.",
    images: [
      "https://images.unsplash.com/photo-1559116315-702b0b4774ce?w=800&h=600&fit=crop",
    ],
    location: "Barcelona, Spain",
    author: mockUsers[2],
    likesCount: 28,
    commentsCount: 5,
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25"),
  },
];
