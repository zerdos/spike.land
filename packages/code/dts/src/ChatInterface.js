import { jsx as _jsx, jsxs as _jsxs } from "@emotion/react/jsx-runtime";
import {
  ChatBubbleLeftIcon,
  CheckIcon,
  PaperAirplaneIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
const codeSpace = getCodeSpace();
function getCodeSpace() {
  return location.pathname.slice(1).split("/")[1];
}
const ColorModeToggle = (
  { isDarkMode, toggleDarkMode },
) => (_jsx("button", {
  onClick: toggleDarkMode,
  className: `p-2 rounded-full backdrop-blur-sm ${
    isDarkMode ? "bg-gray-800/30 text-yellow-400" : "bg-yellow-100/30 text-gray-800"
  } hover:bg-opacity-50 transition-all duration-300`,
  children: isDarkMode ? "🌙" : "☀️",
}));
const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const broadcastChannel = useRef(null);
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
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    if ("visualViewport" in window) {
      window.visualViewport?.addEventListener("resize", handleResize);
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if ("visualViewport" in window) {
        window.visualViewport?.removeEventListener("resize", handleResize);
      }
    };
  }, []);
  const handleStorageChange = (event) => {
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
  const saveMessages = (newMessages) => {
    localStorage.setItem(`chatMessages-${codeSpace}`, JSON.stringify(newMessages));
    broadcastChannel.current?.postMessage({
      type: `update_messages-${codeSpace}`,
      messages: newMessages,
    });
  };
  const handleSendMessage = async (content) => {
    if (!content.trim()) {
      return;
    }
    const newMessage = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };
    setMessages((prev) => [...prev, newMessage]);
    saveMessages([...messages, newMessage]);
    setInput("");
    setIsStreaming(true);
    try {
      const response = await fetch("/anthropic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, newMessage].map((msg) => ({
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
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };
      setMessages((prev) => [...prev, assistantMessage]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages];
          const lastMessage = updatedMessages[updatedMessages.length - 1];
          lastMessage.content += chunk;
          return updatedMessages;
        });
      }
      saveMessages([...messages, newMessage, assistantMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      };
      setMessages((prev) => [...prev, errorMessage]);
      saveMessages([...messages, newMessage, errorMessage]);
    } finally {
      setIsStreaming(false);
    }
  };
  const handleResetChat = () => {
    setMessages([]);
    localStorage.removeItem(`chatMessages-${codeSpace}`);
    broadcastChannel.current?.postMessage({ type: `update_messages-${codeSpace}`, messages: [] });
  };
  const handleEditMessage = (messageId) => {
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
  const handleSaveEdit = (messageId) => {
    const updatedMessages = messages.map((msg) => msg.id === messageId ? { ...msg, content: editInput } : msg);
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
  return (_jsxs("div", {
    className:
      "flex flex-col h-full bg-gradient-to-br from-purple-400 via-pink-500 to-red-500 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900",
    children: [
      _jsxs("header", {
        className:
          "p-2 bg-white/10 dark:bg-black/10 backdrop-blur-md shadow-lg flex justify-between items-center z-10 border-b border-white/20 dark:border-gray-700/20",
        children: [
          _jsx("h1", { className: "text-sm font-bold text-white dark:text-gray-200", children: "Fancy Glass Chat!!!" }),
          _jsxs("div", {
            className: "flex items-center space-x-2",
            children: [
              _jsx("button", {
                onClick: handleResetChat,
                className:
                  "p-1 rounded-full bg-red-400/20 text-red-100 hover:bg-red-400/40 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/40 backdrop-blur-sm transition-all duration-300",
                children: _jsx(TrashIcon, { className: "h-4 w-4" }),
              }),
              _jsx(ColorModeToggle, { isDarkMode: isDarkMode, toggleDarkMode: toggleDarkMode }),
            ],
          }),
        ],
      }),
      _jsxs("div", {
        className: "flex-grow overflow-y-auto p-2 space-y-2",
        children: [
          messages.map((
            message,
          ) => (_jsxs("div", {
            className: `flex ${message.role === "user" ? "justify-end" : "justify-start"}`,
            children: [
              _jsx("div", {
                className: `max-w-[75%] ${
                  message.role === "user"
                    ? "bg-blue-500/40 text-white"
                    : "bg-white/30 dark:bg-gray-800/30 text-gray-800 dark:text-white"
                } rounded-lg p-2 text-sm shadow-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/20`,
                children: editingMessageId === message.id
                  ? (_jsxs("div", {
                    className: "space-y-1",
                    children: [
                      _jsx("textarea", {
                        value: editInput,
                        onChange: (e) => setEditInput(e.target.value),
                        className:
                          "w-full p-1 text-xs rounded border bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm text-gray-800 dark:text-white",
                        rows: 2,
                      }),
                      _jsxs("div", {
                        className: "flex justify-end space-x-1",
                        children: [
                          _jsx("button", {
                            onClick: handleCancelEdit,
                            className:
                              "p-1 rounded bg-gray-300/30 dark:bg-gray-600/30 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 backdrop-blur-sm transition-all duration-300",
                            children: _jsx(XMarkIcon, { className: "h-3 w-3" }),
                          }),
                          _jsx("button", {
                            onClick: () => handleSaveEdit(message.id),
                            className:
                              "p-1 rounded bg-green-500/30 text-white hover:bg-green-500/50 backdrop-blur-sm transition-all duration-300",
                            children: _jsx(CheckIcon, { className: "h-3 w-3" }),
                          }),
                        ],
                      }),
                    ],
                  }))
                  : _jsx("p", { className: "break-words", children: message.content }),
              }),
              message.role === "user" && !isStreaming && !editingMessageId && (_jsx("button", {
                onClick: () => handleEditMessage(message.id),
                className:
                  "ml-1 p-1 rounded-full bg-gray-200/30 dark:bg-gray-700/30 text-gray-600 dark:text-gray-300 hover:bg-gray-300/50 dark:hover:bg-gray-600/50 backdrop-blur-sm transition-all duration-300",
                children: _jsx(PencilIcon, { className: "h-3 w-3" }),
              })),
            ],
          }, message.id))),
          _jsx("div", { ref: messagesEndRef }),
        ],
      }),
      _jsx("div", {
        className:
          "p-2 bg-white/10 dark:bg-black/10 backdrop-blur-md border-t border-white/20 dark:border-gray-700/20 z-10",
        children: _jsxs("div", {
          className: "flex space-x-2",
          children: [
            _jsx("input", {
              type: "text",
              value: input,
              onChange: (e) => setInput(e.target.value),
              onKeyPress: (e) => e.key === "Enter" && handleSendMessage(input),
              placeholder: "Type a message...",
              className:
                "flex-1 bg-white/20 dark:bg-gray-800/20 text-gray-800 dark:text-white text-sm rounded-full py-1 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm placeholder-gray-500 dark:placeholder-gray-400",
              disabled: isStreaming,
              ref: inputRef,
            }),
            _jsx("button", {
              onClick: () => handleSendMessage(input),
              disabled: !input.trim() || isStreaming,
              className:
                "bg-blue-500/40 text-white rounded-full p-1 hover:bg-blue-600/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 backdrop-blur-sm transition-all duration-300",
              children: isStreaming
                ? _jsx(ChatBubbleLeftIcon, { className: "h-4 w-4 animate-pulse" })
                : _jsx(PaperAirplaneIcon, { className: "h-4 w-4" }),
            }),
          ],
        }),
      }),
    ],
  }));
};
export default ChatInterface;
