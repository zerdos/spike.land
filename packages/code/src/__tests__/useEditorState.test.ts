import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useEditorState } from "../hooks/useEditorState";
import { isMobile } from "../isMobile";

vi.mock("../isMobile");

describe("useEditorState", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    vi.unstubAllGlobals();
    vi.stubGlobal("cSess", {
      session: {
        i: "0",
        code: "initial code",
      },
    });
  });

  it("initializes with correct values", () => {
    vi.mocked(isMobile).mockReturnValue(false);
    const { result } = renderHook(() => useEditorState("test-code-space"));

    expect(result.current.containerRef.current).toBe(null);
    expect(result.current.engine).toBe("monaco");
    expect(result.current.editorState).toEqual({
      i: "0",
      code: "initial code",
      started: false,
      setValue: expect.any(Function),
    });
    expect(result.current.initialLoadRef.current).toBe(true);
  });

  it("uses ace engine on mobile", () => {
    vi.mocked(isMobile).mockReturnValue(true);
    const { result } = renderHook(() => useEditorState("test-code-space"));

    expect(result.current.engine).toBe("ace");
  });

  it("setEditorState updates the state correctly", () => {
    vi.mocked(isMobile).mockReturnValue(false);
    const { result } = renderHook(() => useEditorState("test-code-space"));

    act(() => {
      result.current.setEditorState({
        ...result.current.editorState,
        started: true,
        code: "updated code",
      });
    });

    expect(result.current.editorState).toEqual({
      i: "0",
      code: "updated code",
      started: true,
      setValue: expect.any(Function),
    });
  });
});
