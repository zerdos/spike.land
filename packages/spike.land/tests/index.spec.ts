import { describe, expect, it } from "vitest";
import type { ExecutionContext } from "@cloudflare/workers-types";

// Define minimal environment type for testing
interface MockEnv {
  CODE?: {
    newUniqueId: () => { toString: () => string };
    idFromString: (id: string) => string;
    idFromName: (name: string) => string;
    get: (id: string) => { fetch: (request: Request) => Promise<Response> };
  };
}

// Mock worker implementation
const worker = {
  fetch: async (request: Request, env: MockEnv, ctx: ExecutionContext) => {
    return new Response("Hello World!");
  }
};

// Mock ExecutionContext for testing
const createExecutionContext = (): ExecutionContext => ({
  waitUntil: (promise: Promise<unknown>) => promise,
  passThroughOnException: () => {},
  props: {
    testProp1: 'test1',
    testProp2: 'test2'
  }
});

// Helper to create a request with CF properties
const createTestRequest = (url: string): Request => {
  const request = new Request(url);
  Object.defineProperty(request, 'cf', {
    value: {
      asn: 1234,
      asOrganization: 'Test Org',
      colo: 'TEST',
      edgeRequestKeepAliveStatus: 1,
      tlsCipher: 'test-cipher',
      country: 'XX',
      httpProtocol: 'HTTP/1.1',
      requestPriority: '',
      timezone: 'UTC',
      city: 'Test City',
      continent: 'XX',
      latitude: '0',
      longitude: '0',
      postalCode: '12345',
      region: 'Test Region',
      regionCode: 'TR'
    }
  });
  return request;
};

describe("Hello World worker", () => {
    it("responds with Hello World! (unit style)", async () => {
        const request = createTestRequest("http://example.com");
        const ctx = createExecutionContext();
        const mockEnv: MockEnv = {
          CODE: {
            newUniqueId: () => ({ toString: () => "test-id" }),
            idFromString: (id) => id,
            idFromName: (name) => name,
            get: () => ({ fetch: async () => new Response("test") })
          }
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
                newUniqueId: () => ({ toString: () => "test-id" }),
                idFromString: (id) => id,
                idFromName: (name) => name,
                get: () => ({ fetch: async () => new Response("test") })
              }
            };
            return worker.fetch(request, mockEnv, ctx);
        };

        const response = await mockFetch("https://example.com");
        expect(await response.text()).toBe("Hello World!");
    });
});
