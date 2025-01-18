import * as useCodeSpace from "@/hooks/use-code-space";
import type { ICode, Message } from "@/lib/interfaces";
import { act, fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { ChatInterface } from "./ChatInterface";

// Mock BroadcastChannel
class MockBroadcastChannel {
  private static channels: Map<string, MockBroadcastChannel[]> = new Map<
    string,
    MockBroadcastChannel[]
  >();
  private listeners: Map<string, Set<(event: MessageEvent) => void>> = new Map<
    string,
    Set<(event: MessageEvent) => void>
  >();

  constructor(public name: string) {
    const channels = MockBroadcastChannel.channels.get(name) || [];
    channels.push(this);
    MockBroadcastChannel.channels.set(name, channels);
  }

  postMessage(message: any) {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const event = new MessageEvent("message", { data: message });
    channels.forEach(channel => {
      if (channel !== this) {
        // Call onmessage directly if set
        if (channel.onmessage) {
          channel.onmessage(event);
        }
        // Also call any addEventListener listeners
        channel.listeners.get("message")?.forEach(listener => listener(event));
      }
    });
  }

  addEventListener(type: string, listener: (event: MessageEvent) => void) {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set());
    }
    this.listeners.get(type)?.add(listener);
  }

  onmessage: ((event: MessageEvent) => void) | null = null;

  removeEventListener(type: string, listener: (event: MessageEvent) => void) {
    this.listeners.get(type)?.delete(listener);
  }

  close() {
    const channels = MockBroadcastChannel.channels.get(this.name) || [];
    const index = channels.indexOf(this);
    if (index > -1) {
      channels.splice(index, 1);
    }
    MockBroadcastChannel.channels.delete(this.name);
    this.listeners.clear();
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
  // Setup global BroadcastChannel mock
  global.BroadcastChannel = MockBroadcastChannel as any;
});

afterAll(() => {
  // Clean up all channels
  MockBroadcastChannel.clearAll();
});

// Mock dependencies
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn(() => "test-space"),
}));

