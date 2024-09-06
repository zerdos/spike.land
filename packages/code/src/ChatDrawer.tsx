import React, { useEffect, useState } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button } from "@/components/ui/button";
import { Bot } from "@/external/lucideReact";
import { ChatHeader, ChatContainer, MessageInput } from "./chat/components";
import { Message, ImageData } from "@/lib/interfaces";

import { ScrollArea } from "@/components/ui/scroll-area";


interface ChatDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  messages: Message[];
  isStreaming: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
  input: string;
  setInput: (input: string) => void;
  handleSendMessage: (content: string, images: ImageData[]) => Promise<void>;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  isScreenshotLoading: boolean;
  screenshotImage: string | null;
  handleScreenshotClick: () => void;
  handleCancelScreenshot: () => void;
  isMobile: boolean;
  editingMessageId: string | null;
  editInput: string;
  setEditInput: (input: string) => void;
  handleEditMessage: (messageId: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (messageId: string) => void;
}

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  handleResetChat,
  messages,
  isStreaming,
  messagesEndRef,
  input,
  setInput,
  handleSendMessage,
  inputRef,
  isScreenshotLoading,
  screenshotImage,
  handleScreenshotClick,
  handleCancelScreenshot,
  isMobile,
  editingMessageId,
  editInput,
  setEditInput,
  handleEditMessage,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  const [visibleHeight, setVisibleHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setVisibleHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Button
        onClick={onClose}
        className={`fixed ${isOpen ? 'hidden' : 'flex'} bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]`}
      >
        <Bot className="h-6 w-6" />
      </Button>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={onClose}
        onOpen={() => {}}
        hideBackdrop={true}
        swipeAreaWidth={30}
        disableBackdropTransition={false}
        classes={{
          paper: `w-full sm:w-[420px] max-w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`,
        }}
      >
        <div className="flex flex-col h-full" style={{ height: visibleHeight }}>
          <div className="flex-shrink-0">
            <ChatHeader
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              handleResetChat={handleResetChat}
              onClose={onClose}
            />
          </div>
          <ScrollArea className="flex-grow overflow-y-auto">
            <ChatContainer
              messages={messages}
              editingMessageId={editingMessageId}
              editInput={editInput}
              setEditInput={setEditInput}
              handleCancelEdit={handleCancelEdit}
              handleSaveEdit={handleSaveEdit}
              handleEditMessage={handleEditMessage}
              isStreaming={isStreaming}
              isDarkMode={isDarkMode}
              messagesEndRef={messagesEndRef}
            />
          </ScrollArea>
          <div className="flex-shrink-0">
            <MessageInput
              input={input}
              setInput={setInput}
              handleSendMessage={handleSendMessage}
              isStreaming={isStreaming}
              inputRef={inputRef}
              isScreenshotLoading={isScreenshotLoading}
              screenshotImage={screenshotImage}
              handleScreenshotClick={handleScreenshotClick}
              handleCancelScreenshot={handleCancelScreenshot}
              isDarkMode={isDarkMode}
            />
          </div>
        </div>
      </SwipeableDrawer>
    </>
  );
};