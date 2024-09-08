import React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button } from "@/components/ui/button";
import { MessageInput } from "@/components/app/message-input";
import { Bot } from "@/external/lucideReact";
import { ChatHeader, ChatContainer } from "./chat/components";
import type { ChatDrawerProps } from "@/lib/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";

export const ChatDrawer: React.FC<ChatDrawerProps> = ({
  isOpen,
  onClose,
  isDarkMode,
  toggleDarkMode,
  handleResetChat,
  messages,
  isStreaming,
  input,
  setInput,
  handleSendMessage,
  inputRef,
  isScreenshotLoading,
  screenshotImage,
  handleScreenshotClick,
  handleCancelScreenshot,
  editingMessageId,
  editInput,
  setEditInput,
  handleEditMessage,
  handleCancelEdit,
  handleSaveEdit,
}) => {
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
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0">
            <ChatHeader
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              handleResetChat={handleResetChat}
              onClose={onClose}
            />
          </div>
          <div className="flex-grow flex flex-col overflow-hidden">
            <ScrollArea className="flex-grow">
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
              />
              <div id="typing-indicator" />
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
        </div>
      </SwipeableDrawer>
    </>
  );
};