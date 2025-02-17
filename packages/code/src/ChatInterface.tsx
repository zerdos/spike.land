import { ChatDrawer } from "@/components/app/chat-drawer";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { useDictation } from "@/hooks/use-dictation";
import { useLocalStorage } from "@/hooks/use-local-storage";
import type { ICode, ICodeSession } from "@/lib/interfaces";
import type { ImageData, Message } from "@/lib/interfaces";
import { handleSendMessage } from "@/lib/shared";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { useScreenshot } from "./hooks/useScreenshot";

let isStreamingTimeout: NodeJS.Timeout | null = null;

const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  codeSpace: string;
  onClose: () => void;
}> = React.memo(({ onClose, isOpen, cSess }): React.ReactElement | null => {
  const [session, setSession] = useState<ICodeSession | null>(null);
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    cSess.getSession().then(initialSession => {
      setSession(initialSession);
      setMessages(initialSession.messages);
    });
  }, [cSess]);

  const codeSpace = session?.codeSpace ?? "";
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(
    `streaming-${codeSpace}`,
    false,
  );

  useEffect(() => {
    if (isStreaming) {
      isStreamingTimeout = setTimeout(() => {
        setIsStreaming(false);
      }, 1000);
    }
    const unSub = cSess.sub((sess) => {
      // Deep compare messages to prevent unnecessary updates
      if (sess.messages) {
        if (JSON.stringify(messages) === JSON.stringify(sess.messages)) {
          return;
        }
        setMessages(sess.messages);
      }
    });
    return () => unSub();
  }, []);

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
        await cSess.setMessages(e.messages);
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
        cSess.setCode(e.code);
      }

      // Handle instructions/streaming content
      if (e.chunk) {
        cSess.addMessageChunk(e.chunk);
        setMessages((prevMessages) => {
          const lastMessage = prevMessages[prevMessages.length - 1];
          if (lastMessage && lastMessage.role === "assistant") {
            lastMessage.content += e.chunk;
            return prevMessages;
          }
          const newId = lastMessage ? (1 + Number(lastMessage.id)).toString() : "1";
          return [
            ...prevMessages,
            { role: "assistant", content: e.chunk, id: newId } as Message,
          ];
        });
      }

      if (!isStreaming) {
        setIsStreaming(true);
      }
      if (isStreamingTimeout) {
        clearTimeout(isStreamingTimeout);
        isStreamingTimeout = null;
      }
      isStreamingTimeout = setTimeout(() => {
        setIsStreaming(false);
      }, 1000);

      // Set streaming timeout if we have instructions
      if (e.instructions) {
        setIsStreaming(true);
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

        cSess.getSession().then(currentSession => {
          handleSendMessage({
            messages: [],
            codeSpace,
            prompt,
            images,
            code: currentSession.code,
          });
        });
      }
    }
  }, [isOpen, codeSpace, setInput, cSess]);

  const memoizedHandleEditMessage = useCallback((messageId: string): void => {
    setEditingMessageId(messageId);

    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (!messageToEdit) {
      console.error("Invalid message for editing");
      return;
    }
    const contentToEdit = Array.isArray(messageToEdit.content)
      ? messageToEdit.content.find((item): item is { type: "text"; text: string; } =>
        item.type === "text"
      )?.text || ""
      : messageToEdit.content;

    if (contentToEdit === undefined) {
      console.error("Invalid message content for editing");
      return;
    }
    setEditInput(typeof contentToEdit === "string" ? contentToEdit : contentToEdit);
  }, [messages]);

  const memoizedSetEditInput = useCallback((value: string): void => {
    setEditInput(value);
  }, []);

  const memoizedScreenshot = useCallback(
    (): Promise<ImageData> => cSess.screenshot(),
    [cSess],
  );

  if (!isOpen) return null;

  return (
    <ChatDrawer
      isOpen={isOpen}
      setEditingMessageId={setEditingMessageId}
      onClose={onClose}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
      handleResetChat={handleResetChat}
      isStreaming={!!isStreaming}
      input={input}
      setInput={setInput}
      cSess={cSess}
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
      screenshot={memoizedScreenshot}
    />
  );
});

ChatInterface.displayName = "ChatInterface";

export { ChatInterface };
