import React, { useRef, useState, useCallback, useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Image as ImageIcon } from "@/external/lucideReact";
import type { Message } from "@/lib/interfaces";
import { ChatMessageBlock } from "@/lib/render-messages";
import { cn } from "@/lib/utils";
import { processImage } from "@/lib/process-image";
import { md5 } from "@/lib/md5";

interface ImageData {
  imageName: string;
  url: string;
  src: string;
  mediaType: string;
  data: string;
}

interface ChatMessageProps {
  message: Message;
  isSelected: boolean;
  onDoubleClick: () => void;
  isEditing: boolean;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
  isDarkMode: boolean;
  codeSpace: string;
}

type MessageContent = Array<{ type: string; text?: string; image_url?: { url: string } }>;

const MessageContent: React.FC<{ content: string | MessageContent; isUser: boolean }> = React.memo(({ content, isUser }) => {
  const _content = useMemo(() => 
    typeof content === "string" ? [{ type: "text", text: content }] : content,
    [content]
  );
  
  return (
    <>
      {_content.map((item, index) => {
        if (item.type === "text" && item.text) {
          const hashText = `${index}--${md5(item.text)}`;
          return (
            <div key={hashText}>
              <ChatMessageBlock text={item.text} isUser={isUser} />
            </div>
          );
        } else if (item.type === "image_url" && item.image_url) {
          return (
            <img
              key={`image-${index}`}
              src={item.image_url.url}
              alt={item.image_url.url.includes(`screenshot`) ? "Screenshot" : "Image"}
              className="max-w-full h-auto mt-2 rounded-lg"
            />
          );
        }
        return null;
      })}
    </>
  );
});

const SystemMessage: React.FC<{ content: string | MessageContent; isUser: boolean }> = React.memo(({ content, isUser }) => (
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>System prompt</AccordionTrigger>
      <AccordionContent>
        <MessageContent content={content} isUser={isUser} />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
));

export const ChatMessage: React.FC<ChatMessageProps> = React.memo((props) => {
  const {
    message,
    isSelected,
    onDoubleClick,
    isEditing,
    editInput,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
    isDarkMode,
  } = props;

  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  const [images, setImages] = useState<ImageData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const renderContent = useMemo(() => {
    if (isSystem) {
      return <SystemMessage content={message.content} isUser={isUser} />;
    }
    return <MessageContent content={message.content} isUser={isUser} />;
  }, [isSystem, message.content, isUser]);

  const outerDivClassName = useMemo(
    () => cn("flex mb-4", isUser ? "justify-end" : "justify-start"),
    [isUser]
  );

  const messageContainerClassName = useMemo(
    () =>
      cn(
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
      ),
    [isUser, isDarkMode, isSelected]
  );

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        const newImages = await Promise.all(
          Array.from(files).map(processImage)
        );
        setImages((prevImages) => [...prevImages, ...newImages]);
      }
    },
    []
  );

  const textareaClassName = useMemo(
    () => cn(isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"),
    [isDarkMode]
  );

  const buttonBgClass = useMemo(
    () => cn(isDarkMode ? "bg-gray-600" : "bg-gray-200"),
    [isDarkMode]
  );

  const handleSaveEditClick = useCallback(() => handleSaveEdit(message.id), [handleSaveEdit, message.id]);

  const renderEditingContent = useCallback(() => (
    <div className="flex flex-col space-y-2">
      <Textarea
        value={editInput}
        onChange={(e) => setEditInput(e.target.value)}
        className={textareaClassName}
      />
      <div className="flex justify-between items-center">
        <Button
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          className={buttonBgClass}
        >
          <ImageIcon className="h-4 w-4 mr-2" />
          Add Image
        </Button>
        <div className="flex space-x-2">
          <Button size="sm" onClick={handleSaveEditClick}>
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
  ), [editInput, textareaClassName, buttonBgClass, handleSaveEditClick, handleCancelEdit, handleImageUpload, images]);

  return (
    <div className={outerDivClassName} onDoubleClick={onDoubleClick}>
      <div className={messageContainerClassName}>
        {isEditing ? renderEditingContent() : (
          <div className="break-words">{renderContent}</div>
        )}
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;