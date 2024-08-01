import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AiHandler from "./AIHandler";
import { ChatFC, Message } from "./ChatDrawer";
import { prettierToThrow } from "./shared";

// Types

// Utility Functions
const getCodeSpace = (): string => {
  return location.pathname.slice(1).split("/")[1];
};

const codeSpace = getCodeSpace();

const aiHandler = new AiHandler(codeSpace);
const loadMessages = () =>
  JSON.parse(
    localStorage.getItem(`chatMessages-${codeSpace}`) ?? "[]",
  ) as Message[];

// Main Component: ChatInterface
const ChatInterface: React.FC<
  { onCodeUpdate: (code: string) => void; isOpen: boolean; onClose: () => void }
> = React.memo(
  (
    { onCodeUpdate, onClose, isOpen }: { onCodeUpdate: (code: string) => void; isOpen: boolean; onClose: () => void },
  ) => {
    const [messages, __setMessages] = useState<Message[]>(loadMessages());
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [codeWhatAiSeen, setAICode] = useState("");
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editInput, setEditInput] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const broadcastChannel = useRef<BroadcastChannel | null>(null);

    useEffect(() => {
      const storedMode = localStorage.getItem("darkMode");
      setIsDarkMode(storedMode === "true");

      broadcastChannel.current = new BroadcastChannel("chat_sync");
      broadcastChannel.current.onmessage = (event) => {
        if (event.data.type === `update_messages-${codeSpace}`) {
          __setMessages(event.data.messages);
        } else if (event.data.type === `update_dark_mode-${codeSpace}`) {
          setIsDarkMode(event.data.isDarkMode);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        broadcastChannel.current?.close();
      };
    }, []);

    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [isDarkMode]);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `chatMessages-${codeSpace}`) {
        loadMessages();
      } else if (event.key === "darkMode") {
        setIsDarkMode(event.newValue === "true");
      }
    };

    const saveMessages = useCallback((newMessages: Message[]) => {
      localStorage.setItem(
        `chatMessages-${codeSpace}`,
        JSON.stringify(newMessages),
      );
      broadcastChannel.current?.postMessage({
        type: `update_messages-${codeSpace}`,
        messages: newMessages,
      });
      __setMessages(newMessages);
    }, []);

    const handleSendMessage = useCallback(async (content: string) => {
      if (!content.trim()) return;

      const { code, i }: { code: string; i: number } = await fetch(
        `/live/${codeSpace}/session.json`,
      ).then((res) => res.json());
      const codeNow = await prettierToThrow({ code, toThrow: true });

      const nextCounter = i + 1;

      await fetch(`/live/${codeSpace}/auto-save`);

      const messages = loadMessages();
      const claudeContent = aiHandler.prepareContent(
        content,
        messages,
        codeNow,
      );

      if (messages.length == 0 || codeNow !== codeWhatAiSeen) {
        setAICode(codeNow);
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: claudeContent.trim(),
      };

      if (messages[messages.length - 1]?.role === "user") {
        messages.push({
          "id": (Date.now() + 1).toString(),
          "role": "assistant",
          "content": "Sorry, something went wrong. Please try again.",
        });
      }

      messages.push(newMessage);

      saveMessages(messages);

      setInput("");
      setIsStreaming(true);

      try {
        const response = await aiHandler.sendMessage(messages);

        if (response) {
          messages.push(response);
          saveMessages(messages);
        }
      } catch (error) {
        messages.push({
          "id": (Date.now() + 1).toString(),
          "role": "assistant",
          "content": "Sorry, there was an error processing your request with Claude.",
        });
        saveMessages(messages);
      }

      setIsStreaming(false);
    }, [codeWhatAiSeen, onCodeUpdate]);

    const handleResetChat = useCallback(() => {
      __setMessages([]);
      localStorage.removeItem(`chatMessages-${codeSpace}`);
      broadcastChannel.current?.postMessage({
        type: `update_messages-${codeSpace}`,
        messages: [],
      });
    }, []);

    const handleEditMessage = useCallback((messageId: string) => {
      const messageToEdit = messages.find((msg) => msg.id === messageId);
      if (messageToEdit) {
        setEditingMessageId(messageId);
        setEditInput(messageToEdit.content);
      }
    }, [messages]);

    const handleCancelEdit = useCallback(() => {
      setEditingMessageId(null);
      setEditInput("");
    }, []);

    const handleSaveEdit = useCallback((messageId: string) => {
      const updatedMessages = messages.map((msg) => msg.id === messageId ? { ...msg, content: editInput } : msg);
      __setMessages(updatedMessages);
      saveMessages(updatedMessages);
      setEditingMessageId(null);
      setEditInput("");
    }, [messages, editInput, saveMessages]);

    const toggleDarkMode = useCallback(() => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem("darkMode", newMode.toString());
      broadcastChannel.current?.postMessage({
        type: `update_dark_mode-${codeSpace}`,
        isDarkMode: newMode,
      });
    }, [isDarkMode]);

    const memoizedChatFCProps = useMemo(() => ({
      isOpen,
      onClose,
      handleEditMessage,
      handleResetChat,
      handleSaveEdit,
      handleSendMessage,
      isStreaming,
      messages,
      messagesEndRef,
      isDarkMode,
      toggleDarkMode,
      editingMessageId,
      editInput,
      setEditInput,
      input,
      setInput,
      inputRef,
      handleCancelEdit,
    }), [
      isOpen,
      onClose,
      handleEditMessage,
      handleResetChat,
      handleSaveEdit,
      handleSendMessage,
      isStreaming,
      messages,
      isDarkMode,
      toggleDarkMode,
      editingMessageId,
      editInput,
      input,
      handleCancelEdit,
    ]);

    return <ChatFC {...memoizedChatFCProps} />;
  },
);

export default ChatInterface;
