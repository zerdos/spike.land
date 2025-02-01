import { describe, it, expect, beforeEach } from 'vitest';
import { vi, type Mock } from 'vitest';
import { handleMainFetch } from './mainFetchHandler';
import type Env from './env';
import { routes } from "@spike-npm-land/code";
import { handleFetchApi } from './fetchHandler';
import { handleErrors } from './handleErrors';
import { handleUnauthorizedRequest } from './utils';

describe('MainFetchHandler', () => {
  let mockEnv: Partial<Env>;
  let mockCtx: ExecutionContext;
  let mockRequest: Request;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Create a mock environment
    mockEnv = {
      // Add any necessary mock environment properties
    } as any;

    mockCtx = {
      waitUntil: vi.fn()
    } as any;

    // Mock imported functions
    vi.mock('./fetchHandler', () => ({
      handleFetchApi: vi.fn()
    }));

    vi.mock('./handleErrors', () => ({
      handleErrors: vi.fn()
    }));

    vi.mock('./utils', () => ({
      handleUnauthorizedRequest: vi.fn()
    }));
  });

  describe('Yandex Organization Blocking', () => {
    it('should block requests from Yandex organization', async () => {
      const mockYandexRequest = new Request('https://example.com', {
        cf: { asOrganization: 'YANDEX-CLOUD' }
      } as any);

      const mockUnauthorizedResponse = new Response('Unauthorized', { status: 403 });
      (handleUnauthorizedRequest as Mock).mockReturnValue(mockUnauthorizedResponse);

      const response = await handleMainFetch(mockYandexRequest, mockEnv as Env, mockCtx);

      expect(handleUnauthorizedRequest).toHaveBeenCalled();
      expect(response).toBe(mockUnauthorizedResponse);
    });

    it('should allow requests from non-Yandex organizations', async () => {
      const mockRequest = new Request('https://example.com', {
        cf: { asOrganization: 'GOOGLE-CLOUD' }
      } as any);

      const mockFetchApiResponse = new Response('Fetch API response');
      (handleErrors as Mock).mockImplementation(async (_, handler) => await handler());
      (handleFetchApi as Mock).mockResolvedValue(mockFetchApiResponse);

      const response = await handleMainFetch(mockRequest, mockEnv as Env, mockCtx);

      expect(handleErrors).toHaveBeenCalled();
      expect(handleFetchApi).toHaveBeenCalled();
      expect(response).toBe(mockFetchApiResponse);
    });
  });

  describe('Route Redirection', () => {
    it('should redirect known routes to live embed', async () => {
      const testRoute = '/test-route';
      const redirectTarget = 'redirect-target';
      routes[testRoute as keyof typeof routes] = redirectTarget;

      const mockRequest = new Request(`https://example.com${testRoute}`);

      const mockFetchApiResponse = new Response('Redirected response');
      (handleErrors as Mock).mockImplementation(async (_, handler) => await handler());
      (handleFetchApi as Mock).mockResolvedValue(mockFetchApiResponse);

      const response = await handleMainFetch(mockRequest, mockEnv as Env, mockCtx);

      expect(handleFetchApi).toHaveBeenCalledWith(
        ['live', redirectTarget, 'embed'], 
        mockRequest, 
        mockEnv, 
        mockCtx
      );
      expect(response).toBe(mockFetchApiResponse);

      // Clean up the route after test
      delete routes[testRoute as keyof typeof routes];
    });
  });

  describe('Path-based Routing', () => {
    it('should route requests based on URL path', async () => {
      const testPath = '/some/test/path';
      const mockRequest = new Request(`https://example.com${testPath}`);

      const mockFetchApiResponse = new Response('Path-based response');
      (handleErrors as Mock).mockImplementation(async (_, handler) => await handler());
      (handleFetchApi as Mock).mockResolvedValue(mockFetchApiResponse);

      const response = await handleMainFetch(mockRequest, mockEnv as Env, mockCtx);

      expect(handleFetchApi).toHaveBeenCalledWith(
        ['some', 'test', 'path'], 
        mockRequest, 
        mockEnv, 
        mockCtx
      );
      expect(response).toBe(mockFetchApiResponse);
    });

    it('should handle root path requests', async () => {
      const mockRequest = new Request('https://example.com/');

      const mockFetchApiResponse = new Response('Root path response');
      (handleErrors as Mock).mockImplementation(async (_, handler) => await handler());
      (handleFetchApi as Mock).mockResolvedValue(mockFetchApiResponse);

      const response = await handleMainFetch(mockRequest, mockEnv as Env, mockCtx);

      expect(handleFetchApi).toHaveBeenCalledWith(
        [''], 
        mockRequest, 
        mockEnv, 
        mockCtx
      );
      expect(response).toBe(mockFetchApiResponse);
    });
  });

  describe('Error Handling', () => {
    it('should wrap request handling in error handler', async () => {
      const mockRequest = new Request('https://example.com/test');

      const mockFetchApiResponse = new Response('Handled response');
      const mockErrorHandlerWrapper = vi.fn().mockResolvedValue(mockFetchApiResponse);
      (handleErrors as Mock).mockImplementation(async (_, handler) => await handler());

      const response = await handleMainFetch(mockRequest, mockEnv as Env, mockCtx);

      expect(handleErrors).toHaveBeenCalledWith(
        mockRequest, 
        expect.any(Function)
      );
      expect(response).toBe(mockFetchApiResponse);
    });

    it('should log request URL', async () => {
      const testUrl = 'https://example.com/logging-test';
      const mockRequest = new Request(testUrl);

      const mockConsoleLog = vi.spyOn(console, 'log').mockImplementation(() => {});
      const mockFetchApiResponse = new Response('Logged response');
      (handleErrors as Mock).mockImplementation(async (_, handler) => await handler());
      (handleFetchApi as Mock).mockResolvedValue(mockFetchApiResponse);

      await handleMainFetch(mockRequest, mockEnv as Env, mockCtx);

      expect(mockConsoleLog).toHaveBeenCalledWith(`handling request: ${testUrl}`);
      mockConsoleLog.mockRestore();
    });
  });
});
