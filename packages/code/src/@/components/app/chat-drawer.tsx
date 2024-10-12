import React, { useCallback, useMemo } from "react";
import { useSwipeable } from "react-swipeable";
import { Button } from "@/components/ui/button";
import { MessageInput } from "@/components/app/message-input";
import { Bot } from "@/external/lucideReact";
import type { ChatDrawerProps } from "@/lib/interfaces";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatContainer from "@/components/app/chat-container";
import { ChatHeader } from "@/components/app/chat-header";
import { cn } from "@/lib/utils";

const MemoizedChatHeader = React.memo(ChatHeader);
const MemoizedChatContainer = React.memo(ChatContainer);
const MemoizedMessageInput = React.memo(MessageInput);

export const ChatDrawer: React.FC<ChatDrawerProps & { codeSpace: string }> =
  React.memo(({
    isOpen,
    onClose,
    isDarkMode,
    toggleDarkMode,
    handleResetChat,
    messages,
    isStreaming,
    code,
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
    screenShot,
  }) => {
    const handlers = useSwipeable({
      onSwipedLeft: onClose,
      trackMouse: true,
    });

    const memoizedHandlers = useMemo(() => handlers, [onClose]);

    const handleButtonClick = useCallback(() => {
      onClose();
    }, [onClose]);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      },
      [onClose],
    );

    const drawerClassName = useMemo(() =>
      cn(
        "fixed top-0 right-0 h-full w-full sm:w-[638px] max-w-full z-[1001] transition-transform duration-300 ease-in-out",
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900",
        isOpen ? "translate-x-0" : "translate-x-full",
      ), [isDarkMode, isOpen]);

    const backdropClassName = useMemo(() =>
      cn(
        "fixed inset-0 bg-black bg-opacity-50 z-[1000] transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none",
      ), [isOpen]);

    const buttonClassName = useMemo(() =>
      cn(
        "fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]",
        isOpen ? "hidden" : "flex",
      ), [isOpen]);

    return (
      <>
        <Button
          onClick={handleButtonClick}
          className={buttonClassName}
        >
          <Bot className="h-6 w-6" />
        </Button>
        <div
          className={backdropClassName}
          onClick={handleBackdropClick}
        />
        <div
          {...memoizedHandlers}
          className={drawerClassName}
        >
          <div className="flex flex-col h-full">
            <MemoizedChatHeader
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              handleResetChat={handleResetChat}
              onClose={onClose}
            />
            <ScrollArea className="flex-grow">
              <MemoizedChatContainer
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
            <MemoizedMessageInput
              input={input}
              code={code}
              messages={messages}
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
      </>
    );
  });

ChatDrawer.displayName = "ChatDrawer";

export default ChatDrawer;
