"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { MapPinIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface CreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (postData: CreatePostData) => void;
}

interface CreatePostData {
  content: string;
  images: string[];
  location?: string;
}

export default function CreatePostForm({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostFormProps) {
  const [content, setContent] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      await onSubmit({
        content: content.trim(),
        images,
        location: location.trim() || undefined,
      });

      // Reset form
      setContent("");
      setLocation("");
      setImages([]);
      onClose();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddImage = () => {
    // In a real app, this would open a file picker
    const mockImageUrl = `https://images.unsplash.com/photo-${Math.floor(
      Math.random() * 1000000000
    )}?w=400&h=300&fit=crop`;
    setImages([...images, mockImageUrl]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a Post" size="lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Textarea
            placeholder="What's your travel story? Share your experiences, tips, or ask questions..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[120px] resize-none"
            required
          />
        </div>

        <div>
          <Input
            type="text"
            placeholder="Add location (optional)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
          <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <XMarkIcon className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleAddImage}
              className="flex items-center space-x-2"
            >
              <PhotoIcon className="h-4 w-4" />
              <span>Add Photo</span>
            </Button>
          </div>

          <div className="flex items-center space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={!content.trim() || isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
