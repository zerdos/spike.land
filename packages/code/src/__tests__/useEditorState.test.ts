import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useEditorState } from "../hooks/use-editor-state";

describe("useEditorState", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("initializes with correct values", () => {
    const { result } = renderHook(() => useEditorState());

    expect(result.current.containerRef.current).toBe(null);
    expect(result.current.engine).toBe("monaco");
    expect(result.current.editorState).toEqual({
      started: false,
      sub: false,
      code: "",
      setValue: expect.any(Function),
    });
  });

  it("setEditorState updates the state correctly", () => {
    const { result } = renderHook(() => useEditorState());

    act(() => {
      result.current.setEditorState({
        ...result.current.editorState,
        started: true,
        code: "updated code",
      });
    });

    expect(result.current.editorState).toEqual({
      started: true,
      sub: false,
      code: "updated code",
      setValue: expect.any(Function),
    });
  });
});
