import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Image as ImageIcon } from "@/external/lucideReact";
import type { Message } from "@/lib/interfaces";
import { renderMessage } from "@/lib/render-messages";
import React, { useRef, useState } from "react";
import { md5 } from "@/lib/md5";

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
    onImageUpload: (images: ImageData[]) => void;
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
    onImageUpload,
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
                      return renderMessage(item.text!, isUser);
                    } else if (item.type === "image" && item.source?.type === "base64") {
                      const imageUrlFromBase64String = `data:${item.source.media_type};base64,${item.source.data}`;
  
                      return (
                        <img
                          key={index}
                          src={imageUrlFromBase64String}
                          alt="Screenshot"
                          className="max-w-full h-auto mt-2 rounded-lg"
                        />
                      );
                    }
                    return <></>;
                  })
                  : <></>}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
      } else if (typeof message.content === "string") {
        return renderMessage(message.content, isUser);
      } else if (Array.isArray(message.content)) {
        return message.content.map((item, index) => {
          if (item.type === "text") {
            return renderMessage(item.text!, isUser);
          } else if (item.type === "image" && item.source?.type === "base64") {
            const imageUrlFromBase64String = `data:${item.source.media_type};base64,${item.source.data}`;
  
            return (
              <img
                key={index}
                src={imageUrlFromBase64String}
                alt="Screenshot"
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
        onImageUpload([...images, ...newImages]);
      }
    };

    const processImage = async (file: File): Promise<ImageData> => {
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onload = async (e) => {
          try {
            const arrayBuffer = e.target?.result as ArrayBuffer;
            const blob = new Blob([arrayBuffer], { type: file.type });
            const base64Data = await blobToBase64(blob);
            const md5Body = md5(base64Data);
            const imageName = file.name;
            const url = `/my-cms/${md5Body}/${imageName}`;
            await fetch(url, { method: "PUT", body: arrayBuffer });
            resolve({
              imageName,
              url,
              src: URL.createObjectURL(blob),
              mediaType: file.type,
              data: base64Data,
            });
          } catch (error) {
            reject(new Error("Failed to process image"));
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsArrayBuffer(file);
      });
    };

    const blobToBase64 = (blob: Blob): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    };

    return (
      <div
        className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
        onDoubleClick={onDoubleClick}
      >
        <div
          className={`max-w-[80%] p-3 rounded-lg ${
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
          }`}
        >
          {isEditing
            ? (
              <div className="flex flex-col space-y-2">
                <Textarea
                  value={editInput}
                  onChange={(e) => setEditInput(e.target.value)}
                  className={isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"}
                />
                <div className="flex justify-between items-center">
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className={isDarkMode ? "bg-gray-600" : "bg-gray-200"}
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
                        key={index}
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
