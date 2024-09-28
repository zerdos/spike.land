import { ImageData } from "@/lib/interfaces";
import { Message } from "@/lib/interfaces";
import { ICode } from "@/lib/interfaces";
import { AIHandler } from "@src/AIHandler";
import { Mutex } from "async-mutex";
import { useCallback, useMemo } from "react";
import { createNewMessage, processMessage } from "./messageProcessing";

import { useAutoSave } from "./useAutoSave";

export interface UseMessageHandlingProps {
  codeSpace: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  codeWhatAiSeen: string;
  setAICode: React.Dispatch<React.SetStateAction<string>>;
  editingMessageId: string | null;
  setEditingMessageId: React.Dispatch<React.SetStateAction<string | null>>;
  editInput: string;
  cSess: ICode;
  setEditInput: React.Dispatch<React.SetStateAction<string>>;
}

export const useMessageHandling = ({
  codeSpace,
  messages,
  setMessages,
  setInput,
  setIsStreaming,
  codeWhatAiSeen,
  setAICode,
  setEditingMessageId,
  editInput,
  cSess,
  setEditInput,
}: UseMessageHandlingProps) => {
  const aiHandler = useMemo(() => new AIHandler(cSess, setIsStreaming, codeSpace), [codeSpace, cSess, setIsStreaming]);
  const mutex = new Mutex();

  const handleSendMessage = useCallback(async (content: string, images: ImageData[]) => {
    if (!content.trim()) return;

    const code = await cSess.session.code;

    useAutoSave(codeSpace);

    const claudeContent = aiHandler.prepareClaudeContent(
      content,
      messages,
      code,
      codeSpace,
    );
    const newMessage = await createNewMessage(images, claudeContent);

    messages.push(newMessage);
    setMessages((messages) => [...messages, newMessage]);
    const assistantMessagePlaceholder: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content: "On it...",
    };
    messages.push(assistantMessagePlaceholder);
    setMessages((m) => [...m, assistantMessagePlaceholder]);

    setInput("");

    try {
      const success = await processMessage(
        { aiHandler, cSess, codeNow: code, messages, setMessages },
      );
      if (success) {
        setAICode(code);
      }
    } catch (error) {
      console.error("Error processing request:", error);

      const sorry: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again or rephrase your input.",
      };
      messages.push(sorry);
      setMessages((m) => [...m, sorry]);
    }
  }, [
    codeSpace,
    messages,
    setMessages,
    setInput,
    setIsStreaming,
    codeWhatAiSeen,
    setAICode,
    cSess,
    aiHandler,
    mutex,
  ]);

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
          content: typeof msg.content === "string" ? msg.content : Array.isArray(msg.content)
            ? msg.content.map(item => item.type === "text" ? { ...item, text: editInput } : item)
            : editInput,
        }
        : msg
    );
    setMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  }, [messages, editInput, setMessages, setEditingMessageId, setEditInput]);

  return {
    handleSendMessage,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  };
};
