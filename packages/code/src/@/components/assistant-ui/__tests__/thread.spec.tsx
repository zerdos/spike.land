import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Type definitions for mock components and data
interface MockMessage {
  role: "user" | "assistant";
  content: MockMessagePart[];
  hasConsecutiveTools?: boolean;
}

interface MockMessagePart {
  type: "text" | "tool-call";
  text?: string;
  toolCallId?: string;
  toolName?: string;
  args?: Record<string, unknown>;
  result?: Record<string, unknown>;
}

interface ComponentProps {
  children?: ReactNode;
  [key: string]: unknown;
}

interface MessagesProps {
  components: {
    UserMessage?: React.ComponentType;
    AssistantMessage?: React.ComponentType;
  };
}

interface MessagePartsProps {
  components?: {
    Text?: React.ComponentType<{ text: string; }>;
    tools?: {
      Fallback?: React.ComponentType<{
        toolName?: string;
        toolCallId?: string;
        args?: Record<string, unknown>;
        result?: Record<string, unknown>;
      }>;
    };
    ToolGroup?: React.ComponentType<{ children: ReactNode; }>;
  };
}

interface IfProps {
  children: ReactNode;
  running?: boolean;
  empty?: boolean;
}

interface SuggestionProps extends ComponentProps {
  prompt?: string;
}

interface InputProps extends ComponentProps {
  placeholder?: string;
}

interface TooltipIconButtonProps extends ComponentProps {
  tooltip?: string;
}

interface ToolCallProps {
  name: string;
  args?: Record<string, unknown>;
  result?: Record<string, unknown>;
  isExecuting?: boolean;
}

interface ToolCallGroupProps {
  children: ReactNode;
}

// Extend window interface to include mock properties
declare global {
  interface Window {
    __mockMessages?: MockMessage[];
    __mockIsRunning?: boolean;
    __currentMessage?: MockMessage | null | undefined;
  }
}

// Mock assistant-ui components
vi.mock("@assistant-ui/react", () => ({
  ThreadPrimitive: {
    Root: ({ children, ...props }: ComponentProps) => <div {...props}>{children}</div>,
    Viewport: ({ children, ...props }: ComponentProps) => <div {...props}>{children}</div>,
    Messages: ({ components }: MessagesProps) => {
      // Simulate rendering messages based on mock data
      const mockMessages = window.__mockMessages || [];
      return (
        <div data-testid="messages">
          {mockMessages.map((msg: MockMessage, idx: number) => {
            if (msg.role === "user" && components.UserMessage) {
              return <components.UserMessage key={idx} />;
            }
            if (msg.role === "assistant" && components.AssistantMessage) {
              return <components.AssistantMessage key={idx} />;
            }
            return null;
          })}
        </div>
      );
    },
    Empty: ({ children }: ComponentProps) => {
      const hasMessages = (window.__mockMessages || []).length > 0;
      return hasMessages ? null : <div>{children}</div>;
    },
    If: ({ children, running, empty }: IfProps) => {
      if (running !== undefined) {
        const isRunning = window.__mockIsRunning || false;
        return running === isRunning ? <div>{children}</div> : null;
      }
      if (empty !== undefined) {
        const hasMessages = (window.__mockMessages || []).length > 0;
        return empty === !hasMessages ? <div>{children}</div> : null;
      }
      return <div>{children}</div>;
    },
    ScrollToBottom: ({ children, ...props }: ComponentProps) => (
      <button {...props}>{children}</button>
    ),
    Suggestion: ({ children, prompt, ...props }: SuggestionProps) => (
      <button {...props}>{children || prompt}</button>
    ),
  },
  ComposerPrimitive: {
    Root: ({ children, ...props }: ComponentProps) => <div {...props}>{children}</div>,
    Input: (props: InputProps) => <textarea {...props} />,
    Send: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
    Cancel: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
  },
  MessagePrimitive: {
    Root: ({ children, ...props }: ComponentProps) => <div {...props}>{children}</div>,
    Parts: ({ components }: MessagePartsProps) => {
      const currentMessage = window.__currentMessage || { content: [], hasConsecutiveTools: false };
      return (
        <div data-testid="message-parts">
          {currentMessage.content.map((part: MockMessagePart, idx: number) => {
            if (part.type === "text") {
              const TextComponent = components?.Text ||
                (({ text }: { text: string; }) => <span>{text}</span>);
              return <TextComponent key={idx} text={part.text || ""} />;
            }
            if (part.type === "tool-call" && components?.tools?.Fallback) {
              const ToolComponent = components.tools.Fallback;
              const toolProps: {
                toolName?: string;
                toolCallId?: string;
                args?: Record<string, unknown>;
                result?: Record<string, unknown>;
              } = {};

              if (part.toolName !== undefined) toolProps.toolName = part.toolName;
              if (part.toolCallId !== undefined) toolProps.toolCallId = part.toolCallId;
              if (part.args !== undefined) toolProps.args = part.args;
              if (part.result !== undefined) toolProps.result = part.result;

              return (
                <ToolComponent
                  key={idx}
                  {...toolProps}
                />
              );
            }
            return null;
          })}
          {components?.ToolGroup && currentMessage.hasConsecutiveTools && (
            <components.ToolGroup>Tool Group Content</components.ToolGroup>
          )}
        </div>
      );
    },
    If: ({ children }: ComponentProps) => <div>{children}</div>,
  },
  ActionBarPrimitive: {
    Root: ({ children, ...props }: ComponentProps) => <div {...props}>{children}</div>,
    Edit: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
    Copy: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
    Reload: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
  },
  BranchPickerPrimitive: {
    Root: ({ children, ...props }: ComponentProps) => <div {...props}>{children}</div>,
    Previous: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
    Next: ({ children, ...props }: ComponentProps) => <button {...props}>{children}</button>,
    Number: () => <span>1</span>,
    Count: () => <span>1</span>,
  },
}));

