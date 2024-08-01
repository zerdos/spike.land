import { renderHook } from "@testing-library/react-hooks";
import { useEditorState } from "../hooks/useEditorState";

jest.mock("../isMobile", () => ({
  isMobile: jest.fn(),
}));

describe("useEditorState", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.cSess = {
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
  });

  test("uses ace engine on mobile", () => {
    const { isMobile } = require("../isMobile");
    isMobile.mockReturnValue(true);

    const { result } = renderHook(() => useEditorState("test-code-space"));

    expect(result.current.engine).toBe("ace");
  });

  test("setEditorState updates the state correctly", () => {
    const { result } = renderHook(() => useEditorState("test-code-space"));

    result.current.setEditorState({
      ...result.current.editorState,
      started: true,
      code: "updated code",
    });

    expect(result.current.editorState).toEqual({
      i: "0",
      code: "updated code",
      started: true,
      setValue: expect.any(Function),
    });
  });
});
