import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeDate } from "@/lib/utils";
import { Post } from "@/types";
import {
  ChatBubbleLeftIcon,
  HeartIcon,
  MapPinIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface PostCardProps {
  post: Post;
  onLike?: (postId: string) => void;
  onComment?: (postId: string) => void;
  onShare?: (postId: string) => void;
}

export default function PostCard({
  post,
  onLike,
  onComment,
  onShare,
}: PostCardProps) {
  const handleLike = () => onLike?.(post.id);
  const handleComment = () => onComment?.(post.id);
  const handleShare = () => onShare?.(post.id);

  return (
    <Card className="w-full max-w-2xl">
      <CardContent className="p-0">
        {/* Post Header */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Image
              src={
                post.author.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${post.author.name}`
              }
              alt={post.author.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900">
                  {post.author.name}
                </h3>
                {post.author.verified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500">@{post.author.username}</p>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {formatRelativeDate(post.createdAt)}
          </div>
        </div>

        {/* Post Content */}
        <div className="px-4 pb-3">
          <p className="text-gray-900 mb-3">{post.content}</p>

          {/* Location */}
          {post.location && (
            <div className="flex items-center space-x-1 text-sm text-gray-500 mb-3">
              <MapPinIcon className="h-4 w-4" />
              <span>{post.location}</span>
            </div>
          )}

          {/* Trip Tag */}
          {post.trip && (
            <div className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-3">
              From trip: {post.trip.title}
            </div>
          )}
        </div>

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className="relative">
            {post.images.length === 1 ? (
              <Image
                src={post.images[0]}
                alt="Post image"
                width={600}
                height={400}
                className="w-full h-64 sm:h-80 object-cover"
              />
            ) : (
              <div className="grid grid-cols-2 gap-1">
                {post.images.slice(0, 4).map((image, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={image}
                      alt={`Post image ${index + 1}`}
                      width={300}
                      height={200}
                      className="w-full h-32 object-cover"
                    />
                    {index === 3 && post.images.length > 4 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          +{post.images.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Post Actions */}
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className="flex items-center space-x-2 text-gray-500 hover:text-red-500"
              >
                <HeartIcon className="h-5 w-5" />
                <span>{post.likesCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleComment}
                className="flex items-center space-x-2 text-gray-500 hover:text-blue-500"
              >
                <ChatBubbleLeftIcon className="h-5 w-5" />
                <span>{post.commentsCount}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="flex items-center space-x-2 text-gray-500 hover:text-green-500"
              >
                <ShareIcon className="h-5 w-5" />
                <span>Share</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
