import type { ChatDrawerProps } from "@/lib/interfaces";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies first
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn(() => "test-space"),
}));

vi.mock("@/hooks/use-dictation", () => ({
  useDictation: () => ["", vi.fn()],
}));

vi.mock("@/hooks/useScreenshot", () => ({
  useScreenshot: vi.fn(() => ({
    isScreenshotLoading: false,
    screenshotImage: null,
    handleScreenshotClick: vi.fn(),
    handleCancelScreenshot: vi.fn(),
  })),
}));

vi.mock("@/components/app/chat-drawer", () => ({
  ChatDrawer: (props: ChatDrawerProps) => (
    <div role="dialog" aria-label="chat drawer" data-testid="chat-drawer">
      <span data-testid="darkMode">{props.isDarkMode ? "dark" : "light"}</span>
      <button
        role="button"
        aria-label="Reset Chat"
        onClick={props.handleResetChat}
        data-testid="reset-chat-button"
      >
        Reset Chat
      </button>
    </div>
  ),
}));

// Other imports after mocks
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { ICode, ICodeSession, Message } from "@/lib/interfaces";
import { fireEvent, waitFor } from "@testing-library/dom";
import { render } from "@testing-library/react";
import { act } from "react";
import { ChatInterface } from "@/../ChatInterface";

// Mock BroadcastChannel with proper event handling
class MockBroadcastChannel {
  private static channels: Map<string, MockBroadcastChannel[]> = new Map<
    string,
    MockBroadcastChannel[]
  >();
  private listeners: Map<string, Set<(event: MessageEvent) => void>> = new Map<
    string,
    Set<(event: MessageEvent) => void>
  >();
  private messageHandlers: Array<(event: MessageEvent) => void> = [];

  constructor(public name: string) {
    const channels = MockBroadcastChannel.channels.get(name) || [];
    channels.push(this);
    MockBroadcastChannel.channels.set(name, channels);
  }

  postMessage(message: {
    instructions?: string;
    isStreaming?: boolean;
    messages?: Message[];
    editingMessageId?: string;
    chunk?: string;
    code?: string;
    transpiled?: string;
    debugInfo?: unknown;
  }) {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const event = new MessageEvent("message", { data: message });

    channels.forEach((channel) => {
      if (channel !== this) {
        if (channel.onmessage) {
          channel.onmessage(event);
        }
        channel.messageHandlers.forEach((handler) => handler(event));
        channel.listeners.get("message")?.forEach((listener) => listener(event));
      }
    });
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
    this.messageHandlers.push(listener);
  }

  onmessage: ((event: MessageEvent) => void) | null = null;

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    this.listeners.get(type)?.delete(listener);
    this.messageHandlers = this.messageHandlers.filter((h) => h !== listener);
  }

  close() {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const index = channels.indexOf(this);
    if (index > -1) {
      channels.splice(index, 1);
    }
    MockBroadcastChannel.channels.delete(this.name);
    this.listeners.clear();
    this.messageHandlers = [];
    this.onmessage = null;
  }

  static clearAll() {
    MockBroadcastChannel.channels.clear();
  }

  static hasChannel(name: string): boolean {
    return MockBroadcastChannel.channels.has(name);
  }
}

beforeAll(() => {
  global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
});

afterAll(() => {
  MockBroadcastChannel.clearAll();
});

// Mock ICode interface
const createMockSession = (initialMessages: Message[] = []) => {
  let messages = initialMessages.map((msg) => ({ ...msg }));
  const subscribers = new Set<(session: ICodeSession) => void>();

  const session: ICodeSession = {
    messages: messages.map((msg) => ({ ...msg })),
    codeSpace: "test-space",
    html: "<div>testHtml</div>",
    css: ".testCss { /* mock css */ }",
    code: "testCode",
    transpiled: "testTranspiled",
  };

  const mockInstance: ICode = {
    getCodeSpace: vi.fn().mockReturnValue(session.codeSpace),
    getSession: vi.fn().mockImplementation(async () => ({
      ...session,
      messages: [...messages],
    })),
    setSession: vi.fn(),
    init: vi.fn(),
    getMessages: vi.fn().mockReturnValue(messages),
    addMessage: vi.fn().mockImplementation((newMessage: Message) => {
      messages.push({ ...newMessage });
      const updatedSession = {
        ...session,
        messages: messages.map((msg) => ({ ...msg })),
      };
      subscribers.forEach((sub) => sub(updatedSession));
      return true;
    }),
    removeMessages: vi.fn().mockImplementation(() => {
      if (messages.length === 0) return false;
      messages = [];
      const updatedSession = {
        ...session,
        messages: [],
      };
      subscribers.forEach((sub) => sub(updatedSession));
      return true;
    }),
    setCode: vi.fn(),
    getCode: vi.fn(),
    addMessageChunk: vi.fn().mockImplementation((chunk: string) => {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage && lastMessage.role === "assistant") {
        lastMessage.content += chunk;
      } else {
        messages.push({
          id: String(messages.length + 1),
          role: "assistant",
          content: chunk,
        });
      }
      const updatedSession = {
        ...session,
        messages: messages.map((msg) => ({ ...msg })),
      };
      subscribers.forEach((sub) => sub(updatedSession));
    }),
    sub: vi.fn().mockImplementation((callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }),
    screenshot: vi.fn(),
  };

  return mockInstance;
};

describe("ChatInterface", () => {
  let mockSession: ICode;

  beforeEach(async () => {
    vi.clearAllMocks();
    global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;
    mockSession = createMockSession();
    const useDarkModeMock = await import("@/hooks/use-dark-mode");
    vi.spyOn(useDarkModeMock, "useDarkMode").mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: vi.fn(),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    MockBroadcastChannel.clearAll();
  });

  const renderWithContext = (ui: React.ReactElement) => {
    return render(
      <ThemeProvider>
        {ui}
      </ThemeProvider>,
    );
  };

  it("handles chat reset", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "test message" },
    ];
    mockSession = createMockSession(initialMessages);

    const { getByTestId } = renderWithContext(
      <ChatInterface
        isOpen={true}
        codeSpace="test-space"
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    await act(async () => {
      const resetButton = getByTestId("reset-chat-button");
      expect(resetButton).toBeInTheDocument();
      fireEvent.click(resetButton);
    });

    expect(mockSession.removeMessages).toHaveBeenCalled();
  });
});
