import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from "vitest";
import * as sharedModule from "../shared";
import { renderApp, useTranspile, Wrapper } from "../Wrapper";

vi.mock("../shared", () => ({
  transpile: vi.fn(),
}));

vi.mock("../components/AppRenderer", () => ({
  AppRenderer: ({ transpiled }: { transpiled: string }) => <div data-testid="mock-app-renderer">{transpiled}</div>,
}));

vi.mock("@visx/responsive", () => ({
  ParentSize: ({ children }: { children: (props: any) => React.ReactNode }) => children({ width: 100, height: 100 }),
}));

describe("Wrapper", () => {
  let container: HTMLElement;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    vi.clearAllMocks();
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<Wrapper code="" />, { container });
    });
    expect(screen.getByTestId("wrapper-container")).toBeInTheDocument();
  });

  it("calls transpile with correct arguments", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    expect(mockTranspile).toHaveBeenCalledWith({
      code: "test code",
      originToUse: window.location.origin,
    });
  });

  it("renders AppRenderer with transpiled code", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    await waitFor(() => {
      const renderedComponent = screen.getByTestId("mock-app-renderer");
      expect(renderedComponent).toBeInTheDocument();
      expect(renderedComponent).toHaveTextContent("transpiled code");
    });
  });

  it("renders iframe when codeSpace is provided", async () => {
    await act(async () => {
      render(<Wrapper codeSpace="test-space" />, { container });
    });

    const iframe = container.querySelector("iframe");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "/live/test-space/embed");
  });

  it("applies correct scale to iframe", async () => {
    const scale = 2;
    await act(async () => {
      render(<Wrapper codeSpace="test-space" scale={scale} />, { container });
    });

    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveStyle(`height: ${100 / scale}%`);
    expect(iframe).toHaveStyle(`width: ${100 / scale}%`);
  });

  it("prefers transpiled prop over code prop", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled from code");

    await act(async () => {
      render(<Wrapper code="test code" transpiled="pre-transpiled code" />, { container });
    });

    expect(mockTranspile).not.toHaveBeenCalled();
    await waitFor(() => {
      const renderedComponent = screen.getByTestId("mock-app-renderer");
      expect(renderedComponent).toBeInTheDocument();
      expect(renderedComponent).toHaveTextContent("pre-transpiled code");
    });
  });

  it("handles transpile error gracefully", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockRejectedValue(new Error("Transpile error"));

    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    await waitFor(() => {
      expect(screen.queryByTestId("mock-app-renderer")).not.toBeInTheDocument();
    });
    expect(screen.getByTestId("wrapper-container")).toBeInTheDocument();
  });
});

describe("useTranspile", () => {
  it("returns transpiled code", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled code");

    let result: string | null = null;
    function TestComponent() {
      result = useTranspile("test code");
      return null;
    }

    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(result).toBe("transpiled code");
    });
  });

  it("returns null when transpile fails", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockRejectedValue(new Error("Transpile error"));

    let result: string | null = "initial";
    function TestComponent() {
      result = useTranspile("test code");
      return null;
    }

    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(result).toBeNull();
    });
  });
});
