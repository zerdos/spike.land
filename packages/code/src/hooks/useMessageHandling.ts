import { AIHandler } from "@src/AIHandler";
import { runner } from "@src/services/runner";
import { Message } from "@src/types/Message";
import { wait } from "@src/wait";
import { Mutex } from "async-mutex";
import debounce from "lodash/debounce";
import { useCallback } from "react";
import { prettierToThrow } from "../shared";
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
    const aiHandler = new AIHandler(codeSpace);
    if (!content.trim()) return;

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

    let newMessage: Message;

    if (content.includes("screenshot")) {
      let base64 = "";
      await fetch(
        `/live/${codeSpace}/screenshot`,
      )
        .then(response => response.blob())
        .then(blob => {
          var reader = new FileReader();
          reader.onload = function() {
            base64 = this.result as string;
          }; // <--- `this.result` contains a base64 data URI
          reader.readAsDataURL(blob);
        });

      await wait(1000);

      newMessage = {
        "id": Date.now().toString(),
        "role": "user",
        "content": [
          {
            "type": "image",
            "source": {
              "type": "base64",
              "media_type": "image/jpeg",
              "data": base64.slice(23),
            },
          },
          { "type": "text", "text": claudeContent.trim() },
        ],
      };
    } else {
      newMessage = {
        id: Date.now().toString(),
        role: "user",
        content: claudeContent.trim(),
      };
    }

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
            preUpdates.last = lastChunk.indexOf(">>>>>>> REPLACE")
              + preUpdates.last + 17;
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

      const debouncedOnUpdate = debounce(onUpdate, 100);

      let assistantMessage = await aiHandler.sendToAnthropic(
        updatedMessages,
        debouncedOnUpdate,
      );
      if (typeof assistantMessage.content !== "string") {
        throw new Error(
          "Error: Assistant message content is not a string - we don't know how to handle this: "
            + JSON.stringify(assistantMessage),
        );
        return;
      }

      if (assistantMessage.content.includes("An error occurred while processing")) {
        await runner(codeNow);
        assistantMessage = await aiHandler.sendToGpt4o(
          updatedMessages,
          debouncedOnUpdate,
        );
      }

      updatedMessages.push(assistantMessage);
      saveMessages(updatedMessages);

      if (typeof assistantMessage.content !== "string") {
        throw new Error(
          "Error: Assistant message content is not a string - we don't know how to handle this: "
            + JSON.stringify(assistantMessage),
        );
        return;
      }

      const starterCode = updateSearchReplace(
        assistantMessage.content,
        codeNow,
      );
      if (starterCode !== codeNow) {
        const formattedCode = await prettierToThrow({
          code: starterCode,
          toThrow: true,
        });
        runner(formattedCode);
        setIsStreaming(false);
        return;
      } else {
        await aiHandler.continueWithOpenAI(
          assistantMessage.content,
          codeNow,
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
      throw new Error("Error: Could not find message to edit with id: " + messageId);
      return;
    }

    if (typeof messageToEdit.content !== "string") {
      throw new Error(
        "Error:  Message content is not a string - we don't know how to handle this: " + JSON.stringify(messageToEdit),
      );
      return;
    }

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
    const updatedMessages = messages.map((msg) => msg.id === messageId ? { ...msg, content: editInput } : msg);
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
