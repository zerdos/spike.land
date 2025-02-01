import { describe, it, expect, vi } from 'vitest';
import { handleApiRequest } from './apiHandler';
import type Env from './env';

describe('API Handler', () => {
  // Mock environment
  const createMockEnv = () => ({
    CODE: {
      newUniqueId: vi.fn().mockReturnValue({ toString: () => 'mock-unique-id' }),
      idFromString: vi.fn().mockReturnValue('mock-id-from-string'),
      idFromName: vi.fn().mockReturnValue('mock-id-from-name'),
      get: vi.fn().mockReturnValue({
        fetch: vi.fn().mockResolvedValue(new Response('mocked room response'))
      })
    },
    HTML: Promise.resolve('mocked HTML content')
  } as unknown as Env);

  describe('server-fetch endpoint', () => {
    it('should handle successful server-side fetch', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api/server-fetch', {
        method: 'POST',
        body: JSON.stringify({ 
          url: 'https://test.com', 
          options: { method: 'GET' } 
        })
      });

      // Mock global fetch
      global.fetch = vi.fn().mockResolvedValue(new Response('test response'));

      const response = await handleApiRequest(['server-fetch'], mockRequest, mockEnv);
      
      expect(global.fetch).toHaveBeenCalledWith('https://test.com', { method: 'GET' });
      expect(response.status).toBe(200);
    });

    it('should handle server-side fetch failure', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api/server-fetch', {
        method: 'POST',
        body: JSON.stringify({ 
          url: 'https://test.com', 
          options: { method: 'GET' } 
        })
      });

      // Mock global fetch to throw an error
      global.fetch = vi.fn().mockRejectedValue(new Error('Fetch failed'));

      const response = await handleApiRequest(['server-fetch'], mockRequest, mockEnv);
      
      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Server-side fetch failed');
    });
  });

  describe('generate/room endpoint', () => {
    it('should create a new room with POST method', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api/generate', {
        method: 'POST'
      });

      const response = await handleApiRequest(['generate'], mockRequest, mockEnv);
      
      expect(mockEnv.CODE.newUniqueId).toHaveBeenCalled();
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('mock-unique-id');
    });

    it('should handle room request with valid name', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api/room/test-room', {
        method: 'GET',
        headers: new Headers()
      });

      const response = await handleApiRequest(['room', 'test-room'], mockRequest, mockEnv);
      
      expect(mockEnv.CODE.idFromName).toHaveBeenCalledWith('test-room');
      expect(mockEnv.CODE.get).toHaveBeenCalled();
      expect(await response.text()).toBe('mocked room response');
    });

    it('should handle room request with hex id', async () => {
      const mockEnv = createMockEnv();
      const mockHexId = 'a'.repeat(64);
      const mockRequest = new Request(`https://example.com/api/room/${mockHexId}`, {
        method: 'GET',
        headers: new Headers()
      });

      const response = await handleApiRequest(['room', mockHexId], mockRequest, mockEnv);
      
      expect(mockEnv.CODE.idFromString).toHaveBeenCalledWith(mockHexId);
      expect(mockEnv.CODE.get).toHaveBeenCalled();
      expect(await response.text()).toBe('mocked room response');
    });

    it('should return 404 for room name too long', async () => {
      const mockEnv = createMockEnv();
      const longName = 'a'.repeat(33);
      const mockRequest = new Request(`https://example.com/api/room/${longName}`, {
        method: 'GET'
      });

      const response = await handleApiRequest(['room', longName], mockRequest, mockEnv);
      
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Name too long');
    });

    it('should return 405 for non-POST method on generate without path', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api/generate', {
        method: 'GET'
      });

      const response = await handleApiRequest(['generate'], mockRequest, mockEnv);
      
      expect(response.status).toBe(405);
      expect(await response.text()).toBe('Method not allowed');
    });
  });

  describe('default endpoint', () => {
    it('should return 404 for unknown path', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api/unknown', {
        method: 'GET'
      });

      const response = await handleApiRequest(['unknown'], mockRequest, mockEnv);
      
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Not found');
    });

    it('should return HTML response with correct headers', async () => {
      const mockEnv = createMockEnv();
      const mockRequest = new Request('https://example.com/api', {
        method: 'GET'
      });

      const response = await handleApiRequest([], mockRequest, mockEnv);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Content-Type')).toBe('text/html; charset=UTF-8');
      expect(await response.text()).toBe('mocked HTML content');
    });
  });
});
