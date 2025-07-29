import { Thread } from "@/components/assistant-ui/thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import React from "react";
import type { Message } from "ai";

interface AssistantUIChatProps {
  codeSpace: string;
  initialMessages: Message[];
}

export const AssistantUIChat: React.FC<AssistantUIChatProps> = React.memo(
  ({ codeSpace, initialMessages }) => {
    // Filter out messages with 'data' role as they're not supported by ThreadMessageLike
    const filteredMessages = initialMessages.filter(
      msg => msg.role === 'user' || msg.role === 'assistant' || msg.role === 'system'
    );
    
    // Create runtime with initial messages
    const runtime = useChatRuntime({
      api: `/live/${codeSpace}/messages`,
      initialMessages: filteredMessages as any, // Type assertion to bypass strict type checking
    });

    return (
      <AssistantRuntimeProvider runtime={runtime}>
        <Thread />
      </AssistantRuntimeProvider>
    );
  }
);

AssistantUIChat.displayName = "AssistantUIChat";