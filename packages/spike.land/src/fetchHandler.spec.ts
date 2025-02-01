import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleFetchApi } from './fetchHandler';
import type Env from './env';
import { importMap } from "@spike-npm-land/code";

describe('Fetch Handler', () => {
  let mockEnv: Env;
  let mockCtx: ExecutionContext;

  beforeEach(() => {
    // Reset mocks before each test
    mockEnv = {
      R2: {
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn()
      },
      CODE: {
        newUniqueId: vi.fn(),
        idFromString: vi.fn(),
        idFromName: vi.fn(),
        get: vi.fn()
      },
      HTML: Promise.resolve('mocked HTML')
    } as unknown as Env;

    mockCtx = {
      waitUntil: vi.fn()
    } as unknown as ExecutionContext;

    // Reset global fetch mock
    global.fetch = vi.fn();
  });

  describe('CORS Handling', () => {
    it('should handle OPTIONS request', async () => {
      const mockRequest = new Request('https://example.com', { method: 'OPTIONS' });
      
      const response = await handleFetchApi([], mockRequest, mockEnv, mockCtx);
      
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
      expect(response.headers.get('Allow')).toBe('POST, OPTIONS');
    });
  });

  describe('Specific Handlers', () => {
    it('should handle ping request', async () => {
      const mockRequest = new Request('https://example.com/ping');
      
      const response = await handleFetchApi(['ping'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(200);
      expect(await response.text()).toMatch(/^ping\d+\.\d+$/);
    });

    it('should handle websocket request', async () => {
      const mockRequest = new Request('https://example.com/websocket', {
        headers: new Headers({ 'Upgrade': 'websocket' })
      });
      
      const response = await handleFetchApi(['websocket'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(101);
      expect(response.webSocket).toBeDefined();
    });

    it('should handle websocket request with invalid upgrade', async () => {
      const mockRequest = new Request('https://example.com/websocket');
      
      const response = await handleFetchApi(['websocket'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(400);
      expect(await response.text()).toBe('expected websocket');
    });

    it('should handle importMap.json request', async () => {
      const mockRequest = new Request('https://example.com/importMap.json');
      
      const response = await handleFetchApi(['importMap.json'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(200);
      expect(await response.json()).toEqual(importMap);
    });

    it('should handle robots.txt request', async () => {
      const mockRequest = new Request('https://example.com/robots.txt');
      
      const response = await handleFetchApi(['robots.txt'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('text/plain;charset=UTF-8');
      const text = await response.text();
      expect(text).toContain('User-agent: *');
      expect(text).toContain('Sitemap:');
    });

    it('should handle node_modules request via unpkg', async () => {
      global.fetch = vi.fn().mockResolvedValue(new Response('module content'));
      const mockRequest = new Request('https://example.com/node_modules/test-package');
      
      const response = await handleFetchApi(['node_modules', 'test-package'], mockRequest, mockEnv, mockCtx);
      
      expect(global.fetch).toHaveBeenCalledWith('https://unpkg.com/test-package');
      expect(await response.text()).toBe('module content');
    });
  });

  describe('IPFS Handling', () => {
    it('should handle IPFS request with cloudflare fallback', async () => {
      const mockCloudflareResponse = new Response('cloudflare content', { status: 200 });
      const mockIpfsResponse = new Response('ipfs content', { status: 200 });
      
      global.fetch = vi.fn()
        .mockResolvedValueOnce(mockCloudflareResponse)
        .mockResolvedValueOnce(mockIpfsResponse);

      const mockRequest = new Request('https://example.com/ipfs/test-path');
      
      const response = await handleFetchApi(['ipfs'], mockRequest, mockEnv, mockCtx);
      
      expect(global.fetch).toHaveBeenCalledTimes(2);
      expect(await response.text()).toBe('ipfs content');
    });
  });

  describe('Live Request Handling', () => {
    it('should handle public file GET request', async () => {
      const mockR2Object = {
        body: 'file content',
        writeHttpMetadata: vi.fn(),
        httpEtag: 'test-etag'
      };
      
      mockEnv.R2.get = vi.fn().mockResolvedValue(mockR2Object);

      const mockRequest = new Request('https://example.com/live/testspace/public/file.txt');
      
      const response = await handleFetchApi(['live', 'testspace', 'public', 'file.txt'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('file content');
      expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    });

    it('should handle public file PUT request', async () => {
      const mockRequest = new Request('https://example.com/live/testspace/public/file.txt', {
        method: 'PUT',
        body: 'new file content'
      });
      
      const response = await handleFetchApi(['live', 'testspace', 'public', 'file.txt'], mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(200);
      expect(mockEnv.R2.put).toHaveBeenCalledWith(
        'live/testspace/file.txt', 
        expect.anything()
      );
    });
  });
});
