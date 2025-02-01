import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { handleErrors } from './handleErrors';
import type { WebSocket } from "@cloudflare/workers-types";

describe('Error Handler', () => {
  let originalConsoleLog: typeof console.log;
  let mockConsoleLog: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Capture and mock console.log
    originalConsoleLog = console.log;
    mockConsoleLog = vi.fn();
    console.log = mockConsoleLog;

    // Reset global WebSocketPair mock
    (global as any).WebSocketPair = vi.fn(() => {
      const pair = [
        { send: vi.fn(), close: vi.fn() },
        { 
          accept: vi.fn(),
          send: vi.fn(),
          close: vi.fn()
        }
      ];
      return pair as unknown as [WebSocket, WebSocket];
    });
  });

  afterEach(() => {
    // Restore original console.log
    console.log = originalConsoleLog;
  });

  describe('Non-WebSocket Error Handling', () => {
    it('should return 500 response for non-websocket request with generic error', async () => {
      const mockRequest = new Request('https://example.com');
      const mockCallback = vi.fn().mockRejectedValue(new Error('Test error'));

      const response = await handleErrors(mockRequest, mockCallback);

      expect(response.status).toBe(500);
      expect(await response.text()).toContain('We have no idea what happened');
    });

    it('should return 500 response with error stack for non-websocket request', async () => {
      const mockRequest = new Request('https://example.com');
      const testError = new Error('Specific test error');
      const mockCallback = vi.fn().mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCallback);

      expect(response.status).toBe(500);
      expect(await response.text()).toContain(testError.stack);
      expect(mockConsoleLog).toHaveBeenCalledWith({
        error: testError.stack,
        message: testError.message
      });
    });

    it('should return 500 response with generic message for non-Error rejection', async () => {
      const mockRequest = new Request('https://example.com');
      const mockCallback = vi.fn().mockRejectedValue('Non-error rejection');

      const response = await handleErrors(mockRequest, mockCallback);

      expect(response.status).toBe(500);
      expect(await response.text()).toBe('We have no idea what happened');
    });
  });

  describe('WebSocket Error Handling', () => {
    it('should return WebSocket response for websocket request with error', async () => {
      const mockRequest = new Request('https://example.com', {
        headers: new Headers({ 'Upgrade': 'websocket' })
      });
      const testError = new Error('WebSocket setup error');
      const mockCallback = vi.fn().mockRejectedValue(testError);

      const response = await handleErrors(mockRequest, mockCallback);

      expect(response.status).toBe(101);
      expect(response.webSocket).toBeDefined();

      // Verify WebSocket pair creation and error handling
      const pair = (global as any).WebSocketPair.mock.results[0].value;
      const serverSocket = pair[1];
      
      expect(serverSocket.accept).toHaveBeenCalled();
      expect(serverSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ error: testError.stack })
      );
      expect(serverSocket.close).toHaveBeenCalledWith(
        1011, 
        "Uncaught exception during session setup"
      );
      
      expect(mockConsoleLog).toHaveBeenCalledWith({
        error: testError.stack,
        message: testError.message
      });
    });

    it('should handle websocket request with non-Error rejection', async () => {
      const mockRequest = new Request('https://example.com', {
        headers: new Headers({ 'Upgrade': 'websocket' })
      });
      const mockCallback = vi.fn().mockRejectedValue('Non-error rejection');

      const response = await handleErrors(mockRequest, mockCallback);

      expect(response.status).toBe(101);
      expect(response.webSocket).toBeDefined();

      // Verify WebSocket pair creation and error handling
      const pair = (global as any).WebSocketPair.mock.results[0].value;
      const serverSocket = pair[1];
      
      expect(serverSocket.accept).toHaveBeenCalled();
      expect(serverSocket.send).toHaveBeenCalledWith(
        JSON.stringify({ error: '' })
      );
      expect(serverSocket.close).toHaveBeenCalledWith(
        1011, 
        "Uncaught exception during session setup"
      );
    });
  });

  describe('Successful Callback', () => {
    it('should return callback result if no error occurs', async () => {
      const mockRequest = new Request('https://example.com');
      const expectedResponse = new Response('Success');
      const mockCallback = vi.fn().mockResolvedValue(expectedResponse);

      const response = await handleErrors(mockRequest, mockCallback);

      expect(response).toBe(expectedResponse);
      expect(mockCallback).toHaveBeenCalled();
    });
  });
});
