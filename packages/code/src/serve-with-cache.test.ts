import { describe, it, expect, vi, beforeEach } from 'vitest';
import { serveWithCache } from '@/lib/serve-with-cache';

// Mock dependencies
vi.mock('@/lib/importmap-utils', () => ({
  importMap: {
    imports: {
      'react': '/react.js',
      'react-dom': '/react-dom.js',
    },
  },
}));

vi.mock('mime-types', () => ({
  lookup: (path: string) => {
    if (path.endsWith('.html')) return 'text/html';
    if (path.endsWith('.js')) return 'application/javascript';
    return 'application/octet-stream';
  },
}));

vi.mock('node-html-parser', () => ({
  parse: (html: string) => ({
    querySelector: () => ({
      setAttribute: vi.fn(),
      set_content: vi.fn(),
    }),
    toString: () => html,
  }),
}));

describe('serveWithCache', () => {
  const ASSET_HASH = 'abc123';
  const files = {
    'index.html': 'index_content_hash',
    'main.js': 'main_js_content_hash',
  };
  let cache: Cache;
  let cacheToUse: () => Promise<Cache>;
  let assetFetcher: (req: Request, waitUntil: (p: Promise<unknown>) => void) => Promise<Response>;
  let waitUntil: (p: Promise<unknown>) => void;

  beforeEach(() => {
    cache = {
      match: vi.fn(),
      put: vi.fn(),
    } as unknown as Cache;
    cacheToUse = vi.fn().mockResolvedValue(cache);
    assetFetcher = vi.fn();
    waitUntil = vi.fn();
  });

  it('should correctly identify assets', async () => {
    const { isAsset } = serveWithCache(ASSET_HASH, files, cacheToUse);

    expect(isAsset(new Request('https://example.com/abc123/index.html'))).toBe(true);
    expect(isAsset(new Request('https://example.com/abc123/main.js'))).toBe(true);
    expect(isAsset(new Request('https://example.com/abc123/nonexistent.js'))).toBe(false);
    expect(isAsset(new Request('https://example.com/def456/index.html'))).toBe(false);
  });

  it('should serve assets from cache if available', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    const cachedResponse = new Response('cached content');
    vi.mocked(cache.match).mockResolvedValue(cachedResponse);

    const result = await serve(new Request('https://example.com/abc123/main.js'), assetFetcher, waitUntil);

    expect(result).toBe(cachedResponse);
    expect(assetFetcher).not.toHaveBeenCalled();
    expect(cache.match).toHaveBeenCalledWith(expect.any(Request));
  });

  it('should fetch and cache assets if not in cache', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('fetched content', {
      headers: { 'Content-Type': 'application/javascript' },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request('https://example.com/abc123/main.js'), assetFetcher, waitUntil);

    expect(await result.text()).toBe('fetched content');
    expect(result.headers.get('Content-Type')).toBe('application/javascript');
    expect(result.headers.get('Cache-Control')).toBe('public, max-age=604800, immutable');
    expect(cache.put).toHaveBeenCalledWith(expect.any(Request), expect.any(Response));
    expect(assetFetcher).toHaveBeenCalledWith(expect.any(Request), expect.any(Function));
  });

  it('should handle index.html specially', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('<!DOCTYPE html><html><head><base href="/"><script type="importmap"></script></head><body></body></html>', {
      headers: { 'Content-Type': 'text/html' },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request('https://example.com/abc123/index.html'), assetFetcher, waitUntil);

    expect(await result.text()).toContain('<!DOCTYPE html>');
    expect(result.headers.get('Content-Type')).toBe('text/html');
    expect(cache.put).toHaveBeenCalledWith(expect.any(Request), expect.any(Response));
    
    // Additional assertions for index.html handling
    const resultText = await result.text();
    expect(resultText).toContain(`<base href="/${ASSET_HASH}/"`);
    expect(resultText).toContain(`"imports":`);
    expect(resultText).toContain(`"/${ASSET_HASH}/react.js"`);
  });

  it('should handle non-GET requests', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);

    const result = await serve(new Request('https://example.com/abc123/main.js', { method: 'POST' }), assetFetcher, waitUntil);

    expect(result.status).toBe(405);
    expect(await result.text()).toBe('Method Not Allowed');
  });

  it('should handle non-existent assets', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);

    await expect(serve(new Request('https://example.com/abc123/nonexistent.js'), assetFetcher, waitUntil)).rejects.toThrow('Not an asset');
  });

  it('should handle asset fetcher errors', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(assetFetcher).mockRejectedValue(new Error('Fetch error'));

    const result = await serve(new Request('https://example.com/abc123/main.js'), assetFetcher, waitUntil);

    expect(result.status).toBe(500);
    expect(await result.text()).toBe('Internal Server Error');
  });

  it('should set correct headers for non-HTML assets', async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('console.log("test");', {
      headers: { 'Content-Type': 'application/javascript' },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request('https://example.com/abc123/main.js'), assetFetcher, waitUntil);

    expect(result.headers.get('Content-Type')).toBe('application/javascript');
    expect(result.headers.get('Cache-Control')).toBe('public, max-age=604800, immutable');
    expect(result.headers.get('Cross-Origin-Embedder-Policy')).toBe('require-corp');
  });
});

// Additional test for addPrefixToImportMap function
describe('addPrefixToImportMap', () => {
  it('should add prefix to import map entries', () => {
    const importMap = {
      imports: {
        'react': '/react.js',
        'react-dom': '/react-dom.js',
      },
    };
    const prefix = '/abc123';

    const result = (serveWithCache as any).addPrefixToImportMap(importMap, prefix);

    expect(result).toEqual({
      imports: {
        'react': '/abc123/react.js',
        'react-dom': '/abc123/react-dom.js',
      },
    });
  });
});