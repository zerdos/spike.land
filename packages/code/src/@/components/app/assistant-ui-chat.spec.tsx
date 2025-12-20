import { Thread } from "@/components/assistant-ui/thread";
import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AssistantUIChat } from "./assistant-ui-chat";

// Mock the dependencies
vi.mock("@/components/assistant-ui/thread", () => ({
  Thread: vi.fn(function Thread() {
    return <div data-testid="thread">Thread Component</div>;
  }),
}));

vi.mock("@assistant-ui/react", () => ({
  AssistantRuntimeProvider: vi.fn(function AssistantRuntimeProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }),
  useThreadRuntime: vi.fn(function useThreadRuntime() {
    return {
      composer: {
        setText: vi.fn(),
        send: vi.fn(),
      },
    };
  }),
}));

vi.mock("@assistant-ui/react-ai-sdk", () => ({
  useChatRuntime: vi.fn(),
  AssistantChatTransport: vi.fn(function AssistantChatTransport() {
    // Mock transport implementation
  }),
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
    render(<AssistantUIChat codeSpace={mockCodeSpace} />);

    expect(screen.getByTestId("thread")).toBeInTheDocument();
  });

  it("should provide the runtime to AssistantRuntimeProvider", () => {
    render(<AssistantUIChat codeSpace={mockCodeSpace} />);

    expect(AssistantRuntimeProvider).toHaveBeenCalled();
    const mockFn = AssistantRuntimeProvider as unknown as ReturnType<typeof vi.fn>;
    const callArgs = mockFn.mock?.calls[0]?.[0];
    expect(callArgs).toHaveProperty("runtime", mockRuntime);
  });

  it("should create runtime with correct transport", () => {
    render(<AssistantUIChat codeSpace={mockCodeSpace} />);

    expect(useChatRuntime).toHaveBeenCalledWith(
      expect.objectContaining({
        transport: expect.any(Object),
      })
    );
  });

  it("should create transport with correct API endpoint", () => {
    render(<AssistantUIChat codeSpace={mockCodeSpace} />);

    expect(AssistantChatTransport).toHaveBeenCalledWith({
      api: `/live/${mockCodeSpace}/messages`,
    });
  });

  it("should handle rendering without errors", () => {
    render(<AssistantUIChat codeSpace={mockCodeSpace} />);

    expect(useChatRuntime).toHaveBeenCalled();
  });

  it("should render Thread component from assistant-ui", () => {
    render(<AssistantUIChat codeSpace={mockCodeSpace} />);

    expect(Thread).toHaveBeenCalled();
  });
});