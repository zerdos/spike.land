// chatDrawer.tsx
import React, { useEffect, useRef, useState, useCallback } from "react";
import { css } from "@emotion/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Check, Moon, RefreshCw, Send, Sun, X } from "lucide-react";
import { CodeTS } from "./CodeBlock";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}


// Component: ColorModeToggle
const ColorModeToggle: React.FC<
  { isDarkMode: boolean; toggleDarkMode: () => void }
> = (
  { isDarkMode, toggleDarkMode },
) => (
  <button
    onClick={toggleDarkMode}
    className={`p-2 rounded-full backdrop-blur-sm ${
      isDarkMode
        ? "bg-gray-800/30 text-yellow-400"
        : "bg-yellow-100/30 text-gray-800"
    } hover:bg-opacity-50 transition-all duration-300`}
  >
    {isDarkMode ? "🌙" : "☀️"}
  </button>
);

// Styles
const styles = {
  smallFont: css`
    font-size: 8pt !important;
  `,
  smallFontWithMaxWidth: css`
    font-size: 8pt !important;
    max-width: 100%;
  `,
  chatWindow: css`
    z-index: 999;
    transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: var(--background);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
      width: 50%;
      max-width: 600px;
    }
  `,
  chatContent: css`
    height: 100%;
    min-width: 320px;
    width: 100%;
    border-left: 1px solid var(--input);
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #f0f0f0;
  `,
};


// Mock responses (moved outside of component to avoid re-creation on each render)
const mockResponses = [
  "Here's an example code block:\n```tsx\nconst greeting = 'Hello, World!';\nconsole.log(greeting);\n```",
  "Let me explain this function:\n```tsx\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n```",
  "Here's how you can create a React component:\n```tsx\nconst MyComponent: React.FC = () => {\n  return <div>Hello, React!</div>;\n};\n```",
];

// Helper function to render message content
const renderMessage = (text: string, isUser: boolean) => {
  const cleanedText = isUser
    ? text
    : text.replace(/<antArtifact.*?>/g, "**```tsx").replace(/<\/antArtifact>/g, "```**");

  const parts = cleanedText.split("**```tsx");
  if (parts.length > 1) {
    return parts.map((part, index) => {
      if (index === 0) {
        return (
          <pre css={styles.smallFont} key={index}>
            {part}
          </pre>
        );
      }
      const [code, ...rest] = part.split("```**");
      return (
        <React.Fragment key={index}>
          <pre
            css={styles.smallFont}
            className="bg-gray-100 p-2 rounded my-2 overflow-x-auto">
            <CodeTS code={code} />
          </pre>
          {rest.map((text, i) => (
            <pre css={styles.smallFont} key={`${index}-${i}`}>
              {text}
            </pre>
          ))}
        </React.Fragment>
      );
    });
  }
  return <pre css={styles.smallFontWithMaxWidth}>{cleanedText}</pre>;
};

// Sub-components
const ChatMessage: React.FC<{
  message: Message;
  isSelected: boolean;
  onDoubleClick: () => void;
  isEditing: boolean;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
}> = ({
  message,
  isSelected,
  onDoubleClick,
  isEditing,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
}) => {
  const isUser = message.role === "user";
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      onDoubleClick={onDoubleClick}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? "bg-primary text-primary-foreground"
            : isSelected
              ? "bg-secondary text-secondary-foreground ring-2 ring-primary"
              : "bg-secondary text-secondary-foreground"
        }`}>
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <Textarea
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              className="bg-background text-foreground"
            />
            <div className="flex justify-end space-x-2">
              <Button size="sm" onClick={() => handleSaveEdit(message.id)}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          renderMessage(message.content, isUser)
        )}
      </div>
    </div>
  );
};

export const ChatHeader: React.FC<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  onClose: () => void;
}> = ({ isDarkMode, toggleDarkMode, handleResetChat, onClose }) => (
  <div className="bg-secondary p-4 font-bold flex justify-between items-center">
    <span>AI spike pilot</span>
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
        {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </Button>
      <Button variant="ghost" size="icon" onClick={handleResetChat}>
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button variant="ghost" size="icon" onClick={onClose}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export const ChatContainer: React.FC<{
  messages: Message[];
  editingMessageId: string | null;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (messageId: string) => void;
  handleEditMessage: (id: string) => void;
  isStreaming: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}> = ({
  messages,
  editingMessageId,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
  handleEditMessage,
  isStreaming,
  messagesEndRef,
}) => {
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isStreaming, messagesEndRef]);

  return (
    <ScrollArea className="flex-1 p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isSelected={editingMessageId === message.id}
            onDoubleClick={() => handleEditMessage(message.id)}
            isEditing={editingMessageId === message.id}
            editInput={editInput}
            setEditInput={setEditInput}
            handleCancelEdit={handleCancelEdit}
            handleSaveEdit={handleSaveEdit}
          />
        ))}
        {isStreaming && <div className="text-sm text-gray-500">AI is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
};


export const MessageInput: React.FC<{
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (value: string) => void;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}> = ({ input, setInput, handleSendMessage, isStreaming, inputRef }) => (
  <div className="p-4 bg-background">
    <div className="flex flex-col space-y-2">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage(input);
          }
        }}
        placeholder="Type a message..."
        className="flex-1 min-h-[100px] resize-none"
        ref={inputRef}
        disabled={isStreaming}
      />
      <Button onClick={handleSendMessage} disabled={isStreaming} className="self-end">
        <Send className="h-4 w-4 mr-2" />
        Send
      </Button>
    </div>
  </div>
);

export const ChatWindow: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({
  children,
  isOpen,
}) => (
  <div
    css={styles.chatWindow}
    style={{
      transform: isOpen ? "translateX(0)" : "translateX(100%)",
    }}>
    <div css={styles.chatContent}>{children}</div>
  </div>
);

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const draggableWindow = document.getElementById("DraggableWindow");
    if (draggableWindow) {
      draggableWindow.style.transition = "left 0.3s ease-in-out";
      draggableWindow.style.left = isOpen ? "0" : "";
    }
  }, [isOpen]);

  const handleSendMessage = useCallback(() => {
    if (input.trim() === "") return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsStreaming(true);

    setTimeout(() => {
      const aiResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), content: aiResponse, role: "assistant" },
      ]);
      setIsStreaming(false);
    }, 1000);
  }, [input]);

  const handleEditMessage = useCallback(
    (id: string) => {
      const messageToEdit = messages.find((msg) => msg.id === id);
      if (messageToEdit && messageToEdit.role === "user") {
        setEditingMessageId(id);
        setEditInput(messageToEdit.content);
      }
    },
    [messages],
  );

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditInput("");
  }, []);

  const handleSaveEdit = useCallback(
    (id: string) => {
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, content: editInput } : msg)),
      );
      setEditingMessageId(null);
      setEditInput("");
    },
    [editInput],
  );

  const handleResetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setEditingMessageId(null);
    setEditInput("");
    setIsStreaming(false);
  }, []);

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev) => !prev);
    // Apply dark mode class to root element here if needed
  }, []);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0">
        <Bot className="h-6 w-6" />
      </Button>

      <ChatWindow isOpen={isOpen}>
        <ChatHeader
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          handleResetChat={handleResetChat}
          onClose={() => setIsOpen(false)}
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
    </>
  );
};

export default ChatInterface;
