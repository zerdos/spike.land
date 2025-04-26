import type { ChatDrawerProps } from "@/lib/interfaces";
import React, { useRef, useState } from "react"; // Import React, useRef, useState
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
  ChatDrawer: React.forwardRef((props: ChatDrawerProps & { onNewPrompt: (prompt: string) => Promise<void> }, ref) => {
    const [userScrolledUp, setUserScrolledUp] = React.useState(false);

    // Simulate auto-scroll logic using id="after-last-message" as in production
    React.useEffect(() => {
      if (!userScrolledUp && props.messages.length > 0) {
        const lastMessageElement = document.getElementById("after-last-message");
        if (lastMessageElement) {
          lastMessageElement.scrollIntoView();
        }
      }
    }, [props.messages, userScrolledUp]);

    // Simulate scroll event logic (not strictly needed for input/scrollIntoView tests)
    // but could be extended if needed for more accurate scroll state

    const handleSend = async () => {
      if (props.input.trim()) {
        await props.onNewPrompt(props.input);
        props.setInput("");
        if (props.inputRef && props.inputRef.current) {
          props.inputRef.current.value = "";
        }
      }
    };

    return (
      <div role="dialog" aria-label="chat drawer" data-testid="chat-drawer" style={{ height: '300px', overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <span data-testid="darkMode">{props.isDarkMode ? "dark" : "light"}</span>
        <button
          role="button"
          aria-label="Reset Chat"
          onClick={props.handleResetChat}
          data-testid="reset-chat-button"
        >
          Reset Chat
        </button>
        {/* Scrollable container */}
        <div style={{ flexGrow: 1, overflowY: 'auto' }} data-testid="chat-messages-container">
          {props.messages.map((msg, index) => (
            <div key={msg.id || index} data-testid={`message-${index}`}>
              {typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)}
            </div>
          ))}
          <div id="after-last-message" data-testid="messages-end-marker" />
        </div>
        <div>
          <textarea
            ref={props.inputRef}
            value={props.input}
            onChange={(e) => props.setInput(e.target.value)}
            data-testid="message-input"
          />
          <button onClick={handleSend} data-testid="send-button">Send</button>
        </div>
      </div>
    );
  }),
}));

