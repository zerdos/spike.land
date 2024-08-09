import { describe, it, expect, beforeEach, afterEach, vi, expect } from 'vitest';
import { act, render, screen, waitFor } from "@testing-library/react";
import { useTranspile, Wrapper } from "../Wrapper";
import * as sharedModule from "../shared";

// Set up the DOM environment
import '@testing-library/jest-dom';

vi.mock("../shared", () => ({
  transpile: vi.fn(),
}));

vi.mock("../components/AppRenderer", () => ({
  AppRenderer: () => <div data-testid="mock-app-renderer" />,
}));

vi.mock("../Wrapper", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useTranspile: vi.fn(),
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
      render(<Wrapper code="" />, { container });
    });
    expect(screen.getByTestId("wrapper-container")).toBeInTheDocument();
  });

  it("calls transpile with correct arguments", async () => {
    const mockTranspile = sharedModule.transpile as vi.MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled code");
    (useTranspile as vi.Mock).mockReturnValue("mocked transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    expect(mockTranspile).toHaveBeenCalledWith({
      code: "test code",
      originToUse: window.location.origin,
    });
  });

  it("renders AppRenderer with transpiled code", async () => {
    const mockTranspile = sharedModule.transpile as vi.MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled code");
    (useTranspile as vi.Mock).mockReturnValue("mocked transpiled code");

    await act(async () => {
      render(<Wrapper code="test code" />, { container });
    });

    await waitFor(() => {
      expect(screen.getByTestId("mock-app-renderer")).toBeInTheDocument();
    });
  });

  it("calls the transpile function with the correct arguments", async () => {
    const code = "const a = 1;";
    await act(async () => {
      render(<Wrapper code={code} />, { container });
    });
    expect(sharedModule.transpile).toHaveBeenCalledWith(code);
  });
});

describe("useTranspile", () => {
  it("returns transpiled code", async () => {
    const mockTranspile = sharedModule.transpile as vi.MockedFunction<typeof sharedModule.transpile>;
    mockTranspile.mockResolvedValue("transpiled code");

    let result: string | undefined | null;
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
});