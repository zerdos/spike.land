import { serveWithCache } from "@/lib/serve-with-cache";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/lib/importmap-utils", () => ({
  importMap: {
    imports: {
      "react": "/react.js",
      "react-dom": "/react-dom.js",
    },
  },
}));

vi.mock("mime-types", () => ({
  lookup: (path: string) => {
    if (path.endsWith(".html")) return "text/html";
    if (path.endsWith(".js")) return "application/javascript";
    if (path.endsWith(".css")) return "text/css";
    if (path.endsWith(".png")) return "image/png";
    return "application/octet-stream";
  },
}));

describe("serveWithCache", () => {
  const ASSET_HASH = "abc123";
  const files = {
    "index.html": "index_content_hash",
    "main.js": "main_js_content_hash",
    "styles.css": "styles_css_content_hash",
    "image.png": "image_png_content_hash",
    "special-char-file-πφ.js": "special_char_content_hash",
  };
  let cache: Cache;
  let cacheToUse: () => Promise<Cache>;
  let assetFetcher: (req: Request, waitUntil: (p: Promise<unknown>) => void) => Promise<Response>;
  let waitUntil: (p: Promise<unknown>) => void;

  beforeEach(() => {
    cache = {
      match: vi.fn(),
      put: vi.fn().mockResolvedValue(undefined),
    } as unknown as Cache;
    cacheToUse = vi.fn().mockResolvedValue(cache);
    assetFetcher = vi.fn();
    waitUntil = vi.fn();
  });

  it("should correctly identify assets", async () => {
    const { isAsset } = serveWithCache(ASSET_HASH, files, cacheToUse);

    expect(isAsset(new Request("https://example.com/abc123/index.html"))).toBe(true);
    expect(isAsset(new Request("https://example.com/abc123/main.js"))).toBe(true);
    expect(isAsset(new Request("https://example.com/abc123/nonexistent.js"))).toBe(false);
    expect(isAsset(new Request("https://example.com/def456/index.html"))).toBe(false);
  });

  it("should serve assets from cache if available", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    const cachedResponse = new Response("cached content");
    vi.mocked(cache.match).mockResolvedValue(cachedResponse);

    const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil);

    expect(result).toBe(cachedResponse);
    expect(assetFetcher).not.toHaveBeenCalled();
    expect(cache.match).toHaveBeenCalledWith(expect.any(Request));
  });

  it("should fetch and cache assets if not in cache", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("fetched content", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil);

    expect(await result.clone().text()).toBe("fetched content");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
    expect(result.headers.get("Cache-Control")).toBe("public, max-age=604800, immutable");
    expect(cache.put).toHaveBeenCalledWith(expect.any(Request), expect.any(Response));
    expect(assetFetcher).toHaveBeenCalledWith(expect.any(Request), expect.any(Function));
  });

  it("should handle index.html specially", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response(
      "<!DOCTYPE html><html><head><base href=\"/\"><script type=\"importmap\"></script></head><body></body></html>",
      {
        headers: { "Content-Type": "text/html" },
      },
    );
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/index.html"), assetFetcher, waitUntil);

    const resultClone = result.clone();
    expect(await resultClone.text()).toContain("<!DOCTYPE html>");
    expect(result.headers.get("Content-Type")).toBe("text/html");
    expect(cache.put).toHaveBeenCalledWith(expect.any(Request), expect.any(Response));

    // Additional assertions for index.html handling
    const resultText = await result.text();
    expect(resultText).toContain(`<base href="/${ASSET_HASH}/"`);
    expect(resultText).toContain(`"imports":`);
    expect(resultText).toContain(`"/${ASSET_HASH}/react.js"`);
  });

  it("should handle non-GET requests", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js", { method: "POST" }),
      assetFetcher,
      waitUntil,
    );

    expect(result.status).toBe(405);
    expect(await result.text()).toBe("Method Not Allowed");
  });

  it("should handle non-existent assets", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);

    await expect(serve(new Request("https://example.com/abc123/nonexistent.js"), assetFetcher, waitUntil)).rejects
      .toThrow("Not an asset");
  });

  it("should handle asset fetcher errors", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(assetFetcher).mockRejectedValue(new Error("Fetch error"));

    const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil);

    expect(result.status).toBe(500);
    expect(await result.text()).toBe("Internal Server Error");
  });

  it("should set correct headers for non-HTML assets", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("console.log(\"test\");", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil);

    expect(result.headers.get("Content-Type")).toBe("application/javascript");
    expect(result.headers.get("Cache-Control")).toBe("public, max-age=604800, immutable");
    expect(result.headers.get("Cross-Origin-Embedder-Policy")).toBe("require-corp");
  });

  // New test cases

  it("should handle different file types correctly", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);

    const cssResponse = new Response("body { color: red; }", { headers: { "Content-Type": "text/css" } });
    const pngResponse = new Response(new ArrayBuffer(8), { headers: { "Content-Type": "image/png" } });

    vi.mocked(assetFetcher).mockResolvedValueOnce(cssResponse);
    vi.mocked(assetFetcher).mockResolvedValueOnce(pngResponse);

    const cssResult = await serve(new Request("https://example.com/abc123/styles.css"), assetFetcher, waitUntil);
    const pngResult = await serve(new Request("https://example.com/abc123/image.png"), assetFetcher, waitUntil);

    expect(cssResult.headers.get("Content-Type")).toBe("text/css");
    expect(pngResult.headers.get("Content-Type")).toBe("image/png");
  });

  it("should handle requests with query parameters", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("console.log(\"test\");", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/main.js?v=1"), assetFetcher, waitUntil);

    expect(await result.text()).toBe("console.log(\"test\");");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it("should handle cache put failures", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(cache.put).mockRejectedValue(new Error("Cache put failed"));
    const fetchedResponse = new Response("console.log(\"test\");", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil);

    expect(await result.text()).toBe("console.log(\"test\");");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
    // The request should still be served even if caching fails
  });

  it("should handle concurrent requests for the same asset", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    let fetchCount = 0;
    vi.mocked(assetFetcher).mockImplementation(() => {
      fetchCount++;
      return Promise.resolve(new Response("console.log(\"test\");", {
        headers: { "Content-Type": "application/javascript" },
      }));
    });

    const requests = Array(5).fill(null).map(() => 
      serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil)
    );

    const results = await Promise.all(requests);

    expect(fetchCount).toBe(1); // Asset should only be fetched once
    results.forEach(async (result) => {
      expect(await result.text()).toBe("console.log(\"test\");");
      expect(result.headers.get("Content-Type")).toBe("application/javascript");
    });
  });

  it("should handle different asset versions (different ASSET_HASH)", async () => {
    const { serve: serveV1 } = serveWithCache("v1", files, cacheToUse);
    const { serve: serveV2 } = serveWithCache("v2", files, cacheToUse);

    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(assetFetcher).mockImplementation((req) => {
      const version = req.url.includes("/v1/") ? "v1" : "v2";
      return Promise.resolve(new Response(`console.log("${version}");`, {
        headers: { "Content-Type": "application/javascript" },
      }));
    });

    const resultV1 = await serveV1(new Request("https://example.com/v1/main.js"), assetFetcher, waitUntil);
    const resultV2 = await serveV2(new Request("https://example.com/v2/main.js"), assetFetcher, waitUntil);

    expect(await resultV1.text()).toBe('console.log("v1");');
    expect(await resultV2.text()).toBe('console.log("v2");');
  });

  it("should handle assets with special characters in the filename", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("console.log(\"special\");", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/special-char-file-πφ.js"), assetFetcher, waitUntil);

    expect(await result.text()).toBe("console.log(\"special\");");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it("should handle different status codes from assetFetcher", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);

    vi.mocked(assetFetcher).mockResolvedValueOnce(new Response("Not Found", { status: 404 }));
    vi.mocked(assetFetcher).mockResolvedValueOnce(new Response("Server Error", { status: 500 }));

    const result404 = await serve(new Request("https://example.com/abc123/nonexistent.js"), assetFetcher, waitUntil);
    const result500 = await serve(new Request("https://example.com/abc123/error.js"), assetFetcher, waitUntil);

    expect(result404.status).toBe(404);
    expect(result500.status).toBe(500);
  });

  it("should handle large files", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const largeContent = "a".repeat(1024 * 1024); // 1MB of data
    const fetchedResponse = new Response(largeContent, {
      headers: { "Content-Type": "application/octet-stream" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(new Request("https://example.com/abc123/large-file.bin"), assetFetcher, waitUntil);

    expect(await result.text()).toBe(largeContent);
    expect(result.headers.get("Content-Type")).toBe("application/octet-stream");
  });

  it("should handle waitUntil errors", async () => {
    const { serve } = serveWithCache(ASSET_HASH, files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("console.log(\"test\");", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);
    const errorWaitUntil = vi.fn().mockRejectedValue(new Error("waitUntil error"));

    const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, errorWaitUntil);

    expect(await result.text()).toBe("console.log(\"test\");");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
    // The request should still be served even if waitUntil fails
  });
});
