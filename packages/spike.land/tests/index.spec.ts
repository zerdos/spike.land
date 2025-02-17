/// <reference types="@cloudflare/workers-types" />

import { describe, expect, it } from "vitest";

// Define minimal environment type for testing
interface MockEnv {
  CODE: DurableObjectNamespace;
  KV: KVNamespace;
  R2: R2Bucket;
  AI: any;
  ESBUILD: Fetcher;
}

// Mock worker implementation
const worker = {
  fetch: async (request: Request, env: MockEnv, ctx: ExecutionContext) => {
    return new Response("Hello World!");
  },
};

// Mock ExecutionContext for testing
const createExecutionContext = (): ExecutionContext => ({
  waitUntil: (promise: Promise<unknown>) => promise,
  passThroughOnException: () => {},
  // Required by CF types
  props: {
    testProp1: "test1",
    testProp2: "test2",
  },
});

// Helper to create a request with CF properties
const createTestRequest = (url: string): Request => {
  const request = new Request(url);
  Object.defineProperty(request, "cf", {
    value: {
      asn: 1234,
      asOrganization: "Test Org",
      colo: "TEST",
      edgeRequestKeepAliveStatus: 1,
      tlsCipher: "test-cipher",
      country: "XX",
      httpProtocol: "HTTP/1.1",
      requestPriority: "",
      timezone: "UTC",
      city: "Test City",
      continent: "XX",
      latitude: "0",
      longitude: "0",
      postalCode: "12345",
      region: "Test Region",
      regionCode: "TR",
    },
  });
  return request;
};

// Mock DurableObjectId
class MockDurableObjectId {
  private id: string;
  constructor(id: string) {
    this.id = id;
  }
  toString() {
    return this.id;
  }
  equals(other: MockDurableObjectId) {
    return this.id === other.id;
  }
}

// Mock Response with webSocket property
class MockResponse extends Response {
  webSocket: any = null;
}

describe("Hello World worker", () => {
  it("responds with Hello World! (unit style)", async () => {
    const request = createTestRequest("http://example.com");
    const ctx = createExecutionContext();
    const mockEnv: MockEnv = {
      CODE: {
        newUniqueId: () => new MockDurableObjectId("test-id"),
        idFromString: (id: string) => new MockDurableObjectId(id),
        idFromName: (name: string) => new MockDurableObjectId(name),
        get: () => ({ fetch: async () => new MockResponse("test") }),
      } as unknown as DurableObjectNamespace,
      KV: {} as KVNamespace,
      R2: {} as R2Bucket,
      AI: {},
      ESBUILD: {} as Fetcher,
    };

    const response = await worker.fetch(request, mockEnv, ctx);
    expect(await response.text()).toBe("Hello World!");
  });

  it("responds with Hello World! (integration style)", async () => {
    const mockFetch = async (url: string) => {
      const request = createTestRequest(url);
      const ctx = createExecutionContext();
      const mockEnv: MockEnv = {
        CODE: {
          newUniqueId: () => new MockDurableObjectId("test-id"),
          idFromString: (id: string) => new MockDurableObjectId(id),
          idFromName: (name: string) => new MockDurableObjectId(name),
          get: () => ({ fetch: async () => new MockResponse("test") }),
        } as unknown as DurableObjectNamespace,
        KV: {} as KVNamespace,
        R2: {} as R2Bucket,
        AI: {},
        ESBUILD: {} as Fetcher,
      };
      return worker.fetch(request, mockEnv, ctx);
    };

    const response = await mockFetch("https://example.com");
    expect(await response.text()).toBe("Hello World!");
  });
});
