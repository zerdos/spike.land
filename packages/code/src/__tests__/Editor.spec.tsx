vi.mock("@/services/editorUtils", () => ({
  initializeMonaco: vi.fn(),
}));
vi.mock("../hooks/use-editor-state");
vi.mock("../hooks/useErrorHandling");

import type { ICode, ICodeSession } from "@/lib/interfaces";
import { sanitizeSession } from "@/lib/make-sess";
import * as editorUtils from "@/services/editorUtils";
import { render, waitFor } from "@testing-library/react";
import React from "react";
import type { Mock } from "vitest";
import { vi } from "vitest";
import { Editor } from "../components/Editor";
import { useEditorState } from "../hooks/use-editor-state";
import { useErrorHandling } from "../hooks/useErrorHandling";

const mockUseEditorState = vi.mocked(useEditorState);
const mockUseErrorHandling = vi.mocked(useErrorHandling);

describe("Editor Component", () => {
  let mockCSess: ICode;
  let mockSessionData: ICodeSession;
  let mockContainerRef: React.RefObject<HTMLDivElement>;
  let mockSetValue: Mock;

  beforeEach(() => {
    vi.clearAllMocks();

    mockSetValue = vi.fn();
    mockContainerRef = { current: document.createElement("div") };

    mockSessionData = sanitizeSession({
      code: 'console.warn("hello");',
      transpiled: "",
      css: "",
      html: "",
      codeSpace: "test-space",
    });

    mockCSess = {
      getSession: vi.fn().mockResolvedValue(mockSessionData),
      setCode: vi.fn().mockResolvedValue(mockSessionData.code),
      sub: vi.fn().mockReturnValue(() => {}),
      setSession: vi.fn(),
      init: vi.fn(),
      screenshot: vi.fn(),
      getCode: vi.fn(),
      getCodeSpace: vi.fn(),
    };

    mockUseEditorState.mockReturnValue({
      containerRef: mockContainerRef,
      editorState: {
        started: false,
        sub: false,
        code: "",
        setValue: mockSetValue,
      },
      setEditorState: vi.fn((updateFn) => {
        if (typeof updateFn === "function") {
          const newState = updateFn({
            started: false,
            sub: false,
            code: "",
            setValue: mockSetValue,
          });
          if (newState.started) {
            mockUseEditorState.mockReturnValue({
              containerRef: mockContainerRef,
              editorState: { ...newState },
              setEditorState: vi.fn(),
              engine: "monaco",
            });
          }
        }
      }),
      engine: "monaco",
    });

    mockUseErrorHandling.mockReturnValue({
      errorType: null,
      throttledTypeCheck: vi.fn().mockResolvedValue(undefined),
      setErrorType: vi.fn(),
    });

    const mockInitializeMonaco = editorUtils.initializeMonaco as Mock;
    mockInitializeMonaco.mockResolvedValue({
      getValue: vi.fn(() => mockSessionData.code),
      silent: false,
      getErrors: vi.fn().mockResolvedValue([]),
      isEdit: false,
      setValue: mockSetValue,
    });
  });

  it("should initialize Monaco editor after session is loaded", async () => {
    render(<Editor codeSpace="test-space" cSess={mockCSess} />);

    await waitFor(() => {
      expect(mockCSess.getSession).toHaveBeenCalled();
    });

    const mockInitializeMonaco = editorUtils.initializeMonaco as Mock;

    await waitFor(() => {
      expect(mockInitializeMonaco).toHaveBeenCalledTimes(1);
    });

    expect(mockInitializeMonaco).toHaveBeenCalledWith({
      container: mockContainerRef.current,
      codeSpace: "test-space",
      code: mockSessionData.code,
      onChange: expect.any(Function),
    });

    await waitFor(() => {
      const finalState = mockUseEditorState().editorState;
      expect(finalState.started).toBe(true);
      expect(finalState.code).toBe(mockSessionData.code);
      expect(finalState.setValue).toBe(mockSetValue);
    });
  });

  // Additional tests can be added here
});
