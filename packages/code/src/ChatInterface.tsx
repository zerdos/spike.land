import { ChatDrawer } from "@/components/app/chat-drawer";
import { useLocalStorage } from "@/external/use-local-storage";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useDictation } from "@/hooks/use-dictation";
import type { ICode } from "@/lib/interfaces";
import type { ImageData, Message } from "@/lib/interfaces";
import { handleSendMessage } from "@/workers/handle-chat-message";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useScreenshot } from "./hooks/useScreenshot";

const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  codeSpace: string;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }): React.ReactElement => {
  const [messages, setMessages] = useState<Message[]>(cSess.getMessages());
  // const [session, setSession] = useState<ICodeSession | null>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => cSess.sub((session) => setMessages(session.messages)), []);

  const codeSpace = cSess.getCodeSpace();
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(
    `streaming-${codeSpace}`,
    false,
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStreaming) {
      timeoutRef.current = setTimeout(() => {
        setIsStreaming(false);
      }, 5000);
    }
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isStreaming, setIsStreaming]);

  const [input, setInput] = useDictation("");

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const resetChat = useCallback((): void => {
    cSess.removeMessages();
    setMessages([]);
    setInput("");
    setEditingMessageId(null);
    setEditInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setInput]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById("after-last-message")?.scrollIntoView({
          behavior: "instant",
          block: "end",
        });
      });
    }
  }, [isOpen]);

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditInput("");
  }, []);

  const handleSaveEdit = useCallback((messageId: string) => {
    const messages = cSess.getMessages();
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
    if (messageIndex === -1) {
      console.error("Invalid message for editing");
      return;
    }

    const messageToEdit = messages[messageIndex];

    if (!messageToEdit || messageToEdit.role === "assistant") {
      console.error("Invalid message for editing");
      return;
    }

    // Create new message with updated content
    const updatedMessage = {
      ...messageToEdit,
      content: editInput,
    };

    // Finally add the updated message
    cSess.addMessage(updatedMessage);

    setEditingMessageId(null);
    setEditInput("");
  }, [editInput, cSess]);

  const handleResetChat = useCallback((): void => {
    resetChat();
    setIsStreaming(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [resetChat, setIsStreaming]);

  const {
    isScreenshotLoading,
    screenshotImage,
    handleScreenshotClick,
    handleCancelScreenshot,
  } = useScreenshot(codeSpace);

  useEffect(() => {
    if (codeSpace.includes("-")) {
      const maybeKey = codeSpace.split("-")[1];
      const storedData = sessionStorage.getItem(maybeKey);
      if (storedData) {
        const { prompt, images } = JSON.parse(storedData) as {
          prompt: string;
          images: ImageData[];
        };
        sessionStorage.removeItem(maybeKey);

        cSess.getSession().then((_currentSession) => {
          handleSendMessage({
            prompt,
            images,
            cSess,
          });
        });
      }
    }
  }, [isOpen, codeSpace, setInput, cSess]);

  const memoizedSetEditInput = useCallback((value: string): void => {
    setEditInput(value);
  }, []);

  const memoizedScreenshot = useCallback(
    (): Promise<ImageData> => cSess.screenshot(),
    [cSess],
  );

  if (!isOpen) return <></>;

  return (
    <ChatDrawer
      isOpen={isOpen}
      setEditingMessageId={setEditingMessageId}
      onClose={onClose}
      messages={messages}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      handleResetChat={handleResetChat}
      isStreaming={!!isStreaming}
      input={input}
      setInput={setInput}
      cSess={cSess}
      inputRef={inputRef}
      isScreenshotLoading={isScreenshotLoading}
      screenshotImage={screenshotImage}
      handleScreenshotClick={handleScreenshotClick}
      handleCancelScreenshot={handleCancelScreenshot}
      editingMessageId={editingMessageId}
      editInput={editInput}
      setEditInput={memoizedSetEditInput}
      handleEditMessage={(_messageId: string) => {}}
      handleCancelEdit={handleCancelEdit}
      handleSaveEdit={handleSaveEdit}
      screenshot={memoizedScreenshot}
    />
  );
});

ChatInterface.displayName = "ChatInterface";

export { ChatInterface };
