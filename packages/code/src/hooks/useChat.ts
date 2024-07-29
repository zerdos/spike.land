import { useState, useEffect } from 'react';
import { Message } from '../ChatDrawer';

export const useChat = (codeSpace: string) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    const storedMessages = localStorage.getItem(`chatMessages-${codeSpace}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(
      `chatMessages-${codeSpace}`,
      JSON.stringify(newMessages),
    );
  };

  const handleResetChat = () => {
    setMessages([]);
    localStorage.removeItem(`chatMessages-${codeSpace}`);
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
    const updatedMessages = messages.map((
      msg,
    ) => (msg.id === messageId ? { ...msg, content: editInput } : msg));
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  };

  return {
    messages,
    setMessages,
    input,
    setInput,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    handleResetChat,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
    saveMessages,
  };
};
