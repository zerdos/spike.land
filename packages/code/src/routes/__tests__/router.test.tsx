import { act, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { router, RouterProvider } from "../router";

// Mock getCodeSpace
vi.mock("../../hooks/use-code-space", () => ({
  getCodeSpace: vi.fn((path: string) => {
    const matches = path.match(/\/(live|live-cms)\/(.+)/);
    return matches ? matches[2] : "";
  }),
}));

describe("Router Configuration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
  });

  it("should render live cms page with code space parameter", async () => {
    const codeSpace = "test-space";
    await act(async () => {
      await router.navigate({
        to: "/live-cms/$codeSpace",
        params: { codeSpace },
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Live CMS Page")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe(`/live-cms/${codeSpace}`);
  });

  it("should handle navigation with parameters", async () => {
    const testCodeSpace = "test-code-space";
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace",
        params: { codeSpace: testCodeSpace },
        replace: true,
      });
    });

    expect(router.state.location.pathname).toBe(`/live/${testCodeSpace}`);
    expect(
      router.state.matches.some(match =>
        match.params && "codeSpace" in match.params && match.params.codeSpace === testCodeSpace
      ),
    ).toBe(true);
  });

  it("should handle multiple route navigations", async () => {
    // Navigate to live page
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace",
        params: { codeSpace: "test-space" },
        replace: true,
      });
    });

    // Then navigate back to root
    await act(async () => {
      await router.navigate({
        to: "/",
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Landing Page")).toBeInTheDocument();
    expect(router.state.location.pathname).toBe("/");
  });

  it("should use getCodeSpace to process route parameters", async () => {
    const testCodeSpace = "test-code-space";
    await act(async () => {
      await router.navigate({
        to: "/live/$codeSpace",
        params: { codeSpace: testCodeSpace },
        replace: true,
      });
    });

    render(<RouterProvider router={router} />);

    const { getCodeSpace } = await import("../../hooks/use-code-space");
    expect(getCodeSpace).toHaveBeenCalledWith(`/live/${testCodeSpace}`);
    expect(await screen.findByText("Live Page")).toBeInTheDocument();
  });
});