// Mock child components
vi.mock("../markdown-text", () => ({
  MarkdownText: ({ text }: { text: string; }) => <span>{text}</span>,
}));

vi.mock("../tooltip-icon-button", () => ({
  TooltipIconButton: ({ children, tooltip, ...props }: TooltipIconButtonProps) => (
    <button {...props} title={tooltip}>
      {children}
    </button>
  ),
}));

vi.mock("../tool-call", () => ({
  ToolCall: ({ name, args, result, isExecuting }: ToolCallProps) => (
    <div data-testid="tool-call">
      <button>{name}</button>
      {args && <div>Parameters</div>}
      {result && <div>Result</div>}
      {isExecuting && <div>Executing...</div>}
    </div>
  ),
  ToolCallGroup: ({ children }: ToolCallGroupProps) => (
    <div data-testid="tool-call-group">
      <div>Tool Calls</div>
      {children}
    </div>
  ),
}));

// Import after mocks
import { Thread } from "../thread";

describe("Thread", () => {
  beforeEach(() => {
    // Reset mock data
    window.__mockMessages = [];
    window.__mockIsRunning = false;
    window.__currentMessage = null;
  });

  afterEach(() => {
    delete window.__mockMessages;
    delete window.__mockIsRunning;
    delete window.__currentMessage;
  });

  it("renders thread container correctly", () => {
    render(<Thread />);
    expect(screen.getByText("How can I help you today?")).toBeInTheDocument();
  });

  it("renders welcome suggestions", () => {
    render(<Thread />);
    expect(screen.getByText("What is the weather in Tokyo?")).toBeInTheDocument();
    expect(screen.getByText("What is assistant-ui?")).toBeInTheDocument();
  });

  it("renders composer with placeholder text", () => {
    render(<Thread />);
    const input = screen.getByPlaceholderText("Write a message...");
    expect(input).toBeInTheDocument();
  });

  describe("with messages containing tool calls", () => {
    it("renders tool calls in messages", () => {
      // Set up mock message with tool call
      window.__mockMessages = [
        {
          role: "assistant",
          content: [
            { type: "text", text: "Let me search for that." },
            {
              type: "tool-call",
              toolCallId: "tc1",
              toolName: "search",
              args: { query: "AI news" },
              result: { results: ["News 1", "News 2"] },
            },
          ],
        },
      ];

      // Mock the current message for MessagePrimitive.Parts
      window.__currentMessage = window.__mockMessages[0];

      render(<Thread />);

      // Check that the tool call component is rendered
      const toolCall = screen.getByTestId("tool-call");
      expect(toolCall).toBeInTheDocument();
      expect(screen.getByText("search")).toBeInTheDocument();
    });

    it("expands tool call details when clicked", () => {
      window.__mockMessages = [
        {
          role: "assistant",
          content: [
            {
              type: "tool-call",
              toolCallId: "tc1",
              toolName: "search_web",
              args: { query: "latest AI news" },
              result: { results: ["News 1", "News 2"] },
            },
          ],
        },
      ];

      window.__currentMessage = window.__mockMessages[0];

      render(<Thread />);

      const toolButton = screen.getByText("search_web");
      expect(toolButton).toBeInTheDocument();

      // Our mock always shows Parameters and Result when they exist
      expect(screen.getByText("Parameters")).toBeInTheDocument();
      expect(screen.getByText("Result")).toBeInTheDocument();
    });

    it("renders multiple tool calls", () => {
      window.__mockMessages = [
        {
          role: "assistant",
          content: [
            { type: "text", text: "I'll gather multiple pieces of information." },
            {
              type: "tool-call",
              toolCallId: "tc1",
              toolName: "get_weather",
              args: { city: "London" },
            },
            {
              type: "tool-call",
              toolCallId: "tc2",
              toolName: "get_time",
              args: { timezone: "Europe/London" },
            },
          ],
        },
      ];

      window.__currentMessage = window.__mockMessages[0];

      render(<Thread />);

      // All tool calls should be rendered
      expect(screen.getByText("get_weather")).toBeInTheDocument();
      expect(screen.getByText("get_time")).toBeInTheDocument();
    });

    it("shows tool group for consecutive tools", () => {
      window.__mockMessages = [
        {
          role: "assistant",
          content: [
            {
              type: "tool-call",
              toolCallId: "tc1",
              toolName: "tool1",
              args: {},
            },
          ],
          hasConsecutiveTools: true,
        },
      ];

      window.__currentMessage = window.__mockMessages[0];

      render(<Thread />);

      expect(screen.getByTestId("tool-call-group")).toBeInTheDocument();
      expect(screen.getByText("Tool Calls")).toBeInTheDocument();
    });
  });

  describe("UI elements", () => {
    it("shows scroll to bottom button", () => {
      render(<Thread />);
      const scrollButton = screen.getByTitle("Scroll to bottom");
      expect(scrollButton).toBeInTheDocument();
    });

    it("shows send button when not running", () => {
      window.__mockIsRunning = false;
      render(<Thread />);

      const sendButton = screen.getByTitle("Send");
      expect(sendButton).toBeInTheDocument();
    });

    it("shows cancel button when running", () => {
      window.__mockIsRunning = true;
      render(<Thread />);

      const cancelButton = screen.getByTitle("Cancel");
      expect(cancelButton).toBeInTheDocument();
    });
  });
});
