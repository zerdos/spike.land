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
  codeSession: ICode; // Renamed from cSess
  codeSpace: string;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, codeSession }): React.ReactElement => { // Renamed from cSess
  const [messages, setMessages] = useState<Message[]>(codeSession.getMessages()); // Renamed from cSess
  // const [session, setSession] = useState<ICodeSession | null>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => codeSession.sub((session) => setMessages(session.messages)), [codeSession]); // Renamed from cSess and added to deps

  const localCodeSpace = codeSession.getCodeSpace(); // Renamed from cSess, used local var to avoid conflict with prop
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(
    `streaming-${localCodeSpace}`,
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
    codeSession.removeMessages(); // Renamed from cSess
    setMessages([]);
    setInput("");
    setEditingMessageId(null);
    setEditInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setInput, codeSession]); // Renamed from cSess and added to deps

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
    const currentMessages = codeSession.getMessages(); // Renamed from cSess
    const messageIndex = currentMessages.findIndex((msg) => msg.id === messageId);
    if (messageIndex === -1) {
      console.error("Invalid message for editing");
      return;
    }

    const messageToEdit = currentMessages[messageIndex];

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
    codeSession.addMessage(updatedMessage); // Renamed from cSess

    setEditingMessageId(null);
    setEditInput("");
  }, [editInput, codeSession]); // Renamed from cSess and added to deps

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
  } = useScreenshot(localCodeSpace); // Used localCodeSpace

  useEffect(() => {
    if (localCodeSpace.includes("-")) { // Used localCodeSpace
      const maybeKey = localCodeSpace.split("-")[1]; // Used localCodeSpace
      const storedData = sessionStorage.getItem(maybeKey);
      if (storedData) {
        const { prompt, images } = JSON.parse(storedData) as {
          prompt: string;
          images: ImageData[];
        };
        sessionStorage.removeItem(maybeKey);

        codeSession.getSession().then((_currentSession) => { // Renamed from cSess
          handleSendMessage({
            prompt,
            images,
            cSess: codeSession, // Renamed from cSess
          });
        });
      }
    }
  }, [isOpen, localCodeSpace, setInput, codeSession]); // Renamed from cSess, used localCodeSpace and added to deps

  const memoizedSetEditInput = useCallback((value: string): void => {
    setEditInput(value);
  }, []);

  const memoizedScreenshot = useCallback(
    (): Promise<ImageData> => codeSession.screenshot(), // Renamed from cSess
    [codeSession], // Renamed from cSess and added to deps
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
      cSess={codeSession} // Renamed from cSess
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
