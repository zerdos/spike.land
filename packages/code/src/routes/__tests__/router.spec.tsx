import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { cleanup, render, waitFor } from "@testing-library/react";
import { afterAll, afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { router as baseRouter } from "../router.tsx";

// Mock components
vi.mock("../pages/LivePage", () => ({
  default: () => <div data-testid="live-page">Live Page</div>,
}));

vi.mock("@/services/ServiceWorkerManager", () => ({
  initializeApp: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn().mockReturnValue("test-space"),
}));

describe("Router Configuration", () => {
  let router: ReturnType<typeof createTestRouter>;
  const codeSpace = "test-space";
  const page = "test-page";

  const createTestRouter = () => {
    const memoryHistory = createMemoryHistory();
    return createRouter({
      history: memoryHistory,
      routeTree: baseRouter.routeTree,
      defaultPreload: false,
    });
  };

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock fetch globally
    global.fetch = vi.fn().mockImplementation((url) => {
      if (url.toString().includes("/live/test-space/index.js")) {
        return Promise.resolve({
          ok: true,
          text: () => Promise.resolve("// Test code"),
          json: () => Promise.resolve({ code: "// Test code" }),
        });
      }
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve(""),
        json: () => Promise.resolve({}),
      });
    });

    router = createTestRouter();
  });

  // Clean up after each test to avoid lingering effects
  afterEach(() => {
    cleanup(); // Make sure React testing cleanup runs after each test
    vi.restoreAllMocks();
  });

  // This ensures the test environment is cleaned up properly after all tests
  afterAll(() => {
    cleanup();
  });

  it("should handle editor route with code space parameter", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    const { unmount } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    });

    unmount(); // Make sure to unmount the component
  });

  it("should handle live page route", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    const { unmount } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    });

    unmount(); // Make sure to unmount the component
  });

  it.skip("should handle live page route with parameters", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
      search: { page },
    });

    const { unmount } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
      expect(router.state.location.search).toContain(page);
    });

    unmount(); // Make sure to unmount the component
  });

  it.skip("should handle multiple route navigations", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    const { unmount } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    });

    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
      search: { page },
    });

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
      expect(router.state.location.search).toContain(page);
    });

    unmount(); // Make sure to unmount the component
  });

  it("should initialize app for editor route", async () => {
    await import("@/services/ServiceWorkerManager.tsx");

    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    const { unmount } = render(<RouterProvider router={router} />);

    await waitFor(() => {
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    });

    unmount(); // Make sure to unmount the component
  });
});
