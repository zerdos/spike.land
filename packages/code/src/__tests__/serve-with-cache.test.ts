import { beforeEach, describe, expect, it, vi } from "vitest";
import { serveWithCache, clearCache, getCacheStats } from "./serve-with-cache";
import { promises as fs } from "fs";
import path from "path";

// Mock dependencies
vi.mock("fs", () => ({
  promises: {
    mkdir: vi.fn(),
    stat: vi.fn(),
    readFile: vi.fn(),
    writeFile: vi.fn(),
    readdir: vi.fn(),
    unlink: vi.fn(),
  }
}));

vi.mock("path", () => ({
  join: vi.fn((dir, file) => `${dir}/${file}`),
}));

describe("serveWithCache", () => {
  const mockUrl = "https://example.com/test";
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock fetch API
    mockFetch = vi.fn();
    global.fetch = mockFetch;
    
    // Mock fs functions
    vi.mocked(fs.mkdir).mockResolvedValue(undefined);
    vi.mocked(fs.stat).mockResolvedValue({
      mtimeMs: Date.now() - 1000, // 1 second ago
      size: 1000,
    } as any);
    vi.mocked(fs.readFile).mockResolvedValue(JSON.stringify({
      url: mockUrl,
      status: 200,
      statusText: "OK",
      headers: { "content-type": "text/plain" },
      body: "cached content",
      timestamp: Date.now() - 1000,
    }));
    vi.mocked(fs.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.readdir).mockResolvedValue([
      { name: "cache1.json", isFile: () => true } as any,
      { name: "cache2.json", isFile: () => true } as any
    ]);
    vi.mocked(fs.unlink).mockResolvedValue(undefined);
  });

  it("should return cached response if available", async () => {
    const result = await serveWithCache(mockUrl);
    
    expect(fs.mkdir).toHaveBeenCalled();
    expect(fs.stat).toHaveBeenCalled();
    expect(fs.readFile).toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();
    
    expect(await result.text()).toBe("cached content");
  });

  it("should fetch and cache if response not cached", async () => {
    // Mock stat to throw error (file not found)
    vi.mocked(fs.stat).mockRejectedValueOnce(new Error("File not found"));
    
    const mockResponse = new Response("fresh content");
    mockFetch.mockResolvedValueOnce(mockResponse);
    
    const result = await serveWithCache(mockUrl);
    
    expect(fs.mkdir).toHaveBeenCalled();
    expect(fs.stat).toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {});
    expect(fs.writeFile).toHaveBeenCalled();
    
    expect(await result.text()).toBe("fresh content");
  });

  it("should bypass cache when requested", async () => {
    const mockResponse = new Response("fresh content");
    mockFetch.mockResolvedValueOnce(mockResponse);
    
    const result = await serveWithCache(mockUrl, {}, { bypassCache: true });
    
    expect(fs.stat).not.toHaveBeenCalled();
    expect(fs.readFile).not.toHaveBeenCalled();
    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {});
    
    expect(await result.text()).toBe("fresh content");
  });

  it("should not cache failed responses", async () => {
    // Mock stat to throw error (file not found)
    vi.mocked(fs.stat).mockRejectedValueOnce(new Error("File not found"));
    
    const mockResponse = new Response("Error", { status: 404 });
    mockFetch.mockResolvedValueOnce(mockResponse);
    
    const result = await serveWithCache(mockUrl);
    
    expect(mockFetch).toHaveBeenCalledWith(mockUrl, {});
    expect(fs.writeFile).not.toHaveBeenCalled();
    
    expect(result.status).toBe(404);
  });

  it("should handle fetch errors", async () => {
    // Mock stat to throw error (file not found)
    vi.mocked(fs.stat).mockRejectedValueOnce(new Error("File not found"));
    
    const fetchError = new Error("Fetch error");
    mockFetch.mockRejectedValueOnce(fetchError);
    
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    
    await expect(serveWithCache(mockUrl)).rejects.toThrow("Fetch error");
    expect(consoleSpy).toHaveBeenCalled();
    
    consoleSpy.mockRestore();
  });
  
  it("should clear specific URL cache", async () => {
    await clearCache(mockUrl);
    
    expect(fs.unlink).toHaveBeenCalled();
  });
  
  it("should clear all cache", async () => {
    await clearCache();
    
    expect(fs.readdir).toHaveBeenCalled();
    expect(fs.unlink).toHaveBeenCalledTimes(2); // Two cache files
  });
  
  it("should get cache stats", async () => {
    const stats = await getCacheStats();
    
    expect(stats).toEqual({
      cacheSize: 2000, // 2 files of 1000 bytes each
      itemCount: 2,
      oldestItem: expect.any(Number),
      newestItem: expect.any(Number),
    });
  });
});
