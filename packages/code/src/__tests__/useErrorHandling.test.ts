import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useErrorHandling } from "../hooks/useErrorHandling";

let tsWorkerMock = vi.fn().mockResolvedValue(() => ({
  getSemanticDiagnostics: vi.fn().mockResolvedValue([]),
}));

vi.mock("monaco-editor", () => {
  return {
    editor: {
      getModels: vi.fn().mockReturnValue([{ uri: { toString: vi.fn() } }]),
    },
    languages: {
      typescript: {
        getTypeScriptWorker: tsWorkerMock,
      },
    },
  };
});

vi.mock("lodash/debounce", () => vi.fn((fn) => fn));

describe("useErrorHandling", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("initializes with null error type", () => {
    const { result } = renderHook(() => useErrorHandling("monaco"));
    expect(result.current.errorType).toBe(null);
  });

  test("setErrorType updates the error type", () => {
    const { result } = renderHook(() => useErrorHandling("monaco"));
    act(() => {
      result.current.setErrorType("typescript");
    });
    expect(result.current.errorType).toBe("typescript");
  });

  test("debouncedTypeCheck sets typescript error for monaco engine", async () => {
    const mockGetSemanticDiagnostics = vi.fn().mockResolvedValue([{
      message: "Error",
    }]);
    const mockGetTypeScriptWorker = vi.fn().mockResolvedValue(() => ({
      getSemanticDiagnostics: mockGetSemanticDiagnostics,
    }));

    tsWorkerMock.mockImplementation(mockGetTypeScriptWorker);

    const { result } = renderHook(() => useErrorHandling("monaco"));
    const initialLoadRef = { current: false };

    await act(async () => {
      await result.current.debouncedTypeCheck(initialLoadRef);
    });

    expect(result.current.errorType).toBe("typescript");
  });

  test("debouncedTypeCheck clears typescript error when no diagnostics", async () => {
    const mockGetSemanticDiagnostics = vi.fn().mockResolvedValue([]);
    const mockGetTypeScriptWorker = vi.fn().mockResolvedValue(() => ({
      getSemanticDiagnostics: mockGetSemanticDiagnostics,
    }));

    tsWorkerMock.mockImplementation(mockGetTypeScriptWorker);

    const { result } = renderHook(() => useErrorHandling("monaco"));
    const initialLoadRef = { current: false };

    act(() => {
      result.current.setErrorType("typescript");
    });

    await act(async () => {
      await result.current.debouncedTypeCheck(initialLoadRef);
    });

    expect(result.current.errorType).toBe(null);
  });

  test("debouncedTypeCheck does nothing for non-monaco engine", async () => {
    const { result } = renderHook(() => useErrorHandling("ace"));
    const initialLoadRef = { current: false };

    await act(async () => {
      await result.current.debouncedTypeCheck(initialLoadRef);
    });

    expect(result.current.errorType).toBe(null);
  });
});
