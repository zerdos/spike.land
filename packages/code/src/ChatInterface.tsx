import { ChatDrawer } from "@/components/app/chat-drawer";
import { getCodeSpace } from "@/hooks/use-code-space";
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
  const codeSpace = getCodeSpace();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const [messages, setMessages] = useState<Message[]>(cSess.session.messages);
  const [isStreaming, setIsStreaming] = useLocalStorage<boolean>(
    `streaming-${codeSpace}`,
    false,
  );

  useEffect(() => {
    const unSub = cSess.sub((sess) =>
      (JSON.stringify(sess.messages) !== JSON.stringify(messages)) && setMessages(sess.messages)
    );
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

  const handleSaveEdit = (messageId: string) => {
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (!messageToEdit || messageToEdit.role === "assistant") {
      console.error("Invalid message for editing");
      return;
    }
    messageToEdit.content = editInput;

    // remove the messages after the edited message
    const index = messages.indexOf(messageToEdit);
    const mess = messages.slice(0, index + 1);

    cSess.setMessages(mess);
    setEditingMessageId(null);
    setEditInput("");
  };

  useEffect(() => {
    const BC = new BroadcastChannel(`${codeSpace}-chat`);
    BC.onmessage = async (event) => {
      const e = event.data;

      if (isStreamingTimeout) {
        clearTimeout(isStreamingTimeout);
      }
      isStreamingTimeout = setTimeout(() => {
        setIsStreaming(false);
      }, 1000);

      if (e.messages) {
        await cSess.setMessages(e.messages);
      } else if (e.isStreaming !== undefined) {
        setIsStreaming(e.isStreaming);
      }
      if (e.debugInfo) {
        const debugInfo = e.debugInfo;
        console.debug("debugInfo", { debugInfo });
        Object.assign(globalThis, { debugInfo });
      }

      if (e.code) {
        console.log("Setting code", e.code);
        await cSess.setCodeAndTranspiled({
          formatted: e.code,
          transpiled: e.transpiled,
        });
      }

      if (e.instructions) {
        if (!isStreaming) {
          setIsStreaming(true);
        }

        const lastMessage = messages.pop();

        if (lastMessage?.role !== "assistant") {
          await cSess.setMessages([
            ...messages,
            lastMessage as Message,
            {
              id: Date.now().toString(),
              role: "assistant",
              content: e.instructions!,
            },
          ]);
        } else {
          await cSess.setMessages([
            ...messages,
            { ...lastMessage, content: e.instructions },
          ]);
        }
      }
      // set isStreaming to false when we didn't receive any message from the AI for 2 seconds
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
  }, [codeSpace, messages, setMessages, cSess, setIsStreaming, isStreaming]);

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
        const messages = [
          {
            id: Date.now().toString(),
            role: "user",
            content: prompt,
          } as Message,
        ];
        setInput("");
        cSess.setMessages(messages).then(() =>
          handleSendMessage({
            messages: cSess.session.messages,
            codeSpace,
            prompt,
            images,
            code: cSess.session.code,
          })
        );
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
