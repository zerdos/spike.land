import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { css } from "@emotion/react";
import { Bot, Check, Moon, RefreshCw, Send, Sun, X, X as XMark } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import type { FC, ReactNode } from "react";
import { CodeTS } from "./CodeBlock";

const smallFontStyle = css`
  font-size: 8pt !important;
`;

const smallFontWithMaxWidthStyle = css`
  font-size: 8pt !important;
  max-width: 100%;
`;

const chatWindowStyles = css`
  z-index: 999;
  transition: width 0.3s ease-in-out;
`;

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const mockResponses = [
  "Here's an example code block:\n```tsx\nconst greeting = 'Hello, World!';\nconsole.log(greeting);\n```",
  "Let me explain this function:\n```tsx\nfunction add(a: number, b: number): number {\n  return a + b;\n}\n```",
  "Here's how you can create a React component:\n```tsx\nconst MyComponent: React.FC = () => {\n  return <div>Hello, React!</div>;\n};\n```",
];

export const ChatMessage = ({
  message,
  isUser,
  onDoubleClick,
  isSelected,
  onEdit,
  isEditing,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
}: {
  message: string;
  isUser: boolean;
  onDoubleClick: () => void;
  isSelected: boolean;
  onEdit: (newText: string) => void;
  isEditing: boolean;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (id: string) => void;
}) => {
  const renderMessage = (t: string) => {
    const ddd = t.split("The user's first message follows:");
    const text = ddd.pop()!;

    if (isUser) {
      return text;
    }

    const cleanedText = text.replace(/<antArtifact.*?>/g, "**```tsx").replace(
      /<\/antArtifact>/g,
      "```**",
    );

    const parts = cleanedText.split("**```tsx");
    if (parts.length > 1) {
      return parts.map((part, index) => {
        if (index === 0) {
          return (
            <pre
              css={smallFontStyle}
              key={index}
            >{part}</pre>
          );
        }
        const nextParts = part.split("```**");
        return (
          <>
            <pre
              css={smallFontStyle}
              key={index}
              className="bg-gray-100 p-2 rounded my-2 overflow-x-auto"
            >
            <CodeTS code={nextParts[0]} />
            </pre>
            <br />

            {nextParts.length === 2 && (
              <pre  
                css={smallFontStyle}
                key={index}
              >{nextParts[1]}</pre>
            )}
          </>
        );
      });
    }
    return (
      <pre
        css={smallFontWithMaxWidthStyle}
      >{cleanedText}</pre>
    );
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      onDoubleClick={onDoubleClick}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? "bg-primary text-primary-foreground"
            : isSelected
            ? "bg-secondary text-secondary-foreground ring-2 ring-primary"
            : "bg-secondary text-secondary-foreground"
        }`}
      >
        {isEditing
          ? (
            <div className="flex flex-col space-y-2">
              <Input
                value={editInput}
                onChange={(e) => setEditInput(e.target.value)}
                className="bg-background text-foreground"
              />
              <div className="flex justify-end space-x-2">
                <Button
                  size="sm"
                  onClick={() => handleSaveEdit(Date.now().toString())}
                >
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <XMark className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )
          : (
            renderMessage(message)
          )}
      </div>
    </div>
  );
};

export const ChatHeader = ({
  isDarkMode,
  toggleDarkMode,
  handleResetChat,
  onClose,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  handleResetChat: () => void;
  onClose: () => void;
}) => {
  return (
    <div className="bg-secondary p-4 font-bold flex justify-between items-center">
      <span>AI spike pilot</span>
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode
            ? <Sun className="h-4 w-4" />
            : <Moon className="h-4 w-4" />}
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
};

export const ChatContainer = ({
  messages,
  editingMessageId,
  editInput,
  setEditInput,
  handleCancelEdit,
  handleSaveEdit,
  handleEditMessage,
  isStreaming,
  messagesEndRef,
}: {
  messages: Message[];
  editingMessageId: string | null;
  editInput: string;
  setEditInput: (value: string) => void;
  handleCancelEdit: () => void;
  handleSaveEdit: (messageId: string) => void;
  handleEditMessage: (id: string) => void;
  isStreaming: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}) => {
  return (
    <ScrollArea className="flex-1 p-4">
      {messages.map((message) => (
        <ChatMessage
          key={message.id}
          message={message.content}
          isUser={message.role === "user"}
          isSelected={editingMessageId === message.id}
          onDoubleClick={() => handleEditMessage(message.id)}
          onEdit={(newText) => {
            setEditInput(newText);
            handleSaveEdit(message.id);
          }}
          isEditing={editingMessageId === message.id}
          editInput={editInput}
          setEditInput={setEditInput}
          handleCancelEdit={handleCancelEdit}
          handleSaveEdit={handleSaveEdit}
        />
      ))}
      {isStreaming && <div className="text-sm text-gray-500">AI is typing...</div>}
      <div ref={messagesEndRef} />
    </ScrollArea>
  );
};

export const MessageInput = ({
  input,
  setInput,
  handleSendMessage,
  isStreaming,
  inputRef,
}: {
  input: string;
  setInput: (value: string) => void;
  handleSendMessage: (content: string) => void;
  isStreaming: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  return (
    <div className="p-4 bg-background">
      <div className="flex items-center space-x-2">
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage(input)}
          placeholder="Type a message..."
          className="flex-1"
          ref={inputRef}
          disabled={isStreaming}
        />
        <Button
          onClick={() => handleSendMessage(input)}
          size="icon"
          disabled={isStreaming}
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

const chatWindowStyles = css`
  z-index: 999;
  transition: width 0.3s ease-in-out;
`;

export const ChatWindow: FC<{ isOpen: boolean; children: ReactNode }> = (
  { children, isOpen },
) => (
  <div
    css={chatWindowStyles}
    className={`fixed inset-y-0 right-0 bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${
      isOpen ? "w-1/2 translate-x-0" : "w-96 translate-x-full"
    }`}
  >
    <div className="flex flex-col h-full border-l border-input">
      {children}
    </div>
  </div>
);

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    const draggableWindow = document.getElementById("DraggableWindow");
    if (draggableWindow) {
      if (isOpen) {
        draggableWindow.style.transition = "left 0.3s ease-in-out";
        draggableWindow.style.left = "0";
      } else {
        draggableWindow.style.transition = "left 0.3s ease-in-out";
        draggableWindow.style.left = "";
      }
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    const newMessages = [
      ...messages,
      { id: Date.now(), content: input, role: "user" } as unknown as Message,
    ];
    setMessages(newMessages);
    setInput("");
    setIsStreaming(true);

    setTimeout(() => {
      const aiResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages([
        ...newMessages,
        {
          id: Date.now().toString(),
          content: aiResponse,
          role: "assistant",
        } as Message,
      ]);
      setIsStreaming(false);
    }, 1000);
  };

  const handleEditMessage = (id: string) => {
    const messageToEdit = messages.find((msg) => msg.id === id);
    if (messageToEdit && messageToEdit.role === "user") {
      setEditingMessageId(id);
      setEditInput(messageToEdit.content);
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditInput("");
  };

  const handleSaveEdit = () => {
    if (editingMessageId !== null) {
      setMessages(
        messages.map((msg) => msg.id === editingMessageId ? { ...msg, text: editInput } : msg),
      );
      setEditingMessageId(null);
      setEditInput("");
    }
  };

  const handleResetChat = () => {
    setMessages([]);
    setInput("");
    setEditingMessageId(null);
    setEditInput("");
    setIsStreaming(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // You would typically apply the dark mode class to the root element here
    // document.documentElement.classList.toggle('dark');
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0"
      >
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
