import { act, renderHook } from "@testing-library/react";
import { useErrorHandling } from "../hooks/useErrorHandling";

jest.mock("lodash/debounce", () => jest.fn((fn) => fn));

describe("useErrorHandling", () => {
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
    const mockGetTypeScriptWorker = jest.fn().mockResolvedValue(() => ({
      getSemanticDiagnostics: jest.fn().mockResolvedValue([{ message: "Error" }]),
    }));

    jest.doMock("monaco-editor", () => ({
      editor: {
        getModels: jest.fn().mockReturnValue([{ uri: { toString: jest.fn() } }]),
      },
      languages: {
        typescript: {
          getTypeScriptWorker: mockGetTypeScriptWorker,
        },
      },
    }));

    const { result } = renderHook(() => useErrorHandling("monaco"));
    const initialLoadRef = { current: false };

    await act(async () => {
      await result.current.debouncedTypeCheck(initialLoadRef);
    });

    expect(result.current.errorType).toBe("typescript");
  });

  test("debouncedTypeCheck clears typescript error when no diagnostics", async () => {
    const mockGetTypeScriptWorker = jest.fn().mockResolvedValue(() => ({
      getSemanticDiagnostics: jest.fn().mockResolvedValue([]),
    }));

    jest.doMock("monaco-editor", () => ({
      editor: {
        getModels: jest.fn().mockReturnValue([{ uri: { toString: jest.fn() } }]),
      },
      languages: {
        typescript: {
          getTypeScriptWorker: mockGetTypeScriptWorker,
        },
      },
    }));

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
