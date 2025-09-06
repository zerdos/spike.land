import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { type EditorState as _EditorState, useEditorState } from "../hooks/use-editor-state";

describe("useEditorState", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with default values", () => {
    const { result } = renderHook(() => useEditorState());

    expect(result.current.containerRef).toBeDefined();
    expect(result.current.engine).toBe("monaco");
    expect(result.current.editorState).toEqual({
      started: false,
      sub: false,
      code: "",
      setValue: expect.any(Function),
    });
    expect(typeof result.current.setEditorState).toBe("function");
  });

  it("should update editor state correctly", () => {
    const { result } = renderHook(() => useEditorState());

    const newState = {
      started: true,
      sub: true,
      code: "const x = 5;",
      setValue: vi.fn(),
    };

    act(() => {
      result.current.setEditorState(newState);
    });

    expect(result.current.editorState).toEqual(newState);
  });

  it("should preserve setValue function if not provided in update", () => {
    const { result } = renderHook(() => useEditorState());

    const originalSetValue = result.current.editorState.setValue;

    // Create a partial state update without setValue
    const partialState = {
      started: true,
      sub: true,
      code: "const x = 5;",
    };

    // Use functional update with proper type checking
    act(() => {
      result.current.setEditorState((prev) => ({
        ...prev,
        ...partialState,
      }));
    });

    // Verify that the original setValue function was preserved
    expect(result.current.editorState.setValue).toBe(originalSetValue);
  });

  it("should handle functional updates", () => {
    const { result } = renderHook(() => useEditorState());

    act(() => {
      result.current.setEditorState((prev) => ({
        ...prev,
        code: "const x = 10;",
      }));
    });

    expect(result.current.editorState.code).toBe("const x = 10;");
  });
});
