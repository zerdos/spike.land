import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Send, Upload, X } from "@/external/lucide-react";

import { getCodeSpace } from "@/hooks/use-code-space";
import type { MessageInputProps } from "@/lib/interfaces";
import type { ImageData } from "@/lib/interfaces";
import { processImage } from "@/lib/process-image";
import { cn } from "@/lib/utils";
import { handleSendMessage } from "@/workers/handle-chat-message";
import React, { useRef, useState } from "react";

export const MessageInput: React.FC<MessageInputProps> = React.memo(({
  input,
  setInput,
  cSess: codeSession, // Renamed cSess to codeSession
  isStreaming,
  inputRef,
  screenshot,
  screenshotImage,
  handleCancelScreenshot,
  isDarkMode,
}) => {
  const [uploadedImages, setUploadedImages] = useState<ImageData[]>([]);
  const [isScreenshotLoading, setIsScreenshotLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Memoized handlers for performance and clarity
  const handleSend = React.useCallback(async () => {
    localStorage.setItem(
      "streaming-" + getCodeSpace(location.pathname),
      "true",
    );

    // Moved these lines to be before the try block to ensure they run even if handleSendMessage throws early
    setInput("");
    if (inputRef?.current) inputRef.current.value = "";
    handleCancelScreenshot();
    setUploadedImages([]);

    try {
      const result = await handleSendMessage({
        prompt: input,
        images: uploadedImages,
        cSess: codeSession, // Renamed cSess
      });
      await codeSession.setCode(result.code); // Renamed cSess
      return result;
    } finally {
      localStorage.setItem(
        "streaming-" + getCodeSpace(location.pathname),
        JSON.stringify(false),
      );
    }
  }, [
    input,
    uploadedImages,
    codeSession,
    setInput,
    inputRef,
    handleCancelScreenshot,
  ]); // Renamed cSess

  const handleImageUpload = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        Array.from(files).forEach((file) => {
          processImage(file).then((imageData) => {
            setUploadedImages((prev) => [...prev, imageData]);
          });
        });
      }
    },
    [],
  );

  const handleDragOver = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
    },
    [],
  );

  const makeScreenshot = React.useCallback(async () => {
    setIsScreenshotLoading(true);
    const imageData = await screenshot();
    setUploadedImages((prev) => [...prev, imageData]);
    setIsScreenshotLoading(false);
  }, [screenshot]);

  const handleDrop = React.useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files) {
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            processImage(file).then((imageData) => {
              setUploadedImages((prev) => [...prev, imageData]);
            });
          }
        });
      }
    },
    [],
  );

  const removeUploadedImage = React.useCallback((index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  // Keyboard handler for Enter to send
  const handleKeyPress = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  // Accessibility: aria-labels for buttons, alt text for images
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
                <img
                  src={screenshotImage}
                  alt="Screenshot Preview"
                  className="max-w-[100px] h-auto rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={handleCancelScreenshot}
                  aria-label="Remove screenshot"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {uploadedImages.map((image, index) => (
              <div key={image.src} className="relative">
                <img
                  src={image.src}
                  alt={`Uploaded image ${index + 1}`}
                  className="max-w-[100px] h-auto rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-1 right-1"
                  onClick={() => removeUploadedImage(index)}
                  aria-label={`Remove uploaded image ${index + 1}`}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end space-x-2">
          <Textarea
            data-testid="message-input"
            disabled={isStreaming}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className={cn(
              "flex-1 min-h-[40px] max-h-[120px] resize-none",
              isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900",
            )}
            ref={inputRef}
            aria-label="Message input"
          />
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={makeScreenshot}
                  variant={screenshotImage ? "secondary" : "outline"}
                  size="icon"
                  disabled={isScreenshotLoading}
                  aria-label="Attach screenshot"
                  className={cn(
                    "transition-all duration-300",
                    isScreenshotLoading ? "animate-pulse" : "",
                    "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600",
                  )}
                >
                  {isScreenshotLoading
                    ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-primary" />
                    )
                    : <Camera className="h-4 w-4" />}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-2">
                <p>
                  {screenshotImage ? "Remove screenshot" : "Attach screenshot"}
                </p>
              </PopoverContent>
            </Popover>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="icon"
                  aria-label="Upload image"
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
              data-testid="send-button"
              onClick={handleSend}
              disabled={isStreaming ||
                (input.trim() === "" && !screenshotImage &&
                  uploadedImages.length === 0)}
              size="icon"
              aria-label="Send message"
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
        aria-label="Upload image file"
      />
    </div>
  );
});
