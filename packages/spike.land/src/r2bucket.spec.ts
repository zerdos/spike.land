import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import type { 
  Request as CloudflareRequest, 
  IncomingRequestCfProperties, 
  Headers as CloudflareHeaders,
  R2Bucket,
  R2Object,
  ContinentCode,
  Iso3166Alpha2Code,
  IncomingRequestCfPropertiesTLSClientAuth,
  IncomingRequestCfPropertiesExportedAuthenticatorMetadata
} from "@cloudflare/workers-types";
import R2BucketHandler from './r2bucket';
import type MyEnv from './env';

type SpyInstance = ReturnType<typeof vi.spyOn>;

describe('R2BucketHandler', () => {
  let mockEnv: MyEnv;
  let mockConsoleError: SpyInstance;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock console.error
    mockConsoleError = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Create comprehensive mock environment
    mockEnv = {
      R2: {
        put: vi.fn().mockResolvedValue(undefined),
        get: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(undefined),
        head: vi.fn().mockResolvedValue(null),
        createMultipartUpload: vi.fn().mockResolvedValue(null),
        resumeMultipartUpload: vi.fn().mockResolvedValue(null),
        list: vi.fn().mockResolvedValue({ objects: [], truncated: false })
      } as R2Bucket,
      // Add all required properties with mock implementations
      OPENAI_API_KEY: 'mock-key',
      ANTHROPIC_API_KEY: 'mock-key',
      REPLICATE_API_TOKEN: 'mock-token',
      CLERK_SECRET_KEY: 'mock-secret',
      CF_REAL_TURN_TOKEN: 'mock-turn-token',
      AI: {} as any,
      KV: {} as any,
      __STATIC_CONTENT: {} as any,
      CODE: {} as any,
      ESBUILD: {} as any,
      LIMITERS: {} as any,
      X9: {} as any,
      // Add any other properties from the Env type
    } as MyEnv;
  });

  const createMockRequest = (method: string, url: string = 'https://example.com/test-key'): CloudflareRequest => {
    // Create a custom Headers object that mimics CloudflareHeaders
    const mockHeaders: CloudflareHeaders = Object.assign(new Headers(), {
      getAll: vi.fn().mockReturnValue([])
    });

    // Create a mock Cloudflare request with all required properties
    const mockCfProperties: IncomingRequestCfProperties = {
      asn: '0',
      asOrganization: 'Test Org',
      colo: 'Test Colo',
      edgeRequestKeepAliveStatus: 0,
      tlsClientAuth: null as unknown as IncomingRequestCfPropertiesTLSClientAuth,
      tlsExportedAuthenticator: null as unknown as IncomingRequestCfPropertiesExportedAuthenticatorMetadata,
      tlsVersion: '',
      requestPriority: '',
      clientTcpRtt: '0',
      clientAcceptEncoding: '',
      region: '',
      city: '',
      continent: 'NA' as ContinentCode,
      country: 'US' as Iso3166Alpha2Code,
      latitude: '0',
      longitude: '0',
      postalCode: '',
      metroCode: '',
      timezone: ''
    };

    return new Request(url, {
      method,
      headers: mockHeaders,
      cf: mockCfProperties
    }) as CloudflareRequest;
  };

  describe('PUT Request Handling', () => {
    it('should successfully put object to R2 bucket', async () => {
      const mockBlob = new Blob(['test content']);
      const mockRequest = createMockRequest('PUT');
      Object.defineProperty(mockRequest, 'body', { value: mockBlob });

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(mockEnv.R2.put).toHaveBeenCalledWith('test-key', mockBlob);
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('Put test-key successfully!');
    });

    it('should return 400 for missing request body', async () => {
      const mockRequest = createMockRequest('PUT');
      Object.defineProperty(mockRequest, 'body', { value: null });

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(mockEnv.R2.put).not.toHaveBeenCalled();
      expect(response.status).toBe(400);
      expect(await response.text()).toBe('Missing request body');
    });
  });

  describe('GET Request Handling', () => {
    it('should successfully retrieve object from R2 bucket', async () => {
      const mockBody = new Blob(['test content']);
      const mockR2Object: R2Object = {
        writeHttpMetadata: (headers: CloudflareHeaders) => {
          headers.set('X-Test-Header', 'test-value');
        },
        httpEtag: 'test-etag',
        body: mockBody
      };

      const mockRequest = createMockRequest('GET');

      (mockEnv.R2.get as Mock).mockResolvedValue(mockR2Object);

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(mockEnv.R2.get).toHaveBeenCalledWith('test-key');
      expect(response.status).toBe(200);
      expect(response.headers.get('etag')).toBe('test-etag');
      expect(await response.text()).toBe('test content');
    });

    it('should return 404 for non-existent object', async () => {
      const mockRequest = createMockRequest('GET');

      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(mockEnv.R2.get).toHaveBeenCalledWith('test-key');
      expect(response.status).toBe(404);
      expect(await response.text()).toBe('Object Not Found');
    });
  });

  describe('DELETE Request Handling', () => {
    it('should successfully delete object from R2 bucket', async () => {
      const mockRequest = createMockRequest('DELETE');

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(mockEnv.R2.delete).toHaveBeenCalledWith('test-key');
      expect(response.status).toBe(200);
      expect(await response.text()).toBe('Deleted!');
    });
  });

  describe('Method Validation', () => {
    it('should return 405 for unsupported HTTP methods', async () => {
      const mockRequest = createMockRequest('POST');

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(response.status).toBe(405);
      expect(response.headers.get('Allow')).toBe('PUT, GET, DELETE');
      expect(await response.text()).toBe('Method Not Allowed');
    });
  });

  describe('Error Handling', () => {
    it('should handle and log unexpected errors', async () => {
      const mockRequest = createMockRequest('GET');

      // Simulate an error during request processing
      (mockEnv.R2.get as Mock).mockRejectedValue(new Error('Unexpected error'));

      const response = await R2BucketHandler.fetch!(mockRequest, mockEnv, {} as ExecutionContext);

      expect(mockConsoleError).toHaveBeenCalledWith(
        'R2 Bucket Handler Error:', 
        expect.any(Error)
      );
      expect(response.status).toBe(500);
      expect(await response.text()).toBe('Internal Server Error');
    });
  });
});
