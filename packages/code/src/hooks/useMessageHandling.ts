import { messagesPush } from "@/lib/chat-utils";
import type { ImageData } from "@/lib/interfaces";
import type { Message } from "@/lib/interfaces";
import type { ICode } from "@/lib/interfaces";
import { AIHandler } from "@src/AIHandler";
import { useCallback } from "react";
import { createNewMessage, processMessage } from "./messageProcessing";

export interface UseMessageHandlingProps {
  codeSpace: string;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
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
  setEditingMessageId,
  editInput,
  cSess,
  setEditInput,
}: UseMessageHandlingProps) => {
  const aiHandler = new AIHandler(cSess, setIsStreaming, codeSpace);

  const handleSendMessage = async (content: string, images: ImageData[]) => {
    if (!content.trim()) return;

    const claudeContent = aiHandler.prepareClaudeContent(
      content,
      messages,
      cSess.session.code,
      codeSpace,
    );
    const newUserMessage = await createNewMessage(images, claudeContent);
    messages = messagesPush(messages, newUserMessage);
    setMessages([...messages]);

    setInput("");

    try {
      const success = await processMessage({
        aiHandler,
        cSess,
        codeNow: cSess.session.code,
        messages,
        setMessages,
        newUserMessage,
      });

      if (success) {
        return;
      }
    } catch (error) {
      console.error("Error processing request:", error);

      const sorry: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request. Please try again or rephrase your input.",
      };
      messages = messagesPush(messages, sorry);
      setMessages([...messages]);
    }
  };

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

  const handleSaveEdit = (messageId: string) => {
    messages = messages.map((msg) =>
      msg.id === messageId
        ? {
          ...msg,
          content: typeof msg.content === "string" ? msg.content : Array.isArray(msg.content)
            ? msg.content.map(item => item.type === "text" ? { ...item, text: editInput } : item)
            : editInput,
        }
        : msg
    );

    setMessages([...messages]);
    setEditingMessageId(null);
    setEditInput("");
  };

  return {
    handleSendMessage,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  };
};
