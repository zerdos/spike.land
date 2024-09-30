import type { Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useRef, useState } from "react";

export const useChat = (
  codeSpace: string,
) => {
  const [messagesRaw, setM] = useLocalStorage(`chatMessages-${codeSpace}`, [] as Message[]);
  const [isStreaming, setIsStreaming] = useLocalStorage(`streaming-${codeSpace}`, true);

  const [input, setInput] = useState("");
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // if the role of the prev message is the same as the current message, then the current message will be displayed in the same bubble as the previous message, so we merge them in the array them in

  const setMessages = (newMessages: Message[]) => {
    const messages = messagesRaw.filter(x => x);
    const newMessagesFiltered = newMessages.filter(x => x);

    if (md5(messages) === md5(newMessagesFiltered)) {
      return;
    }

    setM(newMessagesFiltered);
  };

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
