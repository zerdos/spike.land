import { useState } from 'react';
import { Message } from '../ChatDrawer';
import { antropic, reminder } from '../initialMessage';
import { prettier } from '../shared';
import { extractArtifacts } from '../utils/extractArtifacts';

export const useMessageHandling = (
  messages: Message[],
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
  onCodeUpdate: (code: string) => void,
  codeSpace: string
) => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [codeFound, setCodeFound] = useState(false);
  const [codeWhatAiSeen, setAICode] = useState("");

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const isFirstMessage = messages.length === 0;
    const codeNow = await prettier(
      await fetch(`/live/${codeSpace}/code/index.tsx`).then((res) => res.text()),
    );

    fetch(`/live/${codeSpace}/auto-save`);
    setCodeFound(false);

    let claudeContent = content;
    if (isFirstMessage || codeNow !== codeWhatAiSeen) {
      claudeContent = antropic.replace(/{{FILENAME}}/g, codeSpace + ".tsx")
        .replace(/{{FILE_CONTENT}}/g, codeNow)
        .replace(/{{USERPROMT}}/g, content);
      setAICode(codeNow);
    } else {
      claudeContent = content + reminder;
    }

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: claudeContent.trim(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setIsStreaming(true);

    // Note: sendToAnthropic and continueWithOpenAI should be implemented in useAIProcessing hook
  };

  return {
    isStreaming,
    setIsStreaming,
    codeFound,
    setCodeFound,
    codeWhatAiSeen,
    setAICode,
    handleSendMessage,
  };
};
