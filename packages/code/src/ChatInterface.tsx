import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AiHandler from "./AIHandler";
import { ChatFC, Message } from "./ChatDrawer";
import { prettierToThrow } from "./shared";
import { replacePreservingWhitespace } from "./replacePreservingWhitespace";
import { debounce } from "lodash";

const getCodeSpace = (): string => location.pathname.slice(1).split("/")[1];
const codeSpace = getCodeSpace();

const extractCodeModification = (response: string): string => {
  const regex = /<<<<<<< SEARCH[\s\S]*?=======[\s\S]*?>>>>>>> REPLACE/g;
  return response.match(regex)?.join("\n\n") || "";
};

const aiHandler = new AiHandler(codeSpace);
const loadMessages = (): Message[] => JSON.parse(localStorage.getItem(`chatMessages-${codeSpace}`) || "[]");

const ChatInterface: React.FC<{
  onCodeUpdate: (code: string) => void;
  isOpen: boolean;
  onClose: () => void;
}> = React.memo(({ onCodeUpdate, onClose, isOpen }) => {
  const [messages, setMessages] = useState<Message[]>(loadMessages());
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [codeWhatAiSeen, setAICode] = useState("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editInput, setEditInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const broadcastChannel = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem("darkMode") === "true");
    broadcastChannel.current = new BroadcastChannel("chat_sync");
    broadcastChannel.current.onmessage = handleBroadcastMessage;
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      broadcastChannel.current?.close();
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleBroadcastMessage = (event: MessageEvent) => {
    if (event.data.type === `update_messages-${codeSpace}`) {
      setMessages(event.data.messages);
    } else if (event.data.type === `update_dark_mode-${codeSpace}`) {
      setIsDarkMode(event.data.isDarkMode);
    }
  };

  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === `chatMessages-${codeSpace}`) {
      setMessages(loadMessages());
    } else if (event.key === "darkMode") {
      setIsDarkMode(event.newValue === "true");
    }
  };

  const saveMessages = useCallback((newMessages: Message[]) => {
    localStorage.setItem(`chatMessages-${codeSpace}`, JSON.stringify(newMessages));
    broadcastChannel.current?.postMessage({
      type: `update_messages-${codeSpace}`,
      messages: newMessages,
    });
    setMessages(newMessages);
  }, []);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const { code, i } = await fetch(`/live/${codeSpace}/session.json`).then(res => res.json<{i: number, code: string}>());
    const codeNow = await prettierToThrow({ code, toThrow: true });

    await fetch(`/live/${codeSpace}/auto-save`);

    const messages = loadMessages();
    const claudeContent = aiHandler.prepareClaudeContent(content, messages, codeNow, codeSpace);

    if (messages.length === 0 || codeNow !== codeWhatAiSeen) {
      setAICode(codeNow);
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: claudeContent.trim(),
    };

    if (messages[messages.length - 1]?.role === "user") {
      messages.push({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
      });
    }

    messages.push(newMessage);
    saveMessages(messages);

    setInput("");
    setIsStreaming(true);

    try {
      const sentMSGs = [...messages];
      let preUps = { last: -1, lastCode: codeNow , count: 0 };

      const onUpd = (code: string) => {
        const lastChunk = code.slice(preUps.last + 10);
        if (lastChunk.includes('>>>>>>> REPLACE')) {
          console.table({ lastChunk, processed:  preUps.last, len: code.length });
        
          const nstr = code.slice(preUps.last + 1);
          preUps.last = lastChunk.indexOf('>>>>>>> REPLACE') + preUps.last + 10;
          const lastCode = updateSearchReplace(nstr, preUps.lastCode);

          if (lastCode !== preUps.lastCode) {
            preUps.lastCode = lastCode;
            preUps.count += 1;
            prettierToThrow({ code: lastCode, toThrow: true }).then((code) => onCodeUpdate(code));
          }
        }
        setMessages([...sentMSGs, { id: Date.now().toString(), role: "assistant", content: code }]);
      };
      const debpunced = debounce(onUpd, 200)

      const assistantMessage = await aiHandler.sendToAnthropic(messages, debpunced);
      messages.push(assistantMessage);
      saveMessages(messages);

      try{
      const starterCode =  updateSearchReplace(assistantMessage.content, codeNow);
      if (starterCode !== codeNow) {
        const formattedCode = await prettierToThrow({ code: starterCode, toThrow: true });
       
        onCodeUpdate(formattedCode);

        if (assistantMessage.content.includes("```")) {
          const fromTheLastReplace = assistantMessage.content.split(">>>>>>> REPLACE\n").pop()!;

          await aiHandler.continueWithOpenAI(
            fromTheLastReplace,
            formattedCode,
            onCodeUpdate,
            setMessages,
            setAICode,
          );

        }
        saveMessages(messages);
        setIsStreaming(false);
        return;
      }
    } catch (error) {
      console.error("Error during code modification:", error);
    }

      await aiHandler.continueWithOpenAI(
        assistantMessage.content,
        codeNow,
        onCodeUpdate,
        setMessages,
        setAICode,
      );
    } catch (error) {
      console.error("Error processing request with Claude:", error);
      messages.push({
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, there was an error processing your request with Claude.",
      });
      saveMessages(messages);
    }

    setIsStreaming(false);
  }, [codeWhatAiSeen, onCodeUpdate, saveMessages]);

  const handleResetChat = useCallback(() => {
    setMessages([]);
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
    setMessages(updatedMessages);
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
});

export default ChatInterface;

function updateSearchReplace(codeeee: string, codeNow: string) {
  let starterCode = codeNow;
  if (codeeee.includes("<<<<<<< SEARCH")) {
    try {
      const codeToReplace = extractCodeModification(codeeee);
      const modz = codeToReplace.split(">>>>>>> REPLACE\n\n<<<<<<< SEARCH") || [codeToReplace];

      const modifications = modz
        .filter((mod) => mod.includes("=======") || mod.includes(">>>>>>> REPLACE") || mod.includes("<<<<<<< SEARCH"))
        .map((mod) => mod.split(">>>>>>> REPLACE").join("").split("<<<<<<< SEARCH").join(""));

      modifications.forEach((modification) => {
        const [search, replaced] = modification.split("=======\n");
        starterCode = replacePreservingWhitespace(starterCode, search.trim(), replaced);
      });

      
    } catch (error) {
      console.error("Error during code modification:", error);
    }
  }
  return starterCode;
}