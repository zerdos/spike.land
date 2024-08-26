import { useRef, useState } from "react";
import { Message } from "../types/Message";
import { useSyncedStorage } from "./useSyncedStorage";

export const useChat = (
  codeSpace: string,
) => {
  const [messages, setMessages] = useSyncedStorage(`chatMessages-${codeSpace}`, [] as Message[]);
  const [isStreaming, setIsStreaming] = useSyncedStorage(`streaming-${codeSpace}`, false);

  const [input, setInput] = useState("");
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
