import { useCallback } from "react";
import { Message } from "../types/Message";
import { prettierToThrow } from "../shared";
import { updateSearchReplace } from "../utils/chatUtils";
import debounce from "lodash/debounce";
import { Mutex } from "async-mutex";

interface UseMessageHandlingProps {
  codeSpace: string;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  setIsStreaming: React.Dispatch<React.SetStateAction<boolean>>;
  codeWhatAiSeen: string;
  setAICode: React.Dispatch<React.SetStateAction<string>>;
  saveMessages: (newMessages: Message[]) => void;
  onCodeUpdate: (code: string) => void;
  aiHandler: {
    prepareClaudeContent: (
      content: string,
      messages: Message[],
      codeNow: string,
      codeSpace: string,
    ) => string;
    sendToAnthropic: (
      messages: Message[],
      onUpdate: (code: string) => void,
    ) => Promise<Message>;
    continueWithOpenAI: (
      content: string,
      code: string,
      onCodeUpdate: (code: string) => void,
      setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
      setAICode: React.Dispatch<React.SetStateAction<string>>,
    ) => Promise<string | void>;
  };
  editingMessageId: string | null;
  setEditingMessageId: React.Dispatch<React.SetStateAction<string | null>>;
  editInput: string;
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
  onCodeUpdate,
  aiHandler,
  editingMessageId,
  setEditingMessageId,
  editInput,
  setEditInput,
  broadcastChannel,
}: UseMessageHandlingProps) => {
  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const { code } = await fetch(`/live/${codeSpace}/session.json`).then(
      (res) => res.json<{ code: string }>(),
    );
    const codeNow = await prettierToThrow({ code, toThrow: true });

    await fetch(`/live/${codeSpace}/auto-save`);

    const claudeContent = aiHandler.prepareClaudeContent(
      content,
      messages,
      codeNow,
      codeSpace,
    );

    if (messages.length === 0 || codeNow !== codeWhatAiSeen) {
      setAICode(codeNow);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: claudeContent.trim(),
    };

    const updatedMessages = [...messages, newMessage];
    saveMessages(updatedMessages);

    setInput("");
    setIsStreaming(true);

    try {
      const sentMessages = [...updatedMessages];
      let preUpdates = { last: -1, lastCode: codeNow, count: 0 };
      const mutex = new Mutex();

      const onUpdate = async (code: string) => {
        await mutex.runExclusive(async () => {
          const lastChunk = code.slice(preUpdates.last + 1);
          if (lastChunk.includes(">>>>>>> REPLACE")) {
            const nextStr = code.slice(preUpdates.last + 1);
            preUpdates.last = lastChunk.indexOf(">>>>>>> REPLACE") +
              preUpdates.last + 17;
            const lastCode = updateSearchReplace(nextStr, preUpdates.lastCode);

            if (lastCode !== preUpdates.lastCode) {
              preUpdates.lastCode = lastCode;
              preUpdates.count += 1;
              try {
                const formattedCode = await prettierToThrow({
                  code: lastCode,
                  toThrow: true,
                });
                onCodeUpdate(formattedCode);
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

      const debouncedOnUpdate = debounce(onUpdate, 100);

      const assistantMessage = await aiHandler.sendToAnthropic(
        updatedMessages,
        debouncedOnUpdate,
      );
      updatedMessages.push(assistantMessage);
      saveMessages(updatedMessages);

      const starterCode = updateSearchReplace(
        assistantMessage.content,
        codeNow,
      );
      if (starterCode !== codeNow) {
        const formattedCode = await prettierToThrow({
          code: starterCode,
          toThrow: true,
        });
        onCodeUpdate(formattedCode);

        if (assistantMessage.content.includes("```")) {
          const fromTheLastReplace = assistantMessage.content.split(
            ">>>>>>> REPLACE\n",
          ).pop()!;
          await aiHandler.continueWithOpenAI(
            fromTheLastReplace,
            formattedCode,
            onCodeUpdate,
            setMessages,
            setAICode,
          );
        }
      } else {
        await aiHandler.continueWithOpenAI(
          assistantMessage.content,
          codeNow,
          onCodeUpdate,
          setMessages,
          setAICode,
        );
      }
    } catch (error) {
      console.error("Error processing request:", error);
      updatedMessages.push({
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request.",
      });
      saveMessages(updatedMessages);
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
    onCodeUpdate,
    aiHandler,
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
    if (messageToEdit) {
      setEditingMessageId(messageId);
      setEditInput(messageToEdit.content);
    }
  }, [messages, setEditingMessageId, setEditInput]);

  const handleCancelEdit = useCallback(() => {
    setEditingMessageId(null);
    setEditInput("");
  }, [setEditingMessageId, setEditInput]);

  const handleSaveEdit = useCallback((messageId: string) => {
    const updatedMessages = messages.map((msg) =>
      msg.id === messageId ? { ...msg, content: editInput } : msg
    );
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  }, [
    messages,
    editInput,
    saveMessages,
    setMessages,
    setEditingMessageId,
    setEditInput,
  ]);

  return {
    handleSendMessage,
    handleResetChat,
    handleEditMessage,
    handleCancelEdit,
    handleSaveEdit,
  };
};
