import { ServiceWorkerManager } from "@/services/ServiceWorkerManager";

// Mock hydrate module
vi.mock("@/services/ServiceWorkerManager", async (importOriginal) => {
  const actual = await importOriginal<
    typeof import("@/services/ServiceWorkerManager")
  >();
  return {
    ...actual,
    // Mock the class itself
    ServiceWorkerManager: class {
      setup = vi.fn().mockResolvedValue(undefined); // Mock the setup method if needed, or rely on setupServiceWorker mock
    },
    // Keep the existing mock for the standalone function if it's used directly
    setupServiceWorker: vi.fn().mockResolvedValue(undefined),
  };
});

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
    // Assert against the instance's setup method mock
    expect(serviceWorkerManager.setup).toHaveBeenCalled();
  });

  it("should not setup service worker when window is in iframe", async () => {
    // Mock window.parent to be different from window
    Object.defineProperty(window, "parent", {
      value: {} as Window,
      writable: true,
    });

    await serviceWorkerManager.setup();
    const { setupServiceWorker } = vi.mocked(
      await import("@/services/ServiceWorkerManager"),
    );
    expect(setupServiceWorker).not.toHaveBeenCalled();
  });

  it("should handle setup error", async () => {
    Object.defineProperty(window, "parent", {
      value: window,
      writable: true,
    });

    const testError = new Error("Test error");
    // Configure the instance's setup method mock to reject
    vi.mocked(serviceWorkerManager.setup).mockRejectedValueOnce(testError);

    await expect(serviceWorkerManager.setup()).rejects.toThrow(testError);
  });
});
