import { act, renderHook } from "@testing-library/react";
import { useEditorState } from "../hooks/useEditorState";

let isMobileMockValue = false;
jest.mock("../isMobile", () => ({
  isMobile:  isMobileMockValue
}));

describe("useEditorState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (global as any).cSess = {
      session: {
        i: "0",
        code: "initial code",
      },
    };
  });

  test("initializes with correct values", () => {
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
    expect(result.current.lastTypingTimestampRef.current).toBeDefined();
  })

  test("uses ace engine on mobile", async () => {
    isMobileMockValue= true;
    const { result } = renderHook(() => useEditorState("test-code-space"));

    expect(result.current.engine).toBe("ace");
  });

  test("setEditorState updates the state correctly", () => {
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
