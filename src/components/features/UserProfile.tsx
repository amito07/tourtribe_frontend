import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { User } from "@/types";
import {
  CalendarIcon,
  CheckBadgeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface UserProfileProps {
  user: User;
  isCurrentUser?: boolean;
  compact?: boolean;
}

export default function UserProfile({
  user,
  isCurrentUser = false,
  compact = false,
}: UserProfileProps) {
  if (compact) {
    return (
      <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
        <Image
          src={
            user.avatar ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
          }
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-1">
            <h3 className="font-semibold text-gray-900 truncate">
              {user.name}
            </h3>
            {user.verified && (
              <CheckBadgeIcon className="h-4 w-4 text-blue-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-gray-500 truncate">@{user.username}</p>
          {user.location && (
            <div className="flex items-center space-x-1 mt-1">
              <MapPinIcon className="h-3 w-3 text-gray-400" />
              <span className="text-xs text-gray-500 truncate">
                {user.location}
              </span>
            </div>
          )}
        </div>
        <Button variant="outline" size="sm">
          {isCurrentUser ? "Edit" : "Follow"}
        </Button>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
          <Image
            src={
              user.avatar ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
            }
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full"
          />

          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-2 mb-2">
              <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
              {user.verified && (
                <CheckBadgeIcon className="h-6 w-6 text-blue-500" />
              )}
            </div>

            <p className="text-lg text-gray-600 mb-2">@{user.username}</p>

            {user.bio && (
              <p className="text-gray-700 mb-4 max-w-md">{user.bio}</p>
            )}

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm text-gray-500 mb-4">
              {user.location && (
                <div className="flex items-center space-x-1">
                  <MapPinIcon className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Joined {formatDate(user.joinedAt, "MMM yyyy")}</span>
              </div>
            </div>

            <div className="flex items-center justify-center sm:justify-start space-x-6 mb-4">
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">
                  {user.tripsCount}
                </div>
                <div className="text-sm text-gray-500">Trips</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">
                  {user.followersCount}
                </div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-lg text-gray-900">
                  {user.followingCount}
                </div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              {isCurrentUser ? (
                <>
                  <Button variant="primary">Edit Profile</Button>
                  <Button variant="outline">Share Profile</Button>
                </>
              ) : (
                <>
                  <Button variant="primary">Follow</Button>
                  <Button variant="outline">Message</Button>
                </>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
