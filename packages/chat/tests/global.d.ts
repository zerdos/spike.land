// Global type declarations for tests

interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T = unknown>(colName?: string): Promise<T | null>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw(): Promise<unknown[][]>;
}

interface D1Result<T = Record<string, unknown>> {
  results: T[];
  success: boolean;
  meta: {
    duration: number;
    size_after: number;
    changes: number;
    last_row_id: number;
  };
}

interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  exec(query: string): Promise<D1Result>;
  first<T = unknown>(query: string, ...bindings: unknown[]): Promise<T | null>;
  all<T = unknown>(query: string, ...bindings: unknown[]): Promise<D1Result<T>>;
  run(query: string, ...bindings: unknown[]): Promise<D1Result>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  bind(...values: unknown[]): D1PreparedStatement;
}

declare global {
  class WebSocketPair {
    0: WebSocket;
    1: WebSocket;
    constructor();
  }

  interface globalThis {
    WebSocketPair: typeof WebSocketPair;
  }
}
