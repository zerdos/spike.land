import { beforeEach, describe, expect, it } from "vitest";
import { type Mock, vi } from "vitest";
import { handleApiRequest } from "./apiHandler";
import type Env from "./env";

describe("ApiHandler", () => {
  let mockEnv: Partial<Env>;
  let mockFetch: typeof fetch;

  beforeEach(() => {
    // Reset mocks
    vi.resetAllMocks();

    // Mock global fetch
    mockFetch = vi.fn();
    global.fetch = mockFetch;

    // Create a mock environment
    mockEnv = {
      CODE: {
        newUniqueId: vi.fn().mockReturnValue({ toString: () => "mock-unique-id" }),
        idFromString: vi.fn().mockReturnValue("mock-id-from-string"),
        idFromName: vi.fn().mockReturnValue("mock-id-from-name"),
        get: vi.fn().mockReturnValue({
          fetch: vi.fn().mockResolvedValue(new Response("Room fetch result")),
        }),
      } as unknown as DurableObjectNamespace,
    };
  });

  describe("Server-side Fetch", () => {
    it("should handle successful server-side fetch", async () => {
      const mockRequest = new Request("https://example.com/server-fetch", {
        method: "POST",
        body: JSON.stringify({
          url: "https://api.example.com/data",
          options: { method: "GET" },
        }),
      });

      const mockFetchResponse = new Response("Fetch result", { status: 200 });
      (mockFetch as Mock).mockResolvedValue(mockFetchResponse);

      const response = await handleApiRequest(
        ["server-fetch"],
        mockRequest,
        mockEnv as Env,
      );

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/data",
        { method: "GET" },
      );
      expect(response.status).toBe(200);
      expect(await response.text()).toBe("Fetch result");
    });

    it("should handle server-side fetch error", async () => {
      const mockRequest = new Request("https://example.com/server-fetch", {
        method: "POST",
        body: JSON.stringify({
          url: "https://api.example.com/data",
          options: { method: "GET" },
        }),
      });

      (mockFetch as Mock).mockRejectedValue(new Error("Fetch failed"));

      const response = await handleApiRequest(
        ["server-fetch"],
        mockRequest,
        mockEnv as Env,
      );

      expect(response.status).toBe(500);
      expect(await response.text()).toBe("Server-side fetch failed");
    });
  });

  describe("Room/Generate ID Generation", () => {
    it("should generate a new unique ID for room", async () => {
      const mockRequest = new Request("https://example.com/generate", {
        method: "POST",
      });

      const response = await handleApiRequest(
        ["generate"],
        mockRequest,
        mockEnv as Env,
      );

      expect(response.status).toBe(200);
      expect(await response.text()).toBe("mock-unique-id");
      expect(mockEnv.CODE?.newUniqueId).toHaveBeenCalled();
    });

    it("should return method not allowed for non-POST room request", async () => {
      const mockRequest = new Request("https://example.com/generate", {
        method: "GET",
      });

      const response = await handleApiRequest(
        ["generate"],
        mockRequest,
        mockEnv as Env,
      );

      expect(response.status).toBe(405);
      expect(await response.text()).toBe("Method not allowed");
    });
  });

  describe("Room Object Routing", () => {
    it("should route to room object with hex ID", async () => {
      const mockRequest = new Request("https://example.com/room/a".repeat(16), {
        method: "GET",
      });

      const response = await handleApiRequest(
        ["room", "a".repeat(16)],
        mockRequest,
        mockEnv as Env,
      );

      expect(mockEnv.CODE?.idFromString).toHaveBeenCalledWith("a".repeat(16));
      expect((mockEnv.CODE?.get as Mock).mock.calls[0][0]).toBe("mock-id-from-string");
      expect(await response.text()).toBe("Room fetch result");
    });

    it("should route to room object with name ID", async () => {
      const mockRequest = new Request("https://example.com/room/testroom", {
        method: "GET",
      });

      const response = await handleApiRequest(
        ["room", "testroom"],
        mockRequest,
        mockEnv as Env,
      );

      expect(mockEnv.CODE?.idFromName).toHaveBeenCalledWith("testroom");
      expect((mockEnv.CODE?.get as Mock).mock.calls[0][0]).toBe("mock-id-from-name");
      expect(await response.text()).toBe("Room fetch result");
    });

    it("should return error for too long room name", async () => {
      const mockRequest = new Request("https://example.com/room/toolongname", {
        method: "GET",
      });

      const response = await handleApiRequest(
        ["room", "a".repeat(33)],
        mockRequest,
        mockEnv as Env,
      );

      expect(response.status).toBe(404);
      expect(await response.text()).toBe("Name too long");
    });
  });

  describe("Default Response", () => {
    it("should return default HTML response for any unhandled route", async () => {
      const mockRequest = new Request("https://example.com/unknown");

      // Mock HTML import
      vi.mock("@spike-npm-land/code", () => ({
        HTML: Promise.resolve("Mocked HTML Content"),
      }));

      const response = await handleApiRequest(
        [""],
        mockRequest,
        mockEnv as Env,
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("text/html; charset=UTF-8");
      expect(await response.text()).toBe("Mocked HTML Content");
    });
  });
});
