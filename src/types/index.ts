export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  verified: boolean;
  followersCount: number;
  followingCount: number;
  tripsCount: number;
  joinedAt: Date;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  images: string[];
  tags: string[];
  isPublic: boolean;
  author: User;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: string;
  content: string;
  images: string[];
  location?: string;
  trip?: Trip;
  author: User;
  likesCount: number;
  commentsCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: Date;
  likesCount: number;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "trip_invite";
  message: string;
  fromUser: User;
  read: boolean;
  createdAt: Date;
}
