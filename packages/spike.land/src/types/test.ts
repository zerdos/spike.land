import type { Mock } from 'vitest';
import type {
  Request as CFRequest,
  Headers as CFHeaders,
  Response as CFResponse,
  KVNamespace as CFKVNamespace,
  DurableObjectNamespace as CFDurableObjectNamespace,
  R2Bucket as CFR2Bucket,
  R2ObjectBody as CFR2ObjectBody,
  CfProperties,
  KVNamespaceListResult,
  KVNamespaceListOptions,
  KVNamespaceGetOptions,
  R2PutOptions
} from "@cloudflare/workers-types";

// Mock function type
type MockFn<T extends (...args: any[]) => any> = T & Mock<ReturnType<T>>;

// Mock Headers for tests
export interface TestHeaders extends CFHeaders {
  get: MockFn<(name: string) => string | null>;
  set: MockFn<(name: string, value: string) => void>;
  append: MockFn<(name: string, value: string) => void>;
  delete: MockFn<(name: string) => void>;
  has: MockFn<(name: string) => boolean>;
  getAll: MockFn<(name: string) => string[]>;
  entries: MockFn<() => IterableIterator<[string, string]>>;
  keys: MockFn<() => IterableIterator<string>>;
  values: MockFn<() => IterableIterator<string>>;
  [Symbol.iterator]: () => IterableIterator<[string, string]>;
}

// Mock Request for tests
export interface TestRequest extends Omit<CFRequest, 'headers'> {
  headers: TestHeaders;
  cache: RequestCache;
  credentials: RequestCredentials;
  destination: RequestDestination;
  mode: RequestMode;
  redirect: RequestRedirect;
}

// Mock Response for tests
export interface TestResponse extends Omit<CFResponse, 'headers'> {
  headers: TestHeaders;
  type: ResponseType;
}

// Mock KVNamespace for tests
export interface TestKVNamespace extends Omit<CFKVNamespace<string>, 'get' | 'put' | 'list'> {
  get: MockFn<{
    (key: string, options?: Partial<KVNamespaceGetOptions<undefined>>): Promise<string | null>;
    (key: string, type: "text"): Promise<string | null>;
    <ExpectedValue = unknown>(key: string, type: "json"): Promise<ExpectedValue | null>;
    (key: string, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
    (key: string, type: "stream"): Promise<ReadableStream | null>;
  }>;
  put: MockFn<(key: string, value: string | ArrayBuffer | ArrayBufferView | ReadableStream, options?: R2PutOptions) => Promise<void>>;
  list: MockFn<<Metadata = unknown>(options?: KVNamespaceListOptions) => Promise<KVNamespaceListResult<Metadata, string>>>;
}

// Mock R2Bucket for tests
export interface TestR2Bucket extends Omit<CFR2Bucket, 'get' | 'put'> {
  get: MockFn<(key: string) => Promise<R2ObjectBody | null>>;
  put: MockFn<(key: string, value: string | ArrayBuffer | ArrayBufferView | ReadableStream | Blob | null, options?: R2PutOptions) => Promise<R2Object>>;
}

// Mock DurableObjectNamespace for tests
export interface TestDurableObjectNamespace extends Omit<CFDurableObjectNamespace, 'get'> {
  get: MockFn<(id: DurableObjectId) => DurableObjectStub>;
}

// Additional test types
export interface DurableObjectId {
  toString(): string;
  equals(other: DurableObjectId): boolean;
  name?: string;
}

export interface DurableObjectStub {
  fetch(input: RequestInfo | URL, init?: RequestInit<CfProperties<unknown>>): Promise<Response>;
  connect(address: string | SocketAddress, options?: SocketOptions): Socket;
}

export interface SocketAddress {
  hostname: string;
  port: number;
}

export interface SocketOptions {
  allowHalfOpen?: boolean;
  secureTransport?: string;
}

export interface Socket {
  closed: Promise<void>;
  close(): void;
  write(data: string | ArrayBuffer | ArrayBufferView): void;
  readable: ReadableStream;
  writable: WritableStream;
}

export interface R2Object {
  key: string;
  version: string;
  size: number;
  etag: string;
  httpEtag: string;
  uploaded: Date;
  httpMetadata?: R2HTTPMetadata;
  customMetadata?: Record<string, string>;
  range?: R2Range;
}

export interface R2HTTPMetadata {
  contentType?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  cacheControl?: string;
  cacheExpiry?: Date;
}

export interface R2Range {
  offset: number;
  length: number;
}
