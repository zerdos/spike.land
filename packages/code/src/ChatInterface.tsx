import { useDarkMode } from "@/hooks/use-dark-mode";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChatDrawer } from "@/components/app/chat-drawer";
import type { ICode } from "@/lib/interfaces";
import { getCodeSpace } from "@/hooks/use-code-space";
import { useScreenshot } from "./hooks/useScreenshot";
import type { ImageData, Message } from "@/lib/interfaces";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { handleSendMessage } from "@/lib/shared";
import { useImmer } from "use-immer";
import { messagesPush } from "@/lib/chat-utils";
import { useDictation } from "@/hooks/use-dictation";

const MemoizedChatDrawer = React.memo(ChatDrawer);

const ChatInterface: React.FC<{
  isOpen: boolean;
  cSess: ICode;
  onClose: () => void;
}> =({ onClose, isOpen, cSess }): React.ReactElement | null => {
  const codeSpace = getCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [storedMessages, setStoredMessages] = useLocalStorage<Message[]>(`chatMessages-${codeSpace}`, []);
  const [messages, setMessages] = useImmer<Message[]>([]);
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(`streaming-${codeSpace}`, false);
  const [input, setInput] = useDictation("");

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetChat = useCallback((): void => {
    setMessages([]);
    setStoredMessages([]);
    setInput("");
    setEditingMessageId(null);
    setEditInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setInput, setMessages, setStoredMessages]);

  useEffect(() => {
    if (storedMessages && storedMessages.length > 0) {
      setMessages(storedMessages);
    }
  }, [storedMessages, setMessages]);

  useEffect(() => {
    setStoredMessages(messages);
  }, [messages, setStoredMessages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document.getElementById("after-last-message")?.scrollIntoView({
          behavior: "instant",
          block: "end",
        });
      });
    }
  }, [isOpen, messages]);

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditInput("");
  }, []);

  const handleSaveEdit = useCallback((messageId: string) => {
    setMessages(draft => {
      const index = draft.findIndex((m) => m.id === messageId);
      if (index === -1) return;

      const oldMsg = draft[index];
      let newContent = "";

      if (Array.isArray(oldMsg.content)) {
        newContent = editInput;
      } else {
        newContent = editInput;
      }

      draft[index] = {
        ...oldMsg,
        content: newContent,
      };
    });
    setEditingMessageId(null);
    setEditInput("");
  }, [editInput, setMessages]);

  useEffect(() => {
    const BC = new BroadcastChannel(`${codeSpace}-chat`);
    BC.onmessage = async (event) => {
      const e = event.data;

      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }

      streamingTimeoutRef.current = setTimeout(() => {
        setIsStreaming(false);
      }, 1000);

      if (e.messages) {
        setMessages(e.messages);
      }

      if (typeof e.isStreaming !== "undefined") {
        setIsStreaming(e.isStreaming);
      }

      if (e.message) {
        setMessages(draft => {
          messagesPush(draft, e.message as Message);
        });
      }

      if (e.code) {
        await cSess.setCodeAndTranspiled({
          formatted: e.code,
          transpiled: e.transpiled,
        });
      }

      if (e.instructions) {
        if (!isStreaming) setIsStreaming(true);
        setMessages(draft => {
          const lastMessage = draft[draft.length - 1];
          if (!lastMessage || lastMessage.role !== "assistant") {
            draft.push({
              id: Date.now().toString(),
              role: "assistant",
              content: e.instructions,
            });
          } else {
            draft[draft.length - 1] = {
              ...lastMessage,
              content: e.instructions,
            };
          }
        });
      }

      setTimeout(() => {
        setIsStreaming(false);
      }, 2000);

      if (e.isStreaming === false) {
        setIsStreaming(false);
      }
    };

    return () => {
      BC.close();
    };
  }, [codeSpace, isStreaming, setIsStreaming, setMessages, cSess]);

  const handleResetChat = useCallback((): void => {
    resetChat();
    setIsStreaming(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [resetChat, setIsStreaming]);

  const { isScreenshotLoading, screenshotImage, handleScreenshotClick, handleCancelScreenshot } = useScreenshot(codeSpace);

  useEffect(() => {
    if (!isOpen) return;
    if (codeSpace.includes("-")) {
      const parts = codeSpace.split("-");
      const maybeKey = parts[1] ? parts[1] : null;
      if (maybeKey) {
        const storedData = sessionStorage.getItem(maybeKey);
        if (storedData) {
          const { prompt, images } = JSON.parse(storedData) as {
            prompt: string;
            images: ImageData[];
          };
          sessionStorage.removeItem(maybeKey);
          const initMessages = [
            {
              id: Date.now().toString(),
              role: "user",
              content: prompt,
            } as Message,
          ];
          setInput("");
          cSess.getCode().then((code) =>
            handleSendMessage({ messages: initMessages, codeSpace, prompt, images, code })
          );
        }
      }
    }
  }, [isOpen]);

  const memoizedSetInput = useCallback((value: string): void => {
    setInput(value);
  }, [setInput]);

  const memoizedHandleEditMessage = useCallback((messageId: string): void => {
    setEditingMessageId(messageId);
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (!messageToEdit) return;
    if (Array.isArray(messageToEdit.content)) {
      const textItem = messageToEdit.content.find((item) => item.type === "text");
      if (!textItem) return;
      setEditInput(textItem ? textItem.text : "");
    } else {
      setEditInput(typeof messageToEdit.content === "string" ? messageToEdit.content : "");
    }
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
}

ChatInterface.displayName = "ChatInterface";

export { ChatInterface };