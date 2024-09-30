import type { Message } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";

import { useLocalStorage } from "@uidotdev/usehooks";
import { useCallback, useRef, useState } from "react";

export const useChat = (
  codeSpace: string,
) => {
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
