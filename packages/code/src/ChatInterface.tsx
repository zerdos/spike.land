import React, { useEffect, useRef, useState } from "react";
import { ChatFC, Message } from "./ChatDrawer";
import { antropic, gptSystem, reminder } from "./initialMessage";
import { prettier } from "./shared";
import { extractArtifacts } from "./utils/extractArtifacts";

// Types

// Utility Functions
const getCodeSpace = (): string => {
  return location.pathname.slice(1).split("/")[1];
};

const codeSpace = getCodeSpace();

// Main Component: ChatInterface
const ChatInterface: React.FC<
  { onCodeUpdate: (code: string) => void; isOpen: boolean; onClose: () => void }
> = (
  { onCodeUpdate, onClose, isOpen },
) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [codeFound, setCodeFound] = useState(false);
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
    loadMessages();
    const storedMode = localStorage.getItem("darkMode");
    setIsDarkMode(storedMode === "true");

    broadcastChannel.current = new BroadcastChannel("chat_sync");
    broadcastChannel.current.onmessage = (event) => {
      if (event.data.type === `update_messages-${codeSpace}`) {
        setMessages(event.data.messages);
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

  const loadMessages = () => {
    const storedMessages = localStorage.getItem(`chatMessages-${codeSpace}`);
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  };

  const saveMessages = (newMessages: Message[]) => {
    localStorage.setItem(
      `chatMessages-${codeSpace}`,
      JSON.stringify(newMessages),
    );
    broadcastChannel.current?.postMessage({
      type: `update_messages-${codeSpace}`,
      messages: newMessages,
    });
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const isFirstMessage = messages.length === 0;
    const codeNow = await prettier(
      await fetch(`/live/${codeSpace}/code/index.tsx`).then((res) => res.text()),
    );

    fetch(`/live/${codeSpace}/auto-save`);
    setCodeFound(false);

    if (isFirstMessage || codeNow !== codeWhatAiSeen) {
      content = antropic.replace(/{{FILENAME}}/g, codeSpace + ".tsx").replace(
        /{{FILE_CONTENT}}/g, codeNow,
        
      ).replace(/{{USERPROMT}}/g, content);
      
      setAICode(codeNow);

    } else {
      content = content + reminder;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: content.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    saveMessages([...messages, newMessage]);
    setInput("");

    setIsStreaming(true);

    let fullResponse = "";
    let isResponseComplete = false;
    const maxRetries = 3;
    let retryCount = 0;

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: "",
    };

    setMessages((prev) => [...prev, assistantMessage]);

    while (!isResponseComplete && retryCount < maxRetries) {
      try {

        const now =[...messages, newMessage, {
          ...assistantMessage,
          content: fullResponse,
        }].map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

        if (now[now.length - 1].role === "assistant") {
          now.pop();
        }

        const response = await fetch("/anthropic", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: now
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("Response body is not readable!");
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            isResponseComplete = true;
           
            break;
          }

          const chunk = decoder.decode(value);
          fullResponse += chunk;
          // if (!codeFound && fullResponse.includes("</antArtifact>")) {
          //   const artifacts = extractArtifacts(fullResponse);

          //   if (artifacts.length > 0) {
          //     const code = await prettier(artifacts[0].content);
          //     onCodeUpdate(code);
          //     setAICode(code);
          //     setCodeFound(true);
          //   }
          // }

          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.content = fullResponse;
            return updatedMessages;
          });
        }
        
      } catch (error) {
        console.error("Error:", error);
        retryCount++;
        if (retryCount >= maxRetries) {
          const errorMessage = "Sorry, there was an error processing your request. The response may be incomplete.";
          fullResponse += "\n\n" + errorMessage;
          setMessages((prev) => {
            const updatedMessages = [...prev];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.content = fullResponse;
            return updatedMessages;
          });
        } else {
          await new Promise((resolve) => setTimeout(resolve, 1000 * retryCount)); // Exponential backoff
        }
      }
    }

    
    if (!codeFound) {
      const artifacts = extractArtifacts(fullResponse);

      if (artifacts.length > 0) {
        onCodeUpdate(artifacts[0].content);
        setAICode(await prettier(artifacts[0].content));
      }
    }
    // Check if the response contains code modifications
    

    saveMessages([...messages, newMessage, {
      ...assistantMessage,
      content: fullResponse,
    }]);
    setIsStreaming(false);
    await continueWithOpenAI(fullResponse, codeNow);

  };

 async function continueWithOpenAI(fullResponse: string, codeNow:string) {
  setIsStreaming(true);
  let code = '';
  let isResponseComplete = false;
    const responseOpenAI = await fetch("/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [  {
          "role": "system",
          "content": gptSystem
        },{
          "role": "user",
          "content": codeNow + `
            **** instructions ****
          `+ fullResponse
        }]})});

        if (!responseOpenAI.ok) {
          throw new Error(`HTTP error! status: ${responseOpenAI.status}`);
        }

        const reader = responseOpenAI.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("Response body is not readable!");
        }

        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            isResponseComplete = true;
            break;
          }

          const chunk = decoder.decode(value);
          code += chunk;
          
        
          setMessages((prevMessages) => {
            const updatedMessages = [...prevMessages];
            const lastMessage = updatedMessages[updatedMessages.length - 1];
            lastMessage.content = fullResponse + `
              
            ` + code ;
            return updatedMessages;
          });
        }
        const codeModificationRegex = /```(?:typescript?|javascript?)\n([\s\S]*?)```/g;
    const matches = code.match(codeModificationRegex);

    if (matches) {
      const modifiedCode = matches[matches.length - 1].replace(
        /```(?:typescript?|javascript?)\n|```/g,
        "",
      );
      onCodeUpdate(modifiedCode);
      setAICode(modifiedCode);
    }
        setIsStreaming(false)
      }

  const handleResetChat = () => {
    setMessages([]);
    localStorage.removeItem(`chatMessages-${codeSpace}`);
    broadcastChannel.current?.postMessage({
      type: `update_messages-${codeSpace}`,
      messages: [],
    });
  };

  const handleEditMessage = (messageId: string) => {
    const messageToEdit = messages.find((msg) => msg.id === messageId);
    if (messageToEdit) {
      setEditingMessageId(messageId);
      setEditInput(messageToEdit.content);
    }
  };

  const handleCancelEdit = () => {
    setEditingMessageId(null);
    setEditInput("");
  };

  const handleSaveEdit = (messageId: string) => {
    const updatedMessages = messages.map((
      msg,
    ) => (msg.id === messageId ? { ...msg, content: editInput } : msg));
    setMessages(updatedMessages);
    saveMessages(updatedMessages);
    setEditingMessageId(null);
    setEditInput("");
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    broadcastChannel.current?.postMessage({
      type: `update_dark_mode-${codeSpace}`,
      isDarkMode: newMode,
    });
  };

  return (
    <ChatFC 
    isOpen={isOpen} onClose={onClose}
    handleEditMessage={handleEditMessage}
    handleResetChat={handleResetChat}
    handleSaveEdit={handleSaveEdit}
    handleSendMessage={handleSendMessage}
    isStreaming={isStreaming}
    messages={messages}
    messagesEndRef={messagesEndRef}
    isDarkMode={isDarkMode}
    toggleDarkMode={toggleDarkMode}
    editingMessageId={editingMessageId}
    editInput={editInput}
    setEditInput={setEditInput}
    input={input}
    setInput={setInput}
    inputRef={inputRef}
    handleCancelEdit={handleCancelEdit}
    />
   
  );
};

export default ChatInterface;

