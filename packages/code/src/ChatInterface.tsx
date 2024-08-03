import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AiHandler from "./AIHandler";
import { ChatFC, Message } from "./ChatDrawer";
import { prettierToThrow } from "./shared";

// Types

// Utility Functions

function replacePreservingWhitespace(
  text: string,
  search: string,
  replace: string,
) {
  const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(\\s*)${escapedSearch}(\\s*)`, "g");
  return text.replace(regex, (match, preWhitespace, postWhitespace) => {
    return `${preWhitespace}${replace}${postWhitespace}`;
  });
}
const getCodeSpace = (): string => {
  return location.pathname.slice(1).split("/")[1];
};

const codeSpace = getCodeSpace();

const extractCodeModification = (response: string) => {
  const regex = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
  const matches = response.match(regex);
  return matches ? matches.join("\n\n") : "";
};

const aiHandler = new AiHandler(codeSpace);
const loadMessages = () =>
  JSON.parse(
    localStorage.getItem(`chatMessages-${codeSpace}`) ?? "[]",
  ) as Message[];

// Main Component: ChatInterface
const ChatInterface: React.FC<
  { onCodeUpdate: (code: string) => void; isOpen: boolean; onClose: () => void }
> = React.memo(
  (
    { onCodeUpdate, onClose, isOpen }: {
      onCodeUpdate: (code: string) => void;
      isOpen: boolean;
      onClose: () => void;
    },
  ) => {
    const [messages, __setMessages] = useState<Message[]>(loadMessages());
    const [input, setInput] = useState("");
    const [isStreaming, setIsStreaming] = useState(false);
    const [codeWhatAiSeen, setAICode] = useState("");
    const [editingMessageId, setEditingMessageId] = useState<string | null>(
      null,
    );
    const [editInput, setEditInput] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const broadcastChannel = useRef<BroadcastChannel | null>(null);

    useEffect(() => {
      const storedMode = localStorage.getItem("darkMode");
      setIsDarkMode(storedMode === "true");

      broadcastChannel.current = new BroadcastChannel("chat_sync");
      broadcastChannel.current.onmessage = (event) => {
        if (event.data.type === `update_messages-${codeSpace}`) {
          __setMessages(event.data.messages);
        } else if (event.data.type === `update_dark_mode-${codeSpace}`) {
          setIsDarkMode(event.data.isDarkMode);
        }
      };

      window.addEventListener("storage", handleStorageChange);

      return () => {
        window.removeEventListener("storage", handleStorageChange);
        broadcastChannel.current?.close();
      };
    }, []);

    useEffect(() => {
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }, [isDarkMode]);

    useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === `chatMessages-${codeSpace}`) {
        loadMessages();
      } else if (event.key === "darkMode") {
        setIsDarkMode(event.newValue === "true");
      }
    };

    const saveMessages = useCallback((newMessages: Message[]) => {
      localStorage.setItem(
        `chatMessages-${codeSpace}`,
        JSON.stringify(newMessages),
      );
      broadcastChannel.current?.postMessage({
        type: `update_messages-${codeSpace}`,
        messages: newMessages,
      });
      __setMessages(newMessages);
    }, []);

    const handleSendMessage = useCallback(async (content: string) => {
      console.log("handleSendMessage called with content:", content);
      if (!content.trim()) return;

      console.log("Fetching session data...");
      const { code, i }: { code: string; i: number } = await fetch(
        `/live/${codeSpace}/session.json`,
      ).then((res) => res.json());
      console.log("Fetched session data:", { code, i });

      console.log("Formatting code with prettier...");
      const codeNow = await prettierToThrow({ code, toThrow: true });
      console.log("Formatted code:", codeNow);

      const nextCounter = i + 1;
      console.log("Next counter:", nextCounter);

      console.log("Triggering auto-save...");
      await fetch(`/live/${codeSpace}/auto-save`);

      console.log("Loading messages...");
      const messages = loadMessages();
      console.log("Loaded messages:", messages);

      console.log("Preparing Claude content...");
      const claudeContent = aiHandler.prepareClaudeContent(
        content,
        messages,
        codeNow,
        codeSpace,
      );
      console.log("Prepared Claude content:", claudeContent);

      if (messages.length == 0 || codeNow !== codeWhatAiSeen) {
        console.log("Updating AI code...");
        setAICode(codeNow);
      }

      const newMessage: Message = {
        id: Date.now().toString(),
        role: "user",
        content: claudeContent.trim(),
      };
      console.log("New message:", newMessage);

      if (messages[messages.length - 1]?.role === "user") {
        console.log("Adding error message due to consecutive user messages");
        messages.push({
          "id": (Date.now() + 1).toString(),
          "role": "assistant",
          "content": "Sorry, something went wrong. Please try again.",
        });
      }

      messages.push(newMessage);
      console.log("Updated messages:", messages);

      console.log("Saving messages...");
      saveMessages(messages);

      setInput("");
      setIsStreaming(true);
      console.log("Streaming started");

      try {
        console.log("Sending message to Anthropic...");
        const sentMSGs = [...messages];


        const onUpd = (code: string) =>{
          __setMessages([...sentMSGs, { id: Date.now().toString(), role: "assistant", content: code }])
        };
        const assistantMessage = await aiHandler.sendToAnthropic(messages, onUpd);
        console.log("Received assistant message:", assistantMessage);
        messages.push(assistantMessage);
        saveMessages(messages);

        if (assistantMessage.content.includes("<<<<<<< SEARCH")) {
          console.log("Code modification detected in assistant message");
          try {
            let starterCode = codeNow;
            console.log("Extracting code modifications...");
            const codeToReplace = extractCodeModification(
              assistantMessage.content,
            );
            console.log("Extracted code to replace:", codeToReplace);

            const modz =
              codeToReplace.split(">>>>>>> REPLACE\n\n<<<<<<< SEARCH") ||
              [codeToReplace];

            const modifications = modz.filter((mod) =>
              mod.includes("=======") || mod.includes(">>>>>>> REPLACE") ||
              mod.includes("<<<<<<< SEARCH")
            ).map((mod) =>
              mod.split(">>>>>>> REPLACE").join("").split("<<<<<<< SEARCH")
                .join("")
            );

            console.log("Parsed modifications:", modifications);

            modifications.forEach((modification, index) => {
              console.log(`Applying modification ${index + 1}:`, modification);
              const [search, replaced] = modification.split("=======\n");
              console.log("Search:", search);
              console.log("Replace:", replaced);
              const now = starterCode;
              starterCode = replacePreservingWhitespace(
                starterCode,
                search.trim(),
                replaced,
              );
              if (now === starterCode) {
                console.log({ search, replaced, starterCode });
                throw new Error("Code didn't change after modification");
              }
            });

            console.log("Formatting modified code...");
            console.log("Unformatted code:", starterCode);
            starterCode = await prettierToThrow({
              code: starterCode,
              toThrow: true,
            });
            console.log("Formatted modified code:", starterCode);
            console.log("Updating code...");
            i;
            setIsStreaming(false);
            if (starterCode !== codeNow) onCodeUpdate(starterCode);
            console.log("Code didn't change, not updating");
          } catch (error) {
            console.error("Error during code modification:", error);
          }
          return;
        }

        console.log("Continuing with OpenAI...");
        await aiHandler.continueWithOpenAI(
          assistantMessage.content,
          codeNow,
          nextCounter,
          onCodeUpdate,
          __setMessages,
          setAICode,
        );
      } catch (error) {
        console.error("Error processing request with Claude:", error);
        messages.push({
          "id": (Date.now() + 1).toString(),
          "role": "assistant",
          "content":
            "Sorry, there was an error processing your request with Claude.",
        });
        saveMessages(messages);
      }

      setIsStreaming(false);
      console.log("Streaming ended");
    }, [codeWhatAiSeen, onCodeUpdate]);

    const handleResetChat = useCallback(() => {
      __setMessages([]);
      localStorage.removeItem(`chatMessages-${codeSpace}`);
      broadcastChannel.current?.postMessage({
        type: `update_messages-${codeSpace}`,
        messages: [],
      });
    }, []);

    const handleEditMessage = useCallback((messageId: string) => {
      const messageToEdit = messages.find((msg) => msg.id === messageId);
      if (messageToEdit) {
        setEditingMessageId(messageId);
        setEditInput(messageToEdit.content);
      }
    }, [messages]);

    const handleCancelEdit = useCallback(() => {
      setEditingMessageId(null);
      setEditInput("");
    }, []);

    const handleSaveEdit = useCallback((messageId: string) => {
      const updatedMessages = messages.map((msg) =>
        msg.id === messageId ? { ...msg, content: editInput } : msg
      );
      __setMessages(updatedMessages);
      saveMessages(updatedMessages);
      setEditingMessageId(null);
      setEditInput("");
    }, [messages, editInput, saveMessages]);

    const toggleDarkMode = useCallback(() => {
      const newMode = !isDarkMode;
      setIsDarkMode(newMode);
      localStorage.setItem("darkMode", newMode.toString());
      broadcastChannel.current?.postMessage({
        type: `update_dark_mode-${codeSpace}`,
        isDarkMode: newMode,
      });
    }, [isDarkMode]);

    const memoizedChatFCProps = useMemo(() => ({
      isOpen,
      onClose,
      handleEditMessage,
      handleResetChat,
      handleSaveEdit,
      handleSendMessage,
      isStreaming,
      messages,
      messagesEndRef,
      isDarkMode,
      toggleDarkMode,
      editingMessageId,
      editInput,
      setEditInput,
      input,
      setInput,
      inputRef,
      handleCancelEdit,
    }), [
      isOpen,
      onClose,
      handleEditMessage,
      handleResetChat,
      handleSaveEdit,
      handleSendMessage,
      isStreaming,
      messages,
      isDarkMode,
      toggleDarkMode,
      editingMessageId,
      editInput,
      input,
      handleCancelEdit,
    ]);

    return <ChatFC {...memoizedChatFCProps} />;
  },
);

export default ChatInterface;
