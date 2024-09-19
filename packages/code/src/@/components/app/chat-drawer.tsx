import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { Button } from "@/components/ui/button";
import { MessageInput } from "@/components/app/message-input";
import { Bot } from "@/external/lucideReact";
import type { ChatDrawerProps } from "@/lib/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatContainer from "@/components/app/chat-container";
import { ChatHeader } from '@/components/app/chat-header';  
import { cn } from "@/lib/utils";

export const ChatDrawer: React.FC<ChatDrawerProps & { codeSpace: string }> = ({
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
  codeSpace,
  screenShot
}) => {
  
  const handlers = useSwipeable({
    onSwipedLeft: onClose,
    trackMouse: true,
  });

  return (
    <>
      <Button
        onClick={onClose}
        className={cn(
          "fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]",
          isOpen ? 'hidden' : 'flex'
        )}
      >
        <Bot className="h-6 w-6" />
      </Button>
      <div
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-[1000] transition-opacity duration-300",
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />
      <div
        {...handlers}
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[638px] max-w-full z-[1001] transition-transform duration-300 ease-in-out",
          isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
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
                codeSpace={codeSpace}
              />
                <div id="after-last-message" />
            </ScrollArea>
            <div className="flex-shrink-0">
              <MessageInput
                input={input}
                setInput={setInput}
                screenShot={screenShot}
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
      </div>
    </>
  );
};