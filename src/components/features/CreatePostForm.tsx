"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Modal from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { ShareTripData } from "@/types";
import {
  BuildingOfficeIcon,
  CalendarIcon,
  CloudArrowUpIcon,
  CurrencyDollarIcon,
  MapPinIcon,
  PaperAirplaneIcon,
  TruckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCallback, useState } from "react";

interface CreatePostFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tripData: ShareTripData) => void;
}

export default function CreatePostForm({
  isOpen,
  onClose,
  onSubmit,
}: CreatePostFormProps) {
  const [formData, setFormData] = useState<ShareTripData>({
    title: "",
    image: null,
    transport: "bus",
    accommodation: "ac",
    fromDate: "",
    toDate: "",
    destination: "",
    startingPoint: "",
    budgetDescription: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Handle drag events
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  // Handle drop
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  }, []);

  // Handle file input
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0]);
    }
  };

  // Process image upload (in real app, this would upload to cloud storage)
  const handleImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Create preview URL
    const imageUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, image: imageUrl }));
  };

  const removeImage = () => {
    if (formData.image) {
      URL.revokeObjectURL(formData.image);
      setFormData((prev) => ({ ...prev, image: null }));
    }
  };

  const handleInputChange = (field: keyof ShareTripData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.title.trim() ||
      !formData.destination.trim() ||
      !formData.startingPoint.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);

      // Reset form
      setFormData({
        title: "",
        image: null,
        transport: "bus",
        accommodation: "ac",
        fromDate: "",
        toDate: "",
        destination: "",
        startingPoint: "",
        budgetDescription: "",
      });
      onClose();
    } catch (error) {
      console.error("Failed to share trip:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Your Trip" size="xl">
      <div className="max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="space-y-6 p-1">
          {/* Photo Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Trip Photo <span className="text-red-500">*</span>
            </label>

            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Trip preview"
                  className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <span className="mt-2 block text-sm font-medium text-gray-900">
                      Drag and drop your trip photo here, or{" "}
                      <span className="text-blue-600 hover:text-blue-500">
                        browse
                      </span>
                    </span>
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleFileInput}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Trip Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Trip Title <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="e.g., Amazing Weekend in Goa"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full"
              required
            />
          </div>

          {/* Transport and Accommodation Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Transport Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Transport Mode <span className="text-red-500">*</span>
              </label>{" "}
              <div className="space-y-2">
                {[
                  { value: "bus", label: "Bus", icon: TruckIcon },
                  { value: "train", label: "Train", icon: BuildingOfficeIcon },
                  { value: "air", label: "Flight", icon: PaperAirplaneIcon },
                ].map(({ value, label, icon: Icon }) => (
                  <label
                    key={value}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="transport"
                      value={value}
                      checked={formData.transport === value}
                      onChange={(e) =>
                        handleInputChange("transport", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <Icon className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* AC/Non-AC Options */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                Accommodation Type <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {[
                  { value: "ac", label: "AC" },
                  { value: "non-ac", label: "Non-AC" },
                ].map(({ value, label }) => (
                  <label
                    key={value}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="accommodation"
                      value={value}
                      checked={formData.accommodation === value}
                      onChange={(e) =>
                        handleInputChange("accommodation", e.target.value)
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Travel Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                From Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.fromDate}
                  onChange={(e) =>
                    handleInputChange("fromDate", e.target.value)
                  }
                  className="pl-10"
                  required
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                To Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.toDate}
                  onChange={(e) => handleInputChange("toDate", e.target.value)}
                  className="pl-10"
                  required
                />
                <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Starting Point <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g., Mumbai, Delhi"
                  value={formData.startingPoint}
                  onChange={(e) =>
                    handleInputChange("startingPoint", e.target.value)
                  }
                  className="pl-10"
                  required
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Destination <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="e.g., Goa, Kerala, Manali"
                  value={formData.destination}
                  onChange={(e) =>
                    handleInputChange("destination", e.target.value)
                  }
                  className="pl-10"
                  required
                />
                <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Budget Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Budget Plan & Description
            </label>
            <div className="relative">
              <Textarea
                placeholder="Describe your budget breakdown - accommodation, food, transport, activities, etc. Share tips on how to save money or must-spend experiences..."
                value={formData.budgetDescription}
                onChange={(e) =>
                  handleInputChange("budgetDescription", e.target.value)
                }
                className="min-h-[100px] pl-10 resize-none"
              />
              <CurrencyDollarIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.destination.trim() ||
                !formData.startingPoint.trim()
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sharing...
                </>
              ) : (
                "Share Trip"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
