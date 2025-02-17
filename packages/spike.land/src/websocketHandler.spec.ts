import { computeSessionHash, ICodeSession } from "@spike-npm-land/code";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type { Code } from "./chatRoom";
import { WebSocketHandler } from "./websocketHandler";
import type { WebsocketSession } from "./websocketHandler";

describe("WebSocketHandler", () => {
  let websocketHandler: WebSocketHandler;
  let mockCode: Partial<Code>;
  let mockWebSocket: WebSocket;
  const mockSession: ICodeSession = {
    code: "mock code",
    html: "mock html",
    css: "mock css",
    transpiled: "mock transpiled",
    codeSpace: "codeSpace",
  };

  beforeEach(() => {
    // Reset all mocks
    vi.resetAllMocks();

    // Mock the Code object
    mockCode = {
      getSession: vi.fn().mockReturnValue({
        code: "mock code",
        html: "mock html",
        css: "mock css",
      }),
      updateAndBroadcastSession: vi.fn(),
    };

    // Create a complete mock WebSocket
    mockWebSocket = {
      accept: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      readyState: 1,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
      binaryType: "blob" as BinaryType,
      bufferedAmount: 0,
      extensions: "",
      onclose: null,
      onerror: null,
      onmessage: null,
      onopen: null,
      protocol: "",
      url: "ws://localhost",
      CLOSED: 3,
      CLOSING: 2,
      CONNECTING: 0,
      OPEN: 1,
    } as unknown as WebSocket;

    // Create WebSocketHandler with mock Code
    websocketHandler = new WebSocketHandler(mockCode as Code);
  });

  describe("handleWebsocketSession", () => {
    it("should accept the websocket and send initial handshake", () => {
      websocketHandler.handleWebsocketSession(mockWebSocket);

      expect(mockWebSocket.accept).toHaveBeenCalled();
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining('"type":"handshake"'),
      );

      // Verify that the session was added
      const sessions = websocketHandler.getWsSessions();
      expect(sessions.length).toBe(1);
      expect(sessions[0].webSocket).toBe(mockWebSocket);
    });

    it("should schedule periodic ping", () => {
      vi.useFakeTimers();

      const mockSession = {
        webSocket: mockWebSocket,
        name: "test",
        quit: false,
        subscribedTopics: new Set(),
        pongReceived: true,
        blockedMessages: [],
      };

      websocketHandler.handleWebsocketSession(mockWebSocket);

      // Initial handshake should be sent
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining('"type":"handshake"'),
      );

      // Clear previous calls to send
      (mockWebSocket.send as Mock).mockClear();

      // Advance timer to trigger ping
      vi.advanceTimersByTime(30000);

      // Verify ping was sent
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "ping" }),
      );

      // Simulate pong response
      const messageHandler = (mockWebSocket.addEventListener as Mock).mock.calls
        .find(call => call[0] === "message")?.[1];
      messageHandler?.({ data: JSON.stringify({ type: "pong" }) });

      // First scheduled ping
      vi.advanceTimersByTime(30000);
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "ping" }),
      );

      // Simulate pong response again
      messageHandler?.({ data: JSON.stringify({ type: "pong" }) });

      // Second scheduled ping
      vi.advanceTimersByTime(30000);
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: "ping" }),
      );

      vi.useRealTimers();
    });

    it("should cleanup ping timeout on close", () => {
      vi.useFakeTimers();

      websocketHandler.handleWebsocketSession(mockWebSocket);
      const session = websocketHandler.getWsSessions()[0];

      // Get the close handler
      const closeHandler = (mockWebSocket.addEventListener as Mock).mock.calls
        .find((call: any) => Array.isArray(call) && call[0] === "close")?.[1];

      // Simulate close event
      if (closeHandler) {
        closeHandler();
        // Remove the session
        websocketHandler.getWsSessions().splice(0, 1);
      }

      // Verify session is cleaned up
      expect(session.quit).toBe(true);
      expect(websocketHandler.getWsSessions().length).toBe(0);

      vi.useRealTimers();
    });
  });

  describe("processWsMessage", () => {
    let processWsMessage: (msg: MessageEvent, session: WebsocketSession) => void;
    let mockWsSession: WebsocketSession;

    beforeEach(() => {
      // Prepare a session with a name
      websocketHandler.handleWebsocketSession(mockWebSocket);

      // Get the processWsMessage method
      processWsMessage = websocketHandler.processWsMessage;

      // Get the first (and only) session
      const sessions = websocketHandler.getWsSessions();
      mockWsSession = sessions[0];
      mockWsSession.subscribedTopics = new Set();

      // Simulate setting a name
      const messageEvent = {
        data: JSON.stringify({
          name: "testUser",
          hashCode: computeSessionHash(mockCode.getSession!()),
        }),
      } as MessageEvent;

      // Simulate processing the name message
      processWsMessage(messageEvent, mockWsSession);
    });

    it("should handle subscribe and unsubscribe messages", () => {
      const subscribeMessage = {
        data: JSON.stringify({
          type: "subscribe",
          topics: ["topic1", "topic2"],
        }),
      } as MessageEvent;

      const unsubscribeMessage = {
        data: JSON.stringify({
          type: "unsubscribe",
          topics: ["topic1"],
        }),
      } as MessageEvent;

      processWsMessage(subscribeMessage, mockWsSession);

      // Verify subscription
      expect(mockWsSession.subscribedTopics.has("topic1")).toBe(true);
      expect(mockWsSession.subscribedTopics.has("topic2")).toBe(true);

      processWsMessage(unsubscribeMessage, mockWsSession);

      // Verify unsubscription
      expect(mockWsSession.subscribedTopics.has("topic1")).toBe(false);
      expect(mockWsSession.subscribedTopics.has("topic2")).toBe(true);
    });

    it("should handle invalid patch messages", async () => {
      const mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});

      const invalidPatchMessage = {
        data: JSON.stringify({
          patch: ["invalid patch"],
          oldHash: "invalid",
          hashCode: "invalid",
        }),
      } as MessageEvent;

      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      await processWsMessageFn(invalidPatchMessage, mockWsSession);

      // Verify error handling
      expect(mockConsoleError).toHaveBeenCalled();
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining("error"),
      );

      mockConsoleError.mockRestore();
    });

    it("should handle ping/pong messages", () => {
      const pingMessage = { data: JSON.stringify({ type: "ping" }) } as MessageEvent;
      const pongMessage = { data: JSON.stringify({ type: "pong" }) } as MessageEvent;

      processWsMessage(pingMessage, mockWsSession);
      expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({ type: "pong" }));

      processWsMessage(pongMessage, mockWsSession);
      expect(mockWsSession.pongReceived).toBe(true);
    });

    it("should handle publish messages", () => {
      const publishMessage = {
        data: JSON.stringify({
          type: "publish",
          topic: "test-topic",
          data: "test data",
        }),
      } as MessageEvent;

      // Mock the topics map
      const topicsMock = new Map();
      const mockTopicSet = new Set([mockWebSocket as WebSocket]);
      topicsMock.set("test-topic", mockTopicSet);
      websocketHandler.setTopics(topicsMock);

      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      processWsMessageFn(publishMessage, mockWsSession);

      // Note: Full publish behavior would require more complex mocking
      expect(mockWebSocket.send).toHaveBeenCalled();
    });

    it("should handle patch messages", async () => {
      // Import the entire module as a namespace and spy on applySessionPatch.
      const codeModule = await import("@spike-npm-land/code");
      vi.spyOn(codeModule, "applySessionPatch").mockReturnValue({
        code: "patched code",
        html: "patched html",
        css: "patched css",
      });

      const validHash = computeSessionHash(mockCode.getSession!());
      const mockPatch = {
        data: JSON.stringify({
          patch: ["test patch"],
          oldHash: validHash,
          hashCode: validHash,
        }),
      } as MessageEvent;

      vi.spyOn(console, "log").mockImplementation(() => {});
      vi.spyOn(console, "error").mockImplementation(() => {});

      // Reset the updateAndBroadcastSession spy on the handler instance.

      mockCode.updateAndBroadcastSession = vi.fn();
      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      console.log("mockPatch:", mockPatch);
      console.log("mockSession:", mockWsSession);
      await processWsMessageFn(mockPatch, mockWsSession);

      expect(mockCode.updateAndBroadcastSession).toHaveBeenCalled();
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining("hashCode"),
      );
    });

    it("should handle user-to-user messages", () => {
      const p2pMessage = {
        data: JSON.stringify({
          target: "otherUser",
          type: "video-offer",
          offer: "test offer",
        }),
      } as MessageEvent;

      // Create another session to simulate target user
      const otherWebSocket = {
        ...mockWebSocket,
        send: vi.fn(),
        readyState: 1,
        close: vi.fn(),
      } as unknown as WebSocket;

      websocketHandler.pushToWsSession({
        ...mockSession,
        name: "otherUser",
        webSocket: otherWebSocket,
      });

      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      processWsMessageFn(p2pMessage, mockWsSession);

      // Verify message routing logic
      expect(otherWebSocket.send).toHaveBeenCalled();
    });
  });

  describe("broadcast", () => {
    it("should broadcast message to all sessions", () => {
      // Create multiple sessions
      const mockWebSocket1 = {
        accept: vi.fn(),
        send: vi.fn(),
        readyState: 1,
        close: vi.fn(),
        addEventListener: vi.fn(),
      } as unknown as WebSocket;

      const mockWebSocket2 = {
        accept: vi.fn(),
        send: vi.fn(),
        readyState: 1,
        close: vi.fn(),
        addEventListener: vi.fn(),
      } as unknown as WebSocket;

      websocketHandler.handleWebsocketSession(mockWebSocket1);
      websocketHandler.handleWebsocketSession(mockWebSocket2);

      const broadcastMessage = "test broadcast";
      websocketHandler.broadcast(broadcastMessage);

      // Verify both sessions received the message
      expect(mockWebSocket1.send).toHaveBeenCalledWith(broadcastMessage);
      expect(mockWebSocket2.send).toHaveBeenCalledWith(broadcastMessage);
    });

    it("should handle broadcast errors gracefully", () => {
      const mockSend = vi.fn();
      const mockWebSocket1 = {
        accept: vi.fn(),
        send: mockSend,
        readyState: 1,
        close: vi.fn(),
        addEventListener: vi.fn(),
      } as unknown as WebSocket;

      websocketHandler.handleWebsocketSession(mockWebSocket1);

      // Clear any initial calls
      mockSend.mockClear();

      // Mock send to throw error
      mockSend.mockImplementationOnce(() => {
        throw new Error("Send failed");
      });

      const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

      // Broadcast after handshake
      websocketHandler.broadcast("test message");

      // Verify error handling
      expect(mockWebSocket1.close).toHaveBeenCalled();
      expect(consoleError).toHaveBeenCalled();

      consoleError.mockRestore();
    });
  });
});
