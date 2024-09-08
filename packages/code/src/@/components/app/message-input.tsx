import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Send, X, Upload } from "@/external/lucideReact";
import { useCodeSpace } from "@/hooks/use-code-space";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import type { MessageInputProps } from "@/lib/interfaces";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  handleSendMessage,
  isStreaming,
  inputRef,
  isScreenshotLoading,
  screenshotImage,
  handleScreenshotClick,
  handleCancelScreenshot,
  isDarkMode,
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    const images = [
      ...(screenshotImage ? [{
        type: "image/png",
        mediaType: "image/png",
        imageName: "screenshot.png",
        url: location.origin+'/live/'+useCodeSpace()+"/screenshot.png",
        data: screenshotImage,
        src: screenshotImage
      }] : []),
      ...uploadedImages.map(image => ({
        type: "image/png",
        mediaType: "image/png",
        imageName: "uploaded_image.png",
        url: image,
        data: image,
        src: image
      }))
    ];
    handleSendMessage(input, images);
    setInput(""); // Clear input after sending
    handleCancelScreenshot(); // Clear screenshot after sending
    setUploadedImages([]); // Clear uploaded images after sending
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedImages(prev => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files) {
      Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setUploadedImages(prev => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        }
      });
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  if (isStreaming) {
    return null; // Hide input when AI is typing
  }

  return (
    <div 
      className={cn("p-2 mt-auto", isDarkMode ? "bg-gray-800" : "bg-gray-100")}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col space-y-2">
        {(screenshotImage || uploadedImages.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {screenshotImage && (
              <div className="relative">
                <img src={screenshotImage} alt="Screenshot Preview" className="max-w-[100px] h-auto rounded-lg" />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={handleCancelScreenshot}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {uploadedImages.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Uploaded ${index}`} className="max-w-[100px] h-auto rounded-lg" />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => removeUploadedImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            className={cn(
              "flex-1 min-h-[40px] max-h-[120px] resize-none",
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"
            )}
            ref={inputRef}
          />
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={handleScreenshotClick}
                  variant={screenshotImage ? "secondary" : "outline"}
                  size="icon"
                  disabled={isScreenshotLoading}
                  className={cn(
                    "transition-all duration-300",
                    isScreenshotLoading ? "animate-pulse" : "",
                    "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600"
                  )}
                >
                  {isScreenshotLoading
                    ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary"></div>
                    : <Camera className="h-4 w-4" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <p>{screenshotImage ? "Remove screenshot" : "Attach screenshot"}</p>
              </PopoverContent>
            </Popover>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="icon"
                  className="bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600"
                >
                  <Upload className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <p>Upload image</p>
              </PopoverContent>
            </Popover>
            
            <Button
              onClick={handleSend}
              disabled={input.trim() === "" && !screenshotImage && uploadedImages.length === 0}
              size="icon"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        multiple
        className="hidden"
      />
    </div>
  );
};