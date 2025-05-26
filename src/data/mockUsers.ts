// Mock users database for authentication
export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar: string;
  bio?: string;
}

export const mockUsers: MockUser[] = [
  {
    id: "1",
    email: "john@example.com",
    password: "password123",
    name: "John Traveler",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    bio: "Adventure seeker exploring the world one destination at a time",
  },
  {
    id: "2",
    email: "sarah@example.com",
    password: "travel2024",
    name: "Sarah Explorer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    bio: "Digital nomad sharing hidden gems and local experiences",
  },
  {
    id: "3",
    email: "mike@example.com",
    password: "wanderlust",
    name: "Mike Wanderer",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    bio: "Photography enthusiast capturing moments from around the globe",
  },
  {
    id: "4",
    email: "emma@example.com",
    password: "adventure123",
    name: "Emma Journey",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    bio: "Solo traveler inspiring others to step out of their comfort zone",
  },
  {
    id: "5",
    email: "alex@example.com",
    password: "explore2024",
    name: "Alex Nomad",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    bio: "Cultural enthusiast diving deep into local traditions and cuisines",
  },
];

// Function to authenticate user with email and password
export const authenticateUser = (
  email: string,
  password: string
): MockUser | null => {
  const user = mockUsers.find(
    (u) => u.email === email && u.password === password
  );
  return user || null;
};
