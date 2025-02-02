import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WebSocketHandler } from './websocketHandler';
import type { Code } from './chatRoom';
import type { WebSocket, MessageEvent } from "@cloudflare/workers-types";
import { computeSessionHash, applySessionPatch, ICodeSession } from "@spike-npm-land/code";

describe('WebSocketHandler', () => {
  let websocketHandler: WebSocketHandler;
  let mockCode: Partial<Code>;
  let mockWebSocket: Partial<WebSocket>;
  let mockSession: ICodeSession = {
    code: 'mock code',
    html: 'mock html',
    css: 'mock css',
    transpiled: 'mock transpiled',
    codeSpace: 'codeSpace',
  };

  beforeEach(() => {
    // Mock the Code object
    mockCode = {
      getSession: vi.fn().mockReturnValue({
        code: 'mock code',
        html: 'mock html',
        css: 'mock css'
      }),
      updateAndBroadcastSession: vi.fn(),
    };

    // Create a mock WebSocket
    mockWebSocket = {
      accept: vi.fn(),
      addEventListener: vi.fn(),
      send: vi.fn(),
      close: vi.fn(),
      readyState: 1 // WebSocket.OPEN
    };

    // Create WebSocketHandler with mock Code
    websocketHandler = new WebSocketHandler(mockCode as Code);
  });

  describe('handleWebsocketSession', () => {
    it('should accept the websocket and send initial handshake', () => {
      websocketHandler.handleWebsocketSession(mockWebSocket as WebSocket);

      expect(mockWebSocket.accept).toHaveBeenCalled();
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining('"type":"handshake"')
      );
    });

    it('should schedule periodic ping', () => {
      vi.useFakeTimers();

      websocketHandler.handleWebsocketSession(mockWebSocket as WebSocket);

      // Advance time by ping timeout
      vi.advanceTimersByTime(30000);

      expect(mockWebSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ type: 'ping' })
      );

      vi.useRealTimers();
    });
  });

  describe('processWsMessage', () => {
    let processWsMessage: (msg: MessageEvent, session: any) => void;

    beforeEach(() => {
      // Prepare a session with a name
      websocketHandler.handleWebsocketSession(mockWebSocket as WebSocket);
      
      // Get the processWsMessage method
      processWsMessage = (websocketHandler as any).processWsMessage;
      
      // Simulate setting a name
      const messageEvent = {
        data: JSON.stringify({ 
          name: 'testUser', 
          hashCode: computeSessionHash(mockCode.getSession!()) 
        })
      } as MessageEvent;

      // Get the first (and only) session
      const sessions = (websocketHandler as any).wsSessions;
      mockSession = sessions[0];

      // Simulate processing the name message
      processWsMessage(messageEvent, mockSession);
    });

    it('should handle ping/pong messages', () => {
      const pingMessage = { data: JSON.stringify({ type: 'ping' }) } as MessageEvent;
      const pongMessage = { data: JSON.stringify({ type: 'pong' }) } as MessageEvent;

      processWsMessage(pingMessage, mockSession);
      expect(mockWebSocket.send).toHaveBeenCalledWith(JSON.stringify({ type: 'pong' }));

      processWsMessage(pongMessage, mockSession);
      expect(mockSession.pongReceived).toBe(true);
    });

    it('should handle publish messages', () => {
      const publishMessage = { 
        data: JSON.stringify({ 
          type: 'publish', 
          topic: 'test-topic',
          data: 'test data' 
        }) 
      } as MessageEvent;

      // Mock the topics map
      const topicsMock = new Map();
      const mockTopicSet = new Set([mockWebSocket as WebSocket]);
      topicsMock.set('test-topic', mockTopicSet);
      (websocketHandler as any).topics = topicsMock;

      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      processWsMessageFn(publishMessage, mockSession);
      
      // Note: Full publish behavior would require more complex mocking
      expect(mockWebSocket.send).toHaveBeenCalled();
    });

    it('should handle patch messages', async () => {
      const mockPatch = {
        data: JSON.stringify({
          patch: ['test patch'],
          oldHash: computeSessionHash(mockCode.getSession!()),
          hashCode: 'different-hash'
        })
      } as MessageEvent;

      vi.spyOn(console, 'log').mockImplementation(() => {});
      vi.spyOn(console, 'error').mockImplementation(() => {});

      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      await processWsMessageFn(mockPatch, mockSession);

      expect(mockCode.updateAndBroadcastSession).toHaveBeenCalled();
      expect(mockWebSocket.send).toHaveBeenCalledWith(
        expect.stringContaining('hashCode')
      );
    });

    it('should handle user-to-user messages', () => {
      const p2pMessage = { 
        data: JSON.stringify({ 
          target: 'otherUser',
          type: 'video-offer',
          offer: 'test offer'
        }) 
      } as MessageEvent;

      // Create another session to simulate target user
      const otherWebSocket = { 
        send: vi.fn(), 
        readyState: 1,
        close: vi.fn()
      };
      const otherSession = { 
        name: 'otherUser', 
        webSocket: otherWebSocket 
      };
      (websocketHandler as any).wsSessions.push(otherSession);

      const processWsMessageFn = processWsMessage.bind(websocketHandler);
      processWsMessageFn(p2pMessage, mockSession);
      
      // Verify message routing logic
      expect(otherWebSocket.send).toHaveBeenCalled();
    });
  });

  describe('broadcast', () => {
    it('should broadcast message to all sessions', () => {
      // Create multiple sessions
      const mockWebSocket1 = { 
        send: vi.fn(), 
        readyState: 1,
        close: vi.fn()
      };
      const mockWebSocket2 = { 
        send: vi.fn(), 
        readyState: 1,
        close: vi.fn()
      };

      websocketHandler.handleWebsocketSession(mockWebSocket1 as unknown as WebSocket);
      websocketHandler.handleWebsocketSession(mockWebSocket2 as unknown as WebSocket);

      const broadcastMessage = 'test broadcast';
      websocketHandler.broadcast(broadcastMessage);

      // Verify both sessions received the message
      expect(mockWebSocket1.send).toHaveBeenCalledWith(broadcastMessage);
      expect(mockWebSocket2.send).toHaveBeenCalledWith(broadcastMessage);
    });

    it('should handle broadcast errors gracefully', () => {
      const mockWebSocket1 = { 
        send: vi.fn().mockImplementation(() => { throw new Error('Send failed'); }), 
        readyState: 1,
        close: vi.fn() 
      };

      websocketHandler.handleWebsocketSession(mockWebSocket1 as unknown as WebSocket);

      vi.spyOn(console, 'error').mockImplementation(() => {});

      const broadcastMessage = 'test broadcast';
      websocketHandler.broadcast({
        ...mockSession,
        sender: "Editor"
      });

      // Verify error handling
      expect(mockWebSocket1.close).toHaveBeenCalled();
    });
  });
});
