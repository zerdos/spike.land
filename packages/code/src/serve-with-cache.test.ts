import { beforeEach, describe, expect, it, vi } from "vitest";
import { serveWithCache } from "./serve-with-cache";

describe("serveWithCache", () => {
  const mockUrl = "https://example.com/test.js";
  let mockCache: Cache;
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock Cache API with vi.fn() for each method
    mockCache = {
      match: vi.fn(),
      matchAll: vi.fn(),
      add: vi.fn(),
      addAll: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
      keys: vi.fn(),
    } as unknown as Cache;

    // Mock fetch API
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    // Mock caches global
    global.caches = {
      open: vi.fn().mockResolvedValue(mockCache),
      delete: vi.fn(),
      has: vi.fn(),
      keys: vi.fn(),
      match: vi.fn(),
    };
  });

  it("should return cached response if available", async () => {
    const mockResponse = new Response("cached content");
    vi.mocked(mockCache.match).mockResolvedValueOnce(mockResponse);

    const result = await serveWithCache(mockUrl);

    expect(mockCache.match).toHaveBeenCalledWith(mockUrl);
    expect(result).toBe(mockResponse);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should fetch and cache if response not cached", async () => {
    const mockResponse = new Response("fresh content");
    vi.mocked(mockCache.match).mockResolvedValueOnce(undefined);
    vi.mocked(mockFetch).mockResolvedValueOnce(mockResponse.clone());

    const result = await serveWithCache(mockUrl);

    expect(mockCache.match).toHaveBeenCalledWith(mockUrl);
    expect(mockFetch).toHaveBeenCalledWith(mockUrl);
    expect(mockCache.put).toHaveBeenCalledWith(mockUrl, expect.any(Response));
    expect(await result.text()).toBe("fresh content");
  });

  it("should handle asset fetcher errors", async () => {
    const fetchError = new Error("Fetch error");
    vi.mocked(mockCache.match).mockResolvedValueOnce(undefined);
    vi.mocked(mockFetch).mockRejectedValueOnce(fetchError);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(serveWithCache(mockUrl)).rejects.toBe(fetchError);
    expect(consoleSpy).toHaveBeenCalledWith("Asset fetch error:", fetchError);

    consoleSpy.mockRestore();
  });

  it("should handle cache match errors", async () => {
    const matchError = new Error("Cache match failed");
    vi.mocked(mockCache.match).mockRejectedValueOnce(matchError);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(serveWithCache(mockUrl)).rejects.toBe(matchError);
    expect(consoleSpy).toHaveBeenCalledWith("Cache match error:", matchError);

    consoleSpy.mockRestore();
  });

  it("should handle cache put failures", async () => {
    const mockResponse = new Response("fresh content");
    const putError = new Error("Cache put failed");

    vi.mocked(mockCache.match).mockResolvedValueOnce(undefined);
    vi.mocked(mockFetch).mockResolvedValueOnce(mockResponse.clone());
    vi.mocked(mockCache.put).mockRejectedValueOnce(putError);

    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(serveWithCache(mockUrl)).rejects.toBe(putError);
    expect(consoleSpy).toHaveBeenCalledWith("Cache put error:", putError);

    consoleSpy.mockRestore();
  });
});
