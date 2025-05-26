import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Trip } from "@/types";
import {
  CalendarIcon,
  ChatBubbleLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CurrencyDollarIcon,
  HeartIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  StarIcon,
  TruckIcon,
} from "@heroicons/react/24/outline";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TripCardProps {
  trip: Trip;
  compact?: boolean;
}

const getTransportIcon = (transport: string) => {
  switch (transport) {
    case "air":
      return <PaperAirplaneIcon className="h-4 w-4" />;
    case "train":
      return <BuildingOfficeIcon className="h-4 w-4" />;
    case "bus":
      return <TruckIcon className="h-4 w-4" />;
    default:
      return <TruckIcon className="h-4 w-4" />;
  }
};

const getTransportLabel = (transport: string) => {
  switch (transport) {
    case "air":
      return "Flight";
    case "train":
      return "Train";
    case "bus":
      return "Bus";
    default:
      return "Bus";
  }
};

interface TripCardProps {
  trip: Trip;
  compact?: boolean;
}

export default function TripCard({ trip, compact = false }: TripCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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
        {/* Title */}
        <div className="flex items-start justify-between mb-3">
          <h3
            className={`font-semibold text-gray-900 line-clamp-2 ${
              compact ? "text-sm" : "text-lg"
            }`}
          >
            {trip.title}
          </h3>
        </div>

        {/* Starting Point and Destination */}
        <div className="flex items-center space-x-2 text-gray-600 mb-2">
          <MapPinIcon className="h-4 w-4 text-green-600" />
          <span className="text-sm">
            <span className="font-medium">{trip.startingPoint}</span>
            <span className="mx-2">→</span>
            <span className="font-medium">{trip.destination}</span>
          </span>
        </div>

        {/* Travel Dates */}
        <div className="flex items-center space-x-1 text-gray-600 mb-2">
          <CalendarIcon className="h-4 w-4 text-blue-600" />
          <span className="text-sm">
            {formatDate(trip.startDate, "MMM dd")} -{" "}
            {formatDate(trip.endDate, "MMM dd, yyyy")}
          </span>
        </div>

        {/* Transport and Accommodation */}
        <div className="flex items-center space-x-4 text-gray-600 mb-3">
          <div className="flex items-center space-x-1">
            {getTransportIcon(trip.transport)}
            <span className="text-sm">{getTransportLabel(trip.transport)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BuildingOfficeIcon className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium">
              {trip.accommodation === "ac" ? "AC" : "Non-AC"}
            </span>
          </div>
        </div>

        {/* Expandable Section for Budget */}
        {isExpanded && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <CurrencyDollarIcon className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Budget Plan
                </p>
                <p className="text-sm text-gray-600">
                  {trip.budgetDescription}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Author and Actions */}
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
            <div className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
              <HeartIcon className="h-4 w-4" />
              <span className="text-sm">{trip.likesCount}</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-blue-500 cursor-pointer">
              <ChatBubbleLeftIcon className="h-4 w-4" />
              <span className="text-sm">{trip.commentsCount}</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-yellow-500 cursor-pointer">
              <StarIcon className="h-4 w-4" />
              <span className="text-sm">{trip.interestedCount}</span>
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 hover:text-gray-700 cursor-pointer"
            >
              {isExpanded ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Tags */}
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
