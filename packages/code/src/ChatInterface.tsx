import { useDarkMode } from "@/hooks/use-dark-mode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatDrawer } from "@/components/app/chat-drawer";
import type { ICode } from "@/lib/interfaces";
import { useCodeSpace } from "@/hooks/use-code-space";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useScreenshot } from "./hooks/useScreenshot";
import type { ImageData, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { useLocalStorage } from "react-use";
import { useImmer } from "use-immer";

const MemoizedChatDrawer = React.memo(ChatDrawer);

export const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }): React.ReactElement | null => {
  const codeSpace = useCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [m, setM] = useLocalStorage<Message[]>(`chatMessages-${codeSpace}`, []);
  const [messages, setImmer] = useImmer<Message[]>(m || []);
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(`streaming-${codeSpace}`, false);

  const [input, setInput] = useState("");
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const setMessages = (newMessages: Message[]): void => {
    if (md5(messages) === md5(newMessages)) {
      console.log("setMessages: same messages, returning");
      return;
    }

    setImmer(newMessages);

    setTimeout(() => {
      if (md5(m || []) === md5(messages)) {
        setM(newMessages);
      }
    }, 1000);
  };

  const resetChat = useCallback((): void => {
    setMessages([]);
    setInput("");
    setAICode("");
    setEditingMessageId(null);
    setEditInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setMessages]);

  const {
    handleSendMessage,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  } = useMessageHandling({
    codeSpace,
    messages,
    setMessages,
    setInput,
    setIsStreaming: setIsStreaming as React.Dispatch<React.SetStateAction<boolean>>,
    codeWhatAiSeen,
    setAICode,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    cSess,
  });
  
  useEffect(() => {
    console.log("ChatInterface rendered");
    console.log("messages", messages);
    console.log("messHash", md5(messages));
    setIsStreaming(messages.length > 0);
  }, [messages, setIsStreaming]);

  useEffect(() => {
    if (isStreaming && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const interval = setTimeout(() => {
        const newMessage = messages[messages.length - 1];
        if (md5(lastMessage) === md5(newMessage)) {
          console.log("No new messages setIsStreaming = false");
          setIsStreaming(false);
        } else {
          console.log("New messages setIsStreaming = true");
          console.log("lastMessage", md5(lastMessage));
          console.log("newMessage", md5(newMessage));
        }
      }, 1000);
      return () => clearTimeout(interval);
    } else {
      return undefined;
    }
  }, [isStreaming, messages, setIsStreaming]);

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
    if (isOpen) {
      setTimeout(() => {
        document.getElementById("after-last-message")?.scrollIntoView({ behavior: "instant", block: "end" });
      });
    }
    if (codeSpace.includes("-")) {
      const maybeKey = codeSpace.split("-")[1];
      const storedData = sessionStorage.getItem(maybeKey);
      if (storedData) {
        const {prompt, images} = JSON.parse(storedData) as {prompt: string; images: ImageData[]};
        sessionStorage.removeItem(maybeKey);
        handleSendMessage(prompt, images);
      }
    }
  }, [isOpen, codeSpace, handleSendMessage]);

  const memoizedHandleSendMessage = useCallback((message: string, images?: ImageData[]): Promise<void> => {
    return handleSendMessage(message, images || []);
  }, [handleSendMessage]);

  const memoizedSetInput = useCallback((value: string): void => {
    setInput(value);
  }, []);

  const memoizedHandleEditMessage = useCallback((messageId: string): void => {
    handleEditMessage(messageId);
  }, [handleEditMessage]);

  const memoizedSetEditInput = useCallback((value: string): void => {
    setEditInput(value);
  }, []);

  const memoizedScreenShot = useCallback((): Promise<ImageData> => cSess.screenShot(), [cSess]);

  if (!isOpen) return null;

  return (
    <MemoizedChatDrawer
      isOpen={isOpen}
      onClose={onClose}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      handleResetChat={handleResetChat}
      messages={messages}
      isStreaming={!!isStreaming}
      input={input}
      setInput={memoizedSetInput}
      handleSendMessage={memoizedHandleSendMessage}
      inputRef={inputRef}
      isScreenshotLoading={isScreenshotLoading}
      screenshotImage={screenshotImage}
      handleScreenshotClick={handleScreenshotClick}
      handleCancelScreenshot={handleCancelScreenshot}
      editingMessageId={editingMessageId}
      editInput={editInput}
      setEditInput={memoizedSetEditInput}
      handleEditMessage={memoizedHandleEditMessage}
      handleCancelEdit={handleCancelEdit}
      handleSaveEdit={handleSaveEdit}
      codeSpace={codeSpace}
      screenShot={memoizedScreenShot}
    />
  );
});