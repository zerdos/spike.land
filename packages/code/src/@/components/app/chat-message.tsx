import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Image as ImageIcon } from "@/external/lucideReact";
import type { Message } from "@/lib/interfaces";
import { renderMessage } from "@/lib/render-messages";
import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { processImage } from "@/lib/process-image";

interface ImageData {
  imageName: string;
  url: string;
  src: string;
  mediaType: string;
  data: string;
}

export const ChatMessage: React.FC<{
    message: Message;
    isSelected: boolean;
    onDoubleClick: () => void;
    isEditing: boolean;
    editInput: string;
    setEditInput: (value: string) => void;
    handleCancelEdit: () => void;
    handleSaveEdit: (id: string) => void;
    isDarkMode: boolean;
  }> = React.memo(({
    message,
    isSelected,
    onDoubleClick,
    isEditing,
    editInput,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
    isDarkMode,
  }) => {
    const isUser = message.role === "user";
    const isSystem = message.role === "system";
  
    const renderContent = () => {
      if (isSystem) {
        return (
          <Accordion
            type="single"
            collapsible
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>System prompt</AccordionTrigger>
              <AccordionContent>
                {typeof message.content === "string"
                  ? renderMessage(message.content, isUser)
                  : Array.isArray(message.content)
                  ? message.content.map((item, index) => {
                    if (item.type === "text") {
                      return <div key={`text-${index}`}>{renderMessage(item.text!, isUser)}</div>;
                    } else  if (item.type === "image_url") {
            return (
              <img
                key={`image-${index}`}
                src={item.image_url?.url}
                alt={item.image_url?.url.includes(`screenshot`) ? "Screenshot" : "Image"}
                className="max-w-full h-auto mt-2 rounded-lg"
              />
            );
                    }
                    return null;
                  })
                  : null}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      } else if (typeof message.content === "string") {
        return renderMessage(message.content, isUser);
      } else if (Array.isArray(message.content)) {
        return message.content.map((item, index) => {
          if (item.type === "text") {
            return <div key={`text-${index}`}>{renderMessage(item.text!, isUser)}</div>;
          } else if (item.type === "image_url") {
            return (
              <img
                key={`image-${index}`}
                src={item.image_url?.url}
                alt={item.image_url?.url.includes(`screenshot`) ? "Screenshot" : "Image"}
                className="max-w-full h-auto mt-2 rounded-lg"
              />
            );
          }
          return null;
        });
      }
      return null;
    };
  
    const [images, setImages] = useState<ImageData[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const newImages = await Promise.all(Array.from(files).map(processImage));
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    };


    return (
      <div
        className={cn("flex mb-4", isUser ? "justify-end" : "justify-start")}
        onDoubleClick={onDoubleClick}
      >
        <div
          className={cn(
            "max-w-[80%] p-3 rounded-lg",
            isUser
              ? isDarkMode
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
              : isDarkMode
              ? isSelected
                ? "bg-gray-700 ring-2 ring-blue-500"
                : "bg-gray-800 text-white"
              : isSelected
              ? "bg-gray-200 ring-2 ring-blue-500"
              : "bg-gray-100"
          )}
        >
          {isEditing
            ? (
              <div className="flex flex-col space-y-2">
                <Textarea
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className={cn(isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900")}
                />
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(isDarkMode ? "bg-gray-600" : "bg-gray-200")}
                  >
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={() => handleSaveEdit(message.id)}>
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  ref={fileInputRef}
                  multiple
                />
                {images.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {images.map((img, index) => (
                      <img
                        key={`uploaded-${index}`}
                        src={img.src}
                        alt={`Uploaded ${index}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            )
            : (
              <div className="break-words">
                {renderContent()}
              </div>
            )}
        </div>
      </div>
    );
  });