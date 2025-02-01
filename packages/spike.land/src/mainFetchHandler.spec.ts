import { describe, it, expect, vi, beforeEach } from 'vitest';
import { handleMainFetch } from './mainFetchHandler';
import type Env from './env';
import { routes } from "@spike-npm-land/code";

// Mock dependencies
vi.mock("@spike-npm-land/code", () => ({
  routes: {
    '/test-route': 'test-redirect'
  }
}));

vi.mock('./fetchHandler', () => ({
  handleFetchApi: vi.fn()
}));

vi.mock('./handleErrors', () => ({
  handleErrors: vi.fn((request, handler) => handler())
}));

vi.mock('./utils', () => ({
  handleUnauthorizedRequest: vi.fn(() => new Response('Unauthorized', { status: 401 }))
}));

describe('Main Fetch Handler', () => {
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

    // Reset mocked dependencies
    vi.resetAllMocks();
  });

  describe('Yandex Organization Handling', () => {
    it('should block requests from Yandex organization', async () => {
      const mockRequest = new Request('https://example.com', {
        cf: { asOrganization: 'YANDEX-SOMETHING' }
      } as unknown as RequestInit);

      const response = await handleMainFetch(mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(401);
      expect(await response.text()).toBe('Unauthorized');
    });

    it('should allow requests from non-Yandex organizations', async () => {
      const mockRequest = new Request('https://example.com', {
        cf: { asOrganization: 'GOOGLE' }
      } as unknown as RequestInit);

      // Mock handleFetchApi to return a response
      const { handleFetchApi } = await import('./fetchHandler');
      (handleFetchApi as ReturnType<typeof vi.fn>).mockResolvedValue(
        new Response('Allowed', { status: 200 })
      );

      const response = await handleMainFetch(mockRequest, mockEnv, mockCtx);
      
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('Allowed');
    });
  });

  describe('Route Handling', () => {
    it('should handle predefined routes', async () => {
      const mockRequest = new Request('https://example.com/test-route');

      // Mock handleFetchApi to return a response
      const { handleFetchApi } = await import('./fetchHandler');
      (handleFetchApi as ReturnType<typeof vi.fn>).mockResolvedValue(
        new Response('Redirected', { status: 200 })
      );

      const response = await handleMainFetch(mockRequest, mockEnv, mockCtx);
      
      expect(handleFetchApi).toHaveBeenCalledWith(
        ['live', 'test-redirect', 'embed'], 
        expect.anything(), 
        mockEnv, 
        mockCtx
      );
      expect(await response.text()).toBe('Redirected');
    });

    it('should handle non-predefined routes', async () => {
      const mockRequest = new Request('https://example.com/custom/path');

      // Mock handleFetchApi to return a response
      const { handleFetchApi } = await import('./fetchHandler');
      (handleFetchApi as ReturnType<typeof vi.fn>).mockResolvedValue(
        new Response('Custom Path', { status: 200 })
      );

      const response = await handleMainFetch(mockRequest, mockEnv, mockCtx);
      
      expect(handleFetchApi).toHaveBeenCalledWith(
        ['custom', 'path'], 
        expect.anything(), 
        mockEnv, 
        mockCtx
      );
      expect(await response.text()).toBe('Custom Path');
    });
  });

  describe('Error Handling', () => {
    it('should wrap fetch handling with error handler', async () => {
      const mockRequest = new Request('https://example.com/test');

      // Mock handleErrors to pass through the handler
      const { handleErrors } = await import('./handleErrors');
      const mockErrorHandler = vi.fn().mockResolvedValue(
        new Response('Handled', { status: 200 })
      );

      (handleErrors as ReturnType<typeof vi.fn>).mockImplementation(
        async (request, handler) => handler()
      );

      const response = await handleMainFetch(mockRequest, mockEnv, mockCtx);
      
      expect(handleErrors).toHaveBeenCalled();
      expect(await response.text()).toBe('Handled');
    });
  });
});
