import { Thread } from "@/components/assistant-ui/thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AssistantUIChat } from "./assistant-ui-chat";

// Message interface for tests - matches the component interface
interface TestMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
}

// Mock the dependencies
vi.mock("@/components/assistant-ui/thread", () => ({
  Thread: vi.fn(() => <div data-testid="thread">Thread Component</div>),
}));

vi.mock("@assistant-ui/react", () => ({
  AssistantRuntimeProvider: vi.fn(({ children }) => <>{children}</>),
  useThreadRuntime: vi.fn(() => ({
    composer: {
      setText: vi.fn(),
      send: vi.fn(),
    },
  })),
}));

vi.mock("@assistant-ui/react-ai-sdk", () => ({
  useChatRuntime: vi.fn(),
}));

describe("AssistantUIChat", () => {
  const mockCodeSpace = "test-space";
  const mockRuntime = {
    id: "mock-runtime",
    // Add other runtime properties as needed
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useChatRuntime as ReturnType<typeof vi.fn>).mockReturnValue(mockRuntime);
  });

  it("should render the Thread component", () => {
    const messages: TestMessage[] = [];
    render(<AssistantUIChat codeSpace={mockCodeSpace} initialMessages={messages} />);

    expect(screen.getByTestId("thread")).toBeInTheDocument();
  });

  it("should provide the runtime to AssistantRuntimeProvider", () => {
    const messages: TestMessage[] = [];
    render(<AssistantUIChat codeSpace={mockCodeSpace} initialMessages={messages} />);

    expect(AssistantRuntimeProvider).toHaveBeenCalled();
    const mockFn = AssistantRuntimeProvider as unknown as ReturnType<typeof vi.fn>;
    const callArgs = mockFn.mock?.calls[0]?.[0];
    expect(callArgs).toHaveProperty("runtime", mockRuntime);
  });

  it("should create runtime with correct API endpoint", () => {
    const messages: TestMessage[] = [];
    render(<AssistantUIChat codeSpace={mockCodeSpace} initialMessages={messages} />);

    expect(useChatRuntime).toHaveBeenCalledWith({
      api: `/live/${mockCodeSpace}/messages`,
      initialMessages: messages,
    });
  });

  it("should filter out messages with 'data' role", () => {
    const messages: TestMessage[] = [
      { id: "1", role: "user", content: "Hello" },
      { id: "2", role: "assistant", content: "Hi there" },
      { id: "3", role: "system", content: "Some data" },
      { id: "4", role: "system", content: "System message" },
    ];

    render(<AssistantUIChat codeSpace={mockCodeSpace} initialMessages={messages} />);

    const expectedMessages = [
      { id: "1", role: "user", content: "Hello" },
      { id: "2", role: "assistant", content: "Hi there" },
      { id: "4", role: "system", content: "System message" },
    ];

    expect(useChatRuntime).toHaveBeenCalledWith({
      api: `/live/${mockCodeSpace}/messages`,
      initialMessages: expectedMessages,
    });
  });

  it("should handle empty initial messages", () => {
    const messages: TestMessage[] = [];
    render(<AssistantUIChat codeSpace={mockCodeSpace} initialMessages={messages} />);

    expect(useChatRuntime).toHaveBeenCalledWith({
      api: `/live/${mockCodeSpace}/messages`,
      initialMessages: [],
    });
  });

  it("should render Thread component from assistant-ui", () => {
    const messages: TestMessage[] = [];
    render(<AssistantUIChat codeSpace={mockCodeSpace} initialMessages={messages} />);

    expect(Thread).toHaveBeenCalled();
  });

  it("should memoize the component", () => {
    expect(AssistantUIChat.displayName).toBe("AssistantUIChat");
    expect(typeof AssistantUIChat).toBe("object");
    expect("$$typeof" in AssistantUIChat).toBe(true);
  });
});
