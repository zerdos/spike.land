import { beforeEach, describe, expect, it, type Mock, vi } from "vitest";
import type Env from "../env.js";
import { createMockEnv } from "../test-utils.js";

// Mock external modules
vi.mock("@spike-npm-land/code", () => ({
  md5: vi.fn().mockImplementation((input: string) => `md5-${input.substring(0, 20)}`),
}));

vi.mock("../utils/cache", () => ({
  getCacheDefault: vi.fn().mockReturnValue({
    match: vi.fn().mockResolvedValue(null),
    put: vi.fn().mockResolvedValue(undefined),
  }),
}));

// Mock Replicate - it's already aliased in vitest.config.ts but we need explicit mocking
vi.mock("replicate", () => {
  const mockReplicate = vi.fn().mockImplementation(() => ({
    run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
  }));
  return { default: mockReplicate };
});

// Import after mocks are set up
import {
  handleReplicateRequest,
  parseInputFromUrl,
} from "../replicateHandler.js";
import { getCacheDefault } from "../utils/cache.js";
import Replicate from "replicate";

describe("parseInputFromUrl", () => {
  describe("default values", () => {
    it("should return default values for URL without params", () => {
      const url = "https://example.com/replicate/test.webp";
      const input = parseInputFromUrl(url);

      expect(input).toEqual({
        cfg: 3.5,
        steps: 28,
        prompt: 'a photo of vibrant artistic graffiti on a wall saying "SD3 medium"',
        aspect_ratio: "16:9",
        output_format: "webp",
        output_quality: 90,
        negative_prompt: "",
        prompt_strength: 0.85,
      });
    });

    it("should return defaults for invalid URL", () => {
      const input = parseInputFromUrl("not a valid url");

      expect(input.cfg).toBe(3.5);
      expect(input.steps).toBe(28);
    });
  });

  describe("URL parsing with base64 params", () => {
    it("should parse valid base64 encoded params", () => {
      // Encode params: prompt=hello&cfg=5&steps=30
      const params = "prompt=hello&cfg=5&steps=30";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.prompt).toBe("hello");
      expect(input.cfg).toBe(5);
      expect(input.steps).toBe(30);
    });

    it("should parse output_format from base64 params", () => {
      const params = "output_format=png";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.png`;

      const input = parseInputFromUrl(url);

      expect(input.output_format).toBe("png");
    });

    it("should parse output_format as jpeg", () => {
      const params = "output_format=jpeg";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.jpeg`;

      const input = parseInputFromUrl(url);

      expect(input.output_format).toBe("jpeg");
    });

    it("should parse numeric values correctly", () => {
      const params = "cfg=4.5&output_quality=80&prompt_strength=0.9";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.cfg).toBe(4.5);
      expect(input.output_quality).toBe(80);
      expect(input.prompt_strength).toBe(0.9);
    });

    it("should handle aspect_ratio parameter", () => {
      const params = "aspect_ratio=1:1";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.aspect_ratio).toBe("1:1");
    });

    it("should handle negative_prompt parameter", () => {
      const params = "negative_prompt=blurry,bad quality";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.negative_prompt).toBe("blurry,bad quality");
    });

    it("should ignore empty values", () => {
      const params = "prompt=&cfg=";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      // Should keep defaults when values are empty
      expect(input.prompt).toBe('a photo of vibrant artistic graffiti on a wall saying "SD3 medium"');
      expect(input.cfg).toBe(3.5);
    });

    it("should ignore invalid numeric values", () => {
      const params = "cfg=notanumber&steps=invalid";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.cfg).toBe(3.5);
      expect(input.steps).toBe(28);
    });

    it("should ignore invalid output_format values", () => {
      const params = "output_format=gif";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input.output_format).toBe("webp");
    });

    it("should ignore unknown parameters", () => {
      const params = "unknown_param=value&another=test";
      const base64Params = btoa(params);
      const url = `https://example.com/replicate/${base64Params}.webp`;

      const input = parseInputFromUrl(url);

      expect(input).not.toHaveProperty("unknown_param");
      expect(input).not.toHaveProperty("another");
    });
  });

  describe("URL pattern matching", () => {
    it("should handle URLs without replicate path prefix", () => {
      const url = "https://example.com/other/path.webp";
      const input = parseInputFromUrl(url);

      // Should return defaults when path doesn't match
      expect(input.cfg).toBe(3.5);
    });

    it("should handle malformed base64", () => {
      const url = "https://example.com/replicate/not-valid-base64!@#$.webp";
      const input = parseInputFromUrl(url);

      // Should return defaults when base64 is invalid
      expect(input.cfg).toBe(3.5);
    });
  });
});

