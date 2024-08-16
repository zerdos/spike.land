import { AIHandler } from "@src/AIHandler";
import { runner } from "@src/services/runner";
import { Mutex } from "async-mutex";
import debounce from "lodash/debounce";
import { useCallback } from "react";
import { prettierToThrow } from "../shared";
import { Message } from "../types/Message";
import { updateSearchReplace } from "../utils/chatUtils";
import { useAutoSave } from "./useAutoSave";

interface UseMessageHandlingProps {
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
  cSess?: { session: { code: string } };
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
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const aiHandler = new AIHandler(codeSpace);
    const { code } = (cSess || globalThis.cSess)?.session || { code: "" };
    const codeNow = await prettierToThrow({ code, toThrow: true });

    useAutoSave(codeSpace);

    const claudeContent = aiHandler.prepareClaudeContent(
      content,
      messages,
      codeNow,
      codeSpace,
    );

    if (messages.length === 0 || codeNow !== codeWhatAiSeen) {
      setAICode(codeNow);
    }

    const newMessage = await createNewMessage(content, claudeContent, codeSpace);
    const updatedMessages = [...messages, newMessage];

    saveMessages(updatedMessages);
    setInput("");
    setIsStreaming(true);

    try {
      await processMessage(aiHandler, updatedMessages, codeNow, setMessages, setAICode, saveMessages);
    } catch (error) {
      console.error("Error processing request:", error);
      handleError(updatedMessages, saveMessages);
    }

    setIsStreaming(false);
  }, [codeSpace, messages, setMessages, setInput, setIsStreaming, codeWhatAiSeen, setAICode, saveMessages, cSess]);

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

// Helper functions

async function createNewMessage(content: string, claudeContent: string, codeSpace: string): Promise<Message> {
  if (content.includes("screenshot")) {
    const base64 = await captureScreenshot(codeSpace);
    return {
      id: Date.now().toString(),
      role: "user",
      content: [
        {
          type: "image",
          source: {
            type: "base64",
            media_type: "image/jpeg",
            data: base64.slice(23),
          },
        },
        { type: "text", text: claudeContent.trim() },
      ],
    };
  }
  return {
    id: Date.now().toString(),
    role: "user",
    content: claudeContent.trim(),
  };
}

async function captureScreenshot(codeSpace: string): Promise<string> {
  const response = await fetch(`/live/${codeSpace}/screenshot`);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}

async function processMessage(
  aiHandler: AIHandler,
  updatedMessages: Message[],
  codeNow: string,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  setAICode: React.Dispatch<React.SetStateAction<string>>,
  saveMessages: (newMessages: Message[]) => void,
) {
  const sentMessages = [...updatedMessages];
  let preUpdates = { last: -1, lastCode: codeNow, count: 0 };
  const mutex = new Mutex();

  const onUpdate = createOnUpdateFunction(sentMessages, preUpdates, mutex, setMessages);
  const debouncedOnUpdate = debounce(onUpdate, 100);

  let assistantMessage = await aiHandler.sendToAnthropic(
    updatedMessages,
    debouncedOnUpdate,
  );

  if (typeof assistantMessage.content !== "string" && !Array.isArray(assistantMessage.content)) {
    throw new Error("Invalid assistant message content");
  }

  if (
    typeof assistantMessage.content === "string"
    && assistantMessage.content.includes("An error occurred while processing")
  ) {
    await runner(codeNow);
    assistantMessage = await aiHandler.sendToGpt4o(
      updatedMessages,
      debouncedOnUpdate,
    );
  }

  updatedMessages.push(assistantMessage);
  saveMessages(updatedMessages);

  const contentToProcess = Array.isArray(assistantMessage.content)
    ? assistantMessage.content.find(item => item.type === "text")?.text || ""
    : assistantMessage.content;

  const starterCode = updateSearchReplace(contentToProcess, codeNow);
  if (starterCode !== codeNow) {
    const formattedCode = await prettierToThrow({
      code: starterCode,
      toThrow: true,
    });
    runner(formattedCode);
  } else {
    await aiHandler.continueWithOpenAI(
      contentToProcess,
      codeNow,
      setMessages,
      setAICode,
    );
  }
}

function createOnUpdateFunction(
  sentMessages: Message[],
  preUpdates: any,
  mutex: Mutex,
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
) {
  return async (code: string) => {
    await mutex.runExclusive(async () => {
      const lastChunk = code.slice(preUpdates.last + 1);
      if (lastChunk.includes(">>>>>>> REPLACE")) {
        const nextStr = code.slice(preUpdates.last + 1);
        preUpdates.last = lastChunk.indexOf(">>>>>>> REPLACE") + preUpdates.last + 17;
        const lastCode = updateSearchReplace(nextStr, preUpdates.lastCode);

        if (lastCode !== preUpdates.lastCode) {
          preUpdates.lastCode = lastCode;
          preUpdates.count += 1;
          try {
            const formattedCode = await prettierToThrow({
              code: lastCode,
              toThrow: true,
            });
            await runner(formattedCode);
          } catch (error) {
            console.error("Error in runner:", error);
          }
        }
      }

      setMessages([...sentMessages, {
        id: Date.now().toString(),
        role: "assistant",
        content: code,
      }]);
    });
  };
}

function handleError(updatedMessages: Message[], saveMessages: (newMessages: Message[]) => void) {
  updatedMessages.push({
    id: Date.now().toString(),
    role: "assistant",
    content: "Sorry, there was an error processing your request.",
  });
  saveMessages(updatedMessages);
}
