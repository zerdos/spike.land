import type { Message } from "@/lib/interfaces";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useRef, useState } from "react";

export const useChat = (
  codeSpace: string,
) => {
  const [messagesRaw, setMessages] = useLocalStorage(`chatMessages-${codeSpace}`, [] as Message[]);
  const [isStreaming, setIsStreaming] = useLocalStorage(`streaming-${codeSpace}`, false);

  const [input, setInput] = useState("");
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // if the role of the prev message is the same as the current message, then the current message will be displayed in the same bubble as the previous message, so we merge them in the array them in
  const messages = messagesRaw.filter(x => x);

  const resetChat = useCallback(() => {
    setMessages([]);
    setInput("");
    setAICode("");
    setEditingMessageId(null);
    setEditInput("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [setMessages, setIsStreaming, setInput, setAICode, setEditingMessageId, setEditInput]);

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
    inputRef,
    resetChat,
  };
};
