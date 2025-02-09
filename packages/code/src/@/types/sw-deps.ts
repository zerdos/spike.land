export type QueuedFetch = new(concurrency: number) => {
  fetch: (request: Request, init?: RequestInit) => Promise<Response>;
};

export type FakeServer = (request: Request) => Promise<Response>;

export type ServeWithCache = (
  files: Record<string, string>,
  cacheOpener: () => Promise<Cache>,
) => {
  isAsset: (request: Request) => boolean;
  serve: (
    request: Request,
    fetcher: (request: Request) => Promise<Response>,
    waitUntil: (promise: Promise<unknown>) => void,
  ) => Promise<Response>;
};

// Declare global types that are injected via importScripts
declare global {
  const fakeServer: FakeServer;
  const QueuedFetch: QueuedFetch;
  const serveWithCache: ServeWithCache;
  const importMap: Record<string, string>;
}
