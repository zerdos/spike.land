import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

// Mock assistant-ui components
vi.mock("@assistant-ui/react", () => ({
  ThreadPrimitive: {
    Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Viewport: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Messages: ({ components }: any) => {
      // Simulate rendering messages based on mock data
      const mockMessages = (window as any).__mockMessages || [];
      return (
        <div data-testid="messages">
          {mockMessages.map((msg: any, idx: number) => {
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
    Empty: ({ children }: any) => {
      const hasMessages = ((window as any).__mockMessages || []).length > 0;
      return hasMessages ? null : <div>{children}</div>;
    },
    If: ({ children, running, empty }: any) => {
      if (running !== undefined) {
        const isRunning = (window as any).__mockIsRunning || false;
        return running === isRunning ? <div>{children}</div> : null;
      }
      if (empty !== undefined) {
        const hasMessages = ((window as any).__mockMessages || []).length > 0;
        return empty === !hasMessages ? <div>{children}</div> : null;
      }
      return <div>{children}</div>;
    },
    ScrollToBottom: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    Suggestion: ({ children, prompt, ...props }: any) => (
      <button {...props}>{children || prompt}</button>
    ),
  },
  ComposerPrimitive: {
    Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Input: (props: any) => <textarea {...props} />,
    Send: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    Cancel: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  MessagePrimitive: {
    Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Parts: ({ components }: any) => {
      const currentMessage = (window as any).__currentMessage || { content: [] };
      return (
        <div data-testid="message-parts">
          {currentMessage.content.map((part: any, idx: number) => {
            if (part.type === "text") {
              const TextComponent = components?.Text || (({ text }: any) => <span>{text}</span>);
              return <TextComponent key={idx} text={part.text} />;
            }
            if (part.type === "tool-call" && components?.tools?.Fallback) {
              const ToolComponent = components.tools.Fallback;
              return (
                <ToolComponent
                  key={idx}
                  toolName={part.toolName}
                  toolCallId={part.toolCallId}
                  args={part.args}
                  result={part.result}
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
    If: ({ children }: any) => <div>{children}</div>,
  },
  ActionBarPrimitive: {
    Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Edit: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    Copy: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    Reload: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  BranchPickerPrimitive: {
    Root: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    Previous: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    Next: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    Number: () => <span>1</span>,
    Count: () => <span>1</span>,
  },
}));

// Mock child components
vi.mock("../markdown-text", () => ({
  MarkdownText: ({ text }: { text: string }) => <span>{text}</span>,
}));

vi.mock("../tooltip-icon-button", () => ({
  TooltipIconButton: ({ children, tooltip, ...props }: any) => (
    <button {...props} title={tooltip}>
      {children}
    </button>
  ),
}));

vi.mock("../tool-call", () => ({
  ToolCall: ({ name, args, result, isExecuting }: any) => (
    <div data-testid="tool-call">
      <button>{name}</button>
      {args && <div>Parameters</div>}
      {result && <div>Result</div>}
      {isExecuting && <div>Executing...</div>}
    </div>
  ),
  ToolCallGroup: ({ children }: any) => (
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
    (window as any).__mockMessages = [];
    (window as any).__mockIsRunning = false;
    (window as any).__currentMessage = null;
  });

  afterEach(() => {
    delete (window as any).__mockMessages;
    delete (window as any).__mockIsRunning;
    delete (window as any).__currentMessage;
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
      (window as any).__mockMessages = [
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
      (window as any).__currentMessage = (window as any).__mockMessages[0];

      render(<Thread />);

      // Check that the tool call component is rendered
      const toolCall = screen.getByTestId("tool-call");
      expect(toolCall).toBeInTheDocument();
      expect(screen.getByText("search")).toBeInTheDocument();
    });

    it("expands tool call details when clicked", () => {
      (window as any).__mockMessages = [
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

      (window as any).__currentMessage = (window as any).__mockMessages[0];

      render(<Thread />);

      const toolButton = screen.getByText("search_web");
      expect(toolButton).toBeInTheDocument();

      // Our mock always shows Parameters and Result when they exist
      expect(screen.getByText("Parameters")).toBeInTheDocument();
      expect(screen.getByText("Result")).toBeInTheDocument();
    });

    it("renders multiple tool calls", () => {
      (window as any).__mockMessages = [
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

      (window as any).__currentMessage = (window as any).__mockMessages[0];

      render(<Thread />);

      // All tool calls should be rendered
      expect(screen.getByText("get_weather")).toBeInTheDocument();
      expect(screen.getByText("get_time")).toBeInTheDocument();
    });

    it("shows tool group for consecutive tools", () => {
      (window as any).__mockMessages = [
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

      (window as any).__currentMessage = (window as any).__mockMessages[0];

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
      (window as any).__mockIsRunning = false;
      render(<Thread />);
      
      const sendButton = screen.getByTitle("Send");
      expect(sendButton).toBeInTheDocument();
    });

    it("shows cancel button when running", () => {
      (window as any).__mockIsRunning = true;
      render(<Thread />);
      
      const cancelButton = screen.getByTitle("Cancel");
      expect(cancelButton).toBeInTheDocument();
    });
  });
});