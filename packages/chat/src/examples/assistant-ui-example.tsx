/**
 * Example usage of assistant-ui components with AI SDK integration
 * This demonstrates how to use the components with a runtime
 */

import { useChat } from "@ai-sdk/react";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useVercelUseChatRuntime } from "@assistant-ui/react-ai-sdk";
import type { FC } from "react";
import { ChatInterface } from "../components/assistant-ui/chat-interface";
import { Thread } from "../components/assistant-ui/thread";

/**
 * Basic example using Thread component with useChat from AI SDK
 */
export const BasicChatExample: FC = () => {
  const chat = useChat({
    api: "/api/chat",
    // Optional: Add system message or other configuration
    initialMessages: [],
  });

  const runtime = useVercelUseChatRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-screen w-full">
        <Thread
          placeholder="Ask me anything..."
          suggestions={[
            "What can you help me with?",
            "Tell me about your capabilities",
            "How do I get started?",
            "Show me an example",
          ]}
          welcomeMessage="Hello! I'm your AI assistant. How can I help you today?"
          showTimestamps
          allowAttachments
        />
      </div>
    </AssistantRuntimeProvider>
  );
};

/**
 * Example with sidebar and multiple conversations
 */
export const ChatWithSidebarExample: FC = () => {
  return (
    <div className="h-screen w-full">
      <ChatInterface
        showSidebar
        collapsible
        defaultSidebarSize={25}
      />
    </div>
  );
};

/**
 * Custom styled example with dark mode
 */
export const DarkModeExample: FC = () => {
  const chat = useChat({
    api: "/api/chat",
  });

  const runtime = useVercelUseChatRuntime(chat);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-screen w-full dark bg-gray-900">
        <Thread
          className="dark:bg-gray-900"
          placeholder="Type your message..."
          suggestions={[
            "Write a TypeScript function",
            "Explain React hooks",
            "Help with CSS styling",
            "Debug my code",
          ]}
          welcomeMessage="Welcome to Dark Mode Chat"
          showTimestamps
          allowAttachments
          allowVoice
        />
      </div>
    </AssistantRuntimeProvider>
  );
};

/**
 * Example with custom configuration and tools
 */
export const AdvancedExample: FC = () => {
  const chat = useChat({
    api: "/api/chat",
    onFinish: (message) => {
      console.log("Message completed:", message);
    },
    onError: (error) => {
      console.error("Chat error:", error);
    },
  });

  const runtime = useVercelUseChatRuntime(chat);

  // Custom thread configuration
  const threadConfig = {
    assistantMessage: {
      allowReload: true,
      allowCopy: true,
      allowSpeak: true,
    },
    userMessage: {
      allowEdit: true,
    },
    composer: {
      allowAttachments: true,
    },
  };

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <div className="h-screen w-full flex">
        {/* You can add custom sidebars or other UI here */}
        <div className="flex-1">
          <Thread
            config={threadConfig}
            placeholder="Ask me anything..."
            suggestions={[
              "Generate code",
              "Explain a concept",
              "Review my code",
              "Suggest improvements",
            ]}
            showScrollToBottom
            showTimestamps
            allowAttachments
            allowVoice
          />
        </div>
      </div>
    </AssistantRuntimeProvider>
  );
};

/**
 * Minimal example without runtime (static UI only)
 */
export const StaticUIExample: FC = () => {
  return (
    <div className="h-screen w-full">
      <Thread
        placeholder="Type a message..."
        welcomeMessage="This is a static UI example"
        emptyMessage="No messages to display"
        suggestions={[
          "This is just UI",
          "No actual chat functionality",
          "For demonstration only",
        ]}
      />
    </div>
  );
};
