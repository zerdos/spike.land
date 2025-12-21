import type { Mock } from "vitest";

// Type for mocking SQL functionality
export interface MockSql {
  exec: Mock;
  batch: Mock;
  run: Mock;
  get: Mock;
  all: Mock;
  raw: Mock;
  values: Mock;
  first: Mock;
  dump: Mock;
  databaseSize: () => number;
  prepare: Mock;
}

// Type for mocking AI functionality
export interface MockAI {
  run: Mock;
  models: {
    list: Mock;
    get: Mock;
  };
  gateway: {
    logId: Mock;
  };
  aiGatewayLogId: string;
}

// Type for mocking KV functionality
export interface MockKV {
  get: Mock;
  put: Mock;
  list: Mock;
  getWithMetadata: Mock;
  delete: Mock;
}

// Type for mocking static content
export interface MockStaticContent {
  get: Mock;
  list: Mock;
  put: Mock;
  getWithMetadata: Mock;
  delete: Mock;
}

// Type for mocking Durable Object namespace
export interface MockDurableObjectNamespace {
  newUniqueId: Mock;
  idFromName: Mock;
  idFromString: Mock;
  get: Mock;
  jurisdiction: Mock;
}

// Type for mocking R2 bucket
export interface MockR2Bucket {
  head: Mock;
  get: Mock;
  put: Mock;
  delete: Mock;
  list: Mock;
  createMultipartUpload: Mock;
  resumeMultipartUpload: Mock;
}

// Type for mocking container
export interface MockContainer {
  fetch: Mock;
  getTcpPort: Mock;
}
