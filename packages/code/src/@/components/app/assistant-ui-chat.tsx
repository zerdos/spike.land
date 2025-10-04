import { Thread } from "@/components/assistant-ui/thread";
import type { ImageData } from "@/lib/interfaces";
import { AssistantRuntimeProvider, useThreadRuntime } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import React, { useEffect, useRef } from "react";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  id?: string;
}

interface AssistantUIChatProps {
  codeSpace: string;
  initialMessages?: Message[]; // Optional since runtime handles initial state
  initialPrompt?:
    | {
      prompt: string;
      images: ImageData[];
    }
    | null
    | undefined;
}

export const AssistantUIChat: React.FC<AssistantUIChatProps> = React.memo(
  ({ codeSpace, initialPrompt }) => {
    // The runtime will handle message filtering based on supported roles

    // Use the assistant-ui chat runtime with proper transport
    const runtime = useChatRuntime({
      transport: new AssistantChatTransport({
        api: `/live/${codeSpace}/messages`,
      }),
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

        // Image handling: assistant-ui library does not currently support image attachments
        // via the composer runtime API. Images would need to be handled by:
        // 1. Extending the AssistantChatTransport to include image data in the request
        // 2. Server-side processing to handle image content
        // 3. Custom UI components for image preview in the composer
        // For now, we log images for debugging but don't send them
        if (initialPrompt.images.length > 0) {
          console.log("Images detected in initial prompt:", initialPrompt.images);
          console.warn(
            "Image attachments are not currently supported by the assistant-ui composer. " +
            "Consider implementing custom image handling in the transport layer.",
          );
        }
      }
    }
  }, [initialPrompt, threadRuntime]);

  return null;
};

AssistantUIChat.displayName = "AssistantUIChat";
