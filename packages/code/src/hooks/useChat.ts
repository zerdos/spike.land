import { useRef, useState } from "react";
import { Message } from "../types/Message";
import { useSyncedLocalStorage } from "./useSyncedLocalStorage";

export const useChat = (
  codeSpace: string,
) => {
  const [messages, saveMessages] = useSyncedLocalStorage(`chatMessages-${codeSpace}`, [] as Message[]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  return {
    messages,
    setMessages,
    input,
    setInput,
    isStreaming,
    setIsStreaming,
    codeWhatAiSeen,
    setAICode,
    editingMessageId,
    setEditingMessageId,
    editInput,
    setEditInput,
    messagesEndRef,
    inputRef,
  };
};
