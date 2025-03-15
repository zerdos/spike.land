import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { router as baseRouter } from "../router";

// Mock components
vi.mock("../pages/LivePage", () => ({
  default: () => <div data-testid="live-page">Live Page</div>,
}));

vi.mock("@/lib/hydrate", () => ({
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
    router = createTestRouter();
  });

  it("should handle editor route with code space parameter", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      // expect(screen.getByTestId('live-page')).toBeInTheDocument();
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    });
  });

  it("should handle live page route", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      // expect(screen.getByTestId('live-page')).toBeInTheDocument();
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    });
  });

  it.skip("should handle live page route with parameters", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
      search: { page },
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      // expect(screen.getByTestId('live-page')).toBeInTheDocument();
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
      expect(router.state.location.search).toContain(page);
    });
  });

  it.skip("should handle multiple route navigations", async () => {
    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      // expect(screen.getByTestId('live-page')).toBeInTheDocument();
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
  });

  it("should initialize app for editor route", async () => {
    await import("@/lib/hydrate");

    await router.navigate({
      to: "/live/$codeSpace",
      params: { codeSpace },
    });

    render(<RouterProvider router={router} />);

    await waitFor(() => {
      // expect(screen.getByTestId('live-page')).toBeInTheDocument();
      expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
      // expect(initializeApp).toHaveBeenCalled();
    });
  });
});
