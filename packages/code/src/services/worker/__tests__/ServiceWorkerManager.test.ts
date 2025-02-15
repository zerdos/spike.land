import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ServiceWorkerManager } from "../ServiceWorkerManager";

// Mock hydrate module
vi.mock("@/lib/hydrate", () => ({
  setupServiceWorker: vi.fn().mockResolvedValue(undefined),
}));

describe("ServiceWorkerManager", () => {
  let serviceWorkerManager: ServiceWorkerManager;
  let originalParent: Window;

  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
let consoleLogSpy: ReturnType<typeof vi.spyOn>;


  // Mock console before tests
beforeAll(() => {
  consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

});

// Restore console after tests
afterAll(() => {
  consoleErrorSpy.mockRestore();
  consoleLogSpy.mockRestore();
});


  beforeEach(() => {
    vi.clearAllMocks();
    serviceWorkerManager = new ServiceWorkerManager();
    originalParent = window.parent;
  });

  afterEach(() => {
    // Restore window.parent
    Object.defineProperty(window, "parent", {
      value: originalParent,
      writable: true,
    });
  });

  it("should setup service worker when window is top level", async () => {
    // Mock window.parent to be the same as window
    Object.defineProperty(window, "parent", {
      value: window,
      writable: true,
    });

    await serviceWorkerManager.setup();
    const { setupServiceWorker } = await import("@/lib/hydrate");
    expect(setupServiceWorker).toHaveBeenCalled();
  });

  it("should not setup service worker when window is in iframe", async () => {
    // Mock window.parent to be different from window
    Object.defineProperty(window, "parent", {
      value: {} as Window,
      writable: true,
    });

    await serviceWorkerManager.setup();
    const { setupServiceWorker } = vi.mocked(await import("@/lib/hydrate"));
    expect(setupServiceWorker).not.toHaveBeenCalled();
  });

  it("should handle setup error", async () => {
    Object.defineProperty(window, "parent", {
      value: window,
      writable: true,
    });

    const testError = new Error("Test error");
    const { setupServiceWorker } = vi.mocked(await import("@/lib/hydrate"));
    setupServiceWorker.mockRejectedValueOnce(testError);

    await expect(serviceWorkerManager.setup()).rejects.toThrow(testError);
  });
});
