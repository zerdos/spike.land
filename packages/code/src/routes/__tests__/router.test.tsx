import { act, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi, Mock } from "vitest";
import { router, RouterProvider } from "../router";

// Mock window.scrollTo and fetch
window.scrollTo = vi.fn();
global.fetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ /* mock session data */ }),
  })
) as Mock;

// Mock all required dependencies
vi.mock("@/components/app/wrapper", () => ({
  Wrapper: ({ codeSpace }: { codeSpace: string }) => (
    <div data-testid="wrapper">
      {!codeSpace && <div>Landing Page</div>}
      {codeSpace && <div>Live Page</div>}
    </div>
  ),
}));

vi.mock("@/lib/routes", () => ({
  routes: {
    "/": "",
  },
}));

vi.mock("@/lib/hydrate", () => ({
  initializeApp: vi.fn(),
}));

// Set base URL for tests
window.location.href = 'http://localhost:3000';

// Mock getCodeSpace to return just the code space part
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn((path: string) => {
    const matches = path.match(/\/live\/([^/]+)(?:\/([^/]+))?/);
    return matches ? matches[1] : ""; // Return just the code space
  }),
}));

describe("Router Configuration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup(); // Clean up any mounted components
  });

  afterEach(() => {
    cleanup();
    router.history.push("/"); // Reset router state to root
  });

  it("should render landing page on root path", async () => {
    await act(async () => {
      await router.navigate({
        to: "/",
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Landing Page")).toBeInTheDocument();
  });

  it("should handle editor route with code space parameter", async () => {
    const codeSpace = "test-space";

    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace",
        params: { codeSpace },
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Live Page")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);
    
    const { getCodeSpace } = await import("@/hooks/use-code-space");
    expect(getCodeSpace).toHaveBeenCalledWith(`/live/${codeSpace}`);
  });

  it("should handle live page route with code space and page parameters", async () => {
    const codeSpace = "test-space";
    const page = "test-page";

    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace/$page",
        params: { codeSpace, page },
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Live Page")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(`/live/${codeSpace}/${page}`);
    
    const { getCodeSpace } = await import("@/hooks/use-code-space");
    expect(getCodeSpace).toHaveBeenCalledWith(`/live/${codeSpace}/${page}`);
  });

  it("should handle multiple route navigations", async () => {
    const codeSpace = "test-space";
    
    // Navigate to editor route
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace",
        params: { codeSpace },
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Live Page")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(`/live/${codeSpace}`);

    // Navigate to live page route
    const page = "test-page";
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace/$page",
        params: { codeSpace, page },
      });
    });

    expect(router.state.location.pathname).toBe(`/live/${codeSpace}/${page}`);

    // Then navigate back to root
    await act(async () => {
      await router.navigate({
        to: "/",
        replace: true,
      });
    });

    expect(router.state.location.pathname).toBe("/");
  });

  it("should initialize app for editor route", async () => {
    const codeSpace = "test-space";
    
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace",
        params: { codeSpace },
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Live Page")).toBeInTheDocument();
    
    const { initializeApp } = await import("@/lib/hydrate");
    expect(initializeApp).toHaveBeenCalled();
  });
});
