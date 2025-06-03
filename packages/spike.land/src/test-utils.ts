import type {
  DurableObjectNamespace,
  Fetcher,
  KVNamespace,
  R2Bucket,
} from "@cloudflare/workers-types";
import { vi } from "vitest";

// Create a reusable mock Env factory for tests
export function createMockEnv() {
  return {
    ESM_ORIGIN: "test",
    ESM_TOKEN: "test",
    OPENAI_API_KEY: "test-api-key",
    AI: {
      run: vi.fn(),
      aiGatewayLogId: "test-log-id",
      gateway: "test-gateway",
      models: {},
    } as unknown, // Type assertion since we're mocking only required parts
    KV: {
      get: vi.fn(),
      put: vi.fn(),
      list: vi.fn(),
      delete: vi.fn(),
      getWithMetadata: vi.fn(),
    } as unknown as KVNamespace,
    __STATIC_CONTENT: {
      get: vi.fn(),
      put: vi.fn(),
      list: vi.fn(),
      delete: vi.fn(),
      getWithMetadata: vi.fn(),
    } as unknown as KVNamespace,
    NPM_REGISTRY: "test",
    REPLICATE_API_TOKEN: "test-replicate-api-token",
    ANTHROPIC_API_KEY: "test-anthropic-api-key",
    CLERK_SECRET_KEY: "test-clerk-secret-key",
    CF_REAL_TURN_TOKEN: "test-cf-real-turn-token",
    ESBUILD: {
      fetch: vi.fn(),
      connect: vi.fn(),
    } as unknown as Fetcher,
    NPM_TOKEN: "test",
    CODE: {
      get: vi.fn(),
      newUniqueId: vi.fn(),
      idFromName: vi.fn(),
      idFromString: vi.fn(),
      getNamespace: vi.fn(),
    } as unknown as DurableObjectNamespace,
    LIMITERS: {
      get: vi.fn(),
      newUniqueId: vi.fn(),
      idFromName: vi.fn(),
      idFromString: vi.fn(),
      getNamespace: vi.fn(),
    } as unknown as DurableObjectNamespace,
    R2: {
      head: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
      createMultipartUpload: vi.fn(),
      resumeMultipartUpload: vi.fn(),
      abortMultipartUpload: vi.fn(),
      completeMultipartUpload: vi.fn(),
    } as unknown as R2Bucket,
    X9: {
      head: vi.fn(),
      get: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      list: vi.fn(),
      createMultipartUpload: vi.fn(),
      resumeMultipartUpload: vi.fn(),
      abortMultipartUpload: vi.fn(),
      completeMultipartUpload: vi.fn(),
    } as unknown as R2Bucket,
  };
}
