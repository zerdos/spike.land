import { useDarkMode } from "@/hooks/use-dark-mode";
import React, {  useCallback, useEffect, useRef, useState } from "react";
import { ChatDrawer } from "@/components/app/chat-drawer";
import type { ICode } from "@/lib/interfaces";
import { useCodeSpace } from "@/hooks/use-code-space";
import { useMessageHandling } from "./hooks/useMessageHandling";
import { useScreenshot } from "./hooks/useScreenshot";
import type { ImageData, Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { useLocalStorage } from "react-use";


export const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }) => {
  const codeSpace = useCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [m, setM] = useLocalStorage(`chatMessages-${codeSpace}`, [] as Message[]);
  const [isStreaming, setIsStreaming] = useLocalStorage(`streaming-${codeSpace}`, true);

  const [input, setInput] = useState("");
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null); 

  const messages = m || [];
  // if the role of the prev message is the same as the current message, then the current message will be displayed in the same bubble as the previous message, so we merge them in the array them in


  const setMessages = (newMessages: Message[]) => {
    const OLD = (messages || []).filter(x => x);
    console.log("setMessages", newMessages);
    const newMessagesFiltered = newMessages.filter(x => x);

    if (md5(OLD) === md5(newMessagesFiltered)) {
      console.log("setMessages: same messages, returning");
      return;
    }

    setM(newMessagesFiltered);
  };

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setAICode("");
    setEditingMessageId(null);
    setEditInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setMessages, setIsStreaming, setInput, setAICode, setEditingMessageId, setEditInput]);

  const {
    handleSendMessage,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  } = useMessageHandling({
    codeSpace,
    messages,
    setMessages: setMessages as React.Dispatch<React.SetStateAction<Message[]>>,
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
    if (messages.length === 0) {
      setIsStreaming(false);
      return;
    }
    setIsStreaming(true);
  }, [messages]);

  useEffect(() => {
    console.log("ChatInterface rendered");
    // Your code here

    if (isStreaming) {
      const lastMessage = messages[messages.length - 1];
   
      const interval = setInterval(() => {
        if (messages.length === 0) {
          console.log("No messages setIsStreaming = false");

          setIsStreaming(false);
          return;
        }

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
      return () => clearInterval(interval);

      // Add a default return statement
    }
    return () => {};
  }, []);


  const handleResetChat = useCallback(() => {
    resetChat();
    setIsStreaming(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [inputRef]);

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
      if (sessionStorage.getItem(maybeKey)) {
        const {prompt, images} = JSON.parse(sessionStorage.getItem(maybeKey)!) as {prompt: string; images: ImageData[]};
        sessionStorage.removeItem(maybeKey);
        handleSendMessage(prompt, images)
      }
    }
  }, [isOpen, messages]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    return () => clearInterval(interval);
  }, [isStreaming]);

  if (!isOpen) return null;
  return (
    <ChatDrawer
      isOpen={isOpen}
      onClose={onClose}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      handleResetChat={handleResetChat}
      messages={messages}
      isStreaming={!!isStreaming}
      input={input}
      setInput={setInput}
      handleSendMessage={handleSendMessage}
      inputRef={inputRef}
      isScreenshotLoading={isScreenshotLoading}
      screenshotImage={screenshotImage}
      handleScreenshotClick={handleScreenshotClick}
      handleCancelScreenshot={handleCancelScreenshot}
      editingMessageId={editingMessageId}
      editInput={editInput}
      setEditInput={setEditInput}
      handleEditMessage={handleEditMessage}
      handleCancelEdit={handleCancelEdit}
      handleSaveEdit={handleSaveEdit}
      codeSpace={codeSpace}
      screenShot={()=>cSess.screenShot()}
    />
  );
});