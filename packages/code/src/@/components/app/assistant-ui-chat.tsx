import { Thread } from "@/components/assistant-ui/thread";
import type { ImageData } from "@/lib/interfaces";
import { AssistantRuntimeProvider, useThreadRuntime } from "@assistant-ui/react";
import type { ThreadMessageLike } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import type { Message } from "ai";
import React, { useEffect, useRef } from "react";

interface AssistantUIChatProps {
  codeSpace: string;
  initialMessages: Message[];
  initialPrompt?:
    | {
      prompt: string;
      images: ImageData[];
    }
    | null
    | undefined;
}

export const AssistantUIChat: React.FC<AssistantUIChatProps> = React.memo(
  ({ codeSpace, initialMessages, initialPrompt }) => {
    // Filter out messages with 'data' role as they're not supported by ThreadMessageLike
    const filteredMessages = initialMessages.filter(
      msg => msg.role === "user" || msg.role === "assistant" || msg.role === "system",
    );

    // Create runtime with initial messages
    const runtime = useChatRuntime({
      api: `/live/${codeSpace}/messages`,
      initialMessages: filteredMessages as unknown as ThreadMessageLike[],
    });

    return (
      <AssistantRuntimeProvider runtime={runtime}>
        <Thread />
        <AutoSendInitialPrompt initialPrompt={initialPrompt} />
      </AssistantRuntimeProvider>
    );
  },
);

// Component to handle auto-sending the initial prompt
const AutoSendInitialPrompt: React.FC<{
  initialPrompt?:
    | {
      prompt: string;
      images: ImageData[];
    }
    | null
    | undefined;
}> = ({ initialPrompt }) => {
  const threadRuntime = useThreadRuntime();
  const hasSentRef = useRef(false);

  useEffect(() => {
    // Prevent multiple sends and validate prompt
    if (
      initialPrompt &&
      threadRuntime &&
      !hasSentRef.current &&
      initialPrompt.prompt.trim() // Only send non-empty prompts
    ) {
      // Get the composer runtime from the thread runtime
      const composerRuntime = threadRuntime.composer;

      if (composerRuntime) {
        // Mark as sent before actually sending to prevent race conditions
        hasSentRef.current = true;

        // Set the text and send it
        composerRuntime.setText(initialPrompt.prompt);
        composerRuntime.send();

        // TODO: Handle images if needed in the future
        if (initialPrompt.images.length > 0) {
          console.log("Images detected in initial prompt:", initialPrompt.images);
          // Images will need to be handled based on the API's capability
        }
      }
    }
  }, [initialPrompt, threadRuntime]);

  return null;
};

AssistantUIChat.displayName = "AssistantUIChat";
