import { AIHandler } from "@src/AIHandler";
import { ICode } from "@src/cSess.interface";
import { Mutex } from "async-mutex";
import { useCallback, useMemo } from "react";
import { Message } from "../types/Message";
import { createNewMessage, handleError, processMessage } from "./messageProcessing";
import { useAutoSave } from "./useAutoSave";

export interface UseMessageHandlingProps {
  codeSpace: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  codeWhatAiSeen: string;
  setAICode: React.Dispatch<React.SetStateAction<string>>;
  saveMessages: (newMessages: Message[]) => void;
  editingMessageId: string | null;
  setEditingMessageId: React.Dispatch<React.SetStateAction<string | null>>;
  editInput: string;
  cSess: ICode;
  setEditInput: React.Dispatch<React.SetStateAction<string>>;
  broadcastChannel: React.MutableRefObject<BroadcastChannel | null>;
}

export const useMessageHandling = ({
  codeSpace,
  messages,
  setMessages,
  setInput,
  setIsStreaming,
  codeWhatAiSeen,
  setAICode,
  saveMessages,
  setEditingMessageId,
  editInput,
  cSess,
  setEditInput,
  broadcastChannel,
}: UseMessageHandlingProps) => {
  const aiHandler = useMemo(() => new AIHandler(codeSpace), [codeSpace]);
  const mutex = useMemo(() => new Mutex(), []);

  const handleSendMessage = useCallback(async (content: string, screenshot: string) => {
    if (!content.trim()) return;

    const { code } = cSess.session;

    useAutoSave(codeSpace);

    const claudeContent = aiHandler.prepareClaudeContent(
      content,
      messages,
      code,
      codeSpace,
    );

    if (messages.length === 0 || code !== codeWhatAiSeen) {
      setAICode(code);
    }

    const newMessage = await createNewMessage(screenshot, claudeContent);
    const updatedMessages = [...messages, newMessage];

    saveMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    try {
      await processMessage(aiHandler, updatedMessages, code, setMessages, setAICode, saveMessages, mutex);
    } catch (error) {
      console.error("Error processing request:", error);
      handleError(updatedMessages, saveMessages);
    }

    setIsStreaming(false);
  }, [
    codeSpace,
    messages,
    setMessages,
    setInput,
    setIsStreaming,
    codeWhatAiSeen,
    setAICode,
    saveMessages,
    cSess,
    aiHandler,
    mutex,
  ]);

  const handleResetChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(`chatMessages-${codeSpace}`);
    broadcastChannel.current?.postMessage({
      type: `update_messages-${codeSpace}`,
      messages: [],
    });
  }, [codeSpace, setMessages, broadcastChannel]);

  const handleEditMessage = useCallback((messageId: string) => {
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (!messageToEdit) {
      console.error("Invalid message for editing");
      return;
    }
    const contentToEdit = Array.isArray(messageToEdit.content)
      ? messageToEdit.content.find(item => item.type === "text")?.text || ""
      : messageToEdit.content;
    setEditingMessageId(messageId);
    setEditInput(contentToEdit);
  }, [messages, setEditingMessageId, setEditInput]);

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditInput("");
  }, [setEditingMessageId, setEditInput]);

  const handleSaveEdit = useCallback((messageId: string) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId
        ? {
          ...msg,
          content: Array.isArray(msg.content)
            ? msg.content.map(item => item.type === "text" ? { ...item, text: editInput } : item)
            : editInput,
        }
        : msg
    );
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  }, [messages, editInput, saveMessages, setMessages, setEditingMessageId, setEditInput]);

  return {
    handleSendMessage,
    handleResetChat,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  };
};
