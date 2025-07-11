import ChatContainer from "@/components/app/chat-container";
import { ChatHeader } from "@/components/app/chat-header";
import { MessageInput } from "@/components/app/message-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot } from "@/external/lucide-react";
import type { ChatDrawerProps } from "@/lib/interfaces";
import { cn } from "@/lib/utils";
import { handleSendMessage } from "@/workers/handle-chat-message";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Drawer } from "vaul";

// Constants
const SCROLL_THRESHOLD = 1;
const MESSAGES_END_MARKER_ID = "after-last-message";

/**
 * Determines if the scroll container is at or near the bottom
 */
const isScrollAtBottom = (container: HTMLDivElement): boolean => {
  return container.scrollHeight - container.scrollTop <=
    container.clientHeight + SCROLL_THRESHOLD;
};

/**
 * Scrolls to the bottom of the chat smoothly
 */
const scrollToBottom = (): void => {
  const lastMessageElement = document.getElementById(MESSAGES_END_MARKER_ID);
  lastMessageElement?.scrollIntoView({ behavior: "smooth" });
};

/**
 * Custom hook to manage chat scroll behavior
 * @param scrollAreaRef - Reference to the scroll container
 * @param messages - Array of chat messages
 * @param isStreaming - Whether the chat is currently streaming
 * @returns Object containing scroll state and methods
 */
const useChatScroll = (
  scrollAreaRef: React.RefObject<HTMLDivElement | null>,
  messages: unknown[],
  isStreaming: boolean,
) => {
  const [userScrolledUp, setUserScrolledUp] = useState(false);

  /**
   * Auto-scroll to bottom when new messages arrive, but only if:
   * 1. User is at the bottom of the chat
   * 2. User hasn't scrolled up during streaming
   */
  useEffect(() => {
    if (!messages.length) return;
    const container = scrollAreaRef.current;
    if (!container) return;

    // Prevent auto-scroll if streaming and user has manually scrolled up
    if (isStreaming && userScrolledUp) {
      return;
    }

    if (isScrollAtBottom(container)) {
      scrollToBottom();
    }
  }, [messages, isStreaming, userScrolledUp, scrollAreaRef]);

  /**
   * Track user scroll position to determine if they've scrolled up from bottom
   */
  useEffect(() => {
    const container = scrollAreaRef.current;
    if (!container) return;

    const handleScroll = () => {
      const isAtBottom = isScrollAtBottom(container);
      setUserScrolledUp(!isAtBottom);
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollAreaRef]);

  return { userScrolledUp };
};

export const ChatDrawer: React.FC<ChatDrawerProps> = React.memo((props) => {
  const {
    isOpen,
    onClose,
    isDarkMode,
    toggleDarkMode,
    handleResetChat,
    isStreaming,
    cSess,
    input,
    setInput,
    inputRef,
    isScreenshotLoading,
    screenshotImage,
    messages,
    handleScreenshotClick,
    handleCancelScreenshot,
    setEditingMessageId,
    editingMessageId,
    editInput,
    setEditInput,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
    screenshot,
  } = props;

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  // Use custom hook for scroll behavior management
  useChatScroll(scrollAreaRef, messages, isStreaming);

  // Memoize button class for performance
  const buttonClassName = useMemo(
    () =>
      cn(
        "fixed bottom-4 right-4 rounded-full w-12 h-12 p-0 z-[1001]",
        isOpen ? "hidden" : "flex",
      ),
    [isOpen],
  );

  /**
   * Handler for closing the drawer
   */
  const handleButtonClick = useCallback(() => {
    onClose();
  }, [onClose]);

  /**
   * Memoized handler for new prompts to prevent unnecessary re-renders
   */
  const handleNewPrompt = useCallback(async (prompt: string) => {
    await handleSendMessage({
      prompt,
      images: [],
      cSess,
    });
    setInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [cSess, setInput, inputRef]);

  return (
    <Drawer.Root
      direction="right"
      open={isOpen}
      modal={false}
      data-testid="chat-drawer"
    >
      <Drawer.Trigger
        onClick={handleButtonClick}
        className={cn(
          buttonClassName,
          "relative flex h-10 flex-shrink-0 items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-4 text-sm font-medium shadow-sm transition-all hover:bg-[#FAFAFA] dark:bg-[#161615] dark:hover:bg-[#1A1A19] dark:text-white",
        )}
      >
        <Bot className="h-6 w-6" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={cn(
            "fixed inset-y-0 right-0 z-10 outline-none flex",
            "w-full sm:w-[400px] md:w-[512px]",
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-800",
          )}
          style={{
            "--initial-transform": "translateX(100%)",
          } as React.CSSProperties}
        >
          <div
            className="flex flex-col h-full w-full"
            data-testid="chat-drawer"
          >
            <Drawer.Title className="sr-only">Chat Drawer</Drawer.Title>
            <Drawer.Description className="sr-only">
              A chat interface for interacting with the AI assistant. Contains message history and
              input field for new messages.
            </Drawer.Description>
            <ChatHeader
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
              handleResetChat={handleResetChat}
              onClose={onClose}
            />
            <ScrollArea
              className="flex-grow h-full overflow-hidden"
              ref={scrollAreaRef}
            >
              <ChatContainer
                messages={messages}
                editingMessageId={editingMessageId}
                editInput={editInput}
                setEditInput={setEditInput}
                handleCancelEdit={handleCancelEdit}
                handleSaveEdit={handleSaveEdit}
                handleEditMessage={handleEditMessage}
                isStreaming={isStreaming}
                setEditingMessageId={setEditingMessageId}
                onNewPrompt={handleNewPrompt}
                isDarkMode={isDarkMode}
              />
              <div
                id={MESSAGES_END_MARKER_ID}
                data-testid="messages-end-marker"
              />
            </ScrollArea>
            <MessageInput
              input={input}
              cSess={cSess}
              setInput={setInput}
              screenshot={screenshot}
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