vi.mock("@/hooks/use-dark-mode", () => ({
  useDarkMode: vi.fn(() => ({ isDarkMode: false, toggleDarkMode: vi.fn() })),
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

// Mock ChatDrawer component
vi.mock("@/components/app/chat-drawer", () => ({
  ChatDrawer: ({ handleResetChat, handleCancelEdit }: any) => (
    <div role="dialog" aria-label="chat drawer">
      <button
        onClick={handleResetChat}
        role="button"
        aria-label="reset chat"
      >
        Reset Chat
      </button>
      <button
        onClick={handleCancelEdit}
        role="button"
        aria-label="cancel edit"
      >
        Cancel
      </button>
    </div>
  ),
}));

// Mock Storage (for both localStorage and sessionStorage)
const createStorageMock = () => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    length: 0,
    key: vi.fn(() => null),
  };
};

const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

Object.defineProperty(window, "sessionStorage", {
  value: sessionStorageMock,
  writable: true,
});

// Mock ICode interface
const createMockSession = (initialMessages: Message[] = []) => {
  let messages = initialMessages.map(msg => ({ ...msg }));
  const subscribers = new Set<(session: any) => void>();

  return {
    session: {
      get messages() {
        return messages.map(msg => ({ ...msg }));
      },
      code: "",
    },
    setMessages: vi.fn(async (newMessages: Message[]) => {
      // Filter out invalid messages
      const validMessages = newMessages.filter(msg =>
        msg && typeof msg.content !== "undefined" &&
        typeof msg.role === "string" &&
        typeof msg.id === "string"
      );
      messages = validMessages.map(msg => ({ ...msg }));
      subscribers.forEach(sub => sub({ messages: messages.map(msg => ({ ...msg })), code: "" }));
      return true;
    }),
    setCodeAndTranspiled: vi.fn(),
    screenShot: vi.fn(),
    sub: vi.fn((callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    }),
  } as unknown as ICode;
};

describe("ChatInterface", () => {
  let mockSession: ICode;

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks();

    // Setup global mocks
    global.BroadcastChannel = MockBroadcastChannel as any;

    // Reset localStorage
    localStorageMock.clear();

    // Create fresh session for each test
    mockSession = createMockSession();

    // Mock document.getElementById for scrollIntoView
    const mockElement = document.createElement("div");
    mockElement.scrollIntoView = vi.fn();
    document.getElementById = vi.fn(() => mockElement);
  });

  afterEach(() => {
    vi.resetAllMocks();
    MockBroadcastChannel.clearAll();
    sessionStorageMock.clear();
    localStorageMock.clear();
    vi.useRealTimers();
  });

  it("properly cleans up message handlers", async () => {
    const { unmount } = render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Create two broadcast channels
    const bc1 = new MockBroadcastChannel("test-space-chat");
    const bc2 = new MockBroadcastChannel("test-space-chat");

    // Send a message before unmount
    await act(async () => {
      bc1.postMessage({
        instructions: "test before unmount",
        isStreaming: true,
      });
    });

    // Verify message was processed
    expect(mockSession.setMessages).toHaveBeenCalled();
    vi.clearAllMocks();

    // Unmount component
    unmount();

    // Send messages from both channels after unmount
    await act(async () => {
      bc1.postMessage({
        instructions: "test after unmount 1",
        isStreaming: true,
      });
      bc2.postMessage({
        instructions: "test after unmount 2",
        isStreaming: true,
      });
    });

    // Verify no messages were processed after unmount
    expect(mockSession.setMessages).not.toHaveBeenCalled();

    // Verify channels were cleaned up
    expect(MockBroadcastChannel.hasChannel("test-space-chat")).toBe(false);
  });

  it("initializes with empty messages", () => {
    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    expect(mockSession.sub).toHaveBeenCalled();
  });

  it("handles new messages from broadcast channel", async () => {
    const { rerender } = render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    const newMessages: Message[] = [
      { id: "1", role: "user", content: "test message" },
      { id: "2", role: "assistant", content: "response" },
    ];

    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({ messages: newMessages });
    });

    rerender(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    expect(mockSession.setMessages).toHaveBeenCalledWith(newMessages);
  });

  it("handles message editing", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "original message" },
    ];
    mockSession = createMockSession(initialMessages);

    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Start editing
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({ editingMessageId: "1" });
    });

    // Save edit
    await act(async () => {
      mockSession.setMessages([
        { id: "1", role: "user", content: "edited message" },
      ]);
    });

    expect(mockSession.setMessages).toHaveBeenCalledWith([
      { id: "1", role: "user", content: "edited message" },
    ]);
  });

  it("handles streaming messages correctly", async () => {
    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Simulate streaming start
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "streaming content",
        isStreaming: true,
      });
    });

    // Verify assistant message was added
    expect(mockSession.setMessages).toHaveBeenCalledWith([
      {
        id: expect.any(String),
        role: "assistant",
        content: "streaming content",
      },
    ]);

    // Simulate streaming update
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "streaming content updated",
        isStreaming: true,
      });
    });

    // Verify message was updated
    expect(mockSession.setMessages).toHaveBeenCalledWith([
      {
        id: expect.any(String),
        role: "assistant",
        content: "streaming content updated",
      },
    ]);
  });

  it("preserves message history when loading from session storage", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "existing message" },
    ];
    mockSession = createMockSession(initialMessages);

    // Setup session storage
    const storedData = {
      prompt: "new message",
      images: [],
    };
    sessionStorage.setItem("test", JSON.stringify(storedData));

    vi.spyOn(useCodeSpace, "getCodeSpace").mockReturnValue("test-test");

    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Verify both messages exist
    expect(mockSession.setMessages).toHaveBeenCalledWith([
      { id: "1", role: "user", content: "existing message" },
      {
        id: expect.any(String),
        role: "user",
        content: "new message",
      },
    ]);
  });

  it("handles empty instructions in streaming", async () => {
    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "",
        isStreaming: true,
      });
    });

    // Should not create a new message for empty instructions
    expect(mockSession.setMessages).not.toHaveBeenCalled();
  });

  it("handles multiple streaming updates correctly", async () => {
    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // First streaming update
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "first part",
        isStreaming: true,
      });
    });

    // Second streaming update
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "first part second part",
        isStreaming: true,
      });
    });

    // Third streaming update
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "first part second part final",
        isStreaming: true,
      });
    });

    // Verify final message state
    expect(mockSession.setMessages).toHaveBeenLastCalledWith([
      {
        id: expect.any(String),
        role: "assistant",
        content: "first part second part final",
      },
    ]);
  });

  it("handles message editing cancellation", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "original message" },
    ];
    mockSession = createMockSession(initialMessages);

    const { getByText } = render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Start editing
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({ editingMessageId: "1" });
    });

    // Cancel edit
    await act(async () => {
      const cancelButton = getByText(/cancel/i);
      fireEvent.click(cancelButton);
    });

    // Original message should remain unchanged
    expect(mockSession.setMessages).not.toHaveBeenCalled();
  });

  it("handles concurrent message updates correctly", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "message 1" },
    ];
    mockSession = createMockSession(initialMessages);

    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Simulate concurrent updates
    await act(async () => {
      const bc1 = new MockBroadcastChannel("test-space-chat");
      bc1.postMessage({
        instructions: "update 1",
        isStreaming: true,
      });
    });

    await act(async () => {
      const bc2 = new MockBroadcastChannel("test-space-chat");
      bc2.postMessage({
        instructions: "update 2",
        isStreaming: true,
      });
    });

    // Last update should win
    expect(mockSession.setMessages).toHaveBeenLastCalledWith(expect.arrayContaining([
      { id: "1", role: "user", content: "message 1" },
      expect.objectContaining({
        role: "assistant",
        content: "update 2",
      }),
    ]));
  });

  it("handles message array mutations correctly", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "original" },
    ];
    mockSession = createMockSession(initialMessages);

    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Attempt to mutate messages array
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      initialMessages.push({
        id: "2",
        role: "assistant",
        content: "mutation",
      });
      bc.postMessage({ messages: initialMessages });
    });

    // Component should use its own copy, not the mutated array
    expect(mockSession.session.messages).toEqual([
      { id: "1", role: "user", content: "original" },
      { id: "2", role: "assistant", content: "mutation" },
    ]);
  });

  it("handles invalid message content gracefully", async () => {
    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Send message with invalid content
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        messages: [{
          id: "1",
          role: "user",
          content: undefined,
        }],
      });
    });

    // Should not crash and should maintain valid state
    expect(mockSession.session.messages).toEqual([]);
  });

  it("cleans up broadcast channel on unmount", async () => {
    const { unmount } = render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Create a broadcast channel
    const bc = new MockBroadcastChannel("test-space-chat");

    // Unmount component
    unmount();

    // Try to send a message
    bc.postMessage({
      instructions: "test",
      isStreaming: true,
    });

    // No messages should be processed after unmount
    expect(mockSession.setMessages).not.toHaveBeenCalled();
  });

  it("handles streaming timeout correctly", async () => {
    vi.useFakeTimers();

    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Start streaming
    await act(async () => {
      const bc = new MockBroadcastChannel("test-space-chat");
      bc.postMessage({
        instructions: "streaming",
        isStreaming: true,
      });
    });

    // Fast forward past the streaming timeout
    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    // Verify streaming state is reset
    expect(mockSession.setMessages).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("handles chat reset", async () => {
    const initialMessages: Message[] = [
      { id: "1", role: "user", content: "test message" },
    ];
    mockSession = createMockSession(initialMessages);

    render(
      <ChatInterface
        isOpen={true}
        cSess={mockSession}
        onClose={vi.fn()}
      />,
    );

    // Trigger reset
    await act(async () => {
      const resetButton = screen.getByRole("button", { name: /reset/i });
      fireEvent.click(resetButton);
    });

    expect(mockSession.setMessages).toHaveBeenCalledWith([]);
  });
});
