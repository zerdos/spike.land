import { act, renderHook } from "@testing-library/react";
import { useErrorHandling } from "../hooks/useErrorHandling";

// Mock the entire monaco-editor module
jest.mock("monaco-editor", () => {
  return {
    editor: {
      getModels: jest.fn().mockReturnValue([{ uri: { toString: jest.fn() } }]),
    },
    languages: {
      typescript: {
        getTypeScriptWorker: jest.fn().mockResolvedValue(() => ({
          getSemanticDiagnostics: jest.fn().mockResolvedValue([]),
        })),
      },
    },
  };
}, { virtual: true });

jest.mock("lodash/debounce", () => jest.fn((fn) => fn));

describe("useErrorHandling", () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
    const mockGetSemanticDiagnostics = jest.fn().mockResolvedValue([{ message: "Error" }]);
    const mockGetTypeScriptWorker = jest.fn().mockResolvedValue(() => ({
      getSemanticDiagnostics: mockGetSemanticDiagnostics,
    }));

    require("monaco-editor").languages.typescript.getTypeScriptWorker.mockImplementation(mockGetTypeScriptWorker);

    const { result } = renderHook(() => useErrorHandling("monaco"));
    const initialLoadRef = { current: false };

    await act(async () => {
      await result.current.debouncedTypeCheck(initialLoadRef);
    });

    expect(result.current.errorType).toBe("typescript");
  });

  test("debouncedTypeCheck clears typescript error when no diagnostics", async () => {
    const mockGetSemanticDiagnostics = jest.fn().mockResolvedValue([]);
    const mockGetTypeScriptWorker = jest.fn().mockResolvedValue(() => ({
      getSemanticDiagnostics: mockGetSemanticDiagnostics,
    }));

    require("monaco-editor").languages.typescript.getTypeScriptWorker.mockImplementation(mockGetTypeScriptWorker);

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
