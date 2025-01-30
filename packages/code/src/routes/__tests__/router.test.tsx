import { act, render, screen, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { router, RouterProvider } from "../router";

// Mock window.scrollTo
window.scrollTo = vi.fn();

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

// Mock getCodeSpace to return the full path for code space
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn((path: string) => {
    const matches = path.match(/\/live\/([^/]+)(?:\/([^/]+))?/);
    return matches ? path : "";
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

  it("should render live page with code space parameter", async () => {
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
  });

  it("should handle code space navigation with parameters", async () => {
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
    const page = "test-page";
    
    // Navigate to live page
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

    // Then navigate back to root
    await act(async () => {
      await router.navigate({
        to: "/",
        replace: true,
      });
    });

    expect(router.state.location.pathname).toBe("/");
  });

  it("should use getCodeSpace to process route parameters", async () => {
    const testCodeSpace = "test-code-space";
    const page = "test-page";
    
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace/$page",
        params: { codeSpace: testCodeSpace, page },
        replace: true,
      });

      const { container } = render(<RouterProvider router={router} />);
      
      // Wait for async render to complete
      await new Promise(resolve => setTimeout(resolve, 0));

      const { getCodeSpace } = await import("@/hooks/use-code-space");
      expect(getCodeSpace).toHaveBeenCalledWith(`/live/${testCodeSpace}/${page}`);
      expect(container.textContent).toContain("Live Page");
    });
  });
});
