export interface MockableHeaders extends Headers {
  mockImplementation?: <T>(impl: () => T) => void;
  mockResolvedValue?: <T>(value: T) => void;
  mockRejectedValue?: (error: Error) => void;
  mockResolvedValueOnce?: <T>(value: T) => void;
  mockRejectedValueOnce?: (error: Error) => void;
}

export interface MockableRequest extends Request {
  headers: MockableHeaders;
  mockImplementation?: <T>(impl: () => T) => void;
  mockResolvedValue?: <T>(value: T) => void;
  mockRejectedValue?: (error: Error) => void;
  mockResolvedValueOnce?: <T>(value: T) => void;
  mockRejectedValueOnce?: (error: Error) => void;
}

export interface MockableResponse extends Response {
  headers: MockableHeaders;
  mockImplementation?: <T>(impl: () => T) => void;
  mockResolvedValue?: <T>(value: T) => void;
  mockRejectedValue?: (error: Error) => void;
  mockResolvedValueOnce?: <T>(value: T) => void;
  mockRejectedValueOnce?: (error: Error) => void;
}

// Mockable method type
// Mockable method type that preserves the original function signature
type MockableFn<T> = T & {
  mockImplementation?: (impl: T) => void;
  mockResolvedValue?: <R>(value: R) => void;
  mockRejectedValue?: (error: Error) => void;
  mockResolvedValueOnce?: <R>(value: R) => void;
  mockRejectedValueOnce?: (error: Error) => void;
};

// KVNamespace get method overloads
interface KVGet {
  (
    key: string,
    options?: Partial<KVNamespaceGetOptions<undefined>>,
  ): Promise<string | null>;
  (key: string, type: "text"): Promise<string | null>;
  <ExpectedValue = unknown>(
    key: string,
    type: "json",
  ): Promise<ExpectedValue | null>;
  (key: string, type: "arrayBuffer"): Promise<ArrayBuffer | null>;
  (key: string, type: "stream"): Promise<ReadableStream | null>;
}

export interface MockableKVNamespace<T extends string = string>
  extends Omit<KVNamespace<T>, "get" | "put" | "list">
{
  get: MockableFn<KVGet>;
  put: MockableFn<
    (
      key: string,
      value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    ) => Promise<void>
  >;
  list: MockableFn<
    <Metadata = unknown>(
      options?: KVNamespaceListOptions,
    ) => Promise<KVNamespaceListResult<Metadata, string>>
  >;
}

// Response creation utilities
export interface CloudflareResponseInit {
  status?: number;
  statusText?: string;
  headers?: Record<string, string>;
}

export function createResponse(
  body: string | ArrayBuffer | ArrayBufferView | Blob | null,
  init?: CloudflareResponseInit,
): Response {
  const headers = new Headers();
  if (init?.headers) {
    Object.entries(init.headers).forEach(([key, value]) => {
      headers.set(key, value);
    });
  }
  return new Response(body as BodyInit, {
    status: init?.status,
    statusText: init?.statusText,
    headers,
  });
}

export function createHandler<Env = unknown>(
  handler: ExportedHandler<Env>["fetch"],
): ExportedHandler<Env> {
  return { fetch: handler };
}

// Additional type utilities
export interface KVNamespaceGetOptions<Type> {
  type: Type;
  cacheTtl?: number;
}

export interface KVNamespaceListOptions {
  limit?: number;
  prefix?: string;
  cursor?: string;
}

export interface KVNamespaceListResult<Metadata, Key> {
  keys: Array<{ name: Key; metadata?: Metadata; }>;
  list_complete: boolean;
  cursor?: string;
}

export interface R2PutOptions {
  onlyIf?: R2Conditional;
  customMetadata?: Record<string, string>;
  httpMetadata?: R2HTTPMetadata;
  md5?: string;
}

export interface R2Conditional {
  etagMatches?: string;
  etagDoesNotMatch?: string;
  uploadedBefore?: Date;
  uploadedAfter?: Date;
}

export interface R2HTTPMetadata {
  contentType?: string;
  contentLanguage?: string;
  contentDisposition?: string;
  contentEncoding?: string;
  cacheControl?: string;
  cacheExpiry?: Date;
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

export interface R2Range {
  offset: number;
  length: number;
}

export interface DurableObjectId {
  toString(): string;
  equals(other: DurableObjectId): boolean;
  name?: string;
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
