import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ChatRoom } from "../../src/durable-objects/ChatRoom";
import type { Env } from "../../src/types";

// Mock WebSocketPair for Node environment
class MockWebSocket {
  readyState: number;
  accept: () => void;
  send: (data: string) => void;
  addEventListener: (event: string, handler: Function) => void;
  close: () => void;

  static READY_STATE_CONNECTING = 0;
  static READY_STATE_OPEN = 1;
  static READY_STATE_CLOSING = 2;
  static READY_STATE_CLOSED = 3;

  constructor() {
    this.readyState = MockWebSocket.READY_STATE_CONNECTING;
    this.accept = vi.fn(() => {
      this.readyState = MockWebSocket.READY_STATE_OPEN;
    });
    this.send = vi.fn();
    this.addEventListener = vi.fn();
    this.close = vi.fn(() => {
      this.readyState = MockWebSocket.READY_STATE_CLOSED;
    });
  }
}

global.WebSocketPair = vi.fn(() => {
  const client = new MockWebSocket();
  const server = new MockWebSocket();
  return [client, server];
}) as any;

describe("ChatRoom", () => {
  let chatRoom: ChatRoom;
  let mockState: DurableObjectState;
  let mockEnv: Env;

  beforeEach(() => {
    // Mock the WebSocket constants
    global.WebSocket = {
      READY_STATE_CONNECTING: 0,
      READY_STATE_OPEN: 1,
      READY_STATE_CLOSING: 2,
      READY_STATE_CLOSED: 3,
    } as any;

    mockState = {} as DurableObjectState;
    mockEnv = {} as Env;
    chatRoom = new ChatRoom(mockState, mockEnv);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("WebSocket handling", () => {
    it("should accept WebSocket upgrade request", async () => {
      const request = new Request("http://localhost/websocket", {
        headers: {
          Upgrade: "websocket",
          "X-User-Id": "user-123",
          "X-Conversation-Id": "conv-456",
        },
      });

      // Mock Response to allow status 101
      const OriginalResponse = global.Response;
      global.Response = vi.fn((body: any, init: any) => {
        if (init?.status === 101) {
          // Create a mock response object that looks like a WebSocket upgrade
          return {
            status: 101,
            webSocket: init.webSocket,
            headers: new Headers(),
            ok: false,
            statusText: "Switching Protocols",
            body: null,
            bodyUsed: false,
            type: "basic",
            url: "",
            redirected: false,
            clone: vi.fn(),
            arrayBuffer: vi.fn(),
            blob: vi.fn(),
            formData: vi.fn(),
            json: vi.fn(),
            text: vi.fn(),
          } as any;
        }
        return new OriginalResponse(body, init);
      }) as any;

      const response = await chatRoom.fetch(request);
      expect(response.status).toBe(101);
      expect(response.webSocket).toBeDefined();

      // Restore original Response
      global.Response = OriginalResponse;
    });

    it("should reject non-WebSocket requests to /websocket", async () => {
      const request = new Request("http://localhost/websocket", {
        headers: {
          "X-User-Id": "user-123",
          "X-Conversation-Id": "conv-456",
        },
      });

      const response = await chatRoom.fetch(request);
      expect(response.status).toBe(426);
      expect(await response.text()).toBe("Expected WebSocket");
    });

    it("should reject WebSocket without authentication", async () => {
      const request = new Request("http://localhost/websocket", {
        headers: {
          Upgrade: "websocket",
        },
      });

      const response = await chatRoom.fetch(request);
      expect(response.status).toBe(401);
      expect(await response.text()).toBe("Missing authentication");
    });
  });

  describe("Message broadcasting", () => {
    it("should broadcast messages to all connected clients", async () => {
      const message = {
        type: "message" as const,
        conversationId: "conv-123",
        message: {
          id: "msg-1",
          conversation_id: "conv-123",
          user_id: "user-1",
          role: "user" as const,
          content: "Hello",
          tokens_used: 5,
          created_at: "2024-01-01T00:00:00Z",
        },
      };

      const request = new Request("http://localhost/broadcast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      const response = await chatRoom.fetch(request);
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("OK");
    });
  });

  describe("Session management", () => {
    it("should track user sessions", () => {
      const mockWebSocket = {
        accept: vi.fn(),
        send: vi.fn(),
        addEventListener: vi.fn(),
        readyState: MockWebSocket.READY_STATE_OPEN,
      } as any;

      (chatRoom as any).handleSession(
        mockWebSocket,
        "session-1",
        "user-1",
        "conv-1",
      );

      expect(mockWebSocket.accept).toHaveBeenCalled();
      expect((chatRoom as any).sessions.has("session-1")).toBe(true);
      expect((chatRoom as any).userSessions.has("user-1")).toBe(true);
    });

    it("should clean up sessions on close", () => {
      const closeHandler = vi.fn();
      const mockWebSocket = {
        accept: vi.fn(),
        send: vi.fn(),
        addEventListener: vi.fn((event: string, handler: Function) => {
          if (event === "close") {
            closeHandler.mockImplementation(handler);
          }
        }),
        readyState: MockWebSocket.READY_STATE_OPEN,
      } as any;

      (chatRoom as any).handleSession(
        mockWebSocket,
        "session-1",
        "user-1",
        "conv-1",
      );

      expect((chatRoom as any).sessions.has("session-1")).toBe(true);

      // Simulate close event
      closeHandler();

      expect((chatRoom as any).sessions.has("session-1")).toBe(false);
    });
  });

  describe("Typing indicators", () => {
    it("should broadcast typing events to other sessions", () => {
      const mockWebSocket1 = {
        accept: vi.fn(),
        send: vi.fn(),
        addEventListener: vi.fn(),
        readyState: MockWebSocket.READY_STATE_OPEN,
      } as any;

      const mockWebSocket2 = {
        accept: vi.fn(),
        send: vi.fn(),
        addEventListener: vi.fn(),
        readyState: MockWebSocket.READY_STATE_OPEN,
      } as any;

      (chatRoom as any).sessions.set("session-1", mockWebSocket1);
      (chatRoom as any).sessions.set("session-2", mockWebSocket2);

      const broadcastSpy = vi.spyOn(chatRoom as any, "broadcastToOthers");

      (chatRoom as any).broadcastToOthers("session-1", {
        type: "typing",
        userId: "user-1",
        conversationId: "conv-1",
      });

      expect(broadcastSpy).toHaveBeenCalled();
    });
  });

  describe("Error handling", () => {
    it("should handle invalid message format", () => {
      const errorHandler = vi.fn();
      const messageHandler = vi.fn();
      const mockWebSocket = {
        accept: vi.fn(),
        send: vi.fn(),
        addEventListener: vi.fn((event: string, handler: Function) => {
          if (event === "message") {
            messageHandler.mockImplementation(handler);
          } else if (event === "error") {
            errorHandler.mockImplementation(handler);
          }
        }),
        readyState: MockWebSocket.READY_STATE_OPEN,
      } as any;

      (chatRoom as any).handleSession(
        mockWebSocket,
        "session-1",
        "user-1",
        "conv-1",
      );

      // Send invalid JSON
      messageHandler({ data: "invalid-json{" });

      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining("error"),
      );
    });
  });

  describe("Alarm cleanup", () => {
    it("should clean up closed connections during alarm", async () => {
      const mockClosedWebSocket = {
        readyState: MockWebSocket.READY_STATE_CLOSED,
      } as any;

      const mockOpenWebSocket = {
        readyState: MockWebSocket.READY_STATE_OPEN,
      } as any;

      (chatRoom as any).sessions.set("closed-session", mockClosedWebSocket);
      (chatRoom as any).sessions.set("open-session", mockOpenWebSocket);

      await chatRoom.alarm();

      expect((chatRoom as any).sessions.has("closed-session")).toBe(false);
      expect((chatRoom as any).sessions.has("open-session")).toBe(true);
    });
  });

  describe("Unknown routes", () => {
    it("should return 404 for unknown routes", async () => {
      const request = new Request("http://localhost/unknown");
      const response = await chatRoom.fetch(request);

      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Not found");
    });
  });
});
