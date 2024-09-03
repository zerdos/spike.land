import { act, render, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, beforeEach, describe, expect, it, MockedFunction, vi } from "vitest";
import * as sharedModule from "./shared";
import { useTranspile, Wrapper } from "./Wrapper";

vi.mock("./shared", () => ({
  transpile: vi.fn().mockResolvedValue("mocked transpiled code"),
}));

vi.mock("@visx/responsive", () => ({
  ParentSize: ({ children }: { children: (props: any) => React.ReactNode }) => children({ width: 100, height: 100 }),
}));

// Mock the useTranspile hook
vi.mock("./Wrapper", async () => {
  const actualModule = await vi.importActual<typeof import("./Wrapper")>("./Wrapper");
  return {
    ...actualModule,
    useTranspile: vi.fn().mockImplementation((code: string | undefined) => (code ? "mocked transpiled code" : null)),
  };
});

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
      render(<Wrapper code="test code" />, { container });
    });

    await waitFor(() => {
      expect(container.querySelector("[data-testid='wrapper-container']")).toBeInTheDocument();
    });
  });

  it("calls transpile with correct arguments", async () => {
    const mockTranspile = sharedModule.transpile as MockedFunction<typeof sharedModule.transpile>;

    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    expect(mockTranspile).toHaveBeenCalledWith({
      code: "test code",
      originToUse: window.location.origin,
    });
  });

  it("renders AppRenderer with transpiled code", async () => {
    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    await waitFor(() => {
      expect(container.querySelector("[data-testid='wrapper-container']")).toBeInTheDocument();
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

    await act(async () => {
      render(<Wrapper code="test code" transpiled="pre-transpiled code" />, { container });
    });

    expect(mockTranspile).not.toHaveBeenCalled();
    await waitFor(() => {
      expect(container.querySelector("[data-testid='wrapper-container']")).toBeInTheDocument();
    });
  });

  it("handles undefined code gracefully", async () => {
    await act(async () => {
      render(<Wrapper />, { container });
    });

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });
});

describe("useTranspile", () => {
  it("returns transpiled code when code is provided", async () => {
    let result: string | null = null;
    function TestComponent() {
      result = useTranspile("test code");
      return null;
    }

    await act(async () => {
      render(<TestComponent />);
    });

    await waitFor(() => {
      expect(result).toBe("mocked transpiled code");
    });
  });

  it("returns null when code is undefined", async () => {
    let result: string | null = "initial";
    function TestComponent() {
      result = useTranspile(undefined);
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
