import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Trip } from "@/types";
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  HeartIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface TripCardProps {
  trip: Trip;
  compact?: boolean;
}

export default function TripCard({ trip, compact = false }: TripCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-200">
      <div className="relative">
        <Image
          src={trip.images[0]}
          alt={trip.title}
          width={400}
          height={compact ? 150 : 200}
          className={`w-full object-cover ${compact ? "h-32" : "h-48"}`}
        />
        <div className="absolute top-2 right-2">
          <span className="bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
            {trip.images.length} photos
          </span>
        </div>
      </div>

      <CardContent className={compact ? "p-3" : "p-4"}>
        <div className="flex items-start justify-between mb-2">
          <h3
            className={`font-semibold text-gray-900 line-clamp-2 ${
              compact ? "text-sm" : "text-lg"
            }`}
          >
            {trip.title}
          </h3>
        </div>

        <div className="flex items-center space-x-1 text-gray-500 mb-2">
          <MapPinIcon className="h-4 w-4" />
          <span className="text-sm">{trip.destination}</span>
        </div>

        <div className="flex items-center space-x-1 text-gray-500 mb-3">
          <CalendarIcon className="h-4 w-4" />
          <span className="text-sm">
            {formatDate(trip.startDate, "MMM dd")} -{" "}
            {formatDate(trip.endDate, "MMM dd, yyyy")}
          </span>
        </div>

        {!compact && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {trip.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Link
            href={`/profile/${trip.author.username}`}
            className="flex items-center space-x-2"
          >
            <Image
              src={
                trip.author.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${trip.author.name}`
              }
              alt={trip.author.name}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-700">{trip.author.name}</span>
          </Link>

          <div className="flex items-center space-x-3 text-gray-500">
            <div className="flex items-center space-x-1">
              <HeartIcon className="h-4 w-4" />
              <span className="text-sm">{trip.likesCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <ChatBubbleLeftIcon className="h-4 w-4" />
              <span className="text-sm">{trip.commentsCount}</span>
            </div>
          </div>
        </div>

        {trip.tags && trip.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {trip.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
            {trip.tags.length > 3 && (
              <span className="text-gray-500 text-xs">
                +{trip.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
