import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Mock } from "vitest";
import type MyEnv from "./env";
import R2BucketHandler from "./r2bucket";

type SpyInstance = ReturnType<typeof vi.spyOn>;

describe("R2BucketHandler", () => {
  let mockEnv: MyEnv;
  let mockConsoleError: SpyInstance;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock console.error
    mockConsoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    // Create comprehensive mock environment
    mockEnv = {
      R2: {
        put: vi.fn().mockResolvedValue(undefined),
        get: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(undefined),
        head: vi.fn().mockResolvedValue(null),
        createMultipartUpload: vi.fn().mockResolvedValue(null),
        resumeMultipartUpload: vi.fn().mockResolvedValue(null),
        list: vi.fn().mockResolvedValue({ objects: [], truncated: false }),
      } as R2Bucket,
      // Add all required properties with mock implementations
      OPENAI_API_KEY: "mock-key",
      ANTHROPIC_API_KEY: "mock-key",
      REPLICATE_API_TOKEN: "mock-token",
      CLERK_SECRET_KEY: "mock-secret",
      CF_REAL_TURN_TOKEN: "mock-turn-token",
      AI: {
        aiGatewayLogId: "mock-log-id",
        gateway: vi.fn().mockReturnValue({
          run: vi.fn(() =>
            Promise.resolve(
              Object.assign(new globalThis.Response("dummy", { status: 200 }), {
                type: "default",
              }),
            ) as unknown as Response
          ),
        }),
        run: vi.fn(() =>
          Promise.resolve(
            Object.assign(new globalThis.Response("dummy", { status: 200 }), {
              type: "default",
            }),
          ) as unknown as Response
        ),
        models: vi.fn(async (_params?: AiModelsSearchParams) => [] as AiModelsSearchObject[]),
      } as unknown as Ai<AiModels>,
      KV: {
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        deleteBulk: vi.fn(),
        list: vi.fn(),
        getWithMetadata: vi.fn(),
      } as unknown as KVNamespace,
      __STATIC_CONTENT: {
        get: vi.fn(),
        put: vi.fn(),
        delete: vi.fn(),
        deleteBulk: vi.fn(),
        list: vi.fn(),
        getWithMetadata: vi.fn(),
      } as unknown as KVNamespace,
      CODE: {
        newUniqueId: vi.fn(),
        idFromName: vi.fn(),
        idFromString: vi.fn(),
        get: vi.fn(),
        jurisdiction: vi.fn(),
      } as unknown as DurableObjectNamespace,
      ESBUILD: {
        fetch: vi.fn().mockResolvedValue(new Response()),
        connect: vi.fn().mockReturnValue({} as Socket),
      },
      LIMITERS: {
        newUniqueId: vi.fn(),
        idFromName: vi.fn(),
        idFromString: vi.fn(),
        get: vi.fn(),
        jurisdiction: vi.fn(),
      } as unknown as DurableObjectNamespace,
      X9: {
        put: vi.fn().mockResolvedValue(undefined),
        get: vi.fn().mockResolvedValue(null),
        delete: vi.fn().mockResolvedValue(undefined),
        head: vi.fn().mockResolvedValue(null),
        createMultipartUpload: vi.fn().mockResolvedValue(null),
        resumeMultipartUpload: vi.fn().mockResolvedValue(null),
        list: vi.fn().mockResolvedValue({ objects: [], truncated: false }),
      } as R2Bucket,
      // Add any other properties from the Env type
    } as unknown as MyEnv;
  });

  const createMockRequest = (
    method: string,
    url = "https://example.com/test-key",
  ) => {
    // Create a custom Headers object that mimics Headers
    const mockHeaders: Headers = Object.assign(new Headers(), {
      getAll: vi.fn().mockReturnValue([]),
    });

    // Create a mock Cloudflare request with all required properties
    const mockCfProperties: IncomingRequestCfProperties<unknown> = {
      asn: 0,
      asOrganization: "Test Org",
      colo: "Test Colo",
      edgeRequestKeepAliveStatus: 0,
      tlsClientAuth: null as unknown as IncomingRequestCfPropertiesTLSClientAuth,
      tlsExportedAuthenticator:
        null as unknown as IncomingRequestCfPropertiesExportedAuthenticatorMetadata,
      tlsVersion: "",
      requestPriority: "",
      clientTcpRtt: 0,
      clientAcceptEncoding: "",
      region: "",
      city: "",
      continent: "NA" as ContinentCode,
      country: "US" as Iso3166Alpha2Code,
      latitude: "0",
      longitude: "0",
      hostMetadata: "",
      postalCode: "",
      clientTrustScore: 0,
      metroCode: "",
      httpProtocol: "HTTP/1.1",
      tlsCipher: "",
      botManagement: {
        score: 0,
        ja3Hash: "",
        verifiedBot: false,
        corporateProxy: false,
        staticResource: false,
        detectionIds: [],
      },
    };

    const mockRequest = {
      method,
      url,
      headers: mockHeaders,
      cf: mockCfProperties,
    } as Request<unknown, IncomingRequestCfProperties<unknown>>;
    return mockRequest;
  };

  describe("PUT Request Handling", () => {
    it("should successfully put object to R2 bucket", async () => {
      const mockBlob = new Blob(["test data"]);
      const mockRequest = new Request("https://example.com/test-key", {
        method: "PUT",
        body: mockBlob,
      });

      // Setup successful put response
      (mockEnv.R2.put as Mock).mockResolvedValueOnce({
        key: "test-key",
        size: mockBlob.size,
      });

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(mockEnv.R2.put).toHaveBeenCalledWith("test-key", mockBlob);
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("Put test-key successfully!");
    });

    it("should return 400 for missing request body", async () => {
      const mockRequest = createMockRequest("PUT");
      Object.defineProperty(mockRequest, "blob", {
        value: () => Promise.resolve(null),
      });

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(mockEnv.R2.put).not.toHaveBeenCalled();
      expect(response.status).toBe(400);
      expect(await response.text()).toBe("Missing request body");
    });
  });

  describe("GET Request Handling", () => {
    it("should successfully retrieve object from R2 bucket", async () => {
      const mockBody = new Blob(["test content"]);
      const mockR2Object: R2Object = {
        writeHttpMetadata: (headers: Headers) => {
          headers.set("X-Test-Header", "test-value");
        },
        httpEtag: "test-etag",
        size: 12,
        key: "test-key",
        version: "v1",
        uploaded: new Date(),
        etag: "test-etag",
        storageClass: "STANDARD",
        checksums: {
          md5: new ArrayBuffer(16),
          sha1: new ArrayBuffer(20),
          sha256: new ArrayBuffer(32),
          toJSON: () => ({
            md5: "test-md5",
            sha1: "test-sha1",
            sha256: "test-sha256",
          }),
        },
      };

      const mockRequest = createMockRequest("GET");

      (mockEnv.R2.get as Mock).mockResolvedValue({
        ...mockR2Object,
        body: mockBody,
      });

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(mockEnv.R2.get).toHaveBeenCalledWith("test-key");
      expect(response.status).toBe(200);
      expect(response.headers.get("etag")).toBe("test-etag");
      expect(await response.text()).toBe("test content");
    });

    it("should return 404 for non-existent object", async () => {
      const mockRequest = createMockRequest("GET");

      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(mockEnv.R2.get).toHaveBeenCalledWith("test-key");
      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Object Not Found");
    });
  });

  describe("DELETE Request Handling", () => {
    it("should successfully delete object from R2 bucket", async () => {
      const mockRequest = createMockRequest("DELETE");

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(mockEnv.R2.delete).toHaveBeenCalledWith("test-key");
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("Deleted!");
    });
  });

  describe("Method Validation", () => {
    it("should return 405 for unsupported HTTP methods", async () => {
      const mockRequest = createMockRequest("POST");

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(response.status).toBe(405);
      expect(response.headers.get("Allow")).toBe("PUT, GET, DELETE");
      expect(await response.text()).toBe("Method Not Allowed");
    });
  });

  describe("Error Handling", () => {
    it("should handle and log unexpected errors", async () => {
      const mockRequest = createMockRequest("GET");

      // Use a proper Error object
      const error = new Error("Unexpected error");
      (mockEnv.R2.get as Mock).mockRejectedValueOnce(error);

      const response = await R2BucketHandler.fetch!(
        mockRequest,
        mockEnv,
        {} as ExecutionContext,
      );

      expect(mockConsoleError).toHaveBeenCalledWith(
        "R2 get error:",
        error,
      );
      expect(response.status).toBe(500);
      expect(await response.text()).toBe("Failed to retrieve object");
    });
  });
});
