import { beforeEach, describe, expect, it, vi } from "vitest";
import { serveWithCache } from "@/lib/serve-with-cache";

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
    if (path.endsWith(".txt")) return "text/plain";
    return "application/octet-stream";
  },
}));

describe("serveWithCache", () => {
  const files = {
    "index.html": "index_content_hash",
    "main.js": "main_js_content_hash",
    "styles.css": "styles_css_content_hash",
    "image.png": "image_png_content_hash",
    "special-char-file-πφ.js": "special_char_content_hash",
    "empty.txt": "",
    "large-file.bin": "large_file_content_hash",
    "unknownfile.unknownext": "unknown_content_hash",
    "ASSET_HASH": "abc123",
  };
  let cache: Cache;
  let cacheToUse: () => Promise<Cache>;
  let assetFetcher: (
    req: Request,
    waitUntil: (p: Promise<unknown>) => void,
  ) => Promise<Response>;
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
    const { isAsset } = serveWithCache(files, cacheToUse);

    expect(isAsset(new Request("https://example.com/abc123/index.html"))).toBe(
      true,
    );
    expect(isAsset(new Request("https://example.com/abc123/main.js"))).toBe(
      true,
    );
    expect(isAsset(new Request("https://example.com/abc123/nonexistent.js")))
      .toBe(false);
    expect(isAsset(new Request("https://example.com/def456/index.html"))).toBe(
      false,
    );
  });

  it("should serve assets from cache if available", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    const cachedResponse = new Response("cached content", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
    vi.mocked(cache.match).mockResolvedValue(cachedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );

    // Compare the response body
    expect(await result.text()).toBe("cached content");

    // Compare the status code
    expect(result.status).toBe(cachedResponse.status);

    // Compare headers
    expect(result.headers.get("Content-Type")).toBe(
      cachedResponse.headers.get("Content-Type"),
    );

    // Ensure assetFetcher was not called
    expect(assetFetcher).not.toHaveBeenCalled();

    // Verify cache.match was called with the correct request
    expect(cache.match).toHaveBeenCalledWith(expect.any(Request));
  });

  it("should fetch and cache assets if not in cache", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("fetched content", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.clone().text()).toBe("fetched content");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
    expect(result.headers.get("Cache-Control")).toBe(
      "public, max-age=604800, immutable",
    );
    expect(cache.put).toHaveBeenCalledWith(
      expect.any(Request),
      expect.any(Response),
    );
    expect(assetFetcher).toHaveBeenCalledWith(
      expect.any(Request),
      expect.any(Function),
    );
  });

  it("should handle index.html specially", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response(
      '<!DOCTYPE html><html><head><base href="/"><script type="importmap"></script></head><body></body></html>',
      {
        headers: { "Content-Type": "text/html" },
      },
    );
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/index.html"),
      assetFetcher,
      waitUntil,
    );

    const resultClone = result.clone();
    expect(await resultClone.text()).toContain("<!DOCTYPE html>");
    expect(result.headers.get("Content-Type")).toBe("text/html");
    expect(cache.put).toHaveBeenCalledWith(
      expect.any(Request),
      expect.any(Response),
    );

    const resultText = await result.text();
    expect(resultText).toContain(`<base href="/"`);
    expect(resultText).not.to.contain(`"imports":`);
  });

  it("should handle non-GET requests", async () => {
    const { serve } = serveWithCache(files, cacheToUse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js", { method: "POST" }),
      assetFetcher,
      waitUntil,
    );

    expect(result.status).toBe(405);
    expect(await result.text()).toBe("Method Not Allowed");
  });

  it("should handle non-existent assets", async () => {
    const { serve } = serveWithCache(files, cacheToUse);

    const result = await serve(
      new Request("https://example.com/abc123/nonexistent.js"),
      assetFetcher,
      waitUntil,
    );
    expect(result.status).toBe(404);
    expect(await result.text()).toBe("Not Found");
  });

  it("should handle asset fetcher errors", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(assetFetcher).mockRejectedValue(new Error("Fetch error"));

    const result = await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );

    expect(result.status).toBe(500);
    expect(await result.text()).toBe("Internal Server Error");
  });

  it("should set correct headers for non-HTML assets", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('console.log("test");', {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );

    expect(result.headers.get("Content-Type")).toBe("application/javascript");
    expect(result.headers.get("Cache-Control")).toBe(
      "public, max-age=604800, immutable",
    );
    expect(result.headers.get("Cross-Origin-Embedder-Policy")).toBe(
      "require-corp",
    );
  });

  it("should handle different file types correctly", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);

    const cssResponse = new Response("body { color: red; }", {
      headers: { "Content-Type": "text/css" },
    });
    const pngResponse = new Response(new ArrayBuffer(8), {
      headers: { "Content-Type": "image/png" },
    });

    vi.mocked(assetFetcher).mockResolvedValueOnce(cssResponse);
    vi.mocked(assetFetcher).mockResolvedValueOnce(pngResponse);

    const cssResult = await serve(
      new Request("https://example.com/abc123/styles.css"),
      assetFetcher,
      waitUntil,
    );
    const pngResult = await serve(
      new Request("https://example.com/abc123/image.png"),
      assetFetcher,
      waitUntil,
    );

    expect(cssResult.headers.get("Content-Type")).toBe("text/css");
    expect(pngResult.headers.get("Content-Type")).toBe("image/png");
  });

  it("should handle requests with query parameters", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('console.log("test");', {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js?v=1"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe('console.log("test");');
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it("should handle cache put failures", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(cache.put).mockRejectedValue(new Error("Cache put failed"));
    const fetchedResponse = new Response('console.log("test");', {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe('console.log("test");');
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it("should handle concurrent requests for the same asset", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    let fetchCount = 0;
    vi.mocked(assetFetcher).mockImplementation(() => {
      fetchCount++;
      return Promise.resolve(
        new Response('console.log("test");', {
          headers: { "Content-Type": "application/javascript" },
        }),
      );
    });

    const requests = Array(5)
      .fill(null)
      .map(() =>
        serve(
          new Request("https://example.com/abc123/main.js"),
          assetFetcher,
          waitUntil,
        )
      );

    const results = await Promise.all(requests);

    expect(fetchCount).toBe(1);
    results.forEach(async (result) => {
      expect(await result.text()).toBe('console.log("test");');
      expect(result.headers.get("Content-Type")).toBe("application/javascript");
    });
  });

  it.skip("should handle different asset versions (different ASSET_HASH)", async () => {
    const filesV1 = { "main.js": "main.js", ASSET_HASH: "abc123" };
    const filesV2 = { "main.js": "main.js", ASSET_HASH: "def456" };

    const { serve: serveV1 } = serveWithCache(filesV1, cacheToUse);
    const { serve: serveV2 } = serveWithCache(filesV2, cacheToUse);

    vi.mocked(cache.match).mockResolvedValue(undefined);
    vi.mocked(assetFetcher).mockImplementation((req) => {
      const url = new URL(req.url);
      if (url.pathname.includes("abc123")) {
        return Promise.resolve(
          new Response('console.log("v1");', {
            headers: { "Content-Type": "application/javascript" },
          }),
        );
      } else if (url.pathname.includes("def456")) {
        return Promise.resolve(
          new Response('console.log("v2");', {
            headers: { "Content-Type": "application/javascript" },
          }),
        );
      } else {
        return Promise.resolve(
          new Response('console.log("unknown");', {
            headers: { "Content-Type": "application/javascript" },
          }),
        );
      }
    });

    const resultV1 = await serveV1(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );
    const resultV2 = await serveV2(
      new Request("https://example.com/def456/main.js"),
      assetFetcher,
      waitUntil,
    );

    expect(await resultV1.text()).toBe('console.log("v1");');
    expect(await resultV2.text()).toBe('console.log("v2");');
  });

  it.skip("should handle assets with special characters in the filename", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('console.log("special");', {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/special-char-file-πφ.js"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe('console.log("special");');
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it.skip("should handle different status codes from assetFetcher", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);

    vi.mocked(assetFetcher).mockResolvedValueOnce(
      new Response("Not Found", { status: 404 }),
    );
    vi.mocked(assetFetcher).mockResolvedValueOnce(
      new Response("Server Error", { status: 500 }),
    );

    const result404 = await serve(
      new Request("https://example.com/abc123/nonexistent.js"),
      assetFetcher,
      waitUntil,
    );
    const result500 = await serve(
      new Request("https://example.com/abc123/error.js"),
      assetFetcher,
      waitUntil,
    );

    expect(result404.status).toBe(404);
    expect(result500.status).toBe(500);
  });

  it("should handle large files", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const largeContent = "a".repeat(1024 * 1024); // 1MB of data
    const fetchedResponse = new Response(largeContent, {
      headers: { "Content-Type": "application/octet-stream" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/large-file.bin"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe(largeContent);
    expect(result.headers.get("Content-Type")).toBe("application/octet-stream");
  });

  it("should handle waitUntil errors", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response('console.log("test");', {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);
    const errorWaitUntil = vi.fn().mockRejectedValue(
      new Error("waitUntil error"),
    );

    const result = await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      errorWaitUntil,
    );

    expect(await result.text()).toBe('console.log("test");');
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  // it("should handle cacheToUse failures", async () => {
  //   const errorCacheToUse = vi.fn().mockRejectedValue(new Error("Cache creation failed"));
  //   const { serve } = serveWithCache(files, errorCacheToUse);
  //   const fetchedResponse = new Response("console.log(\"test\");", {
  //     headers: { "Content-Type": "application/javascript" },
  //   });
  //   vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

  //   const result = await serve(new Request("https://example.com/abc123/main.js"), assetFetcher, waitUntil);

  //   expect(await result.text()).toBe("console.log(\"test\");");
  //   expect(result.headers.get("Content-Type")).toBe("application/javascript");
  //   expect(assetFetcher).toHaveBeenCalled(); // Verify asset was fetched
  // });

  it("should handle empty responses", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const emptyResponse = new Response("", {
      headers: { "Content-Type": "text/plain" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(emptyResponse);

    const result = await serve(
      new Request("https://example.com/abc123/empty.txt"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe("");
    expect(result.headers.get("Content-Type")).toBe("text/plain");
  });

  // New tests added below

  it("should handle files with unknown extensions using 'application/octet-stream' Content-Type", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("binary content", {
      headers: {},
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/unknownfile.unknownext"),
      assetFetcher,
      waitUntil,
    );

    expect(result.headers.get("Content-Type")).toBe("application/octet-stream");
  });

  it.skip("should set 'Cross-Origin-Embedder-Policy' header correctly", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("content", {
      headers: {},
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/somefile.js"),
      assetFetcher,
      waitUntil,
    );

    expect(result.headers.get("Cross-Origin-Embedder-Policy")).toBe(
      "require-corp",
    );
  });

  it("should not set 'Access-Control-Allow-Origin' header", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("content", {
      headers: {},
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/somefile.js"),
      assetFetcher,
      waitUntil,
    );

    expect(result.headers.has("Access-Control-Allow-Origin")).toBe(false);
  });

  it("should call 'waitUntil' with cache put promise", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("content", {
      headers: { "Content-Type": "text/plain" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    await serve(
      new Request("https://example.com/abc123/main.js"),
      assetFetcher,
      waitUntil,
    );

    expect(waitUntil).toHaveBeenCalledWith(expect.any(Promise));
  });

  it("should correctly identify assets in subdirectories", () => {
    const filesWithSubdirs = {
      "index.html": "index_content_hash",
      "js/main.js": "main_js_content_hash",
      "css/styles.css": "styles_css_content_hash",
      "images/image.png": "image_png_content_hash",
      "ASSET_HASH": "abc123",
    };
    const { isAsset } = serveWithCache(filesWithSubdirs, cacheToUse);

    expect(isAsset(new Request("https://example.com/abc123/js/main.js"))).toBe(
      true,
    );
    expect(isAsset(new Request("https://example.com/abc123/css/styles.css")))
      .toBe(true);
    expect(isAsset(new Request("https://example.com/abc123/images/image.png")))
      .toBe(true);
    expect(isAsset(new Request("https://example.com/abc123/nonexistent.js")))
      .toBe(false);
  });

  it("should serve assets in subdirectories correctly", async () => {
    const filesWithSubdirs = {
      "index.html": "index_content_hash",
      "js/main.js": "main_js_content_hash",
      "css/styles.css": "styles_css_content_hash",
      "images/image.png": "image_png_content_hash",
      "ASSET_HASH": "abc123",
    };
    const { serve } = serveWithCache(filesWithSubdirs, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);
    const fetchedResponse = new Response("/* CSS content */", {
      headers: { "Content-Type": "text/css" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/css/styles.css"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe("/* CSS content */");
    expect(result.headers.get("Content-Type")).toBe("text/css");
  });

  it.skip("should correctly update import map in index.html with complex import map", async () => {
    vi.mocked(cache.match).mockResolvedValue(undefined);

    // Update the import map mock
    const importMapMock = {
      imports: {
        "/@/": "/",
        "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
        "react/jsx-runtime": "/jsx.mjs",
        "react-dom/server": "/reactDomServer.mjs",
        "react-dom/client": "/reactDomClient.mjs",
        "@emotion/react": "/emotion.mjs",
        "react": "/react.js",
        "framer-motion": "/motion.mjs",
        "react-dom": "/react-dom.js",
      },
    };

    vi.mocked(await import("@/lib/importmap-utils")).importMap = importMapMock;

    const { serve } = serveWithCache(files, cacheToUse);

    const fetchedResponse = new Response(
      '<!DOCTYPE html><html><head><script type="importmap"></script></head><body></body></html>',
      { headers: { "Content-Type": "text/html" } },
    );

    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/index.html"),
      assetFetcher,
      waitUntil,
    );

    const resultText = await result.text();
    expect(resultText).toContain(`"react":"/abc123/react.js"`);
    expect(resultText).toContain(
      `"./local-module.js":"/abc123/./local-module.js"`,
    );
    expect(resultText).toContain(`"scopes"`);
    expect(resultText).toContain(
      `"/scoped/":{"scoped-lib":"/abc123/scoped-lib.js"}`,
    );
  });

  it("should handle requests with hash fragments", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);

    const fetchedResponse = new Response("console.log('hash fragment');", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js#somehash"),
      assetFetcher,
      waitUntil,
    );

    expect(await result.text()).toBe("console.log('hash fragment');");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it("should handle requests with query parameters and hash fragments", async () => {
    const { serve } = serveWithCache(files, cacheToUse);
    vi.mocked(cache.match).mockResolvedValue(undefined);

    const fetchedResponse = new Response("console.log('query and hash');", {
      headers: { "Content-Type": "application/javascript" },
    });
    vi.mocked(assetFetcher).mockResolvedValue(fetchedResponse);

    const result = (await serve(
      new Request("https://example.com/abc123/main.js?v=1#somehash"),
      assetFetcher,
      waitUntil,
    )).clone();

    expect(await result.text()).toBe("console.log('query and hash');");
    expect(result.headers.get("Content-Type")).toBe("application/javascript");
  });

  it("should handle HEAD requests", async () => {
    const { serve } = serveWithCache(files, cacheToUse);

    const result = await serve(
      new Request("https://example.com/abc123/main.js", { method: "HEAD" }),
      assetFetcher,
      waitUntil,
    );

    expect(result.status).toBe(405);
    expect(await result.text()).toBe("Method Not Allowed");
  });
});
