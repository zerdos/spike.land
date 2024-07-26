import React, { useEffect, useRef, useState } from 'react';
import { initialMessage } from "./initialMessage";
import { ChatWindow, ChatHeader, ChatContainer, MessageInput } from './ChatDrawer';

// Types
interface Artifact {
  identifier: string;
  type: string;
  language: string;
  title: string;
  content: string;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Utility Functions
const getCodeSpace = (): string => {
  return location.pathname.slice(1).split("/")[1];
};

const codeSpace = getCodeSpace();

// Component: ColorModeToggle
const ColorModeToggle: React.FC<{ isDarkMode: boolean; toggleDarkMode: () => void }> = ({ isDarkMode, toggleDarkMode }) => (
  <button
    onClick={toggleDarkMode}
    className={`p-2 rounded-full backdrop-blur-sm ${
      isDarkMode ? "bg-gray-800/30 text-yellow-400" : "bg-yellow-100/30 text-gray-800"
    } hover:bg-opacity-50 transition-all duration-300`}
  >
    {isDarkMode ? "🌙" : "☀️"}
  </button>
);


// Main Component: ChatInterface
const ChatInterface: React.FC<{ onCodeUpdate: (code: string) => void, isOpen: boolean, onClose: ()=>void  }> = ({ onCodeUpdate, onClose, isOpen }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    loadMessages();
    const storedMode = localStorage.getItem("darkMode");
    setIsDarkMode(storedMode === "true");

    broadcastChannel.current = new BroadcastChannel("chat_sync");
    broadcastChannel.current.onmessage = (event) => {
      if (event.data.type === `update_messages-${codeSpace}`) {
        setMessages(event.data.messages);
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

  const loadMessages = () => {
    const storedMessages = localStorage.getItem(`chatMessages-${codeSpace}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(`chatMessages-${codeSpace}`, JSON.stringify(newMessages));
    broadcastChannel.current?.postMessage({
      type: `update_messages-${codeSpace}`,
      messages: newMessages,
    });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const isFirstMessage = messages.length === 0;
    if (isFirstMessage) {
      content =
        initialMessage.replace(/{{FILENAME}}/g, codeSpace + ".tsx").replace(/{{FILE_CONTENT}}/g, cSess.session.code)
        + content;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    saveMessages([...messages, newMessage]);
    setInput("");
    setIsStreaming(true);

    let fullResponse = "";
    let isResponseComplete = false;
    const maxRetries = 3;
    let retryCount = 0;

    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, assistantMessage]);

    while (!isResponseComplete && retryCount < maxRetries) {
      try {
        const response = await fetch("/anthropic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, newMessage, { ...assistantMessage, content: fullResponse }].map((msg) => ({
              role: msg.role,
              content: msg.content,
            })),
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("Response body is not readable!");
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            isResponseComplete = true;
            break;
          }

          const chunk = decoder.decode(value);
          fullResponse += chunk;
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.content = fullResponse;
            return updatedMessages;
          });
        }
      } catch (error) {
        console.error("Error:", error);
        retryCount++;
        if (retryCount >= maxRetries) {
          const errorMessage = "Sorry, there was an error processing your request. The response may be incomplete.";
          fullResponse += "\n\n" + errorMessage;
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.content = fullResponse;
            return updatedMessages;
          });
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
        }
      }
    }

    const extractArtifacts = (content: string): Artifact[] => {
      const artifactRegex =
        /<antArtifact\s+identifier="([^"]+)"\s+type="([^"]+)"\s+language="([^"]+)"\s+title="([^"]+)">([\s\S]*?)<\/antArtifact>/g;
      const extractedArtifacts: Artifact[] = [];
      let match;

      while ((match = artifactRegex.exec(content)) !== null) {
        extractedArtifacts.push({
          identifier: match[1],
          type: match[2],
          language: match[3],
          title: match[4],
          content: match[5].trim(),
        });
      }

      return extractedArtifacts;
    };
    const artifacts = extractArtifacts(fullResponse);

    if (artifacts.length > 0) {
      onCodeUpdate(artifacts[0].content);
    }

    // Check if the response contains code modifications
    const codeModificationRegex = /```(?:jsx?|tsx?)\n([\s\S]*?)```/g;
    const matches = fullResponse.match(codeModificationRegex);

    if (matches) {
      const modifiedCode = matches[matches.length - 1].replace(/```(?:jsx?|tsx?)\n|```/g, "");
      onCodeUpdate(modifiedCode);
    }

    saveMessages([...messages, newMessage, { ...assistantMessage, content: fullResponse }]);
    setIsStreaming(false);
  };

  const handleResetChat = () => {
    setMessages([]);
    localStorage.removeItem(`chatMessages-${codeSpace}`);
    broadcastChannel.current?.postMessage({ type: `update_messages-${codeSpace}`, messages: [] });
  };

  const handleEditMessage = (messageId: string) => {
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (messageToEdit) {
      setEditingMessageId(messageId);
      setEditInput(messageToEdit.content);
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditInput("");
  };

  const handleSaveEdit = (messageId: string) => {
    const updatedMessages = messages.map((msg) => (msg.id === messageId ? { ...msg, content: editInput } : msg));
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    broadcastChannel.current?.postMessage({
      type: `update_dark_mode-${codeSpace}`,
      isDarkMode: newMode,
    });
  };

  return (
    <ChatWindow isOpen={isOpen}>
      <ChatHeader
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        handleResetChat={handleResetChat} 
        onClose={ ()=>onClose()}
      />
      <ChatContainer
        messages={messages}
        editingMessageId={editingMessageId}
        editInput={editInput}
        setEditInput={setEditInput}
        handleCancelEdit={handleCancelEdit}
        handleSaveEdit={handleSaveEdit}
        handleEditMessage={handleEditMessage}
        isStreaming={isStreaming}
        messagesEndRef={messagesEndRef}
      />

      <MessageInput
        input={input}
        setInput={setInput}
        handleSendMessage={handleSendMessage}
        isStreaming={isStreaming}
        inputRef={inputRef}
      />
</ChatWindow>
  );
};

export default ChatInterface;