describe("handleReplicateRequest", () => {
  let mockEnv: ReturnType<typeof createMockEnv>;
  let mockCtx: ExecutionContext;
  let mockCache: { match: Mock; put: Mock };

  beforeEach(() => {
    vi.resetAllMocks();

    mockEnv = createMockEnv();
    mockCtx = {
      waitUntil: vi.fn(),
      passThroughOnException: () => {},
      props: {},
    } as unknown as ExecutionContext;

    mockCache = {
      match: vi.fn().mockResolvedValue(null),
      put: vi.fn().mockResolvedValue(undefined),
    };
    (getCacheDefault as Mock).mockReturnValue(mockCache);
  });

  describe("cache behavior", () => {
    it("should return cached response if available", async () => {
      const cachedResponse = new Response("cached image", {
        headers: { "Content-Type": "image/webp" },
      });
      mockCache.match.mockResolvedValue(cachedResponse);

      const request = new Request("https://example.com/replicate/test.webp");
      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response).toBe(cachedResponse);
      expect(mockEnv.R2.get).not.toHaveBeenCalled();
    });
  });

  describe("R2 storage behavior", () => {
    it("should return image from R2 if available", async () => {
      const imageData = new ArrayBuffer(100);
      const mockR2Object = {
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(imageData));
            controller.close();
          },
        }),
      };
      (mockEnv.R2.get as Mock).mockResolvedValue(mockR2Object);

      const params = "prompt=test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.status).toBe(200);
      expect(response.headers.get("Content-Type")).toBe("image/webp");
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=31536000, immutable"
      );
      expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");
    });

    it("should return png format for png requests", async () => {
      const mockR2Object = {
        body: new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(100));
            controller.close();
          },
        }),
      };
      (mockEnv.R2.get as Mock).mockResolvedValue(mockR2Object);

      const params = "output_format=png";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.png`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.headers.get("Content-Type")).toBe("image/png");
    });
  });

  describe("Replicate API integration", () => {
    it("should call Replicate API when not in cache or R2", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      // Mock fetch for image download
      const mockImageData = new ArrayBuffer(100);
      global.fetch = vi.fn().mockResolvedValue(
        new Response(mockImageData, {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        })
      );

      const params = "prompt=a beautiful sunset";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(Replicate).toHaveBeenCalledWith({
        auth: mockEnv.REPLICATE_API_TOKEN,
      });
      expect(mockReplicateInstance.run).toHaveBeenCalledWith(
        "black-forest-labs/flux-schnell",
        expect.objectContaining({
          input: expect.objectContaining({
            prompt: "a beautiful sunset",
          }),
        })
      );
      expect(response.status).toBe(200);
    });

    it("should save image to R2 after fetching from Replicate", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const mockImageData = new ArrayBuffer(100);
      global.fetch = vi.fn().mockResolvedValue(
        new Response(mockImageData, {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        })
      );

      const params = "prompt=test image";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      // R2 put should be called via waitUntil
      expect(mockCtx.waitUntil).toHaveBeenCalled();
    });

    it("should cache response after successful generation", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const mockImageData = new ArrayBuffer(100);
      global.fetch = vi.fn().mockResolvedValue(
        new Response(mockImageData, {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        })
      );

      const params = "prompt=cached test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      // Cache put should be called via waitUntil
      expect(mockCtx.waitUntil).toHaveBeenCalled();
    });
  });

  describe("error handling", () => {
    it("should return 500 error when Replicate API fails", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockRejectedValue(new Error("API rate limit exceeded")),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const params = "prompt=test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toContain("Error");
      expect(text).toContain("API rate limit exceeded");
    });

    it("should return 500 error when image fetch fails", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      global.fetch = vi.fn().mockResolvedValue(
        new Response("Not Found", { status: 404 })
      );

      const params = "prompt=test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.status).toBe(500);
    });

    it("should handle invalid image URL from Replicate", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(null),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const params = "prompt=test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.status).toBe(500);
      const text = await response.text();
      // When null is returned, toString() throws before the validation check
      expect(text).toContain("Error");
    });

    it("should handle empty string image URL from Replicate", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue([""]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const params = "prompt=test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.status).toBe(500);
    });

    it("should handle unknown error types", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockRejectedValue("string error"),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const params = "prompt=test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      const response = await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(response.status).toBe(500);
      const text = await response.text();
      expect(text).toContain("Unknown error");
    });
  });

  describe("input parameter handling", () => {
    it("should pass all input parameters to Replicate", async () => {
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const mockImageData = new ArrayBuffer(100);
      global.fetch = vi.fn().mockResolvedValue(
        new Response(mockImageData, {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        })
      );

      const params = "prompt=custom prompt&cfg=5&steps=40&aspect_ratio=1:1&output_quality=95";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      expect(mockReplicateInstance.run).toHaveBeenCalledWith(
        "black-forest-labs/flux-schnell",
        expect.objectContaining({
          input: expect.objectContaining({
            prompt: "custom prompt",
            cfg: 5,
            steps: 40,
            aspect_ratio: "1:1",
            output_quality: 95,
          }),
        })
      );
    });
  });

  describe("cache key generation", () => {
    it("should generate a unique cache key based on input parameters", async () => {
      // First request with specific params
      (mockEnv.R2.get as Mock).mockResolvedValue(null);

      const mockReplicateInstance = {
        run: vi.fn().mockResolvedValue(["https://replicate.delivery/image.webp"]),
      };
      (Replicate as unknown as Mock).mockImplementation(() => mockReplicateInstance);

      const mockImageData = new ArrayBuffer(100);
      global.fetch = vi.fn().mockResolvedValue(
        new Response(mockImageData, {
          status: 200,
          headers: { "Content-Type": "image/webp" },
        })
      );

      const params = "prompt=hash test";
      const base64Params = btoa(params);
      const request = new Request(
        `https://example.com/replicate/${base64Params}.webp`
      );

      await handleReplicateRequest(
        request,
        mockEnv as unknown as Env,
        mockCtx
      );

      // R2.get should be called to check for cached image
      expect(mockEnv.R2.get).toHaveBeenCalled();
    });
  });
});
