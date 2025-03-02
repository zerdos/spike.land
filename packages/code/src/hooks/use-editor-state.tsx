import { getCodeSpace } from "@/hooks/use-code-space";
import { nextDay } from "date-fns";
import { useRef, useState } from "react";
import type { EditorState } from "../components/editorUtils";
import type { ErrorType } from "../components/ErrorMessages";
import { isMobile } from "../isMobile";
import { useContext } from "./useContext";

export const useEditorState = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorStateInternal] = useState<EditorState>({
    started: false,
    sub: false,
    code: "",
    setValue: () => {},
  });

  const engine = isMobile() ? "ace" : "monaco";

  // Wrap setState to ensure updates are processed correctly
  const setEditorState = (
    updater: EditorState | ((prev: EditorState) => EditorState),
  ) => {
    setEditorStateInternal((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;

      // Ensure setValue is preserved if not explicitly changed
      if (!next.setValue && prev.setValue) {
        next.setValue = prev.setValue;
      }

      // Log state changes in development
      if (process.env.NODE_ENV === "development") {
        console.debug("[EditorState] State updated:", {
          prev,
          next,
          timestamp: new Date().toISOString(),
        });
      }

      return next;
    });
  };

  return {
    containerRef,
    engine,
    editorState,
    setEditorState,
  };
};

export const useErrorHandling = () => {
  const [error, setError] = useState<ErrorType>(null);
  const contextManager = useContext(getCodeSpace(location.pathname));

  const handleError = (errorType: ErrorType, errorMessage: string) => {
    setError(errorType);
    contextManager.updateContext("errorLog", errorMessage);
  };

  const clearError = () => {
    setError(null);
    contextManager.updateContext("errorLog", "");
  };

  return { error, handleError, clearError };
};
