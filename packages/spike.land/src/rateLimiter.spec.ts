import { beforeEach, describe, expect, it, vi } from "vitest";
import { CodeRateLimiter } from "./rateLimiter";

// Mock handleErrors to pass through the handler
vi.mock("./handleErrors", () => ({
  handleErrors: vi.fn((_request, handler) => handler()),
}));

describe("CodeRateLimiter", () => {
  let rateLimiter: CodeRateLimiter;
  let mockDateNow: number;

  beforeEach(() => {
    // Create a new rate limiter for each test
    rateLimiter = new CodeRateLimiter();

    // Mock Date.now() to have predictable timing
    mockDateNow = 1000000; // Fixed timestamp
    vi.spyOn(Date, "now").mockReturnValue(mockDateNow);
  });

  describe("GET Request Behavior", () => {
    it("should return 0 cooldown on first GET request", async () => {
      const request = new Request("https://example.com", { method: "GET" });
      const response = await rateLimiter.fetch(request);

      expect(await response.text()).toBe("0");
    });

    it("should maintain consistent cooldown between GET requests", async () => {
      const request1 = new Request("https://example.com", { method: "GET" });
      const request2 = new Request("https://example.com", { method: "GET" });

      const response1 = await rateLimiter.fetch(request1);
      expect(await response1.text()).toBe("0");

      // Simulate minimal time passing
      vi.spyOn(Date, "now").mockReturnValue(mockDateNow + 500);

      const response2 = await rateLimiter.fetch(request2);
      expect(await response2.text()).toBe("0");
    });
  });

  describe("POST Request Behavior", () => {
    it("should increment cooldown on POST requests", async () => {
      const request1 = new Request("https://example.com", { method: "POST" });
      const request2 = new Request("https://example.com", { method: "POST" });

      const response1 = await rateLimiter.fetch(request1);
      expect(await response1.text()).toBe("0");

      // Simulate minimal time passing
      vi.spyOn(Date, "now").mockReturnValue(mockDateNow + 500);

      const response2 = await rateLimiter.fetch(request2);
      expect(await response2.text()).toBe("0"); // Cooldown should still be 0 due to minimal time passing
    });

    it("should provide grace period for multiple quick requests", async () => {
      const rateLimiter = new CodeRateLimiter();
      const postRequest = new Request("http://example.com", { method: "POST" });

      // Make 5 quick requests
      const responses = await Promise.all([
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
      ]);

      // First 4 requests should be allowed with no cooldown
      expect(await responses[0].text()).toBe("0");
      expect(await responses[1].text()).toBe("0");
      expect(await responses[2].text()).toBe("0");
      expect(await responses[3].text()).toBe("0");
      // 5th request should trigger cooldown
      expect(await responses[4].text()).toBe("0.5");
    });

    it("should enforce rate limit after grace period", async () => {
      vi.useFakeTimers();
      const rateLimiter = new CodeRateLimiter();
      const postRequest = new Request("http://example.com", { method: "POST" });

      // Make 5 quick requests to trigger cooldown
      await Promise.all([
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
        rateLimiter.fetch(postRequest),
      ]);

      // Wait for grace period to expire (20 seconds) plus cooldown (0.5 seconds)
      vi.advanceTimersByTime(21000);

      // Next request should have no cooldown
      const response = await rateLimiter.fetch(postRequest);
      expect(await response.text()).toBe("0");

      vi.useRealTimers();
    });
  });

  describe("Error Handling", () => {
    it("should use handleErrors wrapper", async () => {
      const { handleErrors } = await import("./handleErrors");
      const request = new Request("https://example.com", { method: "GET" });

      await rateLimiter.fetch(request);

      expect(handleErrors).toHaveBeenCalled();
    });
  });
});
