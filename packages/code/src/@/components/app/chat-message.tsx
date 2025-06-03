import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Check, Image as ImageIcon, X } from "@/external/lucide-react";
import type { Message, MessageContent, MessagePart } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { processImage } from "@/lib/process-image";
import { ChatMessageBlock } from "@/lib/render-messages";
import { cn } from "@/lib/utils";
import React, { useCallback, useMemo, useRef, useState } from "react";

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
  onNewPrompt: (prompt: string) => void;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
  isDarkMode: boolean;
}

/**
 * Helper to display text or images.
 */
const MessageContent = React.memo<{
  content: MessageContent;
  isUser: boolean;
  onNewPrompt: (prompt: string) => void;
}>(({ content, isUser, onNewPrompt }) => {
  const parsedContent = useMemo(() => {
    return typeof content === "string"
      ? [{ type: "text", text: content }]
      : content;
  }, [content]) as MessagePart[];

  return (
    <>
      {parsedContent.map((item, index) => {
        if (item.type === "text" && item.text) {
          const hashedKey = `${index}--${md5(item.text)}`;
          return (
            <div key={hashedKey}>
              <ChatMessageBlock
                text={item.text}
                isUser={isUser}
                onNewPrompt={onNewPrompt}
              />
            </div>
          );
        } else if (item.type === "image_url" && item.image_url) {
          const { url } = item.image_url;
          return (
            <img
              key={`image-${index}`}
              src={url}
              alt={url.includes("screenshot") ? "Screenshot" : "Image"}
              className="max-w-full h-auto mt-2 rounded-lg"
            />
          );
        }
        return null;
      })}
    </>
  );
});

/**
 * System message with Accordion to show the system prompt.
 */
const SystemMessage = React.memo<{
  content: MessageContent;
  isUser: boolean;
}>(({ content, isUser }) => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>System prompt</AccordionTrigger>
        <AccordionContent>
          <MessageContent
            onNewPrompt={() => {}}
            content={content}
            isUser={isUser}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
});

export const ChatMessage = React.memo<ChatMessageProps>((props) => {
  const {
    message,
    isSelected,
    onDoubleClick,
    isEditing,
    editInput,
    onNewPrompt,
    setEditInput,
    handleCancelEdit,
    handleSaveEdit,
    isDarkMode,
  } = props;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ImageData[]>([]);

  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  /**
   * Content rendering logic
   */
  const contentRenderer = useMemo(() => {
    if (isSystem) {
      return <SystemMessage content={message.content} isUser={isUser} />;
    }
    return (
      <MessageContent
        onNewPrompt={onNewPrompt}
        content={message.content}
        isUser={isUser}
      />
    );
  }, [message.content, isSystem, isUser, onNewPrompt]);

  /**
   * Classnames
   */
  const outerDivClassName = useMemo(
    () => cn("flex mb-4", isUser ? "justify-end" : "justify-start"),
    [isUser],
  );

  const messageContainerClassName = useMemo(() => {
    const userDark = isUser && isDarkMode;
    const userLight = isUser && !isDarkMode;
    const systemDark = !isUser && isDarkMode;

    return cn(
      "max-w-[90%] p-3 rounded-lg",
      // If it's user
      userDark ? "bg-blue-600 text-white" : userLight
        ? "bg-blue-500 text-white"
        // Otherwise system
        : systemDark
        ? isSelected
          ? "bg-gray-700 ring-2 ring-blue-500"
          : "bg-gray-800 text-white"
        : isSelected
        ? "bg-gray-200 ring-2 ring-blue-500"
        : "bg-gray-100",
    );
  }, [isUser, isDarkMode, isSelected]);

  /**
   * Image upload
   */
  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.target;
      if (files?.length) {
        const processed = await Promise.all(
          Array.from(files).map(processImage),
        );
        setImages((prev) => [...prev, ...processed]);
      }
    },
    [],
  );

  /**
   * Editing logic
   */
  const textareaClassName = useMemo(
    () => cn(isDarkMode ? "bg-gray-700 text-white" : "bg-white text-gray-900"),
    [isDarkMode],
  );

  const buttonBgClass = useMemo(
    () => cn(isDarkMode ? "bg-gray-600" : "bg-gray-200"),
    [isDarkMode],
  );

  const handleSaveEditClick = useCallback(() => handleSaveEdit(message.id), [
    handleSaveEdit,
    message.id,
  ]);

  const renderEditingContent = useCallback(() => {
    return (
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
            {images.map((img, idx) => (
              <img
                key={`uploaded-${idx}`}
                src={img.src}
                alt={`Uploaded ${idx}`}
                className="w-16 h-16 object-cover rounded"
              />
            ))}
          </div>
        )}
      </div>
    );
  }, [
    editInput,
    textareaClassName,
    buttonBgClass,
    handleImageUpload,
    handleCancelEdit,
    handleSaveEditClick,
    images,
    setEditInput,
  ]);

  return (
    <div className={outerDivClassName} onDoubleClick={onDoubleClick}>
      <div className={messageContainerClassName}>
        {isEditing
          ? (
            renderEditingContent()
          )
          : <div className="break-words">{contentRenderer}</div>}
      </div>
    </div>
  );
});

ChatMessage.displayName = "ChatMessage";

export default ChatMessage;
