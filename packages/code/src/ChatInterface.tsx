import { ChatDrawer } from "@/components/app/chat-drawer";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useDictation } from "@/hooks/use-dictation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { ICode } from "@/lib/interfaces";
import type { ImageData, Message } from "@/lib/interfaces";
import { handleSendMessage } from "@/lib/shared";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useScreenshot } from "./hooks/useScreenshot";

const MemoizedChatDrawer = React.memo(ChatDrawer);

let isStreamingTimeout: NodeJS.Timeout | null = null;

const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }): React.ReactElement | null => {
  const { codeSpace } = cSess.session;
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [messages, setMessages] = useState<Message[]>(cSess.session.messages);
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(
    `streaming-${codeSpace}`,
    false,
  );

  useEffect(() => {
    const unSub = cSess.sub((sess) => {
      // Always update messages to stay in sync with session
      setMessages(sess.messages);
    });
    return () => unSub();
  }, [cSess]); // Only depend on cSess changes

  const [input, setInput] = useDictation("");

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const resetChat = useCallback((): void => {
    cSess.setMessages([]);
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
    const messageIndex = messages.findIndex((msg) => msg.id === messageId);
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

    // Create new messages array with updated message and remove subsequent messages
    const updatedMessages = [
      ...messages.slice(0, messageIndex),
      updatedMessage,
    ];

    // Update session with new messages
    cSess.setMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  }, [messages, editInput, cSess]);

  useEffect(() => {
    const BC = new BroadcastChannel(`${codeSpace}-chat`);
    BC.onmessage = async (event) => {
      const e = event.data;

      // Clear any existing streaming timeout
      if (isStreamingTimeout) {
        clearTimeout(isStreamingTimeout);
        isStreamingTimeout = null;
      }

      // Handle messages update
      if (e.messages) {
        // Create deep copy of messages to prevent mutations
        const newMessages = e.messages.map((msg: Message) => ({ ...msg }));
        await cSess.setMessages(newMessages);
      }

      // Handle streaming state
      if (e.isStreaming !== undefined) {
        setIsStreaming(e.isStreaming);
      }

      // Handle debug info
      if (e.debugInfo) {
        const debugInfo = e.debugInfo;
        console.debug("debugInfo", { debugInfo });
        Object.assign(globalThis, { debugInfo });
      }

      // Handle code updates
      if (e.code) {
        console.log("Setting code", e.code);
        await cSess.setCodeAndTranspiled({
          formatted: e.code,
          transpiled: e.transpiled,
        });
      }

      // Handle instructions/streaming content
      if (e.instructions) {
        if (!isStreaming) {
          setIsStreaming(true);
        }

        // Get current messages state immutably
        const currentMessages = [...cSess.session.messages];
        const lastMessage = currentMessages[currentMessages.length - 1];

        if (!lastMessage || lastMessage.role !== "assistant") {
          // Add new assistant message
          await cSess.setMessages([
            ...currentMessages,
            {
              id: Date.now().toString(),
              role: "assistant",
              content: e.instructions,
            },
          ]);
        } else {
          // Update existing assistant message
          const updatedMessages = [...currentMessages.slice(0, -1), {
            ...lastMessage,
            content: e.instructions,
          }];
          await cSess.setMessages(updatedMessages);
        }
      }

      // Set streaming timeout if we have instructions
      if (e.instructions) {
        setIsStreaming(true);
        isStreamingTimeout = setTimeout(() => {
          setIsStreaming(false);
          isStreamingTimeout = null;
        }, 2000);
      }
    };

    return () => {
      if (isStreamingTimeout) {
        clearTimeout(isStreamingTimeout);
        isStreamingTimeout = null;
      }
      BC.close();
    };
  }, [codeSpace, cSess, setIsStreaming, isStreaming]); // Removed messages from deps

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

        // Get current messages and add new user message
        const currentMessages = [...cSess.session.messages];
        const newMessage = {
          id: Date.now().toString(),
          role: "user",
          content: prompt,
        } as Message;

        const updatedMessages = [...currentMessages, newMessage];

        setInput("");
        // Update session with all messages and then send
        cSess.setMessages(updatedMessages);
        handleSendMessage({
          messages: updatedMessages,
          codeSpace,
          prompt,
          images,
          code: cSess.session.code,
        });
      }
    }
  }, [isOpen, codeSpace, setInput, cSess]);

  const memoizedSetInput = useCallback((value: string): void => {
    setInput(value);
  }, [setInput]);

  const memoizedHandleEditMessage = useCallback((messageId: string): void => {
    setEditingMessageId(messageId);

    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (!messageToEdit) {
      console.error("Invalid message for editing");
      return;
    }
    const contentToEdit = Array.isArray(messageToEdit.content)
      ? messageToEdit.content.find((item) => item.type === "text")?.text || ""
      : messageToEdit.content;

    setEditInput(contentToEdit);
  }, [messages]);

  const memoizedSetEditInput = useCallback((value: string): void => {
    setEditInput(value);
  }, []);

  const memoizedScreenShot = useCallback(
    (): Promise<ImageData> => cSess.screenShot(),
    [cSess],
  );

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
      code={cSess.session.code}
      handleSendMessage={handleSendMessage}
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

ChatInterface.displayName = "ChatInterface";

export { ChatInterface };