// Other imports after mocks
import { ChatInterface } from "@/../ChatInterface";
import { ThemeProvider } from "@/components/ui/theme-provider";
import type { ICode, ICodeSession, Message } from "@/lib/interfaces";
import { fireEvent, waitFor } from "@testing-library/dom";
import { render, screen } from "@testing-library/react";
import { act } from "react";

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
  // Mock scrollIntoView on all elements
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
    configurable: true,
    value: vi.fn(),
    writable: true,
  });
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

    render(
      <ThemeProvider>
        <ChatInterface
          isOpen={true}
          codeSpace="test-space"
          cSess={mockSession}
          onClose={vi.fn()}
        />
      </ThemeProvider>,
    );

    // First make sure the chat drawer is rendered
    const chatDrawer = await screen.findByTestId("chat-drawer");
    expect(chatDrawer).toBeTruthy();

    // Then find the reset button
    const resetButton = await screen.findByTestId("reset-chat-button");
    expect(resetButton).toBeTruthy();

    await act(async () => {
      fireEvent.click(resetButton);
    });

    expect(mockSession.removeMessages).toHaveBeenCalled();
  });

  it("clears the input field after sending a message", async () => {
    renderWithContext(
      <ChatInterface
        isOpen={true}
        codeSpace="test-space"
        cSess={mockSession}
        onClose={vi.fn()}
      />
    );

    const inputElement = await screen.findByTestId("message-input") as HTMLTextAreaElement;
    const sendButton = await screen.findByTestId("send-button");

    // Type a message
    fireEvent.change(inputElement, { target: { value: "Hello AI" } });
    // Wait for the input value to be updated in the DOM
    await waitFor(() => {
      expect(inputElement.value).toBe("Hello AI");
    });

    // Click send
    await act(async () => {
      fireEvent.click(sendButton);
    });

    // Wait for the input to be cleared
    await waitFor(() => {
      expect(inputElement.value).toBe("");
    });
  });

  it("auto-scrolls to the bottom when new messages arrive during streaming if at the bottom", async () => {
    renderWithContext(
      <ChatInterface
        isOpen={true}
        codeSpace="test-space"
        cSess={mockSession}
        onClose={vi.fn()}
      />
    );

    const chatContainer = await screen.findByTestId("chat-messages-container");
    const messagesEndMarker = await screen.findByTestId("messages-end-marker");

    // Override scrollIntoView with a spy for this element
    const scrollIntoViewMock = vi.fn();
    Object.defineProperty(messagesEndMarker, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock,
      writable: true,
    });

    // Simulate sending a message to trigger streaming
    await act(async () => {
      const inputElement = await screen.findByTestId("message-input") as HTMLTextAreaElement;
      const sendButton = await screen.findByTestId("send-button");
      fireEvent.change(inputElement, { target: { value: "Start streaming" } });
      fireEvent.click(sendButton);
    });

    // Simulate receiving streaming chunks
    await act(async () => {
      mockSession.addMessageChunk("Chunk 1");
    });
    await act(async () => {
      mockSession.addMessageChunk("Chunk 2");
    });

    // Wait for the messages to appear in the DOM
    await waitFor(() => {
      expect(screen.getByText(/Chunk 1Chunk 2/)).toBeInTheDocument(); // Check for combined content
    });

    // Expect scrollIntoView to have been called
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });

  it("does not auto-scroll when new messages arrive during streaming if scrolled up", async () => {
    renderWithContext(
      <ChatInterface
        isOpen={true}
        codeSpace="test-space"
        cSess={mockSession}
        onClose={vi.fn()}
      />
    );

    const chatContainer = await screen.findByTestId("chat-messages-container");
    const messagesEndMarker = await screen.findByTestId("messages-end-marker");

    // Override scrollIntoView with a spy for this element
    const scrollIntoViewMock = vi.fn();
    Object.defineProperty(messagesEndMarker, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock,
      writable: true,
    });

    // Simulate sending a message to trigger streaming
    await act(async () => {
      const inputElement = await screen.findByTestId("message-input") as HTMLTextAreaElement;
      const sendButton = await screen.findByTestId("send-button");
      fireEvent.change(inputElement, { target: { value: "Start streaming" } });
      fireEvent.click(sendButton);
    });

    // Simulate receiving initial chunks to make the container scrollable
    await act(async () => {
      mockSession.addMessageChunk("Chunk 1\n".repeat(20)); // Add enough content to make it scrollable
    });

    // Manually scroll up
    await act(() => {
      chatContainer.scrollTop = 0; // Scroll to the top
      fireEvent.scroll(chatContainer); // Trigger scroll event
    });

    // Simulate receiving more streaming chunks
    await act(async () => {
      mockSession.addMessageChunk("Chunk 2");
    });

    // Expect scrollIntoView NOT to have been called
    await waitFor(() => {
      expect(scrollIntoViewMock).not.toHaveBeenCalled();
    });
  });

  it("resumes auto-scrolling when scrolled back to bottom during streaming", async () => {
    renderWithContext(
      <ChatInterface
        isOpen={true}
        codeSpace="test-space"
        cSess={mockSession}
        onClose={vi.fn()}
      />
    );

    const chatContainer = await screen.findByTestId("chat-messages-container");
    const messagesEndMarker = await screen.findByTestId("messages-end-marker");

    // Override scrollIntoView with a spy for this element
    const scrollIntoViewMock = vi.fn();
    Object.defineProperty(messagesEndMarker, "scrollIntoView", {
      configurable: true,
      value: scrollIntoViewMock,
      writable: true,
    });

    // Simulate sending a message to trigger streaming
    await act(async () => {
      const inputElement = await screen.findByTestId("message-input") as HTMLTextAreaElement;
      const sendButton = await screen.findByTestId("send-button");
      fireEvent.change(inputElement, { target: { value: "Start streaming" } });
      fireEvent.click(sendButton);
    });

    // Simulate receiving initial chunks to make the container scrollable
    await act(async () => {
      mockSession.addMessageChunk("Chunk 1\n".repeat(20)); // Add enough content to make it scrollable
    });

    // Manually scroll up
    await act(() => {
      chatContainer.scrollTop = 0; // Scroll to the top
      fireEvent.scroll(chatContainer); // Trigger scroll event
    });

    // Simulate receiving more streaming chunks (should not auto-scroll)
    await act(async () => {
      mockSession.addMessageChunk("Chunk 2");
    });

    // Expect scrollIntoView NOT to have been called yet
    await waitFor(() => {
      expect(scrollIntoViewMock).not.toHaveBeenCalled();
    });

    // Manually scroll back to the bottom
    await act(() => {
      chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to the bottom
      fireEvent.scroll(chatContainer); // Trigger scroll event
    });

    // Add a wait here to ensure userScrolledUp state updates
    await new Promise(resolve => setTimeout(resolve, 50)); // Wait for 50ms

    // Simulate receiving more streaming chunks (should now auto-scroll)
    await act(async () => {
      mockSession.addMessageChunk("Chunk 3");
    });

    // Expect scrollIntoView to have been called
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalled();
    });
  });
});
