import { useDarkMode } from "@/hooks/use-dark-mode";
import React, { useCallback, useEffect, useRef, useState, useMemo } from "react";
import { ChatDrawer } from "@/components/app/chat-drawer";
import type { ICode } from "@/lib/interfaces";
import { useCodeSpace } from "@/hooks/use-code-space";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useScreenshot } from "./hooks/useScreenshot";
import type { ImageData, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { useLocalStorage } from "react-use";

const MemoizedChatDrawer = React.memo(ChatDrawer);

export const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }) => {
  const codeSpace = useCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [m, setM] = useLocalStorage<Message[]>(`chatMessages-${codeSpace}`, []);
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(`streaming-${codeSpace}`, true);

  const [input, setInput] = useState("");
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const messages = useMemo(() => m || [], [m]);

  const setMessages = useCallback((newMessages: React.SetStateAction<Message[]>) => {
    setM((prevMessages) => {
      const updatedMessages = typeof newMessages === 'function' ? newMessages(prevMessages || []) : newMessages;
      const OLD = prevMessages || [];
      console.log("setMessages", updatedMessages);

      if (md5(OLD) === md5(updatedMessages)) {
        console.log("setMessages: same messages, returning");
        return prevMessages;
      }

      return updatedMessages;
    });
  }, [setM]);

  const resetChat = useCallback(() => {
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
    }
  }, [isStreaming, messages, setIsStreaming]);

  const handleResetChat = useCallback(() => {
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

  const memoizedHandleSendMessage = useCallback((message: string, images?: ImageData[]) => {
    return handleSendMessage(message, images || []);
  }, [handleSendMessage]);

  const memoizedSetInput = useCallback((value: string) => {
    setInput(value);
  }, []);

  const memoizedHandleEditMessage = useCallback((messageId: string) => {
    handleEditMessage(messageId);
  }, [handleEditMessage]);

  const memoizedSetEditInput = useCallback((value: string) => {
    setEditInput(value);
  }, []);

  const memoizedScreenShot = useCallback(() => cSess.screenShot(), [cSess]);

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