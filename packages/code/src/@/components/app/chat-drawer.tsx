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
import { Drawer } from 'vaul';
import { css } from '@emotion/react'; 

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



    const handleButtonClick = useCallback(() => {
      onClose();
    }, [onClose]);

  


    const buttonClassName = useMemo(() =>
      cn(
        "fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]",
        isOpen ? "hidden" : "flex",
      ), [isOpen]);

    return (
      <Drawer.Root direction="right" open={isOpen} modal={false}>
      <Drawer.Trigger className="relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white">

        <Button
          onClick={handleButtonClick}
          className={buttonClassName}
        >
          <Bot className="h-6 w-6" />
        </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content 
        css={css`
          background-color: rgb(31 41 55);
        `}
        
          className="right-0 top-0 bottom-0 fixed z-10 outline-none w-[512px] flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ '--initial-transform': 'calc(100% + 8px)' } as React.CSSProperties}
        >
          <div className="flex flex-col h-full w-full">
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
</Drawer.Content>
</Drawer.Portal>
</Drawer.Root>
    );
  });

ChatDrawer.displayName = "ChatDrawer";

export default ChatDrawer;
