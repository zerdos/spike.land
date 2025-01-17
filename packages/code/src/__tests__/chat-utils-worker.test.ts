import type { Message } from "@/lib/interfaces";
import { handleSendMessage } from "@/workers/chat-utils.worker";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AIHandler } from "../AIHandler";

// Mock AIHandler
vi.mock("../AIHandler", () => ({
  AIHandler: vi.fn().mockImplementation(() => ({
    prepareClaudeContent: vi.fn(),
    sendToAnthropic: vi.fn(),
    sendToGpt4o: vi.fn(),
  })),
}));

// Mock BroadcastChannel since it's not available in Node
class MockBroadcastChannel implements BroadcastChannel {
  name: string;
  onmessage: ((ev: MessageEvent) => void) | null;
  onmessageerror: ((ev: MessageEvent) => void) | null;
  postMessage: (message: unknown) => void;
  close: () => void;
  addEventListener: (type: string, listener: EventListener) => void;
  removeEventListener: (type: string, listener: EventListener) => void;
  dispatchEvent: (event: Event) => boolean;

  constructor(name: string) {
    this.name = name;
    this.onmessage = null;
    this.onmessageerror = null;
    this.postMessage = vi.fn();
    this.close = vi.fn();
    this.addEventListener = vi.fn();
    this.removeEventListener = vi.fn();
    this.dispatchEvent = vi.fn();
  }
}

global.BroadcastChannel = MockBroadcastChannel as unknown as typeof BroadcastChannel;

describe("handleSendMessage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    Date.now = vi.fn(() => 1737133875901);
  });

  it("should log empty prompt scenario", async () => {
    const logs = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "",
      images: [],
      code: "",
    });

    expect(logs).toContainEqual(
      expect.stringMatching(/Starting handleSendMessage.*"promptLength":0/),
    );
    expect(logs).toContainEqual(
      expect.stringMatching(/Empty prompt received, returning/),
    );
  });

  it("should log error when AIHandler throws", async () => {
    const mockError = new Error("AI processing failed");
    const mockAIHandler = {
      prepareClaudeContent: vi.fn().mockImplementation(() => {
        throw mockError;
      }),
      sendToAnthropic: vi.fn(),
      sendToGpt4o: vi.fn(),
    } as unknown as AIHandler;
    vi.mocked(AIHandler).mockImplementation(() => mockAIHandler);

    const logs = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(logs).toContainEqual(
      expect.stringMatching(/Error in handleMessage.*AI processing failed/),
    );
  });

  it("should log successful message processing", async () => {
    const mockAIHandler = {
      prepareClaudeContent: vi.fn().mockReturnValue("processed content"),
      sendToAnthropic: vi.fn().mockResolvedValue({
        id: "123",
        role: "assistant",
        content: "response",
      } as Message),
      sendToGpt4o: vi.fn(),
    } as unknown as AIHandler;
    vi.mocked(AIHandler).mockImplementation(() => mockAIHandler);

    const logs = await handleSendMessage({
      messages: [{ id: "123", role: "user", content: "first-content-text" }, {
        id: "124",
        role: "assistant",
        content: "second-content-text",
      }],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(logs).toContainEqual(
      expect.stringMatching(/Starting handleSendMessage/),
    );
    expect(logs).toContainEqual(
      expect.stringMatching(/Initializing ChatHandler/),
    );
    expect(logs[0]).toMatchInlineSnapshot(`
      {
        "content": "first-content-text",
        "id": "123",
        "role": "user",
      }
    `);
    expect(logs[1]).toMatchInlineSnapshot(`
      {
        "content": "second-content-text",
        "id": "124",
        "role": "assistant",
      }
    `);
    expect(logs[2]).toMatchInlineSnapshot(`
  {
    "content": "processed content",
    "id": "1737133875901",
    "role": "user",
  }
`);

    expect(logs[3]).toMatchInlineSnapshot(`
  {
    "content": "response",
    "id": "1737133875901",
    "role": "assistant",
  }
`);
  });

  it("should log fallback to GPT-4 scenario", async () => {
    const mockAIHandler = {
      prepareClaudeContent: vi.fn().mockReturnValue("processed content"),
      sendToAnthropic: vi.fn().mockResolvedValue({
        id: "123",
        role: "assistant",
        content: "An error occurred while processing",
      } as Message),
      sendToGpt4o: vi.fn().mockResolvedValue({
        id: "124",
        role: "assistant",
        content: "GPT-4 response",
      } as Message),
    } as unknown as AIHandler;
    vi.mocked(AIHandler).mockImplementation(() => mockAIHandler);

    const logs = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(logs).toContainEqual(
      expect.stringMatching(/Falling back to GPT-4/),
    );
  });

  it("should log invalid message content type error", async () => {
    const mockAIHandler = {
      prepareClaudeContent: vi.fn().mockReturnValue("processed content"),
      sendToAnthropic: vi.fn().mockResolvedValue({
        id: "123",
        role: "assistant",
        content: { invalidType: true } as unknown as string,
      }),
      sendToGpt4o: vi.fn(),
    } as unknown as AIHandler;
    vi.mocked(AIHandler).mockImplementation(() => mockAIHandler);

    const logs = await handleSendMessage({
      messages: [],
      codeSpace: "test",
      prompt: "test prompt",
      images: [],
      code: "",
    });

    expect(logs).toContainEqual(
      expect.stringMatching(/Invalid assistant message content type/),
    );
  });
});